/* ==========================================================================
   REVIEW DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   The 3, 6 and 12-month review at /review. This is the only file that changes
   when the review moves forward a month; page.tsx in this folder holds the
   structure and styling, monogram.ts the monogram.

   STORY LAYOUT (Walter, Nov 10: "update the EEC report the same way" as the
   NYC Dental Smiles review, nycds f42c370). The page reads in the order
   people meet the practice: 01 Seen on Instagram (then What worked), 02 Heard
   on the podcast, 03 Found on Google (with the search breakdown), 04 Visited
   the website, 05 Clicked to book, 06 Kept in touch by email.

   WINDOWS — rolling, each ending on the last full month (October 2026 here),
   each compared with the equal window just before it:
     3 months    Aug – Oct 2026        against May – Jul 2026
     6 months    May – Oct 2026        against Nov 2025 – Apr 2026
     12 months   Nov 2025 – Oct 2026   not compared (Walter, Nov 10: "only
                 show 2025/26 data. Don't show anything from 2024"; the year
                 before holds November and December 2024)

   2025/26 ONLY (Walter, Nov 10) — no month from 2024 in any chart, table,
   tooltip or note in the client view. Charts start January 2025 at the
   earliest (Walter, Nov 10: "January 2025"), or at their record's first full
   month after that.

   COVERAGE RULE (Walter, Nov 9) — a measure appears only in the windows its
   source fully covers, and is compared only where the earlier window is
   covered too. Nothing is shown empty: an uncompared figure carries the date
   its record starts or is shown from. What each source covers, from the Nov 9
   pull:
     Instagram views         from Aug 25, 2025 (no reading Mar 29, 2026)
     Instagram interactions  from Nov 2024 (imported history before Aug 2025);
                             shown from Jan 2025
     Reach, engagement rate  from Jun 12, 2026, so the 3-month view only
     Follower gains/losses   from Dec 31, 2025
     Podcast                 every month; shown from Jan 2025
     Booking links           from Oct 21, 2025 (second pair Jan 23, 2026)
     Homepage short link     from Dec 18, 2025
     Email                   EEC's first campaign Oct 31, 2025
     Search, website         US only, counted from June 2026 (decision 1)

   US ONLY (Walter, Nov 9) — Search and website figures count the US only;
     the pull keeps all-country totals for its self-check and the internal
     notes. The client text never says "US" (Walter, Nov 10). Google lists only
     part of US clicks by page, so US page claims rest on bounds from the
     all-country page list (decision 2). No average position in the client view
     (Walter, Nov 10: "That isn't a marketing term for the client").

   THE SEARCH BREAKDOWN (Walter, Nov 10) — "carefully breakdown the search
     decline and point out that because we did not carry over the blog posts
     and additional pages from the old side, the search results dropped when
     we cut over to the new site", then "As an action step, we have restored
     all of the blog pages and updated all of the redirects on the site." The
     cutover explains the June step down, not the easing from July 2025 to May
     2026, which has no known cause (Walter, Nov 10) and is described without
     one. The launch is "late May 2026" (Walter, Nov 10). Indexing has not been
     requested yet, so the client text leaves it out (Walter, Nov 10).

   WEBSITE SOURCES (Walter, Nov 10: a 2026 breakdown of top referrers) — the
     pull's 12-month source list, which covers all of the site's visit records
     (January 22 – October 31, 2026), the same in every view. The 730
     ad-tagged visits (May – July) are left out while that stretch is confirmed
     (Walter, Nov 10), said plainly without a paid label.

   SOURCES — all read Nov 9, 2026:
     scripts/review-pull.mjs --client eec  → pulls/review/eec/2026-10.json
       (md5 93135e4c…, 145 requests, self-check 13 of 13 against the ledgers;
       Search and GA4 US only, all-country totals kept for the check), and the
       morning's all-country pull 2026-10.all-countries.json for page bounds
     Constant Contact, read in the logged-in app (campaign details and each
       campaign's results), EEC = sent from "Edgard El Chaar, DDS, PC" or
       "DDS PC". 17 EEC campaigns, Oct 31, 2025 to Nov 5, 2026.
     Buzzsprout, custom date range per calendar month.
   ========================================================================== */

type Variant = "client" | "internal";
export const VARIANT: Variant =
  process.env.NEXT_PUBLIC_REPORT_VARIANT === "internal" ? "internal" : "client";
export const IS_INTERNAL: boolean = VARIANT === "internal";

export type WinId = "3m" | "6m" | "12m";

export const WINDOWS: { id: WinId; label: string; period: string; prior: string; months: string[]; priorMonths: string[] }[] = [
  { id: "3m", label: "3 months", period: "August – October 2026", prior: "May – July 2026",
    months: ["2026-08", "2026-09", "2026-10"], priorMonths: ["2026-05", "2026-06", "2026-07"] },
  { id: "6m", label: "6 months", period: "May – October 2026", prior: "November 2025 – April 2026",
    months: ["2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"],
    priorMonths: ["2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04"] },
  /* Not compared this edition (2025/26 only), so prior is never shown. */
  { id: "12m", label: "12 months", period: "November 2025 – October 2026", prior: "not compared",
    months: ["2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"],
    priorMonths: [] },
];
/* The window the page opens on. 12 months is the annual frame Walter asked for. */
export const DEFAULT_WIN: WinId = "12m";

type SectionDef = { id: string; label: string; internalOnly?: boolean };
export const ALL_SECTIONS: SectionDef[] = [
  { id: "instagram", label: "Instagram" },
  { id: "worked", label: "What worked" },
  { id: "podcast", label: "Podcast" },
  { id: "search", label: "Search" },
  { id: "website", label: "Website" },
  { id: "booking", label: "Booking" },
  { id: "email", label: "Email" },
  { id: "numbers", label: "All numbers" },
  { id: "notes", label: "Data notes", internalOnly: true },
  { id: "detail", label: "About" },
];
export const NAV = ALL_SECTIONS.filter((x) => IS_INTERNAL || !x.internalOnly);
export const has = (id: string) => NAV.some((n) => n.id === id);

const pick = <T,>(internal: T, client: T): T => (IS_INTERNAL ? internal : client);

/* Counts of 10,000 or more are shortened in the report text: rounded up to 3
   significant figures, so a figure is never shown below its true value and
   never 1% above it (Walter, Nov 9): 335,377 → 336k, 12,040 → 12.1k, 62,000 → 62k.
   Below 10,000 the exact count is shown. Data tables and chart tooltips keep
   exact counts. */
export const short = (v: number): string => {
  const a = Math.abs(v), sign = v < 0 ? "−" : "";
  if (a < 10000) return sign + a.toLocaleString("en-US");
  // Round up to 3 significant figures: 12.1k, 336k, 1.24M, 12.4M.
  if (a < 100000) return `${sign}${Math.ceil(a / 100) / 10}k`;
  if (Math.ceil(a / 1000) < 1000) return `${sign}${Math.ceil(a / 1000)}k`;
  if (a < 9990000) return `${sign}${Math.ceil(a / 10000) / 100}M`;
  if (a < 99900000) return `${sign}${Math.ceil(a / 100000) / 10}M`;
  return `${sign}${Math.ceil(a / 1000000)}M`;
};


/* ---------------------------------------------------------------- THE LEAD */
/* One headline per window; the switch shows one at a time. Only internalNote
   is internal. The figures under the headline are the JOURNEY row below. */
type Lead = { kicker: string; headline: string; deck: string; internalNote: string; against: boolean };

const SEARCH_DECK = "Search dropped when we cut over to the new site in late May without the old blog posts. We have since restored them.";

const LEAD: Record<WinId, Lead> = {
  "12m": {
    kicker: "The year to October 31, 2026",
    against: false,
    headline: `860 booking link clicks and ${short(335377)} Instagram views over the year.`,
    deck: `The podcast was downloaded 2,033 times, and emails were delivered ${short(37058)} times. Clicks from Google eased from November to May, then dropped when we cut over to the new site in late May without the old blog posts. We have since restored them.`,
    internalNote:
      "Nothing compares at 12 months: the review shows months from January 2025 (Walter, Nov 10), and the year before holds November and December 2024. That retires 2 comparisons: podcast 2,033 against 1,182 (+72.0%; +58.1% without the October 5 week’s 164 browser downloads) and responses 4,974 against 1,395 (+256.6%, on imported history). Search and website count from June (decision 1). The 2026 website sources leave out 730 ad-tagged visits (ig / paid 489, fb / paid 241), all in May to July.",
  },
  "6m": {
    kicker: "May – October 2026",
    against: true,
    headline: "Booking link clicks more than doubled: 110 a month since May, against 46 from February to April.",
    deck: `The account gained 211 followers, net, and the podcast was downloaded 1,182 times. ${SEARCH_DECK}`,
    internalNote:
      `Booking leads on the like-for-like rate (decision 6): 660 against 200 mixes link sets (the second pair went live January 23), so the card and path give no change chip. Views stay out of the lead: +4.8% rests on June 30 and July 1 (${short(19131)} views on 206 reach); without them −6.9%. Responses −11.3% against a window holding November and April. Podcast +19.6% without the 164 browser downloads. Search for the window would read 1,662 clicks (562 in May, the old site’s last month), so it stays out of the table (decision 1).`,
  },
  "3m": {
    kicker: "August – October 2026",
    against: true,
    headline: "Instagram responses rose 68% and booking link clicks 19% against May to July.",
    deck: "The account gained 160 followers, net, against 51, and email clicks rose with the number of emails delivered. The podcast was downloaded 788 times.",
    internalNote:
      "Podcast stays out of the headline: without the October 5 week’s 164 browser downloads, the 3 months read 624, +58.4%. Email clicks follow the send count, 6 campaigns against 3. Views are −5.9% only because of June 30 and July 1; +20.0% without them. The podcast comparison stays out of the deck (Nov 10 review). Search and website are uncompared (counted from June); the first comparison comes with the edition ending November (September – November against June – August).",
  },
};

