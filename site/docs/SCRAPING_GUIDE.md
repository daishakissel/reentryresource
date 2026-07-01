# Reentry Resource — Scraping Guide

How to scrape a resource website and create a CSV file that can be imported into the Reentry Resource site.

---

## Overview

1. Visit the resource website
2. Explore the site structure — identify separate programs/services
3. Extract the information for each resource
4. Fill it into the CSV template (one row per resource; **one combined CSV per session** — see Step 8)
5. Import the CSV through the admin panel (Resources → Import CSV)

The import process automatically:
- Matches the Category by name to the database
- Auto-assigns Elements based on the Category relationship
- Creates all junction table entries (Modes, Formats, Centerings)
- Generates a URL-friendly slug from the title

---

## Key Rule: When to Split Into Separate Resources

**If an organization's website has separate pages explaining distinct programs or services, each program should be its own resource row in the CSV.**

For example, if an organization offers:
- Housing assistance (at `/housing`)
- Utility help (at `/utility-assistance`)
- Job training (at `/workforce-training`)

These are **3 separate resources**, not one resource with multiple labels.

**If programs are listed on a single page without separate URLs**, treat it as one resource with the most appropriate single Category and note the sub-programs in the content field.

**Naming convention:** Use a short prefix for the organization followed by the program name. Example: `CAO - Head Start Early Childhood Education` where "CAO" is the abbreviation for "Community Action of Washington County."

---

## CSV Template

Create a CSV file with these column headers (first row). Only `title` is mandatory.

```
title,slug,organization_name,facility_name,description,engage,content,featured_image,category,modes,formats,centerings,street_address,city,state,zip,region,country,latitude,longitude,phone,email,website,expiration_date,source_url,scraped_url
```

---

## Column Descriptions

### Required
| Column | Description |
|---|---|
| **title** | Name of the resource. Use format: `ORG - Program Name` (required) |

