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
     Search, website         counted from June 2026 (see SEARCH below)

   SEARCH AND WEBSITE — the old blog posts dropped out of Google between
     May 28 and mid-June 2026 (daily impressions about 1,900 to about 100) and
     their addresses now return the 404 page, which first appears in May. Every
     earlier month describes a different set of pages, so Search and Google
     visits are compared only from June: the 3-month view, uncompared this
     edition. Walter, Nov 9: the client sees the drop "as long as we explain
     the context", so both builds chart the full history and the Search
     section explains it; the internal build adds the detail.

   SOURCES — all read Nov 9, 2026:
     scripts/review-pull.mjs --client eec  → pulls/review/eec/2026-10.json
       (md5 a526df0e…, 138 requests, self-check 10 of 10 against the ledgers)
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
  { id: "numbers", label: "The numbers" },
  { id: "months", label: "Month by month" },
  { id: "worked", label: "What worked" },
  { id: "search", label: "Search and the website" },
  { id: "notes", label: "Data notes", internalOnly: true },
  { id: "detail", label: "Detail" },
];
export const NAV = ALL_SECTIONS.filter((x) => IS_INTERNAL || !x.internalOnly);
export const has = (id: string) => NAV.some((n) => n.id === id);

const pick = <T,>(internal: T, client: T): T => (IS_INTERNAL ? internal : client);

/* ---------------------------------------------------------------- THE LEAD */
/* One masthead per window; the switch shows one at a time. Figures and
   figureNote are client-visible in both builds; only internalNote is not. */
type Lead = { kicker: string; headline: string; deck: string; figures: { v: string; l: string }[]; figureNote: string; internalNote: string };

const LEAD: Record<WinId, Lead> = {
  "12m": {
    kicker: "The year to October 31, 2026",
    headline: "Over the year the booking links drew 860 clicks and the practice’s Instagram content was seen 335,377 times.",
    deck: "Podcast downloads rose to 2,033 from 1,182 on the year before, and emails from the practice were delivered 37,058 times.",
    figures: [
      { v: "860", l: "Booking link clicks" },
      { v: "335,377", l: "Instagram views" },
      { v: "2,033", l: "Podcast downloads" },
    ],
    figureNote: "Downloads against 1,182 in the 12 months before. The booking links and Instagram’s view record have no earlier year on record.",
    internalNote:
      "Only podcast downloads and Instagram interactions compare at 12 months. Downloads appear as a figure, not a percentage, and interactions stay out of the lead. October’s downloads carry the October 5 week’s 164 Web Browser downloads, still unexplained (+58.1% without them). Interactions before August 25, 2025 come from the post history Metricool imported: 24 posting days against 133, and 58 interactions per posting day against 37; check that import against the account’s own grid before leading on it. Search and the website are left out of this view; the Search section carries the full history.",
  },
  "6m": {
    kicker: "May – October 2026",
    headline: "Booking link clicks more than doubled: 110 a month since May, against 46 from February to April.",
    deck: "February to April is the first stretch with every booking link live; the pair on the practice’s own short address went live on January 23, 2026. Across the full 6 months, clicks rose to 660 from 200, podcast downloads to 1,182 from 851, and the account gained 211 followers, net.",
    figures: [
      { v: "660", l: "Booking link clicks" },
      { v: "1,182", l: "Podcast downloads" },
      { v: "+211", l: "Net new followers" },
    ],
    figureNote: "Against 200 booking link clicks and 851 downloads from November 2025 to April 2026. Net followers have no earlier 6 months on record.",
    internalNote:
      "Views are left out of the lead: their +4.8% rests on June 30 and July 1 (19,131 views on 206 reach, no piece published); without them views read 152,478, −6.9%, and the client note says so. Interactions are −11.3% against a prior window holding November and April. The pull merges the DDS-PC booking pair (October 21, 2025) with the links.edgardelchaar.com pair (January 23, 2026); split them per link in review-pull.mjs before the next edition. Podcast +19.6% without the October 5 week’s 164 browser downloads.",
  },
  "3m": {
    kicker: "August – October 2026",
    headline: "Instagram responses rose 68% and booking link clicks 19% against May to July.",
    deck: "The account gained 160 followers, net, against 51, podcast downloads rose to 788 from 394, and email clicks rose with the number of emails delivered.",
    figures: [
      { v: "1,464", l: "Instagram responses" },
      { v: "359", l: "Booking link clicks" },
      { v: "+160", l: "Net new followers" },
    ],
    figureNote: "Against 874 responses, 301 booking link clicks and +51 followers from May to July 2026.",
    internalNote:
      "Not leading on podcast: October’s 478 carries the October 5 week’s 164 Web Browser downloads of 177, still unexplained; without them the 3 months read 624, +58.4%. Email clicks follow the send count, 6 campaigns against 3, at a click rate of 1.60% against 1.52%. Views are −5.9% only because May to July holds June 30 and July 1; without them +20.0%.",
  },
};

