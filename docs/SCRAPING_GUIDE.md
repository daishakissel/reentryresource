# Reentry Resource — Scraping Guide

How to scrape a resource website and create a CSV file that can be imported into the Reentry Resource site.

---

## Overview

1. Visit the resource website
2. Extract the information listed below
3. Fill it into the CSV template
4. Import the CSV through the admin panel (Resources → Import CSV)

The import process automatically:
- Matches the WHAT topic by name to the database
- Auto-assigns WHY categories based on the WHAT topic relationship
- Creates all junction table entries (WHERE, WHEN, HOW, WHO)
- Generates a URL-friendly slug from the title

---

## CSV Template

Create a CSV file with these column headers (first row). Not all columns are required — only `title` is mandatory.

```
title,slug,organization_name,facility_name,description,engage,content,featured_image,what_topic,where_location_types,when_times,how_formats,who_centerings,street_address,city,state,zip,region,country,latitude,longitude,phone,email,website,expiration_date
```

---

## Column Descriptions

### Required
| Column | Description |
|---|---|
| **title** | Name of the resource (required) |

### Identity & Content
| Column | Description | Example |
|---|---|---|
| slug | URL-friendly name (auto-generated from title if blank) | `portland-rescue-mission` |
| organization_name | Parent organization name | `Portland Rescue Mission` |
| facility_name | Specific facility/location name | `Burnside Shelter` |
| description | Short summary shown on resource cards (~150 chars) | `Emergency shelter for men...` |
| engage | How to access or engage with this resource (short steps) | `Call to schedule intake. Walk-ins accepted Mon-Fri 9am-5pm.` |
| content | Full details (supports HTML and Markdown) | `<h2>Services</h2><p>...` |
| featured_image | URL to an image for the resource card | `https://example.com/image.jpg` |
| expiration_date | Date the resource expires (YYYY-MM-DD). Leave empty for no expiration. | `2026-12-31` |

### Classification (6 Angles)

| Column | Description | Valid Values (semicolon-separated if multiple) |
|---|---|---|
| what_topic | The service type (matched by name) | See WHAT Topics list below |
| where_location_types | How the resource is accessed | `Building; Online; Phone; Event` |
| when_times | When the resource is available | `Anytime; Daytime; Walk In; By Appointment` |
| how_formats | How the resource is delivered | `Services; Classes & Workshops; Meetings; Articles; Videos; Podcasts; Books; Infographics; Volunteering` |
| who_centerings | Who the resource serves (semicolon-separated) | See WHO Centerings list below |

**Note:** The WHY category column is NOT needed. WHY is auto-assigned from the WHAT topic relationship in the database.

### Location
| Column | Description | Example |
|---|---|---|
| street_address | Street address | `111 W Burnside St` |
| city | City | `Portland` |
| state | State | `Oregon` |
| zip | ZIP code | `97209` |
| region | County or region | `Multnomah County` |
| country | Country | `United States` |
| latitude | GPS latitude (auto-looked up if blank) | `45.5231` |
| longitude | GPS longitude (auto-looked up if blank) | `-122.6765` |

### Contact
| Column | Description | Example |
|---|---|---|
| phone | Phone number | `503-906-7690` |
| email | Email address | `info@example.org` |
| website | Website URL | `https://www.example.org` |

---

## WHAT Topics (match these exactly)

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

## HOW Formats (match these exactly — pluralized)

- Classes & Workshops
- Volunteering
- Articles
- Infographics
- Services
- Podcasts
- Videos
- Books
- Meetings

---

## WHO Centerings (match these exactly)

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

## Step-by-Step Scraping Instructions

### Step 1: Visit the Resource Website

Open the resource organization's website in your browser.

### Step 2: Identify the Resource Type

Look at what the organization offers and match it to one of the WHAT topics listed above. For example:
- A food bank → `Food`
- A job training program → `Employment & Career`
- A mental health clinic → `Mental & Behavioral Health`
- An emergency shelter → `Shelter`

### Step 3: Identify the Format

Determine HOW the resource is delivered:
- Direct help (counseling, medical, food distribution) → `Services`
- Training programs, workshops → `Classes & Workshops`
- Support groups, AA/NA meetings → `Meetings`
- Written guides, blog posts → `Articles`
- YouTube videos, tutorials → `Videos`
- Audio content → `Podcasts`
- Reference books → `Books`
- Visual guides, charts → `Infographics`
- Volunteer opportunities → `Volunteering`

