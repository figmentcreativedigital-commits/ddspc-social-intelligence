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

   THIS CYCLE — three structural changes, all deliberate:

   1. WINDOW. The monthly view is suspended. This report covers August 31 –
      September 13 against August 17 – 30: two 14-day windows, Monday to
      Sunday, directly comparable. It aligns EEC to the NYCDS calendar. The
      30-day monthly comparison returns on October 1.

   2. COLUMNS. The scoreboard was 14-day and 30-day, nested. It is now this
      period against the previous period — a real comparison rather than the
      same data at two resolutions. Rows now carry a `cells` array driven by
      `scoreboard.cols`, so changing the column pairing back in October is a
      data edit and needs no change to page.tsx.

   3. CHART BANDS. `paid`/`paidLabel`/`windowLabel` are now
      `shade`/`bandA`/`bandB`. No advertising ran in either window, so the
      flag no longer means paid — it marks whichever days the note is about.
      Renamed so nobody reads `paid: true` on an unpaid day.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS — all six aligned:
     Instagram (Metricool)            Aug 31 – Sep 13, 2026
     Search Console                   Aug 31 – Sep 13, 2026
     Website (GA4)                    Aug 31 – Sep 13, 2026
     Short links (Short.io)           Aug 31 – Sep 13, 2026
     Email (Constant Contact)         Aug 31 – Sep 13, 2026
     Podcast (Buzzsprout)             trailing windows, pulled Sep 14

   NOT IN THIS CYCLE:
     - No advertising ran in either window. Every post and reel returns zero
       paid impressions and zero paid views. The August flight ended on the
       16th, before this window opened.
     - No podcast episode was published. The most recent is July 27.
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
type SectionDef = { id: string; label: string; internalOnly?: boolean; clientOnly?: boolean };

export const ALL_SECTIONS: SectionDef[] = [
  { id: "brief", label: "The brief" },
  { id: "period", label: "The period" },
  { id: "scoreboard", label: "Scoreboard" },
  { id: "worked", label: "What worked" },
  { id: "attention", label: "Needs attention", internalOnly: true },
  { id: "learned", label: "What we learned" },
  { id: "moves", label: "Next moves", internalOnly: true },
  { id: "plan", label: "The plan" },
  { id: "detail", label: "Detail" },
];

export const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
export const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
export const has = (id: string) => NAV.some((n) => n.id === id);