/* --------------------------------------------------------------- THE BRIEF */
const BRIEF = [
  { role: "The windows", text: "Each view ends on October 31, 2026, the last full month: 3 months covers August to October, 6 months May to October, and 12 months November 2025 to October 2026. The review moves forward a month at a time." },
  { role: "The comparison", text: "Every figure is set against the equal period just before it. Where a source has no full record of that earlier period, the figure stands on its own with the date its record starts." },
  { role: "What is left out", text: "A measure appears only in the views its source fully covers. Search and website figures are counted from June 2026, after the site’s older blog posts came down, so they appear in the 3-month view; the Search section shows the whole history." },
];

/* -------------------------------------------------------------- THE NUMBERS */
/* Rows per window, in display order; groups render in the order they first
   appear. `prior` and `c` together, or `na` alone: never neither. Changes are
   percent for totals, points for rates, and a plain difference for net
   followers. Every note is client-visible unless it sits in noteInternal. */
export type Row = { group: string; k: string; v: string; prior?: string; c?: string; na?: string; note: string; noteInternal?: string };

const POD_OCT = "October recorded 478, 177 of them in the week of October 5.";
const CLICKS_DEF = "People who clicked a link, counted once per email and added across every email.";
const HOME_DEF = "Clicks on the practice’s short address, links.edgardelchaar.com, which opens the homepage.";
const BOOK_DEF = "Clicks on the Midtown and Upper East Side booking links.";
const CONF_DEF = "Opens Constant Contact confirms a person made, as a share of delivered emails";

