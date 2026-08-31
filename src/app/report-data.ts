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
  period: "August 3 \u2013 16, 2026",
  context: "Thirty-day context: July 18 \u2013 August 16, 2026",

  /* ----------------------------------------------------------------- BRIEF */
  brief: {
    title: "The brief",
    lede: "If you read nothing else, read this. It is the whole period in four lines.",
    items: [
      {
        role: "Headline",
        text: "No advertising ran this period, and search still grew. Google sent 19.6% more visits per day than in the two weeks before, and the share of people who clicked improved by 1.3 points.",
        client: {
          role: "Headline",
          text: "Search grew this period without any advertising behind it. Google sent 19.6% more visits per day than in the two weeks before, and a higher share of the people who saw the practice chose to click through.",
        },
      },
      {
        role: "What worked",
        text: "Doctor-led editorial content. The three reels and three posts published were all clinical or professional in tone, and they earned 268 interactions against a reach of roughly 2,600 \u2014 an engagement rate of 10.3%.",
      },
      {
        role: "Primary concern",
        text: "Reach fell 74% per day once the paid flight ended on August 2. Engagement rate rose only because the denominator shrank faster than the numerator. Interactions themselves were down 22% per day.",
        client: {
          role: "What we are watching",
          text: "The advertising flight concluded on August 2, so fewer people saw the practice this period than in the two weeks before. The people who did see it engaged more closely than they had while the ads were running.",
        },
      },
      {
        role: "The number that matters",
        text: "48 people clicked a booking link in fourteen days \u2014 26 for Midtown, 22 for the Upper East Side. Every other figure in this report measures attention. This one measures intent.",
      },
    ],
  },

  /* ---------------------------------------------------------------- PERIOD */
  period_: {
    lede: "Daily website visitors across the full thirty days. The shaded band is the advertising flight, which concluded on August 2. The reporting period is everything after it.",
    paidLabel: "Advertising flight",
    windowLabel: "Reporting period",
    daily: [
      { d: "Jul 18", v: 53, paid: true }, { d: "Jul 19", v: 51, paid: true },
      { d: "Jul 20", v: 73, paid: true }, { d: "Jul 21", v: 78, paid: true },
      { d: "Jul 22", v: 87, paid: true }, { d: "Jul 23", v: 55, paid: true },
      { d: "Jul 24", v: 68, paid: true }, { d: "Jul 25", v: 50, paid: true },
      { d: "Jul 26", v: 66, paid: true }, { d: "Jul 27", v: 93, paid: true },
      { d: "Jul 28", v: 103, paid: true }, { d: "Jul 29", v: 98, paid: true },
      { d: "Jul 30", v: 32, paid: true }, { d: "Jul 31", v: 27, paid: true },
      { d: "Aug 1", v: 53, paid: true }, { d: "Aug 2", v: 46, paid: true },
      { d: "Aug 3", v: 74 }, { d: "Aug 4", v: 40 }, { d: "Aug 5", v: 40 },
      { d: "Aug 6", v: 46 }, { d: "Aug 7", v: 34 }, { d: "Aug 8", v: 29 },
      { d: "Aug 9", v: 39 }, { d: "Aug 10", v: 62 }, { d: "Aug 11", v: 58 },
      { d: "Aug 12", v: 63 }, { d: "Aug 13", v: 59 }, { d: "Aug 14", v: 28 },
      { d: "Aug 15", v: 12 }, { d: "Aug 16", v: 18 },
    ],
    note: "Website visitors ran at 64.6 a day while the flight was live and 43.0 a day after it ended. The practice did not become less visible; the spend stopped.",
    noteClient: "Website visitors ran at 64.6 a day while the advertising was live and 43.0 a day after it concluded on August 2.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Every number here covers August 3 to 16 and comes from a platform export. Where a comparison is shown, it is against the sixteen days before.",
    rows: [
      { k: "Website sessions", v: "763", c: "\u221233% per day", dir: "down", note: "Advertising concluded August 2" },
      { k: "New website visitors", v: "602", c: "43.0 a day", dir: "flat", note: "64.6 a day in the prior period" },
      { k: "Search clicks", v: "134", c: "+19.6% per day", dir: "up", note: "Best-performing channel this period" },
      { k: "Search impressions", v: "1,102", c: "+6.5% per day", dir: "up", note: "78.7 a day" },
      { k: "Search click rate", v: "12.16%", c: "+1.3 points", dir: "up", note: "10.82% in the prior period" },
      { k: "Instagram interactions", v: "268", c: "\u221222% per day", dir: "down", note: "Account-level total" },
      { k: "Instagram engagement rate", v: "10.3%", c: "+6.9 points", dir: "up", note: "Interactions divided by reach" },
      { k: "Content published", v: "12", c: "0.86 a day", dir: "flat", note: "3 posts, 3 reels, 6 stories" },
      { k: "Short link clicks", v: "246", c: "\u22125.2%", dir: "flat", note: "Broadly level with the prior period" },
      { k: "Booking link clicks", v: "48", c: "Midtown 26 \u00b7 UES 22", dir: "up", note: "The clearest signal of intent" },
      { k: "Podcast downloads", v: "175", c: "No new episode", dir: "flat", note: "Back catalogue and residual traffic" },
    ],
  },

  /* ---------------------------------------------------------------- WORKED */
  worked: {
    lede: "Six pieces went out on the feed this period. All six were clinical or professional in tone, and that is the pattern worth keeping.",
    ledeClient: "Six pieces went out on the feed this period. All six were clinical or professional in tone, and that is the pattern worth keeping.",
    hero: {
      url: "https://www.instagram.com/reel/DcBsXFChBmd/",
      title: "Oral health is closely connected to your overall health",
      date: "August 14",
      format: "Reel",
      stats: [
        { v: "875", l: "Views" }, { v: "572", l: "Reach" },
        { v: "51", l: "Interactions" }, { v: "33.4%", l: "Watched past 3s" },
      ],
      why: "The strongest piece of the period on every measure. It held attention for nine seconds on average, and a third of everyone served it stayed past the opening three. Systemic-health framing is doing real work for this account.",
    },
    gallery: [
      { url: "https://www.instagram.com/p/Dbln3Q-B2e7/", title: "Now published in the International Journal of Periodontics & Restorative Dentistry", date: "August 3", format: "Post", views: 514, reach: 229, interactions: 14 },
      { url: "https://www.instagram.com/reel/DboRAFaBy0n/", title: "What does it mean to be the \u201cMayo Clinic of dentistry\u201d?", date: "August 4", format: "Reel", views: 657, reach: 403, interactions: 17 },
      { url: "https://www.instagram.com/reel/Dbvqv7RBep2/", title: "When business decisions start driving patient care", date: "August 10", format: "Reel", views: 651, reach: 474, interactions: 17 },
      { url: "https://www.instagram.com/p/Dbv-de3hqzI/", title: "Dr. El Chaar\u2019s latest editorial on periodontal and peri-implant disease", date: "August 7", format: "Post", views: 513, reach: 177, interactions: 8 },
      { url: "https://www.instagram.com/p/DbwH5LsBUMd/", title: "Earning the trust of our patients through compassionate care", date: "August 12", format: "Post", views: 310, reach: 132, interactions: 6 },
    ],
    galleryNote: "Ranked by views. Post-level figures compare content against content; they are never summed to build a total.",
  },

  /* ------------------------------------------------- ATTENTION (internal)  */
  attention: {
    lede: "Six things worth an owner and a decision before the next cycle.",
    items: [
      {
        tag: "Real gap",
        title: "The email list is not reaching one address in eight",
        body: "Both July sends bounced at 11.9% and 12.1% \u2014 roughly 415 undeliverable addresses each time. A healthy list runs under 2%. Sustained at this level it also puts inbox placement at risk for the addresses that are valid.",
      },
      {
        tag: "Real gap",
        title: "The podcast has been quiet since July 27",
        body: "No episode published in the reporting period, and the gap since the last one is now the longest of 2026. That episode is performing well \u2014 24 downloads, 5 of them in the last seven days, the strongest recent-week figure of any episode. The format works; the cadence is the constraint.",
      },
      {
        tag: "Ceiling",
        title: "Search only works for people who already know the name",
        body: "Across thirty days, 39 brand queries earned 102 of 103 visible clicks. Sixty-three non-brand queries earned one, and it was somebody searching a different dentist. Every /dental-service/ page sits at zero clicks.",
      },
      {
        tag: "Opportunity",
        title: "People search the practice address and do not arrive",
        body: "\u201c933 5th avenue nyc\u201d and \u201c933 fifth avenue nyc\u201d together drew 45 impressions and zero clicks across thirty days, both ranking around position 9.5. This is the most fixable item in the report.",
      },
      {
        tag: "Access",
        title: "Facebook activity is happening but cannot be measured",
        body: "The DDS PC page was unlinked from Instagram and a personal creator account linked in its place. Posting continues; the analytics are not reachable, because a personal account cannot be connected to Metricool. Facebook is therefore left out of this report rather than shown as inactive. The workaround is to report a combined Meta figure pulled through Instagram, which would need agreeing before the next cycle.",
      },
      {
        tag: "Watch",
        title: "Mobile ranks better and converts worse",
        body: "Mobile draws more impressions than desktop (575 against 525) at nearly four positions better placement, yet converts at 9.39% against desktop's 15.24%. The pattern holds across both windows, so it is structural rather than noise.",
      },
    ],
  },

  /* --------------------------------------------------------------- LEARNED */
  learned: {
    lede: "Six things this period taught us that we did not know a fortnight ago.",
    items: [
      {
        title: "Editorial content is this account\u2019s strongest register",
        body: "Every piece published was clinical or professional \u2014 a journal publication, an editorial, two conversations about the profession, a systemic-health explainer. Posts and reels performed almost identically (120 and 115 interactions from three pieces each), which does not usually happen. When a post carries genuine professional substance it holds its own against video.",
      },
      {
        title: "The advertising bought reach and nothing else",
        body: "Across thirty days, 1,850 advertising views produced two interactions. The flight moved people to the site \u2014 245 sessions \u2014 but it did not produce engagement, follows or participation. That is worth knowing before the next flight is planned.",
        client: {
          title: "Advertising and organic content do different jobs",
          body: "The July flight brought 245 visits to the website. The organic content over the same stretch is what produced the conversation \u2014 the follows, comments and shares. The two are worth planning as complements rather than substitutes.",
        },
      },
      {
        title: "One recording served two channels",
        body: "The July 27 podcast episode became the August 1 reel, which drew 1,324 reach \u2014 the widest of any reel in the thirty days. The episode itself is the fastest-moving in the recent catalogue. One conversation, two channels, both performing.",
      },
      {
        title: "A globally distributed podcast has a local audience",
        body: "The podcast reaches 115 countries and 1,055 cities. New York State alone accounts for 981 lifetime downloads across 91 cities \u2014 19.2% of everything. A show made for the profession is being heard in the practice\u2019s own catchment.",
      },
      {
        title: "Carousels outperform single images",
        body: "Across thirty days the four carousels averaged 1,014 views; six single images averaged 548. The strongest post of the month by a wide margin was the Dr. Vitaliya Sobol carousel on July 19, at 2,042 views.",
      },
      {
        title: "Booking links are the only direct measure of intent",
        body: "48 clicks in fourteen days, split almost evenly between Midtown and the Upper East Side. Reach and views measure who noticed; this measures who acted. It deserves a permanent place at the top of the scoreboard.",
      },
    ],
  },

  /* ---------------------------------------------------- MOVES (internal)   */
  moves: {
    lede: "Five actions, each with an owner and the number that will judge it.",
    items: [
      {
        action: "Clean the email list before the next send",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next campaign",
        body: "Run the list through verification and suppress hard bounces. At 12% the practice is paying to send to roughly 415 addresses that do not exist, and risking placement for the ones that do.",
      },
      {
        action: "Get the podcast back on a monthly cadence",
        owner: "Practice \u00b7 Figment to schedule",
        metric: "One episode published before the next report",
        body: "The July 27 episode is the strongest recent performer and it fed the widest-reaching reel of the month. The asset works; it needs feeding.",
      },
      {
        action: "Claim the address searches",
        owner: "Figment",
        metric: "First click from an address query",
        body: "45 impressions and zero clicks on \u201c933 5th avenue\u201d variants. Add the address in structured data, confirm the Google Business Profile matches, and give the locations page a title that names the street.",
      },
      {
        action: "Put a booking link on every doctor page",
        owner: "Figment",
        metric: "Booking clicks above 48 next cycle",
        body: "The doctor pages draw 21 search clicks and 588 impressions, and booking links are already the strongest intent signal we have. Shorten the path between the two.",
      },
      {
        action: "Publish two more systemic-health pieces",
        owner: "Figment",
        metric: "Match or beat 33.4% three-second view rate",
        body: "The August 14 reel outperformed everything on watch time and view rate. Find out whether the framing repeats before drawing conclusions from one result.",
      },
    ],
  },

  /* ------------------------------------------------------- PLAN (client)   */
  plan: {
    lede: "Five things we will do next, and why each one follows from what this period showed.",
    items: [
      {
        action: "Review the email list before the next send",
        body: "A share of the list is no longer reaching people. We will verify the addresses so that every send lands with the patients it is meant for, which also protects delivery for everyone else on the list.",
      },
      {
        action: "Return the podcast to a monthly rhythm",
        body: "The July episode is among the strongest in the catalogue and it became the widest-reaching reel of the month. Publishing on a regular cadence gives both channels something to work with.",
      },
      {
        action: "Make the practice easier to find by address",
        body: "People search for the practice by street address and the site currently appears too far down for them to reach it. We will make the address explicit for search engines and confirm the listings match.",
      },
      {
        action: "Put a booking link at the top of every doctor page",
        body: "The doctor pages are among the strongest performers in search, and booking links are already the clearest sign of patient intent. Shortening the path between the two builds on a strength.",
      },
      {
        action: "Publish more on the link between oral and overall health",
        body: "The August 14 reel on systemic health held attention longer than anything else this period. We will publish two more in that register to learn whether the result repeats.",
      },
    ],
  },

  /* ---------------------------------------------------------------- DETAIL */
  detail: {
    lede: "Supporting figures, and how each was derived.",
    panels: [
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "763"],
          ["New visitors", "602"],
          ["Landing-page views", "1,068"],
          ["Desktop / mobile", "84% / 16%"],
          ["Direct", "470 sessions \u00b7 61.7%"],
          ["Google organic", "223 sessions \u00b7 29.3%"],
          ["Paid", "None this period"],
        ],
        note: "Google Analytics 4, August 3 to 16. Two referral domains with no human traffic were removed before totals were taken. The desktop share is unusually high and follows the end of the advertising flight, which skewed mobile; it is worth reading across one more period before drawing a conclusion.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "134"],
          ["Impressions", "1,102"],
          ["Click rate", "12.16%"],
          ["Average position", "5.74"],
          ["Homepage", "95 clicks \u00b7 781 impressions"],
          ["Our Doctors", "21 clicks \u00b7 588 impressions"],
          ["Doctors, Upper East Side", "9 clicks \u00b7 154 impressions"],
          ["Locations", "8 clicks \u00b7 209 impressions"],
        ],
        note: "Google Search Console, August 3 to 16, fourteen complete days. Totals are summed from the daily chart export rather than the query export, which withholds 57% of clicks and 68% of impressions as low-volume queries. Average position is the impression-weighted figure for United States traffic. The page table cannot be used for totals, as one impression may be attributed to several pages.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Followers", "3,208 \u00b7 up 15"],
          ["Interactions", "268"],
          ["Reach", "\u2248 2,600 \u00b7 186 a day"],
          ["Engagement rate", "10.3%"],
          ["Published", "3 posts \u00b7 3 reels \u00b7 6 stories"],
          ["Interactions by format", "Posts 120 \u00b7 Reels 115 \u00b7 Stories 33"],
          ["Likes / comments / shares", "201 / 15 / 32"],
          ["Advertising", "None in period"],
        ],
        note: "Account-level figures reported by Metricool for August 3 to 16, not a sum of the individual posts. Post-level figures are used only to rank content against content, never to build a total. Engagement rate is interactions divided by reach.",
        noteClient: "Account-level figures reported by Metricool for August 3 to 16, rather than a sum of the individual posts. Post-level figures are used only to rank content against content. Engagement rate is interactions divided by reach.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Clicks", "246"],
          ["Homepage", "147"],
          ["Booking \u00b7 Midtown", "26"],
          ["Booking \u00b7 Upper East Side", "22"],
          ["Instagram", "4"],
          ["Website", "3"],
          ["Locations", "1"],
          ["Unattributed", "39"],
        ],
        note: "Short.io, August 3 to 16, filtered to human traffic. City-level figures are dominated by hosting infrastructure rather than readers and are not reported. New York, Brooklyn and Montr\u00e9al account for the identifiable local traffic.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["Campaigns in period", "None"],
          ["Gum Article \u00b7 July 22", "3,487 sent \u00b7 55.3% opened"],
          ["Summer Promo \u00b7 August 1", "3,443 sent \u00b7 53.5% opened"],
          ["Clicks", "30 and 53"],
          ["Click-to-open", "1.8% and 3.3%"],
        ],
        note: "No campaign was sent between August 3 and 16. The two most recent sends fall inside the thirty-day context and are shown for reference only. Open rates well above the healthcare benchmark of roughly 25%; the click-through is where the room to grow sits.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads in period", "175"],
          ["Lifetime downloads", "5,118"],
          ["Episodes published", "50"],
          ["Published in period", "None"],
          ["Most recent episode", "July 27"],
          ["Top app", "Spotify 25.4%"],
          ["Mobile share", "60%"],
          ["New York State", "981 lifetime \u00b7 19.2%"],
        ],
        note: "Buzzsprout, July 18 to August 16. No episode was published inside the reporting period, so the downloads are back catalogue and residual traffic from the July 27 episode. All figures comply with IAB Podcast Measurement Technical Guidelines 2.2.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the reporting period covers", a: "August 3 to 16, 2026 \u2014 fourteen whole calendar days. Where a comparison is shown, it is against July 18 to August 2, the sixteen days immediately before." },
          { q: "Why reach fell and engagement rate rose", a: "The advertising flight concluded on August 2. Interactions fell 22% per day; reach fell 74%. Engagement rate is interactions divided by reach, so the rate rose because the denominator contracted faster. It reflects a smaller, more invested audience rather than better content.", internalOnly: true },
          { q: "Why engagement rate rose", a: "Engagement rate is interactions divided by reach. Fewer people saw the practice this period, and a higher share of those who did chose to respond.", clientOnly: true },
          { q: "Where the search totals come from", a: "The daily chart export, not the query export. Google withholds low-volume queries from the query table \u2014 57% of clicks and 68% of impressions this period \u2014 so summing it would understate the channel substantially." },
          { q: "Where the Instagram totals come from", a: "Account-level figures reported by Metricool. Instagram\u2019s own native export was unavailable this cycle, and the two sources can differ. Post-level figures rank content against content and are never summed into a total.", internalOnly: true },
          { q: "Where the Instagram totals come from", a: "Account-level figures reported by Metricool for the period, rather than a sum of the individual posts. Post-level figures are used only to rank content against content." , clientOnly: true },
          { q: "How short link traffic is filtered", a: "Only human clicks are reported. Automated traffic is excluded from every figure, and city-level breakdowns are omitted because they reflect hosting infrastructure rather than readers." },
          { q: "What is missing this period", a: "No advertising ran, no email campaign was sent, and no podcast episode was published. Those channels are reported here rather than shown as empty views. Facebook is posted to but is not currently measurable, so it is not reported.", internalOnly: true },
          { q: "What is missing this period", a: "No advertising ran, no email campaign was sent, and no podcast episode was published. Those channels are reported here rather than shown as empty views.", clientOnly: true },
        ] as { q: string; a: string; internalOnly?: boolean; clientOnly?: boolean }[],
        note: "",
      },
    ],
  },
};
