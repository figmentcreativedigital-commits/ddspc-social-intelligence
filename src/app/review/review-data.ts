/* ==========================================================================
   REVIEW DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   The 3, 6 and 12-month review at /review. This is the only file that changes
   when the review moves forward a month; page.tsx in this folder holds the
   structure and styling.

   WINDOWS — rolling, each ending on the last full month (October 2026 here),
   each compared with the equal window just before it:
     3 months    Aug – Oct 2026        against May – Jul 2026
     6 months    May – Oct 2026        against Nov 2025 – Apr 2026
     12 months   Nov 2025 – Oct 2026   against Nov 2024 – Oct 2025

   COVERAGE RULE (Walter, Nov 9) — a measure appears only in the windows its
   source fully covers, and is compared only where the earlier window is
   covered too. Nothing is shown empty: an uncompared figure carries the date
   its record starts. What each source covers, from the Nov 9 pull:
     Instagram views         from Aug 25, 2025 (no reading Mar 29, 2026)
     Instagram interactions  from Nov 2024 (the pull's first month)
     Reach, engagement rate  from Jun 12, 2026, so the 3-month view only
     Follower gains/losses   from Dec 31, 2025
     Booking links           from Oct 21, 2025 (second pair Jan 23, 2026)
     Homepage short link     from Dec 2025
     Email                   EEC's first campaign Oct 31, 2025
     Podcast                 all 24 months
     Search, website         US only, counted from June 2026 (see SEARCH below)

   US ONLY (Walter, Nov 9) — Search and website figures count the US only;
     the pull keeps all-country totals for its self-check and the internal
     notes. Google lists only 32 to 41% of US clicks by page, so the
     client text gives no US page figures.

   SEARCH AND WEBSITE — the old blog posts dropped out of Google between
     May 28 and mid-June 2026 (daily US impressions about 1,500 to about 80) and
     their addresses now return the 404 page, which first appears in May. Every
     earlier month describes a different set of pages, so Search and Google
     visits are compared only from June: the 3-month view, uncompared this
     edition. Walter, Nov 9: the client sees the drop "as long as we explain
     the context", so both builds chart the full history and the Search
     section explains it; the internal build adds the detail.

   SOURCES — all read Nov 9, 2026:
     scripts/review-pull.mjs --client eec  → pulls/review/eec/2026-10.json
       (md5 93135e4c…, 145 requests, self-check 13 of 13 against the ledgers;
       Search and GA4 US only, all-country totals kept for the check)
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
  { id: "12m", label: "12 months", period: "November 2025 – October 2026", prior: "November 2024 – October 2025",
    months: ["2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10"],
    priorMonths: ["2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10"] },
];
/* The window the page opens on. 12 months is the annual frame Walter asked for. */
export const DEFAULT_WIN: WinId = "12m";