export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "August 31 – September 13, 2026",
  context: "August 31 – September 13, 2026 · against the 14 days before it",

  meta: [
    { k: "This period", v: "August 31 – September 13, 2026" },
    { k: "Compared with", v: "August 17 – 30, 2026" },
    { k: "Both windows", v: "14 days, Monday to Sunday" },
    { k: "Content published", v: "11 pieces" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "A concise summary of the period\u2019s performance, key findings, and recommended actions.",
    items: [
      {
        role: "Headline",
        text: "Search improved and nothing else did. Average position moved from 6.31 to 4.08 on 17% more impressions, and desktop went from 12.4 to 4.3. Website sessions read as up 56%, but Google organic was 158 sessions in both windows exactly, and five days carry 431 of the 638 new visitors. Instagram fell 54%, and one post from the previous window explains most of that.",
        client: {
          role: "Headline",
          text: "The practice is ranking better than it has all year. Average search position improved from 6.31 to 4.08, and on desktop from 12.4 to 4.3, on 17% more appearances in Google.",
        },
      },
      {
        role: "What improved",
        text: "97 search clicks against 94, on 1,113 impressions against 951. Click rate fell from 9.88% to 8.72% because the site is now appearing for more searches, not converting fewer. The homepage holds 66 clicks at position 3.36 and Our Doctors 20 at 4.55.",
        client: {
          role: "What improved",
          text: "Google showed the site 17% more often and clicks held at 97. The homepage now ranks around 3rd and Our Doctors around 5th, both stronger than two weeks ago.",
        },
      },
      {
        role: "What softened",
        text: "Instagram views fell from 15,310 to 7,113 and reach from 397 a day to 139. The August 27 post welcoming Dr. Shiloah drew 6,539 views on its own, 43% of the previous window. Excluding it, views moved 8,771 to 7,113, a 19% fall. Reels held: reach per reel 471 to 459, interactions 73 to 68. Followers moved from 3,220 to 3,219, the first loss on record.",
        client: {
          role: "What we are monitoring",
          text: "Reach decreased this period, while engagement rate increased among the audience we did reach. The previous period benefited from an especially strong response to Dr. Shiloah’s announcement, which generated 6,539 views and significantly lifted overall performance. Compared with the rest of that period, views were down 19%, while reel performance remained steady.",
        },
      },
      {
        role: "Next action",
        text: "Search is the channel with momentum and it is the one with nothing scheduled against it. Six weeks with no podcast episode and a falling Instagram reach leave search carrying the account. The 2.2-place position gain is worth building on while it holds.",
        client: {
          role: "The opportunity",
          text: "Search is where the practice is gaining ground, and it is the channel we would put the next piece of work behind. A position improvement of this size is worth building on while it holds.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* -------------------------------------------- THE PERIOD LINE (signature) */
  period_: {
    lede: "Daily new website visitors across the 14 days. The shaded days are the ones the note below is about.",
    bandA: "Aug 31 – Sep 3, and Sep 10",
    bandB: "The other nine days",
    /* GA4 daily new users, Aug 31 – Sep 13. `shade` marks the five days that
       carry two thirds of the total; it no longer means advertising ran. */
    daily: [
      { d: "Aug 31", v: 61, shade: true },
      { d: "Sep 1", v: 63, shade: true },
      { d: "Sep 2", v: 68, shade: true },
      { d: "Sep 3", v: 79, shade: true },
      { d: "Sep 4", v: 18 },
      { d: "Sep 5", v: 19 },
      { d: "Sep 6", v: 22 },
      { d: "Sep 7", v: 17 },
      { d: "Sep 8", v: 35 },
      { d: "Sep 9", v: 39 },
      { d: "Sep 10", v: 160, shade: true },
      { d: "Sep 11", v: 23 },
      { d: "Sep 12", v: 18 },
      { d: "Sep 13", v: 16 },
    ],
    note:
      "638 new visitors across the window, against 402 in the previous 14 days. Five days carry 431 of them: August 31 to September 3, and September 10 on its own at 160 against a baseline of 16 to 39. The other nine days average 23.0 a day, below the 28.7 of the previous window. Google organic sessions were 158 in both windows exactly, and Search Console recorded 94 clicks then 97. Direct sessions rose from 325 to 586, landing pages from 37 to 69 with 34 of those drawing three views or fewer, and desktop share from 79% to 88%. The growth in the headline number is direct traffic that no attributable channel accounts for.",
    noteClient:
      "638 new visitors across the window, against 402 in the previous 14 days. Five days carry 431 of them, with September 10 alone at 160 against a normal day of 16 to 39. Set those aside and the remaining nine days average 23.0 a day, a little below the two weeks before. Search traffic was level between the two windows, so we are treating the headline rise as unconfirmed rather than as growth until we can attribute it.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Fifteen measures, this period against the fourteen days before it. Both windows are the same length, so every comparison is direct.",
    cols: [
      { label: "This period", sub: "Aug 31 – Sep 13" },
      { label: "Previous period", sub: "Aug 17 – 30" },
    ],
    rows: [
      {
        k: "Average search position",
        note: "Impression-weighted, US traffic only. Best of the year. Desktop moved from 12.44 to 4.34 and now matches mobile",
        cells: [{ v: "4.08", c: "from 6.31", dir: "up" }, { v: "6.31", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "6.9 a day against 6.7. US traffic is 95 of the 97",
        cells: [{ v: "97", c: "+3.2%", dir: "up" }, { v: "94", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "The site is appearing for more searches than at any point this year",
        cells: [{ v: "1,113", c: "+17.0%", dir: "up" }, { v: "951", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Lower because impressions grew faster than clicks, not because fewer people chose the site",
        cells: [{ v: "8.72%", c: "\u22121.2 points", dir: "down" }, { v: "9.88%", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 30 and Upper East Side 24, against 34 and 28",
        cells: [{ v: "54", c: "\u221212.9%", dir: "down" }, { v: "62", c: "", dir: "flat" }],
      },
      {
        k: "Named link clicks",
        note: "All the growth is the homepage link, 202 to 284. Filtered to the five tracked links",
        cells: [{ v: "345", c: "+26.4%", dir: "up" }, { v: "273", c: "", dir: "flat" }],
      },
      {
        k: "Website sessions",
        note: "Google organic was 158 in both windows exactly. The difference is direct traffic",
        cells: [{ v: "800", c: "+56.3%", dir: "flat" }, { v: "512", c: "", dir: "flat" }],
      },
      {
        k: "New website visitors",
        note: "45.6 a day against 28.7. Five of the fourteen days carry 431 of the 638",
        cells: [{ v: "638", c: "+58.7%", dir: "flat" }, { v: "402", c: "", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "The previous window carried the Dr. Shiloah announcement at 6,539 views. Excluding it, 8,771 against 7,113",
        cells: [{ v: "7,113", c: "\u221253.5%", dir: "down" }, { v: "15,310", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach",
        note: "Daily average. Reach per reel held at 459 against 471; it is the feed posts that moved",
        cells: [{ v: "139", c: "\u221265.0%", dir: "down" }, { v: "397", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Posts 27 against 144, reels 68 against 73. One reel carries 60 of the 95",
        cells: [{ v: "95", c: "\u221256.2%", dir: "down" }, { v: "217", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach. A smaller audience, and more of it engaged",
        cells: [{ v: "4.88%", c: "+0.98 points", dir: "up" }, { v: "3.90%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "7 acquired against 7 lost. First net loss recorded on this account",
        cells: [{ v: "3,219", c: "\u22121", dir: "down" }, { v: "3,220", c: "+12", dir: "up" }],
      },
      {
        k: "Content published",
        note: "3 posts, 2 reels, 6 stories, 1 collab. Previously 2 posts, 3 reels, 7 stories, 1 collab",
        cells: [{ v: "11", c: "\u22121", dir: "flat" }, { v: "12", c: "", dir: "flat" }],
      },
      {
        k: "Email confirmed opens",
        note: "One campaign, RH 2.0. 324 of 3,005 delivered. The 52.6% headline open rate is mostly automated image loading",
        cells: [{ v: "324", c: "10.8% of delivered", dir: "none" }, { v: "\u2014", c: "no send in window", dir: "none" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "Search is the finding. Position moved from 6.31 to 4.08 on 17% more impressions, and desktop closed an 8-place gap to sit level with mobile. On Instagram, one reel carries 60 of the period\u2019s 95 interactions.",
    ledeClient: "Two things worked this period. The practice is ranking better in Google than at any point this year, and a single behind-the-scenes reel outperformed everything else published.",
    hero: {
      url: "https://www.instagram.com/reel/Dctd0SKhnWm/",
      title: "A little office clean-out turned into a trip down memory lane",
      date: "August 31",
      format: "Reel",
      stats: [
        { v: "1,307", l: "Views" },
        { v: "719", l: "Reach" },
        { v: "60", l: "Interactions" },
        { v: "8.3%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the period by a distance. 1,307 views is more than the next three pieces combined, and its 60 interactions are 63% of everything the account earned across all eleven pieces. Engagement of 8.3% against an account average of 4.88%. It is not clinical content and it is not a credential. It is the people behind the practice, which is what the Dr. Shiloah announcement had too. One introduced someone new, the other showed the team already there. Both worked because they were about who the practice is rather than what it does.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/p/Dcys7YKoKDU/",
        title: "Why are your gums receding?",
        date: "September 2", format: "Carousel", views: 547, reach: 209, interactions: 11,
      },
      {
        url: "https://www.instagram.com/reel/Dc1oPWmBNZU/",
        title: "Periodontics goes far beyond treating the gums",
        date: "September 3", format: "Reel", views: 320, reach: 198, interactions: 8,
      },
      {
        url: "https://www.instagram.com/p/DdE9mb5GQFB/",
        title: "We\u2019re living longer, and keeping our mouths healthy is an important part of aging well",
        date: "September 9", format: "Carousel", views: 369, reach: 146, interactions: 9,
      },
      {
        url: "https://www.instagram.com/p/Dc1pP_Bh0rO/",
        title: "There\u2019s a different level of trust when a fellow healthcare professional chooses you",
        date: "September 8", format: "Post", views: 200, reach: 103, interactions: 7,
      },
    ],
    galleryNote:
      "The other four feed pieces published between August 31 and September 13, ranked by views. Six stories and one collaboration with NYC Dental Smiles complete the eleven. Engagement is interactions divided by reach. These are per-piece figures; the account totals shown elsewhere are measured separately and the two will not add up.",
  },

  /* -------------------------------------------------------- WHAT NEEDS WORK */
  attention: {
    lede: "Six things worth a second look, each labeled so it is clear which ones to act on and which ones to note.",
    items: [
      {
        tag: "Real gap",
        title: "The website growth does not come from any channel we can attribute",
        body:
          "Sessions read as up 56% and new visitors up 59%. But Google organic was 158 sessions in both windows, to the session. Search Console agrees: 94 clicks then 97. The whole difference is direct traffic, 325 to 586. It is concentrated in five of fourteen days — August 31 to September 3, then September 10 alone at 160 against a baseline of 16 to 39. Landing pages went from 37 to 69, with 34 of those drawing three views or fewer, mostly /dental-service/ pages taken two or three at a time. Desktop share went from 79% to 88%. That is the shape of something walking the site rather than an audience finding it. Strip the five days and the remaining nine average 23.0 new visitors a day, below the 28.7 of the previous window.",
      },
      {
        tag: "Real gap",
        title: "The podcast has not published in six weeks",
        body:
          "The most recent episode is July 27. Nothing went out inside this window or the one before it. Trailing 30-day downloads are 183 against a lifetime 5,249 across 50 episodes, and the trailing 7-day figure is 85. The back catalogue is still being found, so the decay is slow, but there is nothing new feeding it. Either it resumes on a schedule or it should come off the report as an active channel and be reported as an archive.",
      },
      {
        tag: "Real gap",
        title: "First follower loss on the account",
        body:
          "3,220 to 3,219. Seven acquired, seven lost. Small in itself, but it is the first period where the account has not grown, and it lands alongside a 65% fall in daily reach and a 54% fall in views. The engagement rate moved the other way, 3.90% to 4.88%, so the people still seeing the content are responding to it more. This is a distribution question, not a content one.",
      },
      {
        tag: "Measurement",
        title: "The email open rate is 11%, not 53%",
        body:
          "RH 2.0 went to 3,412 contacts and reached 3,005. Constant Contact reports 1,582 all opens at 52.6% of delivered, but 1,258 of those are proxy opens, meaning mail privacy services fetched the images before anyone read the message. Confirmed opens are 324, 10.8% of delivered. 12 clicks followed, which is 3.7% of confirmed opens. The headline open rate is not a measure of readership and should not be used as one. The same correction has been applied to the NYC Dental Smiles report.",
      },
      {
        tag: "Measurement",
        title: "Short link figures are on a new basis and are not comparable with the last report",
        body:
          "The last report recorded 122 named link clicks for August 17 – 30 and 28 booking clicks. The same window re-pulled gives 273 and 62. The old figures were Short.io\u2019s own human-click classification; these are total clicks on a stated path allowlist. Before filtering, the domain returned 2,796 clicks in this window of which 2,039 were on the catch-all path, and Short.io called 2,518 of them human. Both windows here are on the allowlist basis, so they compare with each other but not with anything published before.",
      },
      {
        tag: "Note",
        title: "Datacenter traffic remains inside the filtered link figures",
        body:
          "The path allowlist removed the bulk of it. What is left, in this window: Council Bluffs 74, Ashburn 47, Santa Clara 25, Seoul 21, Los Angeles 17, Frankfurt 14 — 198 of 345. Brooklyn at 12 is the only city in the top seven that reads like a patient. GPTBot and Applebot both appear in the browser list. A country filter and three city exclusions at export would settle it, and none of the EEC links carry tracking parameters, which is the filter that would survive any change in where the traffic comes from.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "Five things worth carrying into the next cycle.",
    items: [
      {
        title: "Search is carrying the account",
        body: "Average position 6.31 to 4.08, desktop 12.44 to 4.34, impressions up 17% and clicks up 3.2%. It is the only channel that improved on every measure, and it is the one with nothing scheduled against it.",
        client: {
          title: "Search is carrying the account",
          body: "The practice ranks better in Google than at any point this year. Average position moved from 6.31 to 4.08, and on desktop from 12.4 to 4.3. The site appeared 17% more often and clicks held.",
        },
      },
      {
        title: "One post distorted the comparison, and we should say so rather than report the fall",
        body: "The August 27 Dr. Shiloah announcement drew 6,539 views, 43% of the previous window on its own. Reported straight, Instagram fell 54%. On a like-for-like basis it fell 19%. Announcements do that, and the next cycle will have the same problem in reverse.",
        client: {
          title: "One announcement distorted the comparison",
          body: "The two weeks before carried the announcement of Dr. Shiloah joining the practice, which drew 6,539 views on its own. Measured against the rest of that period, views moved down 19% rather than 54%.",
        },
      },
      {
        title: "People content outperforms clinical content on this account",
        body: "The two strongest pieces of the last month were an archive clean-out and a new-doctor announcement. Neither is a procedure or a credential. The clinical carousels published this period drew 547, 369 and 200 views against the reel\u2019s 1,307.",
        client: {
          title: "People content outperforms clinical content",
          body: "The two strongest pieces of the last month were an office archive clean-out and the announcement of a new doctor. Both were about people rather than procedures, and both outperformed the clinical posts by a wide margin.",
        },
      },
      {
        title: "Reels held while feed posts fell",
        body: "Reach per reel 471 to 459 and reel interactions 73 to 68, both effectively level. Average reach per post went 1,735 to 153, and that figure carries the Shiloah post. Two reels published against three.",
        client: {
          title: "Reels held steady",
          body: "Reach per reel was 459 against 471 and interactions 68 against 73, both level. The movement in the account totals is on the feed side, not in reels.",
        },
      },
      {
        title: "Engagement rate rose while everything else fell",
        body: "3.90% to 4.88%. Fewer people saw the content and a greater share of them acted on it. Combined with the follower loss, that points at distribution rather than at what is being made.",
        client: {
          title: "A greater share of the audience engaged",
          body: "Engagement rate moved from 3.90% to 4.88%. Fewer people saw the content and more of those who did responded to it, so the work now is widening the audience rather than changing the content.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "Five actions for the next cycle, each with the reason behind it and the number that will show whether it worked.",
    items: [
      {
        action: "Establish where the direct traffic is coming from",
        owner: "Figment",
        metric: "Direct sessions attributable, or excluded from the headline next cycle",
        body: "586 direct sessions against 325, concentrated in five days, across 69 landing pages of which 34 drew three views or fewer, at 88% desktop. Google organic did not move at all. Until this is attributed, the website figures cannot carry a growth story. Check GA4 for a referral exclusion misfiring, then server logs for the September 10 spike.",
      },
      {
        action: "Put the next piece of work behind search",
        owner: "Figment",
        metric: "Average position holding under 5.0 next cycle",
        body: "Position 6.31 to 4.08 and desktop 12.44 to 4.34 with nothing scheduled against it. Our Doctors draws 640 impressions at 3.12% click rate, the widest gap between visibility and clicks on the site. That page is where a position gain converts fastest.",
      },
      {
        action: "Decide whether the podcast is an active channel",
        owner: "Figment, with practice input",
        metric: "Either an episode published, or the panel reported as archive",
        body: "Six weeks with nothing published and no date set. 183 downloads in the trailing 30 days from a 50-episode back catalogue. Reporting it as active each cycle without new episodes measures decay rather than work.",
      },
      {
        action: "Commission two people-led pieces",
        owner: "Figment",
        metric: "Combined reach against the 719 the archive reel drew",
        body: "The archive clean-out reel took 60 of the period\u2019s 95 interactions. The Shiloah announcement was the strongest piece of the month before. Both were about people. The clinical carousels are drawing a third of that reach.",
      },
      {
        action: "Re-export short links with a country filter and three city exclusions",
        owner: "Figment",
        metric: "Named link total holding when datacenter cities are removed",
        body: "The path allowlist did most of the work, 2,796 clicks to 345. What remains is Council Bluffs 74, Ashburn 47 and Santa Clara 25, which is 146 of the 345. Adding tracking parameters to the five links would make this permanent rather than a filter to reapply each cycle.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next, and why.",
    items: [
      {
        action: "Build on the search position gain",
        body: "The practice is ranking better than at any point this year, and Our Doctors is the page where that gain has the most room to convert — it draws 640 appearances and 20 clicks. We will work on that page and the service pages behind it.",
      },
      {
        action: "Make more people-led content",
        body: "The archive clean-out reel and the Dr. Shiloah announcement were the two strongest pieces of the last month, and neither was about a procedure. We will commission more in that register alongside the clinical work.",
      },
      {
        action: "Widen Instagram distribution",
        body: "Engagement rose while reach fell, which means the content is working for the people who see it. The next cycle focuses on reaching more of them: collaborations, consistent reel cadence, and the formats that carried this period.",
      },
      {
        action: "Settle the website measurement question",
        body: "A large share of this period\u2019s website visitors cannot be traced to any channel. We are treating those figures as unconfirmed rather than as growth, and resolving where they came from before the next report.",
      },
    ],
  },

  /* ---------------------------------------------------------------- DETAIL */
  detail: {
    lede: "Supporting figures and how each was derived.",
    panels: [
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "97 · 6.9 a day · 94 in the previous window"],
          ["Impressions", "1,113 · up 17.0% from 951"],
          ["Click rate", "8.72% · from 9.88%"],
          ["Average position", "4.08 · from 6.31 · impression-weighted, US only"],
          ["Desktop", "53 clicks · 559 impressions · 9.48% · position 4.34, from 12.44"],
          ["Mobile", "44 clicks · 542 impressions · 8.12% · position 4.31"],
          ["United States", "95 clicks · 1,006 impressions · 9.44%"],
          ["Homepage", "66 clicks · 829 impressions · 7.96% · position 3.36"],
          ["Our Doctors", "20 clicks · 640 impressions · 3.12% · position 4.55"],
          ["Locations", "7 clicks · 347 impressions · 2.02% · position 3.19"],
          ["Dental Services", "2 clicks · 190 impressions · 1.05% · position 3.29"],
          ["About", "1 click · 177 impressions · 0.56% · position 2.82"],
        ],
        note:
          "Totals come from Search Console\u2019s daily chart export, which is complete. Average position is impression-weighted and filtered to US traffic, matching the basis used in previous reports. The previous window has been re-pulled and restated from 947 impressions to 951; clicks are unchanged at 94. The desktop position move from 12.44 to 4.34 is the single largest change in this report.",
        noteClient:
          "Totals come from Search Console\u2019s complete daily export. Average position is weighted by how often each page appeared and covers US traffic only, the same basis as previous reports. The desktop ranking improvement from 12.4 to 4.3 is the largest single change in this report.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "800 · from 512"],
          ["New visitors", "638 · 45.6 a day · from 402 at 28.7"],
          ["Landing-page views", "1,031 across 69 pages · from 803 across 37"],
          ["Google organic", "158 sessions · 158 in the previous window"],
          ["Direct", "586 sessions · 73.3% · from 325"],
          ["Bing organic", "20 sessions · from 10"],
          ["Constant Contact", "6 sessions · follows the RH 2.0 send"],
          ["Homepage landings", "632 · from 560"],
          ["Our Doctors landings", "57 · from 98"],
          ["Dr. Jonathan Shiloah", "28 landings · first full period on the site"],
          ["Dr. Anamaria Castillo", "15 landings"],
          ["Desktop / mobile", "88% / 12% · from 79% / 21%"],
        ],
        note:
          "Google organic is identical in both windows, 158 sessions to the session, and Search Console independently shows 94 clicks then 97. Every other channel is small. The 288-session difference is direct traffic, concentrated in five of fourteen days, spread across 69 landing pages of which 34 drew three views or fewer. Desktop share rose 9 points. These figures are reported as pulled and are not adjusted, but they should not be read as audience growth until the source is established.",
        noteClient:
          "Google organic traffic was level between the two windows at 158 sessions, and Search Console independently shows clicks holding. The rise in the headline session figure is direct traffic concentrated in five of the fourteen days. We are treating it as unconfirmed rather than as growth until we can trace where it came from.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Followers", "3,219 · down 1 · 7 acquired, 7 lost"],
          ["Views", "7,113 · from 15,310"],
          ["Views excluding the Shiloah announcement", "7,113 against 8,771 · a 19% fall"],
          ["Reach", "139 a day · from 397"],
          ["Accounts engaged", "172 · from 212"],
          ["Interactions", "95 · posts 27, reels 68 · from 217"],
          ["Engagement rate", "4.88% · from 3.90%"],
          ["Reel views", "1,627 across 2 reels · from 2,162 across 3"],
          ["Average reach per reel", "459 · from 471"],
          ["Average reach per post", "153 · from 1,735, which carried the announcement"],
          ["Stories", "6 · 470 impressions · 76.7 average reach"],
          ["Published", "3 posts · 2 reels · 6 stories · 1 collab"],
        ],
        note:
          "Account totals are Metricool\u2019s account-level figures, not a sum of the individual pieces. Engagement rate is total interactions divided by reach: 95 against 1,946, and 217 against 5,558 in the previous window. The August 27 post welcoming Dr. Shiloah drew 6,539 views and 3,067 reach on its own, 43% of the previous window, which is why the like-for-like line is shown. No advertising ran: every post and reel returns zero paid impressions and zero paid views. The September 10 collaboration is shared with NYC Dental Smiles and appears in both reports.",
        noteClient:
          "Account totals are Metricool\u2019s account-level figures rather than a sum of the individual pieces. Engagement rate is interactions divided by reach. The previous window carried the announcement of Dr. Shiloah joining, which drew 6,539 views on its own, so a like-for-like line is shown alongside the headline. No advertising ran in either window.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Named link clicks", "345 · from 273"],
          ["Homepage link", "284 · from 202"],
          ["Booking · Midtown", "30 · from 34"],
          ["Booking · Upper East Side", "24 · from 28"],
          ["Booking total", "54 · from 62"],
          ["Website link", "7 · from 8"],
          ["Instagram link", "none · 1 in the previous window"],
          ["Basis", "Total clicks on the five tracked paths"],
        ],
        note:
          "Filtered to an allowlist of the five tracked paths. Before that filter the domain returned 2,796 clicks in this window, of which 2,039 were on the catch-all path that matches any request not resolving to a defined link. Short.io classified 2,518 of the 2,796 as human, which is why its own classification is not used here. The last report\u2019s 122 named clicks and 28 booking clicks for the previous window were on that classification; the 273 and 62 shown here are total clicks on the allowlist. Both windows in this report are on the same basis and compare directly with each other, but not with figures published before.",
        noteClient:
          "Filtered to the five tracked links. Every figure here counts total clicks on those paths, in both windows, so the two compare directly. This is a different basis from the last report, where the tool\u2019s own automated-traffic filter was used, so these numbers should not be set against the ones published then.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["Campaign", "1 · RH 2.0 · sent September 12"],
          ["Sent / delivered", "3,412 / 3,005"],
          ["All opens", "1,582 · 52.6%"],
          ["Confirmed opens", "324 · 10.8%"],
          ["Proxy opens", "1,258 · 80% of all opens"],
          ["Clicks", "12 · 0.4% of delivered · 3.7% of confirmed opens"],
          ["Not delivered", "407 · 11.9%"],
          ["Unsubscribes / spam reports", "0 / 0"],
        ],
        note:
          "The first campaign to fall inside an EEC reporting window since the August 1 send. Constant Contact reports two open figures: all opens counts every recorded open, including mail privacy services fetching images automatically, while confirmed opens counts only those it can verify as a person. 1,258 of the 1,582 were automated, so 324 is the readership figure. Click rate against confirmed opens is 3.7%, which is a normal rate; against delivered mail it is 0.4%. The 11.9% not delivered is worth watching at this list size.",
        noteClient:
          "The first campaign inside a reporting window since the August 1 send. Constant Contact reports opens two ways. All opens counts every recorded open, including mail privacy services fetching images automatically, while confirmed opens counts only those it can verify as a person. 324 confirmed opens is the readership figure, and 12 clicks against those is a normal rate.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Lifetime downloads", "5,249"],
          ["Episodes published", "50"],
          ["Published in period", "None"],
          ["Most recent episode", "July 27 · six weeks before this window closed"],
          ["Trailing 7 days", "85"],
          ["Trailing 30 days", "183"],
          ["Trailing 90 days", "519"],
          ["New York share", "515 of 5,243 located downloads · 9.8%"],
        ],
        note:
          "Buzzsprout reports trailing windows anchored to the pull date rather than to a reporting window, so these figures cover the 7, 30 and 90 days to September 14 and do not align with the rest of this report. Nothing has been published since July 27. The trailing figures describe a back catalogue still being found rather than any activity in the period.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the reporting period covers", a: "August 31 to September 13, 2026 — fourteen whole calendar days, Monday to Sunday. Comparisons are against August 17 to 30, the fourteen days before, so the two windows are the same length and compare directly with no adjustment." },
          { q: "Why the monthly view is not here this cycle", a: "The reporting window has moved to fourteen days to align with the other practice reporting, which means the calendar month no longer falls inside it. The 30-day monthly view returns on October 1, when a full month is available again." },
          { q: "How engagement rate is calculated", a: "Total interactions divided by reach, meaning the share of people who saw something and acted on it. It is not calculated against follower count, which would flatter the figure. This period: 95 interactions against reach of 1,946." },
          { q: "Why Instagram is shown two ways", a: "The previous window carried the August 27 post announcing Dr. Shiloah joining the practice, which drew 6,539 views and 3,067 reach on its own — 43% of that window. Reported straight, views fell 53.5%. Excluding that one post from both sides, they fell 19%. Both figures are shown because the first is what happened and the second is what it means." },
          { q: "How search position is calculated", a: "Impression-weighted and filtered to United States traffic, the same basis used in previous reports. Weighting by impressions stops a page that appeared twice from moving the average as much as one that appeared eight hundred times." },
          { q: "How email opens are counted", a: "Constant Contact reports two figures. All opens counts every recorded open, including mail privacy services that fetch images automatically before anyone reads the message. Confirmed opens counts only those it can verify as a person. 1,258 of the 1,582 all opens on this campaign were automated, so the confirmed figure of 324 is the one that describes readership." },
          { q: "Why the short link figures changed basis", a: "The domain returned 2,796 clicks in this window, of which 2,039 were on a catch-all path that matches any request not resolving to a defined link. Short.io classified 2,518 of the 2,796 as human. Rather than rely on that, this report filters to an allowlist of the five tracked paths and reports total clicks on them. Both windows are on that basis and compare with each other, but not with figures published before." },
          { q: "What is missing this cycle", a: "No advertising ran in either window — every post and reel returns zero paid impressions and zero paid views, and the August flight ended on the 16th. No podcast episode was published; the most recent is July 27. Instagram reel retention and follower age and gender were not pulled and are absent rather than estimated." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on two figures already present. Nothing is estimated.",
      },
    ],
  },
};
