#!/usr/bin/env node

/**
 * ============================================================
 * Reentry Resource — Database Schema Exporter
 * ============================================================
 *
 * Connects to your LIVE Supabase database and auto-generates
 * clean markdown documentation of all tables and values.
 *
 * USAGE:
 *   npm run export-db-schema
 *   — or —
 *   node scripts/export-db-schema.js
 *
 * PREREQUISITES:
 *   1. Create a .env.local file in the project root with:
 *      NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *      SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 *
 *   2. Find these values in Supabase Dashboard:
 *      Project Settings → API
 *
 * OUTPUT:
 *   /docs/DATABASE_SCHEMA_CURRENT.md
 *
 * WORKFLOW:
 *   1. Make changes to the database (add topics, centerings, etc.)
 *   2. Run: npm run export-db-schema
 *   3. Commit the updated DATABASE_SCHEMA_CURRENT.md to GitHub
 *   4. The docs always reflect the live database state
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

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

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("\nError: Missing environment variables.");
  console.error("Make sure .env.local contains:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=...");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=...\n");
  process.exit(1);
}

function supabaseGet(table, select = "*", order = "sort_order") {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    url.searchParams.set("select", select);
    url.searchParams.set("order", `${order}.asc`);

    const options = {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "count=exact",
      },
    };

    const req = https.get(url.toString(), options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const count = res.headers["content-range"]
            ? res.headers["content-range"].split("/")[1]
            : null;
          resolve({ data: JSON.parse(data), count });
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
  });
}

async function fetchTable(table, select = "id,name", order = "sort_order") {
  try {
    const { data } = await supabaseGet(table, select, order);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.warn(`  Warning: Could not fetch ${table}: ${e.message}`);
    return [];
  }
}

async function countTable(table) {
  try {
    const { count } = await supabaseGet(table, "id", "id");
    return count || "?";
  } catch {
    return "?";
  }
}

async function main() {
  console.log("Exporting database schema...\n");

  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0] + " UTC";
  const lines = [];

  lines.push("# Reentry Resource — Live Database Schema");
  lines.push("");
  lines.push(`> Auto-generated on ${timestamp}`);
  lines.push("> Run \`npm run export-db-schema\` to regenerate");
  lines.push("");

  // Elements
  const whys = await fetchTable("elements", "id,name,slug,definition,sort_order");
  console.log(`  elements: ${whys.length} rows`);
  lines.push(`## Elements (${whys.length})`);
  lines.push("");
  lines.push("| # | Name | Slug | Definition |");
  lines.push("|---|---|---|---|");
  whys.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.slug} | ${w.definition || "—"} |`));
  lines.push("");

  // Categories
  const whats = await fetchTable("categories", "id,name,slug,sort_order");
  console.log(`  categories: ${whats.length} rows`);
  lines.push(`## Categories (${whats.length})`);
  lines.push("");
  lines.push("| # | Name | Slug |");
  lines.push("|---|---|---|");
  whats.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.slug} |`));
  lines.push("");

  // Category → Element mappings
  const mappings = await fetchTable("categories_elements", "category_id,element_id", "category_id");
  console.log(`  what→why mappings: ${mappings.length} rows`);
  const whyLookup = Object.fromEntries(whys.map((w) => [w.id, w.name]));
  const whatLookup = Object.fromEntries(whats.map((w) => [w.id, w.name]));
  lines.push(`## Category → Element Mappings (${mappings.length})`);
  lines.push("");
  lines.push("| Category | Element |");
  lines.push("|---|---|");
  mappings.forEach((m) => {
    lines.push(`| ${whatLookup[m.category_id] || "?"} | ${whyLookup[m.element_id] || "?"} |`);
  });
  lines.push("");

  // WHERE
  const wheres = await fetchTable("modes", "id,name,definition,sort_order");
  console.log(`  modes: ${wheres.length} rows`);
  lines.push(`## Modes (${wheres.length})`);
  lines.push("");
  lines.push("| # | Name | Definition |");
  lines.push("|---|---|---|");
  wheres.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.definition || "—"} |`));
  lines.push("");

  // WHEN
  lines.push(`## WHEN Times (${whens.length})`);
  lines.push("");
  lines.push("| # | Name | Definition |");
  lines.push("|---|---|---|");
  whens.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.definition || "—"} |`));
  lines.push("");

  // HOW
  const hows = await fetchTable("formats", "id,name,definition,sort_order");
  console.log(`  formats: ${hows.length} rows`);
  lines.push(`## Formats (${hows.length})`);
  lines.push("");
  lines.push("| # | Name | Definition |");
  lines.push("|---|---|---|");
  hows.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.definition || "—"} |`));
  lines.push("");

  // WHO
  const whos = await fetchTable("centerings", "id,name,definition,sort_order");
  console.log(`  centerings: ${whos.length} rows`);
  lines.push(`## Centerings (${whos.length})`);
  lines.push("");
  lines.push("| # | Name | Definition |");
  lines.push("|---|---|---|");
  whos.forEach((w, i) => lines.push(`| ${i + 1} | ${w.name} | ${w.definition || "—"} |`));
  lines.push("");

  // Row counts
  console.log("\n  Counting rows...");
  const countTables = [
    "resources", "elements", "categories", "modes",
    "resources_formats", "resources_centerings",
    "shelters", "shelter_pages",
  ];

  lines.push("## Table Row Counts");
  lines.push("");
  lines.push("| Table | Rows |");
  lines.push("|---|---|");
  for (const t of countTables) {
    const count = await countTable(t);
    lines.push(`| ${t} | ${count} |`);
  }
  lines.push("");

  // Shelters
  const shelters = await fetchTable("shelters", "id,name,slug", "name");
  console.log(`  shelters: ${shelters.length} rows`);
  lines.push(`## Shelters (${shelters.length})`);
  lines.push("");
  lines.push("| Name | Slug |");
  lines.push("|---|---|");
  shelters.forEach((s) => lines.push(`| ${s.name} | ${s.slug} |`));
  lines.push("");

  // Resource fields
  lines.push("## Resource Table Fields");
  lines.push("");
  lines.push("| Field | Description |");
  lines.push("|---|---|");
  lines.push("| id | UUID, auto-generated |");
  lines.push("| title | Required, resource name |");
  lines.push("| organization_name | Optional, parent organization |");
  lines.push("| facility_name | Optional, specific facility |");
  lines.push("| description | Short summary (shown on cards) |");
  lines.push("| content | Full detail (HTML + Markdown) |");
  lines.push("| featured_image | URL for card/map images |");
  lines.push("| street_address | Street address |");
  lines.push("| city | City |");
  lines.push("| state | State |");
  lines.push("| zip | ZIP code |");
  lines.push("| region | County or larger area |");
  lines.push("| country | Country |");
  lines.push("| latitude | Decimal coordinate |");
  lines.push("| longitude | Decimal coordinate |");
  lines.push("| phone | Phone number |");
  lines.push("| email | Email address |");
  lines.push("| website | URL |");
  lines.push("| category_id | FK to categories |");
  lines.push("| created_by | Admin email who created |");
  lines.push("| created_at | Auto timestamp |");
  lines.push("| updated_at | Auto timestamp |");
  lines.push("");

  // Write output
  const outPath = path.resolve(__dirname, "../docs/DATABASE_SCHEMA_CURRENT.md");
  fs.writeFileSync(outPath, lines.join("\n") + "\n");

  console.log(`\nDone! Output: docs/DATABASE_SCHEMA_CURRENT.md`);
  console.log(`Total dimension values: ${whys.length + whats.length + wheres.length + whens.length + hows.length + whos.length}`);
}

main().catch((err) => {
  console.error("Export failed:", err.message);
  process.exit(1);
});