type SectionDef = { id: string; label: string; internalOnly?: boolean };
export const ALL_SECTIONS: SectionDef[] = [
  { id: "numbers", label: "Numbers" },
  { id: "months", label: "By month" },
  { id: "worked", label: "What worked" },
  { id: "search", label: "Search" },
  { id: "notes", label: "Data notes", internalOnly: true },
  { id: "detail", label: "Detail" },
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
/* One hero per window; the switch shows one at a time. Figures and their
   `sub` lines are client-visible in both builds; only internalNote is not. */
type Lead = { kicker: string; headline: string; deck: string; figures: { v: string; l: string; sub: string }[]; internalNote: string };

const LEAD: Record<WinId, Lead> = {
  "12m": {
    kicker: "The year to October 31, 2026",
    headline: `860 booking link clicks and ${short(335377)} Instagram views over the year.`,
    deck: `Podcast downloads rose to 2,033 from 1,182. Emails were delivered ${short(37058)} times.`,
    figures: [
      { v: "860", l: "Booking link clicks", sub: "First full year on record" },
      { v: short(335377), l: "Instagram views", sub: "Recorded from August 25, 2025" },
      { v: "2,033", l: "Podcast downloads", sub: "Against 1,182 the year before" },
    ],
    internalNote:
      "Only downloads and interactions compare at 12 months, and neither leads as a percentage. Downloads are +58.1% without them, the October 5 week’s 164 unexplained browser downloads. Interactions before August 25, 2025 come from Metricool’s imported history (24 posting days against 133); check it against the account before leading on it.",
  },
  "6m": {
    kicker: "May – October 2026",
    headline: "Booking link clicks more than doubled: 110 a month since May, against 46 from February to April.",
    deck: "The second pair of booking links went live January 23. Over 6 months, clicks rose to 660 from 200, podcast downloads to 1,182 from 851, and the account gained 211 followers, net.",
    figures: [
      { v: "660", l: "Booking link clicks", sub: "Against 200" },
      { v: "1,182", l: "Podcast downloads", sub: "Against 851" },
      { v: "+211", l: "Net new followers", sub: "No earlier record" },
    ],
    internalNote:
      `Views stay out of the lead: +4.8% rests on June 30 and July 1 (${short(19131)} views on 206 reach); without them −6.9%. Responses −11.3% against a window holding November and April. Split the 2 booking pairs in review-pull.mjs next edition. Podcast +19.6% without the 164 browser downloads.`,
  },
  "3m": {
    kicker: "August – October 2026",
    headline: "Instagram responses rose 68% and booking link clicks 19% against May to July.",
    deck: "The account gained 160 followers, net, against 51. Podcast downloads rose to 788 from 394, and email clicks rose with the number of emails delivered.",
    figures: [
      { v: "1,464", l: "Instagram responses", sub: "Against 874" },
      { v: "359", l: "Booking link clicks", sub: "Against 301" },
      { v: "+160", l: "Net new followers", sub: "Against +51" },
    ],
    internalNote:
      "Podcast stays out of the headline: without the October 5 week’s 164 browser downloads, the 3 months read 624, +58.4%. Email clicks follow the send count, 6 campaigns against 3. Views are −5.9% only because of June 30 and July 1; +20.0% without them.",
  },
};

/* --------------------------------------------------------------- THE BRIEF */
const BRIEF = [
  { role: "The windows", text: "Each view ends October 31, 2026. 3 months is August to October, 6 months is May to October, and 12 months is November 2025 to October 2026. The review moves forward each month." },
  { role: "The comparison", text: "Each figure is compared with the equal period before it. Where that period has no full record, the figure stands alone with its start date." },
  { role: "What is left out", text: "A measure shows only in views its source fully covers. Search and website figures cover the US only, and count from June 2026, after the old blog posts came down." },
];

/* -------------------------------------------------------------- THE NUMBERS */
/* Rows per window, in display order; groups render in the order they first
   appear. `prior` and `c` together, or `na` alone: never neither. Changes are
   percent for totals, points for rates, and a plain difference for net
   followers. Every note is client-visible unless it sits in noteInternal. */
export type Row = { group: string; k: string; v: string; prior?: string; c?: string; na?: string; note: string; noteInternal?: string };

const POD_OCT = "October recorded 478, 177 in the week of October 5.";
const CLICKS_DEF = "People who clicked, counted once per email.";
const HOME_DEF = "Clicks on links.edgardelchaar.com, the short address for the homepage.";
const BOOK_DEF = "Clicks on the Midtown and Upper East Side booking links.";
const CONF_DEF = "Confirmed opens as a share of delivered emails";

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
    { group: "Short links", k: "Booking link clicks", v: "359", prior: "301", c: "+19.3%",
      note: BOOK_DEF,
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
    { group: "Podcast", k: "Downloads", v: "788", prior: "394", c: "+100.0%",
      note: `Downloads across all listening apps and the web. ${POD_OCT}`,
      noteInternal: "Buzzsprout, custom date range per month: August 148, September 162, October 478. 164 of the October 5 week’s 177 came through Web Browser (EEC October 5 – 11 report), still unexplained; without them the 3 months read 624, +58.4%. Buzzsprout’s app view works by episode, not by date, so the browser share by month is not known." },
    { group: "Search", k: "Search clicks", v: "678", na: "Counted from June 2026",
      note: "Clicks from US Google searches to the site. Most went to the homepage.",
      noteInternal: "The earlier 3 months hold May, the last month of the old blog posts (562 US clicks), so no comparison is shown. From the next edition (September to November against June to August) Search compares. All countries: 715. Google lists only 281 of the 678 US clicks by page, so no homepage count is given: the all-country list has 503 of 715 to the homepage, and with 37 clicks from outside the US, at least 466 US clicks (69%) went there." },
    { group: "Search", k: "Search appearances", v: "5,844", na: "Counted from June 2026",
      note: "Times the site appeared in US Google results." },
    { group: "Search", k: "Search click rate", v: "11.60%", na: "Counted from June 2026",
      note: "Clicks as a share of appearances." },
    { group: "Search", k: "Average search position", v: "5.22", na: "Counted from June 2026",
      note: "Lower is better.",
      noteInternal: "Impression-weighted over the US daily rows." },
    { group: "Website", k: "Visits from Google search", v: "1,092", na: "Counted from June 2026",
      note: "Visits from a US Google search. 726 engaged with the site.",
      noteInternal: "66.5% engaged. GA4, US only, our own traffic left out (eec-prototype.vercel.app, figmentcreative.com). All countries: 1,154." },
    { group: "Website", k: "New visitors", v: "1,631", na: "Counted from June 2026",
      note: "First-time visitors from the US.",
      noteInternal: "99 of them reached the 404 page (6%). All countries: 3,670 new visitors, 1,123 to the 404 page (31%), so most of the 404 traffic and more than half of new visitors are outside the US." },
  ],
  "6m": [
    { group: "Short links", k: "Booking link clicks", v: "660", prior: "200", c: "+230.0%",
      note: `${BOOK_DEF} The second pair went live January 23. From February to April, with all links live, clicks averaged 46 a month, against 110 since May.`,
      noteInternal: "Midtown 369, Upper East Side 291, against 102 and 98. Monthly 57, 95, 149, 178, 96, 85. November to January had the DDS-PC pair only (46, 7, 9)." },
    { group: "Short links", k: "Homepage link clicks", v: "2,878", na: "Recorded from December 2025",
      note: HOME_DEF,
      noteInternal: "The links.edgardelchaar.com links were created from December 18, 2025, so November 2025 has no homepage link and the 6 months before are not covered." },
    { group: "Podcast", k: "Downloads", v: "1,182", prior: "851", c: "+38.9%",
      note: `Downloads across all listening apps and the web. ${POD_OCT}`,
      noteInternal: "October’s 478 is 40% of the window. Without the October 5 week’s 164 browser downloads, +19.6%." },
    { group: "Instagram", k: "Net new followers", v: "+211", na: "Daily figures start December 31, 2025",
      note: "Followers gained less followers lost. The account ended October at 3,352.",
      noteInternal: "Gained 327, lost 116. May was the only month that lost more than it gained, 30 against 35." },
    { group: "Instagram", k: "Views", v: short(171609), prior: short(163768), c: "+4.8%",
      note: `Times the account’s content was seen. This period includes June 30 and July 1 (${short(19131)} views); without them it is below the 6 months before. No reading for March 29, 2026, so the earlier period counts 180 of 181 days.`,
      noteInternal: `Without June 30 and July 1 this window reads ${short(152478)} and the change is −6.9%. March 29 is the European clock change; Metricool’s own connector returns 0 for it.` },
    { group: "Instagram", k: "Responses", v: "2,338", prior: "2,636", c: "−11.3%",
      note: "Likes, comments, saves and shares. The earlier 6 months included November and April, the 2 strongest months before October 2026.",
      noteInternal: "73 posting days against 60." },
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
    { group: "Short links", k: "Booking link clicks", v: "860", na: "First booking links created October 2025",
      note: `${BOOK_DEF} A second pair went live January 23, 2026.`,
      noteInternal: "Midtown 471, Upper East Side 389." },
    { group: "Instagram", k: "Views", v: short(335377), na: "Recorded from August 25, 2025",
      note: `Includes June 30 and July 1, the year’s 2 highest days (${short(19131)} views). No reading for March 29, 2026, so the year counts 364 of 365 days.`,
      noteInternal: `June 30 and July 1 carry ${short(19131)} between them.` },
    { group: "Instagram", k: "Responses", v: "4,974", prior: "1,395", c: "+256.6%",
      note: "The rise comes from posting more often. On record, the year before had far fewer posting days, each with more responses on average.",
      noteInternal: "133 posting days against 24; 37 interactions per posting day against 58. Metricool’s account timelines begin August 25, 2025; interactions before then come from the post history it imported, so this comparison depends on that import being complete." },
    { group: "Podcast", k: "Downloads", v: "2,033", prior: "1,182", c: "+72.0%",
      note: "7 of the 12 months beat the same month a year earlier.",
      noteInternal: "Buzzsprout custom date range per calendar month. Without the October 5 week’s 164 browser downloads, +58.1%." },
    { group: "Email", k: "Emails delivered", v: short(37058), na: "First email October 31, 2025",
      note: "Total deliveries across every email.",
      noteInternal: `15 campaigns, ${short(42700)} sent, 5,642 not delivered (13.2%). The year before holds only the October 31, 2025 send (3,380 delivered, 91 clicks), so no comparison is shown.` },
    { group: "Email", k: "Email clicks", v: "590", na: "First email October 31, 2025",
      note: `${CLICKS_DEF} The February podcast newsletter drew 114, the most of any email.` },
    { group: "Email", k: "Email click rate", v: "1.59%", na: "First email October 31, 2025",
      note: "Clicks as a share of delivered emails." },
  ],
};

