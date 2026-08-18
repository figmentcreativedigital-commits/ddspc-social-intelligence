"use client";
import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   VARIANT
   Set per Vercel project, never in this file. Unset falls back to "client",
   so a missing or misspelt variable can only ever produce the client report.
   ========================================================================== */
type Variant = "client" | "internal";
const VARIANT: Variant =
  process.env.NEXT_PUBLIC_REPORT_VARIANT === "internal" ? "internal" : "client";
const IS_INTERNAL: boolean = VARIANT === "internal";

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

const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
const has = (id: string) => NAV.some((n) => n.id === id);

/* ==========================================================================
   REPORT
   Every figure below traces to a source export. Nothing is estimated.
   Each cycle: edit numbers and narrative strings here. Do not touch the JSX.
   ========================================================================== */
const R = {
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
    lede: "Five things worth an owner and a decision before the next cycle.",
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
        id: "facebook",
        title: "Facebook",
        rows: [
          ["Followers", "1,334"],
          ["Posts published", "None"],
          ["Reactions", "0"],
          ["Followers gained", "0"],
        ],
        note: "The page is currently inactive. Nothing was published in the reporting period and no engagement was recorded. Meta also retired the metric behind the page views figure in June 2026, so what remains is not comparable with earlier periods.",
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
          { q: "What is missing this period", a: "No advertising ran, no email campaign was sent, no podcast episode was published, and nothing was posted to Facebook. Those sections are reported here rather than shown as empty views." },
        ] as { q: string; a: string; internalOnly?: boolean; clientOnly?: boolean }[],
        note: "",
      },
    ],
  },
};

/* ==========================================================================
   STYLE
   Tokens taken from edgardelchaar.com so the report reads as the practice's
   own, not as a dashboard. Three faces: Prata display, Marcellus subhead,
   Glacial Indifference body (self-hosted, SIL Open Font License).
   ========================================================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Prata&family=Marcellus&display=swap');

@font-face {
  font-family: 'Glacial Indifference';
  src: url('/fonts/GlacialIndifference-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Glacial Indifference';
  src: url('/fonts/GlacialIndifference-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}

:root {
  --plum: #68505D;
  --plum-dark: #574250;
  --plum-light: #7D6570;
  --nav: #88A3AE;
  --nav-dark: #7494A1;
  --band-blue: #BFCBCE;
  --band-light: #F2EAE6;
  --band-warm: #E8E3DE;
  --rule: #C5BDB5;
  --rule-soft: rgba(104,80,93,0.16);
  --ink: #151515;
  --body: #2A2A2A;
  --muted: #777777;
  --white: #FFFFFF;
  --display: 'Prata', Georgia, serif;
  --sub: 'Marcellus', Georgia, serif;
  --text: 'Glacial Indifference', 'Helvetica Neue', Arial, sans-serif;
  --max: 1500px;
  --gut: clamp(20px, 5vw, 80px);
  --sec: clamp(56px, 8vw, 120px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--text); font-size: 17px; line-height: 1.6;
  color: var(--body); background: var(--white);
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4 { font-family: var(--display); font-weight: 400; line-height: 1.25; color: var(--plum); text-wrap: balance; }
a { color: inherit; text-decoration: none; }
::selection { background: var(--band-blue); color: var(--ink); }

/* ---------- reveal ----------
   The hidden state is the CSS default and a <noscript> block reverses it.
   Nothing mutates <html>: doing so before React hydrates causes a real
   hydration mismatch in Next.js, where RootLayout owns that element. */
.rv { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.rv.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .rv, .rv.in { opacity: 1 !important; transform: none !important; transition: none !important; }
}

/* ---------- layout ---------- */
.wrap { max-width: var(--max); margin: 0 auto; padding-left: var(--gut); padding-right: var(--gut); }
.band { padding-top: var(--sec); padding-bottom: var(--sec); }
.band-white { background: var(--white); }
.band-light { background: var(--band-light); }
.band-warm { background: var(--band-warm); }
.band-blue { background: var(--band-blue); }
.band-plum { background: var(--plum); }
.band-plum h2, .band-plum h3 { color: var(--white); }
.band-plum .sec-lede, .band-plum .sec-num { color: rgba(255,255,255,.78); }