const NUMBERS: Record<WinId, Row[]> = {
  "3m": [
    { group: "Instagram", k: "Responses", v: "1,464", prior: "874", c: "+67.5%",
      note: "Likes, comments, saves and shares on the pieces published in each period. The October 28 implant reel drew 263 on its own.",
      noteInternal: "Metricool postsInteractions on the publish date, as read November 9; recent pieces are still gathering. 35 posting days against 38." },
    { group: "Instagram", k: "Net new followers", v: "+160", prior: "+51", c: "+109 followers",
      note: "Followers gained less followers lost, as Instagram reports them each day. The account ended October at 3,352.",
      noteInternal: "Gained 210, lost 50, against 117 and 66. The account count moved from 3,190 on July 31 to 3,352 on October 31, 2 more than the daily figures." },
    { group: "Instagram", k: "Views", v: "83,177", prior: "88,432", c: "−5.9%",
      note: "Times the account’s content was seen. The earlier 3 months include June 30 and July 1, which recorded 19,131 views between them, the highest pair of days in the year; without those 2 days, August to October would be ahead of May to July.",
      noteInternal: "June 30 and July 1 read 10,865 and 8,266 views on reach of 146 and 60, with no piece published either day. Without them May to July reads 69,301 and the change is +20.0%. Metricool reports them as is; unexplained." },
    { group: "Instagram", k: "Reach per day", v: "359", na: "Recorded from June 12, 2026",
      note: "Accounts reached each day, on average across the 92 days.",
      noteInternal: "33,018 summed daily reach over 92 days: August 329 a day, September 149, October 592. July ran at 861 a day with no piece above 1,100 reach; unexplained, and outside this window." },
    { group: "Instagram", k: "Engagement rate", v: "4.43%", na: "Recorded from June 12, 2026",
      note: "Responses divided by each day’s reach added up over the 92 days.",
      noteInternal: "1,464 interactions ÷ 33,018 (reach per day × days), the weekly report’s formula." },
    { group: "Short links", k: "Booking link clicks", v: "359", prior: "301", c: "+19.3%",
      note: BOOK_DEF,
      noteInternal: "Midtown 192, Upper East Side 167, against 177 and 124. Merges DDS-PC-Midtown and DDS-PC-UES on nycdentalsmileteam.short.gy with eec-booking-midtown and eec-booking-ues; both pairs live in both windows. All clicks, /* filtered, every month read November 9." },
    { group: "Short links", k: "Homepage link clicks", v: "1,623", prior: "1,255", c: "+29.3%",
      note: `${HOME_DEF} August recorded 938.`,
      noteInternal: "The root path only, All clicks, human share unknown. /website (the Instagram bio link, also to the homepage) sits in other named links: July 60, August 208, September 5, October 3." },
    { group: "Email", k: "Emails delivered", v: "12,040", prior: "6,369", c: "+89.0%",
      note: "Emails delivered, counted across every email sent in each period.",
      noteInternal: "6 campaigns against 3: August 1, September 12, October 19, October 21 and 2 on October 28. 13,726 sent, 1,686 not delivered (12.3%), against 7,239 and 870 (12.0%)." },
    { group: "Email", k: "Email clicks", v: "193", prior: "97", c: "+99.0%",
      note: `${CLICKS_DEF} Clicks rose with the number of emails delivered; National Dental Hygiene Month in October drew 87.` },
    { group: "Email", k: "Email click rate", v: "1.60%", prior: "1.52%", c: "+0.08 points",
      note: "Clicks as a share of delivered emails." },
    { group: "Email", k: "Confirmed open rate", v: "11.96%", prior: "13.03%", c: "−1.07 points",
      note: `${CONF_DEF}: 1,440 against 830. The earlier 3 months held the July whitening offer, the highest confirmed rate of any email to the whole list since June 2026, 14.5%. All opens, including mail apps that load images on their own: 6,619, 55.0%.`,
      noteInternal: "5,179 of the 6,619 all opens are proxy. July 6: 449 confirmed of 3,093 delivered. The 2 Oral Genome sends read higher (18.9%, 16.7%) on 37 and 36 delivered." },
    { group: "Podcast", k: "Downloads", v: "788", prior: "394", c: "+100.0%",
      note: `Episode downloads across every listening app and the web. ${POD_OCT}`,
      noteInternal: "Buzzsprout, custom date range per month: August 148, September 162, October 478. 164 of the October 5 week’s 177 came through Web Browser (EEC October 5 – 11 report), still unexplained; without them the 3 months read 624, +58.4%. Buzzsprout’s app view works by episode, not by date, so the browser share by month is not known." },
    { group: "Search", k: "Search clicks", v: "715", na: "Counted from June 2026",
      note: "Clicks from Google results to the site. The homepage took 503.",
      noteInternal: "The earlier 3 months hold May, the last month of the old blog posts (703 clicks), so no comparison is shown. From the next edition (September to November against June to August) Search compares." },
    { group: "Search", k: "Search appearances", v: "6,636", na: "Counted from June 2026",
      note: "Times the site appeared in Google results." },
    { group: "Search", k: "Search click rate", v: "10.77%", na: "Counted from June 2026",
      note: "Clicks as a share of appearances, across all searches." },
    { group: "Search", k: "Average search position", v: "5.22", na: "Counted from June 2026",
      note: "US searches only; lower is better.",
      noteInternal: "Impression-weighted over the US-filtered daily rows." },
    { group: "Website", k: "Visits from Google search", v: "1,154", na: "Counted from June 2026",
      note: "Visits that arrived from a Google search. 769 of them engaged with the site.",
      noteInternal: "66.6% engaged. GA4 with our own traffic left out (eec-prototype.vercel.app, figmentcreative.com)." },
    { group: "Website", k: "New visitors", v: "3,670", na: "Counted from June 2026",
      note: "First-time visitors to the site. About 1 in 3 reached old addresses that no longer have a page of their own.",
      noteInternal: "1,123 of them reached the 404 page (31%). Read new visitors next to that count until the redirects are in." },
  ],
  "6m": [
    { group: "Short links", k: "Booking link clicks", v: "660", prior: "200", c: "+230.0%",
      note: `${BOOK_DEF} The pair on the practice’s own short address went live on January 23, 2026; from February to April, with every booking link live, clicks ran at 46 a month, against 110 a month since May.`,
      noteInternal: "Midtown 369, Upper East Side 291, against 102 and 98. Monthly 57, 95, 149, 178, 96, 85. November to January had the DDS-PC pair only (46, 7, 9)." },
    { group: "Short links", k: "Homepage link clicks", v: "2,878", na: "Recorded from December 2025",
      note: HOME_DEF,
      noteInternal: "The links.edgardelchaar.com links were created from December 18, 2025, so November 2025 has no homepage link and the 6 months before are not covered." },
    { group: "Podcast", k: "Downloads", v: "1,182", prior: "851", c: "+38.9%",
      note: `Episode downloads across every listening app and the web. ${POD_OCT}`,
      noteInternal: "October’s 478 is 40% of the window. Without the October 5 week’s 164 browser downloads, +19.6%." },
    { group: "Instagram", k: "Net new followers", v: "+211", na: "Daily figures start December 31, 2025",
      note: "Followers gained less followers lost, as Instagram reports them each day. The account ended October at 3,352.",
      noteInternal: "Gained 327, lost 116. May was the only month that lost more than it gained, 30 against 35." },
    { group: "Instagram", k: "Views", v: "171,609", prior: "163,768", c: "+4.8%",
      note: "Times the account’s content was seen. This period includes June 30 and July 1, which recorded 19,131 views between them; without those 2 days it would sit below the 6 months before. There is no reading for March 29, 2026, so the earlier figure covers 180 of its 181 days.",
      noteInternal: "Without June 30 and July 1 this window reads 152,478 and the change is −6.9%. March 29 is the European clock change; Metricool’s own connector returns 0 for it." },
    { group: "Instagram", k: "Responses", v: "2,338", prior: "2,636", c: "−11.3%",
      note: "Likes, comments, saves and shares on the pieces published in each period. The earlier 6 months held November and April, the 2 strongest months before October 2026.",
      noteInternal: "73 posting days against 60." },
    { group: "Email", k: "Emails delivered", v: "18,409", prior: "18,649", c: "−1.3%",
      note: "Emails delivered, counted across every email sent in each period; level with the 6 months before.",
      noteInternal: "9 campaigns against 6. 2,556 not delivered (12.2%) against 3,086 (14.2%); the February 27 podcast newsletter alone lost 1,071 of 3,568." },
    { group: "Email", k: "Email clicks", v: "290", prior: "300", c: "−3.3%",
      note: `${CLICKS_DEF} Held level with the 6 months before, when the February podcast newsletter drew 114 on its own.` },
    { group: "Email", k: "Email click rate", v: "1.58%", prior: "1.61%", c: "−0.03 points",
      note: "Clicks as a share of delivered emails. The earlier 6 months held the February podcast newsletter, the highest click rate of any email, 4.6%." },
    { group: "Email", k: "Confirmed open rate", v: "12.33%", na: "From the June 23, 2026 email",
      note: `${CONF_DEF}: 2,270 opens. All opens, including mail apps that load images on their own: 10,112, 54.9%.`,
      noteInternal: "Before June 23 Constant Contact reported confirmed opens equal to all opens on every email except February 11 (and March 20, 7 proxy), so November to April has no comparable figure. No email went out between March 20 and June 23." },
  ],
  "12m": [
    { group: "Short links", k: "Booking link clicks", v: "860", na: "First booking links created October 2025",
      note: `${BOOK_DEF} A second pair, on the practice’s own short address, went live on January 23, 2026.`,
      noteInternal: "Midtown 471, Upper East Side 389." },
    { group: "Instagram", k: "Views", v: "335,377", na: "Recorded from August 25, 2025",
      note: "Times the account’s content was seen. June 30 and July 1 recorded 19,131 of them between them, the highest pair of days in the year. There is no reading for March 29, 2026, so the year counts 364 of its 365 days.",
      noteInternal: "June 30 and July 1 carry 19,131 between them." },
    { group: "Instagram", k: "Responses", v: "4,974", prior: "1,395", c: "+256.6%",
      note: "Likes, comments, saves and shares on the pieces published in each year. The rise comes from publishing more often: on record, the year before had far fewer days with a new piece, and each of those days drew more responses on average.",
      noteInternal: "133 posting days against 24; 37 interactions per posting day against 58. Metricool’s account timelines begin August 25, 2025; interactions before then come from the post history it imported, so this comparison depends on that import being complete." },
    { group: "Podcast", k: "Downloads", v: "2,033", prior: "1,182", c: "+72.0%",
      note: "Episode downloads across every listening app and the web. 7 of the 12 months beat the same month a year earlier.",
      noteInternal: "Buzzsprout custom date range per calendar month. Without the October 5 week’s 164 browser downloads, +58.1%." },
    { group: "Email", k: "Emails delivered", v: "37,058", na: "First email October 31, 2025",
      note: "Emails delivered, counted across every email sent in the year.",
      noteInternal: "15 campaigns, 42,700 sent, 5,642 not delivered (13.2%). The year before holds only the October 31, 2025 send (3,380 delivered, 91 clicks), so no comparison is shown." },
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
    note: "By the month each piece was published. June and September 2025 record no responses.",
    caption: { "3m": "1,464 against 874", "6m": "2,338 against 2,636", "12m": "4,974 against 1,395" } },
  { id: "c-views", title: "Instagram views", unit: "views", priorIn: ["3m", "6m"],
    points: months("2025-09", [14213, 25686, 34281, 44950, 11078, 25049, 26602, 21808, 16029, 27193, 45210, 28892, 17107, 37178]),
    note: "From September 2025, the first full month on record. March 2026 has no reading for the 29th.",
    caption: { "3m": "83,177 against 88,432", "6m": "171,609 against 163,768", "12m": "335,377 · recorded from August 25, 2025" } },
  { id: "c-book", title: "Booking link clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [46, 7, 9, 82, 35, 21, 57, 95, 149, 178, 96, 85]),
    note: "From November 2025, the first full month after the first booking links were created. The pair on the practice’s own short address went live on January 23, 2026.",
    caption: { "3m": "359 against 301", "6m": "660 against 200", "12m": "860 · first booking links created October 2025" } },
  { id: "c-mail", title: "Email clicks", unit: "clicks", priorIn: ["3m", "6m"],
    points: months("2025-11", [79, 36, 0, 157, 28, 0, 0, 2, 95, 55, 14, 124]),
    note: "By the month each email went out; months at zero had no email.",
    caption: { "3m": "193 against 97", "6m": "290 against 300", "12m": "590 · first email October 31, 2025" } },
  { id: "c-search", title: "Search clicks", unit: "clicks", priorIn: [],
    points: months("2025-07", [2511, 2193, 1835, 1693, 1528, 1293, 1252, 835, 944, 887, 703, 228, 225, 240, 237, 238]),
    note: "From July 2025, the first full month in Google’s search reporting. The site’s older blog posts came down in late May 2026; the Search section explains the change.",
    caption: { "3m": "715 · counted from June 2026", "6m": "Shown for context; counted from June 2026", "12m": "Shown for context; counted from June 2026" } },
  { id: "c-google", title: "Visits from Google search", unit: "visits", priorIn: [],
    points: months("2026-02", [1168, 1349, 1244, 889, 390, 410, 405, 374, 375]),
    note: "From February 2026, the first full month of the site’s visit records. May 2026 has no data for the 23rd, 25th and 27th.",
    caption: { "3m": "1,154 · counted from June 2026", "6m": "Shown for context; counted from June 2026", "12m": "Shown for context; counted from June 2026" } },
];

