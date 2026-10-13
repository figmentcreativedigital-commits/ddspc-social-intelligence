/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers October 5 – 11 against September 28 – October 4.

   STRUCTURE CHANGED THIS CYCLE. page.tsx is now server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Every trend value is the
     most recent reading of that week's export.

   COMPARISON COLUMN RESTATED. September 28 – October 4 comes from exports
     re-pulled on October 12: Instagram views 8,526 and 224 interactions,
     search 65 clicks and 582 impressions, website 368 sessions and 290 new
     visitors, Google 103.

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Oct 5 – 11 and Sep 28 – Oct 4, pulled Oct 12
     Search Console                   Oct 5 – 11 and Sep 28 – Oct 4, pulled Oct 12
     Website (GA4 via Looker Studio)  both weeks, pulled Oct 12
     Website sessions and engagement  native GA4 traffic acquisition, both weeks,
                                      pulled Oct 12
     Short links (Short.io)           Oct 5 – 11 and Sep 28 – Oct 4, pulled Oct 12;
                                      Clicks by All, path filter excluding /*
     Podcast (Buzzsprout)             trailing windows and app split, pulled Oct 12
                                      and Oct 5
     Email (Constant Contact)         no campaign sent Sep 28 – Oct 11
     Trend history                    Sep 7 – 13 from the Sep 21 pulls; Sep 14 – 20
                                      from the Sep 28 pulls; Sep 21 – 27 from the
                                      Oct 5 pulls; later weeks as above
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
  { id: "learned", label: "What we learned" },
  { id: "moves", label: "Next moves", internalOnly: true },
  { id: "plan", label: "The plan" },
  { id: "detail", label: "Detail" },
];

export const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
export const has = (id: string) => NAV.some((n) => n.id === id);

export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "October 5 – 11, 2026",
  compared: "Compared with September 28 – October 4",
  context: "October 5 – 11, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "October 5 – 11, 2026" },
    { k: "Compared with", v: "September 28 – October 4, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
    { k: "Content published", v: "9 pieces" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in 4 points.",
    items: [
      {
        role: "Headline",
        text: "The podcast guest clip led Instagram, reaching 1,362 accounts. Reach per day was 363, against 527 in the week the podcast returned; without last week’s launch reel, interactions rose from 65 to 118. Direct website visits rose to 336, at 6.2% engaged and 2 seconds on average. Average search position moved to 6.77, with searches for the doctor’s name placing the site lower.",
        client: {
          role: "Headline",
          text: "A clip from the podcast’s new guest episode was the strongest piece of the week, reaching 1,362 people. Visitors from Google spent 80 seconds on the site on average, up from 64.",
        },
      },
      {
        role: "What improved",
        text: "Instagram interactions without last week’s launch reel: 118 against 65. The guest clip drew 77 on its own. Google visitors 68.3% engaged at 80 seconds, against 72.8% and 64. Podcast listening apps added 13 downloads, against 11. Homepage link clicks 106 to 126.",
        client: {
          role: "What improved",
          text: "Visitors from Google stayed longer, 80 seconds on average against 64. The guest clip reached 1,362 people, more than twice the next piece. Clicks on the homepage link rose from 106 to 126.",
        },
      },
      {
        role: "What softened",
        text: "Search clicks 65 to 58 and impressions 582 to 516. US position 4.74 to 6.77: edgard el chaar sits at 22.23 against 1.28, dr el chaar at 19.71 against 6.95, and desktop at 9.69. Visits from Google 103 to 82. Direct visits 215 to 336, with 21 engaged; new users reaching the 404 page 117 to 179. Booking link clicks 37 to 26.",
        client: {
          role: "What we are monitoring",
          text: "The site appeared lower in Google results this week, at an average position of 6.77 against 4.74, mostly when people searched for Dr. El Chaar by name. Visits from Google search were 82 against 103, and clicks on the booking links 26 against 37.",
        },
      },
      {
        role: "Next action",
        text: "Search Google for the doctor’s name and see what now ranks above the site. Apply the GA4 filter for direct traffic, now in its fourth week. Take test-service down. Check how Buzzsprout counts the web-browser downloads before reporting them as listeners.",
        client: {
          role: "What we are doing next",
          text: "We are checking how the site appears when people search for Dr. El Chaar by name, and we will keep a weekly mix of reels, Stories and feed posts.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New visitors to the website each day, this week and the week before.",
    bandA: "Previous week · Sep 28 – Oct 4",
    bandB: "This week · Oct 5 – 11",
    /* GA4 daily new visitors, Looker Studio time series pulled Oct 12 for both
       weeks. `shade` marks the previous week. Oct 4 reads 46 in this pull
       against 40 in the report deployed Oct 5. */
    daily: [
      { d: "Sep 28", v: 36, shade: true },
      { d: "Sep 29", v: 34, shade: true },
      { d: "Sep 30", v: 58, shade: true },
      { d: "Oct 1", v: 33, shade: true },
      { d: "Oct 2", v: 37, shade: true },
      { d: "Oct 3", v: 46, shade: true },
      { d: "Oct 4", v: 46, shade: true },
      { d: "Oct 5", v: 40 },
      { d: "Oct 6", v: 94 },
      { d: "Oct 7", v: 73 },
      { d: "Oct 8", v: 72 },
      { d: "Oct 9", v: 59 },
      { d: "Oct 10", v: 31 },
      { d: "Oct 11", v: 22 },
    ],
    note:
      "391 new visitors against 290. Tuesday to Friday ran 59 to 94, then 31 and 22 at the weekend. Sessions rose from 368 to 462: direct 215 to 336, while Google fell from 103 to 82. New users who reached the 404 page rose from 117 to 179, and landing pages from 49 to 76.",
    noteClient:
      "391 new visitors this week against 290. Most of the increase came through very short direct visits, shown in the next section, which we do not count as audience growth.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* Native GA4 traffic acquisition, Oct 5 – 11. Other sources combines 11
       sources with 28 sessions and 8 engaged; its average time is weighted by
       sessions: (13×29.3 + 4×39 + 2×104.5 + 2×0 + 16 + 37 + 237 + 41 + 38 + 0 + 7) ÷ 28. */
    rows: [
      { label: "Direct", sessions: 336, engaged: 21, seconds: 2 },
      { label: "Google search", sessions: 82, engaged: 56, seconds: 80 },
      { label: "aocr.org", sessions: 16, engaged: 0, seconds: 0 },
      { label: "Other sources", sessions: 28, engaged: 8, seconds: 40 },
    ],
    note:
      "Direct 336 sessions with 21 engaged, 6.2%, averaging 2.0 seconds, against 215, 31 and 6.1 seconds the week before. aocr.org 16 with none engaged, against 24 and 1. Google 82 at 68.3% engaged and 80 seconds, against 103, 72.8% and 64. Other sources: 11 sources, 28 sessions, 8 engaged; 4 of the sessions came from a Constant Contact landing page.",
    noteClient:
      "Google search sent 82 visits, and 56 of them engaged with the site. Direct visits were the largest group at 336, and most lasted only a few seconds, so we do not count them as audience growth.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Sep 7", "Sep 14", "Sep 21", "Sep 28", "Oct 5"],
    cols: [
      { label: "This week", sub: "Oct 5 – 11" },
      { label: "Previous week", sub: "Sep 28 – Oct 4" },
    ],
    rows: [
      {
        k: "Instagram views",
        note: "Across reels, posts and Stories",
        group: "Instagram", fmt: "int",
        trend: [2567, 3208, 5527, 8526, 6619],
        cells: [{ v: "6,619", c: "−22.4%", dir: "down" }, { v: "8,526", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day. The week before included the podcast launch",
        group: "Instagram", fmt: "int",
        trend: [75, 92, 214, 527, 363],
        cells: [{ v: "363", c: "−31.1%", dir: "down" }, { v: "527", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Without last week’s podcast launch reel, 118 against 65",
        group: "Instagram", fmt: "int",
        trend: [16, 24, 103, 224, 118],
        cells: [{ v: "118", c: "−47.3%", dir: "down" }, { v: "224", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach",
        group: "Instagram", fmt: "pct",
        trend: [3.05, 3.73, 6.88, 6.07, 4.64],
        cells: [{ v: "4.64%", c: "−1.43 points", dir: "down" }, { v: "6.07%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Metricool’s account total at the end of each week",
        group: "Instagram", fmt: "int",
        trend: [3219, 3221, 3235, 3251, 3257],
        cells: [{ v: "3,257", c: "+6", dir: "up" }, { v: "3,251", c: "+16", dir: "flat" }],
      },
      {
        k: "Content published",
        note: "2 reels and 7 Stories, against 3 reels, 1 post and 12 Stories",
        group: "Instagram", fmt: "int",
        trend: [5, 7, 10, 16, 9],
        cells: [{ v: "9", c: "−7", dir: "flat" }, { v: "16", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 15 and Upper East Side 11, against 22 and 15",
        group: "Booking links", fmt: "int",
        trend: [20, 32, 22, 37, 26],
        cells: [{ v: "26", c: "−29.7%", dir: "down" }, { v: "37", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        group: "Booking links", fmt: "int",
        trend: [126, 144, 99, 106, 126],
        cells: [{ v: "126", c: "+18.9%", dir: "up" }, { v: "106", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "Clicks from Google search results",
        group: "Search", fmt: "int",
        trend: [68, 55, 52, 65, 58],
        cells: [{ v: "58", c: "−10.8%", dir: "down" }, { v: "65", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        group: "Search", fmt: "int",
        trend: [691, 448, 455, 582, 516],
        cells: [{ v: "516", c: "−11.3%", dir: "down" }, { v: "582", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        group: "Search", fmt: "pct",
        trend: [9.84, 12.28, 11.43, 11.17, 11.24],
        cells: [{ v: "11.24%", c: "+0.07 points", dir: "up" }, { v: "11.17%", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "US searches only. Lower is better",
        group: "Search", fmt: "pos",
        trend: [3.72, 4.16, 5.19, 4.74, 6.77],
        cells: [{ v: "6.77", c: "from 4.74", dir: "down" }, { v: "4.74", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "68% of these visits engaged, against 73%. They averaged 80 seconds on the site, against 64",
        group: "Website", fmt: "int",
        trend: [97, 91, 81, 103, 82],
        cells: [{ v: "82", c: "−20.4%", dir: "down" }, { v: "103", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "Much of the increase came through very short direct visits, which are not counted as audience growth",
        group: "Website", fmt: "int",
        trend: [311, 434, 199, 290, 391],
        cells: [{ v: "391", c: "+34.8%", dir: "flat" }, { v: "290", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "Most came through web browsers. Listening apps added 13, against 11",
        group: "Podcast", fmt: "int",
        trend: [24, 11, 69, 177],
        cells: [{ v: "177", c: "+156.5%", dir: "up" }, { v: "69", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The Mélissa M. Seif clip led the week: 1,948 views, 1,362 reach and 77 of the week’s 118 interactions. The Hudson Yards recap drew the other 41.",
    ledeClient: "The best-performing content this week was a clip from the podcast’s new guest episode.",
    hero: {
      url: "https://www.instagram.com/reel/DeKnInABr2V/",
      title: "Why are we adapting biology to fit the implant?",
      date: "October 6",
      format: "Reel",
      stats: [
        { v: "1,948", l: "Views" },
        { v: "1,362", l: "Reach" },
        { v: "77", l: "Interactions" },
        { v: "5.7%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the week. It reached 1,362 accounts, more than twice the Hudson Yards recap, and drew 77 of the week’s 118 interactions: 58 likes, 13 shares, 4 comments and 2 saves. It was also reposted 9 times.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/reel/DeR44iuznAt/",
        title: "A few more moments from a day well spent at Hudson Yards",
        date: "October 9", format: "Reel", views: 980, reach: 607, interactions: 41,
      },
    ],
    galleryNote:
      "The other reel published October 5 – 11. 7 Stories complete the 9 pieces; no feed post went out this week. A post shared with NYC Dental Smiles on October 8, about the Hudson Yards event, drew 29 likes and 12 shares. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for October 5 – 11 from the Metricool export, in the
     social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "Instagram reached an average of 363 accounts a day, against 527 in the week the podcast returned, and views totaled 6,619. The account added 6 followers.",
      "The podcast continued to lead. A clip from the new episode, with guest Mélissa M. Seif, drew 1,948 views, reached 1,362 accounts and generated 77 interactions. The Hudson Yards recap reel reached 607 accounts.",
      "Engagement rate was 4.64% against 6.07%. Leaving aside last week’s podcast launch reel, interactions rose from 65 to 118.",
    ],
    takeaway:
      "The podcast is giving the account its widest reach, and the Hudson Yards event gave us good material for the week. We’ll continue the weekly mix of reels, Stories and patient-focused posts.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "6 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Real gap",
        title: "The site placed lower for the doctor’s own name",
        body:
          "edgard el chaar: position 22.23 on 22 impressions, against 1.28 on 39 the week before. dr el chaar: 19.71 on 38, against 6.95 on 21. edgar el chaar and dr edgard el chaar held near 1.5 and drew 12 of the 58 clicks. The homepage sits at 6.1 against 3.76, desktop at 9.69 against 5.69. A search for the name in a private browser window will show what now ranks above the site.",
      },
      {
        tag: "Real gap",
        title: "Low-engagement direct traffic, fourth week",
        body:
          "Direct 336 sessions, 21 engaged, 2.0 seconds on average. The weeks before: 215 at 14.4%, 158 at 16.5%, 380 at 9.2%. New users reaching the 404 page rose from 117 to 179, landing pages from 49 to 76, and /dental-service/test-service is back with 5 landing views. The GA4 filter recommendation from last week stands.",
      },
      {
        tag: "Measurement",
        title: "Podcast downloads rose through web browsers",
        body:
          "Lifetime downloads rose 177, from 5,353 to 5,530. Buzzsprout’s app report puts 164 of the rise on Web Browser; Apple Podcasts, Spotify and other apps added 13, against 11 the week before. The new episode has 17 in total. The rise is spread across the catalog at 7 or 8 per episode, and 63 of the new located downloads have no city. Worth checking with Buzzsprout before the total is reported as listeners.",
      },
      {
        tag: "Note",
        title: "Last week restated after the re-pull",
        body:
          "Instagram views 8,526 against 8,512 as deployed, interactions 224 against 202, and the podcast launch reel 3,351 views, 2,019 reach and 159 interactions against 3,178, 1,951 and 144. Followers acquired now reads 18, so new minus lost matches the gain of 16. Search 65 clicks and 582 impressions against 63 and 559, position 4.74 against 4.85. Website 368 sessions against 373, Google 103 against 100, new visitors 290 against 284.",
      },
      {
        tag: "Note",
        title: "Instagram followers disagree again",
        body:
          "The account total rose by 6, from 3,251 to 3,257, while new minus lost is 5: 12 acquired and 7 lost. This report uses the account total, as before. 1 of the 7 Stories shows 0 impressions with taps recorded, so its data has not arrived.",
      },
      {
        tag: "Note",
        title: "Booking clicks fell while homepage clicks rose",
        body:
          "Booking 26 against 37: Midtown 15 and Upper East Side 11, against 22 and 15. Homepage 126 against 106; domain total 152 against 149. /ddspc and /jK1aSN drew no clicks. With the full city list now printed, Council Bluffs, Ashburn, Santa Clara, Brussels, Singapore, Amsterdam, Frankfurt and Hong Kong account for 78 of 152 clicks, about 51%, against 73 of 149, about 49%, on the same list last week. Last week’s report used only the top 7 cities and gave about 40%. 84 of 152 clicks are from the US.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "4 things worth carrying into the next report.",
    items: [
      {
        title: "The guest clip reached the most people",
        body: "1,362 reach and 77 interactions for the Mélissa M. Seif clip, against 607 and 41 for the Hudson Yards recap.",
        client: {
          title: "The podcast guest clip reached the most people",
          body: "The clip of Mélissa M. Seif reached 1,362 people, more than any other piece this week.",
        },
      },
      {
        title: "Last week’s launch reel kept growing",
        body: "The podcast launch reel reads 2,019 reach and 159 interactions a week later, against 1,951 and 144 when first reported.",
        client: {
          title: "Last week’s podcast reel kept growing",
          body: "The reel announcing the new episode has now reached 2,019 people, up from 1,951 when we first reported it.",
        },
      },
      {
        title: "Google visitors stayed longer",
        body: "80 seconds on average against 64, at 68.3% engaged. Visits from Google fell from 103 to 82 in the same week.",
        client: {
          title: "Visitors from Google stayed longer",
          body: "Visitors from Google search spent 80 seconds on the site on average, against 64 the week before.",
        },
      },
      {
        title: "Search position moved with the branded queries",
        body: "US position 6.77 against 4.74. The 2 queries that moved, edgard el chaar and dr el chaar, carry 60 of the 516 impressions. Clicks held at 58 against 65.",
        client: {
          title: "The site appeared lower in Google results",
          body: "The average position moved from 4.74 to 6.77, mostly on searches for Dr. El Chaar by name. Clicks held close to last week, 58 against 65.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Check what ranks above the site for the doctor’s name",
        owner: "Figment",
        metric: "edgard el chaar and dr el chaar back near position 1 to 2",
        body: "edgard el chaar moved from 1.28 to 22.23 and dr el chaar from 6.95 to 19.71. Search both in a private window, note what ranks above the site, and check Search Console’s page indexing report for the homepage.",
      },
      {
        action: "Apply the GA4 filter for low-engagement direct traffic",
        owner: "Figment",
        metric: "Direct engagement rate and session totals with the filter applied",
        body: "Fourth week: 6.2% engaged and 2.0 seconds this week. New users reaching the 404 page rose to 179. Check GA4’s Tech and Geography reports for direct and aocr.org traffic first.",
      },
      {
        action: "Ask Buzzsprout about the web-browser downloads",
        owner: "Figment",
        metric: "A clear count of listening-app downloads for the weekly report",
        body: "164 of 177 new downloads came through Web Browser, spread across the catalog. Listening apps added 13.",
      },
      {
        action: "Take down /dental-service/test-service",
        owner: "Figment",
        metric: "0 landing views on the path next week",
        body: "It dropped out of the data last week and is back with 5 landing views.",
      },
      {
        action: "Tag the 5 EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Booking clicks that carry UTM parameters in Short.io’s UTM Medium report",
        body: "The datacenter share of clicks moves week to week, so totals compare unevenly. A UTM filter isolates real clicks directly.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Check how the site appears in searches for Dr. El Chaar",
        body: "The site appeared lower in Google results this week when people searched for Dr. El Chaar by name. We are looking at what changed.",
      },
      {
        action: "Keep a weekly mix of reels, Stories and feed posts",
        body: "This week brought 2 reels and 7 Stories. We will balance the podcast and event content with posts about the doctors and their patients.",
      },
    ],
  },

  /* ---------------------------------------------------------------- DETAIL */
  detail: {
    lede: "The figures behind the report, and how each was measured.",
    panels: [
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Views", "6,619 · from 8,526"],
          ["Reach per day", "363 · from 527"],
          ["Accounts engaged", "164 · from 239"],
          ["Interactions", "118 · all on reels · from 224"],
          ["Engagement rate", "4.64% · from 6.07%"],
          ["Followers", "3,257 · up 6 · from 3,251"],
          ["Reels", "2 · 2,928 views · 985 average reach · 118 interactions"],
          ["Reels, week before", "3 · 4,584 views · 930 average reach · 214 interactions"],
          ["Feed posts", "0 · from 1"],
          ["Stories", "7 · 509 impressions · 70 average reach · from 12, 1,074 and 87"],
          ["Published", "2 reels · 7 Stories · 1 shared post"],
        ],
        note:
          "Account totals are Metricool’s account-level figures. Engagement rate is interactions on posts and reels divided by average reach per day times 7: 118 against 2,541 this week and 224 against 3,689 the week before. The week before is restated from the October 12 pull. Without the podcast launch reel, last week’s interactions were 65. Followers: account total up 6, new minus lost 5; this report uses the account total. 1 Story shows 0 impressions with taps recorded. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures. Engagement rate is interactions divided by reach. Figures for the week before were re-read this week and include engagement that arrived after last week’s report. No advertising ran in either week.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Booking · Midtown", "15 · from 22"],
          ["Booking · Upper East Side", "11 · from 15"],
          ["Booking total", "26 · from 37"],
          ["Homepage link", "126 · from 106"],
          ["/ddspc", "0 · from 4"],
          ["/jK1aSN", "0 · from 2"],
          ["Domain total", "152 · from 149"],
        ],
        note: "Clicks by All, excluding the catch-all path /*, which collects automated requests. Short.io’s own comparison confirms the week before at 149. A country filter was not applied: 84 of 152 clicks are from the US. The named datacenter cities account for about 51% of this week’s clicks and about 49% of last week’s, counted on the full city list. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. Some clicks come from automated traffic.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "58 · from 65"],
          ["Impressions", "516 · from 582"],
          ["Click rate", "11.24% · from 11.17%"],
          ["Average position", "6.77 · from 4.74 · US only"],
          ["Desktop", "28 clicks · 222 impressions · position 9.69 · all searches"],
          ["Mobile", "28 clicks · 291 impressions · position 4.47 · all searches"],
          ["Homepage", "38 clicks · 394 impressions · position 6.1"],
          ["Locations", "13 clicks · 200 impressions · position 3.36"],
          ["Our Doctors", "8 clicks · 282 impressions · position 5.05"],
          ["Dental Services", "1 click · 121 impressions · position 2.65"],
          ["About", "0 clicks · 136 impressions · position 2.84"],
        ],
        note:
          "Totals come from Search Console’s daily export. The headline average position is weighted by impressions and filtered to US searches; device positions cover all searches. Tablets drew 2 clicks on 3 impressions. September 28 – October 4 restated on October 12 to 65 clicks, 582 impressions and position 4.74.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["New visitors", "391 · from 290"],
          ["Sessions", "462 · from 368"],
          ["Visits from Google search", "82 · from 103"],
          ["Direct visits", "336 · from 215"],
          ["Google visitors engaged", "68.3% · 80 seconds average · from 72.8% and 64 seconds"],
          ["Direct visitors engaged", "6.2% · 2.0 seconds average · from 14.4% and 6.1 seconds"],
          ["Visits from aocr.org", "16 · from 24"],
          ["Visits from Constant Contact", "4 · none the week before"],
          ["Landing pages", "76 · from 49"],
          ["Homepage landings", "253 · from 320"],
          ["Our Doctors landings", "63 · from 34"],
          ["Desktop / mobile", "88% / 11% · from 81% / 19%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property; Looker Studio matches it at 462 and 368. New visitors, landing pages, devices and page titles come from Looker Studio. September 28 – October 4 restated on October 12: 368 sessions against 373, 290 new visitors against 284, Google 103 against 100. Landing pages are counted without blank and (not set) rows. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of website interest, at 82 against 103. Much of the rest of the increase in visitors came through very short direct visits, which are not counted as audience growth.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["This week", "No campaign sent"],
          ["Previous week", "No campaign sent"],
        ],
        note: "No campaign went to the EEC list September 28 – October 11. The most recent, RH 2.0, went September 12. GA4 shows 4 sessions this week arriving from a Constant Contact landing page.",
        noteClient: "No email campaign was sent this week or the week before. The most recent was sent September 12.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "177"],
          ["Through listening apps", "13 · from 11"],
          ["Through web browsers", "164 · from 58"],
          ["The week before", "69"],
          ["Last 30 days", "322"],
          ["Last 90 days", "697"],
          ["Lifetime downloads", "5,530"],
          ["Episodes published", "51"],
          ["Most recent episode", "September 30 · Biology Always Wins · 17 downloads"],
          ["New York share", "521 of 5,524 located downloads · 9.4%"],
        ],
        note:
          "This week’s 177 is lifetime downloads rising from 5,353 on October 5 to 5,530 on October 12, the same method as previous weeks. The split by app comes from Buzzsprout’s app report, which counts located downloads: Web Browser rose 164 and every other app 13, against 58 and 11 the week before. 30 and 90 days come from the per-episode export, 322 and 697; Buzzsprout’s dashboard read 176 for 7 days, 290 for 30 and 671 for 90, with lifetime at 5,532, later the same morning.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. Most of this week’s downloads came through web browsers; listening apps such as Apple Podcasts and Spotify added 13.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "October 5 to 11, 2026, 7 full days, Monday to Sunday, compared with September 28 to October 4. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from September 7 to 13 through this week, using the most recent reading of each week. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Every figure for September 28 to October 4 was read again this week. Instagram posts keep gathering views for days after they are published, and search and website figures settle for several days, so this report uses the newer readings." },
          { q: "How engagement rate is calculated", a: "Interactions divided by reach, meaning the share of people who saw something and responded to it. It is not calculated against follower count, which would make the figure look higher than it is." },
          { q: "What counts as an engaged visit", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No advertising ran in either week. No email was sent in either week." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