/* ------------------------------------------------------------- THE JOURNEY */
/* The row under the headline: one figure per chapter, in the order people
   meet the practice. No change percentages here (the chapters carry them,
   with their context). A figure that does not follow the switch says its
   period in the label. Booking at 6 months gives the like-for-like rate, not
   the total's comparison (the link sets differ). */
export type Step = { href: string; step: string; label: string; v: string; sub: string };

const WEB_STEP: Step = { href: "#website", step: "Visited", label: "Website visits counted in 2026", v: "9,586", sub: "January 22 to October 31, the same in every view" };
const SEARCH_STEP: Step = { href: "#search", step: "Found", label: "Clicks from Google, June – October", v: "1,100", sub: "Since the new site launched in late May" };
const JOURNEY: Record<WinId, Step[]> = {
  "3m": [
    { href: "#instagram", step: "Seen", label: "Instagram views", v: short(83177), sub: "With 1,464 responses, against 874" },
    { href: "#podcast", step: "Heard", label: "Podcast downloads", v: "788", sub: "Against 394" },
    { href: "#search", step: "Found", label: "Clicks from Google", v: "678", sub: "Between 223 and 230 a month" },
    WEB_STEP,
    { href: "#booking", step: "Clicked to book", label: "Booking link clicks", v: "359", sub: "Against 301" },
    { href: "#email", step: "Kept in touch", label: "Email clicks", v: "193", sub: "Against 97, on nearly twice the deliveries" },
  ],
  "6m": [
    { href: "#instagram", step: "Seen", label: "Instagram views", v: short(171609), sub: "With 2,338 responses" },
    { href: "#podcast", step: "Heard", label: "Podcast downloads", v: "1,182", sub: "Against 851" },
    SEARCH_STEP,
    WEB_STEP,
    { href: "#booking", step: "Clicked to book", label: "Booking link clicks", v: "660", sub: "More than twice February to April’s monthly rate" },
    { href: "#email", step: "Kept in touch", label: "Email clicks", v: "290", sub: "Against 300, on about the same deliveries" },
  ],
  "12m": [
    { href: "#instagram", step: "Seen", label: "Instagram views", v: short(335377), sub: "With 4,974 responses" },
    { href: "#podcast", step: "Heard", label: "Podcast downloads", v: "2,033", sub: "Across every listening app and the web" },
    SEARCH_STEP,
    WEB_STEP,
    { href: "#booking", step: "Clicked to book", label: "Booking link clicks", v: "860", sub: "The first full year on record" },
    { href: "#email", step: "Kept in touch", label: "Email clicks", v: "590", sub: `From ${short(37058)} deliveries` },
  ],
};

/* --------------------------------------------------------------- THE BRIEF */
const BRIEF = [
  { role: "The windows", text: "Each view ends October 31, 2026. 3 months is August to October, 6 months is May to October, and 12 months is November 2025 to October 2026. The review moves forward each month." },
  { role: "The comparison", text: "The 3 and 6-month views compare each figure with the equal period before it. Where that period is not fully covered, the figure stands alone and says why. The review shows months from January 2025 on, so the 12-month view is not compared." },
  { role: "What is left out", text: "Search and website figures appear in the numbers table only in the 3-month view, the only period wholly on the new site. The charts show the earlier months, the search breakdown covers the full 12 months, and the website sources cover 2026, less 730 visits from May to July while we confirm what brought them." },
];

/* -------------------------------------------------------------- THE NUMBERS */
/* Rows per window. Groups render in chapter order (page.tsx). `prior` and
   `c` together, or `na` alone: never neither. Changes are percent for totals,
   points for rates, and a plain difference for net followers. Every note is
   client-visible unless it sits in noteInternal. No position row: the
   internal search table keeps it. */
export type Row = { group: string; k: string; v: string; prior?: string; c?: string; na?: string; note: string; noteInternal?: string };

const POD_OCT = "October recorded 478, 177 in the week of October 5, most of them through a web browser.";
const POD_DEF = "Downloads across all listening apps and the web.";
const CLICKS_DEF = "People who clicked, counted once per email.";
const HOME_DEF = "Clicks on links.edgardelchaar.com, the short address for the homepage.";
const BOOK_DEF = "Clicks on the Midtown and Upper East Side booking links.";
const CONF_DEF = "Confirmed opens as a share of delivered emails";
const FROM_JUNE = "Not compared this edition";
const AT_3_6 = "Compared at 3 and 6 months";

