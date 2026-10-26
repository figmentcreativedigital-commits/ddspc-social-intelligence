/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers October 19 – 25 against October 12 – 18.

   STRUCTURE. page.tsx is server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Every trend value is the
     most recent reading of that week's export.

   COMPARISON COLUMN RESTATED. October 12 – 18 comes from exports re-pulled on
     October 26: Instagram interactions 157 against 144 as deployed and views
     6,083 against 6,078; the Hudson Yards carousel now reads 2,574 views, 990
     reach and 81 interactions against 2,340, 906 and 74. Native GA4 sessions
     233 against 219, Google 99 against 94, direct 117 against 109 — the figure
     Looker already carried a week ago. New visitors unchanged at 172. Search
     unchanged. Short.io and Buzzsprout are not re-pulled: click logs do not
     settle, and podcast downloads are measured as the change in the lifetime
     counter between two readings.

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Oct 19 – 25 and Oct 12 – 18, both pulled Oct 26
     Search Console                   Oct 19 – 25 and Oct 12 – 18, both pulled Oct 26.
                                      No US filter on either export, so the US
                                      position is read from Countries.csv
     Website (GA4 via Looker Studio)  both weeks, pulled Oct 26
     Website sessions and engagement  native GA4 traffic acquisition, both weeks,
                                      pulled Oct 26
     Short links (Short.io)           Oct 19 – 25, pulled Oct 26. Path view, All
                                      clicks, with the catch-all /* filtered out.
                                      Read from the Path PDF: this cycle's xlsx
                                      exports all defaulted back to the Human
                                      setting with /* included, which is not
                                      comparable. Verified by the listed paths
                                      summing to the export's Total clicks, 182
     Podcast (Buzzsprout)             overview and agent reports pulled Oct 26
                                      against the Oct 19 baselines
     Email (Constant Contact)         2 campaigns sent Oct 19 – 25, the first since
                                      September 12
     Trend history                    Sep 21 – 27 from the Oct 5 pulls; Sep 28 – Oct 4
                                      from the Oct 12 pulls; Oct 5 – 11 from the
                                      Oct 20 re-pull; Oct 12 – 18 from the Oct 26
                                      re-pull; Oct 19 – 25 from the Oct 26 pulls
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
  period: "October 19 – 25, 2026",
  compared: "Compared with October 12 – 18",
  context: "October 19 – 25, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "October 19 – 25, 2026" },
    { k: "Compared with", v: "October 12 – 18, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in 4 points.",
    items: [
      {
        role: "Headline",
        text: "Booking link clicks 22 to 26, ending 2 weeks of decline, and homepage link clicks 130 to 155. Email returned after 5 weeks: 2 campaigns, 3,442 sends, 360 confirmed opens against 1,578 including proxy, and 85 clicks at a rate 1.9 points above the last 10 campaigns. Website sessions 233 to 345: direct rose 117 to 241 while Google fell 99 to 83, so the whole increase and more is direct, which is where untagged email clicks land. Search clicks 62 to 52 and Instagram interactions 157 to 29 on 5 pieces against 7.",
        client: {
          role: "Headline",
          text: "Booking link clicks rose to 26 from 22, the first increase in 3 weeks, and clicks on the homepage link rose to 155 from 130. The National Dental Hygiene Month email drew 85 clicks, a higher click rate than any of the last 10 campaigns, and the website was the most-clicked link in it.",
        },
      },
      {
        role: "What improved",
        text: "Booking 22 to 26: Midtown 13 to 14, Upper East Side 9 to 12. Named link clicks 156 to 182. Website sessions 233 to 345 and new visitors 172 to 294. Direct engaged 14.5% to 19.9%. Google visitors engaged 65.7% to 71.1%. Followers 3,264 to 3,267.",
        client: {
          role: "What improved",
          text: "More people reached the booking step: 26 clicks against 22, with the Upper East Side link rising from 9 to 12. Website visits rose to 345 from 233, and a larger share of people who arrived engaged with the site.",
        },
      },
      {
        role: "What softened",
        text: "Search clicks 62 to 52 and impressions 512 to 466; click rate 12.11% to 11.16%, US position 5.05 to 5.25. dr el chaar slipped to 10.33 from 4.89 while edgard el chaar held at 1.42. Visits from Google 99 to 83, averaging 33.6 seconds against 62.1. Instagram interactions 29 against 157, reach per day 136 against 381, on 5 pieces against 7. Podcast downloads 131 to 77, listening apps 7 to 4.",
        client: {
          role: "Where we are focusing",
          text: "The National Dental Hygiene Month reel was the week’s strongest piece, reaching 305 people on the same theme the email carried. The coming weeks build on that and on the doctor-led topics drawing the strongest response.",
        },
      },
      {
        role: "Next action",
        text: "Tag the email and short links with UTM parameters: 85 email clicks produced 7 attributable sessions, and the rest are inside a direct figure that doubled. Clean the list before the next send, still bouncing at 12%. Watch dr el chaar weekly. Get a podcast episode scheduled, 3 report weeks without one.",
        client: {
          role: "What we are doing next",
          text: "We will add tracking to the email and short links so campaign traffic can be measured properly, and build the Instagram schedule back up around the content drawing the strongest response.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New visitors to the website each day, this week and the week before.",
    bandA: "Previous week · Oct 12 – 18",
    bandB: "This week · Oct 19 – 25",
    /* GA4 daily new visitors, both weeks pulled Oct 26. The previous week is
       unchanged on re-read at 172. `shade` marks the previous week. */
    daily: [
      { d: "Oct 12", v: 26, shade: true },
      { d: "Oct 13", v: 38, shade: true },
      { d: "Oct 14", v: 25, shade: true },
      { d: "Oct 15", v: 30, shade: true },
      { d: "Oct 16", v: 22, shade: true },
      { d: "Oct 17", v: 13, shade: true },
      { d: "Oct 18", v: 18, shade: true },
      { d: "Oct 19", v: 96 },
      { d: "Oct 20", v: 36 },
      { d: "Oct 21", v: 31 },
      { d: "Oct 22", v: 63 },
      { d: "Oct 23", v: 26 },
      { d: "Oct 24", v: 22 },
      { d: "Oct 25", v: 20 },
    ],
    note:
      "294 new visitors against 172, and 96 of them landed on October 19, the day the National Dental Hygiene Month email went out. Sessions 233 to 345: direct 117 to 241, while Google fell 99 to 83. Constant Contact referrals account for only 7 sessions against 85 recorded email clicks, so most of that campaign traffic is inside the direct figure. New users reaching the 404 page rose 56 to 106 and landing pages 27 to 54.",
    noteClient:
      "294 new visitors this week against 172. The busiest day was October 19, when the National Dental Hygiene Month email went out, and October 22 was the next busiest.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* Native GA4 traffic acquisition, Oct 19 – 25. Other sources combines 11
       sources with 21 sessions and 9 engaged; its average time is weighted by
       sessions: (5×38.4 + 5×5.8 + 43 + 3 + 2 + 47 + 52 + 162) ÷ 21 = 25.
       7 of those sessions came from Constant Contact domains. */
    rows: [
      { label: "Direct", sessions: 241, engaged: 48, seconds: 13 },
      { label: "Google search", sessions: 83, engaged: 59, seconds: 34 },
      { label: "Other sources", sessions: 21, engaged: 9, seconds: 25 },
    ],
    note:
      "Direct 241 sessions with 48 engaged, 19.9%, averaging 12.6 seconds, against 117, 17 and 8.1 the week before: more of it, and a higher share engaging. The October 19 email is the likeliest source, since its links carry no tracking and land here rather than as a referral. Google 83 at 71.1% engaged, up from 65.7%, but 33.6 seconds against 62.1. Other sources: 11 sources, 21 sessions, 9 engaged, 7 of them from Constant Contact domains.",
    noteClient:
      "Direct visits were the largest group at 241, and a fifth of them engaged with the site, up from a seventh the week before. Google search sent 83 visits and 59 of them engaged, a little over 7 in 10.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Sep 21", "Sep 28", "Oct 5", "Oct 12", "Oct 19"],
    cols: [
      { label: "This week", sub: "Oct 19 – 25" },
      { label: "Previous week", sub: "Oct 12 – 18" },
    ],
    rows: [
      {
        k: "Booking link clicks",
        note: "Midtown 14 and Upper East Side 12, against 13 and 9",
        group: "Booking links", fmt: "int",
        trend: [22, 37, 26, 22, 26],
        cells: [{ v: "26", c: "+18.2%", dir: "up" }, { v: "22", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        group: "Booking links", fmt: "int",
        trend: [99, 106, 126, 130, 155],
        cells: [{ v: "155", c: "+19.2%", dir: "up" }, { v: "130", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "96 of them arrived on October 19, the day the email went out",
        group: "Website", fmt: "int",
        trend: [199, 290, 393, 172, 294],
        cells: [{ v: "294", c: "+70.9%", dir: "up" }, { v: "172", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "71% of these visits engaged, against 66%",
        group: "Website", fmt: "int",
        trend: [81, 103, 85, 99, 83],
        cells: [{ v: "83", c: "−16.2%", dir: "down" }, { v: "99", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "US searches only. Lower is better",
        group: "Search", fmt: "pos",
        trend: [5.19, 4.74, 6.77, 5.05, 5.25],
        cells: [{ v: "5.25", c: "from 5.05", dir: "down" }, { v: "5.05", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "Clicks from Google search results",
        group: "Search", fmt: "int",
        trend: [52, 65, 58, 62, 52],
        cells: [{ v: "52", c: "−16.1%", dir: "down" }, { v: "62", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        group: "Search", fmt: "pct",
        trend: [11.43, 11.17, 11.20, 12.11, 11.16],
        cells: [{ v: "11.16%", c: "−0.95 points", dir: "down" }, { v: "12.11%", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        group: "Search", fmt: "int",
        trend: [455, 582, 518, 512, 466],
        cells: [{ v: "466", c: "−9.0%", dir: "down" }, { v: "512", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "Metricool’s account total at the end of each week",
        group: "Instagram", fmt: "int",
        trend: [3235, 3251, 3257, 3264, 3267],
        cells: [{ v: "3,267", c: "+3", dir: "up" }, { v: "3,264", c: "+7", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares",
        group: "Instagram", fmt: "int",
        trend: [103, 224, 132, 157, 29],
        cells: [{ v: "29", c: "−81.5%", dir: "down" }, { v: "157", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day",
        group: "Instagram", fmt: "int",
        trend: [214, 527, 363, 381, 136],
        cells: [{ v: "136", c: "−64.3%", dir: "down" }, { v: "381", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by the week’s total reach",
        group: "Instagram", fmt: "pct",
        trend: [6.88, 6.07, 5.19, 5.89, 3.05],
        cells: [{ v: "3.05%", c: "−2.84 points", dir: "down" }, { v: "5.89%", c: "", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "Metricool’s account total, not a sum of the individual pieces",
        group: "Instagram", fmt: "int",
        trend: [5527, 8526, 6626, 6083, 2940],
        cells: [{ v: "2,940", c: "−51.7%", dir: "down" }, { v: "6,083", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "Most came through web browsers. Listening apps added 4, against 7",
        group: "Podcast", fmt: "int",
        trend: [11, 69, 177, 131, 77],
        cells: [{ v: "77", c: "−41.2%", dir: "down" }, { v: "131", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The National Dental Hygiene Month reel reached the most people, 305 against 234, and drew 15 of the week’s 29 interactions. The orthodontics carousel took more views, 578 against 437, on narrower reach.",
    ledeClient: "The reel marking National Dental Hygiene Month reached the most people this week. The orthodontics carousel drew more views on a narrower audience.",
    hero: {
      url: "https://www.instagram.com/reel/De1uSW_Tiey/",
      title: "Great care starts with the people providing it",
      date: "October 23",
      format: "Reel",
      stats: [
        { v: "437", l: "Views" },
        { v: "305", l: "Reach" },
        { v: "15", l: "Interactions" },
        { v: "4.92%", l: "Engagement" },
      ],
      why:
        "The widest-reaching piece of the week at 305 accounts, and the one that drew the most responses: 13 likes and 2 shares. The orthodontics carousel took more views, 578 against 437, but reached fewer people. The reel ran alongside the National Dental Hygiene Month email, which went to 3,403 people the same week, so the theme carried across both channels.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/p/Deul06zmWpb/",
        title: "Orthodontics has come a long way",
        date: "October 20", format: "Carousel", views: 578, reach: 234, interactions: 14,
      },
    ],
    galleryNote:
      "The week’s feed post, tracing orthodontics from early wires and metal bands to modern brackets. 3 Stories went out alongside them. A post shared with NYC Dental Smiles on October 21, about the Modern Luxury feature on the mouth-body connection, also carried the practice. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for October 19 – 25 from the Metricool export, in the
     social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "The account reached an average of 136 accounts a day and added 3 followers to reach 3,267. National Dental Hygiene Month gave the week its theme across both Instagram and email.",
      "The National Dental Hygiene Month reel was the week’s strongest piece, reaching 305 accounts and drawing 15 interactions. It ran alongside the email on the same theme, which went to 3,403 people.",
      "A post shared with NYC Dental Smiles on October 21 carried the Modern Luxury feature on the connection between oral health and whole-body wellness, extending the practice’s reach through a partner account.",
    ],
    takeaway:
      "Themed weeks give the content a clear spine, and running the reel alongside the email on the same subject is worth repeating. The focus for the coming weeks is building the publishing schedule back up around the doctor-led and patient-focused topics that have drawn the strongest response.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "6 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Resolved",
        title: "Booking clicks rose, ending the 2-week decline",
        body:
          "Booking 26 against 22: Midtown 14 against 13, Upper East Side 12 against 9. Over 4 weeks: 37, 26, 22, 26. Homepage link clicks 130 to 155 and the named-link total 156 to 182. This came in the week the National Dental Hygiene Month email went out, so the email is the most likely driver and the next 2 weeks will show whether it holds without one.",
      },
      {
        tag: "Real gap",
        title: "85 email clicks produced 7 attributable sessions",
        body:
          "The October 19 campaign recorded 85 clicks. GA4 shows 7 sessions from Constant Contact domains that week. Direct sessions doubled over the same period, 117 to 241, with 96 new visitors on October 19 alone, so most of that traffic is sitting inside the direct figure without attribution. The same gap applies to the short links, none of which carry UTM parameters. Tagging both ends it and is the single highest-value fix available this cycle.",
      },
      {
        tag: "Real gap",
        title: "The email list is still bouncing at 12%",
        body:
          "421 of 3,403 sends on the October 19 campaign did not deliver, 12.4%, unchanged from the 12.1% on the August 1 send. 353 confirmed opens and 85 clicks on 2,982 delivered; the headline 1,557 is 1,204 proxy opens on top of that. The smaller October 21 send, 39 addresses, bounced 2. This has now been carried for 4 cycles. Clean the list before the next send or the comparison keeps running on a shrinking real base.",
      },
      {
        tag: "Real gap",
        title: "dr el chaar slipped while edgard el chaar held",
        body:
          "dr el chaar: position 10.33 on 30 impressions, against 4.89 on 28 last week. edgard el chaar held at 1.42 on 19 impressions and drew 8 clicks. dr el chaar nyc sits at 1.38, edgar el chaar at 1.4, dr edgard el chaar at 1.44. One query moving while its near-duplicates hold is the same pattern as 2 weeks ago, when the drop and the recovery both went unexplained. Keep the weekly check.",
      },
      {
        tag: "Measurement",
        title: "Short.io exports defaulted back to the Human setting",
        body:
          "All 3 xlsx exports for this week came through on the Human setting with /* included, reading / 88, Midtown 6 and Upper East Side 5. On that basis booking clicks would read as a fall rather than a rise. The correct figures were taken from the Path PDF: / 155, Midtown 14, Upper East Side 12, /ddspc 1, summing to 182, which the dashboard confirms as Total clicks. Check the signature every cycle: the listed paths must sum to Total clicks, not Human clicks.",
      },
      {
        tag: "Note",
        title: "Last week restated, and followers disagree a fourth time",
        body:
          "October 12 – 18 re-read on October 26: Instagram interactions 157 against 144 as deployed, views 6,083 against 6,078, engagement rate 5.89% against 5.40%. The Hudson Yards carousel now reads 2,574 views, 990 reach and 81 interactions against 2,340, 906 and 74. Native GA4 sessions 233 against 219, Google 99 against 94, direct 117 against 109 — the figures Looker already carried a week ago, so the native export settles upward over about a week. Search and new visitors unchanged. Separately, the account total rose by 3 while Metricool reports 8 acquired and 4 lost. This report uses the account total, as before.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "4 things worth carrying into the next report.",
    items: [
      {
        title: "Booking clicks moved in the week the email went out",
        body: "26 against 22, ending 2 weeks of decline, alongside homepage link clicks 130 to 155. The email reached 2,982 delivered addresses on October 19 and the website recorded its busiest day of the month the same day.",
        client: {
          title: "More people reached the booking step",
          body: "Booking link clicks rose to 26 from 22, the first increase in 3 weeks, in the same week the National Dental Hygiene Month email went out.",
        },
      },
      {
        title: "Untagged links are hiding the email’s effect",
        body: "85 recorded email clicks, 7 attributable sessions. Direct doubled to 241 in the same week. Without UTM parameters the campaign cannot be credited with the traffic it almost certainly produced.",
        client: {
          title: "Email traffic is arriving without a label",
          body: "The email recorded 85 clicks, but only 7 visits could be traced back to it because the links carry no tracking. We are adding that so the next campaign can be measured properly.",
        },
      },
      {
        title: "Running the reel and the email on one theme worked",
        body: "National Dental Hygiene Month carried both the October 23 reel, the week’s widest-reaching piece at 305, and the October 19 email to 3,403 addresses. The themed week is the clearest structure the content has had.",
        client: {
          title: "A single theme across two channels",
          body: "National Dental Hygiene Month ran across both the email and the week’s best-performing reel. Pairing a theme across channels is something we want to repeat.",
        },
      },
      {
        title: "The native GA4 export settles upward for about a week",
        body: "October 12 – 18 sessions re-read at 233 against the 219 first reported, matching what Looker already showed a week ago. Where the two disagree on a fresh pull, Looker is closer to the settled figure.",
        client: {
          title: "Figures keep settling after publication",
          body: "Website and Instagram figures continue to be counted for several days after a week closes, so last week’s numbers read slightly higher now than when first reported.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Tag the email links and the EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Next campaign's clicks appearing as attributable sessions rather than direct",
        body: "85 email clicks produced 7 attributable sessions while direct doubled to 241. The campaign almost certainly earned that traffic and cannot be credited with it. Tagging the email links and the short links gives both a source GA4 can read, independently of which clicks Short.io itself counts. Highest-value fix available this cycle.",
      },
      {
        action: "Clean the email list before the next send",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next campaign",
        body: "421 of 3,403 did not deliver on October 19, 12.4%, against 12.1% on August 1. Carried for 4 cycles now. Every open and click rate in the report is calculated on delivered mail, so the list size is the only thing distorted, but it will keep shrinking the real base.",
      },
      {
        action: "Rebuild the Instagram publishing schedule",
        owner: "Figment",
        metric: "7 or more pieces next week, reach per day above 136",
        body: "5 pieces this week against 7, with nothing between October 16 and 20. Reach per day 381 to 136 and interactions 157 to 29. The themed week worked where it ran: the National Dental Hygiene Month reel reached 305 and the matching email went to 3,403.",
      },
      {
        action: "Keep dr el chaar on a weekly check",
        owner: "Figment",
        metric: "dr el chaar back under position 5",
        body: "10.33 against 4.89, while edgard el chaar held at 1.42 and 3 other spellings sat near 1.4. One query moving alone is the same shape as the unexplained drop 2 weeks ago.",
      },
      {
        action: "Get a podcast episode scheduled",
        owner: "Practice · Figment to schedule",
        metric: "One episode published before the next report",
        body: "Nothing since September 30, 3 full report weeks. Downloads 131 to 77, listening apps 7 to 4. The September 30 episode is still gathering at 2 a week, so the catalog works; there is nothing new on it.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Add tracking to the email and short links",
        body: "The National Dental Hygiene Month email recorded 85 clicks, but only a handful of those visits could be traced back to it. Adding tracking means the next campaign can be measured properly against the website.",
      },
      {
        action: "Build the Instagram schedule back up",
        body: "We will build on the doctor-led and patient-focused topics that have drawn the strongest response, and keep pairing a theme across channels the way National Dental Hygiene Month ran across the reel and the email.",
      },
      {
        action: "Review the email list before the next campaign",
        body: "Part of the list is no longer reaching people. Verifying the addresses protects delivery for everyone else and gives a clearer read on how the next campaign performs.",
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
        id: "email",
        title: "Email",
        rows: [
          ["Campaign", "October 19 · National Dental Hygiene Month"],
          ["Sent / delivered", "3,403 / 2,982"],
          ["Confirmed opens", "353 · 11.8%"],
          ["All opens", "1,557 · 52.2% · includes 1,204 proxy"],
          ["Clicks", "85 · 2.9%"],
          ["Most-clicked link", "The website · 70 of 178 link clicks"],
          ["Not delivered", "421 · 12.4%"],
          ["Unsubscribes", "12"],
          ["Second campaign", "October 21 · Oral Genome Offer · 39 sent"],
          ["Second campaign opens", "7 confirmed · 21 including proxy"],
          ["Previous 5 weeks", "No campaign sent"],
        ],
        note:
          "Constant Contact. First campaigns since September 12. Rates are calculated on delivered mail, not on sends. Use the confirmed figure: 353 of the 1,557 opens are confirmed and 1,204 are proxy, where a mail client loaded the images without anyone reading it. Constant Contact puts the confirmed rate at 11.8%, against 12.3% on the August 1 send, so the real open rate has not moved. The click rate of 2.9% is the figure that did move, 1.9 points above the average of the last 10 campaigns. 85 clickers produced 178 link clicks: the website took 70, the Modern Luxury article 36, a Constant Contact short link 28, and Facebook and Instagram 22 each. Only 7 of those arrived in GA4 as Constant Contact referrals, because the links carry no tracking; the rest are inside a direct figure that doubled in the same week. The 12.4% that did not deliver is effectively unchanged from the 12.1% on August 1, so the list has not been cleaned in 4 cycles.",
        noteClient:
          "Constant Contact. The National Dental Hygiene Month campaign was the first since September 12. Rates are calculated on delivered mail rather than on sends. Two open figures are shown: confirmed opens, where someone actually opened the message, and all opens, which also counts mail clients that load images automatically. Confirmed opens are the reliable figure. A second, much smaller campaign went out on October 21 to 39 addresses.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Homepage link", "155 · from 130"],
          ["Booking · Midtown", "14 · from 13"],
          ["Booking · Upper East Side", "12 · from 9"],
          ["Booking total", "26 · from 22"],
          ["Other named links", "1 · from 4"],
          ["Named links total", "182 · from 156"],
        ],
        note: "Taken from Short.io’s Path view with the catch-all /* filtered out, so only named links are counted, and on the All rather than Human setting. Read from the Path PDF this cycle: all 3 xlsx exports came through on the Human setting with /* included, which reads / 88, Midtown 6 and Upper East Side 5 and is not comparable with previous weeks. The test is that the listed paths sum to the export’s Total clicks rather than its Human clicks: 182 this week against the dashboard’s Total clicks of 182, and 156 the week before. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. Some clicks come from automated traffic.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "345 · from 233"],
          ["New visitors", "294 · from 172"],
          ["Direct visits", "241 · from 117"],
          ["Direct visitors engaged", "19.9% · 13 seconds average · from 14.5% and 8 seconds"],
          ["Visits from Google search", "83 · from 99"],
          ["Google visitors engaged", "71.1% · 34 seconds average · from 65.7% and 62 seconds"],
          ["Visits from Constant Contact", "7 · from none"],
          ["Busiest day", "October 19 · 96 new visitors"],
          ["Landing pages", "54 · from 27"],
          ["Homepage landings", "244 · from 241"],
          ["Our Doctors landings", "34 · from 42"],
          ["Desktop / mobile", "80% / 20% · from 74% / 25%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property. October 12 – 18 re-read on October 26 gives 233 sessions against the 219 first reported, Google 99 against 94 and direct 117 against 109 — the figures Looker already carried a week ago, so the native export settles upward over roughly a week and Looker is the better read on a fresh pull. New visitors unchanged at 172. New users reaching the 404 page rose from 56 to 106. New visitors, landing pages, devices and page titles come from Looker Studio. Landing pages are counted without blank and (not set) rows. Spam referrals are excluded.",
        noteClient:
          "Visits rose to 345 from 233, with the busiest day on October 19, when the email went out. Visits from Google search are the clearest measure of ongoing interest, at 83 against 99, and 71% of them engaged with the site, up from 66%.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Interactions", "29 · from 157"],
          ["Reach per day", "136 · from 381"],
          ["Engagement rate", "3.05% · from 5.89%"],
          ["Views", "2,940 · from 6,083"],
          ["Accounts engaged", "54 · from 139"],
          ["Followers", "3,267 · up 3 · from 3,264"],
          ["Reels", "1 · 437 views · 305 reach · 15 interactions"],
          ["Feed posts", "1 · 578 views · 234 reach · 14 interactions"],
          ["Feed posts, week before", "2 · 3,094 views · 602 average reach · 89 interactions"],
          ["Reels, week before", "1 · 1,818 views · 1,205 reach · 68 interactions"],
          ["Stories", "3 · 198 impressions · 65 average reach · from 4, 330 and 81"],
          ["Published", "1 reel · 1 feed post · 3 Stories"],
        ],
        note:
          "Account totals are Metricool’s account-level figures. Engagement rate is interactions on posts and reels divided by average reach per day times 7: 29 against 952 this week and 157 against 2,667 the week before. The week before is restated from the October 26 re-pull, where interactions read 157 against the 144 first reported and the Hudson Yards carousel now reads 2,574 views, 990 reach and 81 interactions. 5 pieces published against 7, with nothing between October 16 and 20. A post shared with NYC Dental Smiles on October 21 carried the Modern Luxury feature and is counted on that account, not this one. Followers: account total up 3, while Metricool reports 8 acquired and 4 lost; this report uses the account total. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures. Engagement rate is interactions divided by the week’s total reach, meaning average daily reach multiplied by 7, not by the daily figure on its own. Figures for the week before were re-read this week and include responses that arrived after last week’s report. No paid advertising ran in either week.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Average position", "5.25 · from 5.05 · US only"],
          ["Clicks", "52 · from 62"],
          ["Click rate", "11.16% · from 12.11%"],
          ["Impressions", "466 · from 512"],
          ["edgard el chaar", "position 1.42 · from 1.33 · 8 clicks"],
          ["dr el chaar", "position 10.33 · from 4.89 · 6 clicks"],
          ["Desktop", "29 clicks · 213 impressions · position 6.38 · all searches"],
          ["Mobile", "23 clicks · 252 impressions · position 4.51 · all searches"],
          ["Homepage", "34 clicks · 325 impressions · position 4.21"],
          ["Our Doctors", "13 clicks · 287 impressions · position 4.49"],
          ["Locations", "6 clicks · 184 impressions · position 3.09"],
          ["About", "0 clicks · 127 impressions · position 2.20"],
          ["Dental Services", "0 clicks · 115 impressions · position 2.42"],
        ],
        note:
          "Totals come from Search Console’s daily export. The headline average position is weighted by impressions and filtered to US searches; device positions cover all searches. Neither export carried a US filter, so the US position is read from Countries.csv: 50 clicks on 416 impressions at 5.25. The query export withholds 52% of clicks and 62% of impressions as low-volume, so query-level figures are a sample and are never summed into a total. October 25 reads 0 clicks on 28 impressions and is the least settled day in the window. October 12 – 18 re-pulled October 26: unchanged at 62 clicks, 512 impressions and position 5.05.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "77"],
          ["Through listening apps", "4 · from 7"],
          ["Through web browsers", "73 · from 124"],
          ["The week before", "131"],
          ["Last 30 days", "460"],
          ["Last 90 days", "804"],
          ["Lifetime downloads", "5,738"],
          ["Episodes published", "51"],
          ["Most recent episode", "September 30 · Biology Always Wins · 25 downloads"],
          ["New York share", "525 of 5,732 located downloads · 9.2%"],
        ],
        note:
          "This week’s 77 is lifetime downloads rising from 5,661 on October 19 to 5,738 on October 26, the same method as previous weeks, which is also why this figure is never re-pulled. The split by app comes from Buzzsprout’s app report, which counts located downloads: Web Browser rose 73 and every other app 4, against 124 and 7 the week before. 30 and 90 days come from the per-episode export, 460 and 804; Buzzsprout’s dashboard read 82 for 7 days, 459 for 30 and 746 for 90 the same morning. No episode has been published since September 30, 26 days before this pull and 3 full report weeks.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. Most of this week’s downloads came through web browsers; listening apps such as Apple Podcasts and Spotify added 4. The most recent episode went out September 30 and is still being downloaded each week.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "October 19 to 25, 2026, 7 full days, Monday to Sunday, compared with October 12 to 18. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from September 21 to 27 through this week, using the most recent reading of each week. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Instagram, search and website figures for October 12 to 18 were all read again on October 26. Instagram posts keep gathering responses for days after they go out, which moved last week’s interactions from 144 to 157, and the website session count settled from 219 to 233. Search did not move. Short link clicks and podcast downloads are not re-read, because click logs are written at the moment of the click and podcast downloads are measured as the change in a lifetime counter between two readings." },
          { q: "How engagement rate is calculated", a: "Interactions divided by the week’s total reach, meaning the share of people who saw something and responded to it. Total reach is the average daily reach multiplied by 7, so it will not match interactions divided by the daily figure shown on the scoreboard. It is not calculated against follower count, which would make it look higher than it is." },
          { q: "What counts as an engaged visit", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action." },
          { q: "How email open and click rates are calculated", a: "On mail that was delivered, not on the number sent, because the two differ whenever part of a list no longer reaches people. Opens are reported twice. A confirmed open means someone opened the message. Most mail clients now load images automatically, which registers as an open whether or not anyone read it, and those are counted separately as proxy opens. The confirmed figure is the one to work from." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No paid advertising ran in either week. Facebook figures are not reported because Meta retired the metric behind post views in June 2026." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
