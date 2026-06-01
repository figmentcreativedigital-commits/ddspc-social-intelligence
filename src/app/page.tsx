"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "May 25 – June 1, 2026" },
  kpi: {
    followers: { value: 3135, change: 0, label: "Followers" },
    reach: { value: 550, label: "Reach" },
    views: { value: 2204, label: "Total Views" },
    engagementRate: { value: 6.7, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 37, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Complex Cases Require Expert Care", type: "Carousel", views: 244, reach: 105, likes: 4, comments: 1, saves: 1, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/p/DY9yNAWgEuT/" },
    { id: 2, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", views: 780, reach: 303, likes: 13, comments: 0, saves: 0, shares: 0, isTop: true, igPostUrl: "https://www.instagram.com/p/DY5XLhUGYzB/" },
  ] as any[],
  contentMix: { posts: 71, reels: 13, stories: 16 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 2 }, { range: "25-34", pct: 22 }, { range: "35-44", pct: 37 },
      { range: "45-54", pct: 21 }, { range: "55-64", pct: 13 }, { range: "65+", pct: 6 },
    ],
  },
  viewerSplit: { followers: 72, nonFollowers: 28 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Period-specific reach collapse alert
  if (data.kpi.reach.value < 800) {
    alerts.push({
      title: "Reach Holding Low — Down 11% WoW",
      body: `Reach was ${data.kpi.reach.value} accounts, down 11% from 617 the prior week — a far smaller decline than the 59% collapse the week before, which suggests reach is stabilizing at a reduced floor rather than continuing to fall. Still no new Reels published this window; carousels are sustaining a baseline, but new Reel publishing remains the lever to push reach back toward the 1,000+ range.`,
      severity: "warning"
    });
  }

  const er = data.kpi.engagementRate.value;
  if (er < 5) {
    insights.push({ title: "Engagement Below Benchmark", body: `At ${er}%, engagement rate sits below the 5%+ benchmark for healthcare accounts under 10K followers. With ${data.kpi.reach.value.toLocaleString()} reach, discovery is working — content hooks need strengthening to convert viewers into engagers.`, severity: "warning" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Content Format Distribution",
    body: `${sortedMix[0].name} lead at ${sortedMix[0].val}% of views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%). When no new Reels publish in a window, carryover views from older Reels still register, but new Reel publishing remains the strongest driver of fresh discovery and reach.`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves === 0) {
    alerts.push({ title: "Zero Saves Across All Posts", body: "No saves this week. Saves are the #1 algorithmic signal that content has lasting value. Save-worthy formats (lists, comparisons, before/after) are the single biggest lever to improve.", severity: "danger" });
  } else if (totalSaves < 3) {
    alerts.push({ title: "Low Save Volume", body: `Only ${totalSaves} save${totalSaves === 1 ? "" : "s"} this week. Saves are the #1 algorithmic signal of content value. Bookmark-worthy carousels (5 Signs, Myths, Step-by-Step guides) are the lever to pull.`, severity: "warning" });
  }

  // Reel publishing gap insight (when reels < 30%)
  if (data.contentMix.reels < 30) {
    insights.push({
      title: "Reel Publishing Gap",
      body: `Reels account for only ${data.contentMix.reels}% of views this window — mostly carryover from older Reel content. Posts (${data.contentMix.posts}%) lead by default in the absence of new video. Scheduling 2–3 new Reels per week is the single biggest lever for reach growth, since Reels carry algorithmic distribution advantages carousels and stories cannot match.`,
      severity: "warning"
    });
  } else {
    insights.push({ title: "Watch Time & Retention", body: "Reels are the primary discovery format. Average view duration matters most in the first 3 seconds — opening hooks (provocative questions, surprising stats) drive completion and save behavior.", severity: "warning" });
  }

  // Viewer split — flipped to follower-dominant means compressed discovery
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "Strong Discovery Signal", body: `${data.viewerSplit.nonFollowers}% of viewers are non-followers — the algorithm is distributing your content to new audiences. Optimize CTAs to convert these discoverers into followers and patients.`, severity: "success" });
  } else {
    insights.push({
      title: "Discovery Compression",
      body: `Views skew ${data.viewerSplit.followers}% toward existing followers (was 62% prior period — the skew deepened further). The algorithm distributed even less to non-followers this week, consistent with another window of no new Reels. Reel publishing is the most effective reset; carousels and stories tend to circulate primarily within the existing follower graph.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "predominantly male" : "predominantly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for elective and cosmetic dental procedures.`, severity: "success" });

  if (data.kpi.followers.change && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week (3 follows / 3 unfollows) from ${data.kpi.reach.value} reach.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Publish 2–3 Reels this coming week to restore algorithmic reach — the single biggest lever right now", priority: "high" },
    { text: "Open every Reel with a provocative question or surprising dental stat in the first 2 seconds (May 13 Andrés Reel hit 52% skip rate using this formula — best of any Reel this month)", priority: "high" },
    { text: "Create save-worthy carousels: '5 Signs You Need Implants', 'Periodontal Myths Debunked' (current carousel ER averaging 4–6% but only 1 save in 7d)", priority: "high" },
    { text: "Add CTAs in every caption: 'Save this for your next visit' / 'Share with someone who needs this'", priority: "medium" },
    { text: "Post Reels between 7–9 AM and 6–8 PM when the 35–44 demographic is most active", priority: "medium" },
    { text: "Introduce patient testimonial content to build trust and drive appointment conversions", priority: "low" },
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
    period: "May 25 – June 1, 2026", totalClicks: 141,
    topLinks: [{ path: "Homepage", clicks: 32 }, { path: "DDS-PC UES", clicks: 8 }, { path: "DDS-PC Midtown", clicks: 8 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 102 }, { source: "Tagged (UTM)", clicks: 39 }],
    topCountries: [{ country: "United States", clicks: 22 }, { country: "Canada", clicks: 1 }, { country: "Vietnam", clicks: 1 }, { country: "Other", clicks: 2 }],
    topCities: [{ city: "Brooklyn", clicks: 3 }, { city: "Charlotte", clicks: 1 }, { city: "Buffalo", clicks: 1 }, { city: "North Bergen", clicks: 1 }],
    devices: [{ os: "Windows", clicks: 105 }, { os: "iOS", clicks: 21 }, { os: "Mac OS X", clicks: 10 }, { os: "Android", clicks: 4 }],
  };
  const linkData30d = {
    period: "May 2 – June 1, 2026", totalClicks: 860,
    topLinks: [{ path: "Homepage", clicks: 85 }, { path: "DDS-PC UES", clicks: 20 }, { path: "DDS-PC Midtown", clicks: 17 }, { path: "YouTube", clicks: 2 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 581 }, { source: "Tagged (UTM)", clicks: 279 }],
    topCountries: [{ country: "United States", clicks: 238 }, { country: "Canada", clicks: 7 }, { country: "Russia", clicks: 6 }, { country: "Spain", clicks: 4 }, { country: "Belgium", clicks: 4 }],
    topCities: [{ city: "Dallas", clicks: 10 }, { city: "New York City", clicks: 9 }, { city: "Toronto", clicks: 7 }, { city: "Brooklyn", clicks: 6 }, { city: "Fort Lee", clicks: 5 }, { city: "Columbus", clicks: 3 }],
    devices: [{ os: "Windows", clicks: 452 }, { os: "Mac OS X", clicks: 324 }, { os: "iOS", clicks: 43 }, { os: "Android", clicks: 29 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "May 25 – May 31, 2026",
    sessions: 174,
    topPages: [
      { page: "/", label: "Home", views: 103 },
      { page: "/about", label: "About", views: 10 },
      { page: "/endodontists-and-periodontics-midtown", label: "Endodontists & Perio (Midtown)", views: 10 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 9 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 7 },
      { page: "/locations", label: "Locations", views: 7 },
      { page: "/pain-after-gum-graft", label: "Pain After Gum Graft", views: 7 },
      { page: "/covid-19-precautions", label: "COVID-19 Precautions", views: 6 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 122, pct: 72.2 },
      { source: "Google", sessions: 38, pct: 22.5 },
      { source: "Other", sessions: 8, pct: 4.7 },
      { source: "DuckDuckGo", sessions: 2, pct: 1.2 },
      { source: "Referral", sessions: 2, pct: 1.2 },
      { source: "Yahoo", sessions: 1, pct: 0.6 },
    ],
    devices: [
      { device: "Desktop", pct: 83.2 },
      { device: "Mobile", pct: 16.8 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "May 25", visitors: 2 },{ date: "May 26", visitors: 1 },
      { date: "May 27", visitors: 1 },{ date: "May 28", visitors: 38 },
      { date: "May 29", visitors: 57 },{ date: "May 30", visitors: 30 },
      { date: "May 31", visitors: 26 },
    ],
    search: {
      totalClicks: 643, totalImpressions: 51748, avgCTR: 1.24, avgPosition: 20.72,
      note: "28-day (May 3 – May 30)",
      topQueries: [
        { query: "i blew my nose after a sinus lift", clicks: 21, ctr: 13.38, position: 2.18 },
        { query: "edgard el chaar", clicks: 15, ctr: 15.46, position: 1.16 },
        { query: "dr el chaar", clicks: 14, ctr: 13.86, position: 5.61 },
        { query: "el chaar", clicks: 13, ctr: 22.41, position: 1.93 },
        { query: "edgar el chaar", clicks: 12, ctr: 24.49, position: 1.24 },
      ],
      topPages: [
        { page: "Dry Socket with Bone Graft", clicks: 150, impressions: 4701, ctr: 3.19 },
        { page: "Homepage", clicks: 138, impressions: 1894, ctr: 7.29 },
        { page: "Signs of Failed Gum Graft", clicks: 91, impressions: 7647, ctr: 1.19 },
        { page: "Accidentally Blew Nose", clicks: 89, impressions: 11559, ctr: 0.77 },
        { page: "Doctors & Periodontists (UES)", clicks: 44, impressions: 1278, ctr: 3.44 },
      ],
    },
  };
  const websiteData30d = {
    period: "May 2 – May 31, 2026",
    sessions: 1573,
    topPages: [
      { page: "/", label: "Home", views: 797 },
      { page: "/signs-of-failed-gum-graft", label: "Signs of Failed Gum Graft", views: 281 },
      { page: "/dry-socket-with-bone-graft", label: "Dry Socket with Bone Graft", views: 169 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 95 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 89 },
      { page: "/dental-office-upper-east-side", label: "Dental Office UES", views: 63 },
      { page: "/how-painful-is-a-sinus-lift", label: "Sinus Lift Pain", views: 54 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 45 },
    ],
    trafficSources: [
      { source: "Google", sessions: 848, pct: 53.9 },
      { source: "Direct", sessions: 602, pct: 38.3 },
      { source: "Bing", sessions: 29, pct: 1.8 },
      { source: "Yahoo", sessions: 28, pct: 1.8 },
      { source: "DuckDuckGo", sessions: 13, pct: 0.8 },
      { source: "Other", sessions: 53, pct: 3.4 },
    ],
    devices: [
      { device: "Desktop", pct: 58.7 },
      { device: "Mobile", pct: 40.5 },
      { device: "Tablet", pct: 0.8 },
    ],
    dailyVisitors: [
      { date: "May 2", visitors: 59 },{ date: "May 8", visitors: 55 },
      { date: "May 12", visitors: 67 },{ date: "May 16", visitors: 35 },
      { date: "May 20", visitors: 80 },{ date: "May 24", visitors: 2 },
      { date: "May 28", visitors: 40 },{ date: "May 31", visitors: 26 },
    ],
    search: {
      totalClicks: 643, totalImpressions: 51748, avgCTR: 1.24, avgPosition: 20.72,
      note: "28-day (May 3 – May 30)",
      topQueries: [
        { query: "i blew my nose after a sinus lift", clicks: 21, ctr: 13.38, position: 2.18 },
        { query: "edgard el chaar", clicks: 15, ctr: 15.46, position: 1.16 },
        { query: "dr el chaar", clicks: 14, ctr: 13.86, position: 5.61 },
        { query: "el chaar", clicks: 13, ctr: 22.41, position: 1.93 },
        { query: "edgar el chaar", clicks: 12, ctr: 24.49, position: 1.24 },
      ],
      topPages: [
        { page: "Dry Socket with Bone Graft", clicks: 150, impressions: 4701, ctr: 3.19 },
        { page: "Homepage", clicks: 138, impressions: 1894, ctr: 7.29 },
        { page: "Signs of Failed Gum Graft", clicks: 91, impressions: 7647, ctr: 1.19 },
        { page: "Accidentally Blew Nose", clicks: 89, impressions: 11559, ctr: 0.77 },
        { page: "Doctors & Periodontists (UES)", clicks: 44, impressions: 1278, ctr: 3.44 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of June 1, 2026)",
    totalEpisodes: 48, totalDownloads: 4719, periodDownloads: 18,
    last7Days: 18, last30Days: 111, last90Days: 486,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 301 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 184 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Web Browser", downloads: 88, pct: 46 },
      { name: "Apple Podcasts", downloads: 56, pct: 29 },
      { name: "Spotify", downloads: 20, pct: 10 },
      { name: "Unknown", downloads: 10, pct: 5 },
      { name: "iVoox", downloads: 5, pct: 2 },
    ],
    topCountries: [
      { country: "United States", downloads: 113 },
      { country: "Germany", downloads: 19 },
      { country: "Sweden", downloads: 9 },
      { country: "Canada", downloads: 8 },
      { country: "Vietnam", downloads: 7 },
    ],
    topCities: [
      { city: "New York", downloads: 28 },
      { city: "Ashburn", downloads: 16 },
      { city: "Frankfurt", downloads: 12 },
      { city: "Stockholm", downloads: 8 },
      { city: "Brooklyn", downloads: 8 },
    ],
  };

  const socialData7d = {
    period: "May 25 – June 1, 2026",
    followers: 3135, followerGrowth: 0, follows: 3, unfollows: 3,
    totalViews: 2204, totalReach: 550, reachChange: -10.9, totalInteractions: 37,
    viewSplit: { followers: 72.3, nonFollowers: 27.7 },
    interactionSplit: { followers: 77.1, nonFollowers: 22.9 },
    viewsByType: { reels: 13.0, posts: 71.2, stories: 15.7 },
    interactionsByType: { reels: 16.7, posts: 52.1, stories: 31.3 },
    totalLikes: 17, totalComments: 1, totalSaves: 1, totalShares: 1,
    storyViews: 346, storyCompletion: 84, storyCount: 4,
    dailyViews: [
      { date: "May 25", views: 180 },{ date: "May 26", views: 160 },
      { date: "May 27", views: 200 },{ date: "May 28", views: 480 },
      { date: "May 29", views: 320 },{ date: "May 30", views: 430 },
      { date: "May 31", views: 434 },
    ],
    posts: [
      { id: 1, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", date: "May 28", views: 780, reach: 303, likes: 13, comments: 0, saves: 0, shares: 0, er: 4.3, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY5XLhUGYzB/", isTop: true },
      { id: 2, title: "Complex Cases Require Expert Care", type: "Carousel", date: "May 30", views: 244, reach: 105, likes: 4, comments: 1, saves: 1, shares: 1, er: 6.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY9yNAWgEuT/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "May 1 – June 1, 2026",
    followers: 3135, followerGrowth: 0, follows: 8, unfollows: 8,
    totalViews: 7672, totalReach: 3939, reachChange: 0, totalInteractions: 213,
    viewSplit: { followers: 50, nonFollowers: 50 },
    interactionSplit: { followers: 55, nonFollowers: 45 },
    viewsByType: { reels: 54, posts: 36, stories: 10 },
    interactionsByType: { reels: 70, posts: 22, stories: 8 },
    totalLikes: 203, totalComments: 5, totalSaves: 5, totalShares: 15,
    storyViews: 1500, storyCompletion: 84, storyCount: 18,
    dailyViews: [
      { date: "May 1", views: 538 },{ date: "May 6", views: 1181 },
      { date: "May 8", views: 581 },{ date: "May 13", views: 1790 },
      { date: "May 16", views: 452 },{ date: "May 20", views: 652 },
      { date: "May 28", views: 780 },
    ],
    posts: [
      { id: 1, title: "Andrés Campana – Made with Identity", type: "Reel", date: "May 13", views: 1790, reach: 1018, likes: 95, comments: 1, saves: 3, shares: 5, er: 10.0, skipRate: 52, avgWatch: "14s", igUrl: "https://www.instagram.com/reel/DYSOcwGhzJn/", isTop: true },
      { id: 2, title: "NEW EP – Can't Rush Greatness (Kingston)", type: "Reel", date: "May 6", views: 1181, reach: 816, likes: 31, comments: 0, saves: 0, shares: 4, er: 4.3, skipRate: 61, avgWatch: "13s", igUrl: "https://www.instagram.com/reel/DYANRYZgIcX/", isTop: false },
      { id: 3, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", date: "May 28", views: 780, reach: 303, likes: 13, comments: 0, saves: 0, shares: 0, er: 4.3, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY5XLhUGYzB/", isTop: false },
      { id: 4, title: "Dental Implant Timeline", type: "Carousel", date: "May 20", views: 652, reach: 257, likes: 10, comments: 0, saves: 0, shares: 1, er: 4.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DYkP-F3GeWK/", isTop: false },
      { id: 5, title: "Wine Is Time", type: "Reel", date: "May 8", views: 581, reach: 320, likes: 17, comments: 1, saves: 0, shares: 1, er: 5.9, skipRate: 61, avgWatch: "9s", igUrl: "https://www.instagram.com/reel/DYFrHCTBs43/", isTop: false },
      { id: 6, title: "Are Dental Implants Right for You?", type: "Carousel", date: "May 1", views: 538, reach: 167, likes: 7, comments: 0, saves: 0, shares: 1, er: 4.8, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DXzHIklmVzi/", isTop: false },
      { id: 7, title: "Andrés Campana – Unforgettable", type: "Reel", date: "May 16", views: 452, reach: 309, likes: 7, comments: 0, saves: 0, shares: 1, er: 2.6, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/reel/DYZ85IxBmlp/", isTop: false },
      { id: 8, title: "Wine Stains", type: "Carousel", date: "May 14", views: 404, reach: 148, likes: 3, comments: 0, saves: 0, shares: 0, er: 2.0, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DYVHzVhGWTi/", isTop: false },
    ],
  };
  const socialData = timeRange === "7d" ? socialData7d : socialData30d;

  const tabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "social", label: "Social", icon: "◍" },
    { id: "links", label: "Links", icon: "⊞" },
    { id: "website", label: "Website", icon: "◈" },
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

  function InsightCard({ title, body, severity }: { title: string; body: string; severity: string }) {
    const s = severityStyle[severity] || severityStyle.info;
    return (
      <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, padding: "18px 22px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: s.dot, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 13, color: "#715262", letterSpacing: "0.01em" }}>{title}</span>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#5C4A53" }}>{body}</div>
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
              <div className="exec-cols">
                <div>
                  <div className="exec-col-title">Discovery</div>
                  <div className="exec-col-body">Reach was {d.kpi.reach.value} accounts — down 11% week-over-week, a far gentler decline than the prior 59% collapse, which signals reach is stabilizing at a reduced floor rather than continuing to fall. Viewer composition skewed further to {d.viewerSplit.followers}% follower-driven (was 62%). A second straight window with no new Reels keeps distribution to non-followers compressed.</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% ER with {d.kpi.engagements.value} interactions (down from 163). Top post: Dental Implant Timeline (593 views, 9 likes, 1 save, 1 share). Saves and shares both at 1 each across the 2 carousels. Follower growth +{d.kpi.followers.change} net (6 follows, 3 unfollows) — conversion rate held up given the reach compression.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Posts (carousels) lead views at {d.contentMix.posts}% — but only because no new Reels published. Reels still drive {d.contentMix.reels}% via carryover. {socialData.storyCount} Stories with {socialData.storyCompletion}% completion. The cadence gap is the actionable insight: restoring 2–3 Reels per week is the lever to reverse the reach decline.</div>
                </div>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>▲ Composition flipped to follower-driven — discovery to new audiences compressed</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "5 attributed human clicks over 7 days across named destinations. Homepage drew 4, DDS-PC UES 1. Booking links remain heavily underutilized given the volume of upstream traffic — the gap between content reach and click-through is the conversion lever to focus on." : "95 attributed human clicks across named destinations over 30 days. Homepage 71, DDS-PC UES 12, DDS-PC Midtown 10, YouTube 2. Booking links remain underutilized given total upstream volume. US 224 clicks; Dallas leads cities at 10. Catch-all/untagged traffic excluded from this view to keep the picture focused on named, actionable destinations."} severity="info" />
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
                { label: "Top Source", value: timeRange === "7d" ? "Google (56.1%)" : "Google (59.6%)", delay: 160 },
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>✦ Nearly even desktop/mobile split — optimize both experiences</span>
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "174 sessions May 25–31. Direct 72.2% (122), Google 22.5% (38) — an unusually direct- and desktop-heavy week (Desktop 83.2%, Mobile 16.8%). Home 103, About 10, Endodontists/Perio (Midtown) 10. Search (28d window): 643 clicks from 51.7K impressions, 1.24% CTR, avg position 20.7. Mobile ranks ~2× better than desktop in search (13.5 vs 26.5 position) — mobile-first indexing favors this site." : "1,573 sessions over 30 days. Google 53.9% (848), Direct 38.3% (602). Desktop 58.7%, Mobile 40.5%. Top page is Home (797), then Signs of Failed Gum Graft (281) and Dry Socket (169). Dry Socket page is the SEO leader — 150 clicks at 3.19% CTR, position 4.34. Brand queries (Edgard / Dr el chaar variations) cluster at 13–25% CTR. Position drifted from ~14 early-May to ~30 late-month before a partial recovery."} severity="info" />
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
              <div style={{ marginTop: 8, padding: "10px 14px", background: "rgba(190,90,90,0.10)", borderRadius: 10, border: "1px solid rgba(190,90,90,0.25)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▼ Daily views averaged ~315 across 7d, with May 28 (Cinzia Dinoi carousel) and May 30 (Specialized Care) the post-publish days. A second straight week with no new Reels — discovery surface limited to carousels." : "⚡ May 13 Andrés Reel (1,790 views, 10% ER, 52% skip) and May 6 Kingston Reel (1,181) anchor the 30-day window. Reels drive the month's reach; the carousel-only weeks since compress it. Best posting: 9 AM – 2 PM EST."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "▲ Posts driving 47% of interactions this week — but only because no new Reels published. Reel carryover still pulls 38%." : "✦ Reels drive 78% of interactions over 30 days — the dominant engagement format when published"}</span>
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
                    <div style={{ marginTop: 10, padding: "10px 14px", background: timeRange === "7d" ? "rgba(190,90,90,0.10)" : "rgba(136,163,174,0.12)", borderRadius: 10, border: timeRange === "7d" ? "1px solid rgba(190,90,90,0.25)" : "1px solid rgba(136,163,174,0.25)" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: timeRange === "7d" ? "#BE5A5A" : "#6E8B97" }}>{timeRange === "7d" ? "▼ Only 38% of views from non-followers (was 68% prior week) — algorithm distribution to new audiences compressed" : "✦ 62% of views from non-followers over 30 days — strong long-term algorithmic distribution"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Only 1 save and 1 share across both carousels — algorithmic value signal at floor" : "▲ 12 saves on 8 posts averages 1.5 per post — bookmark-worthy content remains the biggest engagement lever"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Zero new Reels in the May 25 – June 1 window (both posts were carousels) — a second straight Reel-less week and the main reason reach stayed compressed. Toggle to 30-day view to see Reel performance over the broader window.</div>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "2,204 views reaching 550 accounts (-11% WoW — far milder than the prior -59%). 72% follower-driven views (was 62% — the skew deepened). 37 total interactions (down from 59). 2 carousels published: Meet Dr. Cinzia Dinoi (top, 780 views, 4.3% ER) and Complex Cases / Specialized Care (244 views, 6.7% ER). Zero new Reels for a second week. ~4 Stories, ~84% avg completion. Net follower growth 0 (3 follows, 3 unfollows)." : "7,672 views across 12 posts (post-level). Top performer: May 13 Andrés Campana 'Made with Identity' Reel — 1,790 views, 10% ER, 99 engagements, 52% skip rate (best of any Reel this month). May 6 Kingston Reel hit 1,181. Reels accounted for ~56% of post views despite being fewer than half the posts — the discovery engine when they publish."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "The cadence gap continues. A second straight week with no new Reels kept reach at 550 and views 72% follower-driven. Carousels sustain a baseline but cannot replicate Reel reach. Restoring 2–3 Reels per week is the single biggest lever. The May 13 Andrés Reel (52% skip, 10% ER) remains the formula: identity-driven storytelling with a tight first 2 seconds." : "The 30-day arc confirms the pattern — when Reels publish (May 6 and 13) they break 1,100–1,800 views and 4–10% ER; the carousel-only weeks that followed show reach compressing. The May 13 Andrés Reel set the bar at 10% ER and 52% skip. Cadence is the lever: consistent Reels reverse the decline."} severity="success" />
            </div>
          </>
        )}

        {/* PODCAST */}
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
              <InsightCard title="Podcast Intelligence" body="4,719 all-time downloads across 48 episodes — 281 to the 5K milestone, 2 episodes to the 50-ep badge. 18 downloads last 7 days, 111 last 30, 486 last 90. Latest episode 'Why Authenticity Matters in Dentistry' (May 30, feat. Dr. Laura Koo Min Chee): 11 downloads in its first 2 days. Web Browser leads listening apps at 46% — unusual for podcasts, suggesting site/embed plays outpace dedicated apps. Apple Podcasts 29%, Spotify 10%. Apple ecosystem dominates devices: iPhone 49% + Mac 23% = 72%. Mobile 53% of all listens. NYC metro leads cities (New York 28, Brooklyn 8)." severity="success" />
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
              <InsightCard title="High-Value Patient Alignment" body="57% of the audience falls in the 35–54 age range — the prime demographic for implants, cosmetic dentistry, and comprehensive periodontal treatment. This represents the highest lifetime patient value segment." severity="success" />
              <InsightCard title="Gender Balance Opportunity" body="At 53% male, the audience skews slightly toward men. Dental practices typically see 60%+ female patients. Test content around cosmetic dentistry, Invisalign, and wellness-focused oral health to balance the demographic." severity="info" />
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
              {engine.recommendations.map((r, i) => (
                <div key={i} className="rec">
                  <span className={`rec-badge ${r.priority}`}>{r.priority}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.6 }}>{r.text}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="footer"><span>Edgard El Chaar, DDS, PC · Powered by Figment Creative</span></div>
      </div>
    </div>
  );
}
