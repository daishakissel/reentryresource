# Reentry Resource — Live Database Schema

> Auto-generated on 2026-06-22 07:40:43 UTC
> Run `npm run export-db-schema` to regenerate

## WHY Categories (6)

| # | Name | Slug | Definition |
|---|---|---|---|
| 1 | Health | health | I want this resource to be healthy (physical, mental, behavioral) |
| 2 | Housing | housing | I want this resource to secure safe, stable housing |
| 3 | Admin | admin | I want this resource to get my paperwork/legal affairs in order |
| 4 | Income | income | I want this resource to increase my income (jobs, benefits, subsidies) |
| 5 | Daily Essentials | daily-essentials | I want this resource to access material necessities (food, clothing, transport, comms) |
| 6 | My Team | my-team | I want this resource to build my support network (peer support, relationships, community) |

## WHAT Topics (32)

| # | Name | Slug |
|---|---|---|
| 1 | Animal Support | animal-support |
| 2 | Farm Life | farm-life |
| 3 | Nature | nature |
| 4 | Benefits | benefits |
| 5 | Case Management | case-management |
| 6 | Children Support | children-support |
| 7 | Parenting | parenting |
| 8 | Clothing | clothing |
| 9 | Crisis Hotlines | crisis-hotlines |
| 10 | Dental | dental |
| 11 | Detox | detox |
| 12 | Recovery | recovery |
| 13 | Education | education |
| 14 | Skill Building | skill-building |
| 15 | Employment & Career | employment-career |
| 16 | Financial | financial |
| 17 | Movement | movement |
| 18 | Food | food |
| 19 | Housing | housing |
| 20 | ID & Documents | id-documents |
| 21 | Legal | legal |
| 22 | Medical | medical |
| 23 | Mental & Behavioral Health | mental-behavioral-health |
| 24 | Peer Support | peer-support |
| 25 | Phone | phone |
| 26 | Email | email |
| 27 | Rental Assistance | rental-assistance |
| 28 | Shelter | shelter |
| 29 | Toiletries | toiletries |
| 30 | Transport | transport |
| 31 | Utilities | utilities |
| 32 | Health Insurance | health-insurance |

## WHAT → WHY Mappings (33)

| WHAT Topic | WHY Category |
|---|---|
| Food | Daily Essentials |
| Children Support | Health |
| Medical | Health |
| Movement | Health |
| Utilities | Housing |
| Health Insurance | Health |
| Health Insurance | Admin |
| Phone | Daily Essentials |
| Email | Daily Essentials |
| Rental Assistance | Housing |
| Parenting | Health |
| Detox | Health |
| ID & Documents | Admin |
| Mental & Behavioral Health | Health |
| Housing | Housing |
| Transport | Daily Essentials |
| Skill Building | Income |
| Peer Support | My Team |
| Recovery | Health |
| Toiletries | Daily Essentials |
| Employment & Career | Income |
| Financial | Income |
| Shelter | Housing |
| Education | Income |
| Animal Support | Health |
| Benefits | Income |
| Crisis Hotlines | My Team |
| Legal | Admin |
| Dental | Health |
| Farm Life | Health |
| Clothing | Daily Essentials |
| Nature | Health |
| Case Management | My Team |

## WHERE Location Types (4)

| # | Name | Definition |
|---|---|---|
| 1 | Building | Physical brick-and-mortar location where you go in person |
| 2 | Online | Digital resource accessible via website/app/email |
| 3 | Phone | Resource accessed by calling a phone number |
| 4 | Event | Temporary physical location (fair, pop-up, mobile clinic, one-time event, etc.) |

## WHEN Times (4)

| # | Name | Definition |
|---|---|---|
| 1 | Anytime | Available 24/7 or whenever you need (open access) |
| 2 | Daytime | Available during typical daytime hours |
| 3 | Walk In | Open for walk-in access (no appointment needed) |
| 4 | By Appointment | Requires scheduling/booking in advance |

## HOW Formats (9)

| # | Name | Definition |
|---|---|---|
| 1 | Classes & Workshops | Structured learning or training sessions |
| 2 | Volunteering | Opportunity to volunteer time/skills |
| 3 | Article | Written content (blog, guide, resource) |
| 4 | Infographic | Visual/graphical content (diagrams, charts, visual guides) |
| 5 | Service | Direct service or appointment-based help (counseling, medical, etc.) |
| 6 | Podcast | Audio content (series or episode) |
| 7 | Video | Video content (tutorial, educational, story) |
| 8 | Book | Physical or digital book |
| 9 | Meetings | Structured group meetings (AA meetings, support groups, community meetings, etc.) |

## WHO Centerings (19)

| # | Name | Definition |
|---|---|---|
| 1 | Clean & Sober | — |
| 2 | ASL or Language Support | Offers interpretation or accessibility for deaf/hard of hearing or non-English speakers |
| 3 | BIPOC | Centers on Black, Indigenous, People of Color |
| 4 | Couples | Designed for couples (relationship counseling, couples housing, etc.) |
| 5 | Domestic Violence (DV) Survivors | Centers on survivors of domestic/intimate partner violence |
| 6 | Families | Serves families (with or without children) |
| 7 | Immigrants, Refugees, Asylum Seekers | Centers on immigrant and refugee populations |
| 8 | Justice Impacted | Serves people with criminal justice system involvement |
| 9 | LGBTQIA2S+ | Centers on LGBTQ+ communities |
| 10 | Low Barrier | Minimal/no requirements (no sobriety requirement, no ID needed, etc.) |
| 11 | Men | Specifically serves men |
| 12 | People in Recovery | Centers on people in addiction recovery |
| 13 | People with Disabilities | Accessible and serving people with disabilities |
| 14 | People with Pets/Animals | Welcomes or accommodates pets/animals |
| 15 | Seniors | Serves older adults (55+, 60+, etc.) |
| 16 | Survivors of Human Trafficking | Centers on trafficking survivors |
| 17 | Veterans | Serves military veterans |
| 18 | Women | Specifically serves women |
| 19 | Youth & Children | Serves young people and children |

## Table Row Counts

| Table | Rows |
|---|---|
| resources | 115 |
| why_categories | 6 |
| what_topics | 32 |
| where_location_types | 4 |
| when_times | 4 |
| how_formats | 9 |
| who_centerings | 19 |
| what_topics_why_categories | ? |
| resources_where_location_types | ? |
| resources_when_times | ? |
| resources_how_formats | ? |
| resources_who_centerings | ? |
| shelters | 1 |
| shelter_pages | 2 |

## Shelters (1)

| Name | Slug |
|---|---|
| Bybee | bybee |

## Resource Table Fields

| Field | Description |
|---|---|
| id | UUID, auto-generated |
| title | Required, resource name |
| organization_name | Optional, parent organization |
| facility_name | Optional, specific facility |
| description | Short summary (shown on cards) |
| content | Full detail (HTML + Markdown) |
| featured_image | URL for card/map images |
| street_address | Street address |
| city | City |
| state | State |
| zip | ZIP code |
| region | County or larger area |
| country | Country |
| latitude | Decimal coordinate |
| longitude | Decimal coordinate |
| phone | Phone number |
| email | Email address |
| website | URL |
| what_topic_id | FK to what_topics |
| created_by | Admin email who created |
| created_at | Auto timestamp |
| updated_at | Auto timestamp |

