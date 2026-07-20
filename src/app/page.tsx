"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "July 13 – July 19, 2026" },
  kpi: {
    followers: { value: 3181, change: 7, label: "Followers" },
    reach: { value: 5460, label: "Reach" },
    views: { value: 6183, label: "Total Views" },
    engagementRate: { value: 2.0, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 111, label: "Engagements" },
    watchTime: { value: "5.2s", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "When a Tooth Is Worth Saving · Dr. Vitaliya Sobol (Carousel)", type: "Post", views: 1004, reach: 431, likes: 29, comments: 0, saves: 0, shares: 5, isTop: true, igPostUrl: "" },
    { id: 2, title: "Before You Add Another Lemon Wedge (Reel)", type: "Reel", views: 348, reach: 240, likes: 10, comments: 0, saves: 0, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/reel/Da6E3hUBoVD/" },
    { id: 3, title: "Healthy Smiles Start Below the Surface", type: "Post", views: 315, reach: 171, likes: 5, comments: 0, saves: 0, shares: 2, isTop: false, igPostUrl: "" },
  ] as any[],
  contentMix: { posts: 69, reels: 21, stories: 10 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 39, nonFollowers: 61 },
};

type ReportData = typeof FALLBACK_DATA;

type Insight = { title: string; evidence: string[]; impact: string; action: string; severity: string };
type Rec = { priority: string; title: string; why: string; outcomes: string[] };

function generateInsights(data: ReportData) {
  const insights: Insight[] = [];
  const opportunities: Insight[] = [];
  const alerts: Insight[] = [];
  const recommendations: Rec[] = [];

  const er = data.kpi.engagementRate.value;
  const reach = data.kpi.reach.value;
  const eng = data.kpi.engagements.value;

  alerts.push({
    title: "A quarter of site traffic is landing on a 404",
    evidence: [
      "404 page drew 164 views this week \u2014 3rd most-viewed page",
      "526 views over 30 days, more than Our Doctors (211)",
      "Booking-link clicks fell to 7 while homepage clicks tripled",
      "Paid is sending 29% of sessions into this funnel",
    ],
    impact: "Paid budget and social clicks are being spent on a broken destination.",
    action: "Audit redirects today \u2014 likely a changed booking or locations URL.",
    severity: "danger",
  });

  // ---------- KEY INSIGHTS ----------
  insights.push({
    title: "Engagement rate rose while reach fell \u2014 the audience got better, not bigger",
    evidence: [
      `Engagement rate ${er}% \u2014 up from 1.6%`,
      `Reach ${reach.toLocaleString()} \u2014 down 34%`,
      "Views 6,183 \u2014 down 48%",
      `${eng} account-level interactions`,
    ],
    impact: "Low-quality reach fell away. The engaged core held.",
    action: "Hold the format mix; do not chase reach with volume.",
    severity: "success",
  });

  insights.push({
    title: "Follower share of views nearly doubled",
    evidence: [
      `Followers now ${data.viewerSplit.followers}% of views \u2014 up from 18%`,
      "2,332 follower views vs 3,678 non-follower",
      "Net +7 followers on a low-publish week",
      "Reach split still 649 non-follower vs 106 follower",
    ],
    impact: "The account is converting reach into owned audience.",
    action: "Publish for the followed audience, not the algorithm.",
    severity: "success",
  });

  insights.push({
    title: "Carousels now carry the account",
    evidence: [
      `Posts took ${data.contentMix.posts}% of organic views vs Reels ${data.contentMix.reels}%`,
      "Dr. Sobol carousel: 1,004 views on 431 reach, 29 likes",
      "Post interactions 84 of 111 account-level",
      "Only one Reel published, and it was the weakest of the month",
    ],
    impact: "The format that scales here is the carousel, not the Reel.",
    action: "Shift the ratio toward 2 carousels per Reel.",
    severity: "info",
  });

  insights.push({
    title: "The lone Reel underperformed its own back catalogue",
    evidence: [
      "Lemon wedge: 5.2s avg watch, 27.4% view rate",
      "Dr. Dinoi (Jul 9): 6.7s watch, 38.2% view rate",
      "Patient journey (Jul 11): 6.6s, 31.8%",
      "348 views vs a 4-Reel monthly average of 638",
    ],
    impact: "Educational tips hold attention less well than doctor-led stories.",
    action: "Return to doctor-led and patient-story Reels.",
    severity: "warning",
  });

  insights.push({
    title: "Search is small, precise and almost entirely name-brand",
    evidence: [
      "56 clicks on 564 impressions \u2014 9.93% CTR at position 4.9",
      "30-day: 172 clicks at 7.35% CTR, position 8.6",
      "Top queries are all variants of \u2018Dr. El Chaar\u2019",
      "Mobile ranks 3.28 vs desktop 6.35",
    ],
    impact: "Reputation search works. Non-brand demand is unclaimed.",
    action: "Build procedure-question pages to capture non-brand search.",
    severity: "info",
  });

  // ---------- OPPORTUNITIES ----------
  opportunities.push({
    title: "Booking-link clicks have collapsed",
    evidence: [
      "7 booking clicks this week \u2014 UES 4, Midtown 3",
      "30-day UES fell from 157 to 23",
      "Human clicks down 29.6% weekly, 83.6% over 30 days",
      "Homepage absorbed the shift \u2014 34 to 129 clicks",
    ],
    impact: "Traffic is landing on the homepage instead of a booking page.",
    action: "Put location booking links back in Stories and bio.",
    severity: "danger",
  });

  opportunities.push({
    title: "Paid buys cheap reach that does not convert",
    evidence: [
      "$209.16 spend \u2192 272 landing-page views at $0.77",
      "Both ads rank Conversion rate Below average (bottom 35%)",
      "Ads = 30% of 7-day views but 2.7% of interactions",
      "\u2018Make it a summer to remember\u2019 costs $0.87 per result",
    ],
    impact: "Media delivers. The landing page wastes it.",
    action: "Add a Lead/Booking event and fix the landing page before raising budget.",
    severity: "warning",
  });

  opportunities.push({
    title: "Saves and comments are effectively zero",
    evidence: [
      "0 saves and 0 comments across all three posts",
      "44 likes and 8 shares carried the week",
      "30-day totals: 4 saves, 2 comments on 29 pieces",
    ],
    impact: "Meta weights saves and comments highest. The account earns neither.",
    action: "End every carousel on a question and a save prompt.",
    severity: "warning",
  });

  opportunities.push({
    title: "An older carousel resurged and drove the month",
    evidence: [
      "30-day account carousel views: 20,630",
      "All eight posts published in-window total only 7,038",
      "A single ~8,000-view day landed on Jul 1 with nothing published",
    ],
    impact: "Evergreen carousels keep earning long after posting.",
    action: "Identify the resurging post and build three more like it.",
    severity: "success",
  });

  opportunities.push({
    title: "Instagram promotion measurably drove podcast downloads",
    evidence: [
      "\u2018Postgraduate Dentistry\u2019 (pub. Jun 25) took 33 downloads in 30 days \u2014 20% of all 161",
      "Next-best episode managed 7",
      "It was promoted twice on Instagram: Jun 27 (1,496 views) and Jul 5 (942)",
      "Both promos ranked in the month's top five posts",
    ],
    impact: "The two channels compound when a single topic runs across both.",
    action: "Give every new episode a two-post Instagram run.",
    severity: "success",
  });

  // ---------- RECOMMENDATIONS ----------
  recommendations.push(
    { priority: "high", title: "Fix the 404s", why: "526 views hit an error page over 30 days while paid drove 29% of sessions \u2014 traffic is being paid for and thrown away.", outcomes: ["Recovered paid traffic", "Restored booking path", "Better conversion ranking"] },
    { priority: "high", title: "Restore booking-link placement", why: "Booking clicks fell to 7 while homepage clicks tripled \u2014 traffic is arriving without a booking path.", outcomes: ["Recovered booking clicks", "Location-level attribution"] },
    { priority: "high", title: "Fix the whitening landing page", why: "Paid delivers 272 landing-page views at $0.77, but conversion rate ranks bottom 35%.", outcomes: ["Better return on existing spend", "Measurable bookings"] },
    { priority: "high", title: "Shift the format ratio toward carousels", why: "Carousels took 69% of organic views and 76% of interactions off two posts.", outcomes: ["Higher engagement rate", "More efficient production"] },
    { priority: "medium", title: "Pair every episode with two Instagram posts", why: "The one episode promoted twice took 20% of all 30-day downloads; the next best managed 7.", outcomes: ["Higher podcast downloads", "Compounding cross-channel reach"] },
    { priority: "medium", title: "Return to doctor-led Reels", why: "The one Reel published had the lowest watch time and view rate of the month.", outcomes: ["Longer watch time", "Stronger Reel reach"] },
    { priority: "medium", title: "Engineer for saves and comments", why: "Zero of both this week, against 44 likes.", outcomes: ["Stronger ranking signal", "Higher durable engagement"] },
    { priority: "low", title: "Claim non-brand search", why: "Search is high-CTR but almost entirely name queries; procedure demand is unclaimed.", outcomes: ["Long-term organic growth"] },
  );

  return { insights, opportunities, recommendations, alerts };
}

