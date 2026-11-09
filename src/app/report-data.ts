/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers November 2 – 8 against October 26 – November 1.

   STRUCTURE. page.tsx is server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Points older than the
     week before are as first reported (the ledgers); the week before is
     re-read this cycle; short link weeks are all read November 9.

   API PULLS. First EEC cycle with all 4 figures read through the APIs on
     November 9, 10:07 – 10:08 AM New York (GA4 re-run at 11:34 AM with our
     own traffic filtered out, see below), by the scripts in the NYCDS repo
     (scripts/shortio-pull.mjs, metricool-pull.mjs, gsc-pull.mjs and
     ga4-pull.mjs, each run with --client eec). Each pull re-reads October 26 –
     November 1 in the same run. Stories and last week's per-piece Instagram
     figures from the Metricool connector, the same morning.

   COMPARISON COLUMN RESTATED. October 26 – November 1 as read on November 9:
     Instagram interactions 275 against the 272 deployed, views 16,731 exact
     against the rounded 16.7K, reach per day 1,396 against 1,395, engagement
     rate 2.81% against 2.79%. Search clicks 41 against 40, impressions 428
     against 427, click rate 9.58% against 9.37%, US position unchanged at
     4.79. GA4 sessions 203 against 204 and direct 130 against 131; new
     visitors and Google unchanged at 156 and 64.

   OUR OWN TRAFFIC LEFT OUT (Walter, November 9). The GA4 pull now filters
     out sessions from eec-prototype.vercel.app and figmentcreative.com in
     every report: 5 and 1 sessions this week, none the week before. Earlier
     ledger points are unchanged (1 eec-prototype session on October 5, no new
     visitor and no Google visit, so no trend point moves).

   SHORT LINKS RESTATED, ALL 5 WEEKS. Between November 3 and November 9
     Short.io re-counted every earlier week and took most automated clicks out
     of All clicks: the same query, filter and window that reproduced every
     published figure on November 3 now returns 83 for October 26 – November 1
     on links.edgardelchaar.com against 168, while its Human figure reads 72 on
     both days. Every week in the Booking and Homepage trends is today's
     reading (Walter, November 9, the same rule set for NYCDS booking that
     morning), so trend[0..2] does not equal last cycle's trend[1..3] on those
     2 rows by design. The 2 DDS-PC booking links on nycdentalsmileteam.short.gy
     count as EEC booking from this cycle (Walter, November 3): 8 clicks on
     /DDS-PC-UES in the week before, none this week.

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   Nothing here is estimated or inferred. Every value is carried from a source
   pull, or is plain arithmetic on two figures already present. Views are
   exact from the API; the 16.7K rounding note is gone.

   SOURCE WINDOWS:
     Instagram (Metricool API)        Nov 2 – 8 and Oct 26 – Nov 1, both read
                                      Nov 9. Points older than Oct 26 from the
                                      Metricool ledger
     Search Console (API)             Nov 2 – 8 and Oct 26 – Nov 1, both read
                                      Nov 9. US position from the US-filtered
                                      daily rows, weighted by impressions
     Website (GA4 Data API)           Nov 2 – 8 and Oct 26 – Nov 1, both read
                                      Nov 9 11:34 AM, property 521198918, our
                                      own traffic filtered out
     Short links (Short.io API)       all 5 weeks read Nov 9. Path view, All
                                      clicks, /* filtered out in the query
     Podcast (Buzzsprout)             overview, agent and location CSVs
                                      exported Nov 9, against the Nov 2
                                      baselines, lifetime 5,795 and agent
                                      total 5,789
     Email (Constant Contact)         1 campaign sent Nov 2 – 8, read from the
                                      Reporting tab on Nov 9
     Trend history                    Oct 5 – 25 from the ledgers, as reported;
                                      Oct 26 – Nov 1 re-read Nov 9; Nov 2 – 8
                                      read Nov 9. Short links: all weeks Nov 9
   ========================================================================== */

type Variant = "client" | "internal";
export const VARIANT: Variant =
  process.env.NEXT_PUBLIC_REPORT_VARIANT === "internal" ? "internal" : "client";
export const IS_INTERNAL: boolean = VARIANT === "internal";

type SectionDef = { id: string; label: string; internalOnly?: boolean; clientOnly?: boolean };

export const ALL_SECTIONS: SectionDef[] = [
  { id: "brief", label: "The brief" },
  { id: "scoreboard", label: "The week in numbers" },
  { id: "period", label: "Daily visitors" },
  { id: "engaged", label: "Visits that engaged" },
  { id: "worked", label: "What worked" },
  { id: "social", label: "Social" },
  { id: "attention", label: "Needs attention", internalOnly: true },
  { id: "learned", label: "What we learned", internalOnly: true },
  { id: "moves", label: "Next moves", internalOnly: true },
  /* `plan` was the client-voice twin of `moves`. With the client build no longer
     carrying it, it is internal-only and duplicates `moves`; drop it from this
     array entirely once that is confirmed. */
  { id: "plan", label: "The plan", internalOnly: true },
  { id: "detail", label: "Detail" },
];

export const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
export const has = (id: string) => NAV.some((n) => n.id === id);

/* ---------------------------------------------------------------- THE LEAD */
/* The masthead, restructured November 2. It used to be one prose paragraph set
   at display size, which carried 3 separate facts and gave the week's biggest
   figures no more weight than the words around them. It now runs kicker,
   headline, deck, figures.

   THE HEADLINE IS ONE IDEA. Keep it under about 16 words and on a single
   claim; the measure is 22ch and it is meant to break over 3 lines. Anything
   longer re-creates the paragraph this replaced.

   EVERY FIGURE HERE IS CLIENT-VISIBLE, in both builds — `figures` and
   `figureNote` are not variant-filtered. Only `internalNote` is.

   This week leads on search, which grew on every measure. Nothing changed on
   our side, so the headline states the result without authorship. */
