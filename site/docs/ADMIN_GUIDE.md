# Admin Guide

## Logging In

1. Click the **user icon** in the top-left header to open the left sidebar
2. Click **Login** (or navigate directly to `/login`)
3. Enter your admin email and password
4. Once logged in, the sidebar shows admin menu items: Resources, Shelters, Users

---

## Managing Resources

### Adding a Resource

1. Click **Resources** in the admin sidebar
2. Click **Add New**
3. Fill in the form:
   - **Title** (required) — auto-generates the slug
   - **Slug** — URL-friendly identifier, auto-generated from title
   - **Short Description** — shown on resource cards (~150 chars)
   - **How to Engage** — how someone actually accesses this resource (phone, email, walk-in, etc.)
   - **Content** — full details using the TipTap rich text editor (supports HTML, tables, links)
   - **Expiration Date** — leave blank for no expiration; expired resources are hidden from public
   - **Featured Image** — upload or paste URL; if blank, the category's default icon is used
   - **Contact** — phone, email, website
   - **Location** — street address, city, state, ZIP, region, country. Click **Lookup Coordinates** to auto-fill lat/lng
   - **Classifications** — check applicable Categories, Modes, Formats, Centerings
4. Click **Save Resource**

> ⚠️ **Note:** Classifications (Categories, Modes, Formats, Centerings) require junction tables in the database. These are currently missing — resources save without classification until the tables are created. See `docs/DATABASE_SCHEMA_CURRENT.md` for the fix.

### Editing a Resource

1. Go to **Resources** in the admin sidebar
2. Click the **pencil icon** next to the resource
3. Edit any fields and click **Save Changes**

### Deleting a Resource

1. Go to **Resources** in the admin sidebar
2. Click the **trash icon** next to the resource
3. Confirm deletion

### Importing Resources via CSV

1. Go to **Resources** in the admin sidebar
2. Click **Import CSV**
3. Select a CSV file — see `docs/SCRAPING_GUIDE.md` for the full column spec

**Required column:** `title`

**Classification columns** (semicolon-separated values):
- `category` — e.g., `Shelter` or `Shelter; Food`
- `modes` — e.g., `In Person; By Appointment Only`
- `formats` — e.g., `Services`
- `centerings` — e.g., `Veterans; Families` (leave blank if open to everyone)

**Scrape tracking columns:**
- `source_url` — specific page URL for this resource
- `scraped_url` — root URL you scraped (same for all rows in one session)

**Auto-populated on import** (do NOT include in CSV): `scraped_at`, `last_verified_at`, `scrape_status`, `content_hash`

> Use **semicolons** (`;`) to separate multiple values — never commas. Commas break CSV parsing, especially for `Classes, Workshops & Meetings` which contains a comma in the name.

### Exporting Resources to CSV

1. Go to **Resources** in the admin sidebar
2. Click **Export CSV**
3. A CSV file downloads with all resource data (all columns including scrape tracking)

### Admin Table Features

- **Column picker** — click Columns button to show/hide columns
- **Per-column filters** — filter rows by typing in the header inputs
- **Status badge** — shows Active or Expired based on expiration date

---

## Managing Shelters

### Adding a Shelter

1. Click **Shelters** in the admin sidebar
2. Fill in Name, Slug (auto-generated), Short Name, Address, Org Name, Phone, Email, Website, and Password
3. Click **Create Shelter**

### Setting/Changing a Shelter Password

1. Go to **Shelters** in the admin sidebar
2. Click the **Change Password** option
3. Enter the new password and save

### Managing Shelter Pages

1. Click the **pages icon** next to a shelter
2. **Add Page:** fill in Title, Slug, Parent Page (optional, for sub-pages), Sort Order, and Content
3. Content supports HTML, Markdown, and images (click **Insert Image**)
4. **Edit:** pencil icon; **Delete:** trash icon
5. Pages form a nested tree — set Parent Page when creating to make sub-pages

---

## Managing Users

### Adding an Admin User

1. Click **Users** in the admin sidebar
2. Fill in Email and Password (min 8 characters)
3. Click **Create User**

### Inviting a User

1. In the Users page, fill in email under **Invite User**
2. Click **Send Invitation** — they get an email to set their password

### Deleting a User

1. Click the trash icon next to the user
2. Confirm (you cannot delete yourself)

### Changing Your Password

1. Go to **Users** in the admin sidebar
2. Scroll to **Change Your Password**
3. Enter and confirm your new password
4. Click **Update Password**

---

## Classification Reference

### Categories (32)
Use these exact names in CSV imports and the admin form:
Animal Support, Benefits, Case Management, Children Support, Clothing, Crisis Hotlines, Dental, Detox, Education, Email, Employment & Career, Farm Life, Financial, Food, Health Insurance, Housing, ID & Documents, Legal, Medical, Mental & Behavioral Health, Movement, Nature, Parenting, Peer Support, Phone, Recovery, Rental Assistance, Shelter, Skill Building, Toiletries, Transport, Utilities

### Modes (3)
- **In Person** — physical location you visit
- **Online** — website, app, digital service
- **By Appointment Only** — must schedule, register, or call ahead

### Formats (4)
- **Services** — direct help
- **Classes, Workshops & Meetings** — structured learning or group sessions
- **Guidebooks** — standalone documents (PDFs, guides, infographics)
- **Volunteering** — volunteer opportunities

### Centerings (19)
Leave blank if open to everyone. Use these exact names:
ASL or Language Support, BIPOC, Clean & Sober, Couples, Domestic Violence (DV) Survivors, Families, Immigrants Refugees and Asylum Seekers, Justice Impacted, LGBTQIA2S+, Low Barrier, Men, People in Recovery, People with Disabilities, People with Pets/Animals, Seniors, Survivors of Human Trafficking, Veterans, Women, Youth & Children

---

## Resource Filter (Public View)

The **Resource Filter** dropdown appears on all resource pages. It shows:
- **Categories** — filter by service type
- **Formats** — filter by delivery method
- **Centerings** — filter by population served

On Elements pages (Health, Housing, etc.), counts are scoped to that element only.

The **Mode buttons** (In Person / Online) appear above the resource grid for quick filtering.

---

## Dark Mode

Click the **Dark Mode** / **Light Mode** button at the bottom of the right sidebar to toggle.