/* ------------------------------------------------------------ WHAT WORKED */
export type Piece = { url: string; format: string; date: string; title: string; views: number; reach: number; responses: number; why?: string };

const P = {
  implant: { url: "https://www.instagram.com/reel/DfDRO6eBL4Q/", format: "Reel", date: "October 28, 2026", title: "There is more to implant success than what happens in the bone.", views: 11826, reach: 9350, responses: 263,
    why: "88 seconds with Mélissa M. Seif on the implant-abutment connection, cut from the podcast. It reached more accounts than any other piece in the year, and 67 people saved it." },
  shiloah: { url: "https://www.instagram.com/p/DcjlJ9MmdxM/", format: "Post", date: "August 27, 2026", title: "Welcoming Dr. Jonathan Shiloah, the practice’s newest orthodontist", views: 7206, reach: 3269, responses: 115 },
  biology: { url: "https://www.instagram.com/reel/Dd9nF-Izyen/", format: "Reel", date: "October 1, 2026", title: "New episode: Biology Always Wins, with Mélissa M. Seif", views: 3575, reach: 2104, responses: 162 },
  hudson: { url: "https://www.instagram.com/p/DehsxlCGYTA/", format: "Post", date: "October 15, 2026", title: "A few more moments from the day at Hudson Yards", views: 2819, reach: 1063, responses: 84 },
  campana: { url: "https://www.instagram.com/reel/DYSOcwGhzJn/", format: "Reel", date: "May 13, 2026", title: "Winemaker Andrés Campana on craftsmanship and identity", views: 2055, reach: 1117, responses: 105 },
  castillo1: { url: "https://www.instagram.com/reel/DWWoVf0h7mA/", format: "Reel", date: "March 26, 2026", title: "How Dr. Castillo approaches patient care", views: 4448, reach: 2325, responses: 199 },
  castillo2: { url: "https://www.instagram.com/reel/DWpPFRDgeGo/", format: "Reel", date: "April 2, 2026", title: "Dr. Castillo: educate patients, respect their decisions", views: 3690, reach: 2240, responses: 255 },
} satisfies Record<string, Piece>;