/* ---------------------------------------------------------- MONTH BY MONTH */
/* Small multiples. Bars take the window's colors through CSS: plum for the
   window, slate for the earlier window where that window is compared
   (`priorIn`), pale for every other month. */
export type Chart = { id: string; title: string; unit: string; note: string; priorIn: WinId[]; points: { m: string; v: number }[]; caption: Partial<Record<WinId, string>> };

const months = (start: string, values: number[]) => {
  const [y0, m0] = start.split("-").map(Number);
  return values.map((v, i) => {
    const t = (m0 - 1) + i;
    return { m: `${y0 + Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}`, v };
  });
};

const CHARTS_ALL: (Chart & { internalOnly?: boolean; clientOnly?: boolean })[] = [
  { id: "c-pod", title: "Podcast downloads", unit: "downloads", priorIn: ["3m", "6m", "12m"],
    points: months("2024-11", [73, 47, 103, 55, 61, 226, 251, 81, 57, 69, 38, 121, 135, 42, 70, 208, 172, 224, 116, 59, 219, 148, 162, 478]),
    note: "Every month since November 2024.",
    caption: { "3m": "788 against 394", "6m": "1,182 against 851", "12m": "2,033 against 1,182" } },
  { id: "c-resp", title: "Instagram responses", unit: "responses", priorIn: ["3m", "6m", "12m"],
    points: months("2024-11", [289, 218, 159, 168, 106, 105, 93, 0, 29, 49, 0, 179, 637, 220, 287, 343, 494, 655, 241, 322, 311, 448, 233, 783]),
    note: "By month published. June and September 2025 show none.",
    caption: { "3m": "1,464 against 874", "6m": "2,338 against 2,636", "12m": "4,974 against 1,395" } },
  { id: "c-views", title: "Instagram views", unit: "views", priorIn: ["3m", "6m"],
    points: months("2025-09", [14213, 25686, 34281, 44950, 11078, 25049, 26602, 21808, 16029, 27193, 45210, 28892, 17107, 37178]),
    note: "From September 2025. No reading for March 29, 2026.",
    caption: { "3m": `${short(83177)} against ${short(88432)}`, "6m": `${short(171609)} against ${short(163768)}`, "12m": `${short(335377)} · recorded from August 25, 2025` } },
  { id: "c-book", title: "Booking link clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [46, 7, 9, 82, 35, 21, 57, 95, 149, 178, 96, 85]),
    note: "From November 2025. The second pair went live January 23, 2026.",
    caption: { "3m": "359 against 301", "6m": "660 against 200", "12m": "860 · first booking links created October 2025" } },
  { id: "c-mail", title: "Email clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [79, 36, 0, 157, 28, 0, 0, 2, 95, 55, 14, 124]),
    note: "By month sent. Zero means no email that month.",
    caption: { "3m": "193 against 97", "6m": "290 against 300", "12m": "590 · first email October 31, 2025" } },
  { id: "c-search", title: "Search clicks", unit: "clicks", priorIn: [],
    points: months("2025-07", [1819, 1649, 1271, 1188, 1075, 981, 919, 653, 734, 688, 562, 208, 214, 225, 230, 223]),
    note: "US searches, from July 2025. The old blog posts came down in late May 2026.",
    caption: { "3m": "678 · counted from June 2026", "6m": "Shown for context; counted from June 2026", "12m": "Shown for context; counted from June 2026" } },
  { id: "c-google", title: "Visits from Google search", unit: "visits", priorIn: [],
    points: months("2026-02", [902, 1061, 980, 714, 367, 386, 377, 361, 354]),
    note: "US visits, from February 2026. No data for May 23, 25 and 27.",
    caption: { "3m": "1,092 · counted from June 2026", "6m": "Shown for context; counted from June 2026", "12m": "Shown for context; counted from June 2026" } },
];