A resource can have multiple formats (separated by semicolons).

### Step 4: Extract Information

Look for and note down:

1. **Name/Title**: The organization or program name
2. **Description**: A 1-2 sentence summary of what they offer (~150 characters)
3. **Engage**: How someone accesses this resource — what are the steps? (e.g. "Call to schedule an appointment", "Walk in during business hours", "Visit website to apply online")
4. **Content**: Detailed information about services, eligibility, hours, requirements, etc. Can include HTML formatting.
5. **Address**: Full street address, city, state, ZIP
6. **Phone**: Main phone number
7. **Email**: Contact email
8. **Website**: Their website URL
9. **Image**: Right-click their logo or main image → Copy Image Address
10. **Who they serve**: Check if they mention specific populations (veterans, women, youth, etc.)
11. **When**: Look for hours — are they 24/7? Daytime? By appointment? Walk-in?
12. **How**: Is it a direct service? Classes? Support group meetings? Articles? Videos?
13. **Expiration**: Is this a temporary program? If so, note the end date.

### Step 5: Fill in the CSV

Open the CSV template in Excel, Google Sheets, or a text editor and fill in one row per resource.

**Tips:**
- Use semicolons (`;`) to separate multiple values in WHO, WHERE, WHEN, HOW columns
- Leave blank any fields you can't find — don't guess
- For the description, keep it under 150 characters
- For engage, write clear steps: "1. Call intake line. 2. Complete assessment. 3. Begin services."
- For content, you can use HTML tags like `<b>`, `<ul>`, `<li>`, `<a href="...">`, `<h2>`, etc.
- Copy the image URL from the website for the featured_image column
- For expiration_date, use YYYY-MM-DD format or leave blank for no expiration

### Step 6: Import the CSV

1. Log in to the Reentry Resource admin panel
2. Go to **Resources** in the sidebar
3. Click **Import CSV**
4. Select your CSV file
5. Review the import results — check for any errors

### Step 7: Verify

1. Browse the site to see your imported resources
2. Click into each one to verify the content looks correct
3. Check that the description, engage, and content sections show properly
4. Edit any resources that need corrections through the admin panel

---

## Scraping Multiple Resources from One Site

If a website lists multiple resources (like a directory page):

1. Create one row in the CSV for each individual resource/program
2. They can share the same `organization_name` but have different titles
3. Each may have different addresses, phone numbers, and service types

---

## Example CSV Row

```csv
"Portland Rescue Mission","portland-rescue-mission","Portland Rescue Mission","Burnside Shelter","Emergency shelter and meals for men in Portland.","Call 503-906-7690 to check availability. Walk-ins accepted at 5pm daily for dinner and overnight shelter.","<h2>Services</h2><ul><li>Emergency overnight shelter</li><li>Three meals daily</li><li>Case management</li></ul><h2>Eligibility</h2><p>Men 18+ only. Sobriety required.</p>","https://example.com/prm-logo.jpg","Shelter","Building","Walk In; Anytime","Services; Meetings","Men; Low Barrier; Justice Impacted","111 W Burnside St","Portland","Oregon","97209","Multnomah County","United States","45.5231","-122.6765","503-906-7690","info@portlandrescue.org","https://www.portlandrescue.org",""
```

---

## Resource Display on the Site

Once imported, resources appear on the site with:
- **Card view**: Title, image, short description, topic label
- **Detail page**: Title, labels, map (if address), then toggled sections for Description, Engage, More Info (content), and Contact
- **Grouped by HOW format**: Resources are grouped under format headings (Services, Classes & Workshops, Meetings, etc.)
- **Expired resources**: Resources past their expiration date are automatically hidden from public view but remain in the admin panel marked as "Expired"

---

## After Import: Image Migration (Optional)

If the featured images point to external websites, you can optionally migrate them to Supabase Storage for reliability:

```bash
node scripts/migrate-images.js --dry-run    # preview
node scripts/migrate-images.js              # actual migration
```

This downloads external images, compresses them, uploads to Supabase Storage, and updates the database URLs.