const NUMBERS: Record<WinId, Row[]> = {
  "3m": [
    { group: "Instagram", k: "Responses", v: "1,464", prior: "874", c: "+67.5%",
      note: "Likes, comments, saves and shares on pieces published in each period. The October 28 implant reel drew 263.",
      noteInternal: "Metricool postsInteractions on the publish date, as read November 9; recent pieces are still gathering. 35 posting days against 38." },
    { group: "Instagram", k: "Net new followers", v: "+160", prior: "+51", c: "+109 followers",
      note: "Followers gained less followers lost. The account ended October at 3,352.",
      noteInternal: "Gained 210, lost 50, against 117 and 66. The account count moved from 3,190 on July 31 to 3,352 on October 31, 2 more than the daily figures." },
    { group: "Instagram", k: "Views", v: short(83177), prior: short(88432), c: "−5.9%",
      note: `Times the account’s content was seen. May to July includes June 30 and July 1, which recorded ${short(19131)} views, the year’s 2 highest days. Without them, this period is ahead.`,
      noteInternal: `June 30 and July 1 read ${short(10865)} and 8,266 views on reach of 146 and 60, with no piece published either day. Without them May to July reads ${short(69301)} and the change is +20.0%. Metricool reports them as is; unexplained.` },
    { group: "Instagram", k: "Reach per day", v: "359", na: "Recorded from June 12, 2026",
      note: "Average accounts reached per day.",
      noteInternal: `${short(33018)} summed daily reach over 92 days: August 329 a day, September 149, October 592. July ran at 861 a day with no piece above 1,100 reach; unexplained, and outside this window.` },
    { group: "Instagram", k: "Engagement rate", v: "4.43%", na: "Recorded from June 12, 2026",
      note: "Responses divided by each day’s reach, summed over the period.",
      noteInternal: `1,464 interactions ÷ ${short(33018)} (reach per day × days), the weekly report’s formula.` },
    { group: "Podcast", k: "Downloads", v: "788", prior: "394", c: "+100.0%",
      note: `${POD_DEF} ${POD_OCT}`,
      noteInternal: "Buzzsprout, custom date range per month: August 148, September 162, October 478. 164 of the October 5 week’s 177 came through Web Browser (EEC October 5 – 11 report), still unexplained; without them the 3 months read 624, +58.4%. Buzzsprout’s app view works by episode, not by date, so the browser share by month is not known." },
    { group: "Search", k: "Search clicks", v: "678", na: FROM_JUNE,
      note: "Clicks from Google searches to the site. Most went to the homepage. The 3 months before include May, on the old site, so search is not compared this edition.",
      noteInternal: "All countries: 715. Google lists only 281 of the 678 US clicks by page (homepage 194, Our Doctors 36, Locations 35), so no homepage count is given: the all-country list has 503 of 715 (page total 747) to the homepage; with at most 69 page clicks from outside the US, at least 434 US clicks (64%) went there." },
    { group: "Search", k: "Search appearances", v: "5,844", na: FROM_JUNE,
      note: "Times the site appeared in Google results." },
    { group: "Search", k: "Search click rate", v: "11.60%", na: FROM_JUNE,
      note: "Clicks as a share of appearances. The rate rose after the new site launched: the old blog posts had appeared often, well down the results, with few clicks, so from February to May fewer than 2 appearances in 100 led to a click.",
      noteInternal: "Average position 5.22 (impression-weighted over the US daily rows), against 14.4 to 18.9 a month from February to May. Kept out of the client view (Walter, Nov 10)." },
    { group: "Website", k: "Visits from Google search", v: "1,092", na: FROM_JUNE,
      note: "Visits from a Google search. 726 engaged with the site. The 3 months before include May, on the old site.",
      noteInternal: "66.5% engaged. GA4, US only, our own traffic left out (eec-prototype.vercel.app, figmentcreative.com). All countries: 1,154." },
    { group: "Website", k: "New visitors", v: "1,631", na: FROM_JUNE,
      note: "First-time visitors to the site.",
      noteInternal: "99 of them reached the 404 page (6%). All countries: 3,670 new visitors, 1,123 to the 404 page (31%), so most of the 404 traffic and more than half of new visitors are outside the US." },
    { group: "Short links", k: "Booking link clicks", v: "359", prior: "301", c: "+19.3%",
      note: `${BOOK_DEF} Both pairs were live through both periods. August brought 178, the most of any month.`,
      noteInternal: "Midtown 192, Upper East Side 167, against 177 and 124. Merges DDS-PC-Midtown and DDS-PC-UES on nycdentalsmileteam.short.gy with eec-booking-midtown and eec-booking-ues; both pairs live in both windows. All clicks, /* filtered, every month read November 9." },
    { group: "Short links", k: "Homepage link clicks", v: "1,623", prior: "1,255", c: "+29.3%",
      note: `${HOME_DEF} August recorded 938.`,
      noteInternal: "The root path only, All clicks, human share unknown. /website (the Instagram bio link, also to the homepage) sits in other named links: July 60, August 208, September 5, October 3." },
    { group: "Email", k: "Emails delivered", v: short(12040), prior: "6,369", c: "+89.0%",
      note: "Total deliveries across every email in the period.",
      noteInternal: `6 campaigns against 3: August 1, September 12, October 19, October 21 and 2 on October 28. ${short(13726)} sent, 1,686 not delivered (12.3%), against 7,239 and 870 (12.0%).` },
    { group: "Email", k: "Email clicks", v: "193", prior: "97", c: "+99.0%",
      note: `${CLICKS_DEF} Clicks rose with the number of emails delivered. National Dental Hygiene Month drew 87.` },
    { group: "Email", k: "Email click rate", v: "1.60%", prior: "1.52%", c: "+0.08 points",
      note: "Clicks as a share of delivered emails." },
    { group: "Email", k: "Confirmed open rate", v: "11.96%", prior: "13.03%", c: "−1.07 points",
      note: `${CONF_DEF}: 1,440 against 830. May to July included the July whitening offer, the highest rate of any email to the whole list since June 2026, 14.5%. All opens, including mail apps that load images on their own: 6,619, 55.0%.`,
      noteInternal: "5,179 of the 6,619 all opens are proxy. July 6: 449 confirmed of 3,093 delivered. The 2 Oral Genome sends read higher (18.9%, 16.7%) on 37 and 36 delivered." },
  ],
  "6m": [
    { group: "Instagram", k: "Net new followers", v: "+211", na: "Recorded from December 31, 2025",
      note: "Followers gained less followers lost. The account ended October at 3,352.",
      noteInternal: "Gained 327, lost 116. May was the only month that lost more than it gained, 30 against 35." },
    { group: "Instagram", k: "Views", v: short(171609), prior: short(163768), c: "+4.8%",
      note: `Times the account’s content was seen. This period includes June 30 and July 1 (${short(19131)} views); without them it is below the 6 months before. No reading for March 29, 2026, so the earlier period counts 180 of 181 days.`,
      noteInternal: `Without June 30 and July 1 this window reads ${short(152478)} and the change is −6.9%. March 29 is the European clock change; Metricool’s own connector returns 0 for it.` },
    { group: "Instagram", k: "Responses", v: "2,338", prior: "2,636", c: "−11.3%",
      note: "Likes, comments, saves and shares. October brought 783, the most of any month. The earlier 6 months included November and April, the 2 strongest months before October 2026.",
      noteInternal: "73 posting days against 60." },
    { group: "Podcast", k: "Downloads", v: "1,182", prior: "851", c: "+38.9%",
      note: `${POD_DEF} ${POD_OCT}`,
      noteInternal: "October’s 478 is 40% of the window. Without the October 5 week’s 164 browser downloads, +19.6%." },
    { group: "Short links", k: "Booking link clicks", v: "660", prior: "200", c: "+230.0%",
      note: `${BOOK_DEF} The second pair went live January 23. From February to April, with all links live, clicks averaged 46 a month, against 110 since May.`,
      noteInternal: "Midtown 369, Upper East Side 291, against 102 and 98. Monthly 57, 95, 149, 178, 96, 85. November to January had the DDS-PC pair only (46, 7, 9)." },
    { group: "Short links", k: "Homepage link clicks", v: "2,878", na: "Recorded from December 2025",
      note: HOME_DEF,
      noteInternal: "The links.edgardelchaar.com links were created from December 18, 2025, so November 2025 has no homepage link and the 6 months before are not covered." },
    { group: "Email", k: "Emails delivered", v: short(18409), prior: short(18649), c: "−1.3%",
      note: "Total deliveries across every email. Level with the 6 months before.",
      noteInternal: "9 campaigns against 6. 2,556 not delivered (12.2%) against 3,086 (14.2%); the February 27 podcast newsletter alone lost 1,071 of 3,568." },
    { group: "Email", k: "Email clicks", v: "290", prior: "300", c: "−3.3%",
      note: `${CLICKS_DEF} Level with the 6 months before, which included the February podcast newsletter (114).` },
    { group: "Email", k: "Email click rate", v: "1.58%", prior: "1.61%", c: "−0.03 points",
      note: "Clicks as a share of delivered emails. The earlier 6 months included the February podcast newsletter, the highest rate of any email, 4.6%." },
    { group: "Email", k: "Confirmed open rate", v: "12.33%", na: "From the June 23, 2026 email",
      note: `2,270 confirmed opens, as a share of delivered emails. All opens, including mail apps that load images on their own: ${short(10112)}, 54.9%.`,
      noteInternal: "Before June 23 Constant Contact reported confirmed opens equal to all opens on every email except February 11 (and March 20, 7 proxy), so November to April has no comparable figure. No email went out between March 20 and June 23." },
  ],
  "12m": [
    { group: "Instagram", k: "Views", v: short(335377), na: "Recorded from August 25, 2025",
      note: `Times the account’s content was seen. Includes June 30 and July 1, the year’s 2 highest days (${short(19131)} views). No reading for March 29, 2026, so the year counts 364 of 365 days.`,
      noteInternal: `June 30 and July 1 carry ${short(19131)} between them.` },
    { group: "Instagram", k: "Responses", v: "4,974", na: AT_3_6,
      note: "Likes, comments, saves and shares on pieces published in the year. The October 28 implant reel drew the most, 263, and Dr. Castillo’s April 2 reel the second-most, 255.",
      noteInternal: "133 posting days. Not compared (2025/26 only): November 2024 – October 2025 read 1,395 on 24 posting days, from the post history Metricool imported before August 25, 2025." },
    { group: "Podcast", k: "Downloads", v: "2,033", na: AT_3_6,
      note: `${POD_DEF} ${POD_OCT}`,
      noteInternal: "Not compared (2025/26 only): November 2024 – October 2025 read 1,182 (+72.0%; +58.1% without the October 5 week’s 164 browser downloads)." },
    { group: "Short links", k: "Booking link clicks", v: "860", na: "Recorded from October 21, 2025",
      note: `${BOOK_DEF} A second pair went live January 23, 2026. August 2026 brought 178, the most of any month.`,
      noteInternal: "Midtown 471, Upper East Side 389. October 2025 (from October 21) read 2." },
    { group: "Email", k: "Emails delivered", v: short(37058), na: "Recorded from October 31, 2025",
      note: "Total deliveries across every email.",
      noteInternal: `15 campaigns, ${short(42700)} sent, 5,642 not delivered (13.2%). The year before holds only the October 31, 2025 send (3,380 delivered, 91 clicks), so no comparison is shown.` },
    { group: "Email", k: "Email clicks", v: "590", na: "Recorded from October 31, 2025",
      note: `${CLICKS_DEF} The February podcast newsletter drew 114, the most of any email.` },
    { group: "Email", k: "Email click rate", v: "1.59%", na: "Recorded from October 31, 2025",
      note: "Clicks as a share of delivered emails." },
  ],
};

/* ---------------------------------------------------------- MONTH BY MONTH */
/* Monthly bars. Bars take the window's colors through CSS: plum for the
   selected window, a lighter plum for the earlier window where that window is
   compared (`priorIn`), pale plum for every other month. Above the bars a
   bracket per window names each period and its total, worked out on the page
   from these points, so the brackets always add up to the bars; `bracketIn`
   limits them to the windows the numbers table counts (Search and website:
   3 months). `ann` labels one month; `band` shades a stretch of months. */
export type Ann = { m: string; text: string };
export type Band = { from: string; to: string; text: string };
export type Chart = { id: string; title: string; unit: string; note: string; priorIn: WinId[]; bracketIn?: WinId[]; points: { m: string; v: number }[]; ann?: Ann[]; band?: Band };

