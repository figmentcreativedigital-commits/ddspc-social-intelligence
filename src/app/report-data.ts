/* ==========================================================================
   REPORT DATA  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   This is the only file that changes between reporting cycles, unless the
   structure changes. Edit figures and narrative strings below.

   CADENCE — weekly, Monday to Sunday, permanent.
     This report covers October 26 – November 1 against October 19 – 25.

   STRUCTURE. page.tsx is server-rendered and reads:
     R.compared, scoreboard.weeks, and per scoreboard row group / trend / fmt;
     R.engagement (visits and engaged visits by source). Trend arrays run
     oldest to newest; the last value is this week. Every trend value is the
     most recent reading of that week's export.

   COMPARISON COLUMN RESTATED. October 19 – 25 comes from exports re-pulled on
     November 2. Instagram interactions 31 against the 29 deployed, views 2,951
     against 2,940, engagement rate 3.26% against 3.05%; the October 23 reel now
     reads 512 views, 348 reach and 17 interactions against 437, 305 and 15, and
     the October 20 carousel 647 views and 247 reach against 578 and 234. Native
     GA4 sessions 344 against 345 and direct 240 against 241; Google, new
     visitors and search did not move. The October 19 email restates to 1,567
     all opens and 86 clicks against 1,557 and 85. Short.io and Buzzsprout are
     not re-pulled: click logs do not settle, and podcast downloads are measured
     as the change in the lifetime counter between two readings.

     Third cycle running where Metricool interactions settle upward after
     publication: +12%, +9%, now +6.9%.

   SOCIAL — drafted by Figment from Metricool in the social team’s voice. The
     social lead’s write-up follows after review; replace it then and re-check
     any figure it changes.

   ENCODING — literal characters for apostrophes, dashes and the minus sign.
     No \u escapes. Mixing the two made string edits fail silently before.

   ONE ROUNDED FIGURE. Instagram views reads 16.7K because that is how Metricool
     displays its account total above 10,000; the trend array carries 16700 and
     the change is given as +466%, both derived from that rounded display. The
     exact value is available by hovering Metricool's account Views chart.
     Everything else below is exact.

   Nothing here is estimated or inferred. Every value is carried from a source
   export, or is plain arithmetic on two figures already present.

   SOURCE WINDOWS:
     Instagram (Metricool)            Oct 26 – Nov 1 and Oct 19 – 25, both pulled Nov 2
     Search Console                   Oct 26 – Nov 1, pulled Nov 2. No US filter on
                                      the export, so the US position is read from
                                      Countries.csv. Oct 19 – 25 not re-pulled:
                                      search did not move on the last re-pull
     Website (GA4 via Looker Studio)  both weeks, pulled Nov 2
     Website sessions and engagement  native GA4 traffic acquisition, both weeks,
                                      pulled Nov 2. The Oct 19 – 25 export came
                                      through grouped by channel rather than by
                                      source, so Google at source level is carried
                                      from the Oct 26 pull at 83; the re-pull
                                      agrees, with non-direct sessions at 104 on
                                      both readings
     Short links (Short.io)           Oct 26 – Nov 1, pulled Nov 2. Path view, All
                                      clicks, with the catch-all /* filtered out.
                                      Read from the filtered Path PDF: the listed
                                      paths sum to 168, which the same window's
                                      header reports as Total clicks. The 5 xlsx
                                      exports again carry a Top links sheet on the
                                      Human setting with /* at 439, summing to 72,
                                      which is Human clicks. Third cycle running.
                                      Only the General statistic sheet responds to
                                      the filter; every other sheet in the workbook
                                      is unfiltered, so the workbook cannot be used
                                      for path-level figures at all
     Podcast (Buzzsprout)             overview and agent reports pulled Nov 2
                                      against the Oct 26 baselines, lifetime 5,738
                                      and agent total 5,732
     Email (Constant Contact)         1 campaign sent Oct 26 – Nov 1, read from the
                                      Reporting tab on Nov 2 for the confirmed open
                                      figure. The CSV export carries all opens only
     Trend history                    Sep 28 – Oct 4 from the Oct 12 pulls; Oct 5 – 11
                                      from the Oct 20 re-pull; Oct 12 – 18 from the
                                      Oct 26 re-pull; Oct 19 – 25 from the Nov 2
                                      re-pull; Oct 26 – Nov 1 from the Nov 2 pulls
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
  { id: "learned", label: "What we learned", internalOnly: true },
  { id: "moves", label: "Next moves", internalOnly: true },
  /* `plan` was the client-voice twin of `moves`. With the client build no longer
     carrying it, it is internal-only and duplicates `moves`; drop it from this
     array entirely once that is confirmed. */
  { id: "plan", label: "The plan", internalOnly: true },
  { id: "detail", label: "Detail" },
];

export const NAV = ALL_SECTIONS.filter((x) => (IS_INTERNAL ? !x.clientOnly : !x.internalOnly));
const ORDINALS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export const numOf = (id: string) => ORDINALS[NAV.findIndex((n) => n.id === id)] ?? "";
export const has = (id: string) => NAV.some((n) => n.id === id);

/* Brief items. `internalOnly` drops an item from the client build entirely;
   without it the client would fall through to the internal wording. */
