/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles.
   Edit the figures and narrative strings below; never edit page.tsx.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers September 28 – October 4 against September 21 – 27:
     two 7-day windows, directly comparable. Column pairing lives in
     `scoreboard.cols`.

   COMPARISON COLUMN RESTATED. September 21 – 27 comes from exports re-pulled
     on October 5. Instagram moved most: interactions 54 to 103, engagement
     rate 3.62% to 6.88%, and the September 26 reel overtook the September 23
     reel that last week’s report named as the strongest piece. Website: 199
     new visitors against 196. Search, Short.io and GA4 sessions unchanged.

   SOCIAL — drafted by Figment from the Metricool export, in the social team’s
     voice. The social lead’s recap follows this first draft; replace it then
     and re-check any figure it changes.

   ENCODING — this file uses literal characters for apostrophes, dashes and
     the minus sign. No \u escapes. Keep it that way: mixing the two is what
     made string edits fail silently in earlier cycles.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Sep 28 – Oct 4 and Sep 21 – 27, pulled Oct 5
     Search Console                   Sep 28 – Oct 4 and Sep 21 – 27, pulled Oct 5
     Website (GA4 via Looker Studio)  Sep 28 – Oct 4 and Sep 21 – 27, pulled Oct 5;
                                      new visitors, landing pages, devices, page titles
     Website sessions by source and   Sep 28 – Oct 4 and Sep 21 – 27, native GA4
       engagement (GA4)               traffic acquisition export, pulled Oct 5
     Short links (Short.io)           Sep 28 – Oct 4, pulled Oct 5, path filter
                                      excluding /*; Sep 21 – 27 confirmed by
                                      Short.io’s own comparison (149, +21.14%)
     Podcast (Buzzsprout)             trailing windows, pulled Oct 5 and Sep 28
     Email (Constant Contact)         no campaign sent Sep 21 – Oct 4
   ========================================================================== */

type Variant = "client" | "internal";
export const VARIANT: Variant =
  process.env.NEXT_PUBLIC_REPORT_VARIANT === "internal" ? "internal" : "client";
export const IS_INTERNAL: boolean = VARIANT === "internal";

type SectionDef = { id: string; label: string; internalOnly?: boolean; clientOnly?: boolean };