const months = (start: string, values: number[]) => {
  const [y0, m0] = start.split("-").map(Number);
  return values.map((v, i) => {
    const t = (m0 - 1) + i;
    return { m: `${y0 + Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}`, v };
  });
};

const NEW_SITE: Band = { from: "2026-06", to: "2026-10", text: "New site" };

const CHARTS_ALL: (Chart & { internalOnly?: boolean })[] = [
  { id: "c-views", title: "Instagram views", unit: "views", priorIn: ["3m", "6m"],
    points: months("2025-09", [14213, 25686, 34281, 44950, 11078, 25049, 26602, 21808, 16029, 27193, 45210, 28892, 17107, 37178]),
    note: `By month, from September 2025. June and July include June 30 and July 1, the year’s 2 highest days (${short(19131)} views between them). No reading for March 29, 2026.` },
  { id: "c-resp", title: "Instagram responses", unit: "responses", priorIn: ["3m", "6m"],
    points: months("2025-01", [159, 168, 106, 105, 93, 0, 29, 49, 0, 179, 637, 220, 287, 343, 494, 655, 241, 322, 311, 448, 233, 783]),
    ann: [{ m: "2026-10", text: "Implant reel" }],
    note: "Likes, comments, saves and shares, by the month a piece was published, from January 2025. June and September 2025 show none." },
  { id: "c-pod", title: "Podcast downloads", unit: "downloads", priorIn: ["3m", "6m"],
    points: months("2025-01", [103, 55, 61, 226, 251, 81, 57, 69, 38, 121, 135, 42, 70, 208, 172, 224, 116, 59, 219, 148, 162, 478]),
    note: "By month, from January 2025, across all listening apps and the web. October 2026 includes 177 in the week of October 5." },
  { id: "c-search", title: "Clicks from Google", unit: "clicks", priorIn: [], bracketIn: ["3m"],
    points: months("2025-07", [1819, 1649, 1271, 1188, 1075, 981, 919, 653, 734, 688, 562, 208, 214, 225, 230, 223]),
    band: NEW_SITE,
    note: "From July 2025, the first full month on record. Shaded: the new site, launched in late May 2026 without the old site’s blog posts. The numbers table shows search in the 3-month view only." },
  { id: "c-appear", title: "Appearances in Google results", unit: "appearances", priorIn: [], bracketIn: ["3m"],
    points: months("2025-07", [109909, 98030, 66387, 53076, 47717, 46535, 51700, 35268, 48159, 42933, 41530, 3839, 2071, 1940, 1990, 1914]),
    band: NEW_SITE,
    note: "From July 2025. Before the new site, the old blog posts appeared often, usually well down the results. They left Google’s results between late May and mid-June 2026." },
  { id: "c-google", title: "Visits from Google search", unit: "visits", priorIn: [], bracketIn: ["3m"],
    points: months("2026-02", [902, 1061, 980, 714, 367, 386, 377, 361, 354]),
    band: NEW_SITE,
    note: "From February 2026, the first full month of the site’s visit records. Visits from Google stepped down with search when the new site launched: 981 a month from February to April, 369 from June to October. Shaded: the new site. The records have no data for May 23, 25 and 27, 2026." },
  { id: "c-book", title: "Booking link clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [46, 7, 9, 82, 35, 21, 57, 95, 149, 178, 96, 85]),
    ann: [{ m: "2026-02", text: "Both pairs live" }],
    note: "From November 2025, the first full month on record. The second pair of booking links went live January 23, 2026." },
  { id: "c-home", title: "Homepage link clicks", unit: "clicks", priorIn: ["3m"],
    points: months("2026-01", [61, 69, 66, 114, 239, 634, 382, 938, 345, 340]),
    note: "From January 2026. The short address was created December 18, 2025." },
  { id: "c-mail", title: "Email clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [79, 36, 0, 157, 28, 0, 0, 2, 95, 55, 14, 124]),
    ann: [{ m: "2026-02", text: "Podcast newsletter" }, { m: "2026-10", text: "Hygiene Month" }],
    note: "By month sent, from November 2025. Zero means no email that month." },
  { id: "c-deliv", title: "Emails delivered", unit: "deliveries", priorIn: ["3m", "6m"],
    points: months("2025-11", [6597, 3228, 0, 5692, 3132, 0, 0, 205, 6164, 3028, 2990, 6022]),
    note: "By month sent, from November 2025. The first email under the practice’s name went out October 31, 2025." },
];
const CHART = (id: string) => CHARTS_ALL.find((c) => c.id === id) as Chart;

/* -------------------------------------------------------------- REFERRERS */
/* Walter, Nov 10: "a 2026 breakdown of top referrers" (option A, no new
   pull). Website visits (sessions) by where they came from, from the pull's
   12-month source list, which covers all of GA4's record: January 22 to
   October 31, 2026. US, own traffic out (eec-prototype.vercel.app,
   figmentcreative.com). The same in every view. Grouping follows NYCDS
   decision 10, with 4 additions this pull needed: l.facebook.com in
   Facebook, webmail1.earthlink.net in Email, Yahoo's own search hosts in
   Yahoo, and DuckDuckGo (60) on its own row as a search engine. Left out: the 730 ad-tagged visits (ig / paid 489,
   fb / paid 241), all in May – July, while that stretch is confirmed (Walter,
   Nov 10: "Leave them out, as NYCDS"). No spam referral in the list. */
export type Ref = { k: string; v: number; share: string };
const REF_ROWS: Ref[] = [
  { k: "Google search", v: 5926, share: "62%" },
  { k: "Direct", v: 2800, share: "29%" },
  { k: "Bing", v: 261, share: "3%" },
  { k: "Yahoo", v: 184, share: "2%" },
  { k: "Facebook", v: 63, share: "0.7%" },
  { k: "DuckDuckGo", v: 60, share: "0.6%" },
  { k: "Instagram", v: 56, share: "0.6%" },
  { k: "Email", v: 37, share: "0.4%" },
  { k: "ChatGPT", v: 8, share: "0.1%" },
  { k: "Other sources", v: 191, share: "2%" },
];
const REF_INTERNAL = [
  "GA4 sessions by session source / medium, US, the pull’s 12-month list (ga4.windows.12m.sources: 10,316 sessions, against 10,383 in the window totals and 10,242 summed by month; GA4 counts sessions differently by breakdown). Shown: 9,586, after leaving out the 730 ad-tagged visits. Grouping: Google search = google / organic; Instagram = l.instagram.com 29, later-linkinbio 24, instagram.com 3; Facebook = m.facebook.com 34, facebook.com 24, l.facebook.com 5; Email = campaignlp.constantcontact.com 29, myemail.constantcontact.com 4, mail.google.com 2, webmail1.earthlink.net 2; Yahoo = yahoo / organic 182 plus us.search.yahoo.com and images.search.yahoo.com (1 each); ChatGPT = chatgpt.com, any medium (6, 1, 1).",
  "Ad-tagged visits, all in May to July (in the 6 and 12-month lists, none in the 3-month list): ig / paid 489 (31 engaged, 476 new users) and fb / paid 241 (10 engaged). That is Meta’s ad tagging, so Meta ads ran in the stretch. The daily figures put it in July: sessions jump from about 20 a day to 40 to 110 from July 2, with low engagement, and July US new visitors read 1,207 against 396 in June and 569 in August; July Instagram reach ran at 861 a day. With them, Instagram would read 545 and Facebook 304. The client note says 730 visits from May to July are left out while we confirm that stretch, without a paid label (no boost or paid mentions). Ask Walter what ran in July.",
  "Other sources (191): app.constantcontact.com 16 (the email app, likely previews), langerperio.com 20, aocr.org 19 (1 engaged), vendor sales tools 43 (Salesforce for Cherry, Synchrony, Dental Intel, Loyal Source, Sunbit, ADP, US Pay Group, Overjet), creators.yahoo.com 12, yahoo.com referral 9 and currently.att.yahoo.com 1, youtube.com 11, a hosting panel 17, (not set) 7, Ecosia 8, and single sites (Wikipedia 4, LinkedIn 4, Birdeye 2, Yelp 2, pemphigus.org 5, and others).",
];

/* ------------------------------------------------------------ WHAT WORKED */
export type Piece = { url: string; format: string; date: string; title: string; views: number; reach: number; responses: number; why?: string };