const WORKED: Record<WinId, { gallery: Piece[]; note: string }> = {
  "3m": { gallery: [P.shiloah, P.biology, P.hudson],
    note: "The next 2 pieces by views, and the Hudson Yards post, which drew the strongest response rate of any piece in the period that reached more than 1,000 accounts: 7.9%." },
  "6m": { gallery: [P.shiloah, P.biology, P.campana],
    note: "The next 2 pieces by views, and the Andrés Campana reel, which drew the strongest response rate of any piece in the period that reached more than 1,000 accounts: 9.4%." },
  "12m": { gallery: [P.shiloah, P.castillo1, P.castillo2],
    note: "The next 2 pieces by views, and Dr. Castillo’s April 2 reel, which drew the strongest response rate of any piece in the year that reached more than 1,000 accounts, 11.4%, and the second-most responses, 255." },
};

/* ------------------------------------------------------------------ SEARCH */
const SEARCH_TABLE = {
  head: ["Month", "Search clicks", "Appearances", "Click rate", "US position", "Visits from Google"],
  rows: [
    ["February 2026", "835", "53,863", "1.55%", "14.37", "1,168"],
    ["March 2026", "944", "70,102", "1.35%", "16.71", "1,349"],
    ["April 2026", "887", "61,810", "1.44%", "17.14", "1,244"],
    ["May 2026", "703", "56,079", "1.25%", "18.88", "889"],
    ["June 2026", "228", "4,846", "4.70%", "13.50", "390"],
    ["July 2026", "225", "2,414", "9.32%", "4.79", "410"],
    ["August 2026", "240", "2,215", "10.84%", "5.99", "405"],
    ["September 2026", "237", "2,239", "10.59%", "4.33", "374"],
    ["October 2026", "238", "2,182", "10.91%", "5.38", "375"],
  ],
};