/* ------------------------------------------------------------ WHAT WORKED */
export type Piece = { url: string; format: string; date: string; title: string; views: number; reach: number; responses: number; why?: string };

const P = {
  implant: { url: "https://www.instagram.com/reel/DfDRO6eBL4Q/", format: "Reel", date: "October 28, 2026", title: "There is more to implant success than what happens in the bone.", views: 11826, reach: 9350, responses: 263,
    why: "88 seconds with Mélissa M. Seif on the implant-abutment connection, cut from the podcast. The widest reach of any piece this year; 67 people saved it." },
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
  head: ["Month", "Search clicks", "Appearances", "Click rate", "Position", "Visits from Google"],
  rows: [
    ["February 2026", "653", "35,268", "1.85%", "14.37", "902"],
    ["March 2026", "734", "48,159", "1.52%", "16.71", "1,061"],
    ["April 2026", "688", "42,933", "1.60%", "17.14", "980"],
    ["May 2026", "562", "41,530", "1.35%", "18.88", "714"],
    ["June 2026", "208", "3,839", "5.42%", "13.50", "367"],
    ["July 2026", "214", "2,071", "10.33%", "4.79", "386"],
    ["August 2026", "225", "1,940", "11.60%", "5.99", "377"],
    ["September 2026", "230", "1,990", "11.56%", "4.33", "361"],
    ["October 2026", "223", "1,914", "11.65%", "5.38", "354"],
  ],
};