function AnimatedNumber({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (typeof value !== "number") return;
    let start = 0;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [value]);
  if (typeof value !== "number") return <span>{value}{suffix}</span>;
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function Donut({ data, size = 130, stroke = 18, colors }: { data: { value: number }[]; size?: number; stroke?: number; colors: string[] }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {data.map((d, i) => {
        const dash = (d.value / 100) * C;
        const gap = C - dash;
        const o = off;
        off += dash;
        return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors[i]} strokeWidth={stroke} strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-o} strokeLinecap="round" style={{ transition: "all 1.2s cubic-bezier(.4,0,.2,1)" }} />;
      })}
    </svg>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("7d");
  const d = FALLBACK_DATA;
  const [mediaUrls, setMediaUrls] = useState<Record<number, string>>(() => {
    const urls: Record<number, string> = {};
    FALLBACK_DATA.posts.forEach((p: any) => { if (p.igPostUrl) urls[p.id] = p.igPostUrl; });
    return urls;
  });
  const [editingMedia, setEditingMedia] = useState<number | null>(null);
  const [mediaInput, setMediaInput] = useState("");
  const engine = generateInsights(d);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const handleMediaSave = (postId: number) => {
    if (mediaInput.trim()) setMediaUrls((prev) => ({ ...prev, [postId]: mediaInput.trim() }));
    setEditingMedia(null);
    setMediaInput("");
  };
  const handleMediaRemove = (postId: number) => {
    setMediaUrls((prev) => { const n = { ...prev }; delete n[postId]; return n; });
  };
  const isVideo = (url: string) => /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url);
  const isIgEmbed = (url: string) => /instagram\.com\/(p|reel)\//i.test(url);

  const linkData7d = {
    period: "July 13 – July 19, 2026", totalClicks: 46,
    topLinks: [{ path: "Homepage", clicks: 38 }, { path: "DDS-PC UES", clicks: 4 }, { path: "DDS-PC Midtown", clicks: 3 }, { path: "Instagram", clicks: 1 }, { path: "YouTube", clicks: 0 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 46 }, { source: "Bot / datacenter + wildcard (excluded)", clicks: 426 }],
    topCountries: [{ country: "United States", clicks: 27 }, { country: "Netherlands", clicks: 7 }, { country: "Singapore", clicks: 4 }],
    topCities: [{ city: "Amsterdam", clicks: 6 }, { city: "Hong Kong", clicks: 4 }, { city: "New York City", clicks: 2 }],
    devices: [{ os: "iOS (Mobile Safari)", clicks: 35 }, { os: "Windows / Chrome", clicks: 9 }, { os: "Mac OS X", clicks: 5 }],
  };
  const linkData30d = {
    period: "June 20 – July 19, 2026", totalClicks: 194,
    topLinks: [{ path: "Homepage", clicks: 129 }, { path: "DDS-PC Midtown", clicks: 35 }, { path: "DDS-PC UES", clicks: 23 }, { path: "Instagram", clicks: 6 }, { path: "YouTube", clicks: 1 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 194 }, { source: "Bot / datacenter + wildcard (excluded)", clicks: 1825 }],
    topCountries: [{ country: "United States", clicks: 145 }, { country: "Netherlands", clicks: 20 }, { country: "Singapore", clicks: 19 }],
    topCities: [{ city: "New York City", clicks: 26 }, { city: "Singapore", clicks: 19 }, { city: "Amsterdam", clicks: 18 }],
    devices: [{ os: "Mobile Safari (iOS)", clicks: 126 }, { os: "Chrome", clicks: 67 }, { os: "Safari", clicks: 15 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "July 13 – July 19, 2026",
    sessions: 581,
    topPages: [
      { page: "/", label: "Home", views: 282 },
      { page: "/locations", label: "Locations", views: 188 },
      { page: "/our-doctors", label: "Our Doctors", views: 30 },
      { page: "/what-are-the-benefits-of-dental-implants", label: "Benefits of Implants", views: 9 },
      { page: "/pain-after-gum-graft", label: "Pain After Gum Graft", views: 8 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 284, pct: 48.8 },
      { source: "Instagram (paid)", sessions: 106, pct: 18.2 },
      { source: "Google", sessions: 103, pct: 17.7 },
      { source: "Facebook (paid)", sessions: 63, pct: 10.8 },
      { source: "Other", sessions: 25, pct: 4.5 },
    ],
    devices: [
      { device: "Desktop", pct: 60.5 },
      { device: "Mobile", pct: 39.5 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jul 13", visitors: 107 },{ date: "Jul 14", visitors: 94 },
      { date: "Jul 15", visitors: 62 },{ date: "Jul 16", visitors: 65 },
      { date: "Jul 17", visitors: 72 },{ date: "Jul 18", visitors: 53 },
      { date: "Jul 19", visitors: 51 },
    ],
    search: {
      totalClicks: 56, totalImpressions: 564, avgCTR: 9.93, avgPosition: 4.9,
      note: "GSC Jul 12 – Jul 18 (edgardelchaar.com · one-day lag)",
      topQueries: [
        { query: "dr el chaar", clicks: 4, ctr: 20.00, position: 3.20 },
        { query: "edgar el chaar", clicks: 3, ctr: 33.33, position: 1.78 },
        { query: "edgard el chaar", clicks: 2, ctr: 4.00, position: 1.20 },
        { query: "el chaar", clicks: 2, ctr: 22.22, position: 1.78 },
        { query: "dr. el chaar", clicks: 1, ctr: 12.50, position: 3.38 },
      ],
      topPages: [
        { page: "Homepage", clicks: 46, impressions: 398, ctr: 11.56 },
        { page: "Our Doctors", clicks: 7, impressions: 271, ctr: 2.58 },
        { page: "Doctors & Periodontists (UES)", clicks: 3, impressions: 159, ctr: 1.89 },
        { page: "Locations", clicks: 0, impressions: 88, ctr: 0.00 },
      ],
    },
  };
  const websiteData30d = {
    period: "June 20 – July 19, 2026",
    sessions: 1937,
    topPages: [
      { page: "/", label: "Home", views: 1155 },
      { page: "/locations", label: "Locations", views: 681 },
      { page: "/our-doctors", label: "Our Doctors", views: 67 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Doctors (UES)", views: 66 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 34 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 967, pct: 49.9 },
      { source: "Instagram (paid)", sessions: 373, pct: 19.3 },
      { source: "Google", sessions: 345, pct: 17.8 },
      { source: "Facebook (paid)", sessions: 161, pct: 8.3 },
      { source: "Other", sessions: 91, pct: 4.7 },
    ],
    devices: [
      { device: "Desktop", pct: 59.4 },
      { device: "Mobile", pct: 40.6 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jun 20", visitors: 24 },{ date: "Jun 24", visitors: 19 },
      { date: "Jun 28", visitors: 14 },{ date: "Jul 2", visitors: 73 },
      { date: "Jul 6", visitors: 119 },{ date: "Jul 10", visitors: 85 },
      { date: "Jul 14", visitors: 94 },{ date: "Jul 18", visitors: 53 },
    ],
    search: {
      totalClicks: 172, totalImpressions: 2339, avgCTR: 7.35, avgPosition: 8.6,
      note: "GSC Jun 19 – Jul 18 (edgardelchaar.com)",
      topQueries: [
        { query: "dr el chaar", clicks: 14, ctr: 16.09, position: 2.25 },
        { query: "edgard el chaar", clicks: 13, ctr: 13.27, position: 1.26 },
        { query: "dr edgard el chaar", clicks: 6, ctr: 20.00, position: 3.00 },
        { query: "edgar el chaar", clicks: 5, ctr: 14.71, position: 2.06 },
        { query: "el chaar", clicks: 4, ctr: 10.53, position: 1.82 },
      ],
      topPages: [
        { page: "Homepage", clicks: 153, impressions: 1684, ctr: 9.09 },
        { page: "Doctors & Periodontists (UES)", clicks: 9, impressions: 359, ctr: 2.51 },
        { page: "Our Doctors", clicks: 7, impressions: 271, ctr: 2.58 },
        { page: "Locations", clicks: 1, impressions: 337, ctr: 0.30 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of July 19, 2026)",
    totalEpisodes: 49, totalDownloads: 4899, periodDownloads: 66,
    last7Days: 66, last30Days: 161, last90Days: 312,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 305 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 185 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Spotify", downloads: 1194, pct: 24 },
      { name: "Web Browser", downloads: 1163, pct: 24 },
      { name: "Apple Podcasts", downloads: 1064, pct: 22 },
      { name: "Buzzsprout Site", downloads: 406, pct: 8 },
      { name: "iVoox", downloads: 333, pct: 7 },
    ],
    topCountries: [
      { country: "United States", downloads: 3105 },
      { country: "India", downloads: 145 },
      { country: "Canada", downloads: 141 },
      { country: "Germany", downloads: 126 },
      { country: "Russian Federation", downloads: 113 },
    ],
    topCities: [
      { city: "New York", downloads: 409 },
      { city: "Brooklyn", downloads: 123 },
      { city: "Queens", downloads: 90 },
      { city: "Frankfurt am Main", downloads: 87 },
      { city: "Philadelphia", downloads: 64 },
    ],
  };

  const socialData7d = {
    period: "July 13 – July 19, 2026",
    followers: 3181, followerGrowth: 7, follows: 7, unfollows: 0,
    totalViews: 6183, totalReach: 5460, reachChange: -33.8, totalInteractions: 111,
    viewSplit: { followers: 39, nonFollowers: 61 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 21, posts: 69, stories: 10 },
    interactionsByType: { reels: 20, posts: 78, stories: 2 },
    totalLikes: 44, totalComments: 0, totalSaves: 0, totalShares: 8,
    storyViews: 184, storyCompletion: 86, storyCount: 4,
    dailyViews: [
      { date: "Jul 13", views: 1290 },{ date: "Jul 14", views: 840 },
      { date: "Jul 15", views: 520 },{ date: "Jul 16", views: 380 },
      { date: "Jul 17", views: 780 },{ date: "Jul 18", views: 690 },
      { date: "Jul 19", views: 1683 },
    ],
    posts: [
      { id: 1, title: "When a Tooth Is Worth Saving · Dr. Vitaliya Sobol", type: "Post", date: "Jul 19", views: 1004, reach: 431, likes: 29, comments: 0, saves: 0, shares: 5, er: 7.89, skipRate: 0, avgWatch: "—", igUrl: "", isTop: true },
      { id: 2, title: "Before You Add Another Lemon Wedge", type: "Reel", date: "Jul 17", views: 348, reach: 240, likes: 10, comments: 0, saves: 0, shares: 1, er: 4.58, skipRate: 0, avgWatch: "5.2s", igUrl: "https://www.instagram.com/reel/Da6E3hUBoVD/", isTop: false },
      { id: 3, title: "Healthy Smiles Start Below the Surface", type: "Post", date: "Jul 18", views: 315, reach: 171, likes: 5, comments: 0, saves: 0, shares: 2, er: 4.09, skipRate: 0, avgWatch: "—", igUrl: "", isTop: false },
    ],
  };
  const socialData30d = {
    period: "June 20 – July 19, 2026",
    followers: 3181, followerGrowth: 38, follows: 38, unfollows: 0,
    totalViews: 51430, totalReach: 20130, reachChange: 43.9, totalInteractions: 761,
    viewSplit: { followers: 29, nonFollowers: 71 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 13, posts: 81, stories: 6 },
    interactionsByType: { reels: 13, posts: 82, stories: 5 },
    totalLikes: 201, totalComments: 2, totalSaves: 4, totalShares: 21,
    storyViews: 1299, storyCompletion: 86, storyCount: 17,
    dailyViews: [
      { date: "Jun 20", views: 180 },{ date: "Jun 24", views: 420 },
      { date: "Jun 27", views: 1500 },{ date: "Jul 1", views: 11000 },
      { date: "Jul 5", views: 1700 },{ date: "Jul 9", views: 2100 },
      { date: "Jul 14", views: 840 },{ date: "Jul 19", views: 1683 },
    ],
    posts: [
      { id: 1, title: "Which Summer Treat Is Toughest? (Carousel)", type: "Post", date: "Jun 26", views: 1612, reach: 512, likes: 35, comments: 1, saves: 1, shares: 4, er: 7.81, skipRate: 0, avgWatch: "—", igUrl: "", isTop: true },
      { id: 2, title: "Healthy Gums, Healthy Bone", type: "Post", date: "Jun 27", views: 1496, reach: 600, likes: 21, comments: 0, saves: 1, shares: 3, er: 4.17, skipRate: 0, avgWatch: "—", igUrl: "", isTop: false },
      { id: 3, title: "Your Smile Is Just One Part of Your Health · Dr. Dinoi", type: "Reel", date: "Jul 9", views: 1301, reach: 964, likes: 24, comments: 0, saves: 1, shares: 1, er: 2.70, skipRate: 0, avgWatch: "6.7s", igUrl: "https://www.instagram.com/reel/DalQX81hr1D/", isTop: false },
      { id: 4, title: "When a Tooth Is Worth Saving · Dr. Vitaliya Sobol", type: "Post", date: "Jul 19", views: 1004, reach: 431, likes: 29, comments: 0, saves: 0, shares: 5, er: 7.89, skipRate: 0, avgWatch: "—", igUrl: "", isTop: false },
      { id: 5, title: "Is the Name of the School Really What Matters?", type: "Post", date: "Jul 5", views: 942, reach: 474, likes: 29, comments: 1, saves: 1, shares: 3, er: 7.17, skipRate: 0, avgWatch: "—", igUrl: "", isTop: false },
      { id: 6, title: "Every Recommendation Should Have a Reason", type: "Post", date: "Jul 2", views: 463, reach: 188, likes: 5, comments: 0, saves: 0, shares: 2, er: 3.72, skipRate: 0, avgWatch: "—", igUrl: "", isTop: false },
    ],
  };
  const socialData = timeRange === "7d" ? socialData7d : socialData30d;

  const adsData = {
    period: "June 20 – July 19, 2026",
    campaign: "July Whitening Promo (active through Jul 31)",
    totalSpend: 209.16,
    impressions: 27821,
    reach: 20115,
    activeAds: 2,
    results: 272,
    costPerResult: 0.77,
    pctOfViews: 21.8,
    pctOfInteractions: 1.3,
    pctOfViews7d: 30.0,
    pctOfInteractions7d: 2.7,
    ads: [
      { name: "Your best summer accessory", spend: 156.15, impressions: 20526, reach: 13473, results: 211, cpr: 0.74, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
      { name: "Make it a summer to remember", spend: 53.01, impressions: 7295, reach: 6642, results: 61, cpr: 0.87, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "social", label: "Social", icon: "◍" },
    { id: "links", label: "Links", icon: "⊞" },
    { id: "website", label: "Website", icon: "◈" },
    { id: "ads", label: "Paid Ads", icon: "◐" },
    { id: "podcast", label: "Podcast", icon: "◉" },
    { id: "audience", label: "Audience", icon: "◎" },
    { id: "insights", label: "Insights", icon: "✦" },
  ];

  const severityStyle: Record<string, { bg: string; border: string; dot: string }> = {
    success: { bg: "rgba(136,163,174,0.12)", border: "rgba(136,163,174,0.35)", dot: "#88A3AE" },
    warning: { bg: "rgba(113,82,98,0.10)", border: "rgba(113,82,98,0.30)", dot: "#715262" },
    danger: { bg: "rgba(190,90,90,0.10)", border: "rgba(190,90,90,0.30)", dot: "#BE5A5A" },
    info: { bg: "rgba(189,203,206,0.15)", border: "rgba(189,203,206,0.35)", dot: "#88A3AE" },
  };

  const sevMark: Record<string, string> = { success: "\u25B2", warning: "\u25BC", danger: "\u25CF", info: "\u25C6" };
  const sevColor: Record<string, string> = { success: "#88A3AE", warning: "#715262", danger: "#BE5A5A", info: "#BDCBCE" };

  function InsightCard({ title, body, evidence, impact, action, severity }: { title: string; body?: string; evidence?: string[]; impact?: string; action?: string; severity: string }) {
    const sv = severity || "info";
    if (!evidence) {
      const s2 = severityStyle[sv] || severityStyle.info;
      return (
        <div style={{ background: s2.bg, border: `1px solid ${s2.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: s2.dot, flexShrink: 0 }} />
            <span style={{ fontWeight: 700, fontSize: 13, color: "#715262", letterSpacing: "0.01em" }}>{title}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5C4A53" }}>{body}</div>
        </div>
      );
    }
    return (
      <div className={`ins sev-${sv}`}>
        <div className="ins-title"><span className="ins-mark" style={{ color: sevColor[sv] }}>{sevMark[sv]}</span><span>{title}</span></div>
        <div className="ins-label">Evidence</div>
        <ul className="ins-ev">{evidence.map((e, i) => <li key={i}>{e}</li>)}</ul>
        {impact && <><div className="ins-label">Business Impact</div><div className="ins-impact">{impact}</div></>}
        {action && <><div className="ins-label">Recommended Action</div><div className="ins-action">{action}</div></>}
      </div>
    );
  }

  function ExecCard({ eyebrow, tone, metrics, hero, noteLabel, notes }: { eyebrow: string; tone: string; metrics?: { val: string; label: string; delta?: string; dir?: string }[]; hero?: { label: string; title: string; stats: { val: string; label: string }[] }; noteLabel: string; notes: { text: string; tone?: string }[] }) {
    return (
      <div className={`exec-card tone-${tone}`}>
        <div className="exec-eyebrow">{eyebrow}</div>
        {metrics && (<div className="exec-metrics">{metrics.map((m, i) => (
          <div key={i} className="exec-metric">
            <div className="exec-metric-val">{m.val}</div>
            <div className="exec-metric-label">{m.label}</div>
            {m.delta && <div className={`exec-metric-delta ${m.dir || "flat"}`}>{m.dir === "up" ? "\u25B2" : m.dir === "down" ? "\u25BC" : "\u2014"} {m.delta}</div>}
          </div>))}
        </div>)}
        {hero && (<div className="exec-hero">
          <div className="exec-hero-label">{hero.label}</div>
          <div className="exec-hero-title">{hero.title}</div>
          <div className="exec-hero-stats">{hero.stats.map((h, i) => <div key={i} className="exec-hero-stat">{h.val} <span>{h.label}</span></div>)}</div>
        </div>)}
        <div className="exec-note-label">{noteLabel}</div>
        <ul className="exec-list">{notes.map((n, i) => <li key={i} className={n.tone || ""}>{n.text}</li>)}</ul>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FAF6F3", fontFamily: "'Cinzel', serif" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #F1E4DC", borderTopColor: "#715262", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9B8E94" }}>Loading report...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className={`root ${loaded ? "on" : ""}`}>
      {/* HEADER */}
      <div className="hdr">
        <div className="hdr-top">
          <div>
            <div className="hdr-brand">Figment Creative · Social Intelligence</div>
            <div className="hdr-title">{d.client.fullName}</div>
            <div className="hdr-sub">Social Media Performance · {d.client.period}</div>
          </div>
          <div className="hdr-badge"><div className="hdr-pulse" />Weekly Report</div>
        </div>
      </div>

      {/* TABS */}
      {(tab === "links" || tab === "social" || tab === "website") && <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "12px 0 4px" }}>
        {(["7d", "30d"] as const).map((r) => (
          <button key={r} onClick={() => setTimeRange(r)} style={{ padding: "6px 18px", borderRadius: 99, border: `1.5px solid ${timeRange === r ? "#715262" : "#D9CCC1"}`, background: timeRange === r ? "#715262" : "transparent", color: timeRange === r ? "#fff" : "#715262", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>{r === "7d" ? "Last 7 Days" : "Last 30 Days"}</button>
        ))}
      </div>}
      <div className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
            <span style={{ fontSize: 15 }}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <>
            <div className="kpi-row">
              {[
                { ...d.kpi.followers, delay: 0 },
                { ...d.kpi.reach, delay: 80 },
                { ...d.kpi.engagementRate, delay: 240 },
                { ...d.kpi.engagements, delay: 320 }
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">
                    {typeof k.value === "number" ? <AnimatedNumber value={k.value} suffix={"suffix" in k ? (k as { suffix: string }).suffix : ""} /> : <span>{k.value}</span>}
                  </div>
                  {"change" in k && k.change != null && (
                    <div className="kpi-delta">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 8H2L7 2Z" fill="#88A3AE" /></svg>
                      +{k.change} this week
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="exec">
              <div className="card-hd">Executive Summary</div>
              <div className="exec-grid">
                <ExecCard
                  eyebrow="Discovery"
                  tone="warn"
                  metrics={[
                    { val: d.kpi.reach.value.toLocaleString(), label: "Reach", delta: "34%", dir: "down" },
                    { val: d.kpi.views.value.toLocaleString(), label: "Views", delta: "48%", dir: "down" },
                    { val: `${d.viewerSplit.nonFollowers}%`, label: "Non-Follower", delta: "21pt", dir: "down" },
                  ]}
                  noteLabel="Takeaway"
                  notes={[
                    { text: "Reach and views both fell sharply on a low-publish week.", tone: "neg" },
                    { text: "What fell away was non-follower reach, not engaged audience.", tone: "" },
                    { text: "Paid still supplies 30% of views at 2.7% of interactions.", tone: "" },
                  ]}
                />
                <ExecCard
                  eyebrow="Engagement"
                  tone="pos"
                  metrics={[
                    { val: `${d.kpi.engagementRate.value}%`, label: "Eng. Rate", delta: "0.4pt", dir: "up" },
                    { val: d.kpi.engagements.value.toLocaleString(), label: "Interactions", delta: "15%", dir: "down" },
                    { val: `${d.viewerSplit.followers}%`, label: "Follower Views", delta: "21pt", dir: "up" },
                  ]}
                  noteLabel="Why"
                  notes={[
                    { text: "Engagement rate rose even as reach fell \u2014 a better audience, not a bigger one.", tone: "pos" },
                    { text: "Follower share of views nearly doubled, from 18% to 39%.", tone: "pos" },
                    { text: "Posts drove 84 of 111 account interactions.", tone: "pos" },
                    { text: "Saves 0 \u00b7 Comments 0 \u00b7 Shares 8.", tone: "neg" },
                  ]}
                />
                <ExecCard
                  eyebrow="Content"
                  tone="neutral"
                  hero={{
                    label: "Top Performer",
                    title: "When a Tooth Is Worth Saving \u00b7 Dr. Vitaliya Sobol",
                    stats: [{ val: "1,004", label: "views" }, { val: "431", label: "reach" }, { val: "29", label: "likes" }],
                  }}
                  noteLabel="Key Notes"
                  notes={[
                    { text: `Carousels led at ${d.contentMix.posts}% of organic views; Reels ${d.contentMix.reels}%.`, tone: "pos" },
                    { text: "The one Reel had the month's weakest watch time at 5.2s.", tone: "neg" },
                    { text: "Search CTR strong at 9.93%, position 4.9 \u2014 all name-brand.", tone: "pos" },
                    { text: "Booking-link clicks fell to 7.", tone: "neg" },
                  ]}
                />
              </div>
            </div>

            <div className="cols2">
              <div className="card">
                <div className="card-hd">Content Mix</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: d.contentMix.posts }, { value: d.contentMix.reels }, { value: d.contentMix.stories }]} colors={["#715262", "#88A3AE", "#BDCBCE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[{ label: "Posts", value: d.contentMix.posts, color: "#715262" }, { label: "Reels", value: d.contentMix.reels, color: "#88A3AE" }, { label: "Stories", value: d.contentMix.stories, color: "#BDCBCE" }].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-hd">Viewer Composition</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: d.viewerSplit.followers }, { value: d.viewerSplit.nonFollowers }]} colors={["#715262", "#E4CCC2"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[{ label: "Followers", value: d.viewerSplit.followers, color: "#715262" }, { label: "Non-Followers", value: d.viewerSplit.nonFollowers, color: "#E4CCC2" }].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(113,82,98,0.10)", borderRadius: 10, border: "1px solid rgba(113,82,98,0.25)" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>▲ Discovery was wide this week (~82% non-follower) — returning Reels plus paid pushed reach well outside the follower graph; capturing it as follows/saves is the gap</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {engine.alerts.length > 0 && <div>{engine.alerts.map((a, i) => <InsightCard key={i} {...a} />)}</div>}
          </>
        )}

        {/* LINKS */}
        {tab === "links" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Clicks", value: linkData.totalClicks, delay: 0 },
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
                </div>
              ))}
            </div>
            <div className="card"><div className="card-hd">Top Links · {linkData.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {linkData.topLinks.map((l, i) => {
                  const maxClicks = Math.max(...linkData.topLinks.map(x => x.clicks));
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: "#715262", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ width: 140, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>{l.path}</div>
                      <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${(l.clicks / maxClicks) * 100}%`, height: "100%", background: i === 0 ? "#715262" : "#88A3AE", borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div className="display-num" style={{ width: 40, textAlign: "right" as const }}>{l.clicks}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Traffic Sources</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={linkData.trafficSources.map(s => ({ value: Math.round((s.clicks / linkData.trafficSources.reduce((a, b) => a + b.clicks, 0)) * 100) }))} colors={["#715262", "#88A3AE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {linkData.trafficSources.map((s, i) => (
                      <div key={s.source} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ["#715262", "#88A3AE"][i] }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{s.source}</span>
                        <span className="display-num">{s.clicks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Device Breakdown</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={linkData.devices.map(dv => ({ value: Math.round((dv.clicks / linkData.devices.reduce((a, b) => a + b.clicks, 0)) * 100) }))} colors={["#715262", "#88A3AE", "#BDCBCE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {linkData.devices.map((dv, i) => (
                      <div key={dv.os} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ["#715262", "#88A3AE", "#BDCBCE"][i] }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{dv.os}</span>
                        <span className="display-num">{dv.clicks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Top Countries</div>
                {linkData.topCountries.map((c) => {
                  const max = Math.max(...linkData.topCountries.map(x => x.clicks));
                  return (
                    <div key={c.country} className="age-row">
                      <div className="age-label" style={{ width: 110 }}>{c.country}</div>
                      <div className="age-track"><div className="age-fill" style={{ width: `${(c.clicks / max) * 100}%`, background: c.clicks === max ? "#715262" : "#88A3AE" }} /></div>
                      <div className="age-pct">{c.clicks}</div>
                    </div>
                  );
                })}
              </div>
              <div className="card"><div className="card-hd">Top Cities</div>
                {linkData.topCities.map((c) => {
                  const max = Math.max(...linkData.topCities.map(x => x.clicks));
                  return (
                    <div key={c.city} className="age-row">
                      <div className="age-label" style={{ width: 110 }}>{c.city}</div>
                      <div className="age-track"><div className="age-fill" style={{ width: `${(c.clicks / max) * 100}%`, background: c.clicks === max ? "#715262" : "#88A3AE" }} /></div>
                      <div className="age-pct">{c.clicks}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card">
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "69 human clicks over 7 days across named destinations — Homepage 30, DDS-PC UES 11, DDS-PC Midtown 4, Instagram 2, YouTube 1 (the /* wildcard and bot/datacenter traffic excluded; EEC domain total 301 clicks, 69 human, −56% WoW). Booking-link clicks (UES + Midtown = 15) are the conversion signal worth watching. Per-link splits are approximate — derived from the ShortIO pie percentages, as exact per-path counts weren't legible in this export; cities reflect this cycle's pull (NYC led at 20, datacenter excluded). ✓ DDS-PC merge checked: the NYCDS ShortIO 7-day path statistics show no DDS-PC links, so the merge added 0 this week." : "576 human clicks across named destinations over 30 days — DDS-PC UES 157, Homepage 34, DDS-PC Midtown 23, Instagram 8, YouTube 4 (EEC domain total 2,463; bot/datacenter + wildcard excluded, −19% WoW). Booking links dominate this window (UES + Midtown = 180), a clear conversion signal from the paid push. EEC-domain per-link splits are approximate (ShortIO pie percentages; exact per-path counts not legible). ✓ DDS-PC merge applied: /DDS-PC-UES (2 clicks) was stripped from the NYCDS domain and merged into DDS-PC UES here; no DDS-PC-Midtown clicks appeared on the NYCDS export."} severity="info" />
            </div>
          </>
        )}

        {/* WEBSITE */}
        {tab === "website" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Sessions", value: websiteData.sessions, delay: 0 },
                { label: "Page Views", value: websiteData.topPages.reduce((s, p) => s + p.views, 0), delay: 80 },
                { label: "Top Source", value: timeRange === "7d" ? "Direct (52.0%)" : "Direct (51.9%)", delay: 160 },
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
                </div>
              ))}
            </div>
            <div className="card"><div className="card-hd">Visitors Over Time · {websiteData.period}</div>
              <div style={{ position: "relative", height: 180 }}>
                <svg viewBox="0 0 700 160" style={{ width: "100%", height: "100%" }}>
                  <defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#715262" stopOpacity="0.18" /><stop offset="100%" stopColor="#715262" stopOpacity="0" /></linearGradient></defs>
                  {(() => {
                    const pts = websiteData.dailyVisitors;
                    const maxV = Math.max(...pts.map(p => p.visitors));
                    const coords = pts.map((p, i) => ({ x: 30 + (i / (pts.length - 1)) * 640, y: 145 - (p.visitors / maxV) * 130 }));
                    const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
                    const area = `${line} L${coords[coords.length-1].x},150 L${coords[0].x},150 Z`;
                    return (<>
                      {[0, 0.25, 0.5, 0.75, 1].map(f => { const y = 145 - f * 130; return <line key={f} x1="30" x2="670" y1={y} y2={y} stroke="#F1E4DC" strokeWidth="0.5" strokeDasharray="4,4" />; })}
                      <path d={area} fill="url(#vg)" />
                      <path d={line} fill="none" stroke="#715262" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="3" fill="#715262" stroke="#FAF6F3" strokeWidth="1.5" />)}
                      {pts.map((p, i) => <text key={`l${i}`} x={coords[i].x} y="158" textAnchor="middle" fontSize="8" fill="#9B8E94">{p.date.replace("Apr ", "4/").replace("Mar ", "3/")}</text>)}
                    </>);
                  })()}
                </svg>
              </div>
            </div>
            <div className="card"><div className="card-hd">Top Pages</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {websiteData.topPages.map((p, i) => {
                  const maxViews = websiteData.topPages[0].views;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: i === 0 ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ width: 150, fontSize: 13, fontWeight: 500, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{p.label}</div>
                      <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${(p.views / maxViews) * 100}%`, height: "100%", background: i === 0 ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div className="display-num" style={{ width: 40, textAlign: "right" as const }}>{p.views}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Traffic Sources</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={websiteData.trafficSources.map(s => ({ value: Math.round(s.pct) }))} colors={["#715262", "#88A3AE", "#BDCBCE", "#E4CCC2", "#F1E4DC"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {websiteData.trafficSources.map((s, i) => (
                      <div key={s.source} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ["#715262", "#88A3AE", "#BDCBCE", "#E4CCC2", "#F1E4DC"][i] }} />
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{s.source}</span>
                        <span className="display-num">{s.sessions}</span>
                        <span style={{ fontSize: 11, color: "#9B8E94", width: 44, textAlign: "right" as const }}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Device Breakdown</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={websiteData.devices.map(dv => ({ value: Math.round(dv.pct) }))} colors={["#715262", "#88A3AE", "#BDCBCE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {websiteData.devices.map((dv, i) => (
                      <div key={dv.device} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ["#715262", "#88A3AE", "#BDCBCE"][i] }} />
                        <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{dv.device}</span>
                        <span className="display-num-lg">{dv.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(136,163,174,0.12)", borderRadius: 10, border: "1px solid rgba(136,163,174,0.25)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>✦ Desktop-led (63% / 37%) — optimize both, and keep mobile booking CTAs thumb-reachable</span>
                </div>
              </div>
            </div>
            <div className="card"><div className="card-hd">Google Search Performance · {websiteData.period}</div>
              <div className="kpi-row" style={{ marginBottom: 18 }}>
                {[
                  { label: "Search Clicks", value: websiteData.search.totalClicks },
                  { label: "Impressions", value: websiteData.search.totalImpressions.toLocaleString() },
                  { label: "Avg CTR", value: `${websiteData.search.avgCTR}%` },
                  { label: "Avg Position", value: websiteData.search.avgPosition.toFixed(0) },
                ].map((k, i) => (
                  <div key={i} className="kpi" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="kpi-label">{k.label}</div>
                    <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Top Search Queries</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {websiteData.search.topQueries.map((q, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 12px", background: i === 0 ? "rgba(113,82,98,0.08)" : "rgba(136,163,174,0.06)", borderRadius: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: i === 0 ? "#715262" : "#88A3AE", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{q.query}</div>
                      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                        <div style={{ textAlign: "center" as const }}><div className="display-num">{q.clicks}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>clicks</div></div>
                        <div style={{ textAlign: "center" as const }}><div className="display-num">{q.ctr}%</div><div style={{ fontSize: 9, color: "#9B8E94" }}>CTR</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card"><div className="card-hd">Top Pages in Search</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {websiteData.search.topPages.map((p, i) => {
                    const maxClicks = websiteData.search.topPages[0].clicks;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 130, fontSize: 12, fontWeight: 500, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{p.page}</div>
                        <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: `${(p.clicks / maxClicks) * 100}%`, height: "100%", background: i === 0 ? "#715262" : "#88A3AE", borderRadius: 99, transition: "width 1.2s ease" }} />
                        </div>
                        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                          <div style={{ textAlign: "center" as const }}><div className="display-num">{p.clicks}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>clicks</div></div>
                          <div style={{ textAlign: "center" as const }}><div className="display-num">{p.ctr}%</div><div style={{ fontSize: 9, color: "#9B8E94" }}>CTR</div></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="card">
              <InsightCard
                title={"Website + Search \u00b7 " + (timeRange === "7d" ? websiteData.period : websiteData.period)}
                evidence={timeRange === "7d" ? [
                  "504 new visitors, 581 sessions \u2014 volume holding",
                  "Paid social = 29% of sessions (IG 106, FB 63)",
                  "\u26a0 404 page drew 164 views \u2014 the 3rd most-viewed page",
                  "Search: 56 clicks at 9.93% CTR, position 4.9",
                  "Desktop 60.5% / Mobile 39.5%",
                ] : [
                  "1,686 new visitors, 1,937 sessions over 30 days",
                  "Traffic tripled from ~20/day in late June to 70\u2013120/day once ads went live Jul 2",
                  "\u26a0 404 pages drew 526 views \u2014 more than Our Doctors (211)",
                  "Search: 172 clicks at 7.35% CTR, position 8.6, all name-brand",
                  "Spam referrals scrubbed (golbm.com, bitrix24.ru, lucxspace) \u2014 9 sessions",
                ]}
                impact="Paid is filling the funnel, but a quarter of arrivals hit a broken URL."
                action="Audit the 404s first \u2014 fixing them recovers traffic already paid for."
                severity="danger" />
            </div>
          </>
        )}

        {/* SOCIAL */}
        {tab === "social" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Views", value: socialData.totalViews, delay: 0 },
                { label: "Accounts Reached", value: socialData.totalReach, delay: 80 },
                { label: "Total Interactions", value: socialData.totalInteractions, delay: 160 },
                { label: "Followers", value: socialData.followers, delay: 240 },
                { label: "Net Growth", value: `+${socialData.followerGrowth}`, delay: 320 },
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
                </div>
              ))}
            </div>

            <div className="card"><div className="card-hd">Performance Over Time · {socialData.period}</div>
              <div style={{ position: "relative", height: 180 }}>
                <svg viewBox="0 0 700 160" style={{ width: "100%", height: "100%" }}>
                  <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#715262" stopOpacity="0.18" /><stop offset="100%" stopColor="#715262" stopOpacity="0" /></linearGradient></defs>
                  {(() => {
                    const pts = socialData.dailyViews;
                    const maxV = Math.max(...pts.map(p => p.views));
                    const coords = pts.map((p, i) => ({ x: 30 + (i / (pts.length - 1)) * 640, y: 145 - (p.views / maxV) * 130 }));
                    const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
                    const area = `${line} L${coords[coords.length-1].x},150 L${coords[0].x},150 Z`;
                    return (<>
                      {[0, 0.25, 0.5, 0.75, 1].map(f => { const y = 145 - f * 130; return <line key={f} x1="30" x2="670" y1={y} y2={y} stroke="#F1E4DC" strokeWidth="0.5" strokeDasharray="4,4" />; })}
                      <path d={area} fill="url(#sg)" />
                      <path d={line} fill="none" stroke="#715262" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={pts[i].views >= 1400 ? 5 : 3} fill={pts[i].views >= 1400 ? "#715262" : "#88A3AE"} stroke="#FAF6F3" strokeWidth="1.5" />)}
                      {pts.map((p, i) => <text key={`l${i}`} x={coords[i].x} y="158" textAnchor="middle" fontSize="8" fill="#9B8E94">{p.date.replace("Apr ", "4/").replace("Mar ", "3/")}</text>)}
                      {pts.filter(p => p.views >= 1400).map((p, idx) => { const i = pts.indexOf(p); return <text key={`v${idx}`} x={coords[i].x} y={coords[i].y - 10} textAnchor="middle" fontSize="9" fontWeight="700" fill="#715262">{p.views.toLocaleString()}</text>; })}
                    </>);
                  })()}
                </svg>
              </div>
              <div style={{ marginTop: 8, padding: "10px 14px", background: "rgba(110,139,151,0.12)", borderRadius: 10, border: "1px solid rgba(110,139,151,0.25)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Account views were steadier this week (~11.9K total) as three Reels carried the owned output — the Jul 9 'Your Smile' Reel with Dr. Dinoi led at 1,202 organic views. Paid distribution still lifts the account total above organic. (Daily shape is estimated — the account-view series isn't exported now that the Profile Growth CSV is retired.)" : "⚡ The Jul 1 paid spike (~8K account views) and the Jun 15 concierge collab Reel (1,831 IG views) anchor the 30-day window. Reels returned in the final week — three shipped — so collab Reels and paid remain the month's reach engines, now with organic cadence back."}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
              {d.posts.map((p: any) => { const url = mediaUrls[p.id]; const isEditing = editingMedia === p.id; const maxViews = Math.max(...d.posts.map((x: any) => x.views), 1); return (
                <div key={p.id} className={`postcard ${p.isTop ? "postcard-top" : ""}`}>
                  <div className="postcard-header"><div className="postcard-type-badge">{p.type}</div>{p.isTop && <div className="postcard-top-badge">★ Top Post</div>}{(p as any).isCollab && <div className="postcard-top-badge" style={{background: "rgba(88,130,220,0.15)", color: "#5882DC"}}>⚡ Collab</div>}</div>
                  <div className="postcard-title">{p.title}</div>
                  <div className={`postcard-media ${url ? "has-media" : ""}`}>
                    {!url && !isEditing && (<div className="postcard-media-empty" onClick={() => { setEditingMedia(p.id); setMediaInput(""); }}><div className="postcard-empty-inner"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BDCBCE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg><span className="postcard-empty-label">Add Post Visual</span><span className="postcard-empty-hint">Image, video, or Instagram link</span></div></div>)}
                    {isEditing && (<div className="postcard-media-input"><input className="media-input" type="text" placeholder="Paste image, video, or Instagram URL..." value={mediaInput} onChange={(e) => setMediaInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleMediaSave(p.id); if (e.key === "Escape") { setEditingMedia(null); setMediaInput(""); } }} autoFocus /><div style={{ display: "flex", gap: 6 }}><button className="media-btn secondary" onClick={() => { setEditingMedia(null); setMediaInput(""); }}>Cancel</button><button className="media-btn primary" onClick={() => handleMediaSave(p.id)}>Save</button></div></div>)}
                    {url && !isEditing && (<div className="postcard-media-filled">{isIgEmbed(url) ? (<div className="postcard-ig-crop"><iframe src={url.replace(/\/?(\?.*)?$/, "/embed")} title={p.title} scrolling="no" allowFullScreen /></div>) : isVideo(url) ? (<video controls playsInline preload="metadata"><source src={url} /></video>) : (<img src={url} alt={p.title} />)}<div className="postcard-media-actions"><button onClick={() => { setEditingMedia(p.id); setMediaInput(url); }}>✎</button><button onClick={() => handleMediaRemove(p.id)}>✕</button></div></div>)}
                  </div>
                  <div className="postcard-primary"><div className="postcard-hero-metric"><span className="postcard-hero-val">{p.views?.toLocaleString()}</span><span className="postcard-hero-label">Views</span></div><div className="postcard-hero-divider" /><div className="postcard-hero-metric"><span className="postcard-hero-val">{p.reach?.toLocaleString()}</span><span className="postcard-hero-label">Reach</span></div></div>
                  <div className="postcard-perf-bar"><div className="postcard-perf-fill" style={{ width: `${(p.views / maxViews) * 100}%` }} /></div>
                  <div className="postcard-secondary">{[{ icon: "♡", val: p.likes, label: "Likes" }, { icon: "↗", val: p.shares, label: "Shares" }, { icon: "💬", val: p.comments, label: "Comments" }, { icon: "⊕", val: p.saves, label: "Saves" }].map((m) => (<div key={m.label} className={`postcard-sec-item ${m.val === 0 ? "zero" : ""}`}><span className="postcard-sec-val">{m.val}</span><span className="postcard-sec-label">{m.label}</span></div>))}</div>
                </div>); })}
            </div>

            <div className="card"><div className="card-hd">Content Performance · {socialData.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {socialData.posts.map((p, i) => {
                  const maxV = socialData.posts[0].views;
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: p.isTop ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ minWidth: 0, flex: "0 0 200px" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: "#9B8E94", marginTop: 2 }}>{p.type} · {p.date}{p.isTop ? " · ★ Top Post" : ""}{(p as any).isCollab ? " · ⚡ Collab" : ""}</div>
                      </div>
                      <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${(p.views / maxV) * 100}%`, height: "100%", background: p.isTop ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                        <div style={{ textAlign: "center" as const }}><div className="display-num">{p.views.toLocaleString()}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>views</div></div>
                        <div style={{ textAlign: "center" as const }}><div className="display-num">{p.reach.toLocaleString()}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>reach</div></div>
                        <div style={{ textAlign: "center" as const }}><div className="display-num">{p.er}%</div><div style={{ fontSize: 9, color: "#9B8E94" }}>ER</div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cols2">
              <div className="card"><div className="card-hd">Views by Content Type</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: Math.round(socialData.viewsByType.reels) }, { value: Math.round(socialData.viewsByType.posts) }, { value: Math.round(socialData.viewsByType.stories) }]} colors={["#715262", "#88A3AE", "#BDCBCE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[
                      { label: "Reels", value: socialData.viewsByType.reels, color: "#715262" },
                      { label: "Posts", value: socialData.viewsByType.posts, color: "#88A3AE" },
                      { label: "Stories", value: socialData.viewsByType.stories, color: "#BDCBCE" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Interactions by Type</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: Math.round(socialData.interactionsByType.reels) }, { value: Math.round(socialData.interactionsByType.posts) }, { value: Math.round(socialData.interactionsByType.stories) }]} colors={["#715262", "#88A3AE", "#BDCBCE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[
                      { label: "Reels", value: socialData.interactionsByType.reels, color: "#715262" },
                      { label: "Posts", value: socialData.interactionsByType.posts, color: "#88A3AE" },
                      { label: "Stories", value: socialData.interactionsByType.stories, color: "#BDCBCE" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(113,82,98,0.10)", borderRadius: 10, border: "1px solid rgba(113,82,98,0.25)" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ With no feed post this week, 100% of owned interactions came from Reels — the 130 account-level engaged accounts read low against a paid-lifted reach base, but the three Reels ran a healthy 2.7–6.8% organic ER." : "✦ Feed posts drove ~62% of interactions over 30 days and Reels ~38% — a more balanced mix than last cycle as Reels returned in the final week; the Jun 15 collab Reel leads the Reel side"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cols2">
              <div className="card"><div className="card-hd">Discovery Funnel</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: Math.round(socialData.viewSplit.nonFollowers) }, { value: Math.round(socialData.viewSplit.followers) }]} colors={["#715262", "#E4CCC2"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[
                      { label: "Non-Followers", value: socialData.viewSplit.nonFollowers, color: "#715262" },
                      { label: "Followers", value: socialData.viewSplit.followers, color: "#E4CCC2" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.label} (views)</span>
                        <span className="display-num-lg">{item.value}%</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(136,163,174,0.12)", borderRadius: 10, border: "1px solid rgba(136,163,174,0.25)" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ ~82% of views from non-followers this week — the widest in the file, as returning Reels and paid pushed distribution well outside the follower graph; the challenge is converting that reach to follows/saves." : "✦ ~72% of views from non-followers over 30 days — paid distribution and the collab Reel keep reaching new audiences"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Engagement Breakdown</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Likes", value: socialData.totalLikes, max: 200, color: "#715262" },
                    { label: "Shares", value: socialData.totalShares, max: 200, color: "#88A3AE" },
                    { label: "Comments", value: socialData.totalComments, max: 200, color: "#BDCBCE" },
                    { label: "Saves", value: socialData.totalSaves, max: 200, color: "#BE5A5A" },
                  ].map((m) => (
                    <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 72, fontSize: 13, fontWeight: 500 }}>{m.label}</div>
                      <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${(Math.max(m.value, 0.5) / m.max) * 100}%`, height: "100%", background: m.color, borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div className="display-num" style={{ width: 36, textAlign: "right" as const }}>{m.value}</div>
                    </div>
                  ))}
                </div>
                <div className="alert-box danger-bg" style={{ marginTop: 14, padding: "10px 14px", background: "rgba(190,90,90,0.10)", borderRadius: 10, border: "1px solid rgba(190,90,90,0.25)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Just 1 save and 1 share this week — despite a wide reach window. Saves remain the biggest lever and the natural fit for EEC's authority content; add save-CTAs to the Reels to bank the reach as durable signal" : "▲ 3 saves and 16 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Posts and Stories carried the week. Toggle to 30-day to see the Jun 15 collaboration Reel that anchors the broader window.</div>
                </div>
              ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {socialData.posts.filter(p => p.type === "Reel").map((p) => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: p.isTop ? "rgba(113,82,98,0.10)" : "rgba(136,163,174,0.08)", borderRadius: 12, border: p.isTop ? "1px solid rgba(113,82,98,0.25)" : "1px solid transparent" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.title}{p.isTop ? " ★" : ""}</div>
                      <div style={{ fontSize: 11, color: "#9B8E94", marginTop: 2 }}>{p.date} · {p.shares} shares{p.skipRate ? ` · ${p.skipRate}% skip rate` : ""}</div>
                    </div>
                    <div style={{ display: "flex", gap: 18, flexShrink: 0 }}>
                      <div style={{ textAlign: "center" as const }}><div style={{ fontSize: 18, fontWeight: 700, color: "#715262" }}>{p.views.toLocaleString()}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>views</div></div>
                      <div style={{ textAlign: "center" as const }}><div style={{ fontSize: 18, fontWeight: 700, color: "#88A3AE" }}>{p.reach.toLocaleString()}</div><div style={{ fontSize: 9, color: "#9B8E94" }}>reach</div></div>
                      <div style={{ textAlign: "center" as const }}><div style={{ fontSize: 18, fontWeight: 700, color: p.er >= 10 ? "#715262" : "#BDCBCE" }}>{p.er}%</div><div style={{ fontSize: 9, color: "#9B8E94" }}>ER</div></div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>

            <div className="card">
              <InsightCard
                title={"Social Intelligence \u00b7 " + socialData.period}
                evidence={timeRange === "7d" ? [
                  "6,183 views on 5,460 reach (780 avg/day \u00d7 7) \u2014 both down sharply",
                  "111 account-level interactions: Post 84 \u00b7 Reel 22 \u00b7 Ad 3 \u00b7 Story 2",
                  "Engagement rate 2.03%, up from 1.6% despite the reach drop",
                  "Follower share of views 39%, up from 18%",
                  "Seven pieces published \u2014 2 posts, 1 Reel, 4 Stories",
                ] : [
                  "51,430 views on 20,130 reach (671 avg/day \u00d7 30)",
                  "761 account-level interactions: Post 616 \u00b7 Reel 100 \u00b7 Story 35 \u00b7 Ad 10",
                  "Engagement rate 3.78% across 29 pieces",
                  "Carousel views 20,630 \u2014 far above the 7,038 published in-window",
                  "Followers +38; 71% of views from non-followers",
                ]}
                impact={timeRange === "7d" ? "A smaller, more engaged audience \u2014 quality up, volume down." : "Evergreen carousels are carrying the account beyond the posting week."}
                action={timeRange === "7d" ? "Hold the carousel-led mix and restore doctor-led Reels." : "Identify the resurging carousel and build three more like it."}
                severity={timeRange === "7d" ? "success" : "info"} />
              <InsightCard
                title="Key Insight"
                evidence={[
                  "Reach \u221234% and views \u221248%, but engagement rate rose to 2.03%",
                  "Follower share of views nearly doubled to 39%",
                  "Dr. Sobol carousel: 1,004 views, 431 reach, 29 likes",
                  "The one Reel logged the month's weakest watch time at 5.2s",
                  "Booking clicks fell to 7; homepage clicks tripled to 129 over 30 days",
                ]}
                impact="EEC traded reach for relevance this week \u2014 the opposite trade to NYCDS. The risk is a booking funnel that no longer has a door."
                action="Restore booking links in Stories and bio, then rebalance to two carousels per doctor-led Reel."
                severity="success" />
            </div>
          </>
        )}

        {/* PODCAST */}
        {tab === "ads" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Spend", value: "$209.16", delay: 0 },
                { label: "Landing-Page Views", value: adsData.results, delay: 80 },
                { label: "Cost / Result", value: "$0.77", delay: 160 },
                { label: "Impressions", value: adsData.impressions, delay: 240 },
                { label: "Paid Reach", value: adsData.reach, delay: 320 },
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
                </div>
              ))}
            </div>

            <div className="card"><div className="card-hd">Ad Performance · {adsData.campaign} · {adsData.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {adsData.ads.map((a, i) => {
                  const maxImp = Math.max(...adsData.ads.map(x => x.impressions));
                  return (
                    <div key={i} style={{ paddingBottom: 16, borderBottom: i < adsData.ads.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-heading)" }}>{a.name}</span>
                        <span className="display-num">${a.spend.toFixed(2)}</span>
                      </div>
                      <div style={{ height: 8, background: "var(--bg-warm)", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
                        <div style={{ width: `${(a.impressions / maxImp) * 100}%`, height: "100%", background: i === 0 ? "var(--plum)" : "var(--steel)", borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" as const, marginBottom: 6 }}>
                        {[{ l: "Impressions", v: a.impressions.toLocaleString() }, { l: "Reach", v: a.reach.toLocaleString() }, { l: "Results", v: a.results.toLocaleString() }, { l: "Cost / result", v: "$" + a.cpr.toFixed(2) }].map((m) => (
                          <div key={m.l}><span style={{ fontSize: 13, fontWeight: 700, color: "var(--plum)" }}>{m.v}</span> <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.l}</span></div>
                        ))}
                      </div>
                      <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{a.quality}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cols2">
              <div className="card"><div className="card-hd">Spend Allocation</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: 75 }, { value: 25 }]} colors={["#715262", "#88A3AE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[{ label: "Your best summer accessory", value: 75, color: "#715262" }, { label: "Make it a summer to remember", value: 25, color: "#88A3AE" }].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Paid Contribution · Native IG</div>
                <div style={{ display: "flex", gap: 14 }}>
                  <div className="stat-box" style={{ flex: 1, textAlign: "center" as const, padding: "16px", background: "rgba(113,82,98,0.08)", borderRadius: 12 }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#715262" }}>{adsData.pctOfViews7d}%</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>of Views from ads (7d)</div>
                  </div>
                  <div className="stat-box" style={{ flex: 1, textAlign: "center" as const, padding: "16px", background: "rgba(136,163,174,0.10)", borderRadius: 12 }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#88A3AE" }}>{adsData.pctOfInteractions7d}%</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>of Interactions from ads (7d)</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(136,163,174,0.12)", borderRadius: 10, border: "1px solid rgba(136,163,174,0.25)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>&#10022; Over 30 days ads carried {adsData.pctOfViews}% of content-type views (8,742 of 40,056) but only {adsData.pctOfInteractions}% of interactions (10 of 761). Paid buys reach; organic earns engagement. &#9888; Per-ad reach is not de-duplicated &mdash; the {adsData.reach.toLocaleString()} total overstates unique people; use impressions.</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Paid Intelligence</div>
              <InsightCard
                title="Cheap reach that stalls at the landing page"
                evidence={[
                  "$209.16 spend \u2192 272 landing-page views at $0.77",
                  "Both ads rank Conversion rate Below average (bottom 35%)",
                  "Quality and engagement rankings sit at Average",
                  "Ads = 30% of 7-day content views but 2.7% of interactions",
                ]}
                impact="The buy delivers volume. The destination does not convert it."
                action="Add a Lead/Booking event, then fix the whitening landing page before raising budget."
                severity="warning" />
            </div>
          </>
        )}

        {tab === "podcast" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Episodes", value: podcastData.totalEpisodes, delay: 0 },
                { label: "All-Time Downloads", value: podcastData.totalDownloads, delay: 80 },
                { label: "Last 30 Days", value: podcastData.last30Days, delay: 160 },
                { label: "Last 7 Days", value: podcastData.last7Days, delay: 240 },
              ].map((k, i) => (
                <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-val"><AnimatedNumber value={k.value} /></div>
                </div>
              ))}
            </div>
            <div className="card"><div className="card-hd">Top Episodes · All Time</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {podcastData.topEpisodes.map((ep, i) => {
                  const maxDl = podcastData.topEpisodes[0].downloads;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 99, background: i === 0 ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ flex: 1, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{ep.title}</div>
                      <div style={{ width: 120, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden", flexShrink: 0 }}>
                        <div style={{ width: `${(ep.downloads / maxDl) * 100}%`, height: "100%", background: i === 0 ? "#715262" : i < 3 ? "#88A3AE" : "#BDCBCE", borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div className="display-num" style={{ width: 40, textAlign: "right" as const }}>{ep.downloads}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Listening Platforms</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={podcastData.platforms.map(p => ({ value: Math.round(p.pct) }))} colors={["#715262", "#88A3AE", "#BDCBCE", "#E4CCC2", "#F1E4DC", "#C4B5AD"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {podcastData.platforms.map((p, i) => (
                      <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: ["#715262", "#88A3AE", "#BDCBCE", "#E4CCC2", "#F1E4DC", "#C4B5AD"][i] }} />
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                        <span className="display-num">{p.downloads.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Download Velocity</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "8px 0" }}>
                  {[
                    { label: "Last 7 Days", value: podcastData.last7Days, max: 600, color: "#715262" },
                    { label: "Last 30 Days", value: podcastData.last30Days, max: 600, color: "#88A3AE" },
                    { label: "Last 90 Days", value: podcastData.last90Days, max: 600, color: "#BDCBCE" },
                    { label: "All Time", value: podcastData.totalDownloads, max: 5000, color: "#E4CCC2" },
                  ].map((m) => (
                    <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 90, fontSize: 13, fontWeight: 500 }}>{m.label}</div>
                      <div style={{ flex: 1, height: 10, background: "#F1E4DC", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${(m.value / m.max) * 100}%`, height: "100%", background: m.color, borderRadius: 99, transition: "width 1.2s ease" }} />
                      </div>
                      <div className="display-num" style={{ width: 50, textAlign: "right" as const }}>{m.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cols2">
              <div className="card"><div className="card-hd">Top Countries</div>
                {podcastData.topCountries.map((c) => {
                  const max = podcastData.topCountries[0].downloads;
                  return (
                    <div key={c.country} className="age-row">
                      <div className="age-label" style={{ width: 110 }}>{c.country}</div>
                      <div className="age-track"><div className="age-fill" style={{ width: `${(c.downloads / max) * 100}%`, background: c.downloads === max ? "#715262" : "#88A3AE" }} /></div>
                      <div className="age-pct">{c.downloads.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
              <div className="card"><div className="card-hd">Top Cities</div>
                {podcastData.topCities.map((c) => {
                  const max = podcastData.topCities[0].downloads;
                  return (
                    <div key={c.city} className="age-row">
                      <div className="age-label" style={{ width: 110 }}>{c.city}</div>
                      <div className="age-track"><div className="age-fill" style={{ width: `${(c.downloads / max) * 100}%`, background: c.downloads === max ? "#715262" : "#88A3AE" }} /></div>
                      <div className="age-pct">{c.downloads}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card">
              <InsightCard
                title="Podcast Intelligence"
                evidence={[
                  "4,899 all-time downloads across 49 episodes \u2014 101 from the 5K milestone",
                  "Velocity climbing: 66 downloads last 7 days (vs 43), 161 last 30, 312 last 90",
                  "\u2018Postgraduate Dentistry\u2019 (pub. Jun 25) took 33 of the 161 \u2014 next-best managed 7",
                  "Platform split: Spotify 1,194 \u00b7 Web 1,163 \u00b7 Apple 1,064",
                  "NYC metro dominates \u2014 New York 409, Brooklyn 123, Queens 90",
                ]}
                impact="One new, socially-promoted episode outperformed the entire evergreen catalogue this month."
                action="Ship a new episode and give it a two-post Instagram run."
                severity="success" />
            </div>
          </>
        )}

        {/* AUDIENCE */}
        {tab === "audience" && (
          <>
            <div className="cols2">
              <div className="card">
                <div className="card-hd">Gender Split</div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <Donut data={[{ value: d.audience.gender.male }, { value: d.audience.gender.female }]} colors={["#715262", "#88A3AE"]} size={130} stroke={20} />
                  <div style={{ flex: 1 }}>
                    {[{ label: "Male", value: d.audience.gender.male, color: "#715262" }, { label: "Female", value: d.audience.gender.female, color: "#88A3AE" }].map((g) => (
                      <div key={g.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                        <div style={{ width: 12, height: 12, borderRadius: 4, background: g.color }} />
                        <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{g.label}</span>
                        <span className="display-num-lg">{g.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-hd">Age Distribution</div>
                {d.audience.age.map((a) => (
                  <div key={a.range} className="age-row">
                    <div className="age-label">{a.range}</div>
                    <div className="age-track"><div className="age-fill" style={{ width: `${(a.pct / 36) * 100}%`, background: a.pct >= 30 ? "#715262" : a.pct >= 20 ? "#88A3AE" : "#BDCBCE" }} /></div>
                    <div className="age-pct">{a.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-hd">Audience Intelligence</div>
              <InsightCard title="High-Value Patient Alignment" body="58% of the audience falls in the 35–54 age range (37% aged 35–44) — the prime demographic for implants, perio, and comprehensive restorative treatment, and a strong match for EEC's authority and publication content. This is the highest lifetime-value patient segment." severity="success" />
              <InsightCard title="Gender Balance" body="At 52% male / 48% female, the audience is nearly balanced. The 35–44 cohort is the largest single segment. The credential and case-study content resonates with a clinically-engaged, decision-stage audience — pair it with clear consult/booking CTAs to convert that trust into appointments." severity="info" />
            </div>
          </>
        )}

        {/* INSIGHTS */}
        {tab === "insights" && (
          <>
            <div className="cols2">
              <div>
                <div className="section-label">Key Insights</div>
                {engine.insights.map((ins, i) => <InsightCard key={i} {...ins} />)}
              </div>
              <div>
                <div className="section-label">Growth Opportunities</div>
                {engine.opportunities.map((o, i) => <InsightCard key={i} {...o} />)}
                {engine.alerts.map((a, i) => <InsightCard key={`a${i}`} {...a} />)}
              </div>
            </div>
            <div className="card">
              <div className="card-hd">Strategic Recommendations</div>
              {["high", "medium", "low"].map((pri) => {
                const items = engine.recommendations.filter((r) => r.priority === pri);
                if (!items.length) return null;
                return (
                  <div key={pri} className="rec-group">
                    <div className="rec-group-hd">
                      <span className={`rec-badge ${pri}`}>{pri} priority</span>
                      <span className="rec-group-count">{items.length} action{items.length > 1 ? "s" : ""}</span>
                    </div>
                    {items.map((r, i) => (
                      <div key={i} className="rec-item">
                        <div className="rec-title">{r.title}</div>
                        <div className="rec-why"><strong>Why</strong>{r.why}</div>
                        <div className="rec-outcomes">{r.outcomes.map((o, j) => <span key={j} className="rec-chip">{o}</span>)}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="footer"><span>Edgard El Chaar, DDS, PC · Powered by Figment Creative</span></div>
      </div>
    </div>
  );
}
