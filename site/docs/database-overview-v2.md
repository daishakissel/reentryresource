# Reentry Resource — Database Overview v2

## Framework: 6 Angles to Resource Discovery

Every resource is defined by 6 angles:

1. **WHY** — Why someone would want this resource
2. **WHAT** — What topic/service the resource covers (auto-assigns WHY)
3. **WHERE** — Where/how the resource is accessed
4. **WHEN** — When the resource is available
5. **HOW** — How the resource is delivered
6. **WHO** — Who the resource centers around and serves

---

## WHY Categories (6)

1. Health — I want this resource to be healthy
2. Housing — I want this resource to secure safe, stable housing
3. Admin — I want this resource to get my paperwork/legal affairs in order
4. Income — I want this resource to increase my income
5. Daily Essentials — I want this resource to access material necessities
6. My Team — I want this resource to build my support network

---

## WHAT Topics (32) — by WHY

**Health (12):** Animal Support, Farm Life, Nature, Children Support, Parenting, Dental, Detox, Recovery, Movement, Medical, Mental & Behavioral Health, Health Insurance

**Housing (4):** Housing, Rental Assistance, Shelter, Utilities

**Admin (2+1 shared):** ID & Documents, Legal, Health Insurance (shared with Health)

**Income (5):** Benefits, Education, Skill Building, Employment & Career, Financial

**Daily Essentials (7):** Clothing, Food, Phone, Email, Toiletries, Transport, Day Center

**My Team (3):** Crisis Hotlines, Peer Support, Case Management

---

## WHERE — Location Types (4)

1. Building — Physical brick-and-mortar location
2. Online — Digital resource via website/app/email
3. Phone — Resource accessed by calling
4. Event — Temporary physical location (fair, pop-up, mobile clinic)

---

## WHEN — Availability Types (4)

1. Anytime — Available 24/7 or open access
2. Daytime — Available during typical daytime hours
3. Walk In — Open for walk-in access, no appointment needed
4. By Appointment — Requires scheduling in advance

---

## HOW — Delivery Formats (9)

1. Classes & Workshops
2. Volunteering
3. Article
4. Infographic
5. Service
6. Podcast
7. Video
8. Book
9. Meetings

---

## WHO — Centerings (19)

1. ASL Support
2. BIPOC
3. Clean & Sober
4. Couples
5. Domestic Violence (DV) Survivors
6. Families
7. Immigrants, Refugees, Asylum Seekers
8. Justice Impacted
9. LGBTQIA2S+
10. Living with HIV
11. Low Barrier
12. Men
13. People in Recovery
14. People with Disabilities
15. People with Pets/Animals
16. Seniors
17. Spanish Speakers
18. Survivors of Human Trafficking
19. Veterans
20. Women
21. Youth & Children

---

## Resource Fields

**Identity & Content:**
- Title (required)
- Organization Name (optional)
- Facility Name (optional)
- Short Description (shown on cards)
- Content (full detail, HTML and Markdown supported)
- Featured Image (URL, shown on cards and map popups)

**Classification (6 Angles):**
- What Topic (one, required — auto-assigns WHY)
- Where Location Types (multiple)
- When Times (multiple)
- How Formats (multiple)
- Who Centerings (multiple)

**Location:**
- Street Address
- City
- State
- ZIP
- Region (county or larger area)
- Country
- Latitude / Longitude (auto-lookup from address)

**Contact:**
- Phone
- Email
- Website

**Metadata:**
- Created At (auto)
- Updated At (auto)
- Created By (admin email)

---

## Shelters

Each shelter has:
- Name, Slug, Password
- Multiple pages (title, slug, content, sort order, optional parent page)
- Pages support tree structure via parent_id

**Current shelters:** Bybee

---

## Admin Users

Managed through Supabase Auth (email + password). Admins can:
- Add/edit/delete resources
- Import/export resources via CSV
- Manage shelters and shelter pages
- Create/delete admin users
- Change their own password
