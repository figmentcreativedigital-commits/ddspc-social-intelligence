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

/* One figure in one window. `c` is the change against the equivalent previous
   window; leave it empty when no baseline exists rather than inventing one.
   A null cell means the platform does not report that figure at that length. */
type Cell = { v: string; c: string; dir: "up" | "down" | "flat" } | null;

/* ==========================================================================
   REPORT
   Every figure below traces to a source export. Nothing is estimated.
   Each cycle: edit numbers and narrative strings here. Do not touch the JSX.
   ========================================================================== */
export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "August 2026",
  context: "August 1 \u2013 30, 2026 \u00b7 with a 14-day view of August 17 \u2013 30",

  /* Masthead strip. Lives here so no cycle ever needs to edit page.tsx. */
  meta: [
    { k: "30-day window", v: "August 1 \u2013 30, 2026" },
    { k: "14-day window", v: "August 17 \u2013 30, 2026" },
    { k: "Comparison", v: "July 1 \u2013 30 and August 3 \u2013 16" },
    { k: "Content published", v: "27 pieces" },
  ],

  /* ----------------------------------------------------------------- BRIEF */
  brief: {
    title: "The brief",
    lede: "The whole month in four lines.",
    items: [
      {
        role: "Headline",
        text: "The two windows disagree. Over the last two weeks website visits, search clicks and booking clicks each fell about a third. Over the full month search clicks are up 8.8% and booking clicks up 33%. August 17\u201330 sat against an unusually strong first half of the month, which is why it reads as decline wherever you look at it.",
        client: {
          role: "Headline",
          text: "Two views of the same month. Over the last two weeks website visits, search clicks and booking clicks each fell about a third. Over the full month search clicks are up 8.8% and booking clicks up 33%. Both are in the report, because the shorter window sits against a strong first half of August and the month is the steadier read.",
        },
      },
      {
        role: "What worked",
        text: "Reels. Views went 4,564 to 8,431, interactions 162 to 261, average reach per reel up 10%, comments and shares both up 40%. Reels now carry more daily reach than any other format. The Dr. Shiloah introduction pulled 6,020 views on its own.",
      },
      {
        role: "Primary concern",
        text: "Instagram reach and interactions are down against July. July carried a paid flight worth 10,181 views and published 34 pieces against August's 27, which covers most of the reach gap. It does not cover interactions, which fell 848 to 537.",
        client: {
          role: "What we are watching",
          text: "Instagram reach and interactions are lower than July. July included a paid campaign and 34 pieces of content against August's 27, so part of the gap is how much was in market rather than how it performed. Reels went the other way on every measure.",
        },
      },
      {
        role: "The number that matters",
        text: "89 booking clicks in August \u2014 50 Midtown, 39 Upper East Side \u2014 against 67 in July. It is the only direct read on intent in this report and the number to beat next month.",
      },
    ],
  },

  /* ---------------------------------------------------------------- PERIOD */
  period_: {
    lede: "Daily website visitors across August. Lighter is the first half of the month, darker is the 14-day window.",
    paidLabel: "Aug 1 \u2013 16",
    windowLabel: "14-day window \u00b7 Aug 17 \u2013 30",
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
    note: "43.0 new visitors a day across August 3\u201316, 28.4 across August 17\u201330. The drop is gradual, not a single event. August 27 is the exception \u2014 the day we announced the new orthodontist, and the busiest search day of the month as well.",
    noteClient: "43.0 new visitors a day across August 3\u201316 and 28.4 across August 17\u201330. The drop is gradual rather than sudden. August 27 stands out \u2014 the day the practice announced its new orthodontist, which was also the busiest day for search all month.",
  },

  /* ------------------------------------------------------------ SCOREBOARD
     Two windows side by side. The 14-day column carries the change against
     the previous 14 days. The 30-day column carries the change against the
     previous 30 days once a July export exists; until then leave `c` empty
     and it renders as a bare figure rather than a false comparison.

     A `null` cell renders as an em dash and means the platform does not
     report that figure at that length. Do not sum the two 14-day windows
     for reach or accounts engaged \u2014 Metricool deduplicates both, so the
     30-day figure is smaller than the sum and must come from a 30-day
     export. Short.io link-level figures are whole months, since the
     platform does not break individual links down by day.
     ---------------------------------------------------------------------- */
  scoreboard: {
    lede: "Each measure across two windows. The 14-day column is the most recent two weeks and its change against the two weeks before. The 30-day column is the month to date, which carries the volume the shorter window cannot show.",
    cols: [
      { label: "Last 14 days", sub: "Aug 17 \u2013 30" },
      { label: "Last 30 days", sub: "Aug 1 \u2013 30" },
    ],
    rows: [
      { k: "Booking link clicks", note: "Midtown 50 \u00b7 Upper East Side 39 across August, against 43 and 24 in July",
        d14: { v: "28", c: "\u221242%", dir: "down" }, d30: { v: "89", c: "+32.8%", dir: "up" } },
      { k: "Website sessions", note: "1,393 organic sessions in August against 1,782 in July. July's total was 2,513, of which 731 came from a paid flight that did not run in August",
        d14: { v: "515", c: "\u221232.5%", dir: "down" }, d30: { v: "1,393", c: "\u221221.8% like for like", dir: "down" } },
      { k: "New website visitors", note: "36.6 a day across August against 73.3 in July, though July carried paid traffic that August did not",
        d14: { v: "397", c: "28.4 a day", dir: "down" }, d30: { v: "1,098", c: "36.6 a day", dir: "flat" } },
      { k: "Search clicks", note: "6.7 a day in the 14-day window, 7.8 across the month",
        d14: { v: "94", c: "\u221229.9%", dir: "down" }, d30: { v: "235", c: "+8.8%", dir: "up" } },
      { k: "Search impressions", note: "Shown less often across the month, clicked more",
        d14: { v: "947", c: "\u221214.7%", dir: "down" }, d30: { v: "2,121", c: "\u22128.8%", dir: "down" } },
      { k: "Search click rate", note: "9.29% in July",
        d14: { v: "9.93%", c: "\u22122.1 points", dir: "down" }, d30: { v: "11.08%", c: "+1.8 points", dir: "up" } },
      { k: "Average search position", note: "Impression-weighted, US traffic only",
        d14: { v: "6.3", c: "from 5.74", dir: "down" }, d30: { v: "5.98", c: "from 4.79", dir: "down" } },
      { k: "Instagram reach", note: "Deduplicated by account, so the windows do not add up. July carried a paid flight",
        d14: { v: "397 a day", c: "+113%", dir: "up" }, d30: { v: "319 a day", c: "from 877", dir: "down" } },
      { k: "Instagram views", note: "Account-level, not summed from posts. July included 10,181 advertising views",
        d14: { v: "15,300", c: "+63%", dir: "up" }, d30: { v: "26,980", c: "\u221220.5% ex-advertising", dir: "down" } },
      { k: "Instagram reel views", note: "The one measure up on both windows",
        d14: { v: "3,646", c: "", dir: "flat" }, d30: { v: "8,431", c: "+84.7%", dir: "up" } },
      { k: "Instagram interactions", note: "Reels 261 \u00b7 posts 276 across August, against reels 162 \u00b7 posts 612 in July",
        d14: { v: "298", c: "+11%", dir: "up" }, d30: { v: "537", c: "\u221236.7%", dir: "down" } },
      { k: "Content published", note: "August 5 posts, 7 reels, 15 stories, 2 collabs. July 9 posts, 5 reels, 20 stories",
        d14: { v: "12", c: "unchanged", dir: "flat" }, d30: { v: "27", c: "\u221220.6%", dir: "down" } },
      { k: "Named link clicks", note: "Homepage link 146 to 248. July's campaign links carried 121 clicks and are gone in August",
        d14: { v: "122", c: "\u221240%", dir: "down" }, d30: { v: "349", c: "+3.3%", dir: "up" } },
      { k: "Email delivered", note: "1 August send \u00b7 372 confirmed opens, 54 clicks. Outside the 14-day window",
        d14: null, d30: { v: "3,028", c: "", dir: "flat" } },
      { k: "Podcast downloads", note: "Buzzsprout reports trailing windows only, so there is no 14-day figure",
        d14: null, d30: { v: "147", c: "\u221233%", dir: "down" } },
    ] as { k: string; note: string; d14: Cell; d30: Cell }[],
  },

  /* ---------------------------------------------------------------- WORKED */
  worked: {
    lede: "Twenty-seven pieces went out in August. Reels did the work, and one announcement did more than anything else all month.",
    ledeClient: "Twenty-seven pieces went out in August. Reels did the work, and one announcement did more than anything else all month.",
    hero: {
      url: "https://www.instagram.com/p/DcjlJ9MmdxM/",
      title: "Welcoming Dr. Jonathan Shiloah, our newest orthodontist",
      date: "August 27",
      format: "Carousel",
      stats: [
        { v: "6,020", l: "Views" }, { v: "2,950", l: "Reach" },
        { v: "83", l: "Interactions" }, { v: "40%", l: "Of period views" },
      ],
      why: "Best piece the account has published this year. 6,020 views, and it produced the busiest website day of the month and the busiest search day too. The clinical content from the doctors performs well in its own right \u2014 the editorials and the published research both drew steadily this month. What this adds is that people also want to see the people behind the practice. Doctor-focused and expertise-led content is working on both counts, and that is worth planning around.",
    },
    gallery: [
      { url: "https://www.instagram.com/reel/DcbcRmthiaH/", title: "Some patients become part of your career in a way you never forget", date: "August 24", format: "Reel", views: 951, reach: 613, interactions: 50 },
      { url: "https://www.instagram.com/p/DcMGYlxmddg/", title: "We\u2019ve spent years treating bacteria like the enemy", date: "August 18", format: "Post", views: 1004, reach: 401, interactions: 16 },
      { url: "https://www.instagram.com/reel/DcWL2sLh9KZ/", title: "Periodontics starts with the gums. It shouldn\u2019t stop there.", date: "August 22", format: "Reel", views: 570, reach: 412, interactions: 10 },
      { url: "https://www.instagram.com/reel/DcTt63Ch9ve/", title: "The most important outcome may be the one you can\u2019t photograph", date: "August 21", format: "Reel", views: 480, reach: 336, interactions: 9 },
    ],
    galleryNote: "Ranked by views. Post-level figures rank content against content and are never summed into a total. Seven reels went out in August against five in July, and the format grew on every measure \u2014 average reach per reel up 10%, interactions up 16%, comments and shares both up 40%.",
  },

  /* ------------------------------------------------- ATTENTION (internal)  */
  attention: {
    lede: "Six items that need an owner and a decision before the next report.",
    items: [
      {
        tag: "Real gap",
        title: "262 new visitors landed on a 404 page",
        body: "264 page views in August, 13.1% of everything viewed. July was worse \u2014 706 views, 22.0%, the second most-viewed page on the site ahead of Our Doctors. Something is generating dead links at volume. The July figure moves with the ad flight, so the campaign creative is the first place to look. Nobody has flagged this before and it is the clearest fixable problem in the report.",
      },
      {
        tag: "Real gap",
        title: "Publishing volume fell 21%",
        body: "27 pieces in August against 34 in July. Posts went 9 to 5, stories 20 to 15. Reels went 5 to 7 and reels are the format that grew. Less in market explains part of the reach drop, and it is the one input we control directly.",
      },
      {
        tag: "Real gap",
        title: "Interactions fell further than volume explains",
        body: "848 to 537 across the month. Advertising does not account for it \u2014 July's ads produced 10,181 views and 11 interactions. Most of July's total sits in a single 1 July spike of roughly 220 post interactions. Worth finding out what that piece was before treating the decline as a trend.",
      },
      {
        tag: "Not actioned",
        title: "Podcast has been quiet five weeks",
        body: "Nothing since 27 July. Trailing 30-day downloads went 221 to 147, trailing 7-day went 56 to 14. Recommended last cycle and it did not happen. Find out whether the constraint is recording, editing or scheduling, because otherwise the recommendation just repeats.",
      },
      {
        tag: "Not actioned",
        title: "Email list still not cleaned",
        body: "The 1 August send bounced at 12.1%, same as July. Of 1,632 opens only 372 are confirmed and 1,260 are proxy. The 53.9% open rate is really 12.3%. Nobody should be using 54% as a benchmark. Second cycle carrying this.",
      },
      {
        tag: "Data quality",
        title: "Short.io bot bursts are recurring, and Facebook is still unmeasurable",
        body: "Short.io reports 916 human clicks for August against 400 for July, but 18 August contributed 180 and 30 August contributed 217 against a normal day of 8 to 36. Two bursts now, not one. Named links only, as always. Separately, the DDS PC Facebook page is still unlinked from Instagram with a personal creator account in its place, so analytics remain unreachable. No change since last cycle.",
      },
    ],
  },

  /* --------------------------------------------------------------- LEARNED */
  learned: {
    lede: "Five things we did not know a month ago.",
    items: [
      {
        title: "Two weeks was the wrong length to judge this by",
        body: "Search clicks, booking clicks and link clicks all read as a fall of about a third over two weeks. Over the month all three are up \u2014 8.8%, 33% and 3.3%. August 17\u201330 happened to sit against a strong August 3\u201316, and every channel measured that way inherited the same shape. Both windows are in the report now so this cannot happen again.",
        client: {
          title: "Two weeks was the wrong length to judge this by",
          body: "Search clicks, booking clicks and link clicks all read as a fall of about a third over the last two weeks. Over the full month all three are up \u2014 8.8%, 33% and 3.3%. The shorter window sat against a strong first half of August. Both windows are shown from now on so the picture is complete.",
        },
      },
      {
        title: "Reels are the format that is working",
        body: "Views 4,564 to 8,431, interactions 162 to 261, average reach per reel 557 to 614, comments and shares both up 40%. Reels carry 170 of the 319 daily account reach, more than any other format. Seven went out in August against five in July. This is the clearest signal in the report and the easiest to act on.",
      },
      {
        title: "The doctor pages are gaining, and two sources agree",
        body: "Search Console has Our Doctors at 36 clicks to 46 and 868 impressions to 1,175. Analytics has the same page at 146 landings to 219. Locations went 3 clicks to 11. Two independent platforms, same direction, in a month when total traffic halved. The homepage gave up ground over the same stretch.",
      },
      {
        title: "Google organic sessions were identical in both months",
        body: "395 in July, 395 in August. Search clicks rose 8.8% over the same stretch. Whatever moved the other channels, organic search did not move with them.",
      },
      {
        title: "An AI assistant sent visitors for the first time",
        body: "Two sessions from ChatGPT, tagged by Analytics as an AI assistant source. Two is nothing. But there were none in July, it has never appeared before, and conventional search work would not surface it.",
      },
    ],
  },

  /* ---------------------------------------------------- MOVES (internal)   */
  moves: {
    lede: "Five actions with an owner and the number that judges each one.",
    items: [
      {
        action: "Find what is sending people to the 404 page",
        owner: "Figment",
        metric: "Under 3% of page views next month",
        body: "13.1% of August page views, 22.0% in July. Start with the July ad creative, since the two move together, then check internal links and anything pointing at Locations. Clearest fixable problem in the report.",
      },
      {
        action: "Publish more reels",
        owner: "Figment",
        metric: "Nine reels in September, reach per reel above 614",
        body: "Views up 85%, interactions up 61%, comments and shares up 40%, and reels carry more daily reach than any other format. Seven went out in August. Keep the doctor-focused and expertise-led angles that are already working.",
      },
      {
        action: "Get publishing volume back up",
        owner: "Figment",
        metric: "34 pieces, matching July",
        body: "27 in August against 34 in July. Posts fell 9 to 5. Reach follows volume more closely than anything else we control, and this is the input we control outright.",
      },
      {
        action: "Publish a podcast episode",
        owner: "Practice \u00b7 Figment to schedule",
        metric: "One episode before the next report",
        body: "Five weeks dark, downloads down a third. Recommended last cycle and it did not happen. Find out what is actually blocking it rather than repeating the recommendation.",
      },
      {
        action: "Clean the email list",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next send",
        body: "Also recommended last cycle, also not done. The 1 August send bounced at 12.1%. In the meantime switch internal reporting to confirmed opens instead of total opens \u2014 the difference is 53.9% against 12.3%.",
      },
    ],
  },

  /* ------------------------------------------------------- PLAN (client)   */
  plan: {
    lede: "Five things we will do next, and what each one follows from.",
    items: [
      {
        action: "Prioritise reels",
        body: "Reels grew on every measure this month \u2014 views, interactions, reach per reel, comments and shares. They now reach more people daily than any other format. We will publish more of them and keep the doctor-focused and expertise-led angles that are already working.",
      },
      {
        action: "Build on what the audience responded to",
        body: "Dr. Shiloah's introduction was the standout piece of the month, and the editorials and published research drew steadily alongside it. Doctor-focused and expertise-driven content is what this audience turns up for. We will keep developing the topics and formats getting the strongest response.",
      },
      {
        action: "Get publishing volume back to July levels",
        body: "August went out with 27 pieces against July's 34. Reach follows how much is published more closely than anything else, so we will bring the schedule back up.",
      },
      {
        action: "Fix the dead links on the site",
        body: "A number of visitors are arriving at a page that no longer exists. We will trace where those links are coming from and repoint them, so people land where they meant to.",
      },
      {
        action: "Publish a new podcast episode and review the email list",
        body: "The last episode went out 27 July and downloads have eased since. New York is still the largest listening city for the back catalogue. Separately, part of the email list is no longer reaching people \u2014 verifying the addresses protects delivery for everyone else and gives a clearer read on the next campaign.",
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
          ["Sessions \u00b7 14 days", "515"],
          ["Sessions \u00b7 30 days", "1,393"],
          ["Organic sessions \u00b7 July", "1,782 \u00b7 excludes the paid flight"],
          ["New visitors \u00b7 30 days", "1,098 \u00b7 36.6 a day"],
          ["Landing-page views \u00b7 30 days", "2,013"],
          ["Homepage landings", "1,288 \u00b7 up from 1,249 in July"],
          ["Our Doctors landings", "219 \u00b7 up from 146 in July"],
          ["Direct", "886 sessions \u00b7 63.9%"],
          ["Google organic", "395 sessions \u00b7 28.5%"],
          ["Google organic \u00b7 July", "395 sessions \u00b7 unchanged"],
          ["Bing organic", "25 sessions"],
          ["AI assistant", "2 sessions \u00b7 first appearance"],
          ["Desktop / mobile", "81% / 19%"],
        ],
        note: "Google Analytics 4, August 1 to 30 against July 1 to 30. The headline month-over-month figure is a 44.6% fall in sessions, but that is not a like-for-like read: July carried a paid flight of 731 sessions, 495 from Instagram and 236 from Facebook, and nothing paid ran in August. Comparing organic against organic, sessions went 1,782 to 1,393, down 21.8%. Two figures sit underneath that and point the other way. Google organic sessions were 395 in both months, identical. Homepage landings rose, 1,249 to 1,288, and Our Doctors landings rose 146 to 219, in a month when total traffic halved. The July collapse in Locations landings, 894 to 73, is the paid flight ending rather than a change in interest \u2014 that page was the campaign destination. The device shift, 60/40 desktop-mobile in July to 81/19 in August, is the same story: paid social traffic is mobile. Separately, 264 page views and 262 new users landed on the 404 page in August, 13.1% of all page views, down from 22.0% in July but still a live issue.",
        noteClient: "Google Analytics 4, August 1 to 30 against July 1 to 30. July included a paid campaign of 731 sessions; August was organic throughout. Comparing organic to organic, sessions went from 1,782 to 1,393. Two figures underneath run the other way: Google organic sessions were identical in both months at 395, and both the homepage and Our Doctors drew more landings than in July, 1,249 to 1,288 and 146 to 219. The fall in Locations landings and the shift toward desktop both trace to the paid campaign ending, since that page was the campaign destination and paid social traffic arrives on mobile.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks \u00b7 14 days", "94"],
          ["Clicks \u00b7 30 days", "235 \u00b7 up from 216 in July"],
          ["Impressions \u00b7 14 days", "947"],
          ["Impressions \u00b7 30 days", "2,121 \u00b7 down from 2,325 in July"],
          ["Click rate \u00b7 30 days", "11.08% \u00b7 up from 9.29%"],
          ["Average position \u00b7 30 days", "5.98 \u00b7 from 4.79 in July"],
          ["Homepage", "165 clicks \u00b7 1,520 impressions"],
          ["Our Doctors", "46 clicks \u00b7 1,175 impressions"],
          ["Locations", "11 clicks \u00b7 494 impressions"],
          ["Upper East Side doctors", "11 clicks \u00b7 174 impressions"],
          ["Dental Services", "4 clicks \u00b7 165 impressions"],
        ],
        note: "Google Search Console. Totals come from the daily chart export, not the query export, which held back 66% of clicks and 69% of impressions in August and 68% and 70% in July as low-volume queries. Page figures are whole months, August against July. Across the month clicks rose 8.8% while impressions fell 8.8% \u2014 the site was shown less often and clicked more, which is why the click rate rose to 11.08%. The two weeks and the month point different ways, which is the reason both windows are shown. Average position is impression-weighted and filtered to US traffic; unfiltered it reads 7.28, inflated by international impressions that never convert. Our Doctors gained on both counts, 36 to 46 clicks and 868 to 1,175 impressions. Locations went 3 clicks to 11. Not one non-brand query earned a click in either month \u2014 fourth consecutive period.",
        noteClient: "Google Search Console. Totals come from the daily chart export rather than the query export, which lists only the higher-volume queries. Page figures are whole months, August against July. Across the month clicks rose 8.8% while impressions fell 8.8%: the site was shown less often and clicked more, lifting the click rate to 11.08%. The two weeks and the month point different ways, which is why both windows are shown. Average position is impression-weighted and filtered to US traffic. Our Doctors gained on both counts, 36 to 46 clicks and 868 to 1,175 impressions, and Locations went from 3 clicks to 11.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Followers", "3,220 \u00b7 up 30 in August, 0.94%"],
          ["Views \u00b7 30 days", "26,980"],
          ["Views \u00b7 July", "44,100, of which 10,181 advertising"],
          ["Reach \u00b7 30 days", "319 a day \u00b7 from 877 in July"],
          ["Accounts engaged", "429 \u00b7 from 631"],
          ["Interactions \u00b7 30 days", "537 \u00b7 from 848"],
          ["Reel views", "8,431 \u00b7 up from 4,564"],
          ["Reel interactions", "261 \u00b7 up from 162"],
          ["Average reach per reel", "614 \u00b7 up 10% from 557"],
          ["Reel comments / shares", "7 and 14 \u00b7 both up 40%"],
          ["Published", "5 posts \u00b7 7 reels \u00b7 15 stories \u00b7 2 collabs"],
          ["Views by format", "Carousel 12,190 \u00b7 Reel 8,431 \u00b7 Post 3,539 \u00b7 Story 1,711"],
        ],
        note: "Account-level figures from Metricool for August 1 to 30 against July 1 to 30, not a sum of individual posts. Post-level figures rank content against content only. The month is down on most measures and the reason splits two ways. July carried 10,181 advertising views; strip those out and views fell 20.5% rather than 38.8%. July also published 34 pieces against August's 27, so there was less in market. Neither explains interactions, which fell 848 to 537 on an organic basis \u2014 July's post interactions of 612 were concentrated in a single 1 July spike of roughly 220. Reels are the exception and they are up on every measure: views 4,564 to 8,431, interactions 162 to 261, average reach per reel 557 to 614, comments and shares both up 40%. Reels now carry more account reach per day than any other format at 170. Note that account-level story interactions read 0 for August against 63 in July while the story panel still shows replies, which looks like a Metricool measurement gap rather than a real result.",
        noteClient: "Account-level figures from Metricool for August 1 to 30 against July 1 to 30, rather than a sum of individual posts. Post-level figures rank content against content only. Two things sit behind the month-over-month change: July included advertising worth 10,181 views, and July published 34 pieces against August's 27. Excluding advertising, views fell 20.5% rather than 38.8%. Reels run against that trend and are up on every measure \u2014 views from 4,564 to 8,431, interactions from 162 to 261, average reach per reel up 10%, and comments and shares both up 40%. Reels now carry more daily account reach than any other format.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Named link clicks \u00b7 14 days", "122"],
          ["Named link clicks \u00b7 30 days", "349 \u00b7 up from 338 in July"],
          ["Booking \u00b7 Midtown", "50 \u00b7 up from 43"],
          ["Booking \u00b7 Upper East Side", "39 \u00b7 up from 24"],
          ["Booking total \u00b7 30 days", "89 \u00b7 up from 67"],
          ["Booking total \u00b7 14 days", "28 \u00b7 down from 48"],
          ["Homepage link", "248 \u00b7 up from 146"],
          ["July campaign links", "121 clicks \u00b7 none in August"],
        ],
        note: "Short.io. Only named links are reported \u2014 the ones we created and can attribute. Wildcard traffic is excluded, as is city-level geography, which reflects hosting infrastructure rather than readers. Link-level figures are whole months, since Short.io does not break individual links down by day. The two windows disagree sharply and the month is the more reliable read: booking clicks fell 48 to 28 across the two weeks but rose 67 to 89 across the month, and the homepage link went 146 to 248. Three links carried 121 clicks in July \u2014 the gum disease article, the website link and the locations link \u2014 and are effectively gone in August, which matches the paid campaign ending. Short.io's own human-clicks figure is not usable: it reports 916 for August against 400 for July, but two single-day bursts on 18 and 30 August account for 397 of them.",
        noteClient: "Short.io. Only named links are reported \u2014 the ones we created and can attribute to a destination. Unattributed traffic and city-level geography are excluded. Link-level figures are whole months, since Short.io does not break individual links down by day. The two weeks and the month point different ways here, and the month is the more reliable read: booking clicks rose from 67 in July to 89 in August, and the homepage link went from 146 to 248. Three links used in July's campaign carried 121 clicks between them and are not in use in August.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["Campaign", "1 August \u00b7 Summer Promo Extensions"],
          ["Sent / delivered", "3,443 / 3,028"],
          ["All opens", "1,632 \u00b7 53.9%"],
          ["Confirmed opens", "372 \u00b7 12.3%"],
          ["Clicks", "54 \u00b7 1.8%"],
          ["Not delivered", "415 \u00b7 12.1%"],
          ["Unsubscribes", "9 \u00b7 0.3%"],
          ["Campaigns \u00b7 14-day window", "None"],
        ],
        note: "Constant Contact. The 1 August send falls inside the 30-day window, so email is a reported channel this cycle rather than a gap \u2014 at two weeks it sat outside the window and showed as nothing. Rates are calculated on delivered mail, not on sends. The gap between all opens and confirmed opens is the figure that matters: most mail clients pre-load images automatically, which registers as an open whether or not anyone read it. 12.3% is the reliable number and 53.9% should not be used as a benchmark anywhere. The 12.1% bounce rate is unchanged from July and remains the outstanding item.",
        noteClient: "Constant Contact. The 1 August send falls inside the 30-day window, so email is reported this cycle. Rates are calculated on delivered mail rather than on sends. The gap between all opens and confirmed opens is worth knowing about: most mail clients now pre-load images automatically, which registers as an open whether or not anyone read the message. Confirmed opens at 12.3% is the reliable figure to work from.",
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
          { q: "What the reporting period covers", a: "17 to 30 August 2026 \u2014 fourteen whole calendar days. Comparisons are against 3 to 16 August, the fourteen days before, so the two windows are the same length and compare directly." },
          { q: "Why both a 14-day and a 30-day window", a: "The two lengths disagreed this month. Search clicks, booking clicks and link clicks each read as a fall of about a third over 14 days and a rise over 30, because August 17\u201330 sat against a strong August 3\u201316. Showing both windows removes the choice of which one to believe." },
          { q: "Why engagement rate is not reported", a: "It is interactions divided by reach, so it moves whenever either number moves and tells you little on its own. Reach and interactions are both reported directly instead." },
          { q: "Where the search totals come from", a: "The daily chart export, not the query export. Google held back 79% of clicks and 68% of impressions from the query table this period as low-volume queries, so summing it would understate the channel." },
          { q: "Why link clicks are named links only", a: "Short.io\u2019s headline figure this period is inflated by a burst of traffic from places with no plausible connection to the practice. Reporting only named links \u2014 the ones we created and can attribute \u2014 keeps the basis consistent across periods.", internalOnly: true },
          { q: "Why link clicks are named links only", a: "Only links we created and can attribute to a destination are counted, which keeps the figure consistent from period to period.", clientOnly: true },
          { q: "Where the Instagram totals come from", a: "Account-level figures from Metricool. Post-level figures rank content against content and are never summed into a total. The gap between the two runs two to three times." },
          { q: "Why podcast figures are trailing windows", a: "Buzzsprout does not offer custom date ranges in its export. The 147 and 14 are trailing 30-day and 7-day windows measured at the reporting cutoff, compared against the same windows at the previous cutoff." },
          { q: "What is missing this period", a: "No advertising ran, no email campaign went out, no podcast episode was published. Those channels are reported here rather than shown as empty views. Facebook is being posted to but is not currently measurable, so it is not reported.", internalOnly: true },
          { q: "Which channels had no activity in these two weeks", a: "Advertising and podcast. Email had none inside the two-week window but did inside the 30-day window, where the 1 August campaign is reported in full. Each channel is described in its panel above rather than shown as an empty view.", clientOnly: true },
        ] as { q: string; a: string; internalOnly?: boolean; clientOnly?: boolean }[],
        note: "",
      },
    ],
  },
};
