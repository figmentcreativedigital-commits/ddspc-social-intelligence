"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "June 1 – June 8, 2026" },
  kpi: {
    followers: { value: 3141, change: 5, label: "Followers" },
    reach: { value: 1698, label: "Reach" },
    views: { value: 5012, label: "Total Views" },
    engagementRate: { value: 12.5, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 212, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", views: 2137, reach: 1211, likes: 83, comments: 25, saves: 3, shares: 11, isTop: true, igPostUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/" },
    { id: 2, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", views: 498, reach: 362, likes: 11, comments: 0, saves: 0, shares: 2, isTop: false, igPostUrl: "https://www.instagram.com/reel/DZOF7qTBswB/" },
  ] as any[],
  contentMix: { posts: 19, reels: 62, stories: 19 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 2 }, { range: "25-34", pct: 22 }, { range: "35-44", pct: 37 },
      { range: "45-54", pct: 21 }, { range: "55-64", pct: 13 }, { range: "65+", pct: 6 },
    ],
  },
  viewerSplit: { followers: 47, nonFollowers: 53 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Period-specific reach recovery insight
  if (data.kpi.reach.value < 800) {
    alerts.push({
      title: "Reach Below Baseline",
      body: `Reach was ${data.kpi.reach.value} accounts this window. New Reel publishing is the most reliable lever to lift reach back above the 1,000+ range.`,
      severity: "warning"
    });
  } else {
    opportunities.push({
      title: "Reach Rebounded +208.7% — Strongest Week in Months",
      body: `Reach climbed to ${data.kpi.reach.value.toLocaleString()} accounts, up 208.7% week-over-week. The driver was unambiguous: two new collaboration Reels with NYC Dental Smiles — the Jun 4 "Authenticity in Dentistry" episode promo reached 1,211 accounts on its own. This is exactly the Reel-publishing lever prior weeks flagged as missing, now validated in the data.`,
      severity: "success"
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
    body: `${sortedMix[0].name} lead at ${sortedMix[0].val}% of views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%). After several quiet weeks, new Reels returned this window and immediately drove the majority of views — confirming Reels as the account's primary discovery engine.`,
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
      body: `Views skew ${data.viewerSplit.followers}% toward existing followers this window, leaving discovery to new audiences compressed. Publishing Reels — especially collaboration Reels — is the most effective reset; carousels and stories tend to circulate primarily within the existing follower graph.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "predominantly male" : "predominantly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for elective and cosmetic dental procedures.`, severity: "success" });

  if (data.kpi.followers.change && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week (7 follows / 2 unfollows) from ${data.kpi.reach.value.toLocaleString()} reach.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Sustain the 2–3 Reels/week cadence that just drove the +208.7% reach rebound — consistency is what compounds, not one-off spikes", priority: "high" },
    { text: "Lean into the NYC Dental Smiles collaboration-Reel format — the Jun 4 co-posted episode promo was the single highest-reach piece of the period (1,211 accounts)", priority: "high" },
    { text: "Tighten Reel openings: skip rates ran 62–72% on the new Reels. A sharper first-2-second hook converts the reach into watch time", priority: "high" },
    { text: "Create save-worthy carousels ('5 Signs You Need Implants', 'Periodontal Myths Debunked') — saves stayed thin at 3 in 7d despite the reach surge", priority: "medium" },
    { text: "Add CTAs in every caption: 'Save this for your next visit' / 'Share with someone who needs this'", priority: "medium" },
    { text: "Convert the discovery momentum: 53% of views were non-followers this week — strong follow CTAs turn that reach into audience growth", priority: "low" },
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
    period: "June 1 – June 9, 2026", totalClicks: 60,
    topLinks: [{ path: "Homepage", clicks: 48 }, { path: "DDS-PC UES", clicks: 4 }, { path: "DDS-PC Midtown", clicks: 4 }, { path: "YouTube", clicks: 4 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 429 }, { source: "Tagged (UTM)", clicks: 53 }],
    topCountries: [{ country: "United States", clicks: 29 }, { country: "South Korea", clicks: 3 }, { country: "Vietnam", clicks: 2 }, { country: "Brazil", clicks: 1 }],
    topCities: [{ city: "Brooklyn", clicks: 5 }, { city: "Ho Chi Minh City", clicks: 2 }, { city: "Amsterdam", clicks: 1 }, { city: "São Paulo", clicks: 1 }],
    devices: [{ os: "Mac OS X", clicks: 289 }, { os: "iOS", clicks: 33 }, { os: "Windows", clicks: 19 }, { os: "Android", clicks: 2 }],
  };
  const linkData30d = {
    period: "May 9 – June 9, 2026", totalClicks: 159,
    topLinks: [{ path: "Homepage", clicks: 112 }, { path: "DDS-PC UES", clicks: 21 }, { path: "DDS-PC Midtown", clicks: 20 }, { path: "YouTube", clicks: 6 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 1441 }, { source: "Tagged (UTM)", clicks: 312 }],
    topCountries: [{ country: "United States", clicks: 251 }, { country: "Canada", clicks: 6 }, { country: "Belgium", clicks: 4 }, { country: "Spain", clicks: 4 }, { country: "Vietnam", clicks: 3 }],
    topCities: [{ city: "Brooklyn", clicks: 10 }, { city: "New York City", clicks: 7 }, { city: "Toronto", clicks: 6 }, { city: "Fort Lee", clicks: 5 }, { city: "Brussels", clicks: 4 }],
    devices: [{ os: "Mac OS X", clicks: 485 }, { os: "Windows", clicks: 432 }, { os: "iOS", clicks: 66 }, { os: "Android", clicks: 19 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "June 1 – June 7, 2026",
    sessions: 339,
    topPages: [
      { page: "/", label: "Home", views: 293 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 23 },
      { page: "/our-doctors", label: "Our Doctors", views: 21 },
      { page: "/periodontist-nyc-dr-edgard", label: "Periodontist NYC (Dr. Edgard)", views: 15 },
      { page: "/about", label: "About", views: 8 },
      { page: "/how-painful-is-a-sinus-lift", label: "How Painful Is a Sinus Lift", views: 8 },
      { page: "/signs-of-failed-gum-graft", label: "Signs of Failed Gum Graft", views: 8 },
      { page: "/sinus-lift-recovery-experience", label: "Sinus Lift Recovery", views: 6 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 210, pct: 61.9 },
      { source: "Google", sessions: 107, pct: 31.6 },
      { source: "Instagram", sessions: 8, pct: 2.4 },
      { source: "Facebook", sessions: 5, pct: 1.5 },
      { source: "DuckDuckGo", sessions: 4, pct: 1.2 },
      { source: "Other", sessions: 5, pct: 1.5 },
    ],
    devices: [
      { device: "Desktop", pct: 76.7 },
      { device: "Mobile", pct: 22.7 },
      { device: "Tablet", pct: 0.6 },
    ],
    dailyVisitors: [
      { date: "Jun 1", visitors: 44 },{ date: "Jun 2", visitors: 63 },
      { date: "Jun 3", visitors: 48 },{ date: "Jun 4", visitors: 34 },
      { date: "Jun 5", visitors: 38 },{ date: "Jun 6", visitors: 42 },
      { date: "Jun 7", visitors: 22 },
    ],
    search: {
      totalClicks: 516, totalImpressions: 39722, avgCTR: 1.30, avgPosition: 22.8,
      note: "28-day (May 10 – Jun 6)",
      topQueries: [
        { query: "i blew my nose after a sinus lift", clicks: 19, ctr: 13.97, position: 2.22 },
        { query: "dr el chaar", clicks: 14, ctr: 11.29, position: 5.81 },
        { query: "edgard el chaar", clicks: 13, ctr: 13.98, position: 1.14 },
        { query: "el chaar", clicks: 12, ctr: 23.08, position: 1.65 },
        { query: "edgar el chaar", clicks: 11, ctr: 23.40, position: 1.19 },
      ],
      topPages: [
        { page: "Homepage", clicks: 141, impressions: 1740, ctr: 8.10 },
        { page: "Dry Socket with Bone Graft", clicks: 103, impressions: 3223, ctr: 3.20 },
        { page: "Accidentally Blew Nose", clicks: 86, impressions: 8644, ctr: 0.99 },
        { page: "Signs of Failed Gum Graft", clicks: 49, impressions: 4926, ctr: 0.99 },
        { page: "Doctors & Periodontists (UES)", clicks: 27, impressions: 965, ctr: 2.80 },
      ],
    },
  };
  const websiteData30d = {
    period: "May 9 – June 6, 2026",
    sessions: 1434,
    topPages: [
      { page: "/", label: "Home", views: 853 },
      { page: "/signs-of-failed-gum-graft", label: "Signs of Failed Gum Graft", views: 189 },
      { page: "/dry-socket-with-bone-graft", label: "Dry Socket with Bone Graft", views: 107 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 77 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 65 },
      { page: "/dental-office-upper-east-side", label: "Dental Office UES", views: 46 },
      { page: "/how-painful-is-a-sinus-lift", label: "Sinus Lift Pain", views: 43 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 35 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 674, pct: 47.0 },
      { source: "Google", sessions: 653, pct: 45.5 },
      { source: "Yahoo", sessions: 19, pct: 1.3 },
      { source: "Bing", sessions: 17, pct: 1.2 },
      { source: "DuckDuckGo", sessions: 14, pct: 1.0 },
      { source: "Other", sessions: 57, pct: 3.4 },
    ],
    devices: [
      { device: "Desktop", pct: 65.0 },
      { device: "Mobile", pct: 34.1 },
      { device: "Tablet", pct: 0.9 },
    ],
    dailyVisitors: [
      { date: "May 9", visitors: 56 },{ date: "May 13", visitors: 67 },
      { date: "May 19", visitors: 60 },{ date: "May 21", visitors: 76 },
      { date: "May 27", visitors: 2 },{ date: "May 29", visitors: 58 },
      { date: "Jun 2", visitors: 63 },{ date: "Jun 6", visitors: 42 },
    ],
    search: {
      totalClicks: 516, totalImpressions: 39722, avgCTR: 1.30, avgPosition: 22.8,
      note: "28-day (May 10 – Jun 6)",
      topQueries: [
        { query: "i blew my nose after a sinus lift", clicks: 19, ctr: 13.97, position: 2.22 },
        { query: "dr el chaar", clicks: 14, ctr: 11.29, position: 5.81 },
        { query: "edgard el chaar", clicks: 13, ctr: 13.98, position: 1.14 },
        { query: "el chaar", clicks: 12, ctr: 23.08, position: 1.65 },
        { query: "edgar el chaar", clicks: 11, ctr: 23.40, position: 1.19 },
      ],
      topPages: [
        { page: "Homepage", clicks: 141, impressions: 1740, ctr: 8.10 },
        { page: "Dry Socket with Bone Graft", clicks: 103, impressions: 3223, ctr: 3.20 },
        { page: "Accidentally Blew Nose", clicks: 86, impressions: 8644, ctr: 0.99 },
        { page: "Signs of Failed Gum Graft", clicks: 49, impressions: 4926, ctr: 0.99 },
        { page: "Doctors & Periodontists (UES)", clicks: 27, impressions: 965, ctr: 2.80 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of June 8, 2026)",
    totalEpisodes: 48, totalDownloads: 4726, periodDownloads: 5,
    last7Days: 5, last30Days: 90, last90Days: 470,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 301 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 184 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Web Browser", downloads: 91, pct: 46 },
      { name: "Apple Podcasts", downloads: 57, pct: 29 },
      { name: "Spotify", downloads: 21, pct: 10 },
      { name: "Unknown", downloads: 10, pct: 5 },
      { name: "Amazon Echo", downloads: 6, pct: 3 },
    ],
    topCountries: [
      { country: "United States", downloads: 115 },
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
    period: "June 1 – June 7, 2026",
    followers: 3141, followerGrowth: 5, follows: 7, unfollows: 2,
    totalViews: 5012, totalReach: 1698, reachChange: 208.7, totalInteractions: 212,
    viewSplit: { followers: 46.9, nonFollowers: 53.1 },
    interactionSplit: { followers: 58.5, nonFollowers: 41.5 },
    viewsByType: { reels: 61.9, posts: 18.8, stories: 19.3 },
    interactionsByType: { reels: 77.2, posts: 7.3, stories: 15.5 },
    totalLikes: 99, totalComments: 25, totalSaves: 3, totalShares: 13,
    storyViews: 543, storyCompletion: 85, storyCount: 5,
    dailyViews: [
      { date: "Jun 1", views: 357 },{ date: "Jun 2", views: 413 },
      { date: "Jun 3", views: 268 },{ date: "Jun 4", views: 1263 },
      { date: "Jun 5", views: 2526 },{ date: "Jun 6", views: 1169 },
      { date: "Jun 7", views: 467 },
    ],
    posts: [
      { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 4", views: 2137, reach: 1211, likes: 83, comments: 25, saves: 3, shares: 11, er: 10.1, skipRate: 62, avgWatch: "10s", igUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/", isTop: true },
      { id: 2, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 5", views: 498, reach: 362, likes: 11, comments: 0, saves: 0, shares: 2, er: 3.6, skipRate: 72, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZOF7qTBswB/", isTop: false },
      { id: 3, title: "Why Patients Choose Us", type: "Post", date: "Jun 3", views: 270, reach: 151, likes: 5, comments: 0, saves: 0, shares: 0, er: 3.3, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZIsQcthSTD/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "May 8 – June 8, 2026",
    followers: 3141, followerGrowth: 13, follows: 20, unfollows: 7,
    totalViews: 15000, totalReach: 4500, reachChange: 0, totalInteractions: 321,
    viewSplit: { followers: 50, nonFollowers: 50 },
    interactionSplit: { followers: 55, nonFollowers: 45 },
    viewsByType: { reels: 52.6, posts: 29.8, stories: 17.6 },
    interactionsByType: { reels: 70, posts: 22, stories: 8 },
    totalLikes: 262, totalComments: 29, totalSaves: 8, totalShares: 22,
    storyViews: 1849, storyCompletion: 86, storyCount: 19,
    dailyViews: [
      { date: "May 8", views: 1238 },{ date: "May 13", views: 1821 },
      { date: "May 21", views: 1607 },{ date: "May 22", views: 1172 },
      { date: "May 29", views: 893 },{ date: "Jun 4", views: 1263 },
      { date: "Jun 5", views: 2526 },{ date: "Jun 7", views: 467 },
    ],
    posts: [
      { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 4", views: 2137, reach: 1211, likes: 83, comments: 25, saves: 3, shares: 11, er: 10.1, skipRate: 62, avgWatch: "10s", igUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/", isTop: true },
      { id: 2, title: "Andrés Campana – Made with Identity", type: "Reel", date: "May 13", views: 1821, reach: 1024, likes: 96, comments: 1, saves: 3, shares: 5, er: 10.3, skipRate: 53, avgWatch: "14s", igUrl: "https://www.instagram.com/reel/DYSOcwGhzJn/", isTop: false },
      { id: 3, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", date: "May 28", views: 894, reach: 348, likes: 15, comments: 0, saves: 0, shares: 0, er: 4.3, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY5XLhUGYzB/", isTop: false },
      { id: 4, title: "Dental Implants Start Long Before...", type: "Carousel", date: "May 20", views: 684, reach: 269, likes: 10, comments: 0, saves: 1, shares: 1, er: 4.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DYkP-F3GeWK/", isTop: false },
      { id: 5, title: "The Best Things Are Never Rushed (Wine Is Time)", type: "Reel", date: "May 8", views: 588, reach: 326, likes: 18, comments: 1, saves: 0, shares: 1, er: 6.1, skipRate: 60, avgWatch: "9s", igUrl: "https://www.instagram.com/reel/DYFrHCTBs43/", isTop: false },
      { id: 6, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 5", views: 498, reach: 362, likes: 11, comments: 0, saves: 0, shares: 2, er: 3.6, skipRate: 72, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZOF7qTBswB/", isTop: false },
      { id: 7, title: "Andrés Campana – Unforgettable", type: "Reel", date: "May 16", views: 484, reach: 323, likes: 8, comments: 0, saves: 0, shares: 1, er: 2.8, skipRate: 77, avgWatch: "", igUrl: "https://www.instagram.com/reel/DYZ85IxBmlp/", isTop: false },
      { id: 8, title: "Complex Cases Require Expert Care", type: "Carousel", date: "May 30", views: 458, reach: 194, likes: 7, comments: 2, saves: 1, shares: 1, er: 5.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY9yNAWgEuT/", isTop: false },
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
                  <div className="exec-col-body">Reach jumped to {d.kpi.reach.value.toLocaleString()} accounts — up 208.7% week-over-week and the strongest week in months. The driver was two new collaboration Reels with NYC Dental Smiles; the Jun 4 "Authenticity in Dentistry" episode promo reached 1,211 accounts on its own. Views skewed {d.viewerSplit.nonFollowers}% to non-followers — a healthy discovery signal after several follower-bound weeks.</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% ER with {d.kpi.engagements.value} interactions — up from 37 the prior week as the Reels pulled in non-follower engagement. Top post: the Jun 4 Authenticity Reel (2,137 IG views, 83 likes, 25 comments, 11 shares). Follower growth +{d.kpi.followers.change} net (7 follows, 2 unfollows), with profile visits up 150% and 5 external link taps.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Reels led views at {d.contentMix.reels}% after returning to the calendar this week, with Stories ({d.contentMix.stories}%) and Posts ({d.contentMix.posts}%) behind. {socialData.storyCount} Stories ran at {socialData.storyCompletion}% completion. The takeaway: the Reel cadence that drove the reach rebound is the pattern to sustain, not a one-off.</div>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "60 attributed human clicks over 7 days across named destinations. Homepage drew 48, DDS-PC UES 4, DDS-PC Midtown 4, YouTube 4 — up ~25% week-over-week. Booking links remain underutilized relative to the reach surge; converting that discovery into bookings is the lever to focus on." : "159 attributed human clicks across named destinations over 30 days. Homepage 112, DDS-PC UES 21, DDS-PC Midtown 20, YouTube 6 — up ~27% over the prior 30-day window. Catch-all/untagged and bot traffic (data-center geos, Linux UAs) excluded to keep the picture focused on named, actionable destinations."} severity="info" />
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "339 sessions Jun 1–7. Direct 61.9% (210), Google 31.6% (107) on a desktop-heavy week (Desktop 76.7%, Mobile 22.7%). Home drew 293 views, then Accidentally Blew Nose (23) and Our Doctors (21). Search (28-day, May 10 – Jun 6): 516 clicks from 39.7K impressions, 1.30% CTR, avg position ~22.8. Mobile ranks far better than desktop in search (14.4 vs 29.4 position) — mobile-first indexing favors this site." : "1,434 sessions over 30 days. Direct 47.0% (674), Google 45.5% (653). Desktop 65.0%, Mobile 34.1%. Top page is Home (853), then Signs of Failed Gum Graft (189) and Dry Socket with Bone Graft (107). In search, Dry Socket leads content pages at 103 clicks (3.2% CTR); the homepage converts best at 8.1% CTR. Brand queries (Edgard / Dr el chaar variations) cluster at 11–23% CTR."} severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Daily views spiked Jun 4–5 (1,263 then 2,526) as the two NYC Dental Smiles collab Reels landed — the clearest publish-day lift in months." : "⚡ The Jun 4 Authenticity Reel (2,137 IG views) and May 13 Andrés Reel (1,821) anchor the 30-day window. Reels drive the month's reach; weeks without them compress it. Best posting: 9 AM – 2 PM EST."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ Reels drove 77% of interactions this week — the collab Reels pulled strong follower and non-follower engagement." : "✦ Reels drive ~70% of interactions over 30 days — the dominant engagement format when published"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ 53% of views from non-followers — discovery rebounded as the collab Reels distributed to new audiences" : "✦ ~50% of views from non-followers over 30 days — balanced follower / non-follower distribution"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Just 3 saves and 13 shares this week despite the reach surge — saves remain the biggest lever to improve" : "▲ 8 saves and 22 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>No Reels in this window. Toggle to 30-day view to see Reel performance over the broader window.</div>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "5,012 views reaching 1,698 accounts (+208.7% WoW — the strongest reach week in months). Views ran 53% non-follower, a healthy discovery skew. 212 total interactions, up from 37. Two collaboration Reels with NYC Dental Smiles drove it: Jun 4 'Authenticity in Dentistry' (2,137 IG views, 1,211 reach, 10s avg watch) and Jun 5 'Is Dentistry Losing Its Soul?' (498 IG views, 8s). 5 Stories at ~85% completion. Net follower growth +5 (7 follows, 2 unfollows)." : "8,658 content views across 11 posts. Top performer: the Jun 4 Authenticity Reel — 2,137 IG views, 1,211 reach, 122 engagements (62% skip). The May 13 Andrés 'Made with Identity' Reel held strong at 1,821 views. Reels accounted for ~64% of content views despite being under half the posts — the discovery engine when they publish. 30-day reach and account views are estimated from content data."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "The Reel cadence returned — and reach answered immediately, up 208.7% to 1,698 accounts. The two NYC Dental Smiles collaboration Reels did the work, with the Jun 4 episode promo reaching 1,211 accounts alone. The lever now is consistency: holding a 2–3 Reel/week cadence is what turns a strong week into a sustained trend. Skip rates (62–72%) are the next thing to tighten." : "The 30-day arc confirms it: Reels are the reach engine. When they publish — the Jun 4 Authenticity Reel (2,137 views) and May 13 Andrés Reel (1,821) — reach and engagement climb; quiet weeks compress them. The NYC Dental Smiles collaboration format is the standout, pairing podcast guests with co-posted Reels. Cadence is the lever: consistent Reels sustain the gains."} severity="success" />
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