/* ---------- masthead ---------- */
.mast { background: var(--nav); color: var(--white); padding: 46px 0 40px; }
.mast h1 { color: var(--white); font-size: clamp(30px, 4.2vw, 54px); line-height: 1.14; margin-bottom: 14px; }
.mast-kicker { font-family: var(--text); font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.82); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.mast-badge { display: inline-block; background: var(--plum); color: var(--white); padding: 4px 12px; border-radius: 30px; letter-spacing: .12em; font-size: 10.5px; }
.mast-sub { font-family: var(--sub); font-size: clamp(17px, 1.6vw, 21px); color: var(--white); letter-spacing: .01em; }
.mast-meta { margin-top: 26px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.28); display: flex; gap: 40px; flex-wrap: wrap; font-size: 14px; color: rgba(255,255,255,.9); }
.mast-meta b { display: block; font-weight: 700; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.7); margin-bottom: 5px; }

/* ---------- nav rail ---------- */
.rail { position: sticky; top: 0; z-index: 90; background: var(--white); border-bottom: 1px solid var(--rule); }
/* Longhand only: this element also carries .wrap, and a padding shorthand
   here would reset the horizontal gutter that .wrap sets. */
.rail-in { display: flex; gap: 26px; overflow-x: auto; padding-top: 14px; padding-bottom: 14px; scrollbar-width: none; }
.rail-in::-webkit-scrollbar { display: none; }
.rail a { font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); white-space: nowrap; padding-bottom: 3px; border-bottom: 2px solid transparent; transition: color .25s, border-color .25s; }
.rail a:hover, .rail a:focus-visible { color: var(--plum); border-bottom-color: var(--plum); }

/* ---------- section furniture ---------- */
.sec-head { max-width: 62ch; margin-bottom: 46px; }
.sec-num { font-family: var(--text); font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--nav-dark); display: block; margin-bottom: 14px; }
.sec-t { font-size: clamp(26px, 3.2vw, 42px); margin-bottom: 16px; }
.sec-lede { font-family: var(--sub); font-size: clamp(17px, 1.5vw, 20px); line-height: 1.55; color: var(--body); }

/* ---------- brief ---------- */
.brief-i { display: grid; grid-template-columns: minmax(150px, 210px) 1fr; gap: 32px; padding: 30px 0; border-top: 1px solid var(--rule); }
.brief-i:last-child { border-bottom: 1px solid var(--rule); }
.brief-role { font-family: var(--text); font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--plum); padding-top: 5px; }
.brief-text { font-family: var(--sub); font-size: clamp(18px, 1.7vw, 23px); line-height: 1.5; color: var(--ink); max-width: 46ch; }
@media (max-width: 760px) { .brief-i { grid-template-columns: 1fr; gap: 10px; } }

/* ---------- period chart ---------- */
.chart { margin-top: 8px; }
.chart-key { display: flex; gap: 26px; flex-wrap: wrap; margin-bottom: 22px; font-size: 12.5px; color: var(--body); }
.chart-key span { display: flex; align-items: center; gap: 8px; }
.chart-key i { width: 13px; height: 13px; display: inline-block; border-radius: 2px; }
.bars { display: flex; align-items: flex-end; gap: 2px; height: 230px; padding-bottom: 2px; border-bottom: 1px solid var(--plum); }
.bar { flex: 1; min-width: 0; position: relative; background: var(--plum); transition: opacity .25s; }
.bar.paid { background: var(--nav); }
.bar:hover { opacity: .72; }
.bar-cap { position: absolute; inset: auto 0 100% 0; text-align: center; font-size: 10px; color: var(--muted); padding-bottom: 3px; opacity: 0; transition: opacity .2s; }
.bar:hover .bar-cap { opacity: 1; }
.axis { display: flex; justify-content: space-between; margin-top: 10px; font-size: 11.5px; color: var(--muted); letter-spacing: .04em; }
.chart-note { margin-top: 26px; font-size: 15px; line-height: 1.6; color: var(--body); max-width: 62ch; padding-left: 16px; border-left: 2px solid var(--nav); }