const BRIEF_ALL: {
  role: string; text: string; internalOnly?: boolean;
  client?: { role: string; text: string };
}[] = [
  {
    role: "Headline",
    text: "One reel moved the whole Instagram week: the October 28 excerpt from the podcast conversation on the implant-abutment connection took 11,321 views and reached 8,985 accounts, more than the whole account reached in any full week of the previous 5. Reach per day 136 to 1,395, interactions 31 to 272, accounts engaged 54 to 285, and followers 3,267 to 3,353 — up 86 against a combined 32 over the previous 4 weeks. A new podcast episode went out October 29, the first since September 30. US search position 5.25 to 4.79 and dr el chaar back to 3.18 from 10.33. Website sessions 344 to 204 and new visitors 294 to 156 against a comparison week carrying the October 19 email; Google search visits 83 to 64 and search clicks 52 to 40, both the lowest in the 6 weeks on record.",
    client: {
      role: "Headline",
      text: "One reel on the implant-abutment connection reached 8,985 accounts and drew 260 responses, and the account added 86 followers over that week, more than the previous 4 weeks together.",
    },
  },
  {
    role: "What improved",
    text: "Instagram interactions 31 to 272, reach per day 136 to 1,395, accounts engaged 54 to 285, followers up 86 against 3. The October 28 reel: 8,985 reach, 11,321 views, 260 interactions, 67 saves, 44 shares, 13 reposts, 58.1% of viewers past 3 seconds and 31.35% average retention on 88 seconds. US search position 5.25 to 4.79 and the homepage 4.21 to 2.80; dr el chaar 10.33 to 3.18 with no change on our side. Visits from Google averaged 48.5 seconds against 33.9. A new podcast episode on October 29, 15 downloads in 4 days. Downloads reaching something other than a web browser 4 to 37. The October 28 email put 15 of its 53 link clicks on the CareStack booking page, which is booking intent the short link figure never sees.",
    client: {
      role: "Engagement",
      text: "285 accounts engaged with the content, up from 54. That reel held attention as well as reach: 58% of the people who saw it watched past the first 3 seconds, the average view ran 28 seconds of its 88, and it drew 67 saves and 44 shares. Visits from Google search averaged 49 seconds on the site, up from 34.",
    },
  },
  {
    role: "What softened",
    text: "Website sessions 344 to 204, new visitors 294 to 156, direct 240 to 131 — the comparison week carried the October 19 email, which put 96 new visitors on a single day. Google search visits 83 to 64, search clicks 52 to 40, impressions 466 to 427, click rate 11.16% to 9.37%. Engagement rate 3.26% to 2.79%: interactions rose 8.8 times while reach rose 10.3 times. Podcast downloads 77 to 57. Email clicks 86 to 35 and confirmed opens 353 to 338, a benefits reminder against a campaign with a seasonal hook. Landing pages 54 to 32. Homepage short link 155 to 98 and booking 26 to 23, on a named total that fell 182 to 168 while carrying 37 clicks on the Instagram bio link, which recorded nothing last week.",
    client: {
      role: "Highlights",
      text: "The End of Year Benefits email reached 2,967 inboxes on October 28, and of the 53 links clicked in it, 22 went to the website and 15 to the booking page. A new podcast episode followed on October 29: Beyond the Plate, on nutrition, inflammation and the mouth-body connection, with Alexandra Cerone. In Google results the site’s average position for the week came in at 4.79, against 5.25, where 1 is the top result.",
    },
  },
  {
    role: "Next action",
    internalOnly: true,
    text: "Cut more podcast episodes into 60-to-90-second clinical excerpts: one did 8,985 reach and 86 followers this week against a 5-week best of about 3,700 for an entire week, and there are 52 episodes behind it. Tag the email and short links with UTM parameters, 35 email clicks produced 1 attributable session. Ask Buzzsprout why the browser-versus-app mix inverted in a week, 73 of 77 to 20 of 57, before that figure goes in front of the client again. Clean the list, still bouncing at 12% on a fifth cycle.",
  },
];