const SEARCH_CLIENT = [
  "Google search traffic dropped sharply in late May 2026, when the site’s older blog posts came down and Google stopped showing them over the following weeks. Clicks had already eased from 2,511 in July 2025 to 887 in April 2026 as appearances fell; the late-May change then took them to between 225 and 240 a month. From February to April the site averaged 889 search clicks and 1,254 visits from Google a month; from June to October it has averaged 234 and 391.",
  "Most of the earlier clicks came from those posts. 4 of them, on dry sockets after a bone graft, signs a gum graft has not taken, blowing your nose after a sinus lift and how painful a sinus lift is, took 4,769 of the 8,715 clicks Google credited to individual pages from November 2025 to October 2026. The older pages as a group drew many appearances at a low click rate and a low average position, which is why both look so different before and after the change.",
  "Since June, Search has settled on the site’s current pages. From July, about 1 appearance in 10 has led to a click, and the site’s average position in US searches has stayed between 4.3 and 6.0. Visits from Google search have run between 374 and 410 a month.",
  "Because the months before June describe pages that are no longer live, the review counts Search and website figures from June. The first comparison comes with next month’s review, September to November against June to August.",
];

const SEARCH_INTERNAL = [
  "The break: daily impressions fell from about 1,900 to about 100 between May 28 and mid-June 2026, GA4 has no rows at all for May 23, 25 and 27 (most likely the switch-over), and the 404 page first appears in May (69 new users that month). February to April averaged about 62,000 impressions a month; June to October averages 2,779.",
  "The 4 posts: /dry-socket-with-bone-graft/ 1,954, /signs-of-failed-gum-graft/ 1,543, /accidentally-blew-nose-after-sinus-lift/ 810 and /how-painful-is-a-sinus-lift/ 462, together 2.37% click rate at position 6.9, better than the site average then. The low pre-June click rate came from the 154 other old pages missing from the August to October list (0.37% at position 18.2). Restoring or redirecting the 4 is the largest single search opportunity on the site, and it is the redirect work already open with Johana. The client text explains the drop but does not recommend the fix; put that to the practice separately.",
  "August to October, searches for the practice’s name lead the query list: edgard el chaar 86 clicks at position 3.4, edgar el chaar 46 at 1.4, dr el chaar 45 at 8.0, all countries. On the page list the homepage took 503 clicks, Our Doctors 132 and Locations 70.",
  "The 404 page has taken 2,172 new users since May: 69, 311, 669, 285, 374 and 464 by month. The client text names the drop and the 4 posts (Walter, November 9: show it “as long as we explain the context”) but not the 404 page or who took the posts down.",
];

