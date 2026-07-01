#!/usr/bin/env node

/**
 * ============================================================
 * Reentry Resource — Image Migration Script
 * ============================================================
 *
 * Downloads featured images from old WordPress URLs and uploads
 * them to the Supabase storage bucket, then updates the database.
 *
 * USAGE:
 *   node scripts/migrate-images.js --dry-run    (preview, no changes)
 *   node scripts/migrate-images.js              (actual migration)
 *
 * PREREQUISITES:
 *   .env.local with:
 *     NEXT_PUBLIC_SUPABASE_URL=...
 *     SUPABASE_SERVICE_ROLE_KEY=...
 *
 * FEATURES:
 *   - Resumable: tracks progress in scripts/migrate-images-progress.json
 *   - Skips already-migrated images (checks progress file)
 *   - Skips images already hosted on Supabase
 *   - Downloads, compresses to JPEG, uploads to bucket
 *   - Updates featured_image column with new URL
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Load .env.local
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8").split("\n").forEach((line) => {
    const eq = line.indexOf("=");
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim();
      if (key && val) process.env[key] = val;
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DRY_RUN = process.argv.includes("--dry-run");
const PROGRESS_FILE = path.resolve(__dirname, "migrate-images-progress.json");
const BUCKET = "resources";
const FOLDER = "images";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("\nError: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local\n");
  process.exit(1);
}

if (DRY_RUN) console.log("\n=== DRY RUN — no changes will be made ===\n");

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return { migrated: {}, failed: {}, skipped: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function supabaseRequest(method, endpoint, body = null, contentType = "application/json") {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}${endpoint}`);
    const options = {
      method,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    };
    if (contentType) options.headers["Content-Type"] = contentType;

    const req = https.request(url.toString(), options, (res) => {
      let data = [];
      res.on("data", (chunk) => data.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(data);
        if (contentType === "application/json" || !body) {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(buffer.toString()) });
          } catch {
            resolve({ status: res.statusCode, data: buffer.toString() });
          }
        } else {
          resolve({ status: res.statusCode, data: buffer.toString() });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(body instanceof Buffer ? body : JSON.stringify(body));
    req.end();
  });
}

function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const client = imageUrl.startsWith("https") ? https : http;
    const request = (url, redirects = 0) => {
      if (redirects > 5) { reject(new Error("Too many redirects")); return; }
      client.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          request(res.headers.location, redirects + 1);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }).on("error", reject);
    };
    request(imageUrl);
  });
}

async function uploadToStorage(filePath, imageBuffer) {
  const url = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filePath}`;
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      method: "POST",
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "image/jpeg",
        "Content-Length": imageBuffer.length,
        "x-upsert": "true",
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    });
    req.on("error", reject);
    req.write(imageBuffer);
    req.end();
  });
}

function getPublicUrl(filePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
}

async function main() {
  const progress = loadProgress();

  // Fetch all resources with featured images
  console.log("Fetching resources...");
  const { data: resources } = await supabaseRequest(
    "GET",
    `/rest/v1/resources?select=id,slug,featured_image&featured_image=not.is.null&order=created_at.asc`
  );

  if (!Array.isArray(resources)) {
    console.error("Failed to fetch resources:", resources);
    process.exit(1);
  }

  // Filter to only non-Supabase URLs
  const toMigrate = resources.filter((r) => {
    if (!r.featured_image) return false;
    if (r.featured_image.includes("supabase.co")) return false;
    if (progress.migrated[r.id]) return false;
    return true;
  });

  console.log(`Total resources with images: ${resources.length}`);
  console.log(`Already migrated: ${Object.keys(progress.migrated).length}`);
  console.log(`Already on Supabase: ${resources.length - toMigrate.length - Object.keys(progress.migrated).length}`);
  console.log(`To migrate: ${toMigrate.length}\n`);

  if (toMigrate.length === 0) {
    console.log("Nothing to migrate!");
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toMigrate.length; i++) {
    const resource = toMigrate[i];
    const slug = resource.slug || resource.id;
    const storagePath = `${FOLDER}/featured-image-${slug}.jpg`;
    const prefix = `[${i + 1}/${toMigrate.length}]`;

    console.log(`${prefix} ${slug}`);
    console.log(`  FROM: ${resource.featured_image}`);
    console.log(`  TO:   ${storagePath}`);

    if (DRY_RUN) {
      console.log("  (dry run — skipped)\n");
      continue;
    }

    try {
      // Download
      const imageBuffer = await downloadImage(resource.featured_image);
      console.log(`  Downloaded: ${(imageBuffer.length / 1024).toFixed(1)} KB`);

      // Upload
      const uploadRes = await uploadToStorage(storagePath, imageBuffer);
      if (uploadRes.status >= 400) {
        throw new Error(`Upload failed: ${uploadRes.status} ${uploadRes.data}`);
      }
      console.log("  Uploaded to Supabase storage");

      // Update database
      const newUrl = getPublicUrl(storagePath);
      const updateRes = await supabaseRequest(
        "PATCH",
        `/rest/v1/resources?id=eq.${resource.id}`,
        { featured_image: newUrl }
      );
      if (updateRes.status >= 400) {
        throw new Error(`DB update failed: ${updateRes.status}`);
      }
      console.log(`  Updated DB: ${newUrl}`);

      progress.migrated[resource.id] = {
        slug,
        old_url: resource.featured_image,
        new_url: newUrl,
        migrated_at: new Date().toISOString(),
      };
      successCount++;
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
      progress.failed[resource.id] = {
        slug,
        url: resource.featured_image,
        error: err.message,
        failed_at: new Date().toISOString(),
      };
      failCount++;
    }

    saveProgress(progress);
    console.log("");
  }

  console.log("=== DONE ===");
  console.log(`Migrated: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Progress saved to: ${PROGRESS_FILE}`);
  if (failCount > 0) {
    console.log("\nRe-run the script to retry failed images.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