const SEARCH_CLIENT = [
  "Google search traffic dropped sharply in late May 2026, when the site’s older blog posts came down. US clicks had already eased from 1,819 in July 2025 to 688 in April 2026; since June they have held between 208 and 230 a month. February to April averaged 692 clicks and 981 Google visits a month; June to October, 220 and 369.",
  "Most of the earlier search traffic went to older blog posts, among them dry socket after a bone graft, signs a gum graft has not taken, blowing your nose after a sinus lift, and sinus lift pain. They appeared often in results, but low on the page and with few clicks.",
  "Since July, more than 1 appearance in 10 has led to a click, the average position has stayed between 4.3 and 6.0, and Google visits have run between 354 and 386 a month.",
  "All figures here are US only. They count from June, so comparisons use the current site. The first comparison comes next month: September to November against June to August.",
];

const SEARCH_INTERNAL = [
  `The break: daily US impressions fell from about 1,500 (May 1 to 27) to about 80 (June 15 to 30) after May 28; GA4 has no rows for May 23, 25 and 27 (likely the switch-over); the 404 page first appears in May (26 US new users that month). US impressions averaged ${short(42120)} a month February to April; June to October, 2,351. The US share of clicks rose from 78% (February to April) to 94% (June to October): the old posts drew more searches from outside the US.`,
  "Google lists only part of US search by page: 2,146 of 6,712 US clicks over the 12 months (281 of 678 for August to October, close to the 265 with a known query), and a page × country read returned the same. So the client text gives no US page figures. From the all-country page list (the morning pull), old pages took 6,160 of 8,715 page clicks and the 4 posts 4,769 (/dry-socket-with-bone-graft/ 1,954, /signs-of-failed-gum-graft/ 1,543, /accidentally-blew-nose-after-sinus-lift/ 810, /how-painful-is-a-sinus-lift/ 462). At most 1,898 clicks in the 12 months came from outside the US, so at least 4,262 US clicks (63%) went to old pages and 2,871 (43%) to the 4 alone, give or take the small gap between page and site totals. Restoring or redirecting the 4 is the largest single search opportunity on the site, and it is the redirect work already open with Johana. The client text explains the drop but not the fix; raise that with the practice separately.",
  "August to October, searches for the practice’s name lead the US query list: edgard el chaar 83 clicks at position 3.7, dr el chaar 45 at 8.1, edgar el chaar 44 at 1.4. Of the 281 US clicks Google lists by page, the homepage took 194, Our Doctors 36 and Locations 35.",
  "The 404 page has taken 206 US new users since May: 26, 51, 30, 14, 38 and 47 by month (2,172 across all countries). The client text names the drop and the 4 posts (Walter, November 9: show it “as long as we explain the context”) but not the 404 page or who took the posts down.",
];