/* ---------- scoreboard ---------- */
.score { border-top: 1px solid var(--rule); }
.score-r { display: grid; grid-template-columns: 1.5fr auto 1fr; gap: 24px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--rule); }
.score-k { font-family: var(--sub); font-size: 18px; color: var(--ink); }
.score-v { font-family: var(--display); font-size: clamp(24px, 2.6vw, 34px); color: var(--plum); text-align: right; letter-spacing: .01em; }
.score-m { text-align: right; }
.score-c { font-size: 13px; font-weight: 700; letter-spacing: .04em; }
.score-c.up { color: #3F6B54; }
.score-c.down { color: #9A5F5F; }
.score-c.flat { color: var(--muted); }
.score-n { font-size: 12.5px; color: var(--muted); margin-top: 3px; }
@media (max-width: 760px) {
  .score-r { grid-template-columns: 1fr auto; gap: 8px 16px; }
  .score-m { grid-column: 1 / -1; text-align: left; }
}

/* ---------- instagram frames ---------- */
.hero-card { display: grid; grid-template-columns: 440px 1fr; gap: 52px; align-items: start; }
@media (max-width: 980px) { .hero-card { grid-template-columns: 1fr; gap: 30px; } }
/* The site rounds one edge of its hero imagery into a lozenge. At 3:4 a full
   999px radius collapses into a half-circle and eats the picture, so the
   reference is kept at a restrained 150px on the leading edge only. */
.ig-frame { position: relative; width: 100%; max-width: 440px; aspect-ratio: 3/4; overflow: hidden; background: #0a0809; border-radius: 150px 0 0 150px; }
.ig-frame iframe { position: absolute; top: -64px; left: -1px; width: calc(100% + 2px); height: calc(100% + 140px); border: none; pointer-events: none; }
.ig-frame:hover iframe { pointer-events: auto; }
.hero-fmt { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--nav-dark); margin-bottom: 12px; }
.hero-t { font-family: var(--display); font-size: clamp(22px, 2.3vw, 31px); line-height: 1.3; color: var(--plum); margin-bottom: 22px; max-width: 22ch; }
.hero-stats { display: flex; gap: 40px; flex-wrap: wrap; padding: 22px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 22px; }
.hero-s-v { font-family: var(--display); font-size: 28px; color: var(--plum); display: block; }
.hero-s-l { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-top: 4px; display: block; }
.hero-why { font-size: 16px; line-height: 1.65; max-width: 48ch; }

.gal { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 30px; margin-top: 56px; }
.gal-i .ig-frame { max-width: none; border-radius: 0; aspect-ratio: 3/4; }
.gal-m { margin-top: 14px; }
.gal-fmt { font-size: 10.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--nav-dark); }
.gal-t { font-family: var(--sub); font-size: 15.5px; line-height: 1.4; color: var(--ink); margin: 6px 0 10px; }
.gal-s { font-size: 12.5px; color: var(--muted); }
.gal-note { margin-top: 34px; font-size: 13.5px; color: var(--muted); max-width: 62ch; }

/* ---------- attention ---------- */
.att-i { padding: 30px 0; border-top: 1px solid var(--rule-soft); }
.att-i:last-child { border-bottom: 1px solid var(--rule-soft); }
.att-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--white); background: var(--plum); padding: 4px 11px; border-radius: 30px; margin-bottom: 14px; }
.att-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 25px); line-height: 1.35; margin-bottom: 12px; max-width: 34ch; }
.att-b { font-size: 15.5px; line-height: 1.65; max-width: 62ch; }

/* ---------- learned ---------- */
.learn { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 44px 56px; }
.learn-t { font-family: var(--display); font-size: 21px; line-height: 1.35; color: var(--plum); margin-bottom: 12px; padding-top: 18px; border-top: 2px solid var(--nav); }
.learn-b { font-size: 15.5px; line-height: 1.65; }

/* ---------- moves / plan ---------- */
.mv-i { display: grid; grid-template-columns: 1fr 260px; gap: 40px; padding: 30px 0; border-top: 1px solid var(--rule); }
.mv-i:last-child { border-bottom: 1px solid var(--rule); }
.mv-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 24px); line-height: 1.35; color: var(--plum); margin-bottom: 12px; max-width: 26ch; }
.mv-b { font-size: 15.5px; line-height: 1.65; max-width: 54ch; }
.mv-meta b { display: block; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.mv-meta p { font-size: 14.5px; margin-bottom: 16px; color: var(--ink); }
@media (max-width: 860px) { .mv-i { grid-template-columns: 1fr; gap: 18px; } }

.plan-i { display: grid; grid-template-columns: 10px 1fr; gap: 24px; padding: 28px 0; border-top: 1px solid var(--rule); }
.plan-i:last-child { border-bottom: 1px solid var(--rule); }
.plan-m { width: 10px; height: 10px; border-radius: 999px; background: var(--nav); margin-top: 13px; }
.plan-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 24px); line-height: 1.35; color: var(--plum); max-width: 30ch; }
.plan-b { font-size: 15.5px; line-height: 1.65; margin-top: 10px; max-width: 60ch; }