export const R = {
  client: "Edgard El Chaar, DDS, PC",
  studio: "Figment Creative",
  period: "October 26 – November 1, 2026",
  compared: "Compared with October 19 – 25",
  context: "October 26 – November 1, 2026 · compared with the week before",

  meta: [
    { k: "This week", v: "October 26 – November 1, 2026" },
    { k: "Compared with", v: "October 19 – 25, 2026" },
    { k: "Both weeks", v: "7 days, Monday to Sunday" },
  ],

  /* ------------------------------------------------------------- THE BRIEF */
  /* The client build opens on figures and engagement, not on forward-looking
     narrative. page.tsx maps over whatever `items` holds and falls back to the
     internal text when an item has no `client` override, so an internal-only
     item has to be filtered out of the array here rather than by removing its
     override. BRIEF_ALL is filtered once at module level. */
  brief: {
    title: "The Brief",
    lede: "The week in figures.",
    items: BRIEF_ALL.filter((x) => (IS_INTERNAL ? true : !x.internalOnly)) as {
      role: string; text: string; client?: { role: string; text: string };
    }[],
  },

  /* ---------------------------------------------------- THE PERIOD CHART */
  period_: {
    lede: "New visitors to the website each day, this week and the week before.",
    bandA: "Previous week · Oct 19 – 25",
    bandB: "This week · Oct 26 – Nov 1",
    /* GA4 daily new visitors, both weeks pulled Nov 2. The previous week is
       unchanged on re-read at 294. `shade` marks the previous week. */
    daily: [
      { d: "Oct 19", v: 96, shade: true },
      { d: "Oct 20", v: 36, shade: true },
      { d: "Oct 21", v: 31, shade: true },
      { d: "Oct 22", v: 63, shade: true },
      { d: "Oct 23", v: 26, shade: true },
      { d: "Oct 24", v: 22, shade: true },
      { d: "Oct 25", v: 20, shade: true },
      { d: "Oct 26", v: 25 },
      { d: "Oct 27", v: 28 },
      { d: "Oct 28", v: 31 },
      { d: "Oct 29", v: 20 },
      { d: "Oct 30", v: 22 },
      { d: "Oct 31", v: 18 },
      { d: "Nov 1", v: 12 },
    ],
    note:
      "156 new visitors against 294. The comparison week carried the October 19 email, which put 96 new visitors on a single day and 63 more on October 22; this week has no day above 31. Sessions 344 to 204: direct 240 to 131 and Google 83 to 64. The October 28 campaign produced 1 Constant Contact session against 35 recorded clicks, the same attribution gap as the October 19 send. New users reaching the 404 page fell 106 to 60 and landing pages 54 to 32.",
    noteClient:
      "156 new visitors this week, with October 28 the busiest at 31. The week before included October 19, when the National Dental Hygiene Month email went out and brought 96 visitors in a single day.",
  },

  /* ------------------------------------------------- VISITS THAT ENGAGED */
  engagement: {
    title: "Which visits engaged",
    lede: "Every visit to the website this week, by where it came from. The darker part of each bar is the visits that engaged with the site.",
    /* Native GA4 traffic acquisition, Oct 26 – Nov 1. Other sources combines 4
       sources with 9 sessions and 5 engaged; its average time is weighted by
       sessions: (4×56 + 2×148.5 + 2×0 + 11) ÷ 9 = 59. */
    rows: [
      { label: "Direct", sessions: 131, engaged: 26, seconds: 15 },
      { label: "Google search", sessions: 64, engaged: 42, seconds: 49 },
      { label: "Other sources", sessions: 9, engaged: 5, seconds: 59 },
    ],
    note:
      "Direct 131 sessions with 26 engaged, 19.8%, averaging 14.8 seconds, against 240, 48 and 12.7: the share engaging held while the volume halved, and the comparison week carried the October 19 email. Google 64 at 65.6% engaged against 71.1% at source level, but 48.5 seconds against 33.9 — fewer visits, each one considerably longer. Other sources: 4 sources, 9 sessions, 5 engaged, weighted average 59 seconds, lifted by 2 Ecosia sessions at 148 seconds each. 2 of the 9 came from the Instagram bio link, the first week that referrer has appeared.",
    noteClient:
      "Direct visits were the largest group at 131, and a fifth of them engaged with the site, the same share as the week before. Google search sent 64 visits, 42 of them engaged, and those visits averaged 49 seconds on the site against 34 the week before.",
  },

  /* ------------------------------------------------------------ SCOREBOARD */
  scoreboard: {
    lede: "Each measure this week and the week before, with its trend over the last 5 weeks. This week is the plum dot.",
    weeks: ["Sep 28", "Oct 5", "Oct 12", "Oct 19", "Oct 26"],
    cols: [
      { label: "This week", sub: "Oct 26 – Nov 1" },
      { label: "Previous week", sub: "Oct 19 – 25" },
    ],
    rows: [
      /* Groups render in the order the rows appear. Instagram leads because that
         is where the week's growth is; every row note carries the context that
         explains the figure, so no row has to be read on its own. */
      {
        k: "Followers",
        note: "Up 86, more than the previous 4 weeks together",
        group: "Instagram", fmt: "int",
        trend: [3251, 3257, 3264, 3267, 3353],
        cells: [{ v: "3,353", c: "+86", dir: "up" }, { v: "3,267", c: "+3", dir: "flat" }],
      },
      {
        k: "Instagram interactions",
        note: "Likes, comments, saves and shares. The October 28 reel drew 260",
        group: "Instagram", fmt: "int",
        trend: [224, 132, 157, 31, 272],
        cells: [{ v: "272", c: "+777.4%", dir: "up" }, { v: "31", c: "", dir: "flat" }],
      },
      {
        k: "Instagram reach per day",
        note: "Average accounts reached each day, the widest in the 5 weeks shown",
        group: "Instagram", fmt: "int",
        trend: [527, 363, 381, 136, 1395],
        cells: [{ v: "1,395", c: "+925.7%", dir: "up" }, { v: "136", c: "", dir: "flat" }],
      },
      {
        k: "Instagram views",
        note: "Metricool’s account total for the week, reported rounded above 10,000",
        group: "Instagram", fmt: "int",
        trend: [8526, 6626, 6083, 2951, 16700],
        cells: [{ v: "16.7K", c: "+466%", dir: "up" }, { v: "2,951", c: "", dir: "flat" }],
      },
      {
        k: "Instagram engagement rate",
        note: "Interactions divided by the week’s total reach, which rose faster still",
        group: "Instagram", fmt: "pct",
        trend: [6.07, 5.19, 5.89, 3.26, 2.79],
        cells: [{ v: "2.79%", c: "−0.47 points", dir: "down" }, { v: "3.26%", c: "", dir: "flat" }],
      },
      {
        k: "Booking link clicks",
        note: "Midtown 13 and Upper East Side 10. The October 28 email sent 15 more directly",
        group: "Booking links", fmt: "int",
        trend: [37, 26, 22, 26, 23],
        cells: [{ v: "23", c: "−11.5%", dir: "down" }, { v: "26", c: "", dir: "flat" }],
      },
      {
        k: "Homepage link clicks",
        note: "Clicks on the short link to the homepage. The Instagram bio link added 37",
        group: "Booking links", fmt: "int",
        trend: [106, 126, 130, 155, 98],
        cells: [{ v: "98", c: "−36.8%", dir: "down" }, { v: "155", c: "", dir: "flat" }],
      },
      {
        k: "Website new visitors",
        note: "The week before included October 19, when the email brought 96 in one day",
        group: "Website", fmt: "int",
        trend: [290, 393, 172, 294, 156],
        cells: [{ v: "156", c: "−46.9%", dir: "down" }, { v: "294", c: "", dir: "flat" }],
      },
      {
        k: "Visits from Google search",
        note: "These visits averaged 49 seconds on the site, against 34",
        group: "Website", fmt: "int",
        trend: [103, 85, 99, 83, 64],
        cells: [{ v: "64", c: "−22.9%", dir: "down" }, { v: "83", c: "", dir: "flat" }],
      },
      {
        k: "Average search position",
        note: "US searches only. Lower is better",
        group: "Search", fmt: "pos",
        trend: [4.74, 6.77, 5.05, 5.25, 4.79],
        cells: [{ v: "4.79", c: "from 5.25", dir: "up" }, { v: "5.25", c: "", dir: "flat" }],
      },
      {
        k: "Search clicks",
        note: "The site ranked higher this week, across fewer searches",
        group: "Search", fmt: "int",
        trend: [65, 58, 62, 52, 40],
        cells: [{ v: "40", c: "−23.1%", dir: "down" }, { v: "52", c: "", dir: "flat" }],
      },
      {
        k: "Search click rate",
        note: "Share of people who saw the site in Google and clicked through",
        group: "Search", fmt: "pct",
        trend: [11.17, 11.20, 12.11, 11.16, 9.37],
        cells: [{ v: "9.37%", c: "−1.79 points", dir: "down" }, { v: "11.16%", c: "", dir: "flat" }],
      },
      {
        k: "Search impressions",
        note: "Times the site appeared in Google results",
        group: "Search", fmt: "int",
        trend: [582, 518, 512, 466, 427],
        cells: [{ v: "427", c: "−8.4%", dir: "down" }, { v: "466", c: "", dir: "flat" }],
      },
      {
        k: "Podcast downloads",
        note: "A new episode published October 29 and took 15 downloads in 4 days",
        group: "Podcast", fmt: "int",
        trend: [69, 177, 131, 77, 57],
        cells: [{ v: "57", c: "−26.0%", dir: "down" }, { v: "77", c: "", dir: "flat" }],
      },
    ],
  },

  /* ----------------------------------------------------------- WHAT WORKED */
  worked: {
    lede: "The October 28 excerpt from the podcast conversation on the implant-abutment connection took 11,321 views, reached 8,985 accounts, drew 260 interactions and brought in 86 followers over the week. The 2 other pieces reached 256 and 222, close to the account’s ordinary level.",
    ledeClient: "One piece of content reached far beyond the practice’s following, and the account grew more in that week than in the previous 4 combined.",
    hero: {
      url: "https://www.instagram.com/reel/DfDRO6eBL4Q/",
      title: "There is more to implant success than what happens in the bone",
      date: "October 28",
      format: "Reel",
      stats: [
        { v: "11,321", l: "Views" },
        { v: "8,985", l: "Reach" },
        { v: "260", l: "Interactions" },
        { v: "2.89%", l: "Engagement" },
      ],
      why:
        "An 88-second excerpt from the podcast conversation with Mélissa M. Seif on the implant-abutment connection and the biological space soft tissue needs to protect the bone. It held attention as well as it traveled: 58% of the people who saw it watched past the first 3 seconds and the average view ran 28 seconds. That is what moved it. 67 saves, 44 shares and 13 reposts put it in front of accounts that do not follow the practice, and it reached 8,985 of them, more than the account reached in any full week over the previous 5. The account gained 86 followers over the week, against 32 across the previous 4, and the link in the bio took 37 clicks.",
    },
    gallery: [
      {
        url: "https://www.instagram.com/reel/DfHo-y9ToSA/",
        title: "Dental anxiety is more common than people realize",
        date: "October 30", format: "Reel", views: 398, reach: 256, interactions: 4,
      },
      {
        url: "https://www.instagram.com/p/DfDSEoMhcwc/",
        title: "Trust matters, especially when treatment feels intimidating",
        date: "October 29", format: "Feed post", views: 400, reach: 222, interactions: 8,
      },
    ],
    galleryNote:
      "Both of these are about how patients are treated rather than what is done to them: Nelly on the time it takes to settle a nervous patient, and a note of thanks to patients who trust the Fifth Avenue team with complex care. They reached the people already following the practice rather than traveling beyond it, which is the job they do well. Engagement is interactions divided by reach.",
  },

  /* ---------------------------------------------------------------- SOCIAL */
  /* Drafted by Figment for October 26 – November 1 from the Metricool export,
     in the social team’s usual voice. The social lead’s write-up follows after
     review: replace it then, and re-check any figure it changes. */
  social: {
    title: "Social",
    lede: "How Instagram performed this week, and what we will keep doing.",
    items: [
      "The account added 86 followers to reach 3,353, against 3 the week before, and reached an average of 1,395 accounts a day. 285 accounts engaged with the content, up from 54.",
      "The October 28 conversation on the implant-abutment connection took 11,321 views, reached 8,985 accounts and drew 260 interactions, among them 67 saves, 44 shares and 13 reposts. A clinical conversation cut to 88 seconds traveled a long way past the following, and the link in the bio took 37 clicks over the same week.",
      "The 2 other pieces, Nelly on dental anxiety and a note on patient trust, reached 256 and 222. Both are about how people are cared for, and both landed with the audience already following the practice.",
    ],
    takeaway:
      "Pulling a clinical conversation out of the podcast and cutting it to 88 seconds reached 8,985 accounts, the widest any single piece has gone in the weeks this report covers, and the account added 86 followers over the same week. There are 52 episodes behind it, so the material is already recorded. The plan is to keep the practice-culture pieces doing what they do with the existing audience and put the push behind the clinical excerpts, which is where the reach is.",
  },

  /* -------------------------------------------------------- NEEDS ATTENTION */
  attention: {
    lede: "8 things worth a second look, each labeled so it is clear which to act on and which to note.",
    items: [
      {
        tag: "Resolved",
        title: "A podcast episode went out, after 29 days",
        body:
          "Beyond the Plate, with Alexandra Cerone on nutrition, inflammation and the mouth-body connection, published October 29. 15 downloads in its first 4 days, against 27 all time for the September 30 episode. That closes an item carried for 3 report weeks. The catalog now runs to 52 episodes, and the reel cut from the September 30 conversation reached 8,985 accounts in the same week, which is the strongest argument yet for keeping the publishing cadence.",
      },
      {
        tag: "Resolved",
        title: "dr el chaar came back to 3.18 from 10.33",
        body:
          "dr el chaar: position 3.18 on 17 impressions against 10.33 on 30. Nothing changed on our side, so this is the same unexplained movement as the drop and the recovery 4 weeks ago — the third time this one query has moved on its own while its near-duplicates held. edgard el chaar 1.21 on 24 impressions with 6 clicks, edgar el chaar 1.25 with 7, dr el chaar nyc 1.33, dr edgard el chaar 1.38. Keep the weekly check but stop treating a move as a result either way.",
      },
      {
        tag: "Real gap",
        title: "The email's clicks land in 3 systems and reconcile in none of them",
        body:
          "The October 28 campaign recorded 35 clickers and 53 link clicks. GA4 shows 1 session from a Constant Contact domain in the whole week; the October 19 campaign recorded 86 clicks and produced 7. Separately, 15 of those 53 went to the CareStack booking page through links that bypass Short.io entirely, so they are missing from the booking figure the report has tracked for 6 weeks: booking intent this week was 23 through the short links and another 15 through the email, and the 2 cannot be added because Constant Contact counts unique clickers with bots already removed while Short.io counts all clicks. Nothing in any of these chains carries UTM parameters. Tagging the email links, routing the email's booking links through Short.io, and tagging the short links would close all 3 gaps at once. Fifth cycle carrying this and still the highest-value fix available.",
      },
      {
        tag: "Real gap",
        title: "The email list is still bouncing at 12%",
        body:
          "424 of 3,391 sends on the October 28 campaign did not deliver, 12.5%, against 12.4% on October 19 and 12.1% on August 1. 2,967 delivered. Unsubscribes 13, spam reports 1. Five cycles now and it has not moved. Every open and click rate in the report is calculated on delivered mail, so the rates are sound, but the list keeps being measured against a base that includes more than 400 addresses which no longer work. Take the bounce figure from the Reporting tab, not the CSV export: the CSV read 406 the same morning the dashboard read 424, and only the dashboard basis reconciles with the 2,967 delivered that every rate in this report uses.",
      },
      {
        tag: "Real gap",
        title: "Search and website volume are the lowest on record here",
        body:
          "Visits from Google search 64, below the previous low of 81 in the 6 weeks tracked. Search clicks 40 against 52, impressions 427 against 466, click rate 9.37% against 11.16%. Position improved to 4.79, so this is fewer queries surfacing the site rather than worse ranking on the ones that do. Two specifics to work on: the digital dentistry page took 98 impressions at position 1.98 and 0 clicks, and Our Doctors took 273 impressions for 10 clicks, a 3.66% rate at position 5.71. Both are title and description problems, not ranking problems.",
      },
      {
        tag: "Note",
        title: "The Instagram bio link took 37 clicks",
        body:
          "/website is the link in the Instagram bio. It took 37 clicks, the second-largest named link of the week behind the homepage at 98, and it did not appear in last week's export at all. It landed in the week the October 28 reel reached 8,985 accounts, which is the shape you would expect: people saw the reel, went to the profile, used the bio link. GA4 recorded 2 sessions from a link-in-bio referrer over the same week. Those 2 and these 37 are a long way apart, and nothing in the chain carries UTM parameters, so neither figure can be reconciled against the other. Watch next week to see whether bio traffic holds once the reel stops circulating.",
      },
      {
        tag: "Measurement",
        title: "The browser-versus-app split inverted in a single week",
        body:
          "Downloads through something other than a web browser went from 4 of 77 to 37 of 57. The 37 breaks down as Unknown Apple Apps 14, Unknown 9, Apple Podcasts 8, Spotify 2, and 1 each from iVoox, Amazon Echo, Instagram and the Buzzsprout embed player. So 23 of the 37 are agents Buzzsprout does not identify, and only 12 are named podcast apps. A mix that moves this far in a week is more likely a change in how Buzzsprout classifies agents than a change in listener behavior. Ask them before this figure leads anything.",
      },
      {
        tag: "Note",
        title: "Last week restated, and followers disagree a fifth time",
        body:
          "October 19 – 25 re-read on November 2: Instagram interactions 31 against the 29 deployed, views 2,951 against 2,940, engagement rate 3.26% against 3.05%. The October 23 reel now reads 512 views, 348 reach and 17 interactions against 437, 305 and 15. Third cycle running where Metricool interactions settle upward: +12%, +9%, +6.9%. Native GA4 sessions 344 against 345 and direct 240 against 241, so the upward settle in the native export did not repeat this time. Search and new visitors unchanged. The October 19 email restates to 1,567 all opens and 86 clicks. Separately, the account total rose by 86 while Metricool reports 89 acquired and 4 lost. This report uses the account total, as before.",
      },
    ],
  },

  /* --------------------------------------------------------- WHAT WE LEARNED */
  /* Internal only since October 26, and now actually filtered: page.tsx wrapped
     this section in has("learned") on November 2. Before that the id was marked
     internalOnly, which removed it from the nav while the body kept rendering in
     the client build. The per-item `client` overrides are gone with it; the type
     annotation keeps `item.client ?? item` in page.tsx compiling, so the
     overrides can come back without a page change if the section ever does. */
  learned: {
    lede: "4 things worth carrying into the next report.",
    items: [
      {
        title: "A clinical excerpt from the podcast outreaches anything else we publish",
        body: "88 seconds of the implant-abutment conversation reached 8,985 accounts and brought in 86 followers. The 5-week best for an entire week of publishing was about 3,700. 67 saves, 44 shares and 13 reposts is what moved it, and 58.1% watched past 3 seconds, so the opening held. 52 episodes are already recorded. Metricool's per-reel view shows the whole run happened in 48 hours: it peaked on October 29 and was effectively finished by October 31, so anything meant to build on a piece like this has a 2-day window to land in.",
      },
      {
        title: "Reach and engagement rate move in opposite directions on a wide week",
        body: "Interactions rose 8.8 times, reach rose 10.3 times, so the rate fell 3.26% to 2.79%. The rate measures how a piece lands with the people who see it; when a piece escapes the following, the denominator grows faster than the numerator. On a week like this the rate is the less useful figure of the two.",
      },
      {
        title: "Practice-culture pieces serve the existing audience, not reach",
        body: "Nelly on dental anxiety reached 256 and the patient-trust post 222, both close to the account's ordinary level. They are not underperforming; they are doing a different job. Judge them on response from the following rather than on reach, and do not let a wide clinical week set the bar for them.",
      },
      {
        title: "Search position and search volume came apart this week",
        body: "US position improved 5.25 to 4.79 and the homepage 4.21 to 2.80, while impressions fell 466 to 427 and clicks 52 to 40. Ranking better on the queries we appear for, appearing for fewer of them. Impressions are the leading figure to watch, not position.",
      },
    ] as { title: string; body: string; client?: { title: string; body: string } }[],
  },

  /* ------------------------------------------------------------- NEXT MOVES */
  moves: {
    lede: "5 actions, each with the reason behind it and the number that shows whether it worked.",
    items: [
      {
        action: "Cut a clinical excerpt from the podcast every week",
        owner: "Figment",
        metric: "Reach per day above 500 next week without a second outlier",
        body: "One 88-second excerpt reached 8,985 accounts and brought in 86 followers, against a 5-week best of about 3,700 for an entire week of publishing. 67 saves, 44 shares and 13 reposts carried it beyond the following, and 58.1% watched past 3 seconds. There are 52 episodes recorded, so the input cost is editing rather than production. One a week is the test of whether this repeats or was a single piece finding an audience.",
      },
      {
        action: "Tag the email links and the EEC short links with UTM parameters",
        owner: "Figment",
        metric: "Next campaign's clicks appearing as attributable sessions rather than direct",
        body: "35 email clicks produced 1 attributable session this week; 86 produced 7 the week before. The campaigns earn traffic the report cannot credit them with. Tagging the email links and the short links gives both a source GA4 can read, independently of which clicks Short.io itself counts. While the email is being rebuilt, route its booking links through Short.io as well: 15 clicks went straight to CareStack this week and never reached the booking figure the report tracks. Fifth cycle asking.",
      },
      {
        action: "Write titles and descriptions for the digital dentistry and Our Doctors pages",
        owner: "Figment",
        metric: "Clicks on both pages next month against 0 and 10 this week",
        body: "The digital dentistry page took 98 impressions at position 1.98 and no clicks at all. Our Doctors took 273 impressions for 10 clicks, 3.66%, at position 5.71. Both rank well enough to be seen and are not being chosen, which is a title and description problem rather than a ranking one. Search impressions overall fell 466 to 427 while position improved, so converting the impressions already there is the faster move.",
      },
      {
        action: "Clean the email list before the next send",
        owner: "Figment",
        metric: "Bounce rate under 5% on the next campaign",
        body: "424 of 3,391 did not deliver on October 28, 12.5%, against 12.4% on October 19 and 12.1% on August 1. Carried for 5 cycles and flat. Every rate in the report is calculated on delivered mail, so the rates are sound; the list is the thing that is wrong.",
      },
      {
        action: "Ask Buzzsprout what changed in the agent classification",
        owner: "Figment",
        metric: "A written answer before the figure is reported again",
        body: "Downloads through something other than a web browser went 4 of 77 to 37 of 57 in one week, and 23 of those 37 are agents Buzzsprout does not name. Either listener behavior changed completely in 7 days or the classification did. Until there is an answer, report the total and the browser share and leave the app split in the detail panel.",
      },
    ],
  },

  /* ---------------------------------------------------------------- THE PLAN */
  plan: {
    lede: "What we are doing next.",
    items: [
      {
        action: "Cut a clinical excerpt from the podcast every week",
        body: "The October 28 reel reached 8,985 accounts and brought in 86 followers. There are 52 episodes recorded, so this is a matter of editing rather than new production, and it is the clearest result the feed has had.",
      },
      {
        action: "Keep the practice-culture pieces running alongside them",
        body: "Nelly on dental anxiety and the note on patient trust reached the people already following the practice, which is the job they do. The mix stays; the clinical excerpts get the push.",
      },
      {
        action: "Add tracking to the email and short links",
        body: "The October 28 campaign recorded 35 clicks and only 1 of those visits could be traced back to it. Adding tracking means the next campaign can be measured properly against the website.",
      },
      {
        action: "Improve the titles on the digital dentistry and Our Doctors pages",
        body: "Both appear high in Google results and are not being chosen: digital dentistry took 98 appearances and no clicks. Rewriting what Google shows is faster than trying to rank higher.",
      },
      {
        action: "Review the email list before the next campaign",
        body: "Part of the list is no longer reaching people. Verifying the addresses protects delivery for everyone else and gives a clearer read on how the next campaign performs.",
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
          ["Campaign", "October 28 · End of Year Benefits"],
          ["Sent / delivered", "3,391 / 2,967"],
          ["Confirmed opens", "338 · 11.4%"],
          ["All opens", "1,620 · 54.6% · includes 1,282 proxy"],
          ["Clicks", "35 · 1.2%"],
          ["Link clicks", "53 from 35 people"],
          ["Most-clicked link", "The website · 22 of 53"],
          ["Clicks to the booking page", "15 of 53 · across 2 location links"],
          ["Unsubscribes", "13"],
          ["Previous campaign", "October 19 · National Dental Hygiene Month · 86 clicks"],
        ],
        note:
          "Constant Contact, read from the Reporting tab on November 2. Rates are calculated on delivered mail, not on sends. Use the confirmed figure: 338 of the 1,620 opens are confirmed and 1,282 are proxy, where a mail client loaded the images without anyone reading it. The confirmed rate is 11.4%, against 11.8% on October 19 and 12.3% on August 1, so the real open rate has been flat across 3 campaigns while the headline figure sits 4.8 times higher. Clicks 35 against 86: a benefits reminder against a campaign with a seasonal hook, and Constant Contact puts the click rate on par with the last 10 campaigns. 35 clickers produced 53 link clicks: the website 22, a Constant Contact short link 16, and the CareStack booking page 15 across 2 location links. Those 15 do not appear in Short.io at all, because the email links straight to CareStack rather than through the short links, so booking intent for the week is 23 through the short links plus 15 through the email. The 2 cannot simply be added: Constant Contact counts unique clickers with bot clicks already removed, while the Short.io 23 is all clicks including automated traffic. GA4 recorded 1 session from a Constant Contact domain over the whole week. Bot clicks removed: 0. Bounces 424 of 3,391, 12.5%, against 12.4% on October 19; the bounce count and the spam report are carried in the internal sections rather than shown as rows here. Campaign figures settle for days: the CSV export taken earlier the same morning read 1,598 opens and 406 bounces against the 1,620 and 424 on the dashboard, and the October 19 campaign has restated from 1,557 opens and 85 clicks to 1,567 and 86. Every figure in this panel is the dashboard reading, which is the only basis that reconciles with the 2,967 delivered.",
        noteClient:
          "Constant Contact. Rates are calculated on delivered mail rather than on sends. Two open figures are shown: confirmed opens, where someone actually opened the message, and all opens, which also counts mail clients that load images automatically. Confirmed opens are the reliable figure, and at 11.4% it is in line with the previous two campaigns. 35 people clicked, between them opening 53 links: 22 went to the website and 15 to the booking page. Those booking clicks go straight to the booking system rather than through the practice's short links, so they are counted here rather than in the short link figures.",
      },
      {
        id: "links",
        title: "Short links",
        rows: [
          ["Homepage link", "98 · from 155"],
          ["Booking · Midtown", "13 · from 14"],
          ["Booking · Upper East Side", "10 · from 12"],
          ["Booking total", "23 · from 26"],
          ["Other named links", "47 · from 1"],
          ["Named links total", "168 · from 182"],
        ],
        note: "Taken from Short.io’s Path view with the catch-all /* filtered out, so only named links are counted, and on the All rather than Human setting. The test is that the listed paths sum to the export’s Total clicks rather than its Human clicks: / 98, /website 37, Midtown 13, Upper East Side 10, /ddspc 9 and /uFleXA 1 sum to 168, which the same window reports as Total clicks. 37 of the 47 in Other named links are /website, the link in the Instagram bio, which recorded nothing in last week's export; Short.io reports 1 short URL created during the window. Of the 168, 72 are Human clicks, against 100 of 182 the week before, so the week-on-week comparison carries more automated traffic than usual on both sides. Read from the filtered Path PDF again: the 5 xlsx exports all carry a Top links sheet on the Human setting with /* at 439, and only the General statistic sheet in those workbooks responds to the filter at all. No link carries UTM parameters.",
        noteClient:
          "Counts clicks on the practice’s named short links. The booking and homepage links existed in both weeks and compare directly. The link in the Instagram bio accounts for 37 of the clicks in Other named links, in the week the reel reached 8,985 accounts. The booking links are the most reliable figures here, because they are the ones a person reaches on purpose.",
      },
      {
        id: "website",
        title: "Website",
        rows: [
          ["Sessions", "204 · from 344"],
          ["New visitors", "156 · from 294"],
          ["Direct visits", "131 · from 240"],
          ["Direct visitors engaged", "19.8% · 15 seconds average · from 20.0% and 13 seconds"],
          ["Visits from Google search", "64 · from 83"],
          ["Google visitors engaged", "65.6% · 49 seconds average · from 71.1% and 34 seconds"],
          ["Visits from Constant Contact", "1 · from 7"],
          ["Visits from the Instagram bio link", "2 · from none"],
          ["Busiest day", "October 28 · 31 new visitors"],
          ["Landing pages", "32 · from 54"],
          ["Homepage landings", "177 · from 244"],
          ["Our Doctors landings", "18 · from 34"],
          ["Desktop / mobile", "68% / 32% · from 80% / 20%"],
        ],
        note:
          "Sessions by source and engagement come from the native GA4 traffic export for the Dr Edgar El Chaar property. October 19 – 25 re-read on November 2 gives 344 sessions against the 345 first reported and direct 240 against 241; non-direct sessions read 104 on both pulls, so Google is unchanged at 83. The upward settle seen in the last 2 cycles did not repeat. The re-pull came through grouped by channel rather than by source, which is why the Google comparison is carried from the October 26 pull. New users reaching the 404 page fell from 106 to 60. New visitors, landing pages, devices and page titles come from Looker Studio. Landing pages are counted without blank and (not set) rows. Spam referrals are excluded.",
        noteClient:
          "Visits from Google search are the clearest measure of ongoing interest, and this week those visitors stayed noticeably longer: 49 seconds on average against 34, with 42 of the 64 engaging with the site. Total visits were 204 against 344, because the week before included October 19, when the National Dental Hygiene Month email went out and brought 96 new visitors in a single day.",
      },
      {
        id: "instagram",
        title: "Instagram",
        rows: [
          ["Interactions", "272 · from 31"],
          ["Reach per day", "1,395 · from 136"],
          ["Engagement rate", "2.79% · from 3.26%"],
          ["Views", "16.7K · from 2,951"],
          ["Accounts engaged", "285 · from 54"],
          ["Followers", "3,353 · up 86 · from 3,267"],
          ["Reels", "2 · 11,719 views · 4,621 average reach · 264 interactions"],
          ["The October 28 reel on its own", "11,321 views · 8,985 reach · 260 interactions"],
          ["Feed posts", "1 · 400 views · 222 reach · 8 interactions"],
          ["Reels, week before", "1 · 512 views · 348 reach · 17 interactions"],
          ["Feed posts, week before", "1 · 647 views · 247 reach · 14 interactions"],
          ["Stories", "17 · 1,847 impressions · 106 average reach · from 3, 198 and 65"],
          ["Published", "2 reels · 1 feed post · 17 Stories"],
        ],
        note:
          "Account totals are Metricool’s account-level figures, and every figure is window-scoped: a reel's views are the views it took during the 7 days, not since publication. The account Views figure is scoped the same way, which is why 16.7K exceeds the 12,119 the 3 new pieces took between them (11,321 + 398 + 400; Story impressions are a different metric and are not added in) — the rest is views on the back catalog during the week. Metricool reports that account figure rounded above 10,000; the precise value is available by hovering its Views chart and should replace this if the exact number is wanted. Two separate things pull Metricool and Instagram's own app apart, and only one of them is windowing. For older pieces windowing explains it: the October 23 reel reads 1,558 in the app against the 512 it took inside its own week. For the October 28 reel it does not: Metricool's per-reel panel runs through November 2 and still reads 11.32K with almost nothing accruing after October 30, while the app reads 12.6K, so that gap of roughly 1,300 is a difference between what Metricool records from the API and what the app displays. Neither platform documents it. Stay on Metricool for every figure and never mix an app reading into the report. That per-reel panel also shows the shape of a reel's life: this one took most of its views in 48 hours, peaking October 29, and was effectively finished by October 31. Engagement rate is interactions on posts and reels divided by average reach per day times 7: 272 against 9,765 this week and 31 against 952 the week before. Interactions reconcile as 8 on the feed post and 264 across the 2 reels, 260 of them on the October 28 piece. The week before is restated from the November 2 re-pull, where interactions read 31 against the 29 first reported, views 2,951 against 2,940, and the October 23 reel now reads 512 views, 348 reach and 17 interactions against 437, 305 and 15. Followers: account total up 86, while Metricool reports 89 acquired and 4 lost; this report uses the account total. No advertising ran in either week: every paid column is empty.",
        noteClient:
          "Account totals come from Metricool’s account-level figures, the same source every week, which is what keeps the comparison between weeks consistent. Figures count what happened during the 7 days of the report, so a reel's views are the views it took in that week. Instagram’s own app counts everything since a piece was published and also counts a view differently, so the app reads higher: 12.6K on the October 28 reel against 11.32K here. Engagement rate is interactions divided by the week’s total reach, meaning average daily reach multiplied by 7, not by the daily figure on its own. It fell this week because reach grew faster than interactions did: interactions rose 8.8 times and reach rose 10.3 times. Figures for the week before were re-read this week and include responses that arrived after last week’s report. No paid advertising ran in either week.",
      },
      {
        id: "search",
        title: "Search",
        rows: [
          ["Average position", "4.79 · from 5.25 · US only"],
          ["Clicks", "40 · from 52"],
          ["Click rate", "9.37% · from 11.16%"],
          ["Impressions", "427 · from 466"],
          ["edgard el chaar", "position 1.21 · from 1.42 · 6 clicks"],
          ["edgar el chaar", "position 1.25 · 7 clicks"],
          ["dr el chaar", "position 3.18 · 17 impressions"],
          ["Desktop", "16 clicks · 161 impressions · position 5.01 · all searches"],
          ["Mobile", "24 clicks · 263 impressions · position 5.08 · all searches"],
          ["Homepage", "24 clicks · 293 impressions · position 2.80"],
          ["Our Doctors", "10 clicks · 273 impressions · position 5.71"],
          ["Locations", "6 clicks · 171 impressions · position 3.15"],
          ["About", "2 clicks · 125 impressions · position 2.89"],
          ["Dental Services", "2 clicks · 107 impressions · position 2.80"],
        ],
        note:
          "Totals come from Search Console’s daily export: 40 clicks on 427 impressions, which the device breakdown confirms. The headline average position is weighted by impressions and filtered to US searches; device positions cover all searches. The export carried no US filter, so the US position is read from Countries.csv: 39 clicks on 377 impressions at 4.79. The query export withholds 55% of clicks and 64% of impressions as low-volume, so query-level figures are a sample and are never summed into a total. October 19 – 25 was not re-pulled: search did not move on either of the last 2 re-pulls. Position improved while impressions fell, which is the site ranking better on the queries it appears for and appearing for fewer of them.",
        noteClient:
          "Totals come from Search Console’s daily export. Google keeps processing search data for several days, so the most recent days are the least settled. Average position covers US searches only; lower is better. Position improved this week while the site appeared in fewer results, which means it ranked better on the searches it did appear for.",
      },
      {
        id: "podcast",
        title: "Podcast",
        rows: [
          ["Downloads this week", "57"],
          ["Through web browsers", "20 · from 73"],
          ["Through everything else", "37 · from 4"],
          ["The week before", "77"],
          ["Last 30 days", "449"],
          ["Last 90 days", "795"],
          ["Lifetime downloads", "5,795"],
          ["Episodes published", "52"],
          ["Most recent episode", "October 29 · Beyond the Plate · 15 downloads in 4 days"],
          ["Previous episode", "September 30 · Biology Always Wins · 27 downloads"],
          ["New York share", "529 of 5,789 located downloads · 9.1%"],
        ],
        note:
          "This week’s 57 is lifetime downloads rising from 5,738 on October 26 to 5,795 on November 2, the same method as previous weeks, which is also why this figure is never re-pulled. Buzzsprout’s app report agrees exactly: its cumulative total rose 5,732 to 5,789, also 57. The per-episode Last 7 Days column sums to 60 because that window runs October 27 to November 2 rather than the report week. The split by agent: Web Browser rose 20 and everything else 37, against 73 and 4 the week before. Of the 37, Unknown Apple Apps account for 14, Unknown 9, Apple Podcasts 8, Spotify 2, and 1 each for iVoox, Amazon Echo, Instagram and the Buzzsprout embed player — so 23 are agents Buzzsprout does not name and only 12 are identified podcast apps. A mix moving this far in 7 days is more likely a change in how agents are classified than a change in listening, so the split is reported here and is not used in the narrative. 30 and 90 days come from the per-episode export, 449 and 795; the dashboard read 57, 445 and 790 the same morning.",
        noteClient:
          "Buzzsprout reports downloads over the most recent 7, 30 and 90 days. This week’s figure is the change in the lifetime total between two readings a week apart. Buzzsprout also splits downloads by the software that requested them, but a large share arrive from agents it cannot identify, so that split is shown here rather than relied on. A new episode went out October 29 and the September 30 episode is still being downloaded each week.",
      },
      {
        id: "method",
        title: "How this was measured",
        rows: [],
        faq: [
          { q: "What the report covers", a: "October 26 to November 1, 2026, 7 full days, Monday to Sunday, compared with October 19 to 25. Both weeks are the same length, so every comparison is direct." },
          { q: "What the trend lines show", a: "Each measure over the last 5 weeks, from September 28 to October 4 through this week, using the most recent reading of each week. The line shows the shape; the values are in each line’s label and in the detail panels." },
          { q: "Why last week’s figures differ from last week’s report", a: "Instagram and website figures for October 19 to 25 were read again on November 2. Instagram posts keep gathering responses for days after they go out, which moved last week’s interactions from 29 to 31 and its views from 2,940 to 2,951. The website session count barely moved, 345 to 344. Search was not re-read, because it has not moved on either of the last 2 re-pulls. Short link clicks and podcast downloads are never re-read, because click logs are written at the moment of the click and podcast downloads are measured as the change in a lifetime counter between two readings." },
          { q: "Why Instagram shows different view counts than this report", a: "Every Instagram figure here comes from Metricool, the same source every week, which is what makes the week-to-week comparisons hold. Instagram's own app reports its own totals and they do not match: the October 28 reel reads 12.6K in the app against 11.32K in Metricool. Two things cause that. For anything published more than a few days ago, the report counts what the piece did inside the 7 days while the app counts everything since it went up, so the app climbs away from the report over time. Beyond that the two platforms count a view differently, and neither publishes how. The report stays on one source rather than mixing them." },
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
