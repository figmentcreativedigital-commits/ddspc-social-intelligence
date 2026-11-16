/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers November 9 – 15 against November 2 – 8.

   STRUCTURE. page.tsx is server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Points older than the
     week before are as first reported (the ledgers); the week before is
     re-read this cycle; short link weeks are all read November 16.

   API PULLS. All 4 figures read through the APIs on November 16, 7:53 AM
     New York, by the scripts in the NYCDS repo (scripts/shortio-pull.mjs,
     metricool-pull.mjs, gsc-pull.mjs and ga4-pull.mjs, each run with
     --client eec). Each pull re-reads November 2 – 8 in the same run, and
     GA4 leaves out our own traffic (eec-prototype.vercel.app and
     figmentcreative.com) in every report. Stories, reel retention and last
     week's per-piece Instagram figures from the Metricool connector, the
     same morning.

   COMPARISON COLUMN RESTATED. November 2 – 8 as read on November 16:
     Instagram interactions 127 against the 115 deployed, views 7,580 against
     7,553, reach per day 388 against 387, engagement rate 4.68% against
     4.25%. Search impressions 498 against 496, click rate 9.64% against
     9.68%, US position 4.51 against 4.52, clicks unchanged at 48. GA4
     sessions 269 against 270 and direct 172 against 173; new visitors and
     Google unchanged at 218 and 83. Short links: homepage 68 against 67,
     named total 101 against 100, booking unchanged at 19.

   SHORT LINKS. All 5 weeks read November 16 (the rule since November 9).
     October 12 – November 1 read exactly as on November 9, so only the
     November 2 homepage point moves and the trend-shift guard passes on
     every row.

   NEW PAGES LIVE. The new Doctors section (the /doctors/ hub and 6
     profiles), the rebuilt service pages and the 43 articles restored from
     the V1 site with the /dental-blog/ index went live at the start of this
     week (Walter, November 16). That is our work, so the client build states
     it with authorship. No email campaign went out this week (Walter).

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   Nothing here is estimated or inferred. Every value is carried from a source
   pull, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool API)        Nov 9 – 15 and Nov 2 – 8, both read
                                      Nov 16. Points older than Nov 2 from the
                                      Metricool ledger
     Search Console (API)             Nov 9 – 15 and Nov 2 – 8, both read
                                      Nov 16. US position from the US-filtered
                                      daily rows, weighted by impressions
     Website (GA4 Data API)           Nov 9 – 15 and Nov 2 – 8, both read
                                      Nov 16 7:53 AM, property 521198918, our
                                      own traffic filtered out
     Short links (Short.io API)       all 5 weeks read Nov 16. Path view, All
                                      clicks, /* filtered out in the query
     Podcast (Buzzsprout)             overview, agent and location CSVs
                                      exported Nov 16, against the Nov 9
                                      baselines, lifetime 5,839 and agent
                                      total 5,833
     Email (Constant Contact)         no campaign sent Nov 9 – 15; the Nov 5
                                      campaign as read Nov 9
     Trend history                    Oct 12 – Nov 1 from the ledgers, as
                                      reported; Nov 2 – 8 re-read Nov 16;
                                      Nov 9 – 15 read Nov 16. Short links: all
                                      weeks Nov 16
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

   This week leads on search appearances, which more than doubled in the
   week the new doctor pages, the rebuilt service pages and the 43 restored
   articles went live. That is our work, so the copy states it with
   authorship. */
const LEAD = {
  kicker: "Website and search",
  headline: "Search appearances more than doubled in the week the new pages went live.",
  deck: "At the start of the week we launched the new Doctors section and the rebuilt service pages, and restored 43 articles from the practice’s previous website. The site appeared in Google results 1,089 times, against 498 the week before, and 281 times on Sunday alone.",
  figures: [
    { v: "1,089", l: "Appearances in Google" },
    { v: "58", l: "Search clicks" },
    { v: "252", l: "New website visitors" },
  ],
  figureNote: "Against 498, 48 and 218 the week before.",
  internalNote:
    "We put the new Doctors section (the /doctors/ hub and 6 profiles), the rebuilt service pages and the 43 V1 articles with the Dental Blog index and 7 redirects live at the start of the week, so the client build takes authorship. Impressions 498 to 1,089 and clicks 48 to 58; daily impressions 94 on Monday to 281 on Sunday. The articles took 569 page impressions and 9 clicks, the doctor pages 307 and 3. US position 4.51 to 8.24 and click rate 9.64% to 5.33% because the new pages enter low (sinus lift side effects 11.66, failed gum graft 13.21, throbbing pain after root canal 59), while the homepage moved up, 3.21 to 2.74. New users on the 404 page 89 to 26. Booking short links 19 to 31, the most in the 5 weeks shown. Instagram softer: interactions 127 to 59, reach per day 388 to 339, followers up 10. Podcast 44 to 11 with no episode since October 29. No email this week.",
};

/* --------------------------------------------------------------- THE BRIEF */
/* Two separate arrays, not one array with `client` overrides. The old shape
   fell back to the internal wording whenever an item had no override, which is
   how internal copy reached the client build once already; and it forced both
   builds to share a grouping, which stopped working once the client brief
   wanted Email and Podcast as their own columns. The grid is auto-fit, so the
   two arrays no longer have to be the same length. No email went out this
   week, so the client brief has no Email column. */
type BriefItem = { role: string; text: string };