const P = {
  implant: { url: "https://www.instagram.com/reel/DfDRO6eBL4Q/", format: "Reel", date: "October 28, 2026", title: "There is more to implant success than what happens in the bone.", views: 11826, reach: 9350, responses: 263,
    why: "88 seconds with Mélissa M. Seif on the implant-abutment connection, cut from the podcast. The most views, the widest reach and the most responses of any piece in the 12 months; 67 people saved it." },
  shiloah: { url: "https://www.instagram.com/p/DcjlJ9MmdxM/", format: "Post", date: "August 27, 2026", title: "Welcoming Dr. Jonathan Shiloah, the practice’s newest orthodontist", views: 7206, reach: 3269, responses: 115 },
  biology: { url: "https://www.instagram.com/reel/Dd9nF-Izyen/", format: "Reel", date: "October 1, 2026", title: "New episode: Biology Always Wins, with Mélissa M. Seif", views: 3575, reach: 2104, responses: 162 },
  hudson: { url: "https://www.instagram.com/p/DehsxlCGYTA/", format: "Post", date: "October 15, 2026", title: "A few more moments from the day at Hudson Yards", views: 2819, reach: 1063, responses: 84 },
  campana: { url: "https://www.instagram.com/reel/DYSOcwGhzJn/", format: "Reel", date: "May 13, 2026", title: "Winemaker Andrés Campana on craftsmanship and identity", views: 2055, reach: 1117, responses: 105 },
  castillo1: { url: "https://www.instagram.com/reel/DWWoVf0h7mA/", format: "Reel", date: "March 26, 2026", title: "How Dr. Castillo approaches patient care", views: 4448, reach: 2325, responses: 199 },
  castillo2: { url: "https://www.instagram.com/reel/DWpPFRDgeGo/", format: "Reel", date: "April 2, 2026", title: "Dr. Castillo: educate patients, respect their decisions", views: 3690, reach: 2240, responses: 255 },
} satisfies Record<string, Piece>;

const WORKED: Record<WinId, { gallery: Piece[]; note: string }> = {
  "3m": { gallery: [P.shiloah, P.biology, P.hudson],
    note: "The next 2 by views, plus the Hudson Yards post: the best response rate of any piece above 1,000 reach, 7.9%." },
  "6m": { gallery: [P.shiloah, P.biology, P.campana],
    note: "The next 2 by views, plus the Andrés Campana reel: the best response rate of any piece above 1,000 reach, 9.4%." },
  "12m": { gallery: [P.shiloah, P.castillo1, P.castillo2],
    note: "The next 2 by views, plus Dr. Castillo’s April 2 reel: the best response rate of any piece above 1,000 reach, 11.4%, and the second-most responses, 255." },
};

/* ------------------------------------------------------------------ SEARCH */
const SEARCH_TABLE = {
  head: ["Month", "Search clicks", "Appearances", "Click rate", "Position"],
  rows: [
    ["July 2025", "1,819", "109,909", "1.66%", "22.26"],
    ["August 2025", "1,649", "98,030", "1.68%", "25.71"],
    ["September 2025", "1,271", "66,387", "1.91%", "17.57"],
    ["October 2025", "1,188", "53,076", "2.24%", "12.32"],
    ["November 2025", "1,075", "47,717", "2.25%", "14.22"],
    ["December 2025", "981", "46,535", "2.11%", "15.43"],
    ["January 2026", "919", "51,700", "1.78%", "15.61"],
    ["February 2026", "653", "35,268", "1.85%", "14.37"],
    ["March 2026", "734", "48,159", "1.52%", "16.71"],
    ["April 2026", "688", "42,933", "1.60%", "17.14"],
    ["May 2026", "562", "41,530", "1.35%", "18.88"],
    ["June 2026", "208", "3,839", "5.42%", "13.50"],
    ["July 2026", "214", "2,071", "10.33%", "4.79"],
    ["August 2026", "225", "1,940", "11.60%", "5.99"],
    ["September 2026", "230", "1,990", "11.56%", "4.33"],
    ["October 2026", "223", "1,914", "11.65%", "5.38"],
  ],
};

const SEARCH_INTERNAL = [
  "The break: daily US appearances averaged 1,475 for May 1 to 27, 426 for May 28 to 31, 179 for June 1 to 14 and 83 for June 15 to 30. GA4 has no rows for May 23, 25 and 27 (likely the switch-over); the 404 page first appears in May (26 US new users that month). February to April averaged 692 US clicks and 981 Google visits a month; June to October, 220 and 369. US position 14.4 to 18.9 a month February to May, 4.3 to 6.0 from July. The US share of clicks rose from 78% (February to April) to 94% (June to October): the old posts drew more searches from outside the US.",
  "Page bounds (decision 2). Assumption: US page-level clicks are at least US site clicks (page totals run at or above site totals in every list). The 4-post bound has 81 clicks of margin. From the all-country page list (the morning pull): 12 months 8,715 page clicks against 8,610 site clicks. Old pages (no row in the August to October list) 6,160; the 4 posts 4,769 (/dry-socket-with-bone-graft/ 1,954, /signs-of-failed-gum-graft/ 1,543, /accidentally-blew-nose-after-sinus-lift/ 810, /how-painful-is-a-sinus-lift/ 462). 1,898 clicks came from outside the US, so at least 4,262 US clicks (63%) went to old pages and 2,871 (43%) to the 4. Allowing for the 105-click gap between page and site totals: at least 4,157 and 2,766, more than 61% and 40% of any US page total. The client text says “more than 60%” and “more than 40%”. The rule is conservative: /doctors-and-periodontists-at-upper-east-side/ (253) still drew clicks in August to October, so it counts as current.",
  "Top US queries, August to October: edgard el chaar 83 clicks at position 3.7, dr el chaar 45 at 8.1, edgar el chaar 44 at 1.4. The 12-month list still carries old-article questions: “i blew my nose after a sinus lift” 97, “dry socket after bone graft” 65, “dry socket with bone graft” 65, “can you get dry socket with a bone graft” 49.",
  "The restore (claude/eec/v1-articles-restore.md): by November 9 all 43 article pages were live at their V1 addresses with their original dates; the Dental Blog index is at /dental-blog/; 7 redirects end on a 200 (the 4 stubs to service pages; /category/dental-blog/, the paging regex and /author/edgard-el-chaar/ to /dental-blog/). After October 31, so no figure reflects it. Indexing has not been requested yet for the 4 high-traffic pages and /dental-blog/ (Walter, Nov 10), so the client text leaves it out. Launch given as “late May 2026”; the July 2025 to May 2026 easing has no known cause (Walter, Nov 10) and is described without one.",
];

/* Top searches (Walter, Nov 10: "also top search queries"). The searches that
   led to the most clicks in each window, from the US query lists in the pull:
   the top 10 by clicks, cut so no tie is split (3m 10, 6m 8, 12m 9). Google
   lists a search on its own only when enough people make it, so each note
   gives the listed share of the window's clicks. No position (client rule). */
export type Query = { q: string; clicks: number; appearances: number };
const TOP_QUERIES: Record<WinId, { rows: Query[]; note: string }> = {
  "3m": { rows: [
    { q: "edgard el chaar", clicks: 83, appearances: 256 },
    { q: "dr el chaar", clicks: 45, appearances: 258 },
    { q: "edgar el chaar", clicks: 44, appearances: 123 },
    { q: "dr el chaar nyc", clicks: 20, appearances: 70 },
    { q: "dr edgard el chaar", clicks: 18, appearances: 88 },
    { q: "el chaar", clicks: 12, appearances: 82 },
    { q: "anamaria castillo", clicks: 10, appearances: 53 },
    { q: "el char", clicks: 8, appearances: 55 },
    { q: "dr. el chaar", clicks: 7, appearances: 39 },
    { q: "edgard el chaar dds pc", clicks: 5, appearances: 28 },
  ], note: "Each names Dr. El Chaar, in several spellings, or Dr. Castillo. Google lists a search on its own only when enough people make it: the 169 searches it lists account for 265 of the 678 clicks from August to October." },
  "6m": { rows: [
    { q: "edgard el chaar", clicks: 138, appearances: 543 },
    { q: "dr el chaar", clicks: 85, appearances: 485 },
    { q: "edgar el chaar", clicks: 75, appearances: 261 },
    { q: "dr edgard el chaar", clicks: 36, appearances: 174 },
    { q: "el chaar", clicks: 34, appearances: 191 },
    { q: "dr el chaar nyc", clicks: 23, appearances: 81 },
    { q: "i blew my nose after a sinus lift", clicks: 19, appearances: 125 },
    { q: "anamaria castillo", clicks: 16, appearances: 104 },
  ], note: "All but 1 name Dr. El Chaar or Dr. Castillo. The other asks about blowing your nose after a sinus lift, the subject of 1 of the old blog posts, which we have since restored. Google lists a search on its own only when enough people make it: the 2,015 searches it lists account for 602 of the 1,662 clicks from May to October, which include May, the old site’s last month." },
  "12m": { rows: [
    { q: "edgard el chaar", clicks: 308, appearances: 1202 },
    { q: "dr el chaar", clicks: 185, appearances: 1041 },
    { q: "edgar el chaar", clicks: 131, appearances: 422 },
    { q: "i blew my nose after a sinus lift", clicks: 97, appearances: 838 },
    { q: "el chaar", clicks: 82, appearances: 429 },
    { q: "dr edgard el chaar", clicks: 68, appearances: 296 },
    { q: "dry socket after bone graft", clicks: 65, appearances: 765 },
    { q: "dry socket with bone graft", clicks: 65, appearances: 1061 },
    { q: "can you get dry socket with a bone graft", clicks: 49, appearances: 1361 },
  ], note: "Searches for Dr. El Chaar lead. 4 of the 9 ask about blowing your nose after a sinus lift or dry socket after a bone graft, the subjects of 2 of the old blog posts, which we have since restored. Google lists a search on its own only when enough people make it: the 6,838 searches it lists account for 2,093 of the 6,712 clicks from November 2025 to October 2026." },
};