/* ------------------------------------------------------------ DATA NOTES */
const NOTES = [
  { title: `2 Instagram days carry ${short(19131)} views`, body: `June 30 and July 1: ${short(10865)} and 8,266 views on reach of 146 and 60, no piece published. They set the direction of the views comparison at 3 months (−5.9%; +20.0% without them) and 6 months (+4.8%; −6.9% without). Kept as Metricool reports them; the client notes name both days.` },
  { title: "No Instagram reading for March 29, 2026", body: "The European clock change. Metricool’s own connector returns 0 for the day. The 6-month comparison counts 180 of 181 days and the 12-month views 364 of 365, both named in the client notes." },
  { title: "Instagram interactions before August 2025 are imported", body: "Metricool’s timelines start August 25, 2025; earlier interactions come from its imported post history. The year before reads 24 posting days and 1,395 interactions (58 a day) against 133 and 4,974 (37 a day). Check the import against the account before leading on the 12-month comparison." },
  { title: "July reach ran at 861 a day", body: "Against 329, 149 and 592 a day August to October, with no July piece above 1,100 reach. Outside the only window that shows reach. Ask whether anything was boosted in July." },
  { title: "Constant Contact did not split proxy opens before June 23", body: "Until June 23, 2026 confirmed opens equal all opens on every campaign (7 proxy on March 20) except February 11, which reads confirmed 0, proxy 1,511, all opens 692. February 27 did not deliver 1,071 of 3,568 (30.0%), against 10–13% on other large sends. Confirmed opens compare only at 3 months; no email went out between March 20 and June 23." },
  { title: "The Oral Genome emails are sent as EEC", body: "Both (October 21, 39 sent; October 28, 38 sent) go out from “Edgard El Chaar, DDS, PC”, so they count here. The NYCDS October 26 – November 1 report counted the second as NYCDS. Decide which client owns them." },
  { title: "Podcast browser downloads are unexplained", body: "October’s 478 includes the October 5 week’s 164 Web Browser downloads of 177 (EEC October 5 – 11 report). Without them: +58.4% at 3 months, +19.6% at 6, +58.1% at 12. Buzzsprout can’t split browser share by month. The client copy gives totals but doesn’t headline them." },
  { title: "Booking links merge 2 pairs; the homepage link starts in December", body: "The pull counts the DDS-PC pair (October 21, 2025) and the links.edgardelchaar.com pair (January 23, 2026) together; the 6-month client note gives the like-for-like rate. Every links.edgardelchaar.com link dates from December 18, 2025, so the homepage link is uncompared at 6 months and out of the 12-month view. Split the pairs in review-pull.mjs next edition." },
  { title: "Short.io All clicks stay provisional", body: "Short.io re-counted earlier weeks between November 3 and 9. Every month here was read in one run on November 9, so the months compare with each other." },
  { title: "Self-check passed", body: "The pull rebuilt the October 19 week and matched every ledger figure (the ledgers are all-country): Search 52 clicks and 466 impressions at US position 5.25, GA4 294 new visitors and 83 from Google, Instagram 2,951 views, 136 reach per day, 3,267 followers and 31 interactions, Short.io 112 named clicks, no /* row in any month. US Search and GA4 figures sit within the all-country figures in every month." },
];

/* ---------------------------------------------------------------- DETAIL */
type Panel = { id: string; title: string; rows: [string, string][]; note: string; noteClient?: string; faq?: { q: string; a: string }[] };

