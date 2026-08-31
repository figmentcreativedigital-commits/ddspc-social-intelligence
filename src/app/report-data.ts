/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles.
   Edit the figures and narrative strings below; never edit page.tsx.

   Cycle checklist:
     1. run  python3 extract.py  in the cycle folder
     2. paste the figures it prints into R below
     3. update the narrative strings (brief, learned, moves, plan)
     4. swap the Instagram URLs in R.worked
     5. npm run dev, both variants, then push
   ========================================================================== */

/* ==========================================================================
   VARIANT
   Set per Vercel project, never in this file. Unset falls back to "client",
   so a missing or misspelt variable can only ever produce the client report.
   ========================================================================== */
type Variant = "client" | "internal";
export const VARIANT: Variant =
  process.env.NEXT_PUBLIC_REPORT_VARIANT === "internal" ? "internal" : "client";
export const IS_INTERNAL: boolean = VARIANT === "internal";

/* Sections present in this build, in order. Numbering and the nav rail both
   derive from this array, so removing one never leaves a gap in the sequence. */
const ALL_SECTIONS = [
  { id: "brief", label: "The brief" },
  { id: "period", label: "The period" },
  { id: "scoreboard", label: "Scoreboard" },
  { id: "worked", label: "What worked" },
  { id: "attention", label: "Needs attention", internalOnly: true },
  { id: "learned", label: "What we learned" },
  { id: "moves", label: "Next moves", internalOnly: true },
  { id: "plan", label: "What we do next", clientOnly: true },
  { id: "detail", label: "Detail" },
] as { id: string; label: string; internalOnly?: boolean; clientOnly?: boolean }[];

export const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
export const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
export const has = (id: string) => NAV.some((n) => n.id === id);

/* ==========================================================================
   REPORT
   Every figure below traces to a source export. Nothing is estimated.
   Each cycle: edit numbers and narrative strings here. Do not touch the JSX.
   ========================================================================== */