/* ---------- detail ---------- */
.disc { border-top: 1px solid var(--rule); }
.disc-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; background: none; border: none; border-bottom: 1px solid var(--rule); cursor: pointer; font-family: var(--sub); font-size: 19px; color: var(--plum); text-align: left; }
.disc-btn:hover { color: var(--plum-dark); }
.disc-btn:focus-visible { outline: 2px solid var(--plum); outline-offset: 3px; }
.disc-x { font-family: var(--text); font-size: 22px; line-height: 1; color: var(--nav-dark); flex-shrink: 0; }
.disc-p { padding: 26px 0 34px; border-bottom: 1px solid var(--rule); }
.disc-p[hidden] { display: none; }
.t { width: 100%; border-collapse: collapse; max-width: 640px; margin-bottom: 20px; }
.t td { padding: 9px 0; border-bottom: 1px solid var(--rule-soft); font-size: 15px; vertical-align: top; }
.t td:first-child { color: var(--muted); padding-right: 26px; }
.t td:last-child { text-align: right; font-weight: 700; color: var(--ink); white-space: nowrap; }
.d-note { font-size: 13.5px; line-height: 1.65; color: var(--muted); max-width: 68ch; }
.faq-i { padding: 16px 0; border-bottom: 1px solid var(--rule-soft); max-width: 68ch; }
.faq-q { font-family: var(--sub); font-size: 16px; color: var(--ink); margin-bottom: 5px; }
.faq-a { font-size: 14.5px; line-height: 1.65; color: var(--muted); }

/* ---------- footer ---------- */
.foot { background: var(--plum); color: rgba(255,255,255,.8); padding: 44px 0; font-size: 13.5px; }
.foot-in { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }

/* ---------- print ---------- */
.print-only { display: none; }
@media print {
  .rv { opacity: 1 !important; transform: none !important; }
  .rail, .mast-meta { display: none; }
  .ig-frame { display: none; }
  .print-only { display: block; border: 1px solid var(--rule); padding: 16px; font-size: 13px; }
  .print-only b { display: block; font-family: var(--sub); font-size: 15px; color: var(--plum); margin-bottom: 4px; }
  .disc-p[hidden] { display: block !important; }
  .band { padding-top: 34px; padding-bottom: 34px; break-inside: avoid; }
  .band-plum, .mast { background: var(--white) !important; color: var(--ink) !important; }
  .mast h1, .mast-sub, .mast-kicker { color: var(--plum) !important; }
  .foot { background: var(--white) !important; color: var(--muted) !important; border-top: 1px solid var(--rule); }
}
`;

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */

/* Scroll reveal. The hidden state is the CSS default and a <noscript> block
   reverses it, so the report still reads with JavaScript off. Nothing touches
   <html>: mutating it before hydration is a real mismatch in Next.js, where
   RootLayout owns that element. */
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return <div ref={ref} className={`rv${seen ? " in" : ""}`}>{children}</div>;
}

function Section({
  id, num, title, lede, band = "white", children,
}: {
  id: string; num: string; title: string; lede?: string;
  band?: "white" | "light" | "warm" | "blue" | "plum";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`band band-${band}`}>
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">Section {num}</span>
            <h2 className="sec-t">{title}</h2>
            {lede ? <p className="sec-lede">{lede}</p> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Signature chart: daily visitors across the full thirty days, with the
   advertising flight shaded so the reporting period reads in context. */
function PeriodChart({ data }: { data: { d: string; v: number; paid?: boolean }[] }) {
  if (!data.length) return null;
  const top = Math.max(...data.map((x) => x.v)) || 1;
  return (
    <div className="chart">
      <div className="chart-key">
        <span><i style={{ background: "var(--nav)" }} />{R.period_.paidLabel} &middot; Jul 18 &ndash; Aug 2</span>
        <span><i style={{ background: "var(--plum)" }} />{R.period_.windowLabel} &middot; Aug 3 &ndash; 16</span>
      </div>
      <div className="bars">
        {data.map((x) => (
          <div
            key={x.d}
            className={`bar${x.paid ? " paid" : ""}`}
            style={{ height: `${Math.max((x.v / top) * 100, 2)}%` }}
          >
            <span className="bar-cap">{x.v}</span>
          </div>
        ))}
      </div>
      <div className="axis">
        <span>Jul 18</span><span>Jul 25</span><span>Aug 2</span><span>Aug 9</span><span>Aug 16</span>
      </div>
    </div>
  );
}

/* Instagram embeds render straight from the /embed endpoint: no API, no
   token, no files to manage. Normalisation handles every link form
   Instagram produces (/p/, /reel/, /reels/, with or without query strings). */
function igEmbed(url: string) {
  const m = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/p/${m[1]}/embed` : url;
}