const DETAIL_PANELS: Panel[] = [
  { id: "coverage", title: "What each source covers",
    rows: [
      ["Podcast downloads", "November 2024 onward, every month"],
      ["Instagram responses", "November 2024 onward"],
      ["Instagram views", "August 25, 2025 onward"],
      ["Followers gained and lost", "December 31, 2025 onward"],
      ["Instagram reach and engagement rate", "June 12, 2026 onward"],
      ["Booking links", "October 21, 2025 onward; a second pair from January 23, 2026"],
      ["Homepage short link", "December 2025 onward"],
      ["Email", "October 31, 2025 onward, the first email sent under the practice’s name"],
      ["Confirmed email opens", "Every email from June 23, 2026; none went out between March 20 and June 23"],
      ["Search and website", "US only; counted from June 2026, charted in full"],
    ],
    note: "From the November 9 pull. A measure appears in a view only when its source covers every month of it, and is compared only when the earlier window is covered as well. Instagram has no reading for March 29, 2026; the 6-month views comparison keeps it with the gap named. Search Console has data from June 28, 2025 and GA4 from January 22, 2026, but both are counted from June 2026 because of the late-May change (see the Search section); the charts show the full history.",
    noteClient: "A measure appears in a view only when its record covers every month, and is compared only when the earlier period is covered too. Instagram has no reading for March 29, 2026." },
  { id: "method", title: "How the figures are measured",
    rows: [],
    note: "Instagram: Metricool account timelines summed by day in New York time; responses are interactions (likes, comments, saves, shares) on feed posts and reels on their publish date; engagement rate is interactions ÷ summed daily reach. Short links: Short.io path view, All clicks, /* filtered, links.edgardelchaar.com plus DDS-PC-Midtown and DDS-PC-UES on nycdentalsmileteam.short.gy. Email: Constant Contact per-campaign results, rates on delivered. Podcast: Buzzsprout custom date range per calendar month. Search: Search Console daily rows filtered to the US, position impression-weighted; US page lists cover only part of US clicks (see Search), so no US page figures are given. Website: GA4 property 521198918, US only, our own traffic left out.",
    noteClient: "Instagram figures are summed by day. Responses are likes, comments, saves and shares on pieces published in the period; engagement rate is responses divided by each day’s reach, summed. Short links count clicks on the booking links and the homepage short address. Email clicks count each person once per email; email rates use delivered emails. Podcast downloads come from the podcast host, by month. Search and website figures come from Google and count the US only.",
    faq: [
      { q: "Why do some figures have no comparison?", a: "A figure is compared only when its source fully covers the earlier period. Otherwise it shows the date its record starts." },
      { q: "Why do the 6 and 12-month views not count Search and the website?", a: "The older blog posts came down in late May 2026, and they drew most of the search traffic. Figures count from June so they describe the current site. The charts still show the full history." },
      { q: "Why are email opens shown as confirmed opens?", a: "Many mail apps open every message on arrival to load images. Confirmed opens count people only; Constant Contact has reported them since June 2026. All opens are shown alongside." },
      { q: "Why does Instagram’s app show different numbers?", a: "The app counts views differently and keeps updating. Every figure here comes from one reporting tool, read November 9, 2026, so the periods compare." },
      { q: "Will these figures change?", a: "Slightly. Responses keep coming in after a piece is published, Google keeps processing recent days, and short-link counts can be revised." },
      { q: "How often is the review updated?", a: "Monthly. Each view moves forward one month." },
    ] },
];

/* --------------------------------------------------------------- EXPORT */
export const RV = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  readOn: "November 9, 2026",
  lead: LEAD,
  brief: BRIEF,
  numbers: {
    lede: "Each measure against the equal period before it. Figures without a comparison show when their record starts.",
    rows: Object.fromEntries(
      (Object.keys(NUMBERS) as WinId[]).map((w) => [w, NUMBERS[w].map((r) => ({ ...r, noteInternal: IS_INTERNAL ? r.noteInternal : undefined }))]),
    ) as Record<WinId, Row[]>,
  },
  months: {
    lede: "Each measure by month. Plum is the selected period, slate the period it is compared with.",
    charts: CHARTS_ALL.filter((c) => (IS_INTERNAL ? !c.clientOnly : !c.internalOnly)) as Chart[],
  },
  worked: {
    lede: "The Instagram pieces that went furthest.",
    hero: P.implant as Piece,
    byWin: WORKED,
    footnote: "Read November 9, 2026. Pieces keep gathering responses.",
  },
  search: {
    lede: "What changed in late May 2026, and how US search has done since.",
    paras: SEARCH_CLIENT,
    parasInternal: IS_INTERNAL ? SEARCH_INTERNAL : [],
    table: SEARCH_TABLE,
    tableNote: "Google’s search reporting and the site’s visit records, US only. The visit records have no data for May 23, 25 and 27, 2026.",
  },
  notes: { lede: "Gaps, oddities and open questions. Internal only.", items: IS_INTERNAL ? NOTES : [] },
  detail: { lede: "How the review is built and what each source covers.", panels: DETAIL_PANELS.map((p) => ({ ...p, note: pick(p.note, p.noteClient ?? p.note) })) },
};