/* ------------------------------------------------------------ DATA NOTES */
const NOTES = [
  { title: "2 Instagram days carry 19,131 views", body: "June 30 and July 1 read 10,865 and 8,266 views on reach of 146 and 60, accounts engaged 243 and 162, and no piece published. They are the 2 highest view days of the year. They decide the direction of the views comparison in both the 3-month view (−5.9%, +20.0% without them) and the 6-month view (+4.8%, −6.9% without). Kept as Metricool reports them; both client notes name the 2 days." },
  { title: "No Instagram reading for March 29, 2026", body: "The European clock change. The pull has no row for the day, and Metricool’s own connector returns 0 for views, interactions, gains and losses. The 6-month comparison keeps its earlier window at 180 of 181 days and the 12-month views figure counts 364 of 365, with the gap named in both client notes." },
  { title: "Instagram interactions before August 2025 are imported", body: "Metricool’s account timelines start August 25, 2025, when it appears to have been connected; interactions before then come from the post history it imported. The year before reads 24 posting days and 1,395 interactions (58 a posting day) against 133 days and 4,974 (37 a day). June and September 2025 read 0. The 12-month comparison stays in the table with the client note explaining it comes from publishing more often, but nothing leads on it until the import is checked against the account’s own grid for November 2024 to October 2025." },
  { title: "July reach ran at 861 a day", body: "26,706 summed daily reach in July against 10,212, 4,466 and 18,340 in August to October, with no piece above 1,100 reach. It sits outside the only window that shows reach. Worth asking whether anything was boosted in July; the weekly reports found the paid columns empty for the weeks they checked, none of them in July." },
  { title: "Constant Contact did not split proxy opens before June 23", body: "Before June 23, 2026 every campaign reports confirmed opens equal to all opens (proxy 0, or 7 on March 20) except February 11, which reads confirmed 0, proxy 1,511 and all opens 692; those cannot all be true, and it is Constant Contact’s own figure. February 27 did not deliver 1,071 of 3,568 (30.0%) against 10–13% on every other large send. Confirmed opens are compared only where every email in both windows went out on or after June 23; none went out between March 20 and June 23, so the 3-month comparison qualifies, and the 6-month view shows confirmed opens uncompared." },
  { title: "The Oral Genome emails are sent as EEC", body: "Both Oral Genome Offer campaigns (October 21, 39 sent; October 28, 38 sent) go out from “Edgard El Chaar, DDS, PC”, so they are counted here. The EEC October 19 – 25 report counted the first; the NYCDS October 26 – November 1 report counted the second as NYCDS. Decide which client owns them." },
  { title: "Podcast browser downloads are unexplained", body: "October’s 478 is the most of any month in 2 years and carries the October 5 week’s 164 Web Browser downloads of 177 (EEC October 5 – 11 report). Without those 164 the comparisons read +58.4% (3 months), +19.6% (6 months) and +58.1% (12 months). The agent classification is still open with Buzzsprout, and its app view works by episode rather than by date, so the browser share cannot be split by month. The client copy gives the totals but does not headline them." },
  { title: "Booking links merge 2 pairs; the homepage link starts in December", body: "The pull counts DDS-PC-Midtown and DDS-PC-UES (nycdentalsmileteam.short.gy, created October 21, 2025) under the eec-booking keys together with eec-booking-midtown and eec-booking-ues (links.edgardelchaar.com, January 23, 2026), so the 6-month booking comparison has every link live for only part of its earlier window; the client note says so and gives February to April at 46 a month against 110 since May. Every links.edgardelchaar.com link dates from December 18, 2025 or later, so the homepage link is uncompared at 6 months and out of the 12-month view. Next edition: keep the 2 pairs apart in review-pull.mjs." },
  { title: "Short.io All clicks stay provisional", body: "Short.io re-counted earlier weeks between November 3 and 9. Every month here was read in one run on November 9, so the months compare with each other, but earlier readings may differ. August’s 938 homepage clicks is the year’s peak." },
  { title: "Self-check passed", body: "The pull rebuilt the October 19 week from its monthly data and matched every ledger figure: Search 52 clicks and 466 impressions at 5.25, GA4 294 new visitors and 83 from Google, Instagram 2,951 views, 136 reach per day, 3,267 followers and 31 interactions, Short.io 112 named clicks, and no /* row in any month." },
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
      ["Search and website", "Counted from June 2026; charted in full"],
    ],
    note: "From the November 9 pull. A measure appears in a view only when its source covers every month of it, and is compared only when the earlier window is covered as well. Instagram has no reading for March 29, 2026; the 6-month views comparison keeps it with the gap named. Search Console has data from June 28, 2025 and GA4 from January 22, 2026, but both are counted from June 2026 because of the late-May change (see the Search section); the charts show the full history.",
    noteClient: "A measure appears in a view only when its record covers every month of it, and is compared only when the earlier period is covered as well. Instagram has no reading for March 29, 2026; the 6-month views figure keeps that period with the gap named in its note." },
  { id: "method", title: "How the figures are measured",
    rows: [],
    note: "Instagram: Metricool account timelines summed by day in New York time; responses are interactions (likes, comments, saves, shares) on feed posts and reels on their publish date; engagement rate is interactions ÷ summed daily reach. Short links: Short.io path view, All clicks, /* filtered, links.edgardelchaar.com plus DDS-PC-Midtown and DDS-PC-UES on nycdentalsmileteam.short.gy. Email: Constant Contact per-campaign results, rates on delivered. Podcast: Buzzsprout custom date range per calendar month. Search: Search Console daily rows, US position impression-weighted. Website: GA4 property 521198918, our own traffic left out.",
    noteClient: "Instagram figures are summed day by day. Responses are likes, comments, saves and shares on the pieces published in each period, and the engagement rate is responses divided by each day’s reach added up over the period. Short-link figures count clicks on the practice’s booking links and on its short address for the homepage. Email clicks count each person once per email and add across emails. Email rates are calculated on delivered emails. Podcast downloads are taken month by month from the podcast host. Search figures come from Google’s own reporting, with the average position measured on US searches.",
    faq: [
      { q: "Why do some figures have no comparison?", a: "A figure is compared only when its source has a full record of the earlier period. Where it does not, the figure is shown on its own with the date its record starts, so no comparison rests on a partial period." },
      { q: "Why do the 6 and 12-month views not count Search and the website?", a: "The site’s older blog posts came down in late May 2026, and they had drawn most of its search traffic. Figures before June describe pages that are no longer live, so Search and the website are counted from June, which the 3-month view covers in full. Their charts show the whole history in every view, and the Search section explains the change." },
      { q: "Why are email opens shown as confirmed opens?", a: "Many mail apps open every message on arrival to load its images. Confirmed opens leave those out and count only the opens Constant Contact can attribute to a person, which it has reported separately since June 2026. All opens are given beside them." },
      { q: "Why does Instagram’s app show different numbers?", a: "The app and the reporting tool used here count views differently, and a piece’s figure in the app keeps growing after the review is read. Every figure here comes from the same reporting tool, read on November 9, 2026, so the periods compare with each other." },
      { q: "Will these figures change?", a: "Some will move a little. Responses keep gathering after a piece is published, Google keeps processing recent days, and short-link counts can be revised. Every figure here was read on November 9, 2026." },
      { q: "How often is the review updated?", a: "Once a month. When a month closes, each view moves forward by that month and its comparison moves with it." },
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
    lede: "Each measure in the selected period against the equal period before it. A figure without a comparison shows when its record starts.",
    rows: Object.fromEntries(
      (Object.keys(NUMBERS) as WinId[]).map((w) => [w, NUMBERS[w].map((r) => ({ ...r, noteInternal: IS_INTERNAL ? r.noteInternal : undefined }))]),
    ) as Record<WinId, Row[]>,
  },
  months: {
    lede: "Each measure month by month. The selected period is in plum and the period it is compared with in slate.",
    charts: CHARTS_ALL.filter((c) => (IS_INTERNAL ? !c.clientOnly : !c.internalOnly)) as Chart[],
  },
  worked: {
    lede: "The Instagram pieces that went furthest in the selected period.",
    hero: P.implant as Piece,
    byWin: WORKED,
    footnote: "Views, reach and responses as read on November 9, 2026. Pieces keep gathering responses after they are published.",
  },
  search: {
    lede: "What changed in late May 2026, and how Search has performed since.",
    paras: SEARCH_CLIENT,
    parasInternal: IS_INTERNAL ? SEARCH_INTERNAL : [],
    table: SEARCH_TABLE,
    tableNote: "February to October 2026, the months both sources cover, with May’s visits from Google on 28 of its 31 days. Clicks, appearances and position from Google’s search reporting; visits from Google from the site’s own visit records. Click rate covers all searches and position US searches only. The visit records have no data for May 23, 25 and 27, 2026.",
  },
  notes: { lede: "Gaps, oddities and open questions behind the figures. Internal only.", items: IS_INTERNAL ? NOTES : [] },
  detail: { lede: "How the review is built, and what each source covers.", panels: DETAIL_PANELS.map((p) => ({ ...p, note: pick(p.note, p.noteClient ?? p.note) })) },
};