/* The search breakdown, the same in every view (Walter, Nov 10). Step 2's
   first sentence and step 4's are Walter's own wording (step 4 narrowed to
   "the blog's redirects", Walter Nov 10, after 6 old non-blog addresses were
   found still on the 404 page). The share bars are lower bounds
   from decision 2 (see SEARCH_INTERNAL), drawn at the bound. */
export type BreakStep = { when: string; h: string; b: string };
export type ShareRow = { k: string; sub: string; pct: number; v: string };
const BREAKDOWN = {
  kicker: "Found on Google",
  title: "What happened to search",
  lede: "Search moved in 2 stages. Clicks eased through the months before the new site, then dropped when we cut over to the new site without the old site’s blog posts. Here is each step, and what we have done.",
  steps: [
    { when: "July 2025 – May 2026", h: "Before the new site",
      b: "Clicks from Google eased from 1,819 in July 2025 to 562 in May 2026. From November to May, most went to the pages we did not carry over to the new site, above all blog posts answering questions such as dry socket after a bone graft and blowing your nose after a sinus lift. These posts appeared often in Google, usually well down the results, so from February to May fewer than 2 appearances in 100 led to a click." },
    { when: "Late May – mid-June 2026", h: "The switch to the new site",
      b: "Because we did not carry over the blog posts and other pages from the old site, search results dropped when we cut over to the new site in late May 2026. The old addresses led to a page-not-found page, and Google dropped them from its results by mid-June. Daily appearances fell from about 1,500 to about 80, and clicks from 562 in May to 208 in June." },
    { when: "June – October 2026", h: "Since the new site launched",
      b: "Clicks have held between 208 and 230 a month. With the old posts’ many appearances gone from the results, more than 1 appearance in 10 has led to a click since July. From August to October the top searches named Dr. El Chaar or Dr. Castillo, and most clicks went to the homepage." },
    { when: "November 2026", h: "What we have done",
      b: "As an action step, we have restored all of the blog pages and updated all of the blog’s redirects. By November 9, all 43 articles were live again at their original addresses, with their original dates, including the 4 high-traffic posts, and a new Dental Blog page lists every one. 4 very short posts, each only a few sentences long, now lead to the matching pages on the new site, and the old blog’s other addresses lead to the Dental Blog. This came after October 31, so no figure in this review reflects it." },
  ] as BreakStep[],
  share: {
    title: "Where the year’s clicks from Google went",
    period: "November 2025 – October 2026",
    rows: [
      { k: "Pages we did not carry over", sub: "Old-site pages with no search activity from August to October", pct: 60, v: "More than 60%" },
      { k: "Of them, 4 blog posts, now live again", sub: "Dry socket with a bone graft, a failed gum graft, blowing your nose after a sinus lift, sinus lift pain", pct: 40, v: "More than 40%" },
    ] as ShareRow[],
    note: "Google’s page figures and its search totals are not counted the same way, so these are the lowest shares the figures allow.",
  },
};

/* --------------------------------------------------------------- CHAPTERS */
/* The story, in the order people meet the practice. Each chapter has a
   takeaway and a short paragraph per window, a few figure cards and its
   charts. Cards read their figures from NUMBERS with card(), so a chapter and
   the full table can never disagree; the few cards with no table row (Search
   and website at 6 and 12 months, booking's best month) carry their own
   period in `na` and are re-derived by the verifier. */
export type Card = { k: string; v: string; c?: string; prior?: string; na?: string };
const card = (w: WinId, group: string, k: string, label?: string): Card => {
  const r = NUMBERS[w].find((x) => x.group === group && x.k === k);
  if (!r) throw new Error(`No ${group} row ${k} for ${w}`);
  return { k: label ?? r.k, v: r.v, c: r.c, prior: r.prior, na: r.na };
};
const SEARCH_JUNE_CARD: Card = { k: "Clicks, June – October", v: "1,100", na: "Since the new site launched" };
const WEB_2026_CARDS: Card[] = [{ k: "Website visits counted in 2026", v: "9,586", na: "January 22 – October 31" }, { k: "From Google search", v: "5,926", na: "62% of visits" }];

type Text = { h: string; b: string };
export type Chapter = { id: string; n: string; step: string; title: string; text: Record<WinId, Text>; cards: Record<WinId, Card[]>; charts: Chart[]; queries?: Record<WinId, { rows: Query[]; note: string }>; internal?: string[] };

