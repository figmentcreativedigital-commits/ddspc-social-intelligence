/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles.
   Edit the figures and narrative strings below; never edit page.tsx.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers September 21 – 27 against September 14 – 20: two
     7-day windows, directly comparable. Column pairing lives in
     `scoreboard.cols`.

   COMPARISON COLUMN RESTATED. September 14 – 20 figures come from exports
     re-pulled on September 28, not from the report deployed on September 21.
     Website: 490 sessions, 434 new visitors, 91 from Google, 380 direct (the
     Looker and native GA4 exports now agree). Instagram: Metricool added
     engagement after the September 21 pull, so interactions read 24 and the
     engagement rate 3.73%. Search: 448 impressions, 12.28% click rate.

   SOCIAL — drafted by Figment this cycle from the Metricool export, in the
     social team’s voice, because their write-up was not available at build
     time. Edit or replace when it arrives.

   ENCODING — this file uses literal characters for apostrophes, dashes and
     the minus sign. No \u escapes. Keep it that way: mixing the two is what
     made string edits fail silently in earlier cycles.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Sep 21 – 27 and Sep 14 – 20, pulled Sep 28
     Search Console                   Sep 21 – 27 and Sep 14 – 20, pulled Sep 28
     Website (GA4 via Looker Studio)  Sep 21 – 27 and Sep 14 – 20, pulled Sep 28;
                                      new visitors, landing pages, devices; property
                                      confirmed day for day against native GA4
     Website sessions by source and   Sep 21 – 27 and Sep 14 – 20, native GA4 traffic
       engagement (GA4)               acquisition export, pulled Sep 28 after Looker
     Short links (Short.io)           Sep 21 – 27 and Sep 14 – 20, pulled Sep 28
     Podcast (Buzzsprout)             trailing windows, pulled Sep 28 and Sep 21
     Email (Constant Contact)         no campaign sent Sep 21 – 27
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
  period: "September 21 – 27, 2026",
  context: "September 21 – 27, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "September 21 – 27, 2026" },
    { k: "Compared with", v: "September 14 – 20, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
    { k: "Content published", v: "10 pieces" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  brief: {
    title: "The Brief",
    lede: "The week in 4 points.",
    items: [
      {
        role: "Headline",
        text: "Instagram views rose 72% and reach per day more than doubled, led by the September 23 reel about Dr. El Chaar’s long-term patients, which drew 43 of the week’s 54 interactions. Clicks on the booking and homepage links fell 31%. Search clicks held at 52 against 55. Website new visitors fell from 434 to 196, and direct visits account for 222 of the 233 fewer sessions.",
        client: {
          role: "Headline",
          text: "Instagram had a strong week. Views rose 72%, daily reach more than doubled, and the account added 14 followers. The reel about Dr. El Chaar’s long-term patients led the week.",
        },
      },
      {
        role: "What improved",
        text: "Instagram views 3,208 to 5,518, reach per day 92 to 213, accounts engaged 64 to 98, followers up 14 against 2. 8 Stories against 5, with average reach per Story 76 to 173 and impressions 384 to 1,423. Interactions 24 to 54, but 43 are on the September 23 reel; the other reel drew 11 against 14 for last week’s single reel.",
        client: {
          role: "What improved",
          text: "Stories reached more than twice as many people each: 173 on average against 76, across 8 Stories against 5. The account gained 14 followers, against 2 the week before.",
        },
      },
      {
        role: "What softened",
        text: "Booking link clicks 32 to 22 and homepage link clicks 144 to 99, both down 31%. A larger share of this week’s short link clicks came from datacenter cities, so the drop in real clicks cannot be separated from the totals. Average US search position went from 4.16 to 5.19, almost all on desktop, which is within the July and August range. Visits from Google search fell 91 to 81.",
        client: {
          role: "What we are monitoring",
          text: "Clicks on the booking links were lower, 22 against 32. Search clicks held steady at 52 against 55, while the site’s average position in Google results moved from 4.16 to 5.19, within the range it held in July and August.",
        },
      },
      {
        role: "Next action",
        text: "Tag the 5 EEC short links with UTM parameters so real clicks can be separated from datacenter traffic. Confirm what /ddspc is. Take /dental-service/test-service offline or out of search.",
        client: {
          role: "What we are doing next",
          text: "We will keep publishing reels about the practice’s doctors and patients, keep Stories at this week’s pace, and add tracking to the booking links so real visits can be counted more precisely.",
        },
      },
    ] as { role: string; text: string; client?: { role: string; text: string } }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New website visitors each day across both weeks.",
    bandA: "Previous week · Sep 14 – 20",
    bandB: "This week · Sep 21 – 27",
    /* GA4 daily new visitors, Looker Studio time series pulled Sep 28, matching
       the native GA4 export day for day. `shade` marks the previous week.
       Sep 20 reads 111 in this pull against 101 in the report deployed Sep 21. */
    daily: [
      { d: "Sep 14", v: 57, shade: true },
      { d: "Sep 15", v: 32, shade: true },
      { d: "Sep 16", v: 36, shade: true },
      { d: "Sep 17", v: 81, shade: true },
      { d: "Sep 18", v: 56, shade: true },
      { d: "Sep 19", v: 61, shade: true },
      { d: "Sep 20", v: 111, shade: true },
      { d: "Sep 21", v: 60 },
      { d: "Sep 22", v: 33 },
      { d: "Sep 23", v: 39 },
      { d: "Sep 24", v: 15 },
      { d: "Sep 25", v: 21 },
      { d: "Sep 26", v: 13 },
      { d: "Sep 27", v: 15 },
    ],
    note:
      "196 new visitors this week against 434. The higher daily level of the last 2 weeks ended midweek: 60, 33 and 39 on Monday to Wednesday, then 15, 21, 13 and 15. September 7 – 13 ran 17 to 39 on every day except September 10. Direct visits fell from 380 to 158, which is 222 of the 233 fewer sessions. New users who reached the site’s 404 page fell from 139 to 46. Visits from Google search fell from 91 to 81. Direct visits averaged 15.2 seconds with 16.5% engaged, against 3.7 seconds and 9.2% the week before, and 15.5 seconds and 49.3% on September 7 – 13. Google visitors were 64.2% engaged and averaged 40 seconds, against 61.5% and 90.",
    noteClient:
      "196 new visitors this week against 434. Last week’s increase came through very short direct visits that we did not count as new audience. This week direct visits fell from 380 to 158, which accounts for almost all of the decrease. Visits from Google search were 81 against 91.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "15 measures, this week against the week before. Both weeks are 7 days, so every comparison is direct.",
    cols: [
      { label: "This week", sub: "Sep 21 – 27" },
      { label: "Previous week", sub: "Sep 14 – 20" },
    ],
    rows: [
      {
        k: "Instagram views",
        note: "Across reels, posts and Stories",
        cells: [{ v: "5,518", c: "+72.0%", dir: "up" }, { v: "3,208", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average number of accounts reached each day",
        cells: [{ v: "213", c: "+131.5%", dir: "up" }, { v: "92", c: "", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "43 of the 54 came from the reel posted September 23. The other reel drew 11",
        cells: [{ v: "54", c: "+125.0%", dir: "up" }, { v: "24", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by reach. Reach grew slightly faster than interactions",
        cells: [{ v: "3.62%", c: "−0.11 points", dir: "down" }, { v: "3.73%", c: "", dir: "flat" }],
      },
      {
        k: "Followers",
        note: "17 new and 3 lost this week",
        cells: [{ v: "3,235", c: "+14", dir: "up" }, { v: "3,221", c: "+2", dir: "up" }],
      },
      {
        k: "Content published",
        note: "2 reels and 8 Stories, against 1 post, 1 reel and 5 Stories",
        cells: [{ v: "10", c: "+3", dir: "flat" }, { v: "7", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 12 and Upper East Side 10, against 18 and 14",
        cells: [{ v: "22", c: "−31.3%", dir: "down" }, { v: "32", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage",
        cells: [{ v: "99", c: "−31.3%", dir: "down" }, { v: "144", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "The most recent days of any week are the least settled",
        cells: [{ v: "52", c: "−5.5%", dir: "down" }, { v: "55", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        cells: [{ v: "455", c: "+1.6%", dir: "up" }, { v: "448", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        cells: [{ v: "11.43%", c: "−0.85 points", dir: "down" }, { v: "12.28%", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "Where the site appears in Google results, US searches only. Lower is better",
        cells: [{ v: "5.19", c: "from 4.16", dir: "down" }, { v: "4.16", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "The clearest measure of website interest. 64% of these visits were engaged, against 62%. They averaged 40 seconds on the site, against 90 the week before",
        cells: [{ v: "81", c: "−11.0%", dir: "down" }, { v: "91", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "Almost all of the change is in direct visits, the traffic that was not counted as audience growth last week",
        cells: [{ v: "196", c: "−54.8%", dir: "flat" }, { v: "434", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "Downloads in the 7 days before each pull. The most recent episode was published July 27",
        cells: [{ v: "11", c: "−54.2%", dir: "down" }, { v: "24", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The reel about Dr. El Chaar’s long-term patients led the week on views, reach and interactions: 837 views, 543 reach, and 43 of the week’s 54 interactions. Both reels were about the relationship between a doctor and patients, the same subject that led last week.",
    ledeClient: "The best-performing content this week was about Dr. El Chaar’s relationships with patients who have been with him for decades.",
    hero: {
      url: "https://www.instagram.com/reel/Ddo1xYppH3M/",
      title: "For Dr. El Chaar, the most meaningful part of dentistry is seeing what great care can make possible over time",
      date: "September 23",
      format: "Reel",
      stats: [
        { v: "837", l: "Views" },
        { v: "543", l: "Reach" },
        { v: "43", l: "Interactions" },
        { v: "7.9%", l: "Engagement" },
      ],
      why:
        "The strongest piece of the week. It reached 543 accounts, the most of anything published, and drew 43 of the week’s 54 interactions: 34 likes and 9 shares. Like last week’s strongest reel, it is about how the practice relates to its patients rather than about a procedure.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/reel/DdwafrWh1ln/",
        title: "Exceptional care should feel personal",
        date: "September 26", format: "Reel", views: 320, reach: 224, interactions: 11,
      },
    ],
    galleryNote:
      "The other reel published September 21 – 27. 8 Stories complete the 10 pieces. A post shared with NYC Dental Smiles on September 25, about the October 4 event at Hudson Yards, drew 9 likes and 3 shares. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for September 21 – 27 from the Metricool export, in the
     social team’s usual voice, because their write-up had not arrived at build
     time. Every figure is checked against Metricool. Replace or edit when the
     social lead’s version comes in, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "Instagram views increased 72% and average daily reach more than doubled compared with the previous period, from 92 to 213. The account added 14 followers, with 17 new and 3 lost, and accounts engaged rose from 64 to 98. Engagement rate held close to steady at 3.62% against 3.73%, as reach grew slightly faster than interactions.",
      "Reels carried the week. The 2 reels drew 1,157 views and all 54 of the week’s interactions, with an average reach of 384 per reel. The reel on Dr. El Chaar’s long-term patients led with 837 views, 543 accounts reached and a 7.9% engagement rate.",
      "Stories also grew, with 8 published against 5. Impressions rose from 384 to 1,423, and average reach per Story increased from 76 to 173, so the gain came from each Story reaching more people, not only from volume.",
    ],
    takeaway:
      "Visibility grew strongly this week, and content about Dr. El Chaar’s relationships with his patients continued to connect with the audience. We’ll keep publishing a reel every week, hold Stories at this pace, and maintain a strong mix of educational, clinical and patient-focused content.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "7 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Measurement",
        title: "Last week’s comparison figures have been restated",
        body:
          "The deployed report is superseded on several September 14 – 20 figures. Website: 490 sessions against 514, 434 new visitors against 424, 91 from Google against 89, 380 direct against 371, 69 landing pages against 71 (now counted without blank and (not set) rows). The Looker and native GA4 exports now agree, which settles last cycle’s 514 against 490. Instagram: Metricool’s figures for the week rose after the September 21 pull, so interactions read 24 against 21, reel reach 278 against 240, and the engagement rate 3.73% against 3.26%. Followers acquired now reads 5, so new minus lost matches the gain of 2. Search: 448 impressions against 447. Every comparison in this report uses the September 28 readings.",
      },
      {
        tag: "Measurement",
        title: "Short link clicks fell 33.5%, with more of them from datacenter cities",
        body:
          "Domain total 123 against 185. Booking 22 against 32, homepage 99 against 144. Council Bluffs 34, Santa Clara 13, Singapore 7, Hong Kong 6 and Amsterdam 5 make up 65 of this week’s 123, about 53%. Last week the equivalent share was about 42%. Only 78 of 123 clicks are from the US; the country filter did not apply again. Short.io cannot split cities by path, so the change in real booking clicks cannot be separated from the totals. None of the links carry UTM parameters: every click reads medium unknown. Tagging the 5 links is the fix.",
      },
      {
        tag: "Measurement",
        title: "Average search position moved back to its summer level",
        body:
          "US position 5.19 against 4.16. Desktop went from 4.42 to 7.87 while mobile improved from 4.77 to 4.15. Monthly US position read 4.79 in July and 5.98 in August, so the 2 September weeks at 3.72 and 4.16 were the outliers. Two things appear in the same week: unrelated searches for the word chaar, such as film titles and song lyrics, at positions 11 to 77 on 13 impressions, and the query dr el chaar at position 15.04 on 25 impressions against 7.53 on 19. Neither accounts for the change on its own; the query list covers 148 of 455 impressions. Clicks held at 52 against 55.",
      },
      {
        tag: "Note",
        title: "Last week’s search figures did not rise",
        body:
          "The September 14 – 20 re-pull on September 28 changed by 1 impression. Friday to Sunday still read 2, 2 and 1 clicks. Last week’s report told the practice those days were likely to rise; they did not. This week’s Friday to Sunday read 6, 2 and 0, and the report no longer predicts that they will move.",
      },
      {
        tag: "Note",
        title: "The direct website traffic dropped away midweek",
        body:
          "New visitors ran 60, 33 and 39 Monday to Wednesday, then 15, 21, 13 and 15. Direct visits fell from 380 to 158 and account for 222 of the 233 fewer sessions. New users who reached the site’s 404 page fell from 139 to 46. Landing pages fell from 69 to 47, counted without blank and (not set) rows. The direct visits that remain averaged 15.2 seconds with 16.5% engaged, against 3.7 seconds and 9.2% last week, and 15.5 seconds and 49.3% on September 7 – 13. Time is back to the September 7 – 13 level; the engaged share is not, so this is the second low-engagement week. Google visitors averaged 40 seconds against 90 on a steady engaged share, 64.2% against 61.5%. Average time is a mean, so a few long visits can move it; September 7 – 13 read 64 seconds. ChatGPT sent 5 sessions, the first in this report’s exports.",
      },
      {
        tag: "Real gap",
        title: "A page named test-service is live and receiving visits",
        body:
          "/dental-service/test-service drew 9 landing page views this week and 5 the week before. It reads as a placeholder left published. Unpublishing it, or keeping it out of search, stops it from being found.",
      },
      {
        tag: "Note",
        title: "/ddspc drew 2 clicks, and the podcast has not published in 9 weeks",
        body:
          "/ddspc drew 2 clicks against 8 in its first week. It is still unidentified and is counted in the domain total only. The most recent podcast episode is July 27. This week drew 11 downloads against 24, confirmed by lifetime downloads rising from 5,273 to 5,284.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  learned: {
    lede: "5 things worth carrying into the next report.",
    items: [
      {
        title: "One reel carried the week’s interactions",
        body: "The September 23 reel drew 43 of 54 interactions. The other reel drew 11, against 14 for last week’s single reel. Interactions rose from 24 to 54, but like-for-like the second reel did slightly less than last week’s.",
        client: {
          title: "Content about the doctors and their patients keeps leading",
          body: "The reel about Dr. El Chaar’s long-term patients drew 43 of the week’s 54 interactions. For several weeks now, the strongest content has been about people rather than procedures.",
        },
      },
      {
        title: "Reach grew faster than interactions",
        body: "Reach per day rose 132% and interactions 125%, so the engagement rate moved from 3.73% to 3.62%. Views rose 72% and accounts engaged from 64 to 98. Followers grew by 14, the largest weekly gain in the last 3 weeks.",
        client: {
          title: "More people saw the account",
          body: "Views rose 72% and daily reach more than doubled, from 92 to 213. The account added 14 followers, against 2 the week before.",
        },
      },
      {
        title: "More Stories, and each reached more people",
        body: "8 Stories against 5. Impressions went from 384 to 1,423 and average reach per Story from 76 to 173, so the gain is not only from volume.",
        client: {
          title: "More Stories, and each reached more people",
          body: "8 Stories went out against 5 the week before, and each reached more people on average, 173 against 76.",
        },
      },
      {
        title: "Last week’s search figures held",
        body: "The September 14 – 20 re-pull moved by 1 impression. A soft weekend in the export is not always unprocessed data.",
        client: {
          title: "Last week’s search figures held",
          body: "When we re-checked September 14 – 20 this week, the search figures were unchanged apart from 1 impression, so last week’s numbers stand.",
        },
      },
      {
        title: "Website totals moved back toward earlier levels",
        body: "New visitors 434 to 196, with direct visits 380 to 155. The last 4 days of the week ran 13 to 21 new visitors a day. Visits from Google search, 81 against 91, remain the steadier measure, though their average time fell from 90 seconds to 40.",
        client: {
          title: "Website visits settled",
          body: "New visitors fell from 434 to 196, almost entirely in direct visits, the traffic we set aside last week. Visits from Google search, 81 against 91, remain the clearest measure of website interest.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Tag the 5 EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Booking clicks that carry UTM parameters in Short.io’s UTM Medium report",
        body: "Datacenter cities rose to about 53% of this week’s short link clicks from about 42%, and the country filter still does not apply. Automated traffic does not carry tracking parameters, so a UTM filter isolates real clicks directly. NYCDS’s booking links already work this way.",
      },
      {
        action: "Confirm what /ddspc is",
        owner: "Figment",
        metric: "Its purpose, where it is placed, and the date it went live",
        body: "2 clicks this week and 8 in its first week. If it is a booking or profile link, it belongs on the tracked list.",
      },
      {
        action: "Take down or de-index /dental-service/test-service",
        owner: "Figment",
        metric: "0 landing page views on the path next week",
        body: "9 landing page views this week and 5 the week before on a page that reads as a placeholder.",
      },
      {
        action: "Publish a reel every week",
        owner: "Figment",
        metric: "Reel reach against this week’s average of 384",
        body: "Both reels reached more accounts than last week’s feed post, and the September 23 reel carried the week. September 7 – 13 had no reels.",
      },
      {
        action: "Decide on the podcast",
        owner: "Figment, with practice input",
        metric: "An episode published, or the panel reported as an archive",
        body: "9 weeks since the last episode, with nothing scheduled.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Keep building content about the doctors and their patients",
        body: "Both reels this week were about the relationship between a doctor and patients, and the one about Dr. El Chaar’s long-term patients reached more people than anything else published. We will keep that at the center while maintaining a mix of educational and clinical posts.",
      },
      {
        action: "Publish a reel every week",
        body: "Reels reached more people on average than any other format this week, 384 against 173 for Stories. We will aim for at least 1 every week.",
      },
      {
        action: "Keep Stories at this week’s pace",
        body: "8 Stories went out this week, and each reached 173 people on average against 76 the week before.",
      },
      {
        action: "Add tracking to the booking links",
        body: "Booking link clicks were lower this week. Adding tracking to each link will let us count real visits separately from automated traffic, so the figure is more precise in future reports.",
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
          ["Views", "5,518 · from 3,208"],
          ["Reach per day", "213 · from 92"],
          ["Accounts engaged", "98 · from 64"],
          ["Interactions", "54 · all on reels · from 24"],
          ["Engagement rate", "3.62% · from 3.73%"],
          ["Followers", "3,235 · up 14 · 17 new, 3 lost"],
          ["Reels", "2 · 1,157 views · 384 average reach · 54 interactions"],
          ["Reels, week before", "1 · 405 views · 278 reach · 14 interactions"],
          ["Feed posts", "0 · from 1"],
          ["Stories", "8 · 1,423 impressions · 173 average reach · from 5, 384 and 76"],
          ["Published", "2 reels · 8 Stories · 1 shared post"],
        ],
        note:
          "Account totals are Metricool’s account-level figures, not a sum of individual posts. Engagement rate is interactions on posts and reels divided by reach, where reach is average reach per day times 7: 54 against 1,491 this week and 24 against 644 the week before. The week before is restated from the September 28 pull; Metricool’s figures rose after September 21, moving it from 3.26% to 3.73%. Reel and Story tallies match the content exports exactly. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures rather than a sum of individual posts. Engagement rate is interactions divided by reach. Figures for the week before were re-read this week and include engagement that arrived after last week’s report. No advertising ran in either week.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Booking · Midtown", "12 · from 18"],
          ["Booking · Upper East Side", "10 · from 14"],
          ["Booking total", "22 · from 32"],
          ["Homepage link", "99 · from 144"],
          ["/ddspc", "2"],
          ["Domain total", "123 · from 185"],
        ],
        note:
          "Filtered to named links, which removes the catch-all path that collects automated requests. Clicks by All. A country filter was not applied: 78 of 123 clicks are from the US. Council Bluffs, Santa Clara, Singapore, Hong Kong and Amsterdam account for about 53% of this week’s clicks, against about 42% on the equivalent list last week, so this week’s totals carry more automated traffic than last week’s. /ddspc drew 8 the week before; it is unidentified and counted in the domain total only. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. Some clicks come from automated traffic, which tracking on each link will separate out in future reports.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Clicks", "52 · from 55"],
          ["Impressions", "455 · from 448"],
          ["Click rate", "11.43% · from 12.28%"],
          ["Average position", "5.19 · from 4.16 · US only"],
          ["Desktop", "32 clicks · 233 impressions · position 7.87 · all searches"],
          ["Mobile", "20 clicks · 220 impressions · position 4.15 · all searches"],
          ["Homepage", "43 clicks · 338 impressions · position 5.17"],
          ["Our Doctors", "5 clicks · 265 impressions · position 4.23"],
          ["Locations", "4 clicks · 195 impressions · position 4.04"],
          ["About", "0 clicks · 123 impressions · position 2.97"],
          ["Dental Services", "0 clicks · 113 impressions · position 3.6"],
        ],
        note:
          "Totals come from Search Console’s daily export. The headline average position is weighted by impressions and filtered to US searches, the same basis as previous reports; device positions cover all searches. September 14 – 20 was re-pulled on September 28 and changed by 1 impression: 448 against 447, click rate 12.28% against 12.30%. Its Friday to Sunday clicks, 2, 2 and 1, did not rise.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days; last week’s figures held when we re-checked them. Average position covers US searches only; lower is better.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["New visitors", "196 · from 434"],
          ["Sessions", "257 · from 490"],
          ["Visits from Google search", "81 · from 91"],
          ["Direct visits", "158 · from 380"],
          ["Google visitors engaged", "64.2% · 40 seconds average · from 61.5% and 90 seconds"],
          ["Direct visitors engaged", "16.5% · 15.2 seconds average · from 9.2% and 3.7 seconds"],
          ["Bing search", "3 · from 10"],
          ["Visits from ChatGPT", "5 · none the week before"],
          ["Landing pages", "47 · from 69"],
          ["Homepage landings", "199 · from 334"],
          ["Our Doctors landings", "16 · from 33"],
          ["Desktop / mobile", "85% / 15% · from 86% / 14%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property, pulled after the Looker Studio export. It reads September 21 – 27 at 257 sessions against Looker’s 263, with direct 158 against 155 and Google 81 against 79; September 14 – 20 matches exactly in both. New visitors, landing pages and devices come from Looker Studio, confirmed day for day against native GA4. September 14 – 20 is restated from the September 28 pull: 490 sessions against 514 and 434 new visitors against 424. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of website interest, at 81 against 91. Almost all of the change in total visitors is in direct visits, the traffic that was not counted as audience growth last week.",
      },
      {
        id: "email",
        title: "Email",
        rows: [
          ["This week", "No campaign sent"],
          ["Previous week", "No campaign sent"],
        ],
        note:
          "No campaign went to the EEC list September 14 – 27. The most recent, RH 2.0, went September 12. Read on September 21 it showed 1,684 opens, 13 clicks and 422 not delivered, 12% of the list; cleaning the list before the next send is still worth doing.",
        noteClient:
          "No email campaign was sent this week or the week before. The most recent was sent September 12.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Last 7 days", "11"],
          ["The 7 days before", "24"],
          ["Last 30 days", "152"],
          ["Last 90 days", "510"],
          ["Lifetime downloads", "5,284"],
          ["Episodes published", "50"],
          ["Most recent episode", "July 27"],
          ["New York share", "518 of 5,278 located downloads · 9.8%"],
        ],
        note:
          "Buzzsprout reports trailing windows from the day of the pull. This week’s 11 is confirmed by lifetime downloads rising from 5,273 on September 21 to 5,284 on September 28, and matches the dashboard. The per-episode export sums to 12 for the last 7 days and 510 for 90 days, against 507 on the dashboard; 30 days matches at 152. No episode has been published since July 27.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. The most recent episode was published July 27.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "September 21 to 27, 2026, 7 full days, Monday to Sunday, compared with September 14 to 20. Both weeks are the same length, so every comparison is direct." },
          { q: "Why last week’s figures differ from last week’s report", a: "Every figure for September 14 to 20 was read again this week. Instagram engagement and website sessions settle for several days after the fact, so this report uses the newer readings throughout." },
          { q: "How engagement rate is calculated", a: "Interactions divided by reach, meaning the share of people who saw something and responded to it. It is not calculated against follower count, which would make the figure look higher than it is." },
          { q: "How website engagement is measured", a: "Google Analytics counts a visit as engaged if it lasts at least 10 seconds, views a second page, or completes a key action. Engagement is shown by source, so a change in visits can be checked against whether those visitors actually stayed." },
          { q: "Why the search figures may change", a: "Google keeps processing search data for several days after the fact, so the most recent days of any week are the least settled. Figures for September 7 to 13 rose about 6% between readings; September 14 to 20 changed by 1 impression." },
          { q: "How search position is calculated", a: "Weighted by how often each page appeared, and filtered to US searches. Lower is better: a position of 1 is the top result." },
          { q: "How short link clicks are counted", a: "Clicks on the practice’s named short links, with automated requests to unrecognized paths removed. The booking and homepage links existed in both weeks and compare directly." },
          { q: "What is not in this report", a: "No advertising ran in either week. No email was sent in either week. No podcast episode was published." },
        ],
        note: "Every figure in this report is carried from a source export or is arithmetic on 2 figures already present. Nothing is estimated.",
      },
    ],
  },
};