const LEAD = {
  kicker: "Google search",
  headline: "More people found the practice through Google search this week.",
  deck: "48 clicks from 496 appearances in Google results, at an average US position of 4.52, where 1 is the top result.",
  figures: [
    { v: "83", l: "Visits from Google" },
    { v: "48", l: "Search clicks" },
    { v: "4.52", l: "Average position" },
  ],
  figureNote: "Against 64, 41 and 4.79 the week before.",
  internalNote:
    "Search clicks 41 to 48, impressions 428 to 496, US position 4.79 to 4.52, Google visits 64 to 83 at 57 seconds against 49. Nothing changed on our side, so the client build states it without authorship. Instagram came down from the October 28 reel: reach per day 1,396 to 387, interactions 275 to 115, views 16,731 to 7,553, while engagement rate rose 2.81% to 4.25%. Followers 3,353 to 3,352. Short.io re-counted every earlier week, roughly halving All clicks, and the trend is restated on its new count: booking 27 to 19, homepage 55 to 67. New visitors 156 to 218, with 89 of the 218 reaching the 404 page.",
};

/* --------------------------------------------------------------- THE BRIEF */
/* Two separate arrays, not one array with `client` overrides. The old shape
   fell back to the internal wording whenever an item had no override, which is
   how internal copy reached the client build once already; and it forced both
   builds to share a grouping, which stopped working once the client brief
   wanted Email and Podcast as their own columns. The grid is auto-fit, so the
   two arrays no longer have to be the same length. */
type BriefItem = { role: string; text: string };

const BRIEF_CLIENT: BriefItem[] = [
  {
    role: "Instagram",
    text: "The November 6 reel for the Beyond the Plate episode reached 898 accounts and drew 74 responses, among them 12 comments and 10 shares. The November 4 post introducing the practice’s specialists was the most viewed piece of the week, at 1,579 views.",
  },
  {
    role: "Email",
    text: "The Veterans Day email went to 2,968 inboxes on November 5. 23 of the 25 people who clicked went on to the Veterans Day nomination form.",
  },
  {
    role: "Short links",
    text: "The homepage short link took 67 clicks, up from 55, and the Midtown booking link 13, up from 11.",
  },
];

const BRIEF_INTERNAL: BriefItem[] = [
  {
    role: "What improved",
    text: "Search clicks 41 to 48, impressions 428 to 496, US position 4.79 to 4.52, the best of the 5 weeks shown. Google visits 64 to 83, 60.2% engaged, at 56.6 seconds against 48.5. The homepage 25 to 36 clicks in Search Console. Engagement rate 2.81% to 4.25%, and both new pieces came in above it: the November 6 episode reel 8.24% on 898 reach with 12 comments and 10 shares, reposted 4 times, the November 4 specialists carousel 6.73% with 1,579 views, the most of the week. Story average reach 106 to 120. Homepage short link 55 to 67 and Midtown booking 11 to 13.",
  },
  {
    role: "What softened",
    text: "Reach per day 1,396 to 387, interactions 275 to 115, views 16,731 to 7,553, accounts engaged 285 to 183, against a week carrying the October 28 reel. Followers 3,353 to 3,352, 8 gained and 8 lost. Booking short links 27 to 19, Upper East Side 16 to 6. Direct visits 130 to 173 with 15 engaged, 8.7%, at 3.2 seconds; 92 sessions landed on 33 old addresses that show the 404 page. Podcast downloads 57 to 44. Email confirmed opens 11.5% to 10.0% and clickers 36 to 25. Our Doctors 6 search clicks on 353 impressions.",
  },
  {
    role: "Next action",
    text: "Redirect the 33 old addresses that land on the 404 page, 92 visits this week and 1 engaged. Rewrite the Our Doctors and digital dentistry titles and descriptions. Tag the email and short links, 25 email clickers produced 2 attributable sessions. Clean the list, 12.1% not delivered on a sixth cycle. Unpublish the WordPress sample page and Hello world post.",
  },
];

