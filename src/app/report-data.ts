/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles.
   Edit the figures and narrative strings below; never edit page.tsx.

   THIS CYCLE — a single week.
     This report covers September 14 – 20 against September 7 – 13: two
     7-day windows, Monday to Sunday, directly comparable. The monthly view
     returns in October. Column pairing lives in `scoreboard.cols`, so changing
     it is a data edit.

   NEW SECTION — Social. A written summary of Instagram from the social team,
     shown in both builds after What worked. Figures in it are checked against
     the Metricool export; three were corrected to match (followers, views,
     daily reach).

   ENCODING — this file uses literal characters for apostrophes, dashes and
     the minus sign. No \u escapes. Keep it that way: mixing the two is what
     made string edits fail silently in earlier cycles.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Sep 14 – 20 and Sep 7 – 13, 2026
     Search Console                   Sep 14 – 20 and Sep 7 – 13, 2026
     Website (GA4)                    Sep 14 – 20 and Sep 7 – 13, 2026
     Short links (Short.io)           Sep 14 – 20 and Sep 7 – 13, 2026
     Podcast (Buzzsprout)             trailing 7 days, pulled Sep 21 and Sep 14
     Email (Constant Contact)         no campaign sent Sep 14 – 20

   OPEN BEFORE THIS GOES TO THE PRACTICE:
     - Re-pull Search Console Chart.csv on Wednesday, September 23. The last
       three days of this week read 2, 2 and 1 clicks, and September 7 – 13
       rose 6% between its first and second readings.
     - Confirm what /ddspc is and when it went live.
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
  period: "September 14 – 20, 2026",
  context: "September 14 – 20, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "September 14 – 20, 2026" },
    { k: "Compared with", v: "September 7 – 13, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
    { k: "Content published", v: "7 pieces" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in four points.",
    items: [
      {
        role: "Headline",
        text: "Instagram grew on every account measure. Search looks lower but has not finished processing. Website visitors rose 36%, but none of the increase traces to a channel we can identify, and visits from Google fell from 97 to 89.",
        client: {
          role: "Headline",
          text: "Instagram had a strong week. Views rose 25%, daily reach 23% and interactions 31%, and the account added followers again.",
        },
      },
      {
        role: "What improved",
        text: "Instagram views 2,567 to 3,207, daily reach 75 to 92, interactions 16 to 21. Booking link clicks 20 to 32: Midtown 13 to 18, Upper East Side 7 to 14. Story impressions more than doubled on five Stories against three.",
        client: {
          role: "What improved",
          text: "Clicks on the booking links rose from 20 to 32. Midtown went from 13 to 18 and Upper East Side from 7 to 14.",
        },
      },
      {
        role: "What softened",
        text: "Search clicks 68 to 55 and impressions 691 to 447. Friday through Sunday read 2, 2 and 1 clicks, which is where unprocessed data sits, and September 7 – 13 rose 6% between its first and second readings. Visits from Google search fell 97 to 89, which is the steadier signal.",
        client: {
          role: "What we are monitoring",
          text: "Search traffic was lower this week. Google continues processing data for several days, and the last days of this week are likely to rise. We will confirm the final figures before drawing conclusions.",
        },
      },
      {
        role: "Next action",
        text: "Re-pull search on Wednesday before this goes to the practice. Trace the direct website traffic, which is now elevated every day rather than on a few days.",
        client: {
          role: "What we are doing next",
          text: "We will keep building the patient-focused content that performed best, confirm the search figures once Google has finished processing them, and look into the website visitor numbers.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New website visitors each day across both weeks.",
    bandA: "Previous week · Sep 7 – 13",
    bandB: "This week · Sep 14 – 20",
    /* GA4 daily new visitors. `shade` marks the previous week. */
    daily: [
      { d: "Sep 7", v: 17, shade: true },
      { d: "Sep 8", v: 35, shade: true },
      { d: "Sep 9", v: 39, shade: true },
      { d: "Sep 10", v: 160, shade: true },
      { d: "Sep 11", v: 23, shade: true },
      { d: "Sep 12", v: 18, shade: true },
      { d: "Sep 13", v: 19, shade: true },
      { d: "Sep 14", v: 57 },
      { d: "Sep 15", v: 32 },
      { d: "Sep 16", v: 36 },
      { d: "Sep 17", v: 81 },
      { d: "Sep 18", v: 56 },
      { d: "Sep 19", v: 61 },
      { d: "Sep 20", v: 101 },
    ],
    note:
      "424 new visitors this week against 311. Last cycle the unexplained traffic was concentrated in five days. This week every day is elevated: 32 to 101, against 12 to 35 in the two weeks before August 31 apart from one day at 58. Direct visits rose from 280 to 371, a new source recorded as not set added 37, and landing pages went from 32 to 71, with 29 of those service pages drawing two or three views each. Visits from Google search fell from 97 to 89. The increase is not coming from any channel we can identify.",
    noteClient:
      "424 new visitors this week against 311. Most of the increase came through direct visits rather than search or social, and we have not yet been able to trace its source. Visits from Google search were 89 against 97. We are treating the higher total as unconfirmed until we know where it came from.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Fifteen measures, this week against the week before. Both weeks are 7 days, so every comparison is direct.",
    cols: [
      { label: "This week", sub: "Sep 14 – 20" },
      { label: "Previous week", sub: "Sep 7 – 13" },
    ],
    rows: [
      {
        k: "Instagram views",
        note: "Across posts, reels and Stories",
        cells: [{ v: "3,207", c: "+24.9%", dir: "up" }, { v: "2,567", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average number of accounts reached each day",
        cells: [{ v: "92", c: "+22.7%", dir: "up" }, { v: "75", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares on posts and reels",
        cells: [{ v: "21", c: "+31.3%", dir: "up" }, { v: "16", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach, posts and reels",
        cells: [{ v: "3.26%", c: "+0.21 points", dir: "up" }, { v: "3.05%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "4 new and 3 lost this week",
        cells: [{ v: "3,221", c: "+2", dir: "up" }, { v: "3,219", c: "−1", dir: "down" }],
      },
      {
        k: "Content published",
        note: "1 post, 1 reel and 5 Stories, against 2 posts and 3 Stories",
        cells: [{ v: "7", c: "+2", dir: "flat" }, { v: "5", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 18 and Upper East Side 14, against 13 and 7",
        cells: [{ v: "32", c: "+60.0%", dir: "up" }, { v: "20", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        cells: [{ v: "144", c: "+14.3%", dir: "up" }, { v: "126", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "Google is still processing the last days of this week, so this figure may rise",
        cells: [{ v: "55", c: "−19.1%", dir: "down" }, { v: "68", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        cells: [{ v: "447", c: "−35.3%", dir: "down" }, { v: "691", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        cells: [{ v: "12.30%", c: "+2.46 points", dir: "up" }, { v: "9.84%", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "Where the site appears in Google results, US searches only. Lower is better",
        cells: [{ v: "4.16", c: "from 3.72", dir: "down" }, { v: "3.72", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "The most reliable measure of website traffic this week",
        cells: [{ v: "89", c: "−8.2%", dir: "down" }, { v: "97", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "Includes a large share of visits we cannot yet trace to a source",
        cells: [{ v: "424", c: "+36.3%", dir: "flat" }, { v: "311", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "The week before was unusually strong. This week is closer to the usual level of about 30",
        cells: [{ v: "24", c: "−71.8%", dir: "down" }, { v: "85", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The reel about knowing patients personally led the week on views, reach and interactions. Both pieces published were about how the practice treats people, the same thing that worked last cycle.",
    ledeClient: "The best-performing content this week was about how the practice cares for its patients.",
    hero: {
      url: "https://www.instagram.com/reel/Ddb0yeVhLKO/",
      title: "We believe exceptional care begins with taking the time to truly know our patients",
      date: "September 18",
      format: "Reel",
      stats: [
        { v: "342", l: "Views" },
        { v: "240", l: "Reach" },
        { v: "12", l: "Interactions" },
        { v: "5.0%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the week. It reached 240 accounts, the most of anything published, and drew 12 of the week’s 21 interactions. It is about how the practice treats people rather than about a procedure. That is the same thing that worked last cycle, when the office clean-out reel and the Dr. Shiloah announcement both led.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/p/DdW-9bHhWPN/",
        title: "Expert care, genuine compassion, and patients who leave smiling",
        date: "September 16", format: "Post", views: 319, reach: 158, interactions: 9,
      },
    ],
    galleryNote:
      "The other feed piece published September 14 – 20. Five Stories complete the seven. A post shared with NYC Dental Smiles on September 17, about the office manager, drew 18 likes and 4 shares. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "Instagram followers remained essentially flat at +0.06%, but overall views increased 25% and interactions increased 31% compared with the previous period. Average daily reach was also up 23%.",
      "Feed content generated a 5.7% engagement rate this period, with average reach per feed post up nearly 13%.",
      "Patient-first, relationship-driven content performed best this week. Messaging around knowing patients personally and combining expertise with compassion led the account’s content, while Stories also saw strong growth, with impressions up 129% and average reach per Story up 41%.",
    ],
    takeaway:
      "Overall visibility and interactions moved in the right direction this week, with patient-centered content continuing to connect with the audience. We’ll keep building on the human side of Dr. El Chaar’s expertise while maintaining a strong mix of educational, clinical and patient-focused content.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "Six things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Real gap",
        title: "The website traffic we cannot trace is now there every day",
        body:
          "Last cycle it was five days. This week every day is elevated: 57, 32, 36, 81, 56, 61 and 101 new visitors, against 12 to 35 in the two weeks before August 31, apart from one day at 58. Direct visits went from 280 to 371. A source recorded as not set appeared with 37 sessions. Landing pages went from 32 to 71, and 29 of them are service pages drawing two or three views each. Desktop share is 86%. Visits from Google search fell from 97 to 89 and Search Console clicks fell too. The pattern looks like something working through the site page by page rather than people finding it. Until it is traced, website totals cannot carry a growth story.",
      },
      {
        tag: "Measurement",
        title: "Search figures for this week have not finished processing",
        body:
          "Daily clicks this week: 16, 10, 10, 14, then 2, 2 and 1 for Friday through Sunday. The week before ran 11, 6 and 6 over the same days. September 7 – 13 read 64 clicks on 648 impressions when first pulled on September 14, and 68 on 691 today, a rise of 6%. In a 7-day window a single soft day is a seventh of the total. Re-pull Chart.csv on Wednesday before this goes to the practice.",
      },
      {
        tag: "Note",
        title: "A new short link, /ddspc, drew 8 clicks",
        body:
          "It did not appear in the previous week, so it has no comparison. /youtube drew 1. Neither is on the tracked list. Both are included in the domain total of 185 and excluded from the booking and homepage rows, which compare directly.",
      },
      {
        tag: "Measurement",
        title: "Datacenter traffic remains in the short link figures",
        body:
          "The path filter applied; the country filter did not. Council Bluffs 34, Ashburn 13, Singapore 11, Brussels 10 and Frankfurt 10 account for about 42% of this week’s 185. Last week the share was about 44%. Because the share is similar in both weeks, the comparison holds, but the totals are higher than real traffic. Short.io has no city filter, so a country filter is the most that can be applied.",
      },
      {
        tag: "Real gap",
        title: "The podcast has not published in almost eight weeks",
        body:
          "The most recent episode is July 27. This week drew 24 downloads, confirmed by lifetime downloads rising from 5,249 to 5,273. The week before drew 85, about three times the podcast’s normal rate of roughly 30 a week. The decision from last cycle is still open: resume on a schedule, or report it as an archive.",
      },
      {
        tag: "Note",
        title: "No email this week, and last week’s campaign kept moving",
        body:
          "Nothing was sent to the EEC list September 14 – 20. RH 2.0, sent September 12, now shows 1,684 opens, 13 clicks and 422 not delivered, up from 1,582, 12 and 407 when read on September 14. Failure notices can arrive days after a send, which is why that count keeps moving. At 12% of the list, cleaning it before the next send is worth doing.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "Five things worth carrying into the next report.",
    items: [
      {
        title: "Instagram grew across the board",
        body: "Views up 25%, daily reach up 23%, interactions up 31%, and 2 followers gained after a loss the week before. The account published seven pieces against five: one post, one reel and five Stories.",
        client: {
          title: "Instagram grew across the board",
          body: "Views rose 25%, daily reach 23% and interactions 31%. The account added followers after a flat week.",
        },
      },
      {
        title: "Content about people keeps leading",
        body: "This week’s two feed pieces were about knowing patients and caring for them. Last cycle it was the office clean-out and Dr. Shiloah’s announcement. Across the last three reports, the strongest piece has been about people rather than procedures.",
        client: {
          title: "Content about people keeps leading",
          body: "The strongest content this week was about how the practice knows and cares for its patients. That has been true for several weeks now.",
        },
      },
      {
        title: "More Stories, and each one reached more people",
        body: "Five Stories against three. Impressions went from 168 to 384 and average reach per Story from 54 to 76, so the gain is not only from volume.",
        client: {
          title: "More Stories, and each one reached more people",
          body: "Five Stories went out against three the week before, and each one reached more people on average, 76 against 54.",
        },
      },
      {
        title: "Booking link clicks rose 60%",
        body: "32 against 20. Upper East Side doubled, 7 to 14, and Midtown went 13 to 18. The comparison is direct: both links existed in both weeks.",
        client: {
          title: "Booking link clicks rose 60%",
          body: "32 clicks on the booking links against 20 the week before. Upper East Side doubled, from 7 to 14.",
        },
      },
      {
        title: "Weekly search figures need a few days to settle",
        body: "September 7 – 13 rose 6% between its first and second readings. With a 7-day window, the last three days carry the most uncertainty and the most weight.",
        client: {
          title: "Search figures take a few days to settle",
          body: "Google keeps processing search data for several days. Figures for September 7 – 13 rose about 6% between our first and second readings, so we read the most recent days with care.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "Five actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Trace the direct website traffic",
        owner: "Figment",
        metric: "A named source for the traffic, or a filter that removes it from the totals",
        body: "It is now every day, not five days. Check GA4’s Tech and Geography reports for September 14 – 20, look at what the not set source contains, and check whether a monitoring or crawling service was added to the site around August 31.",
      },
      {
        action: "Re-pull search on Wednesday, September 23",
        owner: "Figment",
        metric: "Final search clicks and impressions for September 14 – 20",
        body: "Friday through Sunday read 2, 2 and 1 clicks. The previous week rose 6% after its first reading. One file, Chart.csv, before the report goes to the practice.",
      },
      {
        action: "Confirm what /ddspc is",
        owner: "Figment",
        metric: "Its purpose, where it is placed, and the date it went live",
        body: "It drew 8 clicks in its first week. If it is a new booking or profile link, it belongs on the tracked list.",
      },
      {
        action: "Publish a reel every week",
        owner: "Figment",
        metric: "Reel reach against this week’s 240",
        body: "One reel in the last two weeks, and it led this week: 240 reach against 158 for the post. The week before had no reels at all.",
      },
      {
        action: "Decide on the podcast",
        owner: "Figment, with practice input",
        metric: "An episode published, or the panel reported as an archive",
        body: "Almost eight weeks since the last episode, with nothing scheduled.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Keep building patient-focused content",
        body: "Content about how the practice knows and cares for its patients has led for several weeks. We will keep that at the center while maintaining a mix of educational and clinical posts.",
      },
      {
        action: "Publish a reel every week",
        body: "This week’s reel reached more people than anything else published. We will aim for one every week.",
      },
      {
        action: "Confirm the search figures",
        body: "Google is still processing the last days of this week. We will check the final numbers before drawing any conclusions about search.",
      },
      {
        action: "Look into the website visitor numbers",
        body: "A large share of this week’s website visitors cannot be traced to a source. We are treating those figures as unconfirmed until we know where they came from.",
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
          ["Views", "3,207 · from 2,567"],
          ["Reach per day", "92 · from 75"],
          ["Accounts engaged", "64 · from 59"],
          ["Interactions", "21 · post 9, reel 12 · from 16"],
          ["Engagement rate", "3.26% · from 3.05%"],
          ["Followers", "3,221 · up 2 · 4 new, 3 lost"],
          ["Feed engagement rate", "5.7% · 1 post · from 5.71% on 2 posts"],
          ["Average reach per post", "158 · from 140"],
          ["Reel", "1 · 342 views · 240 reach · 12 interactions"],
          ["Stories", "5 · 384 impressions · 76 average reach · from 3, 168 and 54"],
          ["Published", "1 post · 1 reel · 5 Stories · 1 shared post"],
        ],
        note:
          "Account totals are Metricool’s account-level figures, not a sum of individual posts. Engagement rate is interactions on posts and reels divided by reach: 21 against 644 this week and 16 against 525 the week before. Metricool reports followers two ways that disagree: the account total rose by 2, while new minus lost is 1. This report uses the account total. No advertising ran in either week.",
        noteClient:
          "Account totals come from Metricool’s account-level figures rather than a sum of individual posts. Engagement rate is interactions divided by reach. No advertising ran in either week.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Booking · Midtown", "18 · from 13"],
          ["Booking · Upper East Side", "14 · from 7"],
          ["Booking total", "32 · from 20"],
          ["Homepage link", "144 · from 126"],
          ["/ddspc", "8 · new this week"],
          ["Domain total", "185 · from 149"],
        ],
        note:
          "Filtered to named links, which removes the catch-all path that collects automated requests. A country filter was not applied, and about 42% of this week’s clicks come from datacenter locations, against about 44% the week before. The share is similar, so the comparison holds, but the totals are higher than real traffic. /ddspc and /youtube are new and not yet on the tracked list; they are included in the domain total only. The booking and homepage rows compare directly.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. A new link, /ddspc, drew 8 clicks in its first week.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "55 · from 68"],
          ["Impressions", "447 · from 691"],
          ["Click rate", "12.30% · from 9.84%"],
          ["Average position", "4.16 · from 3.72 · US only"],
          ["Desktop", "30 clicks · 221 impressions · position 4.42"],
          ["Mobile", "25 clicks · 224 impressions · position 4.75"],
          ["Homepage", "42 clicks · 338 impressions · position 4.2"],
          ["Our Doctors", "6 clicks · 262 impressions · position 4.74"],
          ["Locations", "5 clicks · 150 impressions · position 3.37"],
          ["Dental Services", "4 clicks · 102 impressions · position 2.63"],
        ],
        note:
          "Totals come from Search Console’s daily export. The last three days of this week read 2, 2 and 1 clicks and are likely to rise as Google finishes processing; re-pull on Wednesday. September 7 – 13 has already been restated from 64 clicks and 648 impressions to 68 and 691. Average position is weighted by impressions and filtered to US searches, the same basis as previous reports.",
        noteClient:
          "Totals come from Search Console’s complete daily export. Google keeps processing search data for several days, so the most recent figures may rise. Average position covers US searches only; lower is better.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["New visitors", "424 · from 311"],
          ["Sessions", "514 · from 398"],
          ["Visits from Google search", "89 · from 97"],
          ["Direct visits", "371 · from 280"],
          ["Source not set", "37 · none the week before"],
          ["Bing search", "10 · from 9"],
          ["Landing pages", "71 · from 32"],
          ["Homepage landings", "325 · from 408"],
          ["Our Doctors landings", "32 · from 22"],
          ["Desktop / mobile", "86% / 14% · from 88% / 12%"],
        ],
        note:
          "Visits from Google search are the reliable figure this week. Direct visits rose 91 and a new not set source added 37, while landing pages more than doubled, mostly service pages with two or three views each. These totals are reported as pulled and not adjusted, but they should not be read as audience growth until the source is traced. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the most reliable figure this week, at 89 against 97. Most of the increase in total visitors came through direct visits we cannot yet trace, so we are treating that total as unconfirmed.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["This week", "No campaign sent"],
          ["Previous week", "RH 2.0 · sent September 12"],
        ],
        note:
          "No campaign went to the EEC list September 14 – 20. RH 2.0 was covered in the previous report. Read again on September 21 it showed 1,684 opens, 13 clicks and 422 not delivered.",
        noteClient:
          "No email campaign was sent this week. The most recent, sent September 12, was covered in the previous report.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Last 7 days", "24"],
          ["The 7 days before", "85"],
          ["Last 30 days", "151"],
          ["Last 90 days", "535"],
          ["Lifetime downloads", "5,273"],
          ["Episodes published", "50"],
          ["Most recent episode", "July 27"],
          ["New York share", "517 of 5,267 located downloads · 9.8%"],
        ],
        note:
          "Buzzsprout reports trailing windows from the day of the pull. This week’s 24 is confirmed by lifetime downloads rising from 5,249 on September 14 to 5,273 on September 21. The previous week’s 85 comes from the September 14 pull and ran at about three times the podcast’s normal rate of roughly 30 a week. Buzzsprout’s dashboard showed 149 for the last 30 days a moment before the export, which sums to 151. No episode has been published since July 27.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. The week before was unusually strong; this week is closer to the podcast’s usual level of about 30 downloads a week. The most recent episode was published July 27.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "September 14 to 20, 2026, seven full days, Monday to Sunday, compared with September 7 to 13. Both weeks are the same length, so every comparison is direct." },
          { q: "Why this report covers one week", a: "This report looks at a single week. The monthly view returns in October." },
          { q: "How engagement rate is calculated", a: "Interactions divided by reach, meaning the share of people who saw something and responded to it. It is not calculated against follower count, which would make the figure look higher than it is." },
          { q: "Why the search figures may change", a: "Google keeps processing search data for several days after the fact. Figures for September 7 to 13 rose about 6% between our first and second readings, so the most recent days of any week are the least settled." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No advertising ran in either week. No email was sent this week. No podcast episode was published." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on two figures already present. Nothing is estimated.",
      },
    ],
  },
};
