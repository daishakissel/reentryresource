# Reentry Resource — Scraping Guide

How to scrape a resource website and create a CSV file that can be imported into the Reentry Resource site.

---

## Overview

1. Visit the resource website
2. Explore the site structure — identify separate programs/services
3. Extract the information for each resource
4. Fill it into the CSV template (one row per resource)
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
title,slug,organization_name,facility_name,description,engage,content,featured_image,category,modes,formats,centerings,street_address,city,state,zip,region,country,latitude,longitude,phone,email,website,expiration_date
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
| featured_image | URL to an image (copy from website or leave blank) | `https://example.com/logo.png` |
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
| latitude | GPS latitude (leave blank — can be looked up later) | |
| longitude | GPS longitude (leave blank — can be looked up later) | |

### Contact
| Column | Description | Example |
|---|---|---|
| phone | Program-specific phone if available, otherwise org main number | `503-693-3262` |
| email | Program-specific email if available | `HeadStart@caowash.org` |
| website | Direct link to the program's page, NOT the org homepage | `https://caowash.org/early-childhood-care-education/head-start` |

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

### Step 7: Compile the CSV

Put one row per resource. Use semicolons (`;`) to separate multiple values in Modes, Formats, and Centerings.

### Step 8: Import and Verify

1. Log in to the admin panel
2. Go to Resources → Import CSV
3. Check the import results
4. Browse the site and click into each resource to verify
5. Edit any resources that need corrections

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
- **Guidebooks** — Information resources (how-to guides, videos, blog posts, infographics)
- **Volunteering** — Volunteer opportunities

---

## Centerings (match exactly — leave blank if general population)

- ASL or Language Support
- BIPOC
- Clean & Sober
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