function IgFrame({ url, title }: { url: string; title: string }) {
  return (
    <>
      <div className="ig-frame">
        <iframe src={igEmbed(url)} title={title} scrolling="no" loading="lazy" allowFullScreen />
      </div>
      <div className="print-only"><b>{title}</b>Instagram post &middot; view online</div>
    </>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function Page() {
  const [open, setOpen] = useState<string | null>("website");
  const d = R.detail;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* With JavaScript off the observer never fires, so reverse the hidden
          state here. This is inert markup, identical on server and client. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>.rv{opacity:1!important;transform:none!important}</style>",
        }}
      />

      {/* MASTHEAD */}
      <header className="mast">
        <div className="wrap">
          <div className="mast-kicker">
            <span>{R.studio} &middot; Social Intelligence</span>
            {IS_INTERNAL ? <span className="mast-badge">Internal</span> : null}
          </div>
          <h1>{R.client}</h1>
          <p className="mast-sub">Performance report &middot; {R.period}</p>
          <div className="mast-meta">
            <div><b>Reporting period</b>{R.period}</div>
            <div><b>Comparison</b>July 18 &ndash; August 2, 2026</div>
            <div><b>Advertising</b>None in period</div>
            <div><b>Content published</b>12 pieces</div>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="rail" aria-label="Report sections">
        <div className="wrap rail-in">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
      </nav>

      <main>
        {/* ------------------------------------------------------- BRIEF */}
        <Section id="brief" num={numOf("brief")} title={R.brief.title} lede={R.brief.lede} band="white">
          <Reveal>
            <div>
              {R.brief.items.map((item) => {
                const b = IS_INTERNAL ? item : (item.client ?? item);
                return (
                  <div className="brief-i" key={item.role}>
                    <div className="brief-role">{b.role}</div>
                    <p className="brief-text">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ PERIOD */}
        <Section id="period" num={numOf("period")} title="The period in one picture" lede={R.period_.lede} band="light">
          <Reveal>
            <div>
              <PeriodChart data={R.period_.daily} />
              <p className="chart-note">{IS_INTERNAL ? R.period_.note : R.period_.noteClient}</p>
            </div>
          </Reveal>
        </Section>

        {/* -------------------------------------------------- SCOREBOARD */}
        <Section id="scoreboard" num={numOf("scoreboard")} title="Scoreboard" lede={R.scoreboard.lede} band="white">
          <Reveal>
            <div className="score">
              {R.scoreboard.rows.map((r) => (
                <div className="score-r" key={r.k}>
                  <div className="score-k">{r.k}</div>
                  <div className="score-v">{r.v}</div>
                  <div className="score-m">
                    <div className={`score-c ${r.dir}`}>{r.c}</div>
                    <div className="score-n">{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ WORKED */}
        <Section
          id="worked"
          num={numOf("worked")}
          title="What worked"
          lede={IS_INTERNAL ? R.worked.lede : R.worked.ledeClient}
          band="warm"
        >
          <Reveal>
            <div className="hero-card">
              <IgFrame url={R.worked.hero.url} title={R.worked.hero.title} />
              <div>
                <div className="hero-fmt">{R.worked.hero.format} &middot; {R.worked.hero.date} &middot; Best of the period</div>
                <h3 className="hero-t">{R.worked.hero.title}</h3>
                <div className="hero-stats">
                  {R.worked.hero.stats.map((s) => (
                    <div key={s.l}>
                      <span className="hero-s-v">{s.v}</span>
                      <span className="hero-s-l">{s.l}</span>
                    </div>
                  ))}
                </div>
                <p className="hero-why">{R.worked.hero.why}</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="gal">
                {R.worked.gallery.map((g) => (
                  <div className="gal-i" key={g.url}>
                    <IgFrame url={g.url} title={g.title} />
                    <div className="gal-m">
                      <div className="gal-fmt">{g.format} &middot; {g.date}</div>
                      <div className="gal-t">{g.title}</div>
                      <div className="gal-s">
                        {g.views.toLocaleString()} views &middot; {g.reach.toLocaleString()} reach &middot; {g.interactions} interactions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="gal-note">{R.worked.galleryNote}</p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------- ATTENTION (internal) */}
        {has("attention") && (
          <Section id="attention" num={numOf("attention")} title="What needs attention" lede={R.attention.lede} band="white">
            <Reveal>
              <div>
                {R.attention.items.map((a) => (
                  <div className="att-i" key={a.title}>
                    <span className="att-tag">{a.tag}</span>
                    <h3 className="att-t">{a.title}</h3>
                    <p className="att-b">{a.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* ----------------------------------------------------- LEARNED */}
        <Section id="learned" num={numOf("learned")} title="What we learned" lede={R.learned.lede} band="blue">
          <Reveal>
            <div className="learn">
              {R.learned.items.map((item) => {
                const l = IS_INTERNAL ? item : ((item as any).client ?? item);
                return (
                  <div key={item.title}>
                    <h3 className="learn-t">{l.title}</h3>
                    <p className="learn-b">{l.body}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        {/* ----------------------------------------------- MOVES (internal) */}
        {has("moves") && (
          <Section id="moves" num={numOf("moves")} title="Recommended next moves" lede={R.moves.lede} band="white">
            <Reveal>
              <div>
                {R.moves.items.map((m) => (
                  <div className="mv-i" key={m.action}>
                    <div>
                      <h3 className="mv-t">{m.action}</h3>
                      <p className="mv-b">{m.body}</p>
                    </div>
                    <div className="mv-meta">
                      <b>Owner</b><p>{m.owner}</p>
                      <b>Measured by</b><p>{m.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* -------------------------------------------------- PLAN (client) */}
        {has("plan") && (
          <Section id="plan" num={numOf("plan")} title="What we do next" lede={R.plan.lede} band="white">
            <Reveal>
              <div>
                {R.plan.items.map((p) => (
                  <div className="plan-i" key={p.action}>
                    <div className="plan-m" />
                    <div>
                      <h3 className="plan-t">{p.action}</h3>
                      <p className="plan-b">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* ------------------------------------------------------ DETAIL */}
        <Section id="detail" num={numOf("detail")} title="Supporting detail" lede={d.lede} band="light">
          <Reveal>
            <div className="disc">
              {d.panels.map((p) => {
                const isOpen = open === p.id;
                const note =
                  !IS_INTERNAL && (p as any).noteClient ? (p as any).noteClient : p.note;
                return (
                  <div key={p.id}>
                    <button
                      className="disc-btn"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${p.id}`}
                      onClick={() => setOpen(isOpen ? null : p.id)}
                    >
                      <span>{p.title}</span>
                      <span className="disc-x" aria-hidden="true">{isOpen ? "\u2013" : "+"}</span>
                    </button>
                    <div className="disc-p" id={`panel-${p.id}`} hidden={!isOpen}>
                      {p.rows.length > 0 && (
                        <table className="t">
                          <tbody>
                            {p.rows.map((row) => (
                              <tr key={row[0]}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {(p as any).faq
                        ? (p as any).faq
                            .filter((f: any) => (IS_INTERNAL ? !f.clientOnly : !f.internalOnly))
                            .map((f: any) => (
                              <div className="faq-i" key={f.q + (f.internalOnly ? "-i" : "")}>
                                <div className="faq-q">{f.q}</div>
                                <div className="faq-a">{f.a}</div>
                              </div>
                            ))
                        : null}
                      {note ? <p className="d-note">{note}</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>{R.client} &middot; {R.period}</span>
          <span>Prepared by {R.studio}</span>
        </div>
      </footer>
    </>
  );
}
