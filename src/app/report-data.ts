/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers October 12 – 18 against October 5 – 11.

   STRUCTURE. page.tsx is server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Every trend value is the
     most recent reading of that week's export.

   COMPARISON COLUMN RESTATED. October 5 – 11 comes from exports re-pulled on
     October 20: Instagram interactions 132 against 118 as deployed and views
     6,626 against 6,619; search 518 impressions against 516, clicks unchanged
     at 58; website 454 sessions against 462, 393 new visitors against 391,
     Google 85 against 82. Short.io and Buzzsprout are not re-pulled: click
     logs do not settle, and podcast downloads are measured as the change in
     the lifetime counter between two readings.

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Oct 12 – 18 pulled Oct 19; Oct 5 – 11 re-pulled
                                      Oct 20
     Search Console                   Oct 12 – 18 pulled Oct 19; Oct 5 – 11 re-pulled
                                      Oct 20. No US filter on either export, so the
                                      US position is read from Countries.csv
     Website (GA4 via Looker Studio)  Oct 12 – 18 pulled Oct 19; Oct 5 – 11 re-pulled
                                      Oct 20
     Website sessions and engagement  native GA4 traffic acquisition, both weeks,
                                      same pulls. Looker reads 233 sessions against
                                      native 219 this week; native is authoritative
     Short links (Short.io)           Oct 12 – 18 pulled Oct 19; Oct 5 – 11 re-pulled
                                      Oct 20 to confirm the basis. Path view, All
                                      clicks, with the catch-all /* filtered out.
                                      Both weeks verified: listed paths sum to the
                                      export's Total clicks, not its Human clicks
     Podcast (Buzzsprout)             overview and agent reports pulled Oct 19
                                      against the Oct 12 baselines
     Email (Constant Contact)         no campaign sent Oct 5 – 18
     Trend history                    Sep 14 – 20 from the Sep 28 pulls; Sep 21 – 27
                                      from the Oct 5 pulls; Sep 28 – Oct 4 from the
                                      Oct 12 pulls; Oct 5 – 11 from the Oct 20
                                      re-pull; Oct 12 – 18 from the Oct 19 pulls
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
  period: "October 12 – 18, 2026",
  compared: "Compared with October 5 – 11",
  context: "October 12 – 18, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "October 12 – 18, 2026" },
    { k: "Compared with", v: "October 5 – 11, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in 4 points.",
    items: [
      {
        role: "Headline",
        text: "The branded search positions came back. edgard el chaar moved from 22.23 to 1.33 and dr el chaar from 19.71 to 4.89, taking the US average from 6.77 to 5.05. Search clicks 58 to 62 and the click rate 11.20% to 12.11%. Visits from Google 85 to 94. Instagram interactions 132 to 144 on reach per day of 381.",
        client: {
          role: "Headline",
          text: "The Hudson Yards carousel was the strongest piece of the week, reaching 906 people and drawing 74 responses. Visits from Google search rose to 94 against 85, and 63 of them engaged with the site.",
        },
      },
      {
        role: "What improved",
        text: "Instagram interactions 132 to 144 and reach per day 363 to 381, on 7 pieces against 9. Engagement rate 5.19% to 5.40%. The Hudson Yards carousel drew 74 interactions at 8.17%. Search click rate 11.20% to 12.11%, homepage link clicks 126 to 130. New users reaching the 404 page fell from 179 to 56.",
        client: {
          role: "What improved",
          text: "Searches for Dr. El Chaar by name are returning the site near the top again, and the click rate from Google rose to 12.11% from 11.20%. On Instagram, interactions rose to 144 and the account reached an average of 381 people a day. Clicks on the homepage link rose from 126 to 130.",
        },
      },
      {
        role: "What softened",
        text: "Booking link clicks 26 to 22. Instagram views 6,626 to 6,078 and accounts engaged 164 to 139: fewer people, each interacting more. Google visits engaged at 67.0% for 65.3 seconds, against 72.9% and 81.9. Podcast downloads 177 to 131, of which 124 came through web browsers and 7 through listening apps, against 13. No episode since September 30, now 3 weeks.",
        client: {
          role: "Where we are focusing",
          text: "The booking links are the next thing we want to move. Search is sending more people to the site than it did a week ago, so the work now is making the path from the site to a booking as short as possible.",
        },
      },
      {
        role: "Next action",
        text: "Record the branded-search recovery and keep watching it weekly. Review the booking links and where they sit on the page. Get an episode scheduled: 3 weeks dark. Check how Buzzsprout counts the web-browser downloads before reporting them as listeners.",
        client: {
          role: "What we are doing next",
          text: "We will keep building on the Hudson Yards and podcast content that earned the most attention this week, and review how people get from the site to a booking.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New visitors to the website each day, this week and the week before.",
    bandA: "Previous week · Oct 5 – 11",
    bandB: "This week · Oct 12 – 18",
    /* GA4 daily new visitors. This week pulled Oct 19; the previous week
       re-pulled Oct 20, where Oct 11 reads 24 against 22 as deployed.
       `shade` marks the previous week. */
    daily: [
      { d: "Oct 5", v: 40, shade: true },
      { d: "Oct 6", v: 94, shade: true },
      { d: "Oct 7", v: 73, shade: true },
      { d: "Oct 8", v: 72, shade: true },
      { d: "Oct 9", v: 59, shade: true },
      { d: "Oct 10", v: 31, shade: true },
      { d: "Oct 11", v: 24, shade: true },
      { d: "Oct 12", v: 26 },
      { d: "Oct 13", v: 38 },
      { d: "Oct 14", v: 25 },
      { d: "Oct 15", v: 30 },
      { d: "Oct 16", v: 22 },
      { d: "Oct 17", v: 13 },
      { d: "Oct 18", v: 18 },
    ],
    note:
      "172 new visitors against 393. Sessions 454 to 219, and almost all of the difference is one source: direct fell from 337 to 109 and aocr.org from 16 to none, while Google rose from 85 to 94. New users who reached the 404 page fell from 179 to 56, and landing pages from 76 to 27.",
    noteClient:
      "172 new visitors this week against 393. The fall tracks a drop in very short direct visits over the same week, shown in the next section. Visits from Google search went the other way, rising from 85 to 94.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* Native GA4 traffic acquisition, Oct 12 – 18. Other sources combines 6
       sources with 16 sessions and 10 engaged; its average time is weighted by
       sessions: (6×102.7 + 3×12.3 + 3×2.7 + 2×59.5 + 44 + 25) ÷ 16 = 53.
       aocr.org sent nothing this week and its row is removed rather than
       rendered empty. */
    rows: [
      { label: "Google search", sessions: 94, engaged: 63, seconds: 65 },
      { label: "Direct", sessions: 109, engaged: 17, seconds: 9 },
      { label: "Other sources", sessions: 16, engaged: 10, seconds: 53 },
    ],
    note:
      "Google 94 sessions at 67.0% engaged and 65.3 seconds, against 85, 72.9% and 81.9 the week before: more arrivals, 63 engaged against 62. Direct 109 with 17 engaged, 15.6%, averaging 8.7 seconds, against 337, 25 and 2.1 seconds. Both the count and the quality of direct traffic moved in the right direction. aocr.org sent none, against 16. Other sources: 6 sources, 16 sessions, 10 engaged.",
    noteClient:
      "Google search sent 94 visits this week against 85, and 63 of them engaged with the site. Direct visits fell from 337 to 109, and the ones that remained stayed four times longer on average.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Sep 14", "Sep 21", "Sep 28", "Oct 5", "Oct 12"],
    cols: [
      { label: "This week", sub: "Oct 12 – 18" },
      { label: "Previous week", sub: "Oct 5 – 11" },
    ],
    rows: [
      {
        k: "Average search position",
        note: "US searches only. Lower is better",
        group: "Search", fmt: "pos",
        trend: [4.16, 5.19, 4.74, 6.77, 5.05],
        cells: [{ v: "5.05", c: "from 6.77", dir: "up" }, { v: "6.77", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "Clicks from Google search results",
        group: "Search", fmt: "int",
        trend: [55, 52, 65, 58, 62],
        cells: [{ v: "62", c: "+6.9%", dir: "up" }, { v: "58", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        group: "Search", fmt: "pct",
        trend: [12.28, 11.43, 11.17, 11.20, 12.11],
        cells: [{ v: "12.11%", c: "+0.91 points", dir: "up" }, { v: "11.20%", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        group: "Search", fmt: "int",
        trend: [448, 455, 582, 518, 512],
        cells: [{ v: "512", c: "−1.2%", dir: "flat" }, { v: "518", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "67% of these visits engaged, against 73%. They averaged 65 seconds on the site, against 82",
        group: "Website", fmt: "int",
        trend: [91, 81, 103, 85, 94],
        cells: [{ v: "94", c: "+10.6%", dir: "up" }, { v: "85", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "Fewer very short direct visits than the week before. Visits from Google search rose over the same week",
        group: "Website", fmt: "int",
        trend: [434, 199, 290, 393, 172],
        cells: [{ v: "172", c: "−56.2%", dir: "down" }, { v: "393", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares",
        group: "Instagram", fmt: "int",
        trend: [24, 103, 224, 132, 144],
        cells: [{ v: "144", c: "+9.1%", dir: "up" }, { v: "132", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day",
        group: "Instagram", fmt: "int",
        trend: [92, 214, 527, 363, 381],
        cells: [{ v: "381", c: "+5.0%", dir: "up" }, { v: "363", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach",
        group: "Instagram", fmt: "pct",
        trend: [3.73, 6.88, 6.07, 5.19, 5.40],
        cells: [{ v: "5.40%", c: "+0.21 points", dir: "up" }, { v: "5.19%", c: "", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "Metricool’s account total, not a sum of the individual pieces",
        group: "Instagram", fmt: "int",
        trend: [3208, 5527, 8526, 6626, 6078],
        cells: [{ v: "6,078", c: "−8.3%", dir: "down" }, { v: "6,626", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Metricool’s account total at the end of each week",
        group: "Instagram", fmt: "int",
        trend: [3221, 3235, 3251, 3257, 3264],
        cells: [{ v: "3,264", c: "+7", dir: "up" }, { v: "3,257", c: "+6", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        group: "Booking links", fmt: "int",
        trend: [144, 99, 106, 126, 130],
        cells: [{ v: "130", c: "+3.2%", dir: "up" }, { v: "126", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 13 and Upper East Side 9, against 15 and 11",
        group: "Booking links", fmt: "int",
        trend: [32, 22, 37, 26, 22],
        cells: [{ v: "22", c: "−15.4%", dir: "down" }, { v: "26", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "Most came through web browsers. Listening apps added 7, against 13",
        group: "Podcast", fmt: "int",
        trend: [24, 11, 69, 177, 131],
        cells: [{ v: "131", c: "−26.0%", dir: "down" }, { v: "177", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The Hudson Yards carousel led the week: 2,340 views, 906 reach and 74 of the week’s 144 interactions, at 8.17% engagement. The microgrooving reel took the widest reach at 1,140.",
    ledeClient: "The Hudson Yards event and the podcast conversation produced the week’s two best pieces.",
    hero: {
      url: "https://www.instagram.com/p/DehsxlCGYTA/",
      title: "A few more moments from our day at Hudson Yards",
      date: "October 15",
      format: "Carousel",
      stats: [
        { v: "2,340", l: "Views" },
        { v: "906", l: "Reach" },
        { v: "74", l: "Interactions" },
        { v: "8.17%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the week on views, interactions and engagement rate. It drew 74 of the week’s 144 interactions: 64 likes, 5 comments and 5 shares. Its 8.17% engagement is the highest since September 30, and it earned that rate on 906 reach rather than a small audience.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/reel/DeZuEwUTIQY/",
        title: "Not all microgrooving is created equal",
        date: "October 14", format: "Reel", views: 1672, reach: 1140, interactions: 62,
      },
    ],
    galleryNote:
      "The reel published October 12 – 18, continuing the conversation with Mélissa M. Seif from the podcast episode. It reached 1,140 accounts, the widest of any piece this week, and was reposted 9 times. A second carousel on October 16, about hygiene visits, reached 193. 4 Stories went out alongside them. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for October 12 – 18 from the Metricool export, in the
     social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "Instagram reached an average of 381 accounts a day, up from 363, and interactions rose to 144 from 132. The account added 7 followers to reach 3,264.",
      "The Hudson Yards event gave the account its strongest piece. The carousel drew 2,340 views, reached 906 accounts and generated 74 interactions at 8.17% engagement, the highest rate since September 30 and earned on a much wider audience.",
      "The reel continuing the conversation with Mélissa M. Seif reached 1,140 accounts, the widest of any piece this week, and was reposted 9 times. Engagement rate across the account was 5.40% against 5.19%.",
    ],
    takeaway:
      "Event coverage and the podcast conversation are both earning strong responses, and the people-led angle is what connects them. We’ll keep the weekly mix of reels, Stories and feed posts, and build on the topics drawing the most engagement.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "6 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Resolved",
        title: "The branded search positions came back",
        body:
          "edgard el chaar: 1.33 on 21 impressions, against 22.23 on 22 last week. dr el chaar: 4.89 on 28, against 19.71 on 38. edgar el chaar drew 8 clicks at 1.33 and dr el chaar nyc 3 at 1.33. The homepage sits at 3.79 against 6.08, desktop at 8.48 against 9.62, both read from the October 20 re-pull. US average 5.05 against 6.77. No change was made on our side, so the cause of both the drop and the recovery is still unknown. Worth a weekly check on these 2 queries rather than treating it as closed.",
      },
      {
        tag: "Resolved",
        title: "Direct traffic and the 404 page both cleared, and it is not a filter artifact",
        body:
          "Direct 109 sessions with 17 engaged, 15.6%, averaging 8.7 seconds, against 337, 25 and 2.1. New users reaching the 404 page fell from 179 to 56, landing pages from 76 to 27, and /dental-service/test-service is gone. The GA4 filter was never applied, and the check that proves it is the re-pull: October 5 – 11 re-read on October 20 returns 337 direct sessions against the 336 first reported. A filter would have cut that figure, not left it flat. Both weeks are on the same basis, so the fall is real traffic leaving rather than a measurement change.",
      },
      {
        tag: "Real gap",
        title: "Booking clicks fell a third week while every other signal rose",
        body:
          "Booking 22 against 26: Midtown 13 and Upper East Side 9, against 15 and 11. Over 3 weeks: 37, 26, 22. Both columns were confirmed against a re-pull on October 20, which reproduced 126, 15 and 11 for the previous week exactly, so the decline is real and not a basis artifact. Homepage clicks went the other way, 126 to 130, and the named-link total 152 to 156. Visits from Google rose 85 to 94 over the same week, so more people are arriving and fewer are reaching the booking step. This is the clearest commercial gap in the report. Check where the booking links sit on the page, that both resolve, and whether anything in that path changed.",
      },
      {
        tag: "Note",
        title: "Fewer accounts engaged, each interacting more",
        body:
          "Accounts engaged 139 against 164, down 15.2%, while interactions rose 132 to 144 and reach per day 363 to 381. 7 pieces went out against 9. The Hudson Yards carousel carried 74 of the 144 interactions on 906 reach. Concentration rather than decline, but worth watching whether it holds next week.",
      },
      {
        tag: "Measurement",
        title: "Podcast still almost entirely web browser, and 3 weeks without an episode",
        body:
          "Lifetime downloads rose 131, from 5,530 to 5,661. Buzzsprout’s app report puts 124 of the rise on Web Browser; every other app added 7, against 13 the week before. The September 30 episode reads 23 in total, up 6. Buzzsprout’s dashboard and its per-episode export disagree again: the dashboard reads 87 for 7 days against 125 in the export, and 389 and 751 for 30 and 90 days against 390 and 759. The export is used here, as before.",
      },
      {
        tag: "Note",
        title: "Last week restated, and followers disagree a third time",
        body:
          "October 5 – 11 re-read on October 20: Instagram interactions 132 against 118 as deployed, views 6,626 against 6,619, engagement rate 5.19% against 4.64%. The guest clip reads 2,061 views, 1,406 reach and 83 interactions against 1,948, 1,362 and 77. Search 518 impressions against 516, clicks unchanged at 58, position unchanged at 6.77. Website 454 sessions against 462, 393 new visitors against 391, Google 85 against 82. Separately, the account total rose by 7, from 3,257 to 3,264, while Metricool reports 8 acquired and 0 lost. This report uses the account total, as before.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "4 things worth carrying into the next report.",
    items: [
      {
        title: "The branded searches recovered as quickly as they slipped",
        body: "edgard el chaar 22.23 to 1.33 and dr el chaar 19.71 to 4.89 in a single week, taking the US average from 6.77 to 5.05. Nothing was changed on our side either week.",
        client: {
          title: "The practice is back at the top for its own name",
          body: "The most common spelling of Dr. El Chaar’s name now returns the site at position 1.33, against 22.23 the week before. The overall US average improved to 5.05 from 6.77.",
        },
      },
      {
        title: "A carousel outperformed the reel",
        body: "The Hudson Yards carousel took 2,340 views and 74 interactions at 8.17% against the reel’s 1,672 and 62 at 5.44%. The reel still took the widest reach, 1,140 against 906.",
        client: {
          title: "The event carousel drew the strongest response",
          body: "The Hudson Yards carousel reached an engagement rate of 8.17% on 906 people, the strongest combination of reach and response in several weeks.",
        },
      },
      {
        title: "Search sent more people on fewer impressions",
        body: "62 clicks on 512 impressions against 58 on 518. The click rate carried the gain, 11.20% to 12.11%, and visits from Google rose 85 to 94.",
        client: {
          title: "More people clicked through from Google",
          body: "The site was shown about as often as the week before but drew more clicks, lifting the click rate from 11.20% to 12.11%.",
        },
      },
      {
        title: "Last week’s figures moved most on Instagram interactions",
        body: "Re-reading October 5 – 11 on October 20 moved interactions 118 to 132, a 12% gain, while search clicks and position did not move at all. Instagram is the only channel where the re-pull changes a conclusion.",
        client: {
          title: "Instagram figures keep settling after publication",
          body: "Instagram posts gather responses for days after they go out, so last week’s interactions now read 132 against the 118 first reported. Search and website figures barely moved.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Review the path from the site to a booking",
        owner: "Figment",
        metric: "Booking clicks above 26 next week",
        body: "3 weeks of decline, 37 to 26 to 22, confirmed on a matched basis after the October 20 re-pull, while visits from Google rose 85 to 94 and homepage link clicks 126 to 130. More people arriving, fewer reaching the booking step. Check where the booking links sit on the page, that both resolve, and whether anything in that path changed.",
      },
      {
        action: "Get a podcast episode scheduled",
        owner: "Practice · Figment to schedule",
        metric: "One episode published before the next report",
        body: "Nothing since September 30, now 3 weeks. Downloads 177 to 131, and listening apps 13 to 7. The September 30 episode is still gathering at 6 a week, so the catalog is working; there is just nothing new on it.",
      },
      {
        action: "Keep the 2 branded queries on a weekly check",
        owner: "Figment",
        metric: "edgard el chaar and dr el chaar holding under position 3",
        body: "Both recovered without any change on our side, which means the cause of the original drop is still unknown and could return. A weekly look at these 2 queries costs nothing and catches it early.",
      },
      {
        action: "Ask Buzzsprout about the web-browser downloads",
        owner: "Figment",
        metric: "A clear count of listening-app downloads for the weekly report",
        body: "124 of 131 new downloads came through Web Browser. Listening apps added 7, against 13. Third week carrying this, and it decides whether the headline download figure means listeners.",
      },
      {
        action: "Tag the 5 EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Booking clicks that carry UTM parameters in Short.io’s UTM Medium report",
        body: "The city breakdown this week covers all paths rather than named links only, so it cannot be compared with last week’s. The Dalles and one unnamed geoname ID account for 423 of 532 city-attributed clicks. A UTM filter isolates real clicks directly and ends the basis problem.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Build on the event and podcast content",
        body: "The Hudson Yards carousel and the reel from the podcast conversation were the 2 strongest pieces of the week. We will keep developing the topics and formats drawing the most response.",
      },
      {
        action: "Review how people get from the site to a booking",
        body: "More people are arriving from Google search than a week ago. We want the path from the site to a booking to be as short and clear as possible, so we are reviewing where those links sit.",
      },
      {
        action: "Publish a new podcast episode",
        body: "The last episode went out September 30 and is still being downloaded each week. A new one gives both the podcast and the feed something fresh to work with.",
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
          ["Interactions", "144 · from 132"],
          ["Reach per day", "381 · from 363"],
          ["Engagement rate", "5.40% · from 5.19%"],
          ["Views", "6,078 · from 6,626"],
          ["Accounts engaged", "139 · from 164"],
          ["Followers", "3,264 · up 7 · from 3,257"],
          ["Feed posts", "2 · 2,784 views · 550 average reach · 82 interactions"],
          ["Reels", "1 · 1,672 views · 1,140 reach · 62 interactions"],
          ["Reels, week before", "2 · 3,270 views · 1,062 average reach · 132 interactions"],
          ["Stories", "4 · 330 impressions · 81 average reach · from 7, 509 and 70"],
          ["Published", "2 feed posts · 1 reel · 4 Stories"],
        ],
        note:
          "Account totals are Metricool’s account-level figures. Engagement rate is interactions on posts and reels divided by average reach per day times 7: 144 against 2,667 this week and 132 against 2,541 the week before. The week before is restated from the October 20 re-pull, where interactions read 132 against the 118 first reported. The mix inverted: 2 feed posts and 1 reel this week, against 0 and 2. Followers: account total up 7, while Metricool reports 8 acquired and 0 lost; this report uses the account total. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures. Engagement rate is interactions divided by reach. Figures for the week before were re-read this week and include responses that arrived after last week’s report. No paid advertising ran in either week.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Homepage link", "130 · from 126"],
          ["Booking · Midtown", "13 · from 15"],
          ["Booking · Upper East Side", "9 · from 11"],
          ["Booking total", "22 · from 26"],
          ["Other named links", "4 · from 0"],
          ["Named links total", "156 · from 152"],
        ],
        note: "Taken from Short.io’s Path view with the catch-all /* filtered out, so only named links are counted, and on the All rather than Human setting. Both weeks were confirmed on that basis: October 5 – 11 was re-pulled on October 20 and returns 126, 15 and 11, reproducing the published figures exactly. The test is that the listed paths sum to the export’s Total clicks rather than its Human clicks, 152 for the previous week and 156 for this one. The city breakdown this week covers all paths rather than named links only: The Dalles and one unnamed geoname ID account for 423 of 532 city-attributed clicks. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. Some clicks come from automated traffic.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Average position", "5.05 · from 6.77 · US only"],
          ["Clicks", "62 · from 58"],
          ["Click rate", "12.11% · from 11.20%"],
          ["Impressions", "512 · from 518"],
          ["edgard el chaar", "position 1.33 · from 22.23"],
          ["dr el chaar", "position 4.89 · from 19.71"],
          ["Desktop", "34 clicks · 223 impressions · position 8.48 · all searches"],
          ["Mobile", "27 clicks · 283 impressions · position 4.12 · all searches"],
          ["Homepage", "48 clicks · 392 impressions · position 3.79"],
          ["Our Doctors", "12 clicks · 310 impressions · position 4.86"],
          ["Locations", "7 clicks · 212 impressions · position 3.58"],
          ["About", "0 clicks · 151 impressions · position 3.11"],
          ["Dental Services", "0 clicks · 131 impressions · position 2.72"],
        ],
        note:
          "Totals come from Search Console’s daily export. The headline average position is weighted by impressions and filtered to US searches; device positions cover all searches. Neither export carried a US filter, so the US position is read from Countries.csv: 56 clicks on 437 impressions at 5.05. Tablets drew 1 click on 6 impressions. The query export withholds 63% of clicks and 66% of impressions as low-volume, so query-level figures are a sample and are never summed into a total. October 5 – 11 re-pulled October 20: impressions 518 against 516, clicks and position unchanged.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Visits from Google search", "94 · from 85"],
          ["Google visitors engaged", "67.0% · 65 seconds average · from 72.9% and 82 seconds"],
          ["Sessions", "219 · from 454"],
          ["New visitors", "172 · from 393"],
          ["Direct visits", "109 · from 337"],
          ["Direct visitors engaged", "15.6% · 9 seconds average · from 7.4% and 2 seconds"],
          ["Landing pages", "27 · from 76"],
          ["Homepage landings", "241 · from 278"],
          ["Our Doctors landings", "42 · from 60"],
          ["Desktop / mobile", "74% / 25% · from 88% / 11%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property. Looker Studio reads 233 sessions against native 219 this week, where the two matched last week; native is authoritative and the gap is flagged rather than reconciled. New users reaching the 404 page fell from 179 to 56. New visitors, landing pages, devices and page titles come from Looker Studio. October 5 – 11 re-pulled October 20: 454 sessions against 462, 393 new visitors against 391, Google 85 against 82, direct 337 against 336. Mobile active users are identical in both weeks at 47, so the whole fall in traffic is desktop. Landing pages are counted without blank and (not set) rows. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of website interest, at 94 against 85. The fall in the overall total is almost entirely direct visits, which dropped from 337 to 109, and the ones that remained stayed considerably longer.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["This week", "No campaign sent"],
          ["Previous week", "No campaign sent"],
        ],
        note: "No campaign went to the EEC list October 5 – 18. The most recent, RH 2.0, went September 12. No Constant Contact referral sessions appear in GA4 this week, against 4 the week before.",
        noteClient: "No email campaign was sent this week or the week before. The most recent was sent September 12.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "131"],
          ["Through listening apps", "7 · from 13"],
          ["Through web browsers", "124 · from 164"],
          ["The week before", "177"],
          ["Last 30 days", "390"],
          ["Last 90 days", "759"],
          ["Lifetime downloads", "5,661"],
          ["Episodes published", "51"],
          ["Most recent episode", "September 30 · Biology Always Wins · 23 downloads"],
          ["New York share", "525 of 5,655 located downloads · 9.3%"],
        ],
        note:
          "This week’s 131 is lifetime downloads rising from 5,530 on October 12 to 5,661 on October 19, the same method as previous weeks, which is also why this figure is never re-pulled. The split by app comes from Buzzsprout’s app report, which counts located downloads: Web Browser rose 124 and every other app 7, against 164 and 13 the week before. 30 and 90 days come from the per-episode export, 390 and 759; Buzzsprout’s dashboard read 87 for 7 days, 389 for 30 and 751 for 90 the same morning. No episode has been published since September 30, now 3 weeks.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. Most of this week’s downloads came through web browsers; listening apps such as Apple Podcasts and Spotify added 7. The most recent episode went out September 30 and is still being downloaded each week.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "October 12 to 18, 2026, 7 full days, Monday to Sunday, compared with October 5 to 11. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from September 14 to 20 through this week, using the most recent reading of each week. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Instagram, search and website figures for October 5 to 11 were all read again on October 20. Instagram posts keep gathering responses for days after they go out, which moved last week’s interactions from 118 to 132; search and website figures moved very little. Short link clicks and podcast downloads are not re-read, because click logs are written at the moment of the click and podcast downloads are measured as the change in a lifetime counter between two readings." },
          { q: "How engagement rate is calculated", a: "Interactions divided by reach, meaning the share of people who saw something and responded to it. It is not calculated against follower count, which would make the figure look higher than it is." },
          { q: "What counts as an engaged visit", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No paid advertising ran in either week. No email campaign was sent in either week. Facebook is not reported: the page published nothing in either week, and the metric behind Meta’s post views was retired in June 2026." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