export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "November 2 – 8, 2026",
  compared: "Compared with October 26 – November 1",
  context: "November 2 – 8, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "November 2 – 8, 2026" },
    { k: "Compared with", v: "October 26 – November 1, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
  ],

  /* The masthead lead. page.tsx renders kicker, headline, deck and figures from
     here; only `internalNote` is held back from the client build. */
  lead: LEAD,

  /* The brief columns under the masthead. Picked by variant here, so page.tsx
     has nothing to fall back to. */
  brief: {
    title: "The Brief",
    lede: "The week in figures.",
    items: IS_INTERNAL ? BRIEF_INTERNAL : BRIEF_CLIENT,
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New visitors to the website each day, this week and the week before.",
    bandA: "Previous week · Oct 26 – Nov 1",
    bandB: "This week · Nov 2 – 8",
    /* GA4 API pull, both weeks read November 9 with our own traffic filtered
       out. The previous week re-reads unchanged at 156. `shade` marks the
       previous week. */
    daily: [
      { d: "Oct 26", v: 25, shade: true },
      { d: "Oct 27", v: 28, shade: true },
      { d: "Oct 28", v: 31, shade: true },
      { d: "Oct 29", v: 20, shade: true },
      { d: "Oct 30", v: 22, shade: true },
      { d: "Oct 31", v: 18, shade: true },
      { d: "Nov 1", v: 12, shade: true },
      { d: "Nov 2", v: 52 },
      { d: "Nov 3", v: 26 },
      { d: "Nov 4", v: 31 },
      { d: "Nov 5", v: 32 },
      { d: "Nov 6", v: 23 },
      { d: "Nov 7", v: 25 },
      { d: "Nov 8", v: 29 },
    ],
    note:
      "218 new visitors against 156, and sessions 203 to 270. Most of the rise is direct: 130 to 173 sessions, 15 of them engaged, averaging 3.2 seconds. 89 of the 218 new visitors reached the 404 page, against 60 the week before, arriving on 33 old addresses that now show it, /how-to-prevent-a-root-canal alone 11. Leave those out and new visitors still rose, 96 to 129. November 2 was the busiest day at 52; November 7 had 26 sessions and 1 engaged. Google 64 to 83. The November 5 email produced 2 Constant Contact sessions from 25 clickers.",
    noteClient:
      "218 new visitors this week, against 156 the week before, with November 2 the busiest day at 52.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* GA4 API pull, November 2 – 8, our own traffic filtered out. Other
       sources combines 5 sources with 14 sessions and 10 engaged; seconds are
       engagement time divided by sessions, 986 ÷ 14 = 70. */
    rows: [
      { label: "Direct", sessions: 173, engaged: 15, seconds: 3 },
      { label: "Google search", sessions: 83, engaged: 50, seconds: 57 },
      { label: "Other sources", sessions: 14, engaged: 10, seconds: 70 },
    ],
    note:
      "Direct 173 sessions with 15 engaged, 8.7%, averaging 3.2 seconds, against 130, 26 and 14.9. The 92 sessions that landed on old addresses showing the 404 page, 1 of them engaged, are most likely the bulk of the direct rise; the pull has no source-by-landing-page split to confirm it. Google 83 at 60.2% engaged, averaging 56.6 seconds against 48.5. Other sources: 5 sources, 14 sessions, 10 engaged, 70 seconds on average: Bing 5 and Yahoo 4 at 101 and 115 seconds, aocr.org 2, Constant Contact 2 and the Instagram bio link 1. Our own visits are left out from this cycle: 5 sessions from eec-prototype.vercel.app and 1 from figmentcreative.com.",
    noteClient:
      "Google search sent 83 visits, up from 64, and 50 of them engaged with the site, averaging 57 seconds against 49 the week before. Direct visits were the largest group at 173.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2"],
    cols: [
      { label: "This week", sub: "Nov 2 – 8" },
      { label: "Previous week", sub: "Oct 26 – Nov 1" },
    ],
    rows: [
      /* Groups render in the order the rows appear. Search leads this week
         because it grew on every measure, then Website and Short links; every
         row note carries the context that explains the figure, so no row has
         to be read on its own. The Booking and Homepage trends are all read
         November 9 (see the header). */
      {
        k: "Search clicks",
        note: "Clicks from Google results to the site. The homepage took 36",
        group: "Search", fmt: "int",
        trend: [58, 62, 52, 41, 48],
        cells: [{ v: "48", c: "+17.1%", dir: "up" }, { v: "41", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        group: "Search", fmt: "int",
        trend: [518, 512, 466, 428, 496],
        cells: [{ v: "496", c: "+15.9%", dir: "up" }, { v: "428", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "US searches only. Lower is better, and this is the best of the 5 weeks shown",
        group: "Search", fmt: "pos",
        trend: [6.77, 5.05, 5.25, 4.79, 4.52],
        cells: [{ v: "4.52", c: "from 4.79", dir: "up" }, { v: "4.79", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        group: "Search", fmt: "pct",
        trend: [11.20, 12.11, 11.16, 9.58, 9.68],
        cells: [{ v: "9.68%", c: "+0.10 points", dir: "up" }, { v: "9.58%", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "These visits averaged 57 seconds on the site, against 49",
        group: "Website", fmt: "int",
        trend: [85, 99, 83, 64, 83],
        cells: [{ v: "83", c: "+29.7%", dir: "up" }, { v: "64", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "The busiest day was November 2, with 52",
        group: "Website", fmt: "int",
        trend: [393, 172, 294, 156, 218],
        cells: [{ v: "218", c: "+39.7%", dir: "up" }, { v: "156", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage. All 5 weeks read again this week",
        group: "Short links", fmt: "int",
        trend: [72, 79, 98, 55, 67],
        cells: [{ v: "67", c: "+21.8%", dir: "up" }, { v: "55", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 13, up from 11. Upper East Side 6, against 16 that included a second booking link for that office",
        group: "Short links", fmt: "int",
        trend: [23, 18, 13, 27, 19],
        cells: [{ v: "19", c: "−29.6%", dir: "down" }, { v: "27", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by the week’s total reach. On its own reach, the November 6 reel came in at 8.24%",
        group: "Instagram", fmt: "pct",
        trend: [5.19, 5.89, 3.26, 2.81, 4.25],
        cells: [{ v: "4.25%", c: "+1.44 points", dir: "up" }, { v: "2.81%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Holding at 3,352 after gaining 86 the week before",
        group: "Instagram", fmt: "int",
        trend: [3257, 3264, 3267, 3353, 3352],
        cells: [{ v: "3,352", c: "−1", dir: "down" }, { v: "3,353", c: "+86", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares. The week before included the October 28 reel, which drew 263",
        group: "Instagram", fmt: "int",
        trend: [132, 157, 31, 275, 115],
        cells: [{ v: "115", c: "−58.2%", dir: "down" }, { v: "275", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day. The week before included the October 28 reel, the widest-reaching piece in the weeks shown",
        group: "Instagram", fmt: "int",
        trend: [363, 381, 136, 1396, 387],
        cells: [{ v: "387", c: "−72.3%", dir: "down" }, { v: "1,396", c: "", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "Metricool’s account total for every format. The week before included the October 28 reel",
        group: "Instagram", fmt: "int",
        trend: [6626, 6083, 2951, 16731, 7553],
        cells: [{ v: "7,553", c: "−54.9%", dir: "down" }, { v: "16,731", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "The week before included the first days of Beyond the Plate, which has taken 25 downloads since October 29",
        group: "Podcast", fmt: "int",
        trend: [177, 131, 77, 57, 44],
        cells: [{ v: "44", c: "−22.8%", dir: "down" }, { v: "57", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The episode reel on November 6 drew 74 interactions on 898 reach, 8.24%, the highest rate of any piece this week or last. The November 4 specialists carousel took 1,579 views, the most of the week, at 6.73%. The 2 together took 2,963 of the account’s 7,553 views.",
    ledeClient: "The November 6 reel and the November 4 carousel each drew responses from a larger share of the people they reached than any piece the week before.",
    /* The title is a contiguous fragment of the reel's own caption, whose first
       line is "NEW EPISODE 🎙️💥". */
    hero: {
      url: "https://www.instagram.com/reel/DfaVpX9h1zD/",
      title: "Beyond the Plate: Nutrition, Inflammation & the Mouth–Body Connection",
      date: "November 6",
      format: "Reel",
      stats: [
        { v: "1,384", l: "Views" },
        { v: "898", l: "Reach" },
        { v: "74", l: "Interactions" },
        { v: "8.24%", l: "Engagement" },
      ],
      why:
        "The reel announcing the Beyond the Plate episode, in which Alexandra Cerone and Dr. El Chaar look at how nutrition shapes the oral microbiome, inflammation and healing. It drew the most direct response of the week: 12 comments, 10 shares and 4 reposts. Its engagement rate, interactions divided by reach, was 8.24%, higher than any piece the week before, and it reached 898 accounts.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/p/DfVRuGNmZYn/",
        title: "Specialized care starts with the right team.",
        date: "November 4", format: "Feed post", views: 1579, reach: 609, interactions: 41,
      },
    ],
    galleryNote:
      "A carousel introducing the specialists behind DDS PC and the fields they cover, from periodontics and implants to orthodontics and endodontics. It was the most viewed piece of the week and was shared 4 times. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for November 2 – 8 from the Metricool pull, in the
     social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "The account is holding at 3,352 followers after adding 86 the week before. It reached an average of 387 accounts a day, and 183 accounts engaged with the content.",
      "The November 6 reel for the latest podcast episode, Beyond the Plate, reached 898 accounts and drew 74 interactions, among them 12 comments and 10 shares, and was reposted 4 times. Its engagement rate of 8.24% was the highest of any piece in the last 2 weeks.",
      "The November 4 carousel introducing the specialists behind DDS PC was the most viewed piece of the week, at 1,579 views and 41 interactions. Stories added 1,494 impressions, reaching 120 accounts on average, up from 106.",
    ],
    takeaway:
      "The November 6 episode reel and the November 4 specialists carousel each drew responses from a larger share of the people they reached than anything the week before, 8.24% and 6.73%. The October 28 excerpt showed how far a clinical cut from the podcast can travel; this week’s pieces drew a stronger response from the people they reached. Clinical excerpts, episode announcements and introductions to the team each have a place in the mix.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "8 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Measurement",
        title: "Short.io re-counted every earlier week and roughly halved All clicks",
        body:
          "The same query, filter and window that reproduced every published figure on November 3 now returns about half as much. October 26 – November 1 reads 83 on links.edgardelchaar.com against 168, while its Human figure is 72 on both readings, so Short.io has taken most automated clicks out of All clicks after the fact. Every week moved: homepage 126, 130, 155 and 98 for October 5 – 26 now reads 72, 79, 98 and 55, and booking 26, 22, 26 and 23, or 31 with the 2 DDS-PC links, now reads 23, 18, 13 and 27. The November 9 script change for NYCDS does not touch the EEC query. The scoreboard restates all 5 weeks on today’s reading, the rule set for NYCDS booking the same morning. The Instagram bio link’s 37 clicks in the October 26 week now read 3, so last week’s note on bio traffic no longer holds. All clicks now runs 85% to 87% human, which mostly closes the gap between the EEC and NYCDS bases.",
      },
      {
        tag: "Real gap",
        title: "A third of the week’s visits landed on old addresses that show the 404 page",
        body:
          "92 of 270 sessions landed on 33 addresses that have no page title of their own, and the 404 page took 92 views from 89 new users, against 61 and 60 the week before, so the 2 match. Most are old blog posts, the rest old service and policy pages and a PDF: /how-to-prevent-a-root-canal 11, /pain-after-gum-graft 5, then 8 at 4 each, among them /signs-of-failed-gum-graft, /how-painful-is-a-root-canal and /dental-implant-services. 1 of the 92 engaged. Leave them out and new visitors still rose, 96 to 129, so the rise is real but smaller than 156 to 218 suggests. They are most likely the bulk of the direct rise too, though the pull cannot split source by landing page. Redirecting each address to the nearest live page keeps whatever still links to them.",
      },
      {
        tag: "Real gap",
        title: "The email list is still bouncing at 12%",
        body:
          "408 of 3,376 sends on the November 5 Veterans Day email did not deliver, 12.1%, against 12.5% on October 28, 12.4% on October 19 and 12.1% on August 1. 2,968 delivered. Unsubscribes 7, spam reports 1. Sixth cycle and flat. Every rate in the report is calculated on delivered mail, so the rates are sound; the list is the thing that is wrong. Figures from the Reporting tab throughout.",
      },
      {
        tag: "Real gap",
        title: "The email’s clicks still cannot be traced to the site",
        body:
          "25 people clicked the November 5 email, 33 link clicks between them: the Veterans Day nomination form, a Google Form, 23, and conta.cc/4sAAfbu 10. GA4 recorded 2 Constant Contact sessions. The nomination form never touches the site, so most of these clicks would not show in GA4 in any case, but the October 28 and October 19 campaigns show the same gap on links that do. The email carried no booking link. Tag the email links and the short links; sixth cycle.",
      },
      {
        tag: "Note",
        title: "Search rose on every measure with nothing changed on our side",
        body:
          "Clicks 41 to 48, impressions 428 to 496, US position 4.79 to 4.52, the best of the 5 weeks shown, and Google visits 64 to 83 averaging 56.6 seconds. The homepage took 36 clicks on 343 impressions against 25 on 294. Name searches stayed at the top: edgard el chaar 1.90 with 8 clicks, edgar el chaar 1.14, el chaar 1.00 with 3 clicks, dr el chaar 1.25 from 3.18. The 2 pages flagged last week did not improve: Our Doctors 6 clicks on 353 impressions at 4.78, 1.7%, against 10 on 273; digital dentistry 1 click on 114 at 2.11. The client build states the rise without authorship.",
      },
      {
        tag: "Note",
        title: "WordPress sample content is still published",
        body:
          "/sample-page took 1 session with 12 page views, and a page titled Hello world! recorded a view; Search Console showed /2026/02/09/hello-world/ the week before. These are WordPress’s default page and post. Unpublish both.",
      },
      {
        tag: "Measurement",
        title: "The browser-versus-app split moved again",
        body:
          "Web Browser rose 3 and everything else 41, against 20 and 37 the week before and 73 and 4 the week before that, so the browser share has gone 95%, 35% and 7% in 3 weeks. The unnamed agents that made up 23 of last week’s 37 all but stopped: Unknown Apple Apps took none this week and Unknown at most 1, while Apple Podcasts took at least 27 and Spotify at least 6. A mix moving this much 3 weeks running looks like classification rather than listening, so it is still worth asking Buzzsprout before the split leads anything. The named-app figures are bounds because last week’s per-agent snapshot was not kept; today’s is in the cycle ledger, so next week’s split is exact.",
      },
      {
        tag: "Note",
        title: "Last week restated",
        body:
          "October 26 – November 1 re-read on November 9. Instagram interactions 275 against the 272 deployed, views 16,731 exact against the rounded 16.7K, reach per day 1,396 against 1,395, engagement rate 2.81% against 2.79%. The October 28 reel now reads 11,826 views, 9,350 reach and 263 interactions. Search clicks 41 against 40, impressions 428 against 427, click rate 9.58% against 9.37%, US position unchanged at 4.79. GA4 sessions 203 against 204 and direct 130 against 131; new visitors and Google unchanged. Short links on Short.io’s re-count, with the 2 DDS-PC booking links counted: booking 27, homepage 55, named total 91. Metricool now reads October 5 and 12 interactions at 141 and 164 against the 132 and 157 in the trend; those ledger values are kept, since only last week is restated. Followers: account down 1, Metricool 8 gained and 8 lost. The October 28 email re-read on November 9: 342 confirmed opens against 338, 1,633 all opens against 1,620, 36 clickers against 35, and 18 clicks to the booking page across its 2 location links against 15; sent, delivered and bounced unchanged at 3,391, 2,967 and 424.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  /* Internal only since October 26, and now actually filtered: page.tsx wrapped
     this section in has("learned") on November 2. Before that the id was marked
     internalOnly, which removed it from the nav while the body kept rendering in
     the client build. The per-item `client` overrides are gone with it; the type
     annotation keeps `item.client ?? item` in page.tsx compiling, so the
     overrides can come back without a page change if the section ever does. */
  learned: {
    lede: "4 things worth carrying into the next report.",
    items: [
      {
        title: "Short.io’s All clicks figure can change after the fact",
        body: "Between November 3 and November 9 Short.io re-counted every earlier week the pull reads, October 5 to November 1, and took out about half of All clicks, while Human clicks did not move. Treat every Short.io week as provisional, and read the whole trend on the same day each cycle so the weeks stay comparable.",
      },
      {
        title: "Response rate and reach are separate jobs",
        body: "The November 6 episode reel drew 8.24% on 898 reach; the October 28 excerpt 2.81% on 9,350, as read today. The announcement drew a high share of responses on a small reach; the clinical excerpt reached 10 times as many accounts and drew a smaller share. The announcement also held fewer viewers: 38.3% past 3 seconds against 58.1%, 12.0 seconds watched on average of 88. Judge each kind on its own job.",
      },
      {
        title: "New visitors overstate interest while old addresses still draw traffic",
        body: "89 of 218 new visitors reached the 404 page, and 1 of the 92 sessions that landed there engaged. Until the redirects are in, read new visitors next to the 404 count. Google visits are the cleaner measure of interest.",
      },
      {
        title: "Search can move a long way with nothing changed on our side",
        body: "Clicks up 17% and position the best in 5 weeks, with no title, content or link work shipped. dr el chaar moved again too, 3.18 to 1.25. Report these moves without authorship, and judge the title work on Our Doctors and digital dentistry by their own click rates once it ships.",
      },
    ] as { title: string; body: string; client?: { title: string; body: string } }[],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "6 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Redirect the old blog addresses that land on the 404 page",
        owner: "Figment, with Johana",
        metric: "New users reaching the 404 page under 20 a week, against 89",
        body: "33 old addresses took 92 visits this week and 1 engaged; the 404 page took 89 new users, against 60 the week before. Map each address to the nearest live page, starting with /how-to-prevent-a-root-canal and the gum graft posts, and set them as 301 redirects. That needs a plugin or server access, which is Johana’s side.",
      },
      {
        action: "Write titles and descriptions for the Our Doctors and digital dentistry pages",
        owner: "Figment",
        metric: "Our Doctors click rate above 3.7% and digital dentistry above 1 click a week, against 1.7% and 1",
        body: "Our Doctors took 353 impressions for 6 clicks at position 4.78, 1.7%, down from 10 on 273. Digital dentistry took 1 click on 114 at 2.11. Both are seen and not chosen, which is a title and description problem rather than a ranking one. Carried from last week; nothing has shipped yet.",
      },
      {
        action: "Tag the email links and the EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Next campaign's clicks appearing as attributable sessions rather than direct",
        body: "25 email clickers produced 2 Constant Contact sessions this week; 36 produced 1 the week before. Tagging every link that points at the site gives GA4 a source to read. Route the next email’s booking links through Short.io as well: the November 5 email carried none, and the October 28 email sent 18 straight to CareStack, re-read from the 15 first reported. Sixth cycle asking.",
      },
      {
        action: "Clean the email list before the next send",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next campaign",
        body: "408 of 3,376 did not deliver on November 5, 12.1%, against 12.5%, 12.4% and 12.1% on the 3 campaigns before. Sixth cycle and flat. Every rate in the report is calculated on delivered mail, so the rates are sound; the list is the thing that is wrong.",
      },
      {
        action: "Cut a clinical excerpt from the podcast every week",
        owner: "Figment",
        metric: "Reach per day above 500 without a second outlier",
        body: "This week’s reel was the episode announcement, which drew the best response rate of the 2 weeks, 8.24%, and reached 898. Reach per day came in at 387, so the excerpt test set last week has not run yet. 52 episodes are recorded, so the input is editing rather than production.",
      },
      {
        action: "Ask Buzzsprout what changed in the agent classification",
        owner: "Figment",
        metric: "A written answer before the figure is reported again",
        body: "Downloads through a web browser went 73 of 77, 20 of 57 and 3 of 44 over 3 weeks, and the unnamed agents that made up 23 of last week’s 37 took at most 1 this week. Either listening habits changed completely or the classification did. Until there is an answer, report the total and leave the app split in the detail panel.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Point the old blog addresses at live pages",
        body: "33 old addresses still bring visitors to the site and show them a page that no longer exists. Redirecting each one to the nearest live page sends those visitors somewhere useful.",
      },
      {
        action: "Improve the titles on the Our Doctors and digital dentistry pages",
        body: "Both appear high in Google results and are not being chosen: Our Doctors took 353 appearances for 6 clicks. Rewriting what Google shows is faster than trying to rank higher.",
      },
      {
        action: "Add tracking to the email and short links",
        body: "The November 5 email recorded 25 clickers and 2 visits could be traced back to it. Adding tracking means the next campaign can be measured properly against the website.",
      },
      {
        action: "Review the email list before the next campaign",
        body: "Part of the list is no longer reaching people. Verifying the addresses protects delivery for everyone else and gives a clearer read on how the next campaign performs.",
      },
      {
        action: "Keep both kinds of Instagram piece in the mix",
        body: "The October 28 excerpt reached the widest audience in the weeks this report covers; the November 6 episode announcement drew the strongest response rate from the people it reached. Clinical excerpts for reach, announcements and team pieces for response.",
      },
    ],
  },

  /* ---------------------------------------------------------------- DETAIL */
  detail: {
    lede: "The figures behind the report, and how each was measured.",
    panels: [
      {
        id: "email",
        title: "Email",
        rows: [
          ["Campaign", "November 5 · Veterans Day Email"],
          ["Sent / delivered", "3,376 / 2,968"],
          ["Confirmed opens", "298 · 10.0%"],
          ["All opens", "1,517 · 51.1% · includes 1,219 proxy"],
          ["Clicks", "25 · 0.8%"],
          ["Link clicks", "33 from 25 people"],
          ["Most-clicked link", "The Veterans Day nomination form · 23 people"],
          ["Unsubscribes", "7"],
          ["Previous campaign", "October 28 · End of Year Benefits · 36 clicks"],
        ],
        note:
          "Constant Contact, read from the Reporting tab on November 9. Rates are calculated on delivered mail, not on sends. Use the confirmed figure: 298 of the 1,517 opens are confirmed and 1,219 are proxy, where a mail client loaded the images without anyone reading it. The confirmed rate is 10.0%, against 11.5% on October 28 (342 confirmed, re-read November 9 against the 338 and 11.4% first reported), 11.8% on October 19 and 12.3% on August 1, while the headline figure sits 5.1 times higher. Constant Contact puts the open rate 1.7 points and the click rate 0.5 points below its last 10 campaigns. 25 people clicked, 33 link clicks between them: the Veterans Day nomination form, a Google Form, 23, and conta.cc/4sAAfbu 10. The email carried no booking link. GA4 recorded 2 sessions from Constant Contact over the week. Bot clicks removed: 0. Bounces 408 of 3,376, 12.1%, against 12.5% on October 28; the bounce count and the spam report are carried in the internal sections rather than shown as rows here. Every figure in this panel is the dashboard reading, which is the basis that reconciles with the 2,968 delivered.",
        noteClient:
          "Constant Contact. Rates are calculated on delivered mail rather than on sends. 2 open figures are shown: confirmed opens, where someone actually opened the message, and all opens, which also counts mail clients that load images automatically. Confirmed opens are the reliable figure. 25 people clicked, and 23 of them went on to the Veterans Day nomination form.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Homepage link", "67 · from 55"],
          ["Booking · Midtown", "13 · from 11"],
          ["Booking · Upper East Side", "6 · from 16"],
          ["Booking total", "19 · from 27"],
          ["Other named links", "14 · from 9"],
          ["Named links total", "100 · from 91"],
        ],
        note: "Short.io API pull, November 9, 10:07 AM: the Path view, All clicks, with the catch-all /* filtered out in the query. No /* row came back, and the 7 listed paths sum to 100, which is every click on the domain. The 2 DDS-PC booking links on nycdentalsmileteam.short.gy count as EEC booking from this cycle: none this week, 8 on /DDS-PC-UES the week before, which is why Upper East Side reads 16 for October 26 – November 1. Short.io re-counted every earlier week between November 3 and November 9 (see Needs attention), and every week in the scoreboard trend is today’s reading. Other named links: /OvWrQg 7, a YouTube video created November 6; /ddspc 3; /website, the Instagram bio link, 2; /qXg05i 2, which opens the Veterans Day nomination form. The week before: /ddspc 5, /website 3, /uFleXA 1. Human clicks 85 of 100 against 72 of 83. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. Every week shown was read on the same day, so the figures compare directly. The booking links are the most reliable figures here, because they are the ones a person reaches on purpose. The Upper East Side figure for the week before includes a second booking link for that office.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "270 · from 203"],
          ["New visitors", "218 · from 156"],
          ["Direct visits", "173 · from 130"],
          ["Direct visitors engaged", "8.7% · 3 seconds average · from 20.0% and 15 seconds"],
          ["Visits from Google search", "83 · from 64"],
          ["Google visitors engaged", "60.2% · 57 seconds average · from 65.6% and 49 seconds"],
          ["Visits from Constant Contact", "2 · from 1"],
          ["Visits from the Instagram bio link", "1 · from 2"],
          ["Busiest day", "November 2 · 52 new visitors"],
          ["Landing pages", "46 · from 32"],
          ["Homepage landings", "116 · from 90"],
          ["Our Doctors landings", "10 · from 13"],
          ["Desktop / mobile", "82% / 18% · from 68% / 32%"],
        ],
        note:
          "GA4 Data API pull for the Dr Edgar El Chaar property, November 9, 11:34 AM, with our own traffic filtered out of every report and October 26 – November 1 re-read in the same run: sessions 203 against the 204 reported and direct 130 against 131, everything else unchanged. 92 sessions landed on 33 old addresses that show the 404 page, and the 404 page took 89 new users against 60 (see Needs attention). Leave those out and new visitors read 129 against 96. Engaged-visit seconds are engagement time divided by sessions: direct 3.2, Google 56.6. Engagement time per active user 27.6 seconds against 33.2. Our own visits are left out from this cycle (Walter, November 9): 5 sessions from eec-prototype.vercel.app and 1 from figmentcreative.com this week, none the week before; the 10:08 AM reading with them in was 276 sessions and 220 new visitors. Desktop and mobile shares are of active users. Homepage and Our Doctors landings are now sessions that started on the page, 116 and 10 against 90 and 13; earlier reports showed the page views those sessions went on to make (233 and 23 this week, 177 and 18 the week before), which overstated them. Landing pages are counted without (not set). Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of ongoing interest, and they rose this week: 83 against 64, with those visitors staying 57 seconds on average against 49. 50 of the 83 engaged with the site. Total visits were 270 against 203.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Interactions", "115 · from 275"],
          ["Reach per day", "387 · from 1,396"],
          ["Engagement rate", "4.25% · from 2.81%"],
          ["Views", "7,553 · from 16,731"],
          ["Accounts engaged", "183 · from 285"],
          ["Followers", "3,352 · from 3,353"],
          ["Reels", "1 · 1,384 views · 898 reach · 74 interactions"],
          ["Feed posts", "1 · 1,579 views · 609 reach · 41 interactions"],
          ["Reels, week before", "2 · 12,271 views · 4,811 average reach · 267 interactions"],
          ["Feed posts, week before", "1 · 465 views · 248 reach · 8 interactions"],
          ["Stories", "12 · 1,494 impressions · 120 average reach · from 17, 1,847 and 106"],
          ["Published", "1 reel · 1 feed post · 12 Stories"],
        ],
        note:
          "Metricool API pull for brand DDS PC, November 9, 10:07 AM, with October 26 – November 1 re-read and restated in full the same morning. Account figures are window-scoped. Views come exact from the API from this cycle, so the 16.7K rounding is gone: the week before reads 16,731. The account total covers every format and every piece viewed during the week, which is why 7,553 exceeds the 2,963 the 2 new pieces took (1,579 + 1,384). Story impressions are a different unit and are not added in. Engagement rate is interactions on posts and reels divided by reach per day times 7: 115 against 2,709 this week and 275 against 9,772 the week before. Interactions reconcile as 41 on the feed post and 74 on the reel; the week before as 263 on the October 28 reel, 4 on the October 30 reel and 8 on the October 29 post, all read today through the Metricool connector. The November 6 reel ran 88 seconds, held 38.3% of viewers past 3 seconds against 58.1% on the October 28 reel, and averaged 12.0 seconds watched. Stories from the Metricool connector. Followers: the account total went 3,353 to 3,352, while Metricool reports 8 gained and 8 lost. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures, the same source every week, which keeps the comparison between weeks consistent. Figures count what happened during the 7 days of the report, and the account’s views cover every piece viewed in the week, not only the pieces published in it. Engagement rate is interactions divided by the week’s total reach, meaning average daily reach multiplied by 7. This week’s reel and carousel each drew responses from a larger share of the people they reached than any piece the week before. Figures for the week before were read again this week and include responses that arrived after last week’s report. No paid advertising ran in either week.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Average position", "4.52 · from 4.79 · US only"],
          ["Clicks", "48 · from 41"],
          ["Click rate", "9.68% · from 9.58%"],
          ["Impressions", "496 · from 428"],
          ["edgard el chaar", "position 1.90 · from 1.21 · 8 clicks"],
          ["edgar el chaar", "position 1.14 · 1 click"],
          ["el chaar", "position 1.00 · 3 clicks"],
          ["dr el chaar", "position 1.25 · 8 impressions"],
          ["Desktop", "22 clicks · 199 impressions · position 5.65 · all searches"],
          ["Mobile", "26 clicks · 297 impressions · position 4.08 · all searches"],
          ["Homepage", "36 clicks · 343 impressions · position 3.21"],
          ["Locations", "7 clicks · 212 impressions · position 3.57"],
          ["Our Doctors", "6 clicks · 353 impressions · position 4.78"],
          ["About", "1 click · 162 impressions · position 3.66"],
          ["Dental Services", "1 click · 142 impressions · position 3.26"],
        ],
        note:
          "Search Console API pull, November 9, 10:07 AM, with October 26 – November 1 re-read the same morning: clicks 41 against the 40 reported, impressions 428 against 427, click rate 9.58% against 9.37%, US position unchanged at 4.79. Totals come from the daily rows, the Chart.csv figures, and the device split confirms them: 26 + 22 = 48 clicks on 297 + 199 = 496 impressions. The headline position is weighted by impressions on the US-filtered daily rows, 46 clicks on 454 impressions; device positions cover all searches. The query sample withholds 65% of clicks and 68% of impressions, so query figures are a sample and are never summed. The most recent days can still rise. Our Doctors 6 clicks on 353 impressions, 1.7%, against 10 on 273; digital dentistry 1 click on 114 at 2.11; /accessibility-statement 49 impressions at 2.96 and no clicks. dr edgard el chaar 1.57 and dr. el chaar 1.60.",
        noteClient:
          "Totals come from Search Console’s daily figures. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better. This week the site appeared in more results, ranked higher in them, and more of the people who saw it clicked through.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "44"],
          ["Through web browsers", "3 · from 20"],
          ["Through everything else", "41 · from 37"],
          ["The week before", "57"],
          ["Last 30 days", "350"],
          ["Last 90 days", "778"],
          ["Lifetime downloads", "5,839"],
          ["Episodes published", "52"],
          ["Most recent episode", "October 29 · Beyond the Plate · 25 downloads"],
          ["Previous episode", "September 30 · Biology Always Wins · 28 downloads"],
          ["New York share", "551 of 5,833 located downloads · 9.4%"],
        ],
        note:
          "This week’s 44 is lifetime downloads rising from 5,795 on November 2 to 5,839 on November 9, the same method as previous weeks. Buzzsprout’s app report agrees exactly: its cumulative total rose 5,789 to 5,833, also 44, and the dashboard’s 7-day figure read 44 the same morning. The per-episode Last 7 Days column sums to 48 because that window is offset from the report week. No new episode: 52 published, with Beyond the Plate (October 29) at 25 all time and 10 in the last 7 days, promoted on Instagram on November 6. The split by agent: Web Browser rose 3 and everything else 41, against 20 and 37 the week before. Since the October 19 snapshot, net of last week’s published split, the non-browser rise is 45: Apple Podcasts 31, Spotify 10, Anghami 2, Unknown 1 and Amazon Echo 1. That 45 covers the October 19 week and this week, and the October 19 week accounts for 4 of it, so this week is at least 27 Apple Podcasts and at least 6 Spotify, on the assumption that no agent’s cumulative count fell. The split is reported here and is not used in the narrative. 30 and 90 days come from the per-episode export, 350 and 778; the dashboard read 44, 329 and 777 the same morning. New York 551 of 5,833 located downloads, from 529 of 5,789.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. This week’s figure is the change in the lifetime total between 2 readings a week apart. The 30 and 90 day figures are summed from Buzzsprout’s episode report, the same source every week, and can differ a little from its dashboard. Buzzsprout also splits downloads by the software that requested them; that split varies a lot from week to week, so it is shown here rather than relied on. The most recent episode, Beyond the Plate, went out October 29 and was promoted on Instagram on November 6.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "November 2 to 8, 2026, 7 full days, Monday to Sunday, compared with October 26 to November 1. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from October 5 to 11 through this week. Earlier weeks are shown as first reported, the week before as read again this week, and every short link week as read on November 9. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Instagram, search, website and short link figures for October 26 to November 1 were read again on November 9. Instagram posts keep gathering responses for days after they go out, which moved last week’s interactions from 272 to 275, and views now come straight from Metricool’s data rather than its rounded display, 16,731 rather than 16.7K. Search clicks moved from 40 to 41 and website sessions from 204 to 203. Short.io has revised its click counts for earlier weeks, so the 4 earlier weeks of short link figures were read again on November 9 and most read lower than in earlier reports. Last week’s booking figure reads higher, 27 against 23, because the 2 booking links for the Midtown and Upper East Side offices that sit on the NYC Dental Smiles short link domain are now counted here as well: they book into this practice. The homepage and Our Doctors landing rows now count visits that started on those pages, rather than the pages those visits went on to view, so the week before reads 90 and 13 rather than 177 and 18. The October 28 email reads 36 clicks rather than 35, from Constant Contact’s figures as they stand now. Podcast downloads are not read again, because they are measured as the change in a lifetime counter between 2 readings." },
          { q: "Why Instagram shows different view counts than this report", a: "Every Instagram figure here comes from Metricool, the same source every week, which is what makes the week-to-week comparisons hold. Instagram's own app reports its own totals and they do not match: on November 2 the October 28 reel read 12.6K in the app against 11.32K in Metricool. 2 things cause that. The report’s account figures count what happened inside the 7 days, while the app counts everything since a piece went up, so the app climbs away from the report over time. Beyond that the 2 platforms count a view differently, and neither publishes how. The report stays with Metricool rather than mixing sources." },
          { q: "How engagement rate is calculated", a: "Interactions divided by the week’s total reach, meaning the share of people who saw something and responded to it. Total reach is the average daily reach multiplied by 7, so it will not match interactions divided by the daily figure shown on the scoreboard. It is not calculated against follower count, which would make it look higher than it is." },
          { q: "What counts as an engaged visit", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action." },
          { q: "How email open and click rates are calculated", a: "On mail that was delivered, not on the number sent, because the 2 differ whenever part of a list no longer reaches people. Opens are reported twice. A confirmed open means someone opened the message. Most mail clients now load images automatically, which registers as an open whether or not anyone read it, and those are counted separately as proxy opens. The confirmed figure is the one to work from." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. Short.io can revise its counts for earlier weeks, so every week in the trend is read on the same day. The booking and homepage links existed in all 5 weeks and compare directly." },
          { q: "What is not in this report", a: "No paid advertising ran in either week. Facebook figures are not reported because Meta retired the metric behind post views in June 2026." },
        ],
        note: "Every figure in this report is carried from a source pull or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