const BRIEF_CLIENT: BriefItem[] = [
  {
    role: "Website",
    text: "At the start of the week we launched the new Doctors section and the rebuilt service pages, and restored 43 articles from the practice’s previous website. The articles are already appearing in Google results: the one on dry socket after a bone graft appeared 242 times and drew 5 clicks.",
  },
  {
    role: "Short links",
    text: "The booking short links took 31 clicks, up from 19 and the most in the 5 weeks shown: 17 for Midtown and 14 for the Upper East Side.",
  },
  {
    role: "Instagram",
    text: "The account gained 10 followers, reaching 3,362. The November 10 reel, an excerpt from the Beyond the Plate episode with Alexandra Cerone, drew 7 comments, and Stories reached 154 accounts on average, up from 120.",
  },
];

const BRIEF_INTERNAL: BriefItem[] = [
  {
    role: "What improved",
    text: "Impressions 498 to 1,089 and clicks 48 to 58 with the new pages live: the restored articles 569 page impressions and 9 clicks, dry socket alone 242 and 5; the doctor pages 307 and 3. Daily impressions 94 on Monday to 281 on Sunday. Homepage position 3.21 to 2.74. New users on the 404 page 89 to 26. New visitors 218 to 252, or 129 to 226 leaving out 404 arrivals. Google visits 69.2% engaged at 67.8 seconds, from 60.2% and 56.6. Booking short links 19 to 31, Upper East Side 6 to 14. Followers up 10; Story impressions 1,494 to 2,354 and average reach 120 to 154.",
  },
  {
    role: "What softened",
    text: "US position 4.51 to 8.24 and click rate 9.64% to 5.33%, both pulled down by new pages entering low. Google visits 83 to 78. Instagram interactions 127 to 59, reach per day 388 to 339, accounts engaged 183 to 107, against a week carrying the Beyond the Plate reel at 84; the 3 feed posts drew 16 between them. Homepage short link 68 to 58. Podcast 44 to 11, with Web Browser at 0 and no episode since October 29. 99 sessions landed on article addresses and 5 engaged. No email sent.",
  },
  {
    role: "Next action",
    text: "Redirect the old addresses still landing on the 404 page ourselves, now that the Redirection plugin is installed: the 7 with search history in the restore notes, then /covid-19-precautions-and-preventions and /services/10/ridgepreservation, 3 visits each. Decide whether /our-doctors/ redirects to the new /doctors/ hub. Fix the Dr. Vitaliya Sobol page title and hide the /author/lbm archive. Book the next podcast episode.",
  },
];

