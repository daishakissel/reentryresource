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
title,slug,organization_name,facility_name,description,content,featured_image,what_topic,where_location_types,when_times,how_formats,who_centerings,street_address,city,state,zip,region,country,latitude,longitude,phone,email,website
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
| description | Short summary (shown on cards, ~150 chars) | `Emergency shelter for men...` |
| content | Full details (supports HTML and Markdown) | `<h2>Services</h2><p>...` |
| featured_image | URL to an image for the resource card | `https://example.com/image.jpg` |

### Classification (6 Angles)

| Column | Description | Valid Values (semicolon-separated if multiple) |
|---|---|---|
| what_topic | The service type (matched by name) | See WHAT Topics list below |
| where_location_types | How the resource is accessed | `Building; Online; Phone; Event` |
| when_times | When the resource is available | `Anytime; Daytime; Walk In; By Appointment` |
| how_formats | How the resource is delivered | `Service; Classes & Workshops; Meetings; Article; Video; Podcast; Book; Infographic; Volunteering` |
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

### Step 3: Extract Information

Look for and note down:

1. **Name/Title**: The organization or program name
2. **Description**: A 1-2 sentence summary of what they offer
3. **Content**: Detailed information about services, eligibility, hours, etc.
4. **Address**: Full street address, city, state, ZIP
5. **Phone**: Main phone number
6. **Email**: Contact email
7. **Website**: Their website URL
8. **Image**: Right-click their logo or main image → Copy Image Address
9. **Who they serve**: Check if they mention specific populations (veterans, women, youth, etc.)
10. **When**: Look for hours — are they 24/7? Daytime? By appointment? Walk-in?
11. **How**: Is it a direct service? Classes? Support group meetings?

### Step 4: Fill in the CSV

Open the CSV template in Excel, Google Sheets, or a text editor and fill in one row per resource.

**Tips:**
- Use semicolons (`;`) to separate multiple values in WHO, WHERE, WHEN, HOW columns
- Leave blank any fields you can't find — don't guess
- For the description, keep it under 150 characters
- For content, you can use HTML tags like `<b>`, `<ul>`, `<li>`, `<a href="...">`, `<h2>`, etc.
- Copy the image URL from the website for the featured_image column

### Step 5: Import the CSV

1. Log in to the Reentry Resource admin panel
2. Go to **Resources** in the sidebar
3. Click **Import CSV**
4. Select your CSV file
5. Review the import results — check for any errors

### Step 6: Verify

1. Browse the site to see your imported resources
2. Click into each one to verify the content looks correct
3. Edit any resources that need corrections through the admin panel

---

## Scraping Multiple Resources from One Site

If a website lists multiple resources (like a directory page):

1. Create one row in the CSV for each individual resource/program
2. They can share the same `organization_name` but have different titles
3. Each may have different addresses, phone numbers, and service types

---

## Example CSV Row

```csv
"Portland Rescue Mission","portland-rescue-mission","Portland Rescue Mission","Burnside Shelter","Emergency shelter and meals for men in Portland.","<h2>Services</h2><ul><li>Emergency overnight shelter</li><li>Three meals daily</li><li>Case management</li></ul>","https://example.com/prm-logo.jpg","Shelter","Building","Walk In; Anytime","Service","Men; Low Barrier; Justice Impacted","111 W Burnside St","Portland","Oregon","97209","Multnomah County","United States","45.5231","-122.6765","503-906-7690","info@portlandrescue.org","https://www.portlandrescue.org"
```

---

## After Import: Image Migration (Optional)

If the featured images point to external websites, you can optionally migrate them to Supabase Storage for reliability:

```bash
node scripts/migrate-images.js --dry-run    # preview
node scripts/migrate-images.js              # actual migration
```

This downloads external images, compresses them, uploads to Supabase Storage, and updates the database URLs.
