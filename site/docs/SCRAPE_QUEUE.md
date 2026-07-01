# Scrape Queue

URLs queued for scraping, in priority order. Once a URL is scraped, move its entry to `docs/SCRAPED_SOURCES.md` with the date and resource count, and remove it from this list.

---

## Queue

Ordered crawl → walk → run: single-resource orgs first, then orgs with 2-3 known sub-resources, then orgs with 5+ sub-resources or large institutional sites last.

| # | URL | Organization (if known) | Notes | Added |
|---|---|---|---|---|
| 28b | https://www.familyshelter.org/ | My Father's House (Gresham) | Discovered while scraping Family Promise — NOT a Family Promise affiliate; independent Christ-centered family transitional housing in Gresham (food pantry, clothing, case management, children's center). 5003 W Powell Blvd, 503-492-3046 | 2026-07-01 |
| 38 | https://www.pearmentor.org/ | P:ear | | 2026-06-30 |
| 39 | https://poisedproperties.com/ | Poised Properties | | 2026-06-30 |
| 40 | https://www.portlandalano.org/home | Alano Club | | 2026-06-30 |
| 41 | https://quadinc.org/ | QUAD | | 2026-06-30 |
| 42 | https://quest-center.org/ | Quest Center for Integrative Health | | 2026-06-30 |
| 43 | https://rahabs-sisters.org/ | Rahab's Sisters | | 2026-06-30 |
| 44 | https://www.raicesdebienestar.org/ | Raíces de Bienestar | | 2026-06-30 |
| 45 | https://recoverynetworkoforegon.org/ | Recovery Network of Oregon | | 2026-06-30 |
| 46 | https://www.recoveryworksnw.com/ | Recovery Works NW | | 2026-06-30 |
| 47 | https://www.rosecitydetox.com/ | Rose City Detox | | 2026-06-30 |
| 48 | https://serenitylane.org/ | Serenity Lane | | 2026-06-30 |
| 49 | https://www.shelterbridge.org/ | Shelter Bridge | | 2026-06-30 |
| 50 | https://www.soberhousingoregonllc.com/ | Sober Housing Oregon | | 2026-06-30 |
| 51 | https://stjohnsfoodshare.org/ | St. Johns Food Share | | 2026-06-30 |
| 52 | https://www.strongeroregon.com/ | Stronger Oregon | | 2026-06-30 |
| 53 | https://www.thepathfindernetwork.org/ | The Pathfinder Network | | 2026-06-30 |
| 54 | https://thepeercompany.org/ | The Peer Company | | 2026-06-30 |
| 55 | https://www.therecoverygym.org/ | The Recovery Gym | | 2026-06-30 |
| 56 | https://www.truecolorsrecovery.org/ | True Colors | | 2026-06-30 |
| 57 | https://www.williamtemple.org/ | William Temple House | | 2026-06-30 |
| 58 | https://worksourceoregon.org/contact | WorkSource Oregon | | 2026-06-30 |
| 59 | https://app.smartsheet.com/b/form/6a61de9da2ed4e83b651a90f9ce65e09 | HMIT Referral for Services | Smartsheet form, not a normal site — verify it's still active before scraping | 2026-06-30 |
| 60 | https://paulsusi.wordpress.com/pdx-id-assistance/ | Paul Susi (PDX ID Assistance) | Personal/independent site, not an org — verify it's still active | 2026-06-30 |
| 61 | https://sites.google.com/view/fernsplaceinc/home | Fern's Place | Google Sites page, not a standard site — verify it's still active | 2026-06-30 |
| 62 | https://ugmportland.org/help-for-women | Union Gospel Mission Portland (UGM) | Wife's link (LifeChange women's program) had tracking params stripped — verify page still resolves | 2026-06-30 |
| 63 | https://choosework.ssa.gov/ | Ticket to Work Program | Federal government site — scope tightly to this program only | 2026-06-30 |
| 64 | https://www.clackamas.us/communitydevelopment/cccha | Veteran's Village (Do Good Multnomah) | Clackamas County site — scope tightly to this program only | 2026-06-30 |
| 65 | https://healthcenter.multco.us/ | Multnomah County Community Health Center | County government site — scope tightly to this program only | 2026-06-30 |
| 66 | https://multco.us/services/behavioral-health-crisis-services | Multnomah County Behavioral Health Call Center | County government site — scope tightly to this program only | 2026-06-30 |
| 67 | https://www.ohsu.edu/school-of-medicine/general-internal-medicine/harm-reduction-bridges-care-hrbr | OHSU — Harm Reduction & Bridges to Care | Large university hospital site — scope tightly to this program only, do not crawl the rest of ohsu.edu | 2026-06-30 |
| 68 | https://www.portland.gov/fire/community-health/chat | CHAT Team | City of Portland site — scope tightly to this program only | 2026-06-30 |
| 69 | https://www.smpdx.org/clothes.html | The Bethlehem Children's Clothes Closet | Sub-page of a church site (smpdx.org) — scope tightly to this program only | 2026-06-30 |
| 70 | https://blanchethouse.org/ | Blanchet House of Hospitality | Wife found 2 pages: blanchethouse.org/ and blanchethouse.org/blanchet-farm-residential-recovery-program/ — likely 2 separate resources | 2026-06-30 |
| 71 | https://ourjustfuture.org/ | Our Just Future | Wife found 2 pages: ourjustfuture.org/ and ourjustfuture.org/services/homeless-services/ (Gresham Women's Shelter) — likely 2 separate resources | 2026-06-30 |
| 72 | https://portlandrescuemission.org/ | Portland Rescue Mission | Wife found 2 pages: portlandrescuemission.org/ (covers Portland Rescue Mission + New Life Recovery) and portlandrescuemission.org/women-children/ (Shepherd's Door) — likely 2-3 separate resources | 2026-06-30 |
| 73 | https://www.voaor.org/resource-dir/supportive-housing/ | Volunteers of America Oregon (VOA) | Wife found 3 pages: /resource-dir/supportive-housing/ (Latino Home Base Recovery), /home-base-recovery/ (Harry Watson House), /resource-dir/mens-residential-treatment-center-mrc/ — 3 separate resources | 2026-06-30 |
| 74 | https://centralcityconcern.org/ | Central City Concern | Wife found 5 distinct program pages: /recovery-location/hooper-detoxification-stabilization-center/, /recovery-location/old-town-recovery-center/, /recovery-location/puentes/, /recovery-location/letty-owings-center/, /blackburn-center/ — likely 5 separate resources | 2026-06-30 |
| 75 | https://www.dogoodmultnomah.org/refer | Do Good Multnomah | Wife found 3 pages: /refer (used for 7 listings: Arbor Lodge, Downtown Shelter, Kiggins Village, Roseway, St. Johns Village, Stark Street, Veteran's Village), /shelter (NE 82nd Ave Motel), /alternative-shelter (St. Johns Village, Kiggins Village) — explore all 3 starting points, likely several separate shelter-program resources | 2026-06-30 |
| 76 | https://www.oregon.gov/odhs/benefits/Pages/default.aspx | Oregon Dept. of Human Services (ODHS) | State government site. Wife found 8 distinct program pages under oregon.gov covering SNAP, OHP, TANF, TANF-JOBS, ERDC, WIC, Family Support and Connections — likely 8 separate resources, scope each tightly | 2026-06-30 |
| 77 | https://www.tprojects.org/shelters | Transition Projects (TPI) | Wife found 3 pages: /shelters (covers Laurelwood, River District Navigation Center, Walnut Park, Willamette Center, Clark Center, Doreen's Place, Jean's Place, Banfield Shelter Motel), /housing (Home and Family Reunification), / (general org page) — explore all 3, likely many separate shelter-program resources | 2026-06-30 |

---

## Dead Links (URL no longer resolves)

| URL | Organization | Notes |
|---|---|---|
| https://www.au-some-kids.org/ | Au-some Kids | Domain does not resolve as of 2026-07-01. No trace of org online. Skip. |

---

## Not Queued (flagged, not added to scrape queue)

These came up in the wife's CSV but are not being added to the scrape queue as individual organizations:

| URL | Reason |
|---|---|
| https://www.211info.org/ | General referral/directory aggregator, not a single organization — useful as a taxonomy reference, not a scrape target |
| https://www.findhelp.org/ | Same as above — directory aggregator, not a scrape target |
| https://www.indeed.com/ | Generic job board, not a service organization — if wanted, add directly as a single "Job Search" resource (Employment & Career category) rather than scraping it as a site |

## How to use this file

1. Add a row whenever you find a new site worth scraping — URL, org name if known, and any notes (e.g., where you found it, what it specializes in)
2. Give Claude this file (or just say "scrape the next one in the queue") to start working through it
3. After a URL is scraped, it moves to `SCRAPED_SOURCES.md` and is removed from here