const CHAPTERS: Chapter[] = [
  { id: "instagram", n: "01", step: "Seen", title: "Instagram",
    text: {
      "3m": { h: "Responses rose 68%, led by the October 28 implant reel.",
        b: `1,464 responses against 874 for May to July, and the account gained 160 followers, net, against 51, to end October at 3,352. Views were ${short(83177)}, against ${short(88432)} for May to July, which included June 30 and July 1, the year’s 2 highest days.` },
      "6m": { h: "The account gained 211 followers, net, from May to October.",
        b: `It ended October at 3,352. Views reached ${short(171609)}, including June 30 and July 1, the year’s 2 highest days; without them, views were below November to April. Responses reached 2,338. October was the strongest month for responses, 783; November to April included November and April, the 2 strongest months before October.` },
      "12m": { h: `Instagram content was seen ${short(335377)} times over the year.`,
        b: "Responses reached 4,974. The October 28 implant reel drew the most views, the widest reach and the most responses of any piece, and Dr. Castillo’s April 2 reel the second-most responses, 255." },
    },
    cards: {
      "3m": [card("3m", "Instagram", "Responses"), card("3m", "Instagram", "Net new followers"), card("3m", "Instagram", "Views"), card("3m", "Instagram", "Engagement rate")],
      "6m": [card("6m", "Instagram", "Net new followers"), card("6m", "Instagram", "Views"), card("6m", "Instagram", "Responses")],
      "12m": [card("12m", "Instagram", "Views"), card("12m", "Instagram", "Responses")],
    },
    charts: [CHART("c-views"), CHART("c-resp")] },
  { id: "podcast", n: "02", step: "Heard", title: "Podcast",
    text: {
      "3m": { h: "October brought 478 podcast downloads, the most of any month since January 2025.",
        b: "788 over the 3 months, against 394 for May to July. 177 of October’s came in the week of October 5, most of them through a web browser, and September and October each beat the month before. The podcast also gave Instagram its strongest piece: the October 28 implant reel comes from the episode with Mélissa M. Seif." },
      "6m": { h: "1,182 podcast downloads from May to October.",
        b: "Against 851 for November to April. July and October brought the most, 219 and 478; 177 of October’s came in the week of October 5, most of them through a web browser. The podcast also gave Instagram its strongest piece: the October 28 implant reel comes from the episode with Mélissa M. Seif." },
      "12m": { h: "The podcast was downloaded 2,033 times over the year.",
        b: "February, April, July and October 2026 each passed 200 downloads, and October brought 478. The October 28 implant reel, the year’s strongest Instagram piece, comes from the episode with Mélissa M. Seif." },
    },
    cards: Object.fromEntries((["3m", "6m", "12m"] as WinId[]).map((w) => [w, [card(w, "Podcast", "Downloads")]])) as Record<WinId, Card[]>,
    charts: [CHART("c-pod")] },
  { id: "search", n: "03", step: "Found", title: "Search",
    text: {
      "3m": { h: "Clicks from Google held between 223 and 230 a month.",
        b: "678 clicks from August to October. With the old blog posts gone from the results, more than 1 appearance in 10 led to a click, and the top searches name Dr. El Chaar or Dr. Castillo. The 3 months before include May, on the old site, so search is not compared this edition." },
      "6m": { h: "Search dropped when we cut over to the new site, then held steady.",
        b: "Because we did not carry over the old site’s blog posts and other pages, they dropped out of Google after the new site launched in late May 2026. Clicks fell from 562 in May to 208 in June and have held between 208 and 230 a month since. We have since restored the blog pages; each step is set out after the charts." },
      "12m": { h: "Most of the year’s search clicks went to pages we did not carry over to the new site.",
        b: "More than 60% of the year’s clicks from Google went to those pages, and more than 40% to 4 of the old blog posts alone. Clicks eased from 1,075 in November to 562 in May, then dropped to 208 in June, after we cut over to the new site in late May 2026. We have since restored the blog pages and updated the blog’s redirects." },
    },
    cards: {
      "3m": [card("3m", "Search", "Search clicks", "Clicks"), card("3m", "Search", "Search appearances", "Appearances"), card("3m", "Search", "Search click rate", "Click rate")],
      "6m": [SEARCH_JUNE_CARD, { k: "Clicks a month since June", v: "220", na: "692 a month, February – April" }],
      "12m": [{ k: "Clicks to pages not carried over", v: "More than 60%", na: "Of the year’s clicks from Google" }, SEARCH_JUNE_CARD],
    },
    charts: [CHART("c-search"), CHART("c-appear")],
    queries: TOP_QUERIES },
  { id: "website", n: "04", step: "Visited", title: "Website",
    text: {
      "3m": { h: "1,092 visits from Google search, and 2 in 3 engaged with the site.",
        b: "August to October brought 1,631 first-time visitors. Direct visits brought 1,116, about as many as Google search. Across the 9,586 visits counted in 2026, which include the old site’s busier search months, Google search brought about 6 in 10." },
      "6m": { h: "About 6 in 10 website visits in 2026 came from Google search.",
        b: "Google search brought 5,926 of the 9,586 visits counted from January 22 to October 31, 2026, most of them in the old site’s months; from August to October, Google search and direct visits each brought just under half. Direct visits are people typing the address, using a bookmark, or following a link that does not show where it came from, such as one in a text message. Bing, Yahoo and DuckDuckGo added 505." },
      "12m": { h: "About 6 in 10 website visits in 2026 came from Google search.",
        b: "Google search brought 5,926 of the 9,586 visits counted from January 22 to October 31, 2026, most of them in the old site’s months; from August to October, Google search and direct visits each brought just under half. Direct visits are people typing the address, using a bookmark, or following a link that does not show where it came from, such as one in a text message. Bing, Yahoo and DuckDuckGo added 505." },
    },
    cards: {
      "3m": [card("3m", "Website", "Visits from Google search"), card("3m", "Website", "New visitors")],
      "6m": WEB_2026_CARDS,
      "12m": WEB_2026_CARDS,
    },
    charts: [CHART("c-google")] },
  { id: "booking", n: "05", step: "Clicked to book", title: "Booking",
    text: {
      "3m": { h: "Booking link clicks rose 19% against May to July.",
        b: "359 clicks, with August the strongest month of the year, 178. Both pairs of booking links were live through both periods. Clicks on the homepage short address rose 29%, to 1,623." },
      "6m": { h: "Booking link clicks ran at more than twice their February to April rate.",
        b: "660 clicks over the 6 months, 110 a month against 46. The second pair of booking links went live January 23, 2026, so February to April, with every link live, is the like-for-like comparison. The homepage short address drew 2,878 clicks." },
      "12m": { h: "860 booking link clicks in the first full year on record.",
        b: "August 2026 brought 178, the most of any month. The first booking links were created in October 2025, and a second pair went live January 23, 2026." },
    },
    /* No change chip on the 6-month booking card: the second pair went live
       inside the earlier window, so a percentage would mix link sets. */
    cards: {
      "3m": [card("3m", "Short links", "Booking link clicks"), card("3m", "Short links", "Homepage link clicks")],
      "6m": [{ ...card("6m", "Short links", "Booking link clicks"), c: undefined, prior: undefined, na: "110 a month since May, against 46 from February to April" }, card("6m", "Short links", "Homepage link clicks")],
      "12m": [card("12m", "Short links", "Booking link clicks"), { k: "Best month", v: "178", na: "August 2026" }],
    },
    charts: [CHART("c-book"), CHART("c-home")] },
  { id: "email", n: "06", step: "Kept in touch", title: "Email",
    text: {
      "3m": { h: "Email clicks nearly doubled as more emails went out.",
        b: `193 clicks from ${short(12040)} deliveries, against 97 from 6,369 for May to July. National Dental Hygiene Month drew 87, the most of any email in the period. The click rate was 1.60%, against 1.52%.` },
      "6m": { h: "290 email clicks, level with November to April.",
        b: `Deliveries were level too, at ${short(18409)}. National Dental Hygiene Month drew 87 clicks and the July whitening offer 65. November to April included the February podcast newsletter, the most clicked email of the 12 months, 114.` },
      "12m": { h: `590 email clicks from ${short(37058)} deliveries over the year.`,
        b: "The February podcast newsletter drew 114, the most of any email, and National Dental Hygiene Month 87. The first email under the practice’s name went out October 31, 2025, the day before the 12 months began." },
    },
    cards: Object.fromEntries((["3m", "6m", "12m"] as WinId[]).map((w) => [w, [card(w, "Email", "Email clicks", "Clicks"), card(w, "Email", "Emails delivered", "Delivered"), card(w, "Email", "Email click rate", "Click rate")]])) as Record<WinId, Card[]>,
    charts: [CHART("c-mail"), CHART("c-deliv")] },
];

/* ------------------------------------------------------------ DATA NOTES */
const NOTES = [
  { title: "The search breakdown is now client-facing", body: "Walter, Nov 10, replacing decision 1’s rule that the client text not mention the 404s, who took the posts down or the redirect fix: the client text names the cause in Walter’s words (“because we did not carry over the blog posts and other pages from the old site, search results dropped when we cut over to the new site”) and the action (“restored all of the blog pages and updated all of the blog’s redirects”: his sentence, narrowed on Nov 10 from “all of the redirects on the site” because 6 old non-blog addresses still reach the 404 page, checked in Chrome on Nov 10: /dental-office-upper-east-side/ (259 all-country clicks over the 12 months), /endodontists-and-periodontics-midtown-office/ (146), /periodontist-nyc-dr-edgard-el-chaar/ (58), /contactus/ (62), /midtown-dental-office/ (2), /dental-implant-services/ (1). /doctors-and-periodontists-at-upper-east-side/ redirects to /doctors/. Redirect the 6, then the sentence can widen again). Kept from decisions 1 and 2: Search and website count from June 2026 in the numbers (3-month view, uncompared this edition; the first comparison is September to November against June to August), and US page claims rest on bounds from the all-country page list, never on US page totals. The client gives the bounds as “more than 60%” and “more than 40%”, which hold after the page-to-site gap." },
  { title: "730 ad-tagged website visits are held out", body: "ig / paid 489 and fb / paid 241, in the 6 and 12-month source lists and not the 3-month one, so May to July; the daily figures put them in July (from July 2). They are left out of the 2026 sources while the stretch is confirmed (Walter, Nov 10), as NYCDS did with its 181. The same July holds Instagram reach at 861 a day and US new visitors at 1,207. Ask Walter what ran in July, and whether Facebook and Instagram visits come back, reported as paid." },
  { title: "2025/26 only: what that retired", body: "Walter, Nov 10: “only show 2025/26 data. Don’t show anything from 2024.” No 12-month comparison: podcast 2,033 against 1,182 (+72.0%) and responses 4,974 against 1,395 (+256.6%) are no longer shown. Podcast and responses chart from January 2025 (Walter, Nov 10). November and December 2024 stay in the pull and in these notes only." },
  { title: `2 Instagram days carry ${short(19131)} views`, body: `June 30 and July 1: ${short(10865)} and 8,266 views on reach of 146 and 60, no piece published. They set the direction of the views comparison at 3 months (−5.9%; +20.0% without them) and 6 months (+4.8%; −6.9% without). Kept as Metricool reports them; the client notes name both days.` },
  { title: "No Instagram reading for March 29, 2026", body: "The European clock change. Metricool’s own connector returns 0 for the day. The 6-month comparison counts 180 of 181 days and the 12-month views 364 of 365, both named in the client notes." },
  { title: "Instagram interactions before August 2025 are imported", body: "Metricool’s timelines start August 25, 2025; earlier interactions come from its imported post history (2 or 3 posting days a month, none in June and September 2025). The responses chart shows January to October 2025 as context only; nothing is compared on it." },
  { title: "July reach ran at 861 a day", body: "Against 329, 149 and 592 a day August to October, with no July piece above 1,100 reach. Outside the only window that shows reach. The ad-tagged July website visits suggest something ran then." },
  { title: "Constant Contact did not split proxy opens before June 23", body: "Until June 23, 2026 confirmed opens equal all opens on every campaign (7 proxy on March 20) except February 11, which reads confirmed 0, proxy 1,511, all opens 692. February 27 did not deliver 1,071 of 3,568 (30.0%), against 10–13% on other large sends. Confirmed opens compare only at 3 months; no email went out between March 20 and June 23." },
  { title: "The Oral Genome emails are sent as EEC", body: "Both (October 21, 39 sent; October 28, 38 sent) go out from “Edgard El Chaar, DDS, PC”, so they count here. The NYCDS October 26 – November 1 report counted the second as NYCDS. Decide which client owns them." },
  { title: "Podcast browser downloads are unexplained", body: "October’s 478 includes the October 5 week’s 164 Web Browser downloads of 177 (EEC October 5 – 11 report). Without them: +58.4% at 3 months, +19.6% at 6. Buzzsprout can’t split browser share by month. No deck or headline rests on the podcast comparison (Nov 10 review): the 3-month headline is October as the most of any month since January 2025, which holds without the 164 (314 against May 2025’s 251), and the client text says most of the week’s 177 came through a web browser. The 6-month “July and October brought the most” holds without them too (314 against 219)." },
  { title: "Booking links merge 2 pairs; the homepage link starts in December", body: "The pull counts the DDS-PC pair (October 21, 2025) and the links.edgardelchaar.com pair (January 23, 2026) together; the 6-month lead, card and path give the like-for-like rate and no change chip. Every links.edgardelchaar.com link dates from December 18, 2025, so the homepage link is uncompared at 6 months and out of the 12-month view. Split the pairs in review-pull.mjs next edition." },
  { title: "Short.io All clicks stay provisional", body: "Short.io re-counted earlier weeks between November 3 and 9. Every month here was read in one run on November 9, so the months compare with each other. EEC counts all clicks; the NYCDS review counts Human clicks." },
  { title: "Self-check passed", body: "The pull rebuilt the October 19 week and matched every ledger figure (the ledgers are all-country): Search 52 clicks and 466 impressions at US position 5.25, GA4 294 new visitors and 83 from Google, Instagram 2,951 views, 136 reach per day, 3,267 followers and 31 interactions, Short.io 112 named clicks, no /* row in any month. US Search and GA4 figures sit within the all-country figures in every month." },
];