export const ALL_SECTIONS: SectionDef[] = [
  { id: "brief", label: "The brief" },
  { id: "period", label: "The period" },
  { id: "scoreboard", label: "Scoreboard" },
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
  period: "September 28 – October 4, 2026",
  context: "September 28 – October 4, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "September 28 – October 4, 2026" },
    { k: "Compared with", v: "September 21 – 27, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
    { k: "Content published", v: "16 pieces" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in 4 points.",
    items: [
      {
        role: "Headline",
        text: "The podcast published its first episode since July 27, and the reel announcing it drew 3,178 views and 144 of the week’s 202 Instagram interactions. Instagram views rose 54% and reach per day more than doubled. Booking link clicks rose from 22 to 37, search clicks from 52 to 63, and visits from Google from 81 to 100. Direct website visits averaged 6 seconds, the third low-engagement week in a row.",
        client: {
          role: "Headline",
          text: "The podcast returned with a new episode, and the reel announcing it was the most-viewed piece of the week. Instagram views rose 54%, clicks on the booking links rose from 22 to 37, and visits from Google search rose from 81 to 100.",
        },
      },
      {
        role: "What improved",
        text: "Booking link clicks 22 to 37: Midtown 12 to 22, Upper East Side 10 to 15, with the datacenter share of short link clicks down to about 40% from about 53%. Search clicks 52 to 63 and impressions 455 to 559; US position 5.19 to 4.85, with desktop back from 7.87 to 5.69. Visits from Google 81 to 100, 68.0% engaged, averaging 64 seconds against 40. Podcast downloads 11 to 69; the new episode accounts for 9.",
        client: {
          role: "What improved",
          text: "Clicks on the booking links rose from 22 to 37. Visits from Google search rose from 81 to 100, and those visitors stayed longer, 64 seconds on average against 40. The site also moved up in Google results, to an average position of 4.85 from 5.19.",
        },
      },
      {
        role: "What softened",
        text: "Instagram engagement rate 6.88% to 5.49%. The comparison week had 8 days to settle; this week’s newest pieces were 1 to 4 days old at the pull, and last week the September 26 reel gained 44 interactions between readings. Without the podcast reel, interactions were 58 against 103. Stories averaged 55 reach against 173; 4 of 12 have no data yet, and the 8 with data average 83. Direct visits 158 to 212 at 14.2% engaged, plus 22 sessions from aocr.org averaging 1.3 seconds.",
        client: {
          role: "What we are monitoring",
          text: "Stories reached fewer people each than the week before: 83 on average for those with complete data, against 173. The week’s newest posts are still gathering views; last week’s figures rose after our first reading.",
        },
      },
      {
        role: "Next action",
        text: "Add a GA4 filter for the low-engagement direct traffic, now 3 weeks running. Tag the 5 EEC short links with UTM parameters. Identify /ddspc and the new /jK1aSN. Read Instagram a second time before naming the strongest piece.",
        client: {
          role: "What we are doing next",
          text: "We will keep content about the doctors and their patients at the center, with a weekly mix of reels, Stories and feed posts.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New website visitors each day across both weeks.",
    bandA: "Previous week · Sep 21 – 27",
    bandB: "This week · Sep 28 – Oct 4",
    /* GA4 daily new visitors, Looker Studio time series pulled Oct 5 for both
       weeks. `shade` marks the previous week. Sep 27 reads 18 in this pull
       against 15 in the report deployed Sep 28. */
    daily: [
      { d: "Sep 21", v: 60, shade: true },
      { d: "Sep 22", v: 33, shade: true },
      { d: "Sep 23", v: 39, shade: true },
      { d: "Sep 24", v: 15, shade: true },
      { d: "Sep 25", v: 21, shade: true },
      { d: "Sep 26", v: 13, shade: true },
      { d: "Sep 27", v: 18, shade: true },
      { d: "Sep 28", v: 36 },
      { d: "Sep 29", v: 34 },
      { d: "Sep 30", v: 58 },
      { d: "Oct 1", v: 33 },
      { d: "Oct 2", v: 37 },
      { d: "Oct 3", v: 46 },
      { d: "Oct 4", v: 40 },
    ],
    note:
      "284 new visitors this week against 199. Every day ran 33 to 58, against 13 to 21 over the last 4 days of the week before. Sessions rose from 257 to 373: direct 158 to 212, Google 81 to 100, and aocr.org 2 to 22. Direct visits averaged 6.0 seconds with 14.2% engaged, against 15.2 seconds and 16.5%; aocr.org visits averaged 1.3 seconds. New users who reached the site’s 404 page rose from 46 to 114. Google visitors were 68.0% engaged and averaged 64 seconds, against 64.2% and 40.",
    noteClient:
      "284 new visitors this week against 199. Visits from Google search rose from 81 to 100, and those visitors stayed longer, 64 seconds on average against 40. Much of the rest of the increase came through very short direct visits, which we do not count as new audience.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "15 measures, this week against the week before. Both weeks are 7 days, so every comparison is direct.",
    cols: [
      { label: "This week", sub: "Sep 28 – Oct 4" },
      { label: "Previous week", sub: "Sep 21 – 27" },
    ],
    rows: [
      {
        k: "Instagram views",
        note: "Across reels, posts and Stories",
        cells: [{ v: "8,512", c: "+54.0%", dir: "up" }, { v: "5,527", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average number of accounts reached each day",
        cells: [{ v: "526", c: "+145.8%", dir: "up" }, { v: "214", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "144 came from the reel announcing the new podcast episode. Without it, 58 against 103",
        cells: [{ v: "202", c: "+96.1%", dir: "up" }, { v: "103", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach. This week’s newest posts are still gathering engagement; last week’s figures rose after our first reading",
        cells: [{ v: "5.49%", c: "−1.39 points", dir: "down" }, { v: "6.88%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Metricool’s account total for the end of each week",
        cells: [{ v: "3,251", c: "+16", dir: "up" }, { v: "3,235", c: "+14", dir: "up" }],
      },
      {
        k: "Content published",
        note: "3 reels, 1 post and 12 Stories, against 2 reels and 8 Stories",
        cells: [{ v: "16", c: "+6", dir: "flat" }, { v: "10", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 22 and Upper East Side 15, against 12 and 10",
        cells: [{ v: "37", c: "+68.2%", dir: "up" }, { v: "22", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        cells: [{ v: "106", c: "+7.1%", dir: "up" }, { v: "99", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "The most recent days of any week are the least settled",
        cells: [{ v: "63", c: "+21.2%", dir: "up" }, { v: "52", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        cells: [{ v: "559", c: "+22.9%", dir: "up" }, { v: "455", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        cells: [{ v: "11.27%", c: "−0.16 points", dir: "down" }, { v: "11.43%", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "Where the site appears in Google results, US searches only. Lower is better",
        cells: [{ v: "4.85", c: "from 5.19", dir: "up" }, { v: "5.19", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "The clearest measure of website interest. 68% of these visits were engaged, against 64%. They averaged 64 seconds on the site, against 40",
        cells: [{ v: "100", c: "+23.5%", dir: "up" }, { v: "81", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "Visits from Google rose by 19. Much of the rest came through very short direct visits, which are not counted as audience growth",
        cells: [{ v: "284", c: "+42.7%", dir: "flat" }, { v: "199", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "A new episode was published September 30. Most of this week’s downloads were of earlier episodes",
        cells: [{ v: "69", c: "+527.3%", dir: "up" }, { v: "11", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The reel announcing the new podcast episode led the week by a wide margin: 3,178 views, 1,951 reach and 144 of the week’s 202 interactions. The 3 other feed pieces drew 58 interactions between them.",
    ledeClient: "The best-performing content this week announced the podcast’s new episode.",
    hero: {
      url: "https://www.instagram.com/reel/Dd9nF-Izyen/",
      title: "New episode: Biology Always Wins, featuring Mélissa M. Seif",
      date: "October 1",
      format: "Reel",
      stats: [
        { v: "3,178", l: "Views" },
        { v: "1,951", l: "Reach" },
        { v: "144", l: "Interactions" },
        { v: "7.4%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the week by a wide margin. It reached 1,951 accounts, more than 5 times any other piece published, and drew 144 of the week’s 202 interactions: 99 likes, 26 shares, 14 comments and 5 saves. It was also reposted 9 times.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/reel/Dd1kGMYBdJY/",
        title: "You should never feel judged for where you are in your oral health journey",
        date: "September 28", format: "Reel", views: 592, reach: 372, interactions: 22,
      },
      {
        url: "https://www.instagram.com/reel/Dd7PDOtB-3m/",
        title: "International Podcast Day feels like a good excuse to look back at where The Dr. El Chaar Podcast has been",
        date: "September 30", format: "Reel", views: 548, reach: 343, interactions: 28,
      },
      {
        url: "https://www.instagram.com/p/DeAOLaoBhME/",
        title: "Our patients agree: it’s easier to smile",
        date: "October 2", format: "Post", views: 252, reach: 137, interactions: 8,
      },
    ],
    galleryNote:
      "The other 3 feed pieces published September 28 – October 4. 12 Stories complete the 16 pieces. Pieces published late in the week are still gathering views: last week’s September 26 reel more than tripled its views after our first reading. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for September 28 – October 4 from the Metricool export,
     in the social team’s usual voice. The social lead’s recap follows this
     first draft: replace or edit then, and re-check any figure it changes
     against Metricool before deploying. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "Instagram views increased 54% and average daily reach more than doubled compared with the previous period, from 214 to 526, the highest of the last 4 weeks. Accounts engaged rose from 98 to 239, and the account added 16 followers.",
      "The new podcast episode led the week. The reel announcing Biology Always Wins, featuring Mélissa M. Seif, drew 3,178 views, reached 1,951 accounts and generated 144 interactions, a 7.4% engagement rate. Across 3 reels, average reach was 889 per reel.",
      "Overall engagement rate was 5.49% against 6.88%, as reach grew faster than interactions and the newest pieces were still gathering engagement at the time of reporting. Stories with complete data averaged 83 accounts reached.",
    ],
    takeaway:
      "The podcast gave the account its widest reach in the last 4 weeks, and content about the doctors and their patients continued to connect. We’ll keep pairing each new episode with a reel, maintain a weekly mix of reels, Stories and feed posts, and keep building on the human side of Dr. El Chaar’s expertise.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "7 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Measurement",
        title: "Last week’s report named the wrong reel as the strongest",
        body:
          "Re-read on October 5, the September 26 reel about Dr. Castillo’s patient reads 1,051 views, 620 reach and 55 interactions, against 320, 224 and 11 on September 28. The September 23 reel that last week’s report called the strongest piece of the week, with 43 of 54 interactions, now reads 940, 579 and 48. The September 21 – 27 week restates to 103 interactions and a 6.88% engagement rate, against 54 and 3.62% as deployed. Views 5,527 against 5,518, reach per day 214 against 213. Stories and followers are unchanged. The deployed client report still carries the old claim; this report corrects the figures without repeating it.",
      },
      {
        tag: "Measurement",
        title: "This week’s Instagram was read early",
        body:
          "The pull ran on the morning of October 5. The podcast reel was 4 days old, the post 3 days, and the 4 Stories from October 1 and October 4 show 0 impressions with taps recorded, so their data has not arrived. The comparison week had 8 or more days to settle. Every Instagram comparison this week leans against this week; the engagement rate fall from 6.88% to 5.49% should be read with that in mind. Metricool’s 55 average reach per Story counts the 4 empty Stories; the 8 with data average 83, still below last week’s 173.",
      },
      {
        tag: "Real gap",
        title: "Low-engagement direct traffic, third week in a row",
        body:
          "Direct sessions 212 at 14.2% engaged and 6.0 seconds, after 158 at 16.5% and 15.2 seconds, and 380 at 9.2% and 3.7 seconds. September 7 – 13 ran 49.3% and 15.5 seconds. New users who reached the 404 page rose from 46 to 114. aocr.org sent 22 sessions at 4.5% engaged and 1.3 seconds. Last cycle set 3 weeks as the point to add a GA4 filter; this is the third.",
      },
      {
        tag: "Note",
        title: "Podcast downloads rose, mostly on earlier episodes",
        body:
          "69 downloads between pulls, against 11, from lifetime 5,284 on September 28 to 5,353 today. The new episode, published September 30, has 9. Buzzsprout gives 3 readings for the last 7 days: 64 on the dashboard, 69 from lifetime, 74 in the per-episode export; this report uses the lifetime change, as last week. 90 days reads 530 on the dashboard and 566 in the export; 30 days matches at 191.",
      },
      {
        tag: "Note",
        title: "Booking link clicks rose while the datacenter share fell",
        body:
          "Booking 37 against 22, homepage 106 against 99, domain total 149 against 123. Council Bluffs 35, Santa Clara 10, Ashburn 9 and Singapore 6 make up 60 of 149, about 40%, against about 53% last week. 93 of 149 clicks are from the US. A new link, /jK1aSN, drew 2; /ddspc drew 4. Neither is identified. Still no UTM parameters on any link; the 3 clicks marked social came through Instagram and Facebook referrers.",
      },
      {
        tag: "Note",
        title: "Search recovered on desktop",
        body:
          "US position 4.85 against 5.19. Desktop 5.69 against 7.87; mobile 4.88 against 4.15. Clicks 63 against 52 and impressions 559 against 455. The query dr el chaar drew 7 clicks at position 7.25, still well below the other branded queries near position 1 to 3.",
      },
      {
        tag: "Note",
        title: "test-service is gone from the data, and the prototype site is sending visits",
        body:
          "/dental-service/test-service does not appear in either week’s landing pages, including the re-pull of September 21 – 27, which showed 9 views when first read. Confirm whether it was removed. eec-prototype.vercel.app sent 3 sessions; check whether the prototype is meant to be public.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "5 things worth carrying into the next report.",
    items: [
      {
        title: "A podcast episode can carry the week",
        body: "The reel announcing the new episode drew 144 of 202 interactions and 1,951 reach. Without it, interactions were 58 against 103 and the 3 other feed pieces averaged 284 reach.",
        client: {
          title: "Announcing a new episode drew the most attention",
          body: "The reel announcing the podcast’s new episode reached 1,951 accounts and drew 144 of the week’s 202 interactions, the strongest result of the last 4 weeks.",
        },
      },
      {
        title: "The first reading understates the newest posts",
        body: "The September 26 reel went from 11 interactions to 55 between readings and finished ahead of the September 23 reel. Naming the strongest piece needs a second reading.",
        client: {
          title: "Posts keep growing after the first week",
          body: "The September 26 reel about Dr. Castillo’s patient more than tripled its views after last week’s report and finished as that week’s strongest piece.",
        },
      },
      {
        title: "Booking link clicks rose 68%",
        body: "37 against 22. Midtown nearly doubled, 12 to 22. The datacenter share fell from about 53% to about 40%, so the rise is not coming from more automated traffic, though Short.io cannot confirm it link by link.",
        client: {
          title: "Booking link clicks rose 68%",
          body: "37 clicks on the booking links against 22 the week before. Midtown went from 12 to 22.",
        },
      },
      {
        title: "Search improved on clicks and position",
        body: "Clicks 52 to 63, impressions 455 to 559, US position 5.19 to 4.85. Desktop recovered from 7.87 to 5.69.",
        client: {
          title: "Search improved",
          body: "Clicks from Google rose from 52 to 63, and the site’s average position improved from 5.19 to 4.85.",
        },
      },
      {
        title: "Google visitors stayed longer; direct visitors did not",
        body: "Google 100 visits at 68.0% engaged and 64 seconds, against 81, 64.2% and 40. Direct 212 at 14.2% and 6.0 seconds.",
        client: {
          title: "Visitors from Google stayed longer",
          body: "Visits from Google search rose from 81 to 100, and those visitors spent 64 seconds on the site on average, against 40 the week before.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Add a GA4 filter for the low-engagement direct traffic",
        owner: "Figment",
        metric: "Direct engagement rate and session totals with the filter applied",
        body: "3 weeks running: 9.2%, 16.5% and 14.2% engaged, against 49.3% on September 7 – 13. New users reaching the 404 page rose to 114. Check GA4’s Tech and Geography reports for direct and aocr.org traffic first, so the filter targets the automated visits and not real ones.",
      },
      {
        action: "Tag the 5 EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Booking clicks that carry UTM parameters in Short.io’s UTM Medium report",
        body: "The datacenter share moves week to week, about 42%, 53% and 40% over 3 weeks, so totals cannot be compared cleanly. Automated traffic does not carry tracking parameters, so a UTM filter isolates real clicks directly.",
      },
      {
        action: "Identify /ddspc and /jK1aSN",
        owner: "Figment",
        metric: "Purpose, placement and go-live date for each",
        body: "/ddspc drew 4 clicks this week and has run 3 weeks unidentified. /jK1aSN was created this week and drew 2.",
      },
      {
        action: "Pair every podcast episode with a reel",
        owner: "Figment",
        metric: "Reel reach against this week’s 1,951",
        body: "The announcement reel carried the week on Instagram. The podcast had gone 9 weeks without an episode before September 30.",
      },
      {
        action: "Read Instagram twice before naming the strongest piece",
        owner: "Figment",
        metric: "The strongest piece is the same at the first and second reading",
        body: "Last week’s report named the September 23 reel; a week later the September 26 reel led. Pull Metricool again midweek, or name the strongest piece from the previous week’s settled data.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Keep building content about the doctors and their patients",
        body: "The September 26 reel about Dr. Castillo’s patient finished as last week’s strongest piece once its views had settled. We will keep that at the center while maintaining a mix of educational and clinical posts.",
      },
      {
        action: "Keep a weekly mix of reels, Stories and feed posts",
        body: "This week brought 3 reels, 1 post and 12 Stories. Reels continue to reach the most people.",
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
          ["Views", "8,512 · from 5,527"],
          ["Reach per day", "526 · from 214"],
          ["Accounts engaged", "239 · from 98"],
          ["Interactions", "202 · reels 194, post 8 · from 103"],
          ["Engagement rate", "5.49% · from 6.88%"],
          ["Followers", "3,251 · up 16 · from 3,235"],
          ["Reels", "3 · 4,318 views · 889 average reach · 194 interactions"],
          ["Reels, week before", "2 · 1,991 views · 600 average reach · 103 interactions"],
          ["Feed post", "1 · 252 views · 137 reach · 8 interactions"],
          ["Stories", "12 · 683 impressions · 55 average reach · from 8, 1,423 and 173"],
          ["Stories with data", "8 of 12 · 83 average reach"],
          ["Published", "3 reels · 1 post · 12 Stories"],
        ],
        note:
          "Account totals are Metricool’s account-level figures, not a sum of individual posts. Engagement rate is interactions on posts and reels divided by reach, where reach is average reach per day times 7: 202 against 3,682 this week and 103 against 1,498 the week before. The week before is restated from the October 5 pull, from 54 interactions and 3.62%. Metricool reports followers 2 ways that disagree this week: the account total rose by 16, while new minus lost is 14. This report uses the account total. 4 Stories show 0 impressions with taps recorded; their data has not arrived. No collab was published. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures rather than a sum of individual posts. Engagement rate is interactions divided by reach. Figures for the week before were re-read this week and include engagement that arrived after last week’s report. No advertising ran in either week.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Booking · Midtown", "22 · from 12"],
          ["Booking · Upper East Side", "15 · from 10"],
          ["Booking total", "37 · from 22"],
          ["Homepage link", "106 · from 99"],
          ["/ddspc", "4"],
          ["/jK1aSN", "2"],
          ["Domain total", "149 · from 123"],
        ],
        note:
          "Filtered to exclude the catch-all path /*, which collects automated requests. Clicks by All. Short.io’s own comparison confirms the week before at 123. A country filter was not applied: 93 of 149 clicks are from the US. Council Bluffs, Santa Clara, Ashburn and Singapore account for about 40% of this week’s clicks, against about 53% last week. /ddspc drew 2 the week before; /jK1aSN is new. Neither is identified, and both are counted in the domain total only. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. Some clicks come from automated traffic.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "63 · from 52"],
          ["Impressions", "559 · from 455"],
          ["Click rate", "11.27% · from 11.43%"],
          ["Average position", "4.85 · from 5.19 · US only"],
          ["Desktop", "31 clicks · 235 impressions · position 5.69 · all searches"],
          ["Mobile", "32 clicks · 324 impressions · position 4.88 · all searches"],
          ["Homepage", "45 clicks · 417 impressions · position 3.83"],
          ["Locations", "11 clicks · 215 impressions · position 3"],
          ["Our Doctors", "9 clicks · 335 impressions · position 4.39"],
          ["About", "1 click · 163 impressions · position 2.88"],
          ["Dental Services", "1 click · 134 impressions · position 2.4"],
        ],
        note:
          "Totals come from Search Console’s daily export. The headline average position is weighted by impressions and filtered to US searches, the same basis as previous reports; device positions cover all searches. September 21 – 27 was re-pulled on October 5 and is unchanged on every total.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days; last week’s figures held when we re-checked them. Average position covers US searches only; lower is better.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["New visitors", "284 · from 199"],
          ["Sessions", "373 · from 257"],
          ["Visits from Google search", "100 · from 81"],
          ["Direct visits", "212 · from 158"],
          ["Google visitors engaged", "68.0% · 64 seconds average · from 64.2% and 40 seconds"],
          ["Direct visitors engaged", "14.2% · 6.0 seconds average · from 16.5% and 15.2 seconds"],
          ["Visits from aocr.org", "22 · from 2"],
          ["Yahoo search", "5 · from 2"],
          ["Bing search", "3 · from 3"],
          ["Visits from YouTube", "4 · none the week before"],
          ["Visits from ChatGPT", "0 · from 5"],
          ["Landing pages", "49 · from 45"],
          ["Homepage landings", "305 · from 227"],
          ["Our Doctors landings", "38 · from 16"],
          ["Desktop / mobile", "81% / 18% · from 85% / 15%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property; Looker Studio matches it exactly in both weeks. New visitors, landing pages, devices and page titles come from Looker Studio. September 21 – 27 is restated from the October 5 pull: 199 new visitors against 196, 227 homepage landings against 199, 45 landing pages against 47. Landing pages are counted without blank and (not set) rows. Tablets were 1% of active users this week. aocr.org sessions averaged 1.3 seconds. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of website interest, at 100 against 81. Much of the rest of the increase in visitors came through very short direct visits, which are not counted as audience growth.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["This week", "No campaign sent"],
          ["Previous week", "No campaign sent"],
        ],
        note:
          "No campaign went to the EEC list September 21 – October 4. The most recent, RH 2.0, went September 12. Read on September 21 it showed 1,684 opens, 13 clicks and 422 not delivered, 12% of the list; cleaning the list before the next send is still worth doing.",
        noteClient:
          "No email campaign was sent this week or the week before. The most recent was sent September 12.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Last 7 days", "69"],
          ["The 7 days before", "11"],
          ["Last 30 days", "191"],
          ["Last 90 days", "566"],
          ["Lifetime downloads", "5,353"],
          ["Episodes published", "51"],
          ["Most recent episode", "September 30 · Biology Always Wins"],
          ["New episode so far", "9"],
          ["New York share", "519 of 5,347 located downloads · 9.7%"],
        ],
        note:
          "Buzzsprout reports trailing windows from the day of the pull. This week’s 69 is lifetime downloads rising from 5,284 on September 28 to 5,353 on October 5, the same method as last week’s 11. The dashboard read 64 for the last 7 days and the per-episode export sums to 74. 30 days matches at 191; 90 days reads 566 in the export and 530 on the dashboard. The new episode accounts for 9 downloads.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. A new episode, Biology Always Wins, was published September 30, the first since July 27.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "September 28 to October 4, 2026, 7 full days, Monday to Sunday, compared with September 21 to 27. Both weeks are the same length, so every comparison is direct." },
          { q: "Why last week’s figures differ from last week’s report", a: "Every figure for September 21 to 27 was read again this week. Instagram posts keep gathering views and engagement for days after they are published: the September 26 reel more than tripled its views after our first reading and finished ahead of the September 23 reel. This report uses the newer readings throughout." },
          { q: "How engagement rate is calculated", a: "Interactions divided by reach, meaning the share of people who saw something and responded to it. It is not calculated against follower count, which would make the figure look higher than it is." },
          { q: "How website engagement is measured", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action. Engagement is shown by source, so a change in visits can be checked against whether those visitors actually stayed." },
          { q: "Why the search figures may change", a: "Google keeps processing search data for several days after the fact, so the most recent days of any week are the least settled. September 21 to 27 was unchanged when we re-checked it this week." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No advertising ran in either week. No email was sent in either week." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
