# Scrape Queue

URLs queued for scraping, in priority order. Once a URL is scraped, move its entry to `docs/SCRAPED_SOURCES.md` with the date and resource count, and remove it from this list.

---

## Queue

Ordered crawl → walk → run: single-resource orgs first, then orgs with 2-3 known sub-resources, then orgs with 5+ sub-resources or large institutional sites last.

| # | URL | Organization (if known) | Notes | Added |
|---|---|---|---|---|
| 50 | https://www.soberhousingoregonllc.com/ | Sober Housing Oregon | DEFERRED — site returned no indexable content (empty) on 2026-07-01; retry later or contact directly | 2026-06-30 |

🎉 **Queue cleared 2026-07-01** — every other URL has been scraped and moved to `SCRAPED_SOURCES.md`. Only Sober Housing Oregon remains (deferred: empty site). Add new URLs below as they come up.

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
| https://poisedproperties.com/ | Reviewed 2026-07-01 — for-profit property management company (Section 8/LIHTC landlord), not a direct-service org. Excluded. |
| https://www.shelterbridge.org/ | Reviewed 2026-07-01 — a homeless-resource finder app/directory (real-time shelter beds, meals, legal aid), not a direct-service org. Excluded like 211/findhelp. Useful tool; can add on request. |
| https://www.indeed.com/ | Generic job board, not a service organization — if wanted, add directly as a single "Job Search" resource (Employment & Career category) rather than scraping it as a site |
| https://app.smartsheet.com/b/form/6a61de9da2ed4e83b651a90f9ce65e09 | HMIT Referral for Services — Reviewed 2026-07-01: a Smartsheet referral FORM with no describable service content (just a blank form). Not scrapeable as a resource. Excluded. |

## How to use this file

1. Add a row whenever you find a new site worth scraping — URL, org name if known, and any notes (e.g., where you found it, what it specializes in)
2. Give Claude this file (or just say "scrape the next one in the queue") to start working through it
3. After a URL is scraped, it moves to `SCRAPED_SOURCES.md` and is removed from here
