"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "June 8 – June 15, 2026" },
  kpi: {
    followers: { value: 3142, change: 2, label: "Followers" },
    reach: { value: 621, label: "Reach" },
    views: { value: 2714, label: "Total Views" },
    engagementRate: { value: 15.3, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 95, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Dr. El Chaar Co-Authors Long-Term Study · New Publication", type: "Post", views: 922, reach: 321, likes: 23, comments: 2, saves: 1, shares: 0, isTop: true, igPostUrl: "https://www.instagram.com/p/DZYJANtGV5f/" },
    { id: 2, title: "Technology Spotlight — Advanced Technology, Precision Care", type: "Post", views: 394, reach: 160, likes: 6, comments: 0, saves: 0, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/p/DZdOGizgA3G/" },
    { id: 3, title: "Go Knicks — If You Survived Monday's Game", type: "Story", views: 133, reach: 92, likes: 4, comments: 4, saves: 0, shares: 5, isTop: false, igPostUrl: "" },
  ] as any[],
  contentMix: { posts: 60, reels: 19, stories: 21 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 2 }, { range: "25-34", pct: 21 }, { range: "35-44", pct: 37 },
      { range: "45-54", pct: 21 }, { range: "55-64", pct: 13 }, { range: "65+", pct: 7 },
    ],
  },
  viewerSplit: { followers: 76, nonFollowers: 24 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Reach normalized off the collab spike — owned authority content carried the week
  opportunities.push({
    title: "Authority Content Carried the Week",
    body: `Reach normalized to ${data.kpi.reach.value} accounts (−63.4% off last week's collaboration-Reel spike of 1,698) — but instead of a quiet week, an owned credential post did the lifting. "Dr. El Chaar Co-Authors Long-Term Study" (the Pinhole Surgical Technique 14.5-year case series) drew 922 IG views and 321 reach, extended further by its Facebook crosspost (1,249 combined). Posts led ${data.contentMix.posts}% of views with no new Reels published. Authority and publication content is EEC's organic engine — it converts the existing audience without paid or partner amplification.`,
    severity: "success"
  });

  const er = data.kpi.engagementRate.value;
  if (er >= 8) {
    insights.push({ title: `Engagement Rate Strong at ${er}%`, body: `${data.kpi.engagements.value} interactions against ${data.kpi.reach.value} accounts reached = ${er}% — well above the 5% healthcare benchmark. The publication post and the "Go Knicks" story carried it (the Knicks graphic alone drew 13 interactions — 4 likes, 4 replies, 5 shares). The catch: 79.5% of interactions came from existing followers. Reach is tight but the owned audience is highly engaged.`, severity: "success" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Posts Led the Format Mix",
    body: `${sortedMix[0].name} led at ${sortedMix[0].val}% of views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%). No new Reels were published this window — the ${data.contentMix.reels}% still attributed to Reels is residual from the Jun 4–5 collaboration episodes carrying over. Carousels and the publication post did the work this week; the 30-day view is still anchored by the "Why Authenticity Matters" collab Reel (2,251 views).`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves < 3) {
    alerts.push({ title: "Saves Remain Thin", body: `Only ${totalSaves} save${totalSaves === 1 ? "" : "s"} on owned content this week. Saves are the #1 algorithmic signal of lasting value — and the natural fit for EEC's authority positioning. Turn the clinical credibility into bookmark-worthy carousels ('5 Signs of a Failed Graft', 'What to Expect After a Sinus Lift') with a 'Save this before your consult' CTA.`, severity: "warning" });
  }

  // Reel publishing gap
  insights.push({
    title: "Reel Publishing Gap",
    body: `Zero new Reels published this window. The 30-day picture leans almost entirely on two carryover collaboration Reels (Jun 4–5) — once those age out, reach has nothing to replace them. Authority posts engage the existing audience well, but Reels are the only format that reliably reaches *new* accounts. A 2–3 Reel/week cadence is the lever to widen the funnel that the publication content is currently filling from the top.`,
    severity: "warning"
  });

  // Viewer split
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "Strong Discovery Signal", body: `${data.viewerSplit.nonFollowers}% of viewers are non-followers — the algorithm is distributing content to new audiences.`, severity: "success" });
  } else {
    insights.push({
      title: "Discovery Compression",
      body: `Views skewed ${data.viewerSplit.followers}% toward existing followers this window — discovery to new audiences is compressed without new Reels. Posts and stories circulate mostly within the follower graph; collaboration Reels are the proven reset (last week's pushed non-follower reach far wider). The owned audience is engaged — the next lever is widening it.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Brand-Search Dependency on Google", body: `Search Console (7-day): 61 clicks, 1,021 impressions, ~6% CTR. Every top query is a Dr. El Chaar name variant — the homepage alone took 49 clicks at 11.84% CTR. The clinical long-tail (accidentally-blew-nose, sinus-lift-recovery, is-gum-grafting-painful) earns impressions but ranks too low (pos 8–57) to convert. Those pages are the non-brand SEO upside — they need internal links and on-page work to climb.`, severity: "info" });

  insights.push({ title: "Mobile Outranks Desktop on Google", body: "GSC: Mobile ranks at position 5.1 vs Desktop at 16.5 — a ~3× ranking gap on the same content. Desktop still takes more clicks (39 vs 22) on higher impressions, but mobile is the stronger-ranking surface. Audit mobile Core Web Vitals and keep booking CTAs thumb-reachable.", severity: "info" });

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "slightly male" : "slightly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for implants, perio, and elective procedures, and a strong match for EEC's authority/credential content.`, severity: "success" });

  if (data.kpi.followers.change != null && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week (6 follows / 4 unfollows) from ${data.kpi.reach.value} reach. Modest, but in line with a no-Reel week — discovery, not engagement, is the constraint on growth.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Build on the authority play — the Co-Authors publication post was the week's anchor (922 IG views, +FB crosspost). Turn the practice's research and credentials into a recurring 'Publication / Case Study' content lane", priority: "high" },
    { text: "Rebuild Reel cadence — zero Reels shipped this week, and the 30-day reach leans entirely on two carryover collab Reels. Aim for 2–3/week so discovery doesn't collapse when they age out", priority: "high" },
    { text: "Line up the next NYC Dental Smiles collaboration Reel — the Jun 4 co-post (2,251 views / 1,267 reach) still anchors the 30-day window; the format is the proven reach lever", priority: "high" },
    { text: "Convert clinical SEO impressions to clicks — pages like accidentally-blew-nose and sinus-lift-recovery rank pos 8–57 with strong impressions. Internal links + title/meta work to push them onto page one", priority: "medium" },
    { text: "Create save-worthy authority carousels ('5 Signs of a Failed Graft', 'Sinus Lift Recovery, Day by Day') with a 'Save before your consult' CTA — saves stayed at 1 this week", priority: "medium" },
    { text: "Audit the website 404s — the 404 page is the #2 page by views (274 in 30d), pointing to broken internal links or stale redirects worth a crawl", priority: "low" },
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
    period: "June 8 – June 16, 2026", totalClicks: 64,
    topLinks: [{ path: "Homepage", clicks: 50 }, { path: "DDS-PC Midtown", clicks: 8 }, { path: "DDS-PC UES", clicks: 6 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 447 }, { source: "Tagged (UTM)", clicks: 185 }],
    topCountries: [{ country: "United States", clicks: 25 }, { country: "Finland", clicks: 2 }, { country: "Canada", clicks: 1 }],
    topCities: [{ city: "New York City", clicks: 9 }, { city: "Dallas", clicks: 5 }, { city: "Long Branch", clicks: 3 }, { city: "Tampa", clicks: 3 }],
    devices: [{ os: "Android", clicks: 146 }, { os: "Windows", clicks: 83 }, { os: "iOS", clicks: 80 }, { os: "Mac OS X", clicks: 50 }],
  };
  const linkData30d = {
    period: "May 16 – June 16, 2026", totalClicks: 211,
    topLinks: [{ path: "Homepage", clicks: 153 }, { path: "DDS-PC Midtown", clicks: 28 }, { path: "DDS-PC UES", clicks: 25 }, { path: "YouTube", clicks: 5 }],
    trafficSources: [{ source: "Direct / Untagged", clicks: 1429 }, { source: "Tagged (UTM)", clicks: 478 }],
    topCountries: [{ country: "United States", clicks: 65 }, { country: "Vietnam", clicks: 3 }, { country: "Canada", clicks: 2 }, { country: "Finland", clicks: 2 }],
    topCities: [{ city: "New York City", clicks: 16 }, { city: "Brooklyn", clicks: 10 }, { city: "Dallas", clicks: 7 }],
    devices: [{ os: "Mac OS X", clicks: 528 }, { os: "Windows", clicks: 505 }, { os: "Android", clicks: 159 }, { os: "iOS", clicks: 142 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "June 8 – June 14, 2026",
    sessions: 250,
    topPages: [
      { page: "/", label: "Home", views: 268 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 16 },
      { page: "/locations", label: "Locations", views: 8 },
      { page: "/upload-your-files", label: "Upload Your Files", views: 7 },
      { page: "/our-doctors", label: "Our Doctors", views: 6 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 5 },
      { page: "/contactus", label: "Contact Us", views: 3 },
      { page: "/covid-19-precautions", label: "COVID-19 Precautions", views: 3 },
      { page: "/guide-to-a-smooth-recovery", label: "Smooth Recovery Guide", views: 3 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 141, pct: 56.4 },
      { source: "Google", sessions: 99, pct: 39.6 },
      { source: "lbm-plesk (ref)", sessions: 3, pct: 1.2 },
      { source: "Bing", sessions: 2, pct: 0.8 },
      { source: "dentalintel (ref)", sessions: 2, pct: 0.8 },
      { source: "Other", sessions: 3, pct: 1.2 },
    ],
    devices: [
      { device: "Desktop", pct: 79.7 },
      { device: "Mobile", pct: 19.8 },
      { device: "Tablet", pct: 0.5 },
    ],
    dailyVisitors: [
      { date: "Jun 8", visitors: 25 },{ date: "Jun 9", visitors: 20 },
      { date: "Jun 10", visitors: 43 },{ date: "Jun 11", visitors: 37 },
      { date: "Jun 12", visitors: 28 },{ date: "Jun 13", visitors: 15 },
      { date: "Jun 14", visitors: 22 },
    ],
    search: {
      totalClicks: 61, totalImpressions: 1021, avgCTR: 5.97, avgPosition: 11.6,
      note: "7-day (Jun 7 – Jun 13)",
      topQueries: [
        { query: "edgard el chaar", clicks: 6, ctr: 24.00, position: 1.04 },
        { query: "edgar el chaar", clicks: 3, ctr: 13.64, position: 1.14 },
        { query: "edgard el chaar dds", clicks: 3, ctr: 42.86, position: 1.00 },
        { query: "dr el chaar", clicks: 2, ctr: 11.11, position: 2.17 },
        { query: "dr. el chaar", clicks: 2, ctr: 50.00, position: 1.00 },
      ],
      topPages: [
        { page: "Homepage", clicks: 49, impressions: 414, ctr: 11.84 },
        { page: "Doctors & Periodontists (UES)", clicks: 5, impressions: 80, ctr: 6.25 },
        { page: "Accidentally Blew Nose", clicks: 4, impressions: 295, ctr: 1.36 },
        { page: "Dry Socket with Bone Graft", clicks: 2, impressions: 22, ctr: 9.09 },
      ],
    },
  };
  const websiteData30d = {
    period: "May 16 – June 14, 2026",
    sessions: 1221,
    topPages: [
      { page: "/", label: "Home", views: 884 },
      { page: "/signs-of-failed-gum-graft", label: "Signs of Failed Gum Graft", views: 124 },
      { page: "/dry-socket-with-bone-graft", label: "Dry Socket with Bone Graft", views: 64 },
      { page: "/accidentally-blew-nose", label: "Accidentally Blew Nose", views: 60 },
      { page: "/doctors-and-periodontists", label: "Doctors & Periodontists", views: 56 },
      { page: "/dental-office-upper-east-side", label: "Dental Office UES", views: 35 },
      { page: "/how-painful-is-a-sinus-lift", label: "Sinus Lift Pain", views: 30 },
      { page: "/our-doctors", label: "Our Doctors", views: 27 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 27 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 625, pct: 51.2 },
      { source: "Google", sessions: 520, pct: 42.6 },
      { source: "Yahoo", sessions: 12, pct: 1.0 },
      { source: "Bing", sessions: 10, pct: 0.8 },
      { source: "DuckDuckGo", sessions: 10, pct: 0.8 },
      { source: "Instagram", sessions: 8, pct: 0.7 },
      { source: "Other", sessions: 36, pct: 2.9 },
    ],
    devices: [
      { device: "Desktop", pct: 69.8 },
      { device: "Mobile", pct: 29.5 },
      { device: "Tablet", pct: 0.7 },
    ],
    dailyVisitors: [
      { date: "May 16", visitors: 35 },{ date: "May 20", visitors: 82 },
      { date: "May 22", visitors: 5 },{ date: "May 28", visitors: 57 },
      { date: "Jun 1", visitors: 62 },{ date: "Jun 5", visitors: 35 },
      { date: "Jun 9", visitors: 30 },{ date: "Jun 11", visitors: 25 },
      { date: "Jun 13", visitors: 22 },
    ],
    search: {
      totalClicks: 61, totalImpressions: 1021, avgCTR: 5.97, avgPosition: 11.6,
      note: "7-day (Jun 7 – Jun 13)",
      topQueries: [
        { query: "edgard el chaar", clicks: 6, ctr: 24.00, position: 1.04 },
        { query: "edgar el chaar", clicks: 3, ctr: 13.64, position: 1.14 },
        { query: "edgard el chaar dds", clicks: 3, ctr: 42.86, position: 1.00 },
        { query: "dr el chaar", clicks: 2, ctr: 11.11, position: 2.17 },
        { query: "dr. el chaar", clicks: 2, ctr: 50.00, position: 1.00 },
      ],
      topPages: [
        { page: "Homepage", clicks: 49, impressions: 414, ctr: 11.84 },
        { page: "Doctors & Periodontists (UES)", clicks: 5, impressions: 80, ctr: 6.25 },
        { page: "Accidentally Blew Nose", clicks: 4, impressions: 295, ctr: 1.36 },
        { page: "Dry Socket with Bone Graft", clicks: 2, impressions: 22, ctr: 9.09 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of June 15, 2026)",
    totalEpisodes: 48, totalDownloads: 4730, periodDownloads: 3,
    last7Days: 3, last30Days: 91, last90Days: 431,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 301 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 184 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Web Browser", downloads: 91, pct: 46 },
      { name: "Apple Podcasts", downloads: 59, pct: 30 },
      { name: "Spotify", downloads: 21, pct: 11 },
      { name: "Unknown", downloads: 11, pct: 6 },
      { name: "Amazon Echo", downloads: 7, pct: 4 },
    ],
    topCountries: [
      { country: "United States", downloads: 117 },
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
    period: "June 8 – June 14, 2026",
    followers: 3142, followerGrowth: 2, follows: 6, unfollows: 4,
    totalViews: 2714, totalReach: 621, reachChange: -63.4, totalInteractions: 95,
    viewSplit: { followers: 76.3, nonFollowers: 23.7 },
    interactionSplit: { followers: 79.5, nonFollowers: 20.5 },
    viewsByType: { reels: 19.0, posts: 60.2, stories: 20.8 },
    interactionsByType: { reels: 20.5, posts: 44.3, stories: 35.2 },
    totalLikes: 65, totalComments: 8, totalSaves: 2, totalShares: 12,
    storyViews: 433, storyCompletion: 84, storyCount: 5,
    dailyViews: [
      { date: "Jun 8", views: 180 },{ date: "Jun 9", views: 720 },
      { date: "Jun 10", views: 540 },{ date: "Jun 11", views: 560 },
      { date: "Jun 12", views: 300 },{ date: "Jun 13", views: 240 },
      { date: "Jun 14", views: 174 },
    ],
    posts: [
      { id: 1, title: "Dr. El Chaar Co-Authors Long-Term Study · New Publication", type: "Post", date: "Jun 9", views: 922, reach: 321, likes: 23, comments: 2, saves: 1, shares: 0, er: 8.1, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZYJANtGV5f/", isTop: true },
      { id: 2, title: "Technology Spotlight — Advanced Technology, Precision Care", type: "Post", date: "Jun 11", views: 394, reach: 160, likes: 6, comments: 0, saves: 0, shares: 1, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZdOGizgA3G/", isTop: false },
      { id: 3, title: "Go Knicks — If You Survived Monday's Game", type: "Story", date: "Jun 10", views: 133, reach: 92, likes: 4, comments: 4, saves: 0, shares: 5, er: 14.1, skipRate: 0, avgWatch: "", igUrl: "", isTop: false },
    ],
  };
  const socialData30d = {
    period: "May 15 – June 15, 2026",
    followers: 3142, followerGrowth: 8, follows: 14, unfollows: 6,
    totalViews: 9169, totalReach: 3643, reachChange: 0, totalInteractions: 270,
    viewSplit: { followers: 55, nonFollowers: 45 },
    interactionSplit: { followers: 62, nonFollowers: 38 },
    viewsByType: { reels: 36, posts: 46, stories: 18 },
    interactionsByType: { reels: 57, posts: 32, stories: 11 },
    totalLikes: 195, totalComments: 30, totalSaves: 8, totalShares: 22,
    storyViews: 1693, storyCompletion: 85, storyCount: 18,
    dailyViews: [
      { date: "May 16", views: 493 },{ date: "May 20", views: 694 },
      { date: "May 28", views: 924 },{ date: "Jun 4", views: 2251 },
      { date: "Jun 5", views: 579 },{ date: "Jun 9", views: 922 },
      { date: "Jun 11", views: 394 },{ date: "Jun 14", views: 200 },
    ],
    posts: [
      { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 4", views: 2251, reach: 1267, likes: 89, comments: 25, saves: 3, shares: 11, er: 10.1, skipRate: 62, avgWatch: "10s", igUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/", isTop: true },
      { id: 2, title: "Meet Dr. Cinzia Dinoi", type: "Carousel", date: "May 28", views: 924, reach: 360, likes: 16, comments: 0, saves: 0, shares: 0, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY5XLhUGYzB/", isTop: false },
      { id: 3, title: "Dr. El Chaar Co-Authors Long-Term Study", type: "Carousel", date: "Jun 9", views: 922, reach: 321, likes: 23, comments: 2, saves: 1, shares: 0, er: 8.1, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZYJANtGV5f/", isTop: false },
      { id: 4, title: "Dental Implants Start Long Before the Final Result", type: "Carousel", date: "May 20", views: 694, reach: 271, likes: 10, comments: 0, saves: 1, shares: 1, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DYkP-F3GeWK/", isTop: false },
      { id: 5, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 5", views: 579, reach: 406, likes: 14, comments: 0, saves: 0, shares: 2, er: 3.9, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZOF7qTBswB/", isTop: false },
      { id: 6, title: "What Makes Something Unforgettable?", type: "Reel", date: "May 16", views: 493, reach: 324, likes: 8, comments: 0, saves: 0, shares: 1, er: 2.8, skipRate: 63, avgWatch: "", igUrl: "https://www.instagram.com/reel/DYZ85IxBmlp/", isTop: false },
      { id: 7, title: "Complex Cases Require Expert Care", type: "Carousel", date: "May 30", views: 480, reach: 201, likes: 8, comments: 2, saves: 1, shares: 1, er: 6.0, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DY9yNAWgEuT/", isTop: false },
      { id: 8, title: "Technology Spotlight — Advanced Technology, Precision Care", type: "Carousel", date: "Jun 11", views: 394, reach: 160, likes: 6, comments: 0, saves: 0, shares: 1, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZdOGizgA3G/", isTop: false },
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
                  <div className="exec-col-body">Reach normalized to {d.kpi.reach.value.toLocaleString()} accounts (&minus;63.4% off last week&rsquo;s collaboration-Reel spike of 1,698) — but the week wasn&rsquo;t quiet. An owned credential post, &ldquo;Dr. El Chaar Co-Authors Long-Term Study&rdquo; (the Pinhole Surgical Technique 14.5-year case series), carried it: 922 IG views and 321 reach, extended further by its Facebook crosspost (1,249 combined). Views skewed {d.viewerSplit.followers}% to existing followers — no new Reels meant discovery stayed within the follower graph.</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% ER with {d.kpi.engagements.value} interactions against {d.kpi.reach.value} reach — well above the 5% healthcare benchmark, though 79.5% came from existing followers. The publication post and the &ldquo;Go Knicks&rdquo; story drove it (the Knicks graphic alone: 13 interactions — 4 likes, 4 replies, 5 shares). Follower growth +{d.kpi.followers.change} net (6 follows, 4 unfollows). 35&ndash;54 = 58% of the audience.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Posts led views at {d.contentMix.posts}% — no new Reels published this week (the {d.contentMix.reels}% Reel share is carryover from the Jun 4&ndash;5 collab episodes). {socialData.storyCount} Story frames ran at {socialData.storyCompletion}% completion. GSC (7-day): 61 clicks, brand-search heavy, with the clinical long-tail (sinus-lift, gum-graft pages) earning impressions but ranking too low to convert. The takeaway: authority content engages the owned audience; Reels are the missing lever to widen it.</div>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "64 attributed human clicks over 7 days across named destinations — Homepage 50, DDS-PC Midtown 8, DDS-PC UES 6 (the /* wildcard at 383 and data-center/bot traffic excluded). Booking-link clicks (Midtown + UES = 14) are the conversion signal worth watching. Click volume spiked Jun 9–10, aligning with the publication post and Knicks story, though most raw volume that day was bot traffic on the wildcard." : "211 attributed human clicks across named destinations over 30 days — Homepage 153, DDS-PC Midtown 28, DDS-PC UES 25, YouTube 5 (/* wildcard at 1,212 and bot traffic excluded). The two booking links are near-even (Midtown 28 / UES 25). Geo this cycle was heavily data-center/bot (City of London, Doha, Frankfurt); cities shown are cleaned to real human traffic — NYC and Brooklyn lead. No DDS-PC links appeared in the NYCDS export, so nothing merged in."} severity="info" />
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "250 sessions Jun 8–14. Direct 56.4% (141), Google 39.6% (99) on a desktop-heavy week (Desktop 79.7%, Mobile 19.8%). Home drew 268 landing views; clinical pages (doctors-and-periodontists, accidentally-blew-nose) trail. Search (7-day, Jun 7–13): 61 clicks from 1,021 impressions, ~6% CTR, avg position ~12 — every top query is a Dr. El Chaar name variant, and the homepage took 49 of 61 clicks. Mobile ranks far better than desktop (pos 5.1 vs 16.5)." : "1,221 sessions over 30 days. Direct 51.2% (625), Google 42.6% (520). Desktop 69.8%, Mobile 29.5%. Beyond Home, the clinical long-tail is the SEO engine — Signs of Failed Gum Graft (124), Dry Socket with Bone Graft (64), Accidentally Blew Nose (60), Sinus Lift Pain (30) all pull real landing traffic. ⚠ The 404 page is the #2 page by views (274) — a likely broken-link/redirect issue worth a crawl. Search remains brand-dominant; the clinical pages rank too low (pos 8–57) to convert their impressions."} severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Views concentrated Jun 9–11 as the Co-Authors publication post and Knicks story landed — the clearest publish-day lift of the week. No new Reels ran. (Daily shape modeled from posting cadence; native daily-views export pending.)" : "⚡ The Jun 4 Authenticity collab Reel (2,251 IG views) still anchors the 30-day window, with the May 28 Cinzia Dinoi carousel (924) and Jun 9 publication post (922) behind it. Reels drive the month's reach; once the carryover collabs age out, cadence is the gap."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ Posts and Stories drove interactions this week (44% / 35%) — no new Reels ran. The Knicks story's reply/share burst lifted the Stories share." : "✦ Reels drive ~57% of interactions over 30 days — the dominant engagement format, carried by the Jun 4–5 collab episodes"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ 76% of views from existing followers — with no new Reels, discovery stayed within the follower graph. Reels are the lever to widen it." : "✦ ~45% of views from non-followers over 30 days — the carryover collab Reels kept distribution reaching new audiences"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Just 2 saves and 12 shares this week — saves remain the biggest lever, and the natural fit for EEC's authority content (turn credentials into save-worthy carousels)" : "▲ 8 saves and 22 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "2,714 views reaching 621 accounts (−63.4% WoW as reach normalized off last week's collaboration spike). 95 interactions at 15.3% ER — well above the 5% benchmark, but 79.5% from existing followers and 76% of views from followers. No new Reels or collabs ran. The week's anchor was owned authority content: 'Dr. El Chaar Co-Authors Long-Term Study' (922 IG views / 321 reach, 1,249 incl. the Facebook crosspost), with the 'Go Knicks' story driving the engagement burst (13 interactions). Net follower growth +2 (6 follows, 4 unfollows)." : "9,169 content views across the May 15 – Jun 15 window (account-level totals estimated from content exports — native 30-day Insights held). Top performer: the Jun 4 'Why Authenticity Matters' collab Reel — 2,251 IG views, 1,267 reach, 10.1% ER. The May 28 Cinzia Dinoi carousel (924) and Jun 9 publication post (922) follow. Reels account for ~36% of views from just three posts — the discovery engine, all carryover from the Jun 4–5 collabs."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "Reach normalized as expected after the collaboration spike — but EEC didn't go quiet. An owned credential post (the Pinhole Surgical Technique 14.5-year study) carried the week at 922 IG views, extended by its Facebook crosspost, and engagement held strong at 15.3%. What's working: authority and publication content engages the owned audience deeply, and the practice's research output is a renewable content lane. What's not: with no new Reels, discovery stayed inside the follower graph (76% of views) and reach has no engine to widen it. Two levers: (1) productize the authority content into a recurring publication/case-study lane, and (2) rebuild a 2–3 Reel/week cadence — the only format that reliably reaches new accounts." : "The 30-day arc shows the dependency clearly: reach leans almost entirely on two carryover collaboration Reels (Jun 4–5). When they age out, there's nothing behind them. Authority posts and carousels engage the existing audience well — the publication post and Cinzia Dinoi feature both performed — but they circulate within the follower graph. The NYC Dental Smiles collaboration format remains the standout reach lever. Cadence is the constraint: pairing renewable authority content with a steady Reel schedule is how EEC turns deep engagement into audience growth."} severity="success" />
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
              <InsightCard title="Podcast Intelligence" body="4,730 all-time downloads across 48 episodes — 270 to the 5K milestone, 2 episodes to the 50-ep badge. Velocity is low and softening: 3 downloads last 7 days, 91 last 30, 431 last 90 (down from 470 the prior cycle). The catalog leans on evergreen clinical episodes — Allograft w/ Dr. Brad McAllister (301), Future of Dental Industry w/ Aurelio Sahagun–Straumann (195), and the Periodontal Diagnosis series (194 / 184). Web Browser leads listening at 46% — unusual for podcasts, suggesting site/embed plays outpace dedicated apps. Apple Podcasts 30%, Spotify 11%. NYC metro leads cities (New York 29, Brooklyn 8). With no new episode this cycle, downloads are coasting on the back catalog — a fresh release is the lever to restart momentum." severity="success" />
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