export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "November 9 – 15, 2026",
  compared: "Compared with November 2 – 8",
  context: "November 9 – 15, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "November 9 – 15, 2026" },
    { k: "Compared with", v: "November 2 – 8, 2026" },
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
    bandA: "Previous week · Nov 2 – 8",
    bandB: "This week · Nov 9 – 15",
    /* GA4 API pull, both weeks read November 16 with our own traffic filtered
       out. The previous week re-reads unchanged at 218. `shade` marks the
       previous week. */
    daily: [
      { d: "Nov 2", v: 52, shade: true },
      { d: "Nov 3", v: 26, shade: true },
      { d: "Nov 4", v: 31, shade: true },
      { d: "Nov 5", v: 32, shade: true },
      { d: "Nov 6", v: 23, shade: true },
      { d: "Nov 7", v: 25, shade: true },
      { d: "Nov 8", v: 29, shade: true },
      { d: "Nov 9", v: 43 },
      { d: "Nov 10", v: 31 },
      { d: "Nov 11", v: 25 },
      { d: "Nov 12", v: 68 },
      { d: "Nov 13", v: 40 },
      { d: "Nov 14", v: 30 },
      { d: "Nov 15", v: 15 },
    ],
    note:
      "252 new visitors against 218, and sessions 269 to 306. Only 26 reached the 404 page, against 89, the week the 43 restored articles began answering at their old addresses; leave those out and new visitors rose 129 to 226. November 12 was the busiest day at 68 new visitors, with 75 sessions and 16 engaged. Direct 172 to 200, 14.5% engaged against 8.7%. 99 sessions landed on article addresses, 98 of them new users, some most likely on November 9 before the pages went live, and 5 engaged. With those in the new-visitor count, and November 12 at 16 engaged of 75 sessions, Google visits remain the cleaner measure of interest. Google 83 to 78. The 6 Constant Contact sessions came from app.constantcontact.com with 1 active user and no new users, most likely 1 person working in the Constant Contact app rather than email readers.",
    noteClient:
      "252 new visitors this week, against 218 the week before, with November 12 the busiest day at 68.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* GA4 API pull, November 9 – 15, our own traffic filtered out. Other
       sources combines 8 sources with 28 sessions and 14 engaged; seconds are
       engagement time divided by sessions, 1,058 ÷ 28 = 38. */
    rows: [
      { label: "Direct", sessions: 200, engaged: 29, seconds: 7 },
      { label: "Google search", sessions: 78, engaged: 54, seconds: 68 },
      { label: "Other sources", sessions: 28, engaged: 14, seconds: 38 },
    ],
    note:
      "Direct 200 sessions with 29 engaged, 14.5%, averaging 6.7 seconds, against 172, 15 and 3.2. Google 78 at 69.2% engaged, averaging 67.8 seconds against 56.6. Other sources: 8 sources, 28 sessions, 14 engaged, 38 seconds on average: Constant Contact 6, aocr.org 4, Bing 4, iq.jpmchase.net 4, the Instagram bio link 4, LinkedIn 3 at 226 seconds on average, local.yobi.com 2 and m.facebook.com 1. Our own visits stay filtered out: eec-prototype.vercel.app and figmentcreative.com.",
    noteClient:
      "Google search sent 78 visits, and 54 of them engaged with the site, averaging 68 seconds against 57 the week before. Direct visits were the largest group at 200, and more of them engaged: 29, against 15.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9"],
    cols: [
      { label: "This week", sub: "Nov 9 – 15" },
      { label: "Previous week", sub: "Nov 2 – 8" },
    ],
    rows: [
      /* Groups render in the order the rows appear. Search leads this week
         because appearances more than doubled with the new pages live, then
         Short links (booking the most in 5 weeks) and Website; within each
         group the rows that grew come first. Every row note carries the
         context that explains the figure, so no row has to be read on its
         own. Short link weeks are all read November 16 (see the header). */
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results. The new doctor pages and the restored articles began appearing this week",
        group: "Search", fmt: "int",
        trend: [512, 466, 428, 498, 1089],
        cells: [{ v: "1,089", c: "+118.7%", dir: "up" }, { v: "498", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "Clicks from Google results to the site. The homepage took 31 and the restored articles 9",
        group: "Search", fmt: "int",
        trend: [62, 52, 41, 48, 58],
        cells: [{ v: "58", c: "+20.8%", dir: "up" }, { v: "48", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through. Clicks rose while appearances more than doubled, so the share is lower",
        group: "Search", fmt: "pct",
        trend: [12.11, 11.16, 9.58, 9.64, 5.33],
        cells: [{ v: "5.33%", c: "−4.31 points", dir: "down" }, { v: "9.64%", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "US searches only, and lower is better. The new articles enter further down the results than searches for the practice, which raises the average position number, while the homepage moved up",
        group: "Search", fmt: "pos",
        trend: [5.05, 5.25, 4.79, 4.51, 8.24],
        cells: [{ v: "8.24", c: "from 4.51", dir: "down" }, { v: "4.51", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 17, up from 13, and Upper East Side 14, up from 6. The most in the 5 weeks shown",
        group: "Short links", fmt: "int",
        trend: [18, 13, 27, 19, 31],
        cells: [{ v: "31", c: "+63.2%", dir: "up" }, { v: "19", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage. Across all the named short links, clicks were 97, against 101",
        group: "Short links", fmt: "int",
        trend: [79, 98, 55, 68, 58],
        cells: [{ v: "58", c: "−14.7%", dir: "down" }, { v: "68", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "The busiest day was November 12, with 68",
        group: "Website", fmt: "int",
        trend: [172, 294, 156, 218, 252],
        cells: [{ v: "252", c: "+15.6%", dir: "up" }, { v: "218", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "These visits averaged 68 seconds on the site, against 57, and 54 of the 78 engaged",
        group: "Website", fmt: "int",
        trend: [99, 83, 64, 83, 78],
        cells: [{ v: "78", c: "−6.0%", dir: "down" }, { v: "83", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Up 10 on the week, to 3,362",
        group: "Instagram", fmt: "int",
        trend: [3264, 3267, 3353, 3352, 3362],
        cells: [{ v: "3,362", c: "+10", dir: "up" }, { v: "3,352", c: "−1", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "Metricool’s account total for every format, close to the week before",
        group: "Instagram", fmt: "int",
        trend: [6083, 2951, 16731, 7580, 7341],
        cells: [{ v: "7,341", c: "−3.2%", dir: "down" }, { v: "7,580", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day. The week before included the November 6 episode announcement reel, which has reached 977 accounts",
        group: "Instagram", fmt: "int",
        trend: [381, 136, 1396, 388, 339],
        cells: [{ v: "339", c: "−12.6%", dir: "down" }, { v: "388", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares. The week before included the November 6 episode announcement reel, which has drawn 84",
        group: "Instagram", fmt: "int",
        trend: [157, 31, 275, 127, 59],
        cells: [{ v: "59", c: "−53.5%", dir: "down" }, { v: "127", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by the week’s total reach. On its own reach, the November 10 reel came in at 7.98%",
        group: "Instagram", fmt: "pct",
        trend: [5.89, 3.26, 2.81, 4.68, 2.49],
        cells: [{ v: "2.49%", c: "−2.19 points", dir: "down" }, { v: "4.68%", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "The week before was the first full week of the latest episode, Beyond the Plate, promoted on Instagram on November 6. Lifetime downloads now stand at 5,850",
        group: "Podcast", fmt: "int",
        trend: [131, 77, 57, 44, 11],
        cells: [{ v: "11", c: "−75.0%", dir: "down" }, { v: "44", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The November 10 reel, an excerpt from the Beyond the Plate conversation with Alexandra Cerone, drew 43 interactions on 539 reach, 7.98%, with 7 comments and 3 shares, and viewers watched 9.9 of its 54 seconds on average, 18.3%, against about 12 of 88, 13.7%, for the November 6 reel. The November 13 root canal post took 592 views and the most shares of the week, 5. The 4 new pieces took 2,169 of the account’s 7,341 views.",
    ledeClient: "The November 10 reel drew 43 interactions from 539 accounts reached, an engagement rate of 7.98%, and the November 13 root canal post was shared more than any other piece this week.",
    /* The title is a contiguous fragment of the reel's own caption, whose first
       line runs on to "are two very different things." */
    hero: {
      url: "https://www.instagram.com/reel/DfklL34hQEc/",
      title: "Knowing what supports your health and actually being able to do it every day",
      date: "November 10",
      format: "Reel",
      stats: [
        { v: "914", l: "Views" },
        { v: "539", l: "Reach" },
        { v: "43", l: "Interactions" },
        { v: "7.98%", l: "Engagement" },
      ],
      why:
        "An excerpt from the latest podcast episode, Beyond the Plate, in which Alexandra Cerone explains why lasting change in daily habits comes from helping patients work through real-life barriers rather than telling them what to do. It drew 43 interactions, among them 7 comments and 3 shares, plus 1 repost. Its engagement rate, interactions divided by reach, was 7.98%, and it reached 539 accounts.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/p/DfsiFqdByUJ/",
        title: "Root canals don’t have to feel intimidating.",
        date: "November 13", format: "Feed post", views: 592, reach: 303, interactions: 11,
      },
      {
        url: "https://www.instagram.com/p/DfusU7amaje/",
        title: "Did you know that diabetes and periodontal disease can influence one another?",
        date: "November 14", format: "Feed post", views: 427, reach: 192, interactions: 4,
      },
      {
        url: "https://www.instagram.com/p/DfxqvlThOCJ/",
        title: "Recently, I had the opportunity to lecture at a Straumann Group educational event",
        date: "November 15", format: "Feed post", views: 236, reach: 119, interactions: 1,
      },
    ],
    galleryNote:
      "The November 13 post thanks a patient, Yulia, for trusting Dr. Sobol, Ruth and the team with her root canal treatment, and was shared 5 times, more than any other piece this week. The November 14 post marked World Diabetes Day by explaining how diabetes and gum disease affect each other. On November 15, Dr. El Chaar wrote about his lecture at a Straumann Group educational event on the financial side of running a dental practice. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for November 9 – 15 from the Metricool pull, in the
     social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "The account gained 10 followers this week and stands at 3,362. It reached an average of 339 accounts a day, and 107 accounts engaged with the content.",
      "The November 10 reel, an excerpt from the Beyond the Plate episode with Alexandra Cerone, reached 539 accounts and drew 43 interactions, among them 7 comments. Its engagement rate was 7.98%.",
      "The feed carried the November 13 root canal post, shared 5 times; a World Diabetes Day post on November 14 on how diabetes and gum disease affect each other; and Dr. El Chaar’s November 15 post on his lecture at a Straumann Group educational event. Stories added 2,354 impressions, reaching 154 accounts on average, up from 120.",
    ],
    takeaway:
      "Podcast reels draw comments: 7 on the November 10 excerpt and 14 on the November 6 episode announcement. Patient stories get shared, with the root canal post shared more than anything else this week. Podcast excerpts, patient stories and posts from Dr. El Chaar’s teaching each have a place in the mix.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "8 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Note",
        title: "The new pages went live and search appearances more than doubled",
        body:
          "The new Doctors section (the /doctors/ hub and 6 profiles), the rebuilt service pages and the 43 V1 articles with the /dental-blog/ index went live at the start of the week. Impressions 498 to 1,089 and clicks 48 to 58, with daily impressions climbing from 94 on Monday to 281 on Sunday; the last days can still rise. The articles took 569 page impressions and 9 clicks: dry-socket-with-bone-graft 242 and 5 at 5.05, sinus-lift-long-term-side-effects 122 at 11.66, signs-of-failed-gum-graft 103 at 13.21, accidentally-blew-nose-after-sinus-lift 50 and 2. The doctor pages took 307 and 3, Dr. Edgard El Chaar’s profile 129 at 3.53. In the 90 days before the restore no article address had an impression. This is our work, so the client build states it with authorship.",
      },
      {
        tag: "Measurement",
        title: "Position and click rate fell because the new pages enter low",
        body:
          "US position 4.51 to 8.24 and click rate 9.64% to 5.33%. New pages appear for informational searches far down the results: throbbing-pain-after-root-canal at 59 and foods-to-eat-after-gum-graft at 24.27, and the surgical periodontal therapy service page at 71.29. Desktop sits at 14.11 against mobile 5.99. The homepage, Locations and Our Doctors improved: 3.21 to 2.74, 3.60 to 2.94 and 4.79 to 4.67. About, Dental Services and digital dentistry slipped: 3.66 to 3.99, 3.26 to 3.56 and 2.11 to 3.41 (page positions cover all searches). Read position and click rate on the core pages until the new pages settle; the client scoreboard notes explain the drop.",
      },
      {
        tag: "Real gap",
        title: "A few old addresses still land on the 404 page",
        body:
          "New users on the 404 page fell from 89 to 26, on 28 views. The addresses with no page title of their own this week: /covid-19-precautions-and-preventions 3 sessions, /services/10/ridgepreservation 3, /dental-implant-services 2, and the guesses /contact, /contact-us and /pages/contact 1 each. The rest are most likely article addresses hit on November 9 before the pages went live. The restore notes list 6 more addresses with search history and no redirect yet, led by /dental-office-upper-east-side/ (416 clicks in 16 months) and /endodontists-and-periodontics-midtown-office/ (280). The Redirection plugin is installed now, so these no longer need Johana.",
      },
      {
        tag: "Real gap",
        title: "2 doctor hubs are live and splitting the traffic",
        body:
          "The new /doctors/ hub took 47 views and 8 landings; the older /our-doctors/ page is still published and took 17 views and 4 landings. Search Console shows both: /our-doctors/ 8 clicks on 260 impressions at 4.67, /doctors/ 1 on 100 at 6.08. If /our-doctors/ is retired, a 301 to /doctors/ keeps its ranking and stops the 2 competing. The misspelled /dental-service/endodontric-treatment/ also still draws impressions (2) beside the corrected /dental-service/endodontic-treatment/ (4); check that it redirects.",
      },
      {
        tag: "Note",
        title: "Visits that land on the restored articles are almost all single page views",
        body:
          "99 sessions landed on article addresses, 98 of them new users, and 5 engaged; the article titles took 86 views. The pull has no source-by-landing split, but it is the same shape as last week’s old-address traffic: single page, no engagement, most likely old links, bookmarks and crawlers rather than readers. Direct engagement still rose, 8.7% to 14.5%. Search clicks on the articles, 9 this week, are the measure to watch.",
      },
      {
        tag: "Note",
        title: "WordPress leftovers",
        body:
          "/author/lbm is a live author archive (2 sessions, page title lbm), which shows an admin username; the restore redirected /author/edgard-el-chaar/ only. The Dr. Vitaliya Sobol profile’s page title has no site name, unlike the other 5 profiles. The sample page and the Hello world post recorded no views this week; unpublish them if they are still live.",
      },
      {
        tag: "Measurement",
        title: "Podcast downloads fell to 11 with no new episode",
        body:
          "Lifetime 5,839 to 5,850, and the agent report agrees, 5,833 to 5,844. Against the November 9 per-agent snapshot the split is exact: Spotify 5, Apple Podcasts 4, Unknown 1, Facebook 1, Web Browser 0. Browser downloads have gone 73, 20, 3 and 0 over 4 weeks while the apps took 4, 37, 41 and 11, so the higher October totals leaned on browser downloads that have now stopped. No episode since October 29; Beyond the Plate is at 28. The per-episode Last 7 Days column sums to 18 because its window is offset. Still worth asking Buzzsprout what the browser downloads were.",
      },
      {
        tag: "Note",
        title: "Last week restated",
        body:
          "November 2 – 8 re-read on November 16. Instagram interactions 127 against 115, views 7,580 against 7,553, reach per day 388 against 387, engagement rate 4.68% against 4.25%; followers 10 gained and 8 lost against 8 and 8. The November 6 reel now reads 1,552 views, 977 reach and 84 interactions with 14 comments and 13 shares; the November 4 carousel 1,816, 665 and 43. Search impressions 498 against 496, US position 4.51 against 4.52, click rate 9.64% against 9.68%, clicks unchanged at 48. GA4 sessions 269 against 270 and direct 172 against 173; new visitors and Google unchanged at 218 and 83. Short links: homepage 68 against 67, named total 101 against 100, booking unchanged at 19; the 3 earlier weeks read the same as on November 9. Metricool now reads October 12 and 26 interactions at 167 and 279 against the 157 and 275 kept in the trend. The November 5 email was not re-read.",
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
        title: "New pages lift the search totals before the averages",
        body: "The articles and doctor pages more than doubled impressions in their first week while position and click rate fell, because a new page starts far down the results. Judge them by clicks and by core-page position over 3 to 4 weeks, as the restore notes planned, not by the site averages.",
      },
      {
        title: "Restoring the old addresses cleared most of the 404 traffic in a week",
        body: "New users on the 404 page went 89 to 26 the week the 43 articles went live. What is left is addresses the restore did not cover, which the Redirection plugin can now handle without a server request.",
      },
      {
        title: "Podcast reels draw comments; patient stories draw shares",
        body: "The November 10 excerpt drew 7 comments on 539 reach and the November 6 episode announcement 14 on 977. The November 13 patient thank-you drew 5 shares on 303 reach, more than any other piece. Neither moved reach per day much: 339 against the 500 target.",
      },
      {
        title: "Buzzsprout’s browser downloads have stopped",
        body: "Web Browser added nothing this week after 73, 20 and 3. With the apps at 11, the total now reflects listening through apps, and it follows the episode schedule: none since October 29.",
      },
    ] as { title: string; body: string; client?: { title: string; body: string } }[],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "7 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Redirect the old addresses still landing on the 404 page",
        owner: "Figment",
        metric: "New users reaching the 404 page under 10 a week, against 26",
        body: "Use the Redirection plugin installed for the restore. Start with the 7 addresses with search history in the restore notes, led by /dental-office-upper-east-side/ and /endodontists-and-periodontics-midtown-office/, then /covid-19-precautions-and-preventions, /services/10/ridgepreservation and the /contact guesses. This no longer needs Johana.",
      },
      {
        action: "Settle the 2 doctor hubs",
        owner: "Figment",
        metric: "1 doctor hub in Search Console within 4 weeks",
        body: "/doctors/ and /our-doctors/ are both live and both ranking. If /our-doctors/ is retired, 301 it to /doctors/ and point the menu there. Check that /dental-service/endodontric-treatment/ redirects to the corrected address.",
      },
      {
        action: "Write titles and descriptions for the Our Doctors and digital dentistry pages",
        owner: "Figment",
        metric: "Our Doctors click rate above 3.7% and digital dentistry above 1 click a week, against 3.1% and 0",
        body: "Our Doctors took 8 clicks on 260 impressions at 4.67, 3.1%, up from 1.7% but short of the target; digital dentistry 0 clicks on 63 at 3.41. Carried from last week. Settle the doctor hubs first, so the title goes on the page that stays.",
      },
      {
        action: "Watch the restored articles in Search Console",
        owner: "Figment",
        metric: "Article clicks rising week on week from 9",
        body: "Read the Pages tab filtered to the restored addresses on November 18 and December 2, as planned. The high-traffic 4 are dry socket, failed gum graft, blew nose and how painful is a sinus lift; request indexing for any not yet showing. Get the doctor review of the Blew Nose aftercare section before it draws more traffic.",
      },
      {
        action: "Tag the email links and the EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Next campaign's clicks appearing as attributable sessions rather than direct",
        body: "GA4’s Constant Contact sessions this week, 6 from 1 active user, are most likely someone working in the Constant Contact app, so email traffic to the site is still unmeasured. Tag every link that points at the site before the next send, and route its booking links through Short.io. Seventh cycle asking.",
      },
      {
        action: "Clean the email list before the next send",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next campaign",
        body: "The last campaign, November 5, did not deliver 408 of 3,376, 12.1%, the fourth campaign in a row at about 12%. With no send this week there is time to verify the list first.",
      },
      {
        action: "Book the next podcast episode and cut excerpts from it",
        owner: "Figment",
        metric: "Downloads back above 40 a week",
        body: "Downloads were 11 with no episode since October 29, and Beyond the Plate has 28 in total. The November 10 excerpt drew 7 comments; reach per day was 339 against the 500 target. Ask Buzzsprout what the browser downloads were, now that they have stopped: 73, 20, 3 and 0 over 4 weeks.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Point the remaining old addresses at live pages",
        body: "Most old addresses now open the restored articles. A handful still show a missing page; redirecting each one sends those visitors somewhere useful.",
      },
      {
        action: "Bring the 2 doctor pages together",
        body: "The new Doctors section and the older Our Doctors page are both live. Keeping one gives Google a single page to rank.",
      },
      {
        action: "Follow the restored articles in Google",
        body: "The articles began appearing in Google results in their first week. We will follow their clicks over the next month.",
      },
      {
        action: "Add tracking to the email and short links",
        body: "Email traffic to the site cannot be measured yet. Adding tracking means the next campaign can be measured properly against the website.",
      },
      {
        action: "Review the email list before the next campaign",
        body: "Part of the list is no longer reaching people. Verifying the addresses protects delivery for everyone else and gives a clearer read on how the next campaign performs.",
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
          ["This week", "No campaign sent"],
          ["Most recent campaign", "November 5 · Veterans Day Email"],
          ["Sent / delivered", "3,376 / 2,968"],
          ["Confirmed opens", "298 · 10.0%"],
          ["All opens", "1,517 · 51.1% · includes 1,219 proxy"],
          ["Clicks", "25 · 0.8%"],
          ["Most-clicked link", "The Veterans Day nomination form · 23 people"],
          ["Previous campaign", "October 28 · End of Year Benefits · 36 clicks"],
        ],
        note:
          "No campaign went out November 9 – 15 (Walter, November 16). The November 5 figures are as read from the Reporting tab on November 9 and were not re-read this week. Rates are calculated on delivered mail. Confirmed open rates so far: 12.3% August 1, 11.8% October 19, 11.5% October 28 and 10.0% November 5. GA4 recorded 6 Constant Contact sessions this week, against 2, all from app.constantcontact.com with 1 active user and no new users: most likely 1 person working in the Constant Contact app, not email readers. The row is left out of the client website panel. Bounces 408 of 3,376 on November 5, 12.1%, carried in the internal sections rather than shown as a row.",
        noteClient:
          "Constant Contact. No campaign went out this week, so the figures shown are for the most recent campaign, the November 5 Veterans Day email, as reported last week. Rates are calculated on delivered mail rather than on sends. Confirmed opens, where someone actually opened the message, are the reliable figure; all opens also counts mail clients that load images automatically.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Homepage link", "58 · from 68"],
          ["Booking · Midtown", "17 · from 13"],
          ["Booking · Upper East Side", "14 · from 6"],
          ["Booking total", "31 · from 19"],
          ["Other named links", "8 · from 14"],
          ["Named links total", "97 · from 101"],
        ],
        note: "Short.io API pull, November 16, 7:53 AM: the Path view, All clicks, with the catch-all /* filtered out in the query. No /* row came back, and the 6 listed paths sum to 97, which is every click on the domain. Every week in the scoreboard trend was read the same morning: November 2 – 8 now reads homepage 68 against 67 and named total 101 against 100, booking unchanged at 19; October 12 – November 1 read exactly as on November 9. The 2 DDS-PC booking links on nycdentalsmileteam.short.gy took none in either week. Other named links: /OvWrQg 5, the YouTube video created November 6; /website, the Instagram bio link, 2; /ddspc 1; /qXg05i, the Veterans Day nomination form, 0 against 2. Human clicks 74 of 97, 76%, against 86 of 101. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. Every week shown was read on the same day, so the figures compare directly. The booking links are the most reliable figures here, because they are the ones a person reaches on purpose.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "306 · from 269"],
          ["New visitors", "252 · from 218"],
          ["Direct visits", "200 · from 172"],
          ["Direct visitors engaged", "14.5% · 7 seconds average · from 8.7% and 3 seconds"],
          ["Visits from Google search", "78 · from 83"],
          ["Google visitors engaged", "69.2% · 68 seconds average · from 60.2% and 57 seconds"],
          ["Visits from the Instagram bio link", "4 · from 1"],
          ["Busiest day", "November 12 · 68 new visitors"],
          ["Landing pages", "60 · from 46"],
          ["Homepage landings", "112 · from 116"],
          ["Doctor page landings", "18 · from 10 · includes the new Doctors pages"],
          ["Views of the restored articles", "86 · new this week"],
          ["Desktop / mobile", "77% / 23% · from 82% / 18%"],
        ],
        note:
          "GA4 Data API pull for the Dr Edgar El Chaar property, November 16, 7:53 AM, with our own traffic filtered out of every report and November 2 – 8 re-read in the same run: sessions 269 against the 270 reported and direct 172 against 173, everything else unchanged. New users on the 404 page 26 against 89 (28 views), the week the 43 articles went live at their old addresses; leave them out and new visitors read 226 against 129. The articles took 86 views across 29 titles, and 99 sessions landed on article addresses with 5 engaged. Doctor page landings are /doctors/ 8, 5 of its profiles 6 and /our-doctors/ 4, against /our-doctors/ 10 the week before; the new doctor titles took 86 views, the hub 47, and the Our Doctors page 17. Engaged-visit seconds are engagement time divided by sessions: direct 6.7, Google 67.8. Engagement time per active user 29.1 seconds against 27.6. Desktop and mobile shares are of active users. Landings count sessions that started on the page; the pull’s printout still shows the page views those sessions went on to make, 277 for the homepage. Landing pages are counted without (not set). Spam referrals are excluded.",
        noteClient:
          "At the start of the week we launched the new Doctors section and the rebuilt service pages, and restored 43 articles from the practice’s previous website. The articles took 86 views in their first days, and visits that began on a doctor page rose to 18 from 10. Visits from Google search averaged 68 seconds against 57, and 54 of the 78 engaged with the site.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Interactions", "59 · from 127"],
          ["Reach per day", "339 · from 388"],
          ["Engagement rate", "2.49% · from 4.68%"],
          ["Views", "7,341 · from 7,580"],
          ["Accounts engaged", "107 · from 183"],
          ["Followers", "3,362 · from 3,352"],
          ["Reels", "1 · 914 views · 539 reach · 43 interactions"],
          ["Feed posts", "3 · 1,255 views · 205 average reach · 16 interactions"],
          ["Reels, week before", "1 · 1,552 views · 977 reach · 84 interactions"],
          ["Feed posts, week before", "1 · 1,816 views · 665 reach · 43 interactions"],
          ["Stories", "15 · 2,354 impressions · 154 average reach · from 12, 1,494 and 120"],
          ["Published", "1 reel · 3 feed posts · 15 Stories"],
        ],
        note:
          "Metricool API pull for brand DDS PC, November 16, 7:53 AM, with November 2 – 8 re-read and restated in full the same morning. Account figures are window-scoped: 7,341 views covers every piece viewed during the week, against the 2,169 the 4 new pieces took (914 + 592 + 427 + 236). Story impressions are a different unit and are not added in. Engagement rate is interactions on posts and reels divided by daily reach summed over the week: 59 against 2,373 this week and 127 against 2,713 the week before. Interactions reconcile as 43 on the reel and 11, 4 and 1 on the posts; the week before as 84 on the November 6 reel and 43 on the November 4 carousel, all read today through the Metricool connector. The November 10 reel ran 54 seconds, held 39.7% of viewers past 3 seconds against 38.4% on the November 6 reel, and averaged 9.9 seconds watched of 54, 18.3%, against about 12 of 88, 13.7%, for the November 6 reel. Its 43 interactions are 33 likes, 7 comments and 3 shares, plus 1 repost not counted in interactions. Stories from the Metricool connector: 4 on November 10, 4 on November 11, 6 on November 13 and 1 on November 15. Followers: the account total rose 10, 3,352 to 3,362, while Metricool reports 12 gained and 6 lost. No paid promotion on Instagram in either week: every Metricool paid column is empty. Walter has not yet confirmed whether any other paid campaign ran.",
        noteClient:
          "Account totals come from Metricool’s account-level figures, the same source every week, which keeps the comparison between weeks consistent. Figures count what happened during the 7 days of the report, and the account’s views cover every piece viewed in the week, not only the pieces published in it. Engagement rate is interactions divided by the week’s total reach, meaning average daily reach multiplied by 7. Figures for the week before were read again this week and include responses that arrived after last week’s report. No paid promotion ran on Instagram in either week.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Average position", "8.24 · from 4.51 · US only"],
          ["Clicks", "58 · from 48"],
          ["Click rate", "5.33% · from 9.64%"],
          ["Impressions", "1,089 · from 498"],
          ["edgard el chaar", "position 1.65 · from 1.90 · 5 clicks"],
          ["dr edgard el chaar", "position 1.43 · from 1.57 · 2 clicks"],
          ["jonathan shiloah", "position 9.00 · 2 clicks"],
          ["dr cinzia dinoi", "position 5.00 · 1 click"],
          ["vitaliya sobol", "position 6.00 · 1 click"],
          ["dry socket with bone graft", "position 2.00 · 2 clicks"],
          ["Mobile", "30 clicks · 719 impressions · position 5.99 · all searches"],
          ["Desktop", "28 clicks · 359 impressions · position 14.11 · all searches"],
          ["Homepage", "31 clicks · 364 impressions · position 2.74"],
          ["Our Doctors", "8 clicks · 260 impressions · position 4.67"],
          ["Article: dry socket with bone graft", "5 clicks · 242 impressions · position 5.05"],
          ["Locations", "5 clicks · 223 impressions · position 2.94"],
          ["Doctors", "1 click · 100 impressions · position 6.08"],
          ["Restored articles", "9 clicks · 569 impressions · 7 of the 43 so far"],
        ],
        note:
          "Search Console API pull, November 16, 7:53 AM, with November 2 – 8 re-read the same morning: impressions 498 against the 496 reported, click rate 9.64% against 9.68%, US position 4.51 against 4.52, clicks unchanged at 48. Totals come from the daily rows, the Chart.csv figures, and the device split confirms them: 30 + 28 + 0 = 58 clicks on 719 + 359 + 11 = 1,089 impressions, tablets included. The headline position is weighted by impressions on the US-filtered daily rows, 51 clicks on 846 impressions; device and page positions cover all searches. Daily impressions 94, 104, 97, 135, 125, 253 and 281, Monday to Sunday; the last days can still rise. Page figures are per page and are not summed against the site total: the 7 restored articles with impressions took 569 and 9 clicks, the doctor pages 307 and 3. The query sample withholds 62% of clicks and 66% of impressions. el chaar hours drew 34 impressions at 1.50 and no clicks, most likely answered by the business listing in the results. Our Doctors 8 clicks on 260 impressions, 3.1%, against 6 on 354; digital dentistry 0 on 63 at 3.41. Name searches not shown as rows: edgar el chaar 1.71 from 1.14 with 4 clicks, dr el chaar 1.71 from 1.25 with 2 clicks; the doctor-name rows replace them.",
        noteClient:
          "Totals come from Search Console’s daily figures. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better. The new doctor pages and the restored articles began appearing in results this week, so the site showed up far more often. New pages usually enter further down the results than searches for the practice name, which is why the average position number is higher this week.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "11"],
          ["Through web browsers", "0 · from 3"],
          ["Through everything else", "11 · from 41"],
          ["The week before", "44"],
          ["Last 30 days", "245"],
          ["Last 90 days", "783"],
          ["Lifetime downloads", "5,850"],
          ["Episodes published", "52"],
          ["Most recent episode", "October 29 · Beyond the Plate · 28 downloads"],
          ["Previous episode", "September 30 · Biology Always Wins · 28 downloads"],
          ["New York share", "551 of 5,844 located downloads · 9.4%"],
        ],
        note:
          "This week’s 11 is lifetime downloads rising from 5,839 on November 9 to 5,850 on November 16, the same method as previous weeks. Buzzsprout’s app report agrees exactly: its cumulative total rose 5,833 to 5,844, also 11. Against the full per-agent snapshot kept on November 9 the split is exact: Spotify 5, Apple Podcasts 4, Unknown 1, Facebook 1, Web Browser 0. Browser downloads went 73, 20, 3 and 0 over the last 4 weeks. The per-episode Last 7 Days column sums to 18 because that window is offset from the report week. No new episode: 52 published, with Beyond the Plate (October 29) at 28 all time and 4 in the last 7 days. 30 and 90 days from the per-episode export, 245 and 783. New York 551 of 5,844 located downloads, from 551 of 5,833. The new per-agent snapshot is in the cycle ledger.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. This week’s figure is the change in the lifetime total between 2 readings a week apart. The 30 and 90 day figures are summed from Buzzsprout’s episode report, the same source every week, and can differ a little from its dashboard. Buzzsprout also splits downloads by the software that requested them; that split varies a lot from week to week, so it is shown here rather than relied on. The most recent episode, Beyond the Plate, went out October 29.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "November 9 to 15, 2026, 7 full days, Monday to Sunday, compared with November 2 to 8. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from October 12 to 18 through this week. Earlier weeks are shown as first reported, the week before as read again this week, and every short link week as read on November 16. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Instagram, search, website and short link figures for November 2 to 8 were read again on November 16. Instagram posts keep gathering responses for days after they go out, which moved last week’s interactions from 115 to 127 and views from 7,553 to 7,580. Search appearances moved from 496 to 498 and website sessions from 270 to 269. The homepage short link reads 68 rather than 67. Podcast downloads are not read again, because they are measured as the change in a lifetime counter between 2 readings." },
          { q: "Why Instagram shows different view counts than this report", a: "Every Instagram figure here comes from Metricool, the same source every week, which is what makes the week-to-week comparisons hold. Instagram's own app reports its own totals and they do not match: on November 2 the October 28 reel read 12.6K in the app against 11.32K in Metricool. 2 things cause that. The report’s account figures count what happened inside the 7 days, while the app counts everything since a piece went up, so the app climbs away from the report over time. Beyond that the 2 platforms count a view differently, and neither publishes how. The report stays with Metricool rather than mixing sources." },
          { q: "How engagement rate is calculated", a: "Interactions divided by the week’s total reach, meaning the share of people who saw something and responded to it. Total reach is the average daily reach multiplied by 7, so it will not match interactions divided by the daily figure shown on the scoreboard. It is not calculated against follower count, which would make it look higher than it is." },
          { q: "What counts as an engaged visit", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action." },
          { q: "How email open and click rates are calculated", a: "On mail that was delivered, not on the number sent, because the 2 differ whenever part of a list no longer reaches people. Opens are reported twice. A confirmed open means someone opened the message. Most mail clients now load images automatically, which registers as an open whether or not anyone read it, and those are counted separately as proxy opens. The confirmed figure is the one to work from." },
          { q: "How search position is calculated", a: "Averaged across the week’s US searches, weighted by how often the site appeared each day. Lower is better: a position of 1 is the top result. When new pages begin to appear in results they usually enter further down, which can raise the average position number in the same week that appearances and clicks rise." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links. Clicks on addresses that are not one of the practice’s links are left out. Short.io can revise its counts for earlier weeks, so every week in the trend is read on the same day. The booking and homepage links existed in all 5 weeks and compare directly." },
          { q: "What is not in this report", a: "No paid promotion ran on Instagram in either week, and no email campaign went out this week. Facebook figures are not reported because Meta retired the metric behind post views in June 2026." },
        ],
        note: "Every figure in this report is carried from a source pull or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