/* ---------------------------------------------------------------- DETAIL */
type Panel = { id: string; title: string; rows: [string, string][]; note: string; noteClient?: string; faq?: { q: string; a: string }[] };

const DETAIL_PANELS: Panel[] = [
  { id: "read", title: "How to read this review", rows: BRIEF.map((b) => [b.role, b.text] as [string, string]), note: "" },
  { id: "coverage", title: "What each source covers",
    rows: [
      ["Instagram views", "August 25, 2025 onward; no reading for March 29, 2026"],
      ["Instagram responses", "Shown from January 2025"],
      ["Followers gained and lost", "December 31, 2025 onward"],
      ["Instagram reach and engagement rate", "June 12, 2026 onward"],
      ["Podcast downloads", "Every month, shown from January 2025"],
      ["Search", "Charted from July 2025; in the numbers table in the 3-month view only"],
      ["Website visits", "January 22, 2026 onward; in the numbers table in the 3-month view only. The 2026 sources leave out 730 visits from May to July"],
      ["Booking links", "October 21, 2025 onward; a second pair from January 23, 2026"],
      ["Homepage short link", "December 18, 2025 onward"],
      ["Email", "October 31, 2025 onward, the first email sent under the practice’s name"],
      ["Confirmed email opens", "Every email from June 23, 2026; none went out between March 20 and June 23"],
    ],
    note: "From the November 9 pull. A measure appears in a view only when its source covers every month of it, and is compared only when the earlier window is covered as well. The review shows months from January 2025 (Walter, Nov 10), so nothing compares at 12 months. Instagram has no reading for March 29, 2026; the 6-month views comparison keeps it with the gap named. Search Console has data from June 28, 2025 and GA4 from January 22, 2026; both count the US only and are counted from June 2026 because of the cutover. The 2026 sources leave out the 730 ad-tagged visits.",
    noteClient: "A measure appears in a view only when its record covers every month, and is compared only when the earlier period is covered too. The website sources are the exception: they cover January 22 to October 31, 2026 in every view." },
  { id: "method", title: "How the figures are measured",
    rows: [],
    note: "Instagram: Metricool account timelines summed by day in New York time; responses are interactions (likes, comments, saves, shares) on feed posts and reels on their publish date; engagement rate is interactions ÷ summed daily reach. Podcast: Buzzsprout custom date range per calendar month. Search: Search Console daily rows filtered to the US, position impression-weighted (internal only); top searches from the US query lists, top 10 by clicks with no tie split; page shares are bounds from the all-country page list. Website: GA4 property 521198918, US only, our own traffic left out; sources are sessions by source / medium, grouped. Short links: Short.io path view, All clicks, /* filtered, links.edgardelchaar.com plus DDS-PC-Midtown and DDS-PC-UES on nycdentalsmileteam.short.gy. Email: Constant Contact per-campaign results, rates on delivered.",
    noteClient: "Instagram figures are summed by day. Responses are likes, comments, saves and shares on pieces published in the period; engagement rate is responses divided by each day’s reach, summed. Podcast downloads come from the podcast host, by month. Search figures come from Google. Website visits are sessions, grouped by where each visit came from. Short links count clicks on the booking links and the homepage short address. Email clicks count each person once per email; email rates use delivered emails.",
  },
  { id: "faq", title: "Questions and answers", rows: [], note: "",
    faq: [
      { q: "Why do some figures have no comparison?", a: "A figure is compared only when the earlier period is fully covered. Otherwise it says why, or when its record starts. The review shows months from January 2025 on, so the 12-month view is not compared." },
      { q: "Why do search and the website appear in the numbers table only in the 3-month view?", a: "It is the only period wholly on the new site. The 6 and 12-month windows include months on the old site, whose blog posts drew most of the search clicks. The charts show the earlier months, the search breakdown covers the full 12 months, and the website sources cover 2026." },
      { q: "Are the old blog posts back?", a: "Yes. We restored them by November 9, 2026: all 43 articles are live again at their original addresses, and the old blog’s other addresses lead to working pages. This came after October 31, so this edition’s figures do not reflect it." },
      { q: "Why are some website visits left out?", a: "730 visits from May to July 2026 are left out of the 2026 sources while we confirm what brought them." },
      { q: "What is a direct visit?", a: "A visit that does not show where it came from: someone typing the address, using a bookmark, or following a link in a text message or some apps." },
      { q: "Are booking link clicks appointments?", a: "No. They count clicks on the Midtown and Upper East Side booking links. Appointments booked are not part of this review." },
      { q: "Why are email opens shown as confirmed opens?", a: "Many mail apps open every message on arrival to load images. Confirmed opens count people only; the email platform has reported them on every email since June 2026. All opens are shown alongside." },
      { q: "Why does Instagram’s app show different numbers?", a: "The app counts views differently and keeps updating. Every Instagram figure here comes from a single reporting tool, read November 9, 2026, so the periods compare." },
      { q: "Will these figures change?", a: "Some will. Responses keep coming in after a piece is published, Google keeps processing recent days, and short-link counts can be revised." },
      { q: "How often is the review updated?", a: "Monthly. Each view moves forward 1 month." },
    ] },
];

/* --------------------------------------------------------------- EXPORT */
export const RV = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  readOn: "November 9, 2026",
  lead: LEAD,
  journey: JOURNEY,
  howTo: "Each view ends October 31, 2026. The 3 and 6-month views are compared with the equal period before them; the 12-month view is not compared. Switch periods at the top of the page.",
  chapters: CHAPTERS.map((c) => (c.id === "website" ? { ...c, internal: IS_INTERNAL ? REF_INTERNAL : [] } : c)),
  website: { period: "January 22 – October 31, 2026", rows: REF_ROWS,
    note: "Visits by where they came from, across the site’s visit records for 2026, the same in every view. 730 visits from May to July are left out while we confirm what brought them." },
  breakdown: BREAKDOWN,
  numbers: {
    lede: "Each measure with its notes. The 3 and 6-month views compare each with the equal period before it, where that period is covered; other figures say why they are not compared. The 12-month view is not compared. Search and website appear only in the 3-month view, the only period wholly on the new site.",
    rows: Object.fromEntries(
      (Object.keys(NUMBERS) as WinId[]).map((w) => [w, NUMBERS[w].map((r) => ({ ...r, noteInternal: IS_INTERNAL ? r.noteInternal : undefined }))]),
    ) as Record<WinId, Row[]>,
  },
  internalCharts: IS_INTERNAL ? CHARTS_ALL.filter((c) => c.internalOnly) as Chart[] : [],
  worked: {
    lede: "The Instagram pieces that went furthest.",
    hero: P.implant as Piece,
    byWin: WORKED,
    footnote: "Read November 9, 2026. Pieces keep gathering responses.",
  },
  search: {
    parasInternal: IS_INTERNAL ? SEARCH_INTERNAL : [],
    /* Walter, Nov 10: no Position column in the client view. */
    table: IS_INTERNAL ? SEARCH_TABLE : { head: SEARCH_TABLE.head.filter((_, i) => i !== 4), rows: SEARCH_TABLE.rows.map((r) => r.filter((_, i) => i !== 4)) },
    tableNote: pick("Google’s search reporting, US. Position is the average place in the results, lower is better (internal only). The numbers table shows search in the 3-month view only.",
      "Google’s search reporting. The numbers table shows search in the 3-month view only, the only period wholly on the new site."),
  },
  notes: { lede: "Gaps, oddities and open questions. Internal only.", items: IS_INTERNAL ? NOTES : [] },
  detail: { lede: "How the review is built and what each source covers.", panels: DETAIL_PANELS.map((p) => ({ ...p, note: pick(p.note, p.noteClient ?? p.note) })) },
};
