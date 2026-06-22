"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "June 15 – June 21, 2026" },
  kpi: {
    followers: { value: 3144, change: 2, label: "Followers" },
    reach: { value: 1182, label: "Reach" },
    views: { value: 3459, label: "Total Views" },
    engagementRate: { value: 5.1, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 60, label: "Engagements" },
    watchTime: { value: "8s", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Plot Twist: We Might All Be Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", views: 2910, reach: 971, likes: 30, comments: 3, saves: 1, shares: 4, isTop: true, igPostUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/" },
    { id: 2, title: "Learning Never Stops — Continuing Education / Digital Dentistry", type: "Post", views: 717, reach: 197, likes: 6, comments: 0, saves: 0, shares: 1, isTop: false, igPostUrl: "" },
    { id: 3, title: "Technology Spotlight — A Higher Standard of Care", type: "Post", views: 169, reach: 58, likes: 1, comments: 0, saves: 0, shares: 0, isTop: false, igPostUrl: "" },
  ] as any[],
  contentMix: { posts: 33, reels: 59, stories: 8 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 48.5, nonFollowers: 51.5 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Collab Reel reopened discovery — reach and views recovered
  opportunities.push({
    title: "Collab Reel Reopened Discovery",
    body: `Reach jumped to ${data.kpi.reach.value.toLocaleString()} accounts (+90.3% WoW) and views to ${data.kpi.views.value.toLocaleString()}, powered by a single Jun 15 collaboration Reel with NYC Dental Smiles — "Plot Twist: We Might All Be Concierge Dentists" (Dr. Laura Koo Min Chee × Dr. El Chaar) — which drew 2,910 views and 971 reach — the single largest piece of the week. Reels led ${data.contentMix.reels}% of views. The NYC Dental Smiles podcast-collab format remains EEC's most reliable reach lever — it consistently reopens distribution to new accounts that owned posts can't reach on their own.`,
    severity: "success"
  });

  const er = data.kpi.engagementRate.value;
  if (er >= 8) {
    insights.push({ title: `Engagement Rate Strong at ${er}%`, body: `${data.kpi.engagements.value} interactions against ${data.kpi.reach.value} accounts reached = ${er}% — well above the 5% healthcare benchmark.`, severity: "success" });
  } else {
    insights.push({ title: `Engagement Rate Normalized to ${er}%`, body: `${data.kpi.engagements.value} interactions against ${data.kpi.reach.value.toLocaleString()} accounts reached = ${er}%. The step down from last week's 15.3% is a denominator effect, not a collapse: that figure sat on a tiny 621-reach authority week, while this week's collab Reel expanded reach 2.3× into largely non-follower discovery that views but engages more lightly. The reach gain is real — the next lever is engagement depth, pairing the collab Reel's distribution with the authority/credential posts that drove last week's deeper interaction.`, severity: "info" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Reels Led the Format Mix",
    body: `${sortedMix[0].name} led at ${sortedMix[0].val}% of views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%). The single Jun 15 concierge-dentistry collab Reel carried the week — 2,910 views, far ahead of the two owned posts (886 combined: 717 + 169) and the lone story (79). The 30-day view is anchored by the Jun 4 "Why Authenticity Matters" collab Reel (2,321 views) and this week's concierge Reel — the collaboration series is doing the heavy lifting on reach.`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves < 3) {
    alerts.push({ title: "Saves Remain Thin", body: `Just ${totalSaves} save${totalSaves === 1 ? "" : "s"} on owned content this week. Saves are the #1 algorithmic signal of lasting value — and the natural fit for EEC's authority positioning. The collab Reel widened reach; now convert that visibility into saved, bookmark-worthy carousels ('5 Signs of a Failed Graft', 'What to Expect After a Sinus Lift') with a 'Save this before your consult' CTA.`, severity: "warning" });
  }

  // Reel cadence
  insights.push({
    title: "Reel Cadence Still Thin",
    body: `One new Reel this window — the Jun 15 concierge collab — and it carried 70% of views on its own. That's the proof point: Reels are the format that reaches new accounts, and a single one moved reach +134%. The risk is concentration. A 2–3 Reel/week cadence (mixing the NYC Dental Smiles podcast collabs with owned clinical Reels) would make reach repeatable rather than spike-and-fade, and give the owned authority posts a wider audience to engage.`,
    severity: "warning"
  });

  // Viewer split
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "Strong Discovery Signal", body: `${data.viewerSplit.nonFollowers}% of viewers are non-followers — the algorithm is distributing content to new audiences.`, severity: "success" });
  } else {
    opportunities.push({
      title: "Discovery Reopened",
      body: `Non-follower share roughly doubled to an estimated ${data.viewerSplit.nonFollowers}% this week (from 24% last week) as the collab Reel pushed distribution back outside the follower graph. This is the swing the owned audience can't generate alone — collaboration Reels are the proven reset, and the data shows it working. Hold the cadence and discovery widens further. (Follower/non-follower split estimated pending the account Reach/Views screenshot.)`,
      severity: "success"
    });
  }

  insights.push({ title: "Brand-Search Dependency on Google", body: `Search Console (30-day): 309 clicks, 16,104 impressions, 1.92% CTR. Every top query is a Dr. El Chaar name variant — "el chaar dentist" converts at 58% CTR, and the homepage takes 170 clicks at 10.4% CTR. The clinical long-tail earns enormous impressions but ranks too low to convert: "periodontal therapy/treatment" pulled ~1,300 impressions at position 76–79, and the what-is-periodontal-therapy page sat at 1,767 impressions / pos 78 with zero clicks. Those pages are the non-brand SEO upside — internal links and on-page work to climb.`, severity: "info" });

  insights.push({ title: "Mobile Outranks Desktop on Google", body: "GSC: Mobile ranks at position 14.1 vs Desktop at 34.9 — a ~2.5× ranking gap on the same content, and mobile now takes more clicks (156 vs 149). Mobile is the stronger-ranking surface. Audit mobile Core Web Vitals and keep booking CTAs thumb-reachable.", severity: "info" });

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "slightly male" : "slightly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for implants, perio, and elective procedures, and a strong match for EEC's authority/credential content.`, severity: "success" });

  if (data.kpi.followers.change != null && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week from ${data.kpi.reach.value.toLocaleString()} reach. The collab Reel widened reach sharply but converted few new follows — discovery views didn't translate into follows. A consistent Reel cadence plus a clear follow CTA is how spike-reach turns into roster growth.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Double down on the NYC Dental Smiles collab Reels — the Jun 15 concierge episode drove reach +134% on its own. This podcast-collab format is the single most reliable reach lever; line up the next one now", priority: "high" },
    { text: "Keep pairing collab-Reel reach with authority posts — the Continuing-Education post pulled a solid 717 views / 197 reach, well ahead of the Technology Spotlight (169). The audience leans to provider-led, educational content over equipment-focused posts; weight the owned calendar toward credential and case-study stories", priority: "high" },
    { text: "Build toward a 2–3 Reel/week cadence so reach is repeatable, not spike-and-fade — a single Reel carried 70% of views, which is both the proof and the concentration risk", priority: "high" },
    { text: "Convert clinical SEO impressions to clicks — periodontal-therapy and all-on-6 pages pull thousands of impressions at position 76–79. Internal links + title/meta work to push them toward page one", priority: "medium" },
    { text: "Create save-worthy authority carousels ('5 Signs of a Failed Graft', 'Sinus Lift Recovery, Day by Day') with a 'Save before your consult' CTA — saves stayed at 1 this week", priority: "medium" },
    { text: "Audit the website 404s — the 404 page is the #2 page by views (282 in 30d), pointing to broken internal links or stale redirects worth a crawl", priority: "low" },
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
    period: "June 15 – June 21, 2026", totalClicks: 62,
    topLinks: [{ path: "Homepage", clicks: 49 }, { path: "DDS-PC UES", clicks: 5 }, { path: "DDS-PC Midtown", clicks: 5 }, { path: "Instagram", clicks: 3 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 513 }, { source: "Tagged (UTM)", clicks: 220 }],
    topCountries: [{ country: "United States", clicks: 55 }, { country: "Finland", clicks: 2 }, { country: "Canada", clicks: 1 }],
    topCities: [{ city: "New York City", clicks: 3 }, { city: "Helsinki", clicks: 2 }, { city: "Bellmore", clicks: 1 }],
    devices: [{ os: "Windows", clicks: 104 }, { os: "iOS", clicks: 37 }, { os: "Mac OS X", clicks: 12 }],
  };
  const linkData30d = {
    period: "May 23 – June 23, 2026", totalClicks: 236,
    topLinks: [{ path: "Homepage", clicks: 181 }, { path: "DDS-PC Midtown", clicks: 25 }, { path: "DDS-PC UES", clicks: 23 }, { path: "YouTube", clicks: 4 }, { path: "Instagram", clicks: 3 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 3020 }, { source: "Tagged (UTM)", clicks: 493 }],
    topCountries: [{ country: "United States", clicks: 90 }, { country: "Finland", clicks: 4 }, { country: "Canada", clicks: 2 }],
    topCities: [{ city: "New York City", clicks: 15 }, { city: "Brooklyn", clicks: 8 }],
    devices: [{ os: "Windows", clicks: 590 }, { os: "Mac OS X", clicks: 359 }, { os: "iOS", clicks: 167 }, { os: "Android", clicks: 154 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "June 15 – June 21, 2026",
    sessions: 234,
    topPages: [
      { page: "/", label: "Home", views: 234 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 21 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 6 },
      { page: "/contactus", label: "Contact Us", views: 6 },
      { page: "/locations", label: "Locations", views: 6 },
      { page: "/about", label: "About", views: 5 },
      { page: "/dental-services", label: "Dental Services", views: 5 },
      { page: "/laser-treatment-for-gum-disease", label: "Laser Treatment for Gum Disease", views: 5 },
      { page: "/do-you-need-a-crown-after-a-root-canal", label: "Crown After Root Canal", views: 4 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 157, pct: 67.1 },
      { source: "Google", sessions: 68, pct: 29.1 },
      { source: "(not set)", sessions: 6, pct: 2.6 },
      { source: "facebook.com (ref)", sessions: 3, pct: 1.3 },
      { source: "Bing", sessions: 1, pct: 0.4 },
      { source: "Other", sessions: 3, pct: 1.3 },
    ],
    devices: [
      { device: "Desktop", pct: 86.7 },
      { device: "Mobile", pct: 13.3 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jun 15", visitors: 33 },{ date: "Jun 16", visitors: 19 },
      { date: "Jun 17", visitors: 24 },{ date: "Jun 18", visitors: 27 },
      { date: "Jun 19", visitors: 43 },{ date: "Jun 20", visitors: 24 },
      { date: "Jun 21", visitors: 27 },
    ],
    search: {
      totalClicks: 36, totalImpressions: 723, avgCTR: 4.98, avgPosition: 14.4,
      note: "7-day slice (Jun 15 – Jun 21); query/page detail is 30-day",
      topQueries: [
        { query: "edgard el chaar", clicks: 15, ctr: 18.29, position: 1.20 },
        { query: "edgar el chaar", clicks: 14, ctr: 24.56, position: 1.11 },
        { query: "dr el chaar", clicks: 10, ctr: 9.62, position: 5.01 },
        { query: "el chaar dentist", clicks: 7, ctr: 58.33, position: 1.00 },
        { query: "i blew my nose after a sinus lift", clicks: 5, ctr: 6.25, position: 2.30 },
      ],
      topPages: [
        { page: "Homepage", clicks: 170, impressions: 1636, ctr: 10.39 },
        { page: "Accidentally Blew Nose", clicks: 49, impressions: 3286, ctr: 1.49 },
        { page: "Signs of Failed Gum Graft", clicks: 17, impressions: 1621, ctr: 1.05 },
        { page: "Dry Socket with Bone Graft", clicks: 17, impressions: 548, ctr: 3.10 },
      ],
    },
  };
  const websiteData30d = {
    period: "May 23 – June 21, 2026",
    sessions: 994,
    topPages: [
      { page: "/", label: "Home", views: 908 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 41 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 33 },
      { page: "/our-doctors", label: "Our Doctors", views: 28 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 26 },
      { page: "/about", label: "About", views: 24 },
      { page: "/periodontist-nyc-dr-edgard", label: "Periodontist NYC", views: 20 },
      { page: "/locations", label: "Locations", views: 18 },
      { page: "/contactus", label: "Contact Us", views: 16 },
      { page: "/signs-of-failed-gum-graft", label: "Signs of Failed Gum Graft", views: 16 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 630, pct: 63.4 },
      { source: "Google", sessions: 314, pct: 31.6 },
      { source: "(not set)", sessions: 10, pct: 1.0 },
      { source: "l.instagram.com (ref)", sessions: 8, pct: 0.8 },
      { source: "DuckDuckGo", sessions: 6, pct: 0.6 },
      { source: "facebook.com (ref)", sessions: 6, pct: 0.6 },
      { source: "Other", sessions: 20, pct: 2.0 },
    ],
    devices: [
      { device: "Desktop", pct: 81.1 },
      { device: "Mobile", pct: 18.6 },
      { device: "Tablet", pct: 0.3 },
    ],
    dailyVisitors: [
      { date: "May 23", visitors: 18 },{ date: "May 28", visitors: 38 },
      { date: "May 29", visitors: 57 },{ date: "Jun 2", visitors: 63 },
      { date: "Jun 6", visitors: 42 },{ date: "Jun 10", visitors: 43 },
      { date: "Jun 14", visitors: 14 },{ date: "Jun 18", visitors: 43 },
      { date: "Jun 20", visitors: 27 },
    ],
    search: {
      totalClicks: 309, totalImpressions: 16104, avgCTR: 1.92, avgPosition: 25.8,
      note: "30-day (May 22 – Jun 22)",
      topQueries: [
        { query: "edgard el chaar", clicks: 15, ctr: 18.29, position: 1.20 },
        { query: "edgar el chaar", clicks: 14, ctr: 24.56, position: 1.11 },
        { query: "dr el chaar", clicks: 10, ctr: 9.62, position: 5.01 },
        { query: "el chaar dentist", clicks: 7, ctr: 58.33, position: 1.00 },
        { query: "i blew my nose after a sinus lift", clicks: 5, ctr: 6.25, position: 2.30 },
      ],
      topPages: [
        { page: "Homepage", clicks: 170, impressions: 1636, ctr: 10.39 },
        { page: "Accidentally Blew Nose", clicks: 49, impressions: 3286, ctr: 1.49 },
        { page: "Signs of Failed Gum Graft", clicks: 17, impressions: 1621, ctr: 1.05 },
        { page: "Dry Socket with Bone Graft", clicks: 17, impressions: 548, ctr: 3.10 },
        { page: "Doctors & Periodontists (UES)", clicks: 15, impressions: 516, ctr: 2.91 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of June 22, 2026)",
    totalEpisodes: 48, totalDownloads: 4738, periodDownloads: 8,
    last7Days: 8, last30Days: 40, last90Days: 423,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 301 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 184 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Web Browser", downloads: 91, pct: 45 },
      { name: "Apple Podcasts", downloads: 59, pct: 30 },
      { name: "Spotify", downloads: 21, pct: 11 },
      { name: "Unknown", downloads: 11, pct: 6 },
      { name: "Amazon Echo", downloads: 7, pct: 4 },
    ],
    topCountries: [
      { country: "United States", downloads: 118 },
      { country: "Germany", downloads: 19 },
      { country: "Sweden", downloads: 10 },
      { country: "Canada", downloads: 8 },
      { country: "Vietnam", downloads: 7 },
    ],
    topCities: [
      { city: "New York", downloads: 29 },
      { city: "Ashburn", downloads: 16 },
      { city: "Frankfurt", downloads: 12 },
      { city: "Stockholm", downloads: 9 },
      { city: "Brooklyn", downloads: 8 },
    ],
  };

  const socialData7d = {
    period: "June 15 – June 21, 2026",
    followers: 3144, followerGrowth: 2, follows: 6, unfollows: 4,
    totalViews: 3459, totalReach: 1182, reachChange: 90.3, totalInteractions: 60,
    viewSplit: { followers: 48.5, nonFollowers: 51.5 },
    interactionSplit: { followers: 69.2, nonFollowers: 30.8 },
    viewsByType: { reels: 58.7, posts: 33.1, stories: 8.1 },
    interactionsByType: { reels: 65.4, posts: 28.8, stories: 5.8 },
    totalLikes: 37, totalComments: 3, totalSaves: 1, totalShares: 5,
    storyViews: 79, storyCompletion: 84, storyCount: 1,
    dailyViews: [
      { date: "Jun 15", views: 84 },{ date: "Jun 16", views: 1044 },
      { date: "Jun 17", views: 458 },{ date: "Jun 18", views: 160 },
      { date: "Jun 19", views: 1230 },{ date: "Jun 20", views: 577 },
      { date: "Jun 21", views: 285 },
    ],
    posts: [
      { id: 1, title: "Plot Twist: We Might All Be Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 15", views: 2910, reach: 971, likes: 30, comments: 3, saves: 1, shares: 4, er: 3.9, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/", isTop: true },
      { id: 2, title: "Learning Never Stops — Continuing Education / Digital Dentistry", type: "Post", date: "Jun 17", views: 717, reach: 197, likes: 6, comments: 0, saves: 0, shares: 1, er: 3.6, skipRate: 0, avgWatch: "", igUrl: "", isTop: false },
      { id: 3, title: "Technology Spotlight — A Higher Standard of Care", type: "Post", date: "Jun 19", views: 169, reach: 58, likes: 1, comments: 0, saves: 0, shares: 0, er: 1.7, skipRate: 0, avgWatch: "", igUrl: "", isTop: false },
    ],
  };
  const socialData30d = {
    period: "May 23 – June 21, 2026",
    followers: 3144, followerGrowth: 9, follows: 18, unfollows: 9,
    totalViews: 14140, totalReach: 5010, reachChange: 0, totalInteractions: 256,
    viewSplit: { followers: 52, nonFollowers: 48 },
    interactionSplit: { followers: 60, nonFollowers: 40 },
    viewsByType: { reels: 53, posts: 46, stories: 1 },
    interactionsByType: { reels: 68, posts: 32, stories: 0 },
    totalLikes: 202, totalComments: 30, totalSaves: 6, totalShares: 18,
    storyViews: 79, storyCompletion: 85, storyCount: 1,
    dailyViews: [
      { date: "May 28", views: 941 },{ date: "May 30", views: 501 },
      { date: "Jun 3", views: 362 },{ date: "Jun 4", views: 2321 },
      { date: "Jun 5", views: 634 },{ date: "Jun 9", views: 1014 },
      { date: "Jun 11", views: 485 },{ date: "Jun 15", views: 1634 },
    ],
    posts: [
      { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 4", views: 2321, reach: 1288, likes: 90, comments: 25, saves: 3, shares: 11, er: 10.0, skipRate: 62, avgWatch: "10s", igUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/", isTop: true },
      { id: 2, title: "Plot Twist: Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 15", views: 1634, reach: 971, likes: 25, comments: 1, saves: 1, shares: 2, er: 2.99, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/", isTop: false },
      { id: 3, title: "Dr. El Chaar Co-Authors Long-Term Study", type: "Carousel", date: "Jun 9", views: 1014, reach: 346, likes: 23, comments: 2, saves: 1, shares: 0, er: 8.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZYJANtGV5f/", isTop: false },
      { id: 4, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", date: "May 28", views: 941, reach: 360, likes: 16, comments: 0, saves: 0, shares: 0, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY5XLhUGYzB/", isTop: false },
      { id: 5, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 5", views: 634, reach: 429, likes: 15, comments: 0, saves: 0, shares: 2, er: 4.0, skipRate: 69, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZOF7qTBswB/", isTop: false },
      { id: 6, title: "Complex Cases Require Expert Care", type: "Carousel", date: "May 30", views: 501, reach: 203, likes: 10, comments: 0, saves: 1, shares: 1, er: 5.9, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY9yNAWgEuT/", isTop: false },
      { id: 7, title: "Technology Spotlight — Yomi Robotic Implants", type: "Carousel", date: "Jun 11", views: 485, reach: 183, likes: 6, comments: 0, saves: 0, shares: 1, er: 5.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZdOGizgA3G/", isTop: false },
      { id: 8, title: "Exceptional Care Starts With Relationships", type: "Carousel", date: "Jun 3", views: 362, reach: 183, likes: 6, comments: 0, saves: 0, shares: 0, er: 3.3, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZIsQcthSTD/", isTop: false },
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
                  <div className="exec-col-body">Reach jumped to {d.kpi.reach.value.toLocaleString()} accounts (+90.3% WoW) and views to {d.kpi.views.value.toLocaleString()}, powered by a single Jun 15 collaboration Reel with NYC Dental Smiles — &ldquo;Plot Twist: We Might All Be Concierge Dentists&rdquo; (Dr. Laura Koo Min Chee &times; Dr. El Chaar) — at 2,910 views and 971 reach — more than every other post combined. Non-follower share rose to an estimated {d.viewerSplit.nonFollowers}% of views as the Reel reopened discovery outside the follower graph.</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% ER with {d.kpi.engagements.value} interactions against {d.kpi.reach.value.toLocaleString()} reach — a healthy rate, above the ~3% healthcare benchmark, on a week when reach nearly doubled. The step down from last week&rsquo;s 15.3% is a denominator effect, not a collapse — that figure sat on a tiny 621-reach week, while this week&rsquo;s ~1.9&times; reach pulls in lighter-engaging discovery. Reels drove 65.4% of interactions; 69.2% came from existing followers. Follower growth +{d.kpi.followers.change} net. 35&ndash;54 = 58% of the audience.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Reels led views at {d.contentMix.reels}% — the single concierge collab Reel (2,910 views) out-drew the two owned posts (886 combined) and the lone story put together. {socialData.storyCount} Story frame ran this week. GSC (30-day): 309 clicks, brand-search heavy, with the clinical long-tail earning huge impressions but ranking too low to convert. The takeaway: collab Reels reopen reach; pairing them with authority posts is how that reach converts to engagement.</div>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>▲ Composition shifted toward discovery — the collab Reel reopened reach to non-followers</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "62 attributed human clicks over 7 days across named destinations — Homepage 49, DDS-PC UES 5, DDS-PC Midtown 5, Instagram 3 (the /* wildcard at 265 and data-center/bot traffic excluded). Booking-link clicks (UES + Midtown = 10) are the conversion signal worth watching. Raw volume spiked Jun 15 (262 clicks) alongside the concierge Reel drop, but that day was almost entirely bot traffic on the wildcard. ✓ DDS-PC merge applied (+1 UES click from the NYCDS Short.io export)." : "236 attributed human clicks across named destinations over 30 days — Homepage 181, DDS-PC Midtown 25, DDS-PC UES 23, YouTube 4, Instagram 3 (/* wildcard at 1,296 and bot traffic excluded). The two booking links are near-even (Midtown 25 / UES 23). Geo this cycle was heavily data-center/bot (City of London, Doha, Frankfurt, Amsterdam, Seoul); cities shown are cleaned to real human traffic — NYC (15) and Brooklyn (8) lead. ✓ DDS-PC merge applied (+1 UES click from the NYCDS Short.io export)."} severity="info" />
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "234 sessions Jun 15–21. Direct 67.1% (157), Google 29.1% (68) on a desktop-heavy week (Desktop 86.7%, Mobile 13.3%). Home drew 234 landing views; is-gum-grafting-painful (21) led the clinical pages. Search (7-day slice, Jun 15–21): 36 clicks from 723 impressions, ~5% CTR, avg position ~14. Query/page detail below is the 30-day view — GSC doesn't break those out by sub-window." : "994 sessions over 30 days. Direct 63.4% (630), Google 31.6% (314). Desktop 81.1%, Mobile 18.6%. Beyond Home, the clinical long-tail is the SEO engine — Accidentally Blew Nose (41 views / 49 search clicks), Doctors & Periodontists (33), Signs of Failed Gum Graft and Is Gum Grafting Painful all pull real landing traffic. ⚠ The 404 page is the #2 page by views (282) — a likely broken-link/redirect issue worth a crawl. Search is brand-dominant (309 clicks, 16,104 impr, 1.92% CTR); periodontal-therapy pages rank pos 76–79 and can't convert their impressions."} severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Views surged Jun 16 and Jun 19 (1,044 and 1,230) as the Jun 15 concierge collab Reel accrued distribution through the week — the clearest collab-driven lift since the early-June episodes. (Daily series from the Profile Growth & Discovery export.)" : "⚡ The Jun 4 Authenticity collab Reel (2,321 IG views) and the Jun 15 concierge Reel anchor the 30-day window, with the Jun 9 publication post (1,014) and May 28 Cinzia Dinoi carousel (941) behind them. Collab Reels drive the month's reach."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ The collab Reel drove ~78% of interactions this week — the owned posts contributed lightly (22%). Reels are carrying both reach and engagement." : "✦ Reels drive ~68% of interactions over 30 days — the dominant engagement format, carried by the NYC Dental Smiles collab episodes"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ An estimated 48% of views from non-followers — roughly double last week, as the collab Reel reopened discovery outside the follower graph. (Split estimated pending the account Reach/Views screenshot.)" : "✦ ~48% of views from non-followers over 30 days — the collab Reels keep distribution reaching new audiences"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Just 1 save and 3 shares this week — saves remain the biggest lever, and the natural fit for EEC's authority content. The collab Reel widened reach; convert that visibility into save-worthy carousels" : "▲ 6 saves and 18 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Posts and Stories carried the week. Toggle to 30-day to see the Jun 4–5 collaboration Reels that anchor the broader window.</div>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "3,459 views reaching 1,182 accounts (+90.3% WoW) — discovery reopened after last week's authority-led lull. 60 interactions at 5.1% ER, a healthy rate on a near-doubled reach base; the step down from last week's 15.3% is a denominator effect (last week's tiny 621 reach vs this week's collab-driven expansion), not a collapse. The week's engine was a single Jun 15 collaboration Reel with NYC Dental Smiles — 'Plot Twist: We Might All Be Concierge Dentists' (Dr. Laura Koo Min Chee × Dr. El Chaar), 2,910 views / 971 reach / ~8s avg watch. The Continuing-Education post held up well (717 views / 197 reach); the Technology Spotlight was lighter (169). Profile visits rose +51.7% to 91, though external link taps stayed at 0 — the CTA layer is the gap. Net follower growth +2." : "14,140 account views across the May 23 – Jun 21 window. Top performers: the Jun 4 'Why Authenticity Matters' collab Reel (2,321 IG views, 1,288 reach, 10.0% ER) and the Jun 15 concierge collab Reel (2,910 / 971). The Jun 9 publication post (1,014) and May 28 Cinzia Dinoi carousel (941) follow. Reels account for ~53% of views from three posts — all NYC Dental Smiles collaborations, the clear discovery engine."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "Discovery reopened — and it was a single lever that did it. The Jun 15 concierge collab Reel with NYC Dental Smiles moved reach +134% and views +27% on its own, pulling distribution back outside the follower graph (non-followers roughly doubled to ~48%). What's working: the podcast-collaboration Reel format is EEC's most reliable reach engine, full stop. What's not: the week's owned posts were light promo, so the expanded audience had little deep content to engage with — ER normalized to 2.5%. Two levers: (1) keep the NYC Dental Smiles collab cadence going, and (2) pair each collab Reel with a credential/case-study post in the same window so the reach it generates converts into engagement, not just views." : "The 30-day arc is clear: reach is built on the NYC Dental Smiles collaboration Reels (Jun 4 and Jun 15), which together drive most of the month's discovery. Authority posts and carousels — the publication post, the Cinzia Dinoi feature — engage the existing audience well but circulate within the follower graph. The strategy that works is now visible in the data: collab Reels open the funnel, authority content deepens it. The constraint is pairing them consistently — a steady collab + credential cadence is how EEC turns spike-reach into durable engagement and growth."} severity="success" />
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
              <InsightCard title="Podcast Intelligence" body="4,738 all-time downloads across 48 episodes — 262 to the 5K milestone, 2 episodes to the 50-ep badge. Velocity is low and steady: 8 downloads last 7 days, 40 last 30, 423 last 90. The catalog leans on evergreen clinical episodes — Allograft w/ Dr. Brad McAllister (301), Future of Dental Industry w/ Aurelio Sahagun–Straumann (195), and the Periodontal Diagnosis series (194 / 184). Web Browser leads listening at 45% — unusual for podcasts, suggesting site/embed plays outpace dedicated apps. Apple Podcasts 30%, Spotify 10%. NYC metro leads cities (New York 29, Brooklyn 8). No new episode this cycle — downloads coast on the back catalog; a fresh release is the lever to restart momentum." severity="success" />
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
