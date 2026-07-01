# Reentry Resource — Live Database Schema

> Auto-generated on 2026-07-01 13:21:06 UTC
> Run `npm run export-db-schema` to regenerate

## Elements (6)

| # | Name | Slug | Definition |
|---|---|---|---|
| 1 | Health | health | I want this resource to be healthy (physical, mental, behavioral) |
| 2 | Housing | housing | I want this resource to secure safe, stable housing |
| 3 | Admin | admin | I want this resource to get my paperwork/legal affairs in order |
| 4 | Income | income | I want this resource to increase my income (jobs, benefits, subsidies) |
| 5 | Daily Essentials | daily-essentials | I want this resource to access material necessities (food, clothing, transport, comms) |
| 6 | My Team | my-team | I want this resource to build my support network (peer support, relationships, community) |

## Categories (32)

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
| 25 | Phone & Internet | phone-internet |
| 26 | Rental Assistance | rental-assistance |
| 27 | Shelter | shelter |
| 28 | Toiletries | toiletries |
| 29 | Transport | transport |
| 30 | Utilities | utilities |
| 31 | Health Insurance | health-insurance |
| 32 | Day Center | day-center |

## Category → Element Mappings (33)

| Category | Element |
|---|---|
| Food | Daily Essentials |
| Children Support | Health |
| Medical | Health |
| Movement | Health |
| Utilities | Housing |
| Health Insurance | Health |
| Health Insurance | Admin |
| Phone & Internet | Daily Essentials |
| Rental Assistance | Housing |
| Parenting | Health |
| Detox | Health |
| ID & Documents | Admin |
| Mental & Behavioral Health | Health |
| Housing | Housing |
| Transport | Daily Essentials |
| Skill Building | Income |
| Day Center | Daily Essentials |
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

## Modes (3)

| # | Name | Definition |
|---|---|---|
| 1 | In Person | Physical location you visit in person |
| 2 | Online | Digital resource accessible via website, app, phone, or email |
| 3 | By Appointment Only | Requires scheduling or booking in advance |

## Formats (4)

| # | Name | Definition |
|---|---|---|
| 1 | Services | Direct service or appointment-based help (counseling, medical, food distribution, etc.) |
| 2 | Classes, Workshops & Meetings | Structured learning, training sessions, or group meetings (AA, support groups, etc.) |
| 3 | Guidebooks | Online information resources — how-to guides, videos, podcasts, blog posts, infographics, step-by-step instructions |
| 4 | Volunteering | Opportunity to volunteer time or skills |

## Centerings (21)

| # | Name | Definition |
|---|---|---|
| 1 | Clean & Sober | — |
| 2 | ASL Support | Offers American Sign Language (ASL) interpretation or accessibility for the Deaf and hard of hearing |
| 3 | BIPOC | Centers on Black, Indigenous, People of Color |
| 4 | Couples | Designed for couples (relationship counseling, couples housing, etc.) |
| 5 | Domestic Violence (DV) Survivors | Centers on survivors of domestic/intimate partner violence |
| 6 | Families | Serves families (with or without children) |
| 7 | Immigrants, Refugees, Asylum Seekers | Centers on immigrant and refugee populations |
| 8 | Justice Impacted | Serves people with criminal justice system involvement |
| 9 | LGBTQIA2S+ | Centers on LGBTQ+ communities |
| 10 | Living with HIV | Centers on or is specifically for people living with HIV/AIDS |
| 11 | Low Barrier | Minimal/no requirements (no sobriety requirement, no ID needed, etc.) |
| 12 | Men | Specifically serves men |
| 13 | People in Recovery | Centers on people in addiction recovery |
| 14 | People with Disabilities | Accessible and serving people with disabilities |
| 15 | People with Pets/Animals | Welcomes or accommodates pets/animals |
| 16 | Seniors | Serves older adults (55+, 60+, etc.) |
| 17 | Spanish Speakers | Offers services in Spanish or centers on the Spanish-speaking community |
| 18 | Survivors of Human Trafficking | Centers on trafficking survivors |
| 19 | Veterans | Serves military veterans |
| 20 | Women | Specifically serves women |
| 21 | Youth & Children | Serves young people and children |

## Table Row Counts

| Table | Rows |
|---|---|
| resources | 66 |
| elements | 6 |
| categories | 32 |
| modes | 3 |
| resources_formats | ? |
| resources_centerings | ? |
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
| category_id | FK to categories |
| created_by | Admin email who created |
| created_at | Auto timestamp |
| updated_at | Auto timestamp |