export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "August 17 \u2013 30, 2026",
  context: "Thirty-day context: August 1 \u2013 30, 2026",

  /* Masthead strip. Lives here so no cycle ever needs to edit page.tsx. */
  meta: [
    { k: "Reporting period", v: "August 17 \u2013 30, 2026" },
    { k: "Comparison", v: "August 3 \u2013 16, 2026" },
    { k: "Advertising", v: "None in either period" },
    { k: "Content published", v: "12 pieces" },
  ],

  /* ----------------------------------------------------------------- BRIEF */
  brief: {
    title: "The brief",
    lede: "The whole period in four lines.",
    items: [
      {
        role: "Headline",
        text: "Three of four channels fell about a third. Website sessions down 32%, search clicks down 30%, booking clicks down 42%. Last period we could point to the ad flight ending. This period there is nothing to point to.",
        client: {
          role: "Headline",
          text: "Website visits, search clicks and booking clicks all fell about a third. No advertising ran in this period or the one before it, so the two compare directly.",
        },
      },
      {
        role: "What worked",
        text: "The Dr. Jonathan Shiloah announcement reached 2,950 accounts and pulled 6,020 views. That is more than everything published in the previous two weeks combined. Same publishing volume, double the reach.",
      },
      {
        role: "Primary concern",
        text: "Booking clicks went from 48 to 28. That is steeper than the drop in traffic. Fewer people arrived, and a smaller share of the ones who did clicked through to book.",
        client: {
          role: "What we are watching",
          text: "Booking clicks went from 48 to 28. That moved more than website visits did, so we are looking at how people reach the booking step, not just how many arrive.",
        },
      },
      {
        role: "The number that matters",
        text: "28 booking clicks in two weeks \u2014 18 Midtown, 10 Upper East Side. It is the only direct read on intent in this report and the number to beat next cycle.",
      },
    ],
  },

  /* ---------------------------------------------------------------- PERIOD */
  period_: {
    lede: "Daily website visitors across August. Lighter is the previous period, darker is this one. Neither had advertising behind it.",
    paidLabel: "Previous period \u00b7 Aug 1 \u2013 16",
    windowLabel: "This period \u00b7 Aug 17 \u2013 30",
    daily: [
      { d: "Aug 1", v: 53, paid: true }, { d: "Aug 2", v: 46, paid: true },
      { d: "Aug 3", v: 74, paid: true }, { d: "Aug 4", v: 40, paid: true },
      { d: "Aug 5", v: 40, paid: true }, { d: "Aug 6", v: 46, paid: true },
      { d: "Aug 7", v: 34, paid: true }, { d: "Aug 8", v: 29, paid: true },
      { d: "Aug 9", v: 39, paid: true }, { d: "Aug 10", v: 62, paid: true },
      { d: "Aug 11", v: 58, paid: true }, { d: "Aug 12", v: 63, paid: true },
      { d: "Aug 13", v: 59, paid: true }, { d: "Aug 14", v: 28, paid: true },
      { d: "Aug 15", v: 12, paid: true }, { d: "Aug 16", v: 18, paid: true },
      { d: "Aug 17", v: 19 }, { d: "Aug 18", v: 22 }, { d: "Aug 19", v: 33 },
      { d: "Aug 20", v: 28 }, { d: "Aug 21", v: 24 }, { d: "Aug 22", v: 30 },
      { d: "Aug 23", v: 27 }, { d: "Aug 24", v: 34 }, { d: "Aug 25", v: 30 },
      { d: "Aug 26", v: 35 }, { d: "Aug 27", v: 58 }, { d: "Aug 28", v: 26 },
      { d: "Aug 29", v: 19 }, { d: "Aug 30", v: 12 },
    ],
    note: "43.0 visitors a day in the first half of August, 28.4 in the second. The drop is gradual, not a single event. August 27 is the exception \u2014 the day we announced the new orthodontist.",
    noteClient: "43.0 visitors a day in the first half of August, 28.4 in the second. The drop is gradual rather than sudden. August 27 stands out \u2014 the day the practice announced its new orthodontist.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "August 17 to 30, from platform exports. Comparisons are against August 3 to 16. No advertising in either period.",
    rows: [
      { k: "Booking link clicks", v: "28", c: "\u221242%", dir: "down", note: "Midtown 18 \u00b7 Upper East Side 10" },
      { k: "Website sessions", v: "515", c: "\u221232.5%", dir: "down", note: "763 previously" },
      { k: "New website visitors", v: "397", c: "28.4 a day", dir: "down", note: "43.0 a day previously" },
      { k: "Search clicks", v: "94", c: "\u221229.9%", dir: "down", note: "6.7 a day" },
      { k: "Search impressions", v: "945", c: "\u221214.2%", dir: "down", note: "Shown nearly as often, clicked less" },
      { k: "Search click rate", v: "9.95%", c: "\u22122.2 points", dir: "down", note: "12.16% previously" },
      { k: "Average search position", v: "6.3", c: "from 5.74", dir: "down", note: "Impression-weighted, US" },
      { k: "Instagram reach", v: "397 a day", c: "+113%", dir: "up", note: "Best in three cycles" },
      { k: "Instagram views", v: "15,300", c: "+63%", dir: "up", note: "Account-level" },
      { k: "Instagram interactions", v: "298", c: "+11%", dir: "up", note: "Posts 148 \u00b7 Reels 125 \u00b7 Stories 25" },
      { k: "Content published", v: "12", c: "unchanged", dir: "flat", note: "2 posts, 3 reels, 7 stories" },
      { k: "Named link clicks", v: "122", c: "\u221240%", dir: "down", note: "Homepage, booking and social links" },
      { k: "Podcast downloads", v: "147", c: "\u221233%", dir: "down", note: "Trailing 30 days \u00b7 no episode since 27 July" },
    ],
  },

  /* ---------------------------------------------------------------- WORKED */
  worked: {
    lede: "Twelve pieces went out, same as last period. One of them did more than everything we published in the two weeks before.",
    ledeClient: "Twelve pieces went out, same as last period. One of them did more than everything published in the two weeks before.",
    hero: {
      url: "https://www.instagram.com/p/DcjlJ9MmdxM/",
      title: "Welcoming Dr. Jonathan Shiloah, our newest orthodontist",
      date: "August 27",
      format: "Carousel",
      stats: [
        { v: "6,020", l: "Views" }, { v: "2,950", l: "Reach" },
        { v: "83", l: "Interactions" }, { v: "40%", l: "Of period views" },
      ],
      why: "Best piece the account has published in three cycles. More views than every post and reel of the previous period combined, and it lifted daily reach from 186 to 397. It also produced the busiest website day of the month. News about people is outperforming clinical content, and that is worth planning around.",
    },
    gallery: [
      { url: "https://www.instagram.com/reel/DcbcRmthiaH/", title: "Some patients become part of your career in a way you never forget", date: "August 24", format: "Reel", views: 951, reach: 613, interactions: 50 },
      { url: "https://www.instagram.com/p/DcMGYlxmddg/", title: "We\u2019ve spent years treating bacteria like the enemy", date: "August 18", format: "Post", views: 1004, reach: 401, interactions: 16 },
      { url: "https://www.instagram.com/reel/DcWL2sLh9KZ/", title: "Periodontics starts with the gums. It shouldn\u2019t stop there.", date: "August 22", format: "Reel", views: 570, reach: 412, interactions: 10 },
      { url: "https://www.instagram.com/reel/DcTt63Ch9ve/", title: "The most important outcome may be the one you can\u2019t photograph", date: "August 21", format: "Reel", views: 480, reach: 336, interactions: 9 },
    ],
    galleryNote: "Ranked by views. Post-level figures rank content against content and are never summed into a total. The August 24 reel is worth a separate look \u2014 50 interactions on 613 reach makes it the most engaging piece of the period, even though three others got more views.",
  },

  /* ------------------------------------------------- ATTENTION (internal)  */
  attention: {
    lede: "Six items that need an owner and a decision before the next cycle.",
    items: [
      {
        tag: "Real gap",
        title: "Booking clicks fell faster than traffic",
        body: "48 to 28, a 42% drop against a 32% drop in sessions. If this were only fewer visitors, the two would move together. They did not. Check the booking links resolve, confirm they still sit where they did a month ago, and look at whether the pages carrying them changed.",
      },
      {
        tag: "Real gap",
        title: "Google is showing the site nearly as often and people are clicking less",
        body: "Impressions down 14%, clicks down 30%, average position from 5.74 to 6.3. This is a listing and ranking question, not a demand question. It is also the more fixable of the two.",
      },
      {
        tag: "Not actioned",
        title: "Podcast has been quiet five weeks",
        body: "Nothing since 27 July. Trailing 30-day downloads went 221 to 147, trailing 7-day went 56 to 14. This was recommended last cycle and did not happen. Worth finding out whether the constraint is recording, editing or scheduling, because otherwise the recommendation just repeats.",
      },
      {
        tag: "Not actioned",
        title: "Email list still not cleaned",
        body: "The 1 August send bounced at 12.1%, same as July. It also showed something the CSV did not: of 1,632 opens only 372 are confirmed, 1,260 are proxy. The 53.9% open rate is really 12.3%. Nobody should be using 54% as a benchmark.",
      },
      {
        tag: "Data quality",
        title: "Link click numbers need care this period",
        body: "Short.io reports human clicks up 144%, but Turin accounts for 170 and Iran for 108 of 617, both arriving in one burst on 18 August. Neither is a plausible audience for a Manhattan periodontal practice. Named links, which we control and can attribute, went 203 to 122. That is the figure used throughout.",
      },
      {
        tag: "Access",
        title: "Facebook is being posted to and cannot be measured",
        body: "No change since last cycle. The DDS PC page is still unlinked from Instagram with a personal creator account in its place, so analytics are not reachable. Facebook is left out rather than shown as inactive. A combined Meta figure pulled through Instagram is the only workaround, and it would break comparability with the last two reports.",
      },
    ],
  },

  /* --------------------------------------------------------------- LEARNED */
  learned: {
    lede: "Five things we did not know two weeks ago.",
    items: [
      {
        title: "The channels that fell, fell together",
        body: "Website visits, search clicks, link clicks and podcast downloads all dropped about a third in the same two weeks. Channels usually move independently. When four move together by the same amount, the cause is more likely underneath all of them \u2014 seasonality, ranking, or a shift in how people find the practice \u2014 than in any one channel.",
      },
      {
        title: "One announcement beat two weeks of editorial",
        body: "The Shiloah post pulled 6,020 views. Every post and reel of the previous period added up to 3,520. We have been publishing solid clinical content for months and doing fine with it. One piece of news about a person joining beat all of it.",
      },
      {
        title: "Reach and engagement rate moved opposite ways again",
        body: "Reach more than doubled, interactions rose 11%, so the engagement rate fell from 10.3% to 5.4%. Last period the same ratio moved the other way for the same reason. The rate is two moving numbers divided by each other and tells you little on its own. Read reach and interactions.",
        client: {
          title: "Reach grew faster than engagement",
          body: "Reach more than doubled while interactions rose 11%. Because the engagement rate is one divided by the other, the rate reads lower even though both numbers are up. Reach and interactions are the better figures to watch.",
        },
      },
      {
        title: "Blog content is starting to pull its own traffic",
        body: "Two articles \u2014 benefits of dental implants, and cavity fillings versus root canals \u2014 showed up in the landing page report for the first time, at 12 and 10 views. Small, but these are people landing directly on an article instead of the homepage. That is what published writing is supposed to do.",
      },
      {
        title: "An AI assistant sent visitors for the first time",
        body: "Two sessions from ChatGPT, tagged by Analytics as an AI assistant source. Two is nothing. But it has never appeared before, and it is worth watching, because conventional search work would not surface it.",
      },
    ],
  },

  /* ---------------------------------------------------- MOVES (internal)   */
  moves: {
    lede: "Five actions with an owner and the number that judges each one.",
    items: [
      {
        action: "Find out why booking clicks fell faster than traffic",
        owner: "Figment",
        metric: "Booking clicks above 28 next cycle",
        body: "Check the links resolve, confirm placement has not changed, review the pages carrying them. Sharpest drop in the report and the one with the most direct commercial impact.",
      },
      {
        action: "Look into the search position slip",
        owner: "Figment",
        metric: "Average position back under 6.0",
        body: "Position moved 5.74 to 6.3 while impressions held. Check for competitor movement on brand and address terms, confirm nothing changed in titles or metadata, verify the Google Business Profile still matches the site.",
      },
      {
        action: "Publish a podcast episode",
        owner: "Practice \u00b7 Figment to schedule",
        metric: "One episode before the next report",
        body: "Five weeks dark, downloads down a third. Recommended last cycle and it did not happen. Find out what is actually blocking it.",
      },
      {
        action: "Clean the email list",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next send",
        body: "Also recommended last cycle, also not done. The 1 August send bounced at 12.1%. In the meantime switch internal reporting to confirmed opens instead of total opens \u2014 the difference is 53.9% against 12.3%.",
      },
      {
        action: "Plan two more announcement posts",
        owner: "Figment",
        metric: "Match or beat 2,950 reach",
        body: "The Shiloah post beat two weeks of editorial. Find the next piece of real practice news \u2014 a credential, a new service, a milestone \u2014 and give it the same carousel treatment. Then we will know whether it is the format or the news.",
      },
    ],
  },

  /* ------------------------------------------------------- PLAN (client)   */
  plan: {
    lede: "Five things we will do next, and what each one follows from.",
    items: [
      {
        action: "Look closely at the path to booking",
        body: "Booking clicks moved more than website visits did. We will check every booking link resolves and still sits where people expect it. This is the step that matters most, so it goes first.",
      },
      {
        action: "Review where the practice shows up in search",
        body: "Google showed the practice nearly as often as before, but the average position slipped and fewer people clicked. We will review titles, descriptions and the Google Business Profile so the listing works harder from the same position.",
      },
      {
        action: "Publish a new podcast episode",
        body: "The last episode went out 27 July and downloads have eased since. The back catalogue is still getting listened to in New York more than anywhere else. A new episode gives both the podcast and the feed something to work with.",
      },
      {
        action: "Review the email list before the next send",
        body: "Part of the list is no longer reaching people. Verifying the addresses protects delivery for everyone else and gives a much clearer read on how the next campaign actually performs.",
      },
      {
        action: "Plan two more announcements in the format that worked",
        body: "The post welcoming Dr. Shiloah reached more people than everything published in the two weeks before it. We will find the next piece of practice news worth announcing and give it the same treatment.",
      },
    ],
  },

  /* ---------------------------------------------------------------- DETAIL */
  detail: {
    lede: "Supporting figures and how each was derived.",
    panels: [
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "515"],
          ["New visitors", "397"],
          ["Landing-page views", "798"],
          ["Desktop / mobile", "79% / 21%"],
          ["Direct", "320 sessions \u00b7 62.1%"],
          ["Google organic", "158 sessions \u00b7 30.7%"],
          ["Bing organic", "10 sessions"],
          ["AI assistant", "2 sessions"],
          ["Paid", "None this period"],
        ],
        note: "Google Analytics 4, August 17 to 30. Sessions down 32.5%, new visitors down 34.1% against the previous two weeks. Neither period had advertising, so the comparison is direct. After the homepage, the most-viewed pages were Our Doctors at 98 and, for the first time, two blog articles at 12 and 10.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "94"],
          ["Impressions", "945"],
          ["Click rate", "9.95%"],
          ["Average position", "6.3"],
          ["Homepage", "68 clicks \u00b7 677 impressions"],
          ["Our Doctors", "20 clicks \u00b7 541 impressions"],
          ["Locations", "3 clicks \u00b7 279 impressions"],
          ["Dental Services", "1 click \u00b7 88 impressions"],
        ],
        note: "Google Search Console, August 17 to 30, fourteen complete days. Totals come from the daily chart export, not the query export, which this period held back 79% of clicks and 68% of impressions as low-volume queries. That is higher than the 57% held back last period, so the query table is a thinner sample than usual. Average position is impression-weighted for US traffic. All 41 non-brand queries earned zero clicks, same as the last two periods.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Followers", "3,220 \u00b7 up 12"],
          ["Views", "15,300"],
          ["Reach", "397 a day"],
          ["Interactions", "298"],
          ["Accounts engaged", "212"],
          ["Published", "2 posts \u00b7 3 reels \u00b7 7 stories"],
          ["Views by format", "Carousel 8,855 \u00b7 Reel 3,646 \u00b7 Post 1,497 \u00b7 Story 777"],
          ["Follower / non-follower views", "6,005 / 8,697"],
          ["Advertising", "None in period"],
        ],
        note: "Account-level figures from Metricool for August 17 to 30, not a sum of individual posts. Post-level figures rank content against content only. Reach more than doubled on unchanged publishing volume, and nearly all of that traces to the 27 August announcement, which alone was about 40% of the period\u2019s views.",
        noteClient: "Account-level figures from Metricool for August 17 to 30, rather than a sum of individual posts. Post-level figures rank content against content only. Reach more than doubled on unchanged publishing volume, with most of the increase from the 27 August announcement.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Named link clicks", "122"],
          ["Homepage", "94"],
          ["Booking \u00b7 Midtown", "18"],
          ["Booking \u00b7 Upper East Side", "10"],
          ["Booking total", "28"],
          ["Previous period booking total", "48"],
        ],
        note: "Short.io, August 17 to 30. Only named links are reported \u2014 the ones we created and can attribute. Wildcard and unattributed traffic is excluded, as is city-level geography, which reflects hosting infrastructure rather than readers. On that basis named link clicks went 203 to 122.",
        noteClient: "Short.io, August 17 to 30. Only named links are reported \u2014 the ones we created and can attribute to a destination. Unattributed traffic and city-level geography are excluded. On that basis named link clicks went 203 to 122.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["Campaigns in period", "None"],
          ["Last send", "1 August \u00b7 Summer Promo Extensions"],
          ["Sent / delivered", "3,443 / 3,028"],
          ["All opens", "1,632 \u00b7 53.9%"],
          ["Confirmed opens", "372 \u00b7 12.3%"],
          ["Clicks", "54 \u00b7 1.8%"],
          ["Unsubscribes", "9"],
        ],
        note: "No campaign went out between 17 and 30 August. The 1 August send is shown for reference. The gap between all opens and confirmed opens matters: most mail clients now pre-load images automatically, which registers as an open whether or not anyone read it. Confirmed opens are the reliable figure.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Lifetime downloads", "5,143"],
          ["Episodes published", "50"],
          ["Trailing 30 days", "147"],
          ["Trailing 7 days", "14"],
          ["Published in period", "None"],
          ["Most recent episode", "27 July"],
          ["New York, last 5 episodes", "25 downloads \u00b7 15%"],
          ["Mobile share", "57%"],
        ],
        note: "Buzzsprout. The platform does not offer custom date ranges in its export, so these are trailing windows rather than the reporting period, and they are labelled that way. Trailing 30-day downloads went 221 to 147. New York is still the largest single city for the last five episodes, ahead of Stockholm and Frankfurt. Figures follow IAB Podcast Measurement Technical Guidelines 2.2.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the reporting period covers", a: "17 to 30 August 2026 \u2014 fourteen whole calendar days. Comparisons are against 3 to 16 August, the fourteen days before. Neither period had advertising running, so the two compare directly." },
          { q: "Why engagement rate fell while reach rose", a: "Engagement rate is interactions divided by reach. Reach more than doubled and interactions rose 11%, so the ratio fell even though both numbers improved. Last period the same ratio rose for the opposite reason. Read reach and interactions directly.", internalOnly: true },
          { q: "Why the engagement rate reads lower this period", a: "Engagement rate is interactions divided by reach. Both grew, but reach grew faster, so the ratio reads lower. Reach and interactions are the more useful figures.", clientOnly: true },
          { q: "Where the search totals come from", a: "The daily chart export, not the query export. Google held back 79% of clicks and 68% of impressions from the query table this period as low-volume queries, so summing it would understate the channel." },
          { q: "Why link clicks are named links only", a: "Short.io\u2019s headline figure this period is inflated by a burst of traffic from places with no plausible connection to the practice. Reporting only named links \u2014 the ones we created and can attribute \u2014 keeps the basis consistent across periods.", internalOnly: true },
          { q: "Why link clicks are named links only", a: "Only links we created and can attribute to a destination are counted, which keeps the figure consistent from period to period.", clientOnly: true },
          { q: "Where the Instagram totals come from", a: "Account-level figures from Metricool. Post-level figures rank content against content and are never summed into a total. The gap between the two runs two to three times." },
          { q: "Why podcast figures are trailing windows", a: "Buzzsprout does not offer custom date ranges in its export. The 147 and 14 are trailing 30-day and 7-day windows measured at the reporting cutoff, compared against the same windows at the previous cutoff." },
          { q: "What is missing this period", a: "No advertising ran, no email campaign went out, no podcast episode was published. Those channels are reported here rather than shown as empty views. Facebook is being posted to but is not currently measurable, so it is not reported.", internalOnly: true },
          { q: "What is missing this period", a: "No advertising ran, no email campaign went out, and no podcast episode was published. Those channels are reported here rather than shown as empty views.", clientOnly: true },
        ] as { q: string; a: string; internalOnly?: boolean; clientOnly?: boolean }[],
        note: "",
      },
    ],
  },
};