### Identity & Content
| Column | Description | Example |
|---|---|---|
| slug | URL-friendly name (auto-generated from title if blank) | `cao-head-start` |
| organization_name | Full parent organization name | `Community Action of Washington County` |
| facility_name | Specific facility/location name (if different from org) | `Hillsboro Multi-Service Center` |
| description | Short summary for resource cards (~150 chars). Focus on what the service does, not the org. | `Free preschool for children birth to age 5 with health screenings and family support.` |
| engage | Clear steps on how to access this resource. Be specific with phone numbers and processes. | `Call (503) 693-3262 or email HeadStart@caowash.org. Apply online or mail application.` |
| content | Full details in HTML. Use headers, lists, and structure. Include eligibility, requirements, hours, and any specifics. | See examples below |
| featured_image | URL to an image (leave blank to use the category's default tarot-card image; only fill if the resource has its own image) | `https://example.com/logo.png` |
| expiration_date | YYYY-MM-DD if temporary. Leave empty for no expiration. | `2026-12-31` |

### Classification

| Column | Description | Valid Values (semicolon-separated if multiple) |
|---|---|---|
| category | The service type — pick ONE that best fits | See Categories list below |
| modes | How the resource is accessed — can have multiple | `In Person; Online; By Appointment Only` |
| formats | How delivered — can have multiple | `Services; Classes, Workshops & Meetings; Guidebooks; Volunteering` |
| centerings | Who it specifically serves — leave blank if general population | See Centerings list below |

**Note:** Elements are auto-assigned from the Category — do NOT include them in the CSV.

### Location
| Column | Description | Example |
|---|---|---|
| street_address | Use the program-specific address if available, otherwise the org's main address | `1001 SW Baseline Street` |
| city | City | `Hillsboro` |
| state | State | `Oregon` |
| zip | ZIP code | `97123` |
| region | County or region | `Washington County` |
| country | Country | `United States` |
| latitude | GPS latitude — look up from address (see Geocoding section below) | `45.5231` |
| longitude | GPS longitude — look up from address (see Geocoding section below) | `-122.9896` |

### Contact
| Column | Description | Example |
|---|---|---|
| phone | Program-specific phone if available, otherwise org main number | `503-693-3262` |
| email | Program-specific email if available | `HeadStart@caowash.org` |
| website | Direct link to the program's page, NOT the org homepage | `https://caowash.org/early-childhood-care-education/head-start` |

### Scrape Tracking
| Column | Description | Example |
|---|---|---|
| source_url | The specific page URL for THIS resource (defaults to `website` if blank) | `https://caowash.org/early-childhood-care-education/head-start` |
| scraped_url | The root/starting URL you were given to scrape (same for every resource from one scraping session) — also add this URL to `docs/SCRAPED_SOURCES.md` | `https://caowash.org` |

**Note:** `scraped_at`, `last_verified_at`, `scrape_status` are auto-populated during import — do NOT include them in the CSV. `content_hash` is also auto-computed during import as an MD5 of the title, description, content, and engage fields combined — this is used later to detect if a resource has changed when re-scraped.

---

## Starting a Scraping Session

Before scraping anything, Claude must ask:

**"How many URLs from `docs/SCRAPE_QUEUE.md` do you want me to scrape in this session?"**

This lets the user start one at a time and scale up to bulk scraping later. Only pull that many URLs from the top of the queue for this session.

---

## Scraping Process — Step by Step

### Step 1: Explore the Homepage

Visit the organization's website. Look for:
- Navigation menu items
- "Our Programs" or "Services" sections
- Cards or links to separate program pages
- An "About" or "What We Do" page

**Write down every distinct program/service you see.**

### Step 2: Check for Separate Pages

Click into each program. If it has its own URL (e.g., `/housing-stability`, `/utility-assistance`), it's a separate resource. If sub-programs within that page ALSO have their own URLs (e.g., `/housing-stability/renter-support`), those are separate resources too.

**Go as deep as the site structure goes.** A page like "Housing Stability" might link to 3 sub-programs, each with their own page — that's 3 resources, not 1.

### Step 2.5: Check for Duplicates

Before treating a discovered page as a new resource, check whether it might already exist in the database:

- Compare the page URL against existing `source_url` and `website` values
- Compare the program name and organization against existing resource titles
- If the same organization was scraped before (check `docs/SCRAPED_SOURCES.md`), pay extra attention — the org may have updated, renamed, or restructured a program that's already in the database

**If a potential duplicate is found, do not silently add or silently skip it.** Stop and ask the user:

> "This looks like it might be a duplicate of [existing resource title] ([existing source_url]). Do you want me to (a) skip it, (b) update the existing resource, or (c) add it as a new separate resource?"

Wait for the user's answer before proceeding with that resource.

### Step 3: For Each Program Page, Extract

1. **Title**: Program name (prefix with org abbreviation)
2. **Description**: Write a 1-2 sentence summary (~150 chars) of what the program DOES. Don't describe the organization — describe the service.
3. **Engage**: How does someone actually access this? Be specific:
   - "Call [number]" — include the actual number
   - "Email [address]" — include the actual email
   - "Apply online at [url]"
   - "Walk in during business hours"
   - "Attend monthly info session on [dates]"
4. **Content**: Build structured HTML with:
   - `<h2>Services</h2>` + `<ul><li>` list of what they offer
   - `<h2>Eligibility</h2>` + requirements
   - `<h2>Hours</h2>` + schedule
   - `<h2>Required Documents</h2>` if applicable
   - Any other relevant sections
5. **Category**: Pick the ONE best match from the list below
6. **Modes**: Is it In Person? Online? By Appointment Only? Can be multiple.
7. **Formats**: Services, Classes/Workshops/Meetings, Guidebooks, or Volunteering?
8. **Centerings**: Does it specifically serve a population? If it's open to everyone, leave blank.
9. **Contact**: Use the program-specific phone/email if different from the org's main number
10. **Website**: Link to the specific program page, not the homepage
11. **Address**: Use the program-specific address if it has one
12. **Latitude/Longitude**: Geocode the address (see Step 7)

### Step 4: Determine Modes

- **In Person** → They have a physical location you visit
- **Online** → They accept online applications, have online classes, or provide digital services
- **By Appointment Only** → You must call ahead, register, or schedule. Examples:
  - "Call on the 15th of each month" → By Appointment Only
  - "Registration required" → By Appointment Only
  - "Walk-ins welcome" → NOT By Appointment Only
  - "Apply online and wait for processing" → By Appointment Only

**Many resources are both In Person AND something else.** A clinic might be `In Person; By Appointment Only`. An online class with registration is `Online; By Appointment Only`.

### Step 5: Determine Centerings

Only mark centerings if the program **explicitly targets** a specific population:
- "For veterans and their families" → `Veterans; Families`
- "Seniors aged 62+" → `Seniors`
- "Families with children" → `Families; Youth & Children`
- "People with criminal history" → `Justice Impacted`
- "Open to all Washington County residents" → leave blank (no centering)

**If a resource has no centerings marked, the site treats it as available to everyone.** Don't guess — only mark what the website explicitly states.

### When Classification Is Unclear: Ask, Don't Guess

If at any point — Category, Modes, Formats, or Centerings — the right classification is genuinely ambiguous, or an existing classification in the list doesn't quite fit what the website describes, **stop and interview the user rather than guessing.** Lean toward caution.

Examples of when to ask:
- A resource seems to span two Categories about equally (e.g., is it `Housing` or `Shelter`?) and picking one feels arbitrary
- The website describes a population that doesn't map cleanly to any existing Centering
- It's unclear whether something counts as `By Appointment Only` vs `In Person` based on vague wording
- A new type of service doesn't fit any existing Category at all

When this happens, present the resource, the ambiguity, and the options, then ask the user to decide. Example:

> "CAO's 'Community Connect' page offers both housing navigation and basic case management — I'm unsure whether to classify it as `Housing` or `Case Management`, or use both. Which would you prefer, or should I add a new Category?"

This keeps the taxonomy clean and avoids silently forcing resources into categories that don't really fit.

### Step 6: Write Good Content HTML

Use this template structure:

```html
<h2>Services</h2>
<ul>
  <li><b>Program Name:</b> Description of what it does</li>
  <li>Another service offered</li>
</ul>

<h2>Eligibility</h2>
<ul>
  <li>Requirement 1</li>
  <li>Requirement 2</li>
</ul>

<h2>Hours</h2>
<p>Monday–Friday, 8:30am–12pm and 1pm–5pm</p>

<h2>Required Documents</h2>
<ul>
  <li>Photo ID</li>
  <li>Proof of income</li>
</ul>
```

### Step 7: Geocode Addresses

For every resource with a physical address, look up the latitude and longitude coordinates. This is required for the map to work.

**Using Google Maps (easiest):**
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for the full address (e.g., `1001 SW Baseline Street, Hillsboro, Oregon 97123`)
3. Right-click on the pin → the coordinates appear at the top of the context menu (e.g., `45.5231, -122.9896`)
4. Click the coordinates to copy them
5. First number is latitude, second is longitude

**Using Photon API (for bulk lookups):**
```
https://photon.komoot.io/api/?q=1001+SW+Baseline+Street+Hillsboro+Oregon+97123&limit=1
```
The result contains `coordinates: [longitude, latitude]` (note: longitude comes first in the API response).

**Tips:**
- If multiple resources share the same address, look it up once and reuse the coordinates
- Online-only resources with no physical location can leave latitude/longitude blank
- Always verify the pin lands on the correct building — some addresses geocode to nearby intersections
- Use 4-6 decimal places for precision (e.g., `45.5231` not `45.5`)

### Step 8: Compile the CSV

Put one row per resource. Use semicolons (`;`) to separate multiple values in Modes, Formats, and Centerings.

**One CSV per session (multi-scrape rule):** When asked to scrape more than one URL in a single session, combine the results of **all** scrapes into a **single CSV file** so the user only imports once. Do not create one file per organization. Name the combined file for the session (e.g. `imports/session-2026-07-01.csv`) and list one row per resource across all organizations. (When only a single URL is scraped, a single org-named CSV is fine.)

**Column count reference — empty location/contact fields:** The columns in order are `centerings, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website`. Count the commas needed to reach the first non-empty contact field:

| First non-empty field after formats/centerings | Commas needed after that field's value |
|---|---|
| `phone` (no address) | 10 commas between `formats` and phone |
| `email` (no address, no phone) | 10 commas between `centerings` and email, OR 11 between `formats` and email |
| `website` (no address, no phone, no email) | 11 commas between `centerings` and website |

The pattern: each empty field between you and the target costs one comma. `street_address` through `phone` = 9 fields = 9 commas, plus 1 for the separator before the value = **10 commas minimum from centerings to email**. Always verify with `python3 -c "import csv; [print(r['phone'], r['email'], r['website']) for r in csv.DictReader(open('file.csv'))]"` before importing.

### Step 9: Import and Verify

1. Log in to the admin panel
2. Go to Resources → Import CSV
3. Check the import results
4. Browse the site and click into each resource to verify
5. Edit any resources that need corrections

### Step 10: Taxonomy Review Pass

At the end of every scraping session, do a quick review of the Categories and Centerings lists based on what was just scraped:

- Were any Categories used so rarely or awkwardly that they should be merged, renamed, or split?
- Did any resources almost fit a Category but not quite — suggesting a gap in the list?
- Were any Centerings never applicable across multiple organizations, suggesting they're too narrow or rare to keep?
- Did the same ambiguity (see "When Classification Is Unclear" above) come up more than once, suggesting a structural fix rather than a one-off decision?

Summarize any findings and present them to the user as suggestions, e.g.:

> "This session scraped 3 organizations. Two of them had programs that didn't cleanly fit `Case Management` or `Benefits` — both were really about helping someone navigate multiple services at once. Should we add a `Navigation` category, or is one of the existing ones meant to cover this?"

If nothing stood out, say so briefly rather than forcing a suggestion. The goal is for the taxonomy to converge over time — as more organizations are scraped, these review passes should become shorter and eventually unnecessary.

### Step 11: Update the Queue and Sources List

1. Remove the scraped URL(s) from `docs/SCRAPE_QUEUE.md`
2. Add an entry to `docs/SCRAPED_SOURCES.md` with the date and resource count

---

## Categories (match exactly)

- Animal Support
- Benefits
- Case Management
- Children Support
- Clothing
- Crisis Hotlines
- Dental
- Detox
- Education
- Email
- Employment & Career
- Farm Life
- Financial
- Food
- Health Insurance
- Housing
- ID & Documents
- Legal
- Medical
- Mental & Behavioral Health
- Movement
- Nature
- Parenting
- Peer Support
- Phone
- Recovery
- Rental Assistance
- Shelter
- Skill Building
- Toiletries
- Transport
- Utilities

---

## Modes (match exactly)

- **In Person** — Physical location you visit
- **Online** — Digital resource (website, app, phone line, email)
- **By Appointment Only** — Must schedule, register, or call ahead

---

## Formats (match exactly)

- **Services** — Direct help (counseling, food distribution, housing placement, etc.)
- **Classes, Workshops & Meetings** — Structured learning, training, or group sessions
- **Guidebooks** — Standalone instructional content (a PDF, article, video, or infographic) that exists independent of a specific program
- **Volunteering** — Volunteer opportunities

### Guidebooks vs. Services — How to Decide

The test is: **is there an actionable next step (apply, call, attend, sign up), or is the page/document purely something you read or watch?**

- **If a page explains something AND lets you act on it** (e.g., a benefits page with eligibility info plus an "Apply" button), classify it as **Services only** — even though it contains informational content. Guidebook is not for mixed pages.
- **An organization's own descriptive page about itself or a program is never a Guidebook**, even if it reads as informational. A hotline's "About our crisis line" page is a `Service` (the hotline itself is the service) — not a `Guidebook`, because the page is the access point.
- **Guidebook applies only to standalone instructional content** that exists independent of any specific program: a downloadable PDF ("How to Apply for SNAP"), a how-to article, an educational video, an infographic. If you'd link directly to a document or article rather than a program page, it's a Guidebook.
- An organization can have both: e.g., a legal aid org might have `CAO - Tenant Rights Hotline` (Service) and `CAO - Know Your Rights Guide` (Guidebook) as two separate resources, if the guide is a standalone document distinct from the hotline.

**Examples:**
- "Call 211 for housing referrals" → Service (actionable, even though it's informational over the phone)
- A PDF titled "Renter's Rights in Oregon" linked from a legal aid site → Guidebook (standalone document, no direct action)
- A benefits eligibility page with an "Apply Now" button → Service only (mixed page, has an actionable step)
- An org's "About Us" or "Our Programs" page describing what they do → Service for whatever program it describes, not Guidebook

---

## Centerings (match exactly — leave blank if general population)

- Clean & Sober
- ASL Support
- BIPOC
- Couples
- Domestic Violence (DV) Survivors
- Families
- Immigrants, Refugees, Asylum Seekers
- Justice Impacted
- LGBTQIA2S+
- Low Barrier
- Men
- People in Recovery
- People with Disabilities
- People with Pets/Animals
- Seniors
- Spanish Speakers
- Survivors of Human Trafficking
- Veterans
- Women
- Youth & Children

---

## Elements (auto-assigned — for reference only)

1. **Health** — Physical, mental, and behavioral health
2. **Housing** — Safe, stable housing
3. **Admin** — Paperwork and legal affairs
4. **Income** — Jobs, benefits, subsidies
5. **Daily Essentials** — Food, clothing, transport, comms
6. **My Team** — Support networks and community

---

## Example: Scraping an Organization with Multiple Programs

**Organization:** Community Action of Washington County (caowash.org)

**Homepage shows:** Housing Stability, Utility Assistance, Early Childhood, Parenting Support, Economic Empowerment

**Step 1:** Click each → they all have separate pages ✓

**Step 2:** Housing Stability links to 3 sub-programs with their own pages → 3 resources

**Result:** 12 separate resources from one organization:

| Resource | Category | Modes |
|---|---|---|
| CAO - Homeless Services & Community Connect | Shelter | In Person |
| CAO - Rent Well Classes | Housing | In Person; Online |
| CAO - Emergency Rent Assistance | Rental Assistance | In Person; By Appointment Only |
| CAO - Utility Assistance | Utilities | In Person; Online |
| CAO - Energy Conservation & Weatherization | Utilities | In Person |
| CAO - Portable AC for Seniors | Utilities | In Person; Online |
| CAO - Head Start Early Childhood Education | Children Support | In Person; By Appointment Only |
| CAO - Child Care Resource & Referral | Children Support | In Person; Online; By Appointment Only |
| CAO - Help Me Grow | Parenting | In Person |
| CAO - Healthy Families Home Visiting | Parenting | In Person |
| CAO - Career Boost Workforce Training | Employment & Career | In Person; By Appointment Only |
| CAO - Financial Education Classes | Financial | Online; By Appointment Only |

---

## Common Mistakes to Avoid

1. **Don't lump everything into one resource.** If the website separates programs, so should we.
2. **Don't guess centerings.** Only mark what the website explicitly states. No centering = available to everyone.
3. **Don't use the org homepage as the website URL.** Link to the specific program page.
4. **Don't use the org's main phone if the program has its own.** Use the program-specific contact.
5. **Don't write vague descriptions.** "Provides services" is useless. "Free weatherization including insulation and heating repair for low-income homeowners" is useful.
6. **Don't write vague engage text.** "Contact us" is useless. "Call 503-906-6550 or email weatherization@caowash.org to apply" is useful.
7. **Don't forget eligibility in the content.** If there are income limits, residency requirements, or age restrictions, include them.
8. **Don't skip the engage field.** This is how someone actually accesses the resource — it's critical.
9. **ONLY use semicolons (`;`) to separate multiple values.** Never use commas as separators inside Modes, Formats, or Centerings fields — commas break the CSV parsing. Example: `In Person; Online; By Appointment Only` not `In Person, Online, By Appointment Only`. This is especially important for `Classes, Workshops & Meetings` which contains commas in its name.
10. **Every resource must have a Format.** If you're unsure, use `Services` as the default. Resources without a format will be grouped under Services automatically.

---

## After Import: Image Migration (Optional)

If featured images point to external websites, migrate them to Supabase Storage:

```bash
node scripts/migrate-images.js --dry-run    # preview
node scripts/migrate-images.js              # actual migration
```
