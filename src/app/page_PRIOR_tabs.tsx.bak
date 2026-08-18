"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "July 27 – August 2, 2026" },
  kpi: {
    followers: { value: 3193, change: 5, label: "Followers" },
    reach: { value: 4543, label: "Reach" },
    views: { value: 6973, label: "Total Views" },
    engagementRate: { value: 2.6, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 119, label: "Engagements" },
    watchTime: { value: "16.6s", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Gum Health & Heart Health (Reel)", type: "Reel", views: 1332, reach: 797, likes: 73, comments: 5, saves: 0, shares: 8, isTop: true, igPostUrl: "https://www.instagram.com/reel/DbbSMVEhWzx/" },
    { id: 2, title: "NEW EPISODE · What 50 Years in Dentistry Teaches You (Reel)", type: "Reel", views: 1512, reach: 1242, likes: 13, comments: 0, saves: 2, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/reel/DbgAPneBJRm/" },
    { id: 3, title: "Your Gums and Your Heart May Be Connected", type: "Post", views: 590, reach: 199, likes: 6, comments: 0, saves: 0, shares: 5, isTop: false, igPostUrl: "https://www.instagram.com/p/DbY6ZfGGYZt/" },
  ] as any[],
  contentMix: { posts: 21, reels: 63, stories: 16 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 45, nonFollowers: 55 },
};

type ReportData = typeof FALLBACK_DATA;

type Insight = { title: string; evidence: string[]; impact: string; action: string; severity: string };

function generateInsights(data: ReportData) {
  const insights: Insight[] = [];
  const opportunities: Insight[] = [];
  const alerts: Insight[] = [];

  const er = data.kpi.engagementRate.value;
  const reach = data.kpi.reach.value;
  const eng = data.kpi.engagements.value;

  // ---------- KEY INSIGHTS ----------
  insights.push({
    title: "Reels returned and views followed",
    evidence: [
      `Engagement rate ${er}% \u2014 up 0.5pt on the Reel-led mix`,
      "Views 6,973 \u2014 up 27% week-over-week",
      `Reach ${reach.toLocaleString()} (649/day \u00d7 7) \u2014 off 8.7% as ads wound down`,
      `${eng} account-level interactions \u2014 up 14%`,
    ],
    impact: "Two doctor-led Reels lifted both views and engagement in the same week.",
    action: "Hold the two-Reels-per-week cadence through August.",
    severity: "success",
  });

  insights.push({
    title: "The gum\u2013heart Reel is the engagement benchmark",
    evidence: [
      "73 likes, 5 comments, 8 shares on 797 reach \u2014 a 10.8% ER",
      "16.6s average watch time \u2014 the strongest retention on record here",
      "1,332 views and a 40.6% view rate past 3 seconds",
      "Health-connection storytelling out-engaged the promo posts 8-to-1",
    ],
    impact: "Clinical health-connection content is the account's highest-engagement format.",
    action: "Build a monthly \u2018oral\u2013systemic health\u2019 Reel series in this style.",
    severity: "success",
  });

  insights.push({
    title: "A double podcast milestone, promoted the same week",
    evidence: [
      "5,000 lifetime downloads and the 50th episode, both reached this window",
      "68 downloads since last report \u2014 double the prior week's 33",
      "The new episode drew 15 first-week downloads and its Reel reached 1,242 accounts",
      "The 5K-milestone post and a thank-you Story ran alongside the episode",
    ],
    impact: "The cross-channel push landed \u2014 podcast momentum doubled in the milestone week.",
    action: "Keep the episode-Reel + milestone-post pairing for future launches.",
    severity: "success",
  });

  insights.push({
    title: `Reels drove ${data.contentMix.reels}% of content views this week`,
    evidence: [
      `Reels ${data.contentMix.reels}% \u00b7 posts ${data.contentMix.posts}% \u00b7 Stories ${data.contentMix.stories}% of content-type views`,
      "Reels also took 86% of the week's interactions",
      "The episode Reel out-reached every post 6-to-1 (1,242 vs ~175 avg)",
      "Stories held a 85% completion rate across 7 frames",
    ],
    impact: "The format mix has flipped from carousel-led to Reel-led \u2014 and discovery followed.",
    action: "Keep Reels as the discovery engine; use carousels for depth and saves.",
    severity: "info",
  });

  insights.push({
    title: "Search is highly efficient, with room to widen",
    evidence: [
      "54 clicks on 521 impressions \u2014 10.4% CTR at position 5.8 this week",
      "30-day: 216 clicks at 9.33% CTR, position 5.0",
      "Top queries are all variants of \u2018Dr. El Chaar\u2019",
      "Locations page: 361 impressions but 3 clicks (0.83% CTR) \u2014 a title/snippet fix",
    ],
    impact: "Reputation search performs well; procedure and location search are the open headroom.",
    action: "Build procedure-question pages and rework the Locations title to lift its CTR.",
    severity: "info",
  });

  // ---------- OPPORTUNITIES ----------
  opportunities.push({
    title: "Booking links had their best named-link week",
    evidence: [
      "18 booking-link clicks this week \u2014 Midtown 11, UES 7",
      "30-day booking links at 70 \u2014 Midtown 45, UES 25, up from 62",
      "Homepage led named links at 53; booking links took every other named click but 2",
      "Named-link traffic totaled 73 this week",
    ],
    impact: "Booking intent is rising even as raw link volume gets noisier \u2014 the clean signal is strong.",
    action: "Keep booking links in Stories and bio, and watch whether the trend outlives the ad flight.",
    severity: "success",
  });

  opportunities.push({
    title: "July's paid campaign closed efficient \u2014 conversion is the next lever",
    evidence: [
      "$312.05 final spend \u2192 404 landing-page views at $0.77",
      "39,434 impressions; quality and engagement rankings at Average",
      "Both ads finished conversion-ranked bottom 35%",
      "Ads drove 666 paid site sessions in the GA window (IG 454 + FB 212)",
    ],
    impact: "The media buy was efficient at filling the funnel; the landing experience is what capped it.",
    action: "Before the next flight, add a Lead/Booking event and route ads to a booking-first page.",
    severity: "info",
  });

  opportunities.push({
    title: "Comments woke up; saves are still the open signal",
    evidence: [
      "5 comments this week \u2014 all on the gum\u2013heart Reel, vs 0 last week",
      "97 likes and 14 shares \u2014 the strongest interaction week of the window",
      "Only 2 saves this week; 6 across the full 30 days",
    ],
    impact: "Comment-worthy topics exist \u2014 save-worthy framing is the piece still missing.",
    action: "Close health-connection Reels with a \u2018save this for your next check-up\u2019 prompt.",
    severity: "info",
  });

  opportunities.push({
    title: "The 404 page is quietly absorbing real traffic",
    evidence: [
      "701 views in 30 days \u2014 the #3 page title on the site",
      "141 views this week alone; the pattern is persistent, not a spike",
      "Locations (809 views) and Home (1,269) are the intended destinations",
    ],
    impact: "Something \u2014 likely an old ad, email, or profile link \u2014 is pointing at a dead URL and leaking visits.",
    action: "Pull the 404's referrer detail, then 301 the dead URL to the matching live page.",
    severity: "info",
  });

  opportunities.push({
    title: "Instagram promotion is driving podcast downloads",
    evidence: [
      "Podcast crossed 5,000 all-time downloads across 50 episodes",
      "68 downloads since last report \u2014 double the prior week",
      "\u2018What 50 Years in Dentistry Teaches You\u2019: 15 first-week downloads",
      "Its launch Reel reached 1,242 accounts \u2014 the widest content of the week",
    ],
    impact: "The two channels compound when one topic runs across both \u2014 the milestone week proves it.",
    action: "Give every episode the launch-Reel + milestone-post treatment.",
    severity: "success",
  });

  return { insights, opportunities, alerts };
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
    period: "July 27 – August 2, 2026", totalClicks: 73,
    topLinks: [{ path: "Homepage", clicks: 53 }, { path: "DDS-PC Midtown", clicks: 11 }, { path: "DDS-PC UES", clicks: 7 }, { path: "Website", clicks: 2 }],
    trafficSources: [{ source: "Named links + homepage", clicks: 73 }, { source: "Wildcard / social / other", clicks: 1009 }],
    topCountries: [{ country: "United States", clicks: 26 }, { country: "Canada", clicks: 4 }],
    topCities: [{ city: "Brooklyn", clicks: 5 }, { city: "Montréal", clicks: 4 }, { city: "New York City", clicks: 1 }],
    devices: [{ os: "Mobile Safari", clicks: 30 }, { os: "Safari", clicks: 22 }, { os: "Chrome", clicks: 14 }, { os: "Edge", clicks: 2 }],
  };
  const linkData30d = {
    period: "July 4 – August 2, 2026", totalClicks: 285,
    topLinks: [{ path: "Homepage", clicks: 161 }, { path: "Website", clicks: 54 }, { path: "DDS-PC Midtown", clicks: 45 }, { path: "DDS-PC UES", clicks: 25 }],
    trafficSources: [{ source: "Named links + homepage", clicks: 285 }, { source: "Wildcard / social / other", clicks: 2283 }],
    topCountries: [{ country: "United States", clicks: 251 }],
    topCities: [{ city: "New York City", clicks: 45 }, { city: "Brooklyn", clicks: 19 }],
    devices: [{ os: "Chrome", clicks: 184 }, { os: "Mobile Safari", clicks: 135 }, { os: "Safari", clicks: 43 }, { os: "Firefox", clicks: 8 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "July 27 – August 2, 2026",
    sessions: 530,
    topPages: [
      { page: "/", label: "Home", views: 299 },
      { page: "/locations", label: "Locations", views: 78 },
      { page: "/our-doctors", label: "Our Doctors", views: 69 },
      { page: "/about", label: "About", views: 13 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 11 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 345, pct: 65.1 },
      { source: "Google", sessions: 91, pct: 17.2 },
      { source: "Instagram (paid)", sessions: 33, pct: 6.2 },
      { source: "Facebook (paid)", sessions: 26, pct: 4.9 },
      { source: "Other", sessions: 35, pct: 6.6 },
    ],
    devices: [
      { device: "Desktop", pct: 74.4 },
      { device: "Mobile", pct: 25.2 },
      { device: "Tablet", pct: 0.4 },
    ],
    dailyVisitors: [
      { date: "Jul 27", visitors: 93 },{ date: "Jul 28", visitors: 103 },
      { date: "Jul 29", visitors: 98 },{ date: "Jul 30", visitors: 32 },
      { date: "Jul 31", visitors: 27 },{ date: "Aug 1", visitors: 53 },
      { date: "Aug 2", visitors: 45 },
    ],
    search: {
      totalClicks: 54, totalImpressions: 521, avgCTR: 10.36, avgPosition: 5.8,
      note: "GSC totals Jul 26 – Aug 1 (edgardelchaar.com · one-day lag); query/page detail reflects the 30-day export",
      topQueries: [
        { query: "edgard el chaar", clicks: 21, ctr: 16.67, position: 1.20 },
        { query: "dr el chaar", clicks: 11, ctr: 14.10, position: 2.65 },
        { query: "edgar el chaar", clicks: 8, ctr: 19.51, position: 1.88 },
        { query: "el chaar", clicks: 6, ctr: 5.56, position: 2.99 },
        { query: "dr edgard el chaar", clicks: 6, ctr: 23.08, position: 3.31 },
      ],
      topPages: [
        { page: "Homepage", clicks: 170, impressions: 1750, ctr: 9.71 },
        { page: "Our Doctors", clicks: 38, impressions: 882, ctr: 4.31 },
        { page: "Doctors & Periodontists (UES)", clicks: 10, impressions: 399, ctr: 2.51 },
        { page: "Locations", clicks: 3, impressions: 361, ctr: 0.83 },
      ],
    },
  };
  const websiteData30d = {
    period: "July 4 – August 2, 2026",
    sessions: 2461,
    topPages: [
      { page: "/", label: "Home", views: 1269 },
      { page: "/locations", label: "Locations", views: 809 },
      { page: "/our-doctors", label: "Our Doctors", views: 175 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Doctors (UES)", views: 55 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 33 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 1295, pct: 52.6 },
      { source: "Instagram (paid)", sessions: 454, pct: 18.4 },
      { source: "Google", sessions: 389, pct: 15.8 },
      { source: "Facebook (paid)", sessions: 212, pct: 8.6 },
      { source: "Other", sessions: 111, pct: 4.5 },
    ],
    devices: [
      { device: "Desktop", pct: 60.9 },
      { device: "Mobile", pct: 38.9 },
      { device: "Tablet", pct: 0.2 },
    ],
    dailyVisitors: [
      { date: "Jul 4", visitors: 69 },{ date: "Jul 8", visitors: 48 },
      { date: "Jul 12", visitors: 72 },{ date: "Jul 16", visitors: 65 },
      { date: "Jul 20", visitors: 73 },{ date: "Jul 24", visitors: 68 },
      { date: "Jul 28", visitors: 103 },{ date: "Aug 1", visitors: 53 },
    ],
    search: {
      totalClicks: 216, totalImpressions: 2315, avgCTR: 9.33, avgPosition: 5.0,
      note: "GSC Jul 3 – Aug 1 (edgardelchaar.com · one-day lag); totals summed from the daily Chart export",
      topQueries: [
        { query: "edgard el chaar", clicks: 21, ctr: 16.67, position: 1.20 },
        { query: "dr el chaar", clicks: 11, ctr: 14.10, position: 2.65 },
        { query: "edgar el chaar", clicks: 8, ctr: 19.51, position: 1.88 },
        { query: "el chaar", clicks: 6, ctr: 5.56, position: 2.99 },
        { query: "dr edgard el chaar", clicks: 6, ctr: 23.08, position: 3.31 },
      ],
      topPages: [
        { page: "Homepage", clicks: 170, impressions: 1750, ctr: 9.71 },
        { page: "Our Doctors", clicks: 38, impressions: 882, ctr: 4.31 },
        { page: "Doctors & Periodontists (UES)", clicks: 10, impressions: 399, ctr: 2.51 },
        { page: "Locations", clicks: 3, impressions: 361, ctr: 0.83 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of August 3, 2026)",
    totalEpisodes: 50, totalDownloads: 5000, periodDownloads: 68,
    last7Days: 68, last30Days: 164, last90Days: 332,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 306 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 197 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 196 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 187 },
      { title: "Oral and Systemic Health (E1)", downloads: 174 },
    ],
    platforms: [
      { name: "Spotify", downloads: 1246, pct: 24 },
      { name: "Web Browser", downloads: 1191, pct: 23 },
      { name: "Apple Podcasts", downloads: 1081, pct: 21 },
      { name: "Buzzsprout Site", downloads: 406, pct: 8 },
      { name: "iVoox", downloads: 334, pct: 6 },
    ],
    topCountries: [
      { country: "United States", downloads: 3110 },
      { country: "India", downloads: 146 },
      { country: "Canada", downloads: 144 },
      { country: "Germany", downloads: 127 },
      { country: "Russian Federation", downloads: 113 },
    ],
    topCities: [
      { city: "New York", downloads: 412 },
      { city: "Brooklyn", downloads: 123 },
      { city: "Queens", downloads: 90 },
      { city: "Frankfurt am Main", downloads: 88 },
      { city: "Philadelphia", downloads: 64 },
    ],
  };

  const socialData7d = {
    period: "July 27 – August 2, 2026",
    followers: 3193, followerGrowth: 5, follows: 5, unfollows: 0,
    totalViews: 6973, totalReach: 4543, reachChange: -8.7, totalInteractions: 119,
    viewSplit: { followers: 45, nonFollowers: 55 },
    interactionSplit: { followers: 40, nonFollowers: 60 },
    viewsByType: { reels: 63, posts: 21, stories: 16 },
    interactionsByType: { reels: 86, posts: 13, stories: 1 },
    totalLikes: 97, totalComments: 5, totalSaves: 2, totalShares: 14,
    storyViews: 703, storyCompletion: 85, storyCount: 7,
    dailyViews: [
      { date: "Jul 27", views: 620 },{ date: "Jul 28", views: 540 },
      { date: "Jul 29", views: 1380 },{ date: "Jul 30", views: 1960 },
      { date: "Jul 31", views: 880 },{ date: "Aug 1", views: 820 },
      { date: "Aug 2", views: 773 },
    ],
    posts: [
      { id: 1, title: "Gum Health & Heart Health (Reel)", type: "Reel", date: "Jul 30", views: 1332, reach: 797, likes: 73, comments: 5, saves: 0, shares: 8, er: 10.79, skipRate: 0, avgWatch: "16.6s", igUrl: "https://www.instagram.com/reel/DbbSMVEhWzx/", isTop: true },
      { id: 2, title: "NEW EPISODE · What 50 Years in Dentistry Teaches You", type: "Reel", date: "Aug 1", views: 1512, reach: 1242, likes: 13, comments: 0, saves: 2, shares: 1, er: 1.29, skipRate: 0, avgWatch: "4.6s", igUrl: "https://www.instagram.com/reel/DbgAPneBJRm/", isTop: false },
      { id: 3, title: "Your Gums and Your Heart May Be Connected", type: "Post", date: "Jul 29", views: 590, reach: 199, likes: 6, comments: 0, saves: 0, shares: 5, er: 5.53, skipRate: 0, avgWatch: "—", igUrl: "https://www.instagram.com/p/DbY6ZfGGYZt/", isTop: false },
      { id: 4, title: "5,000 Downloads and Counting", type: "Post", date: "Jul 31", views: 338, reach: 150, likes: 5, comments: 0, saves: 0, shares: 0, er: 3.33, skipRate: 0, avgWatch: "—", igUrl: "https://www.instagram.com/p/DbdycB8OSsB/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "July 4 – August 2, 2026",
    followers: 3193, followerGrowth: 36, follows: 36, unfollows: 0,
    totalViews: 33990, totalReach: 25950, reachChange: 6.5, totalInteractions: 302,
    viewSplit: { followers: 48, nonFollowers: 52 },
    interactionSplit: { followers: 45, nonFollowers: 55 },
    viewsByType: { reels: 41, posts: 44, stories: 15 },
    interactionsByType: { reels: 57, posts: 42, stories: 1 },
    totalLikes: 257, totalComments: 6, totalSaves: 6, totalShares: 30,
    storyViews: 2041, storyCompletion: 83, storyCount: 21,
    dailyViews: [
      { date: "Jul 4", views: 800 },{ date: "Jul 8", views: 900 },
      { date: "Jul 12", views: 1000 },{ date: "Jul 16", views: 950 },
      { date: "Jul 20", views: 1500 },{ date: "Jul 24", views: 1100 },
      { date: "Jul 28", views: 1150 },{ date: "Aug 1", views: 1450 },
    ],
    posts: [
      { id: 1, title: "When a Tooth Is Worth Saving · Dr. Vitaliya Sobol", type: "Post", date: "Jul 19", views: 1895, reach: 782, likes: 40, comments: 1, saves: 0, shares: 8, er: 6.27, skipRate: 0, avgWatch: "—", igUrl: "https://www.instagram.com/p/Da-vqkPmRRE/", isTop: true },
      { id: 2, title: "NEW EPISODE · What 50 Years in Dentistry Teaches You", type: "Reel", date: "Aug 1", views: 1512, reach: 1242, likes: 13, comments: 0, saves: 2, shares: 1, er: 1.29, skipRate: 0, avgWatch: "4.6s", igUrl: "https://www.instagram.com/reel/DbgAPneBJRm/", isTop: false },
      { id: 3, title: "Your Smile Is Just One Part of Your Health · Dr. Dinoi", type: "Reel", date: "Jul 9", views: 1344, reach: 992, likes: 27, comments: 0, saves: 2, shares: 1, er: 3.02, skipRate: 0, avgWatch: "6.8s", igUrl: "https://www.instagram.com/reel/DalQX81hr1D/", isTop: false },
      { id: 4, title: "Gum Health & Heart Health (Reel)", type: "Reel", date: "Jul 30", views: 1332, reach: 797, likes: 73, comments: 5, saves: 0, shares: 8, er: 10.79, skipRate: 0, avgWatch: "16.6s", igUrl: "https://www.instagram.com/reel/DbbSMVEhWzx/", isTop: false },
      { id: 5, title: "When It Comes to Choosing a Postgraduate Program", type: "Post", date: "Jul 5", views: 982, reach: 488, likes: 29, comments: 0, saves: 0, shares: 2, er: 6.35, skipRate: 0, avgWatch: "—", igUrl: "https://www.instagram.com/p/DaTSj0UhvIf/", isTop: false },
      { id: 6, title: "Gum Disease Is Often Silent Until It Isn't", type: "Post", date: "Jul 24", views: 594, reach: 212, likes: 7, comments: 0, saves: 2, shares: 1, er: 4.72, skipRate: 0, avgWatch: "—", igUrl: "https://www.instagram.com/p/DbL1akHmVPB/", isTop: false },
    ],
  };
  const socialData = timeRange === "7d" ? socialData7d : socialData30d;

  const adsData = {
    period: "July 1 – 31, 2026 (final)",
    campaign: "July Whitening Promo (concluded Jul 31)",
    totalSpend: 312.05,
    impressions: 39434,
    reach: 28804,
    activeAds: 2,
    results: 404,
    costPerResult: 0.77,
    pctOfViews: 0,
    pctOfInteractions: 0,
    pctOfViews7d: 0,
    pctOfInteractions7d: 0,
    ads: [
      { name: "Your best summer accessory", spend: 215.62, impressions: 26817, reach: 17719, results: 290, cpr: 0.74, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
      { name: "Make it a summer to remember", spend: 96.43, impressions: 12617, reach: 11085, results: 114, cpr: 0.85, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
    ],
  };

  const emailData7d = {
    period: "July 27 – August 2, 2026",
    campaignCount: 1, sends: 3443, opens: 1456, openRate: 42.3,
    clicks: 46, clickRate: 1.34, ctor: 3.16,
    bounces: 403, bounceRate: 11.7, unsubs: 9, unsubRate: 0.26,
    campaigns: [
      { name: "DDS PC · Summer Promo Extensions", date: "Aug 1", sends: 3443, opens: 1456, openRate: 47.9, clicks: 46, clickRate: 1.5, bounceRate: 11.7, mobile: 47.7 },
    ],
  };
  const emailData30d = {
    period: "July 4 – August 2, 2026",
    campaignCount: 3, sends: 10444, opens: 4827, openRate: 46.2,
    clicks: 140, clickRate: 1.34, ctor: 2.90,
    bounces: 1240, bounceRate: 11.9, unsubs: 36, unsubRate: 0.34,
    campaigns: [
      { name: "DDS PC · Whitening Offer", date: "Jul 6", sends: 3514, opens: 1709, openRate: 55.3, clicks: 65, clickRate: 2.1, bounceRate: 12.0, mobile: 31.5 },
      { name: "DDS PC · Gum Article", date: "Jul 22", sends: 3487, opens: 1662, openRate: 54.1, clicks: 29, clickRate: 0.9, bounceRate: 11.9, mobile: 30.7 },
      { name: "DDS PC · Summer Promo Extensions", date: "Aug 1", sends: 3443, opens: 1456, openRate: 47.9, clicks: 46, clickRate: 1.5, bounceRate: 11.7, mobile: 47.7 },
    ],
  };
  const emailData = timeRange === "7d" ? emailData7d : emailData30d;
  const emailLifetime = {
    campaigns: 4, sends: 14012, opens: 6403, openRate: 45.7,
    clicks: 254, clickRate: 1.81, ctor: 3.97, bounces: 2311, bounceRate: 16.5, unsubs: 43,
    bestOpens: [
      { name: "DDS PC · Podcast Newsletter", rate: 63.1 },
      { name: "DDS PC · Whitening Offer", rate: 55.3 },
      { name: "DDS PC · Gum Article", rate: 54.1 },
    ],
    campaignUnsubs: [
      { name: "DDS PC · Podcast Newsletter", rate: 0.2, sends: 3568 },
      { name: "DDS PC · Whitening Offer", rate: 0.3, sends: 3514 },
      { name: "DDS PC · Gum Article", rate: 0.5, sends: 3487 },
      { name: "DDS PC · Summer Promo Extensions", rate: 0.3, sends: 3443 },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "social", label: "Social", icon: "◍" },
    { id: "links", label: "Links", icon: "⊞" },
    { id: "website", label: "Website", icon: "◈" },
    { id: "ads", label: "Paid Ads", icon: "◐" },
    { id: "podcast", label: "Podcast", icon: "◉" },
    { id: "email", label: "Email", icon: "✉" },
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
      {(tab === "links" || tab === "social" || tab === "website" || tab === "email") && <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "12px 0 4px" }}>
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
                  tone="pos"
                  metrics={[
                    { val: d.kpi.views.value.toLocaleString(), label: "Views", delta: "27%", dir: "up" },
                    { val: d.kpi.reach.value.toLocaleString(), label: "Reach", delta: "8.7%", dir: "down" },
                    { val: `${d.viewerSplit.nonFollowers}%`, label: "Non-Follower (est.)", delta: "12pt", dir: "up" },
                  ]}
                  noteLabel="Takeaway"
                  notes={[
                    { text: "Reels returned \u2014 two doctor-led Reels, two posts and seven Stories lifted views 27% week-over-week.", tone: "pos" },
                    { text: "The new-episode Reel reached 1,242 accounts \u2014 the widest single piece of the week.", tone: "pos" },
                    { text: "Ads concluded Jul 31; content views this week were fully organic.", tone: "" },
                  ]}
                />
                <ExecCard
                  eyebrow="Engagement"
                  tone="pos"
                  metrics={[
                    { val: `${d.kpi.engagementRate.value}%`, label: "Eng. Rate", delta: "0.5pt", dir: "up" },
                    { val: d.kpi.engagements.value.toLocaleString(), label: "Interactions", delta: "14%", dir: "up" },
                    { val: `${d.viewerSplit.followers}%`, label: "Follower Views (est.)", delta: "12pt", dir: "down" },
                  ]}
                  noteLabel="Why"
                  notes={[
                    { text: "Engagement rate rose to ~2.6% as Reels carried 86% of the 119 interactions.", tone: "pos" },
                    { text: "The gum\u2013heart Reel earned 73 likes, 5 comments and 8 shares \u2014 a 10.8% ER on its reach.", tone: "pos" },
                    { text: "97 likes and 14 shares this week \u2014 the strongest interaction week of the window.", tone: "pos" },
                    { text: "Saves remain thin (2); a save prompt is still the open lever.", tone: "" },
                  ]}
                />
                <ExecCard
                  eyebrow="Content"
                  tone="neutral"
                  hero={{
                    label: "Top Performer",
                    title: "Gum Health & Heart Health \u00b7 Reel",
                    stats: [{ val: "1,332", label: "views" }, { val: "797", label: "reach" }, { val: "73", label: "likes" }],
                  }}
                  noteLabel="Key Notes"
                  notes={[
                    { text: `Reels led at ${d.contentMix.reels}% of content views; posts ${d.contentMix.posts}%, Stories ${d.contentMix.stories}%.`, tone: "pos" },
                    { text: "Podcast milestone week: 5,000 lifetime downloads and the 50th episode published.", tone: "pos" },
                    { text: "Search CTR 10.4% at position 5.8 \u2014 still all name-brand queries.", tone: "pos" },
                    { text: "Booking-link clicks at 18 \u2014 the best named-link week behind the homepage.", tone: "pos" },
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ With Reels back in the mix, discovery tilted outward — an estimated ~55% of views came from non-followers this week (split estimated from the Reel-heavy content mix; the native follower breakdown wasn't exported this cycle)</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "73 clicks over 7 days across named destinations — Homepage 53, DDS-PC Midtown 11, DDS-PC UES 7, Website 2 (wildcard / social / other traffic held out at 1,009). Booking links (Midtown + UES = 18) led the named set behind the homepage, and the city panel reflects verified local engagement — led by Brooklyn. Per-path counts are exact this cycle (xlsx exports replaced pie estimation). ✓ DDS-PC merge applied: one Midtown click merged in from the linked NYCDS domain (10→11); UES added 0." : "285 clicks across named destinations over 30 days — Homepage 161, Website 54, DDS-PC Midtown 45, DDS-PC UES 25 (wildcard / social / other traffic held out at 2,283). Booking links climbed again (Midtown + UES = 70, up from 62 the prior window) — the strongest conversion signal in the link set. Per-path counts are exact this cycle (xlsx exports replaced pie estimation). ✓ DDS-PC merge applied: two Midtown clicks merged in from the linked NYCDS domain (43→45); UES added 0." } severity="info" />
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
                { label: "Top Source", value: timeRange === "7d" ? "Direct (65.1%)" : "Direct (52.6%)", delay: 160 },
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>✦ Desktop-led ({websiteData.devices[0].pct}% / {websiteData.devices[1].pct}%) — worth optimising both, and keeping mobile booking CTAs thumb-reachable</span>
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
                  "530 sessions this week \u2014 volume holding as ads wound down",
                  "Direct climbed to 65.1%; paid social eased to 11.1% (IG 33, FB 26) with ads ending Jul 31",
                  "Home leads at 299 views; Locations 78, Our Doctors 69",
                  "Search: 54 clicks at 10.36% CTR, position 5.8",
                  "Desktop 74.4% / Mobile 25.2%",
                  "The 404 page drew 141 views this week \u2014 now a standing fix, not a quirk",
                ] : [
                  "2,461 sessions over 30 days",
                  "Paid social = 27% of sessions (IG 454, FB 212) while the July campaign ran",
                  "Home (1,269) and Locations (809) absorb most arrivals",
                  "Search: 216 clicks at 9.33% CTR, position 5.0, all name-brand",
                  "The 404 page is the #3 title at 701 views \u2014 something is linking to a dead URL",
                  "Locations earns 361 search impressions but only 3 clicks (0.83% CTR)",
                ]}
                impact="Direct and search held the floor as paid wound down \u2014 and next week's sessions will dip without the ad tailwind."
                action="Trace and redirect the dead URL feeding the 404, and expect a paid-session drop now that ads have concluded."
                severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Account views rose 27% to 6,973 as Reels returned — two doctor-led Reels, two posts and seven Stories. The Jul 30 gum–heart Reel led engagement (1,332 views, 73 likes, 16.6s avg watch) and the Aug 1 episode Reel led reach at 1,242 accounts. Reach ran 649/day × 7. (Daily shape is estimated — the account-view series isn't exported now that the Profile Growth CSV is retired.)" : "⚡ 30-day views came in at 33,990 across 35 pieces of content — a normalized month after the prior window's viral-carousel spike. The Jul 19 Dr. Sobol post (1,895 views) and the two late-July Reels anchor the window, and reach averaged 865/day."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ Reels took 86% of the week's 119 content interactions — the gum–heart Reel alone earned 86 (73 likes, 5 comments, 8 shares) for a 10.8% ER on its reach. Posts added 13%, Stories 1%." : "✦ Reels drove 57% of the 302 content interactions over 30 days and posts 42% — the mix has flipped from the carousel-led prior window, with six Reels published across July"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ An estimated ~55% of views came from non-followers this week as the Reel-heavy mix reopened discovery. (Split estimated from content-type mix — the native follower breakdown wasn't exported this cycle.)" : "✦ An estimated ~52% of 30-day views came from non-followers — a balanced posts-and-Reels month without the prior window's viral outlier. (Split estimated from content-type mix — native breakdown not exported this cycle.)"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "✦ 97 likes, 14 shares and 5 comments this week — the strongest interaction week of the window, nearly all on the gum–heart Reel. Saves stayed thin at 2; a 'save this for your next check-up' prompt is the open lever" : "✦ 30 shares and 6 comments over 30 days against 6 saves — sharing is the audience's default signal here; bookmark-worthy framing is the next lever to grow"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Posts and Stories carried the week. Toggle to 30-day to see the doctor-led Reels (Dr. Dinoi, Jul 9; patient journey, Jul 11) that anchor the broader window.</div>
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
                  "6,973 views on 4,543 reach (649 avg/day \u00d7 7) \u2014 views up 27%",
                  "119 content interactions: Reel 86% \u00b7 Post 13% \u00b7 Story 1%",
                  "Engagement rate ~2.6% \u2014 lifted by the gum\u2013heart Reel's 10.8%",
                  "Eleven pieces published \u2014 2 Reels, 2 posts, 7 Stories",
                  "Followers +5 to 3,193",
                ] : [
                  "33,990 views on 25,950 reach (865 avg/day \u00d7 30)",
                  "302 content interactions: Reel 57% \u00b7 Post 42% \u00b7 Story 1%",
                  "35 pieces published \u2014 8 posts, 6 Reels, 21 Stories",
                  "A normalized month after the prior window's viral-carousel spike",
                  "Followers +36; story completion 83%",
                ]}
                impact={timeRange === "7d" ? "Reels returned and both discovery and engagement rose with them." : "A steadier, higher-cadence month \u2014 the account now runs on its own content, not one outlier."}
                action={timeRange === "7d" ? "Hold the two-Reel weekly cadence and keep pairing episodes with launch Reels." : "Build on the gum\u2013heart Reel's format \u2014 health-connection storytelling is the repeatable winner."}
                severity={timeRange === "7d" ? "success" : "info"} />
              <InsightCard
                title="Key Insight"
                evidence={[
                  "The gum\u2013heart Reel set the engagement benchmark: 10.8% ER, 16.6s avg watch",
                  "Engagement rate rose to ~2.6% as Reels took 86% of interactions",
                  "Podcast crossed 5,000 downloads and 50 episodes in the same week",
                  "The episode launch Reel reached 1,242 accounts \u2014 widest of the week",
                  "Booking clicks at 18 this week; 70 over 30 days, up from 62",
                ]}
                impact="Health-connection Reels are the account's proven engagement engine \u2014 and the milestone week showed cross-channel promotion compounding."
                action="Make the oral\u2013systemic Reel a monthly fixture, and pair every episode with a launch Reel."
                severity="success" />
            </div>
          </>
        )}

        {/* PODCAST */}
        {tab === "ads" && (
          <>
            <div className="kpi-row">
              {[
                { label: "Total Spend", value: "$312.05", delay: 0 },
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
                  <Donut data={[{ value: 69 }, { value: 31 }]} colors={["#715262", "#88A3AE"]} size={120} stroke={18} />
                  <div style={{ flex: 1 }}>
                    {[{ label: "Your best summer accessory", value: 69, color: "#715262" }, { label: "Make it a summer to remember", value: 31, color: "#88A3AE" }].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                        <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                        <span className="display-num">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card"><div className="card-hd">Paid Contribution · Site Sessions</div>
                <div style={{ display: "flex", gap: 14 }}>
                  <div className="stat-box" style={{ flex: 1, textAlign: "center" as const, padding: "16px", background: "rgba(113,82,98,0.08)", borderRadius: 12 }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#715262" }}>666</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>paid site sessions (30d · IG 454 + FB 212)</div>
                  </div>
                  <div className="stat-box" style={{ flex: 1, textAlign: "center" as const, padding: "16px", background: "rgba(136,163,174,0.10)", borderRadius: 12 }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#88A3AE" }}>27%</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>of 30-day site sessions from ads</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(136,163,174,0.12)", borderRadius: 10, border: "1px solid rgba(136,163,174,0.25)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>&#10022; July's buy ran as standalone ad units (landing-page objective), not boosted posts &mdash; so Instagram content views were 100% organic this window while ads drove 27% of site sessions. That's a structural shift from the prior flight, which promoted content directly. &#9888; Per-ad reach is not de-duplicated &mdash; the {adsData.reach.toLocaleString()} total overstates unique people; use impressions.</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Paid Intelligence</div>
              <InsightCard
                title="July's campaign closed with efficient reach"
                evidence={[
                  "$312.05 final spend \u2192 404 landing-page views at $0.77",
                  "39,434 impressions; quality and engagement rankings at Average",
                  "Both whitening ads finished conversion-ranked bottom 35%",
                  "Ads drove 27% of 30-day site sessions (IG 454 + FB 212)",
                  "Both ads concluded Jul 31 \u2014 expect a paid-session dip next window",
                ]}
                impact="The media buy was efficient; the landing experience is the next lever \u2014 and the baseline will reset without ads."
                action="Add a Lead/Booking event before the next flight, and route ads to a booking-first page."
                severity="info" />
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
                  "Milestone week: 5,000 all-time downloads and the 50th episode published",
                  "68 downloads since last report \u2014 double the prior week's 33 (30/90-day rollups carried; Overview export not pulled this cycle)",
                  "\u2018What 50 Years in Dentistry Teaches You\u2019 (Jul 27): 15 first-week downloads",
                  "Platform split: Spotify 1,246 \u00b7 Web 1,191 \u00b7 Apple 1,081",
                  "NYC leads the last-5-episode audience \u2014 62% North America, NYC top city",
                ]}
                impact="Both lifetime milestones landed in one week, with cross-channel promotion doubling the weekly pace."
                action="Announce the 5K/50-episode milestone to the email list \u2014 the Podcast Newsletter is the best-opening send on record."
                severity="success" />
            </div>
          </>
        )}

        {/* EMAIL */}
        {tab === "email" && (<>
          <div className="kpi-row">
            {[
              { label: "Sends", value: emailData.sends, delay: 0 },
              { label: "Open Rate", value: emailData.openRate + "%", delay: 80 },
              { label: "Click Rate", value: emailData.clickRate + "%", delay: 160 },
              { label: "Click-to-Open", value: emailData.ctor + "%", delay: 240 },
              { label: "Unsubscribes", value: emailData.unsubs, delay: 320 },
            ].map((k, i) => (
              <div key={i} className="kpi" style={{ animationDelay: `${k.delay}ms` }}>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-val">{typeof k.value === "number" ? <AnimatedNumber value={k.value} /> : <span>{k.value}</span>}</div>
              </div>
            ))}
          </div>

          <div className="card"><div className="card-hd">Campaign Performance · {emailData.period}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {emailData.campaigns.map((c, i) => (
                <div key={i} style={{ paddingBottom: 14, borderBottom: i < emailData.campaigns.length - 1 ? "1px solid rgba(113,82,98,0.10)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#3A2D33" }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: "#9B9196", flexShrink: 0 }}>{c.date} · {c.sends.toLocaleString()} sends</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
                    <div style={{ flex: 1, height: 10, background: "#D9CCC1", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                      <div style={{ width: `${c.openRate}%`, height: "100%", background: "#715262", borderRadius: 99, transition: "width 1.2s ease" }} />
                    </div>
                    <span className="display-num" style={{ width: 52, textAlign: "right" as const, fontSize: 15 }}>{c.openRate}%</span>
                  </div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap" as const }}>
                    {[{ l: "opens", v: c.opens.toLocaleString() }, { l: "open rate", v: c.openRate + "%" }, { l: "clicks", v: c.clicks }, { l: "click rate", v: c.clickRate + "%" }, { l: "mobile open", v: c.mobile + "%" }].map((m) => (
                      <div key={m.l}><span style={{ fontSize: 13, fontWeight: 700, color: "#715262" }}>{m.v}</span> <span style={{ fontSize: 11, color: "#9B9196" }}>{m.l}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cols2">
            <div className="card"><div className="card-hd">Open → Click Funnel · {emailData.period}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 4 }}>
                {[
                  { label: "Delivered", value: emailData.sends - emailData.bounces, max: emailData.sends, color: "#88A3AE" },
                  { label: "Opened", value: emailData.opens, max: emailData.sends, color: "#715262" },
                  { label: "Clicked", value: emailData.clicks, max: emailData.sends, color: "#BE5A5A" },
                ].map((m) => (
                  <div key={m.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{m.label}</span>
                      <span className="display-num">{m.value.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 10, background: "#D9CCC1", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${Math.max((m.value / m.max) * 100, 0.6)}%`, height: "100%", background: m.color, borderRadius: 99, transition: "width 1.4s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="alert-box danger-bg">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>✦ The opportunity sits at the click. A {emailData.openRate}% open rate is strong for dental — well above the ~25% industry norm — and {emailData.ctor}% of openers currently click. The audience is engaged and ready for a clearer booking ask.</span>
              </div>
            </div>

            <div className="card"><div className="card-hd">List Health</div>
              <div style={{ textAlign: "center" as const, padding: "10px 0 18px" }}>
                <div className="big-num" style={{ color: "#88A3AE" }}>{emailData.unsubRate}%</div>
                <div style={{ fontSize: 12, color: "#9B9196", marginTop: 2 }}>Unsubscribe Rate · {emailData.period}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {emailLifetime.campaignUnsubs.map((b) => (
                  <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ flex: 1, fontSize: 12.5, color: "#5C4E54" }}>{b.name}</span>
                    <span style={{ fontSize: 11, color: "#9B9196" }}>{b.sends.toLocaleString()}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: b.rate >= 1 ? "#BE5A5A" : "#BDCBCE", width: 46, textAlign: "right" as const }}>{b.rate}%</span>
                  </div>
                ))}
              </div>
              <div className="alert-box danger-bg">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>✦ Unsubscribes are running at 0.2–0.5% per send — comfortably under the ~0.5% healthy ceiling and steady across four campaigns. The audience that opens keeps choosing to stay, which is the clearest sign the content mix is right.</span>
              </div>
            </div>
          </div>

          <div className="cols2">
            <div className="card"><div className="card-hd">Best Open Rates · All Campaigns</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 2 }}>
                {emailLifetime.bestOpens.map((b) => (
                  <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ flex: 1, fontSize: 13, color: "#5C4E54" }}>{b.name}</span>
                    <div style={{ width: 90, height: 8, background: "#D9CCC1", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ width: `${b.rate}%`, height: "100%", background: "#715262", borderRadius: 99 }} />
                    </div>
                    <span className="display-num" style={{ width: 48, textAlign: "right" as const }}>{b.rate}%</span>
                  </div>
                ))}
              </div>
              <div className="alert-box plum-bg">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ The best-performing email DDS-PC has sent remains the Podcast Newsletter, which opened at 63.1% — ahead of the Whitening Offer (55.3%) and the Gum Article (54.1%). The new Summer Promo Extensions send opened at 47.9% but drew 46 clicks — the best click count of the three July-window sends — and its mobile open share jumped to 47.7% vs ~31% on every prior campaign.</span>
              </div>
            </div>

            <div className="card"><div className="card-hd">Lifetime Benchmark · 3 DDS-PC Campaigns</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { l: "Total Sends", v: emailLifetime.sends.toLocaleString(), c: "#88A3AE" },
                  { l: "Total Opens", v: emailLifetime.opens.toLocaleString(), c: "#715262" },
                  { l: "Avg Open Rate", v: emailLifetime.openRate + "%", c: "#715262" },
                  { l: "Avg Click Rate", v: emailLifetime.clickRate + "%", c: "#BE5A5A" },
                  { l: "Click-to-Open", v: emailLifetime.ctor + "%", c: "#BE5A5A" },
                  { l: "Unsubscribes", v: emailLifetime.unsubs, c: "#BDCBCE" },
                ].map((m) => (
                  <div key={m.l} style={{ textAlign: "center" as const, padding: "13px 8px", background: "#F3EDEA", borderRadius: 10 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: m.c, fontFamily: "'Marcellus', serif" }}>{m.v}</div>
                    <div className="stat-label">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="alert-box plum-bg">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ Open rates are strong across the board — the four DDS-PC campaigns average {emailLifetime.openRate}% on {emailLifetime.sends.toLocaleString()} sends. The newest signal worth acting on: the Summer Promo Extensions send opened 47.7% on mobile vs ~31% on every prior campaign — the list is shifting to phones, so mobile-first subject lines and single-column layouts will protect those opens.</span>
              </div>
            </div>
          </div>

          <div className="card"><div className="card-hd">Email Intelligence</div>
            <InsightCard
              title="Email opens are excellent, with clicks the next step"
              evidence={[
                `${emailData.openRate}% open rate over ${emailData.campaignCount} campaign${emailData.campaignCount > 1 ? "s" : ""} — well above the ~25% dental norm`,
                `Only ${emailData.clicks} clicks from ${emailData.opens.toLocaleString()} opens (${emailData.ctor}% click-to-open)`,
                "Lifetime click rate 1.81% across 4 campaigns",
                "Best-ever open remains the DDS-PC Podcast Newsletter at 63.1%",
              ]}
              impact="The list reads the email. It just never gets asked to book."
              action="Put one booking CTA above the fold in every send."
              severity="info" />
            <InsightCard
              title="The list is moving to mobile"
              evidence={[
                "Summer Promo Extensions opened 47.7% on mobile — vs ~31% on every prior send",
                "It also drew 46 clicks, the best click count of the three July-window sends",
                "3.16% click-to-open on the new send, up from 1.79% the prior week",
                "Unsubscribes held at 0.3% — no fatigue signal from the higher cadence",
              ]}
              impact="Mobile is becoming the primary read environment — design and subject lines should assume a phone screen first."
              action="Keep subject lines under ~40 characters and use single-column, thumb-friendly layouts with one booking CTA."
              severity="info" />
          </div>
        </>)}

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
              <InsightCard title="Gender Balance" body="At 52% male / 48% female, the audience is nearly balanced. The 35–44 cohort is the largest single segment. The credential and case-study content resonates with a clinically-engaged, decision-stage audience — pair it with clear consult/booking CTAs to convert that trust into appointments. (Demographics carried from the prior Metricool export — the gender/age breakdown was not refreshed this cycle.)" severity="info" />
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
          </>
        )}

        <div className="footer"><span>Edgard El Chaar, DDS, PC · Powered by Figment Creative</span></div>
      </div>
    </div>
  );
}
