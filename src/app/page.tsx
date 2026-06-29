"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "June 22 – June 28, 2026" },
  kpi: {
    followers: { value: 3147, change: 3, label: "Followers" },
    reach: { value: 1283, label: "Reach" },
    views: { value: 5781, label: "Total Views" },
    engagementRate: { value: 4.3, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 55, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Get to Know the Faces Behind Your Care — Team", type: "Post", views: 1135, reach: 378, likes: 29, comments: 0, saves: 0, shares: 2, isTop: true, igPostUrl: "https://www.instagram.com/p/DaD2rTCGS6T/" },
    { id: 2, title: "NEW EPISODE — Postgraduate Dentistry (Podcast Promo)", type: "Post", views: 892, reach: 431, likes: 14, comments: 0, saves: 1, shares: 4, isTop: false, igPostUrl: "https://www.instagram.com/p/DaEBGU2Bh1J/" },
    { id: 3, title: "Going to the Dentist Is About More Than a Cleaning", type: "Post", views: 418, reach: 201, likes: 11, comments: 0, saves: 0, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/p/DaBZMU8RkpO/" },
  ] as any[],
  contentMix: { posts: 82, reels: 0, stories: 18 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 62, nonFollowers: 38 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Collab Reel reopened discovery — reach and views recovered
  opportunities.push({
    title: "Posts Held Reach — Even Without a Reel",
    body: `Reach held at ${data.kpi.reach.value.toLocaleString()} accounts (+8.5% WoW) and views climbed to ${data.kpi.views.value.toLocaleString()} (native daily) on a week with no Reel at all — the first reel-less window in over a month. The lift came from feed posts: the "Get to Know the Faces" team post (1,135 views / 378 reach) and the "NEW EPISODE — Postgraduate Dentistry" podcast promo (892 / 431) carried distribution, with a big discovery day Jun 27 (2,335 views). That owned content held reach is the encouraging signal — but the proven reach engine, the NYC Dental Smiles collab Reel, sat idle this cycle. Lining up the next collab is the lever to push reach beyond steady.`,
    severity: "info"
  });

  const er = data.kpi.engagementRate.value;
  if (er >= 8) {
    insights.push({ title: `Engagement Rate Strong at ${er}%`, body: `${data.kpi.engagements.value} interactions against ${data.kpi.reach.value} accounts reached = ${er}% — well above the 5% healthcare benchmark.`, severity: "success" });
  } else {
    insights.push({ title: `Engagement Rate Normalized to ${er}%`, body: `${data.kpi.engagements.value} native account interactions against ${data.kpi.reach.value.toLocaleString()} accounts reached = ${er}% (native-IG counts per the locked rule). Roughly in line with last week's 5.1%, on a reel-less week where feed posts held reach. The team post led interactions (29) and the podcast promo added 15; the third post was lighter (11). Saves stayed at 1 across all content. The reach is intact without a Reel — the next lever is bringing the collab Reel back to widen discovery and pairing it with these authority posts to deepen engagement.`, severity: "info" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Posts Carried the Week",
    body: `${sortedMix[0].name} led at ${sortedMix[0].val}% of views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%) — with no Reel published this window. Three feed posts (2,445 combined views) and five Stories (527 views) carried distribution. The 30-day view is still anchored by the Jun 4 "Why Authenticity Matters" and Jun 15 concierge collab Reels — the collaboration series remains the heavy lifter on reach, which is exactly why a reel-less week is a gap to close.`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves < 3) {
    alerts.push({ title: "Saves Remain Thin", body: `Just ${totalSaves} save${totalSaves === 1 ? "" : "s"} on owned content this week — on the podcast-promo post. Saves are the #1 algorithmic signal of lasting value, and the natural fit for EEC's authority positioning. The posts held reach; now convert that visibility into saved, bookmark-worthy carousels ('5 Signs of a Failed Graft', 'What to Expect After a Sinus Lift') with a 'Save this before your consult' CTA.`, severity: "warning" });
  }

  // Reel cadence
  insights.push({
    title: "No Reel This Week — The Cadence Gap",
    body: `Zero Reels published this window — the first reel-less week in over a month. Feed posts held reach (1,283) admirably, but Reels are the format that reaches new accounts, and last cycle's single collab moved reach sharply. A 2–3 Reel/week cadence (mixing the NYC Dental Smiles podcast collabs with owned clinical Reels) would make reach repeatable rather than depending on whichever feed post catches. The next collab Reel is the highest-leverage thing on the calendar.`,
    severity: "warning"
  });

  // Viewer split
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "Strong Discovery Signal", body: `${data.viewerSplit.nonFollowers}% of viewers are non-followers — the algorithm is distributing content to new audiences.`, severity: "success" });
  } else {
    opportunities.push({
      title: "Discovery Narrowed Without a Reel",
      body: `Non-follower share was an estimated ${data.viewerSplit.nonFollowers}% of views this week — follower-heavy, as expected on a reel-less week (the account's June native split runs ~39% non-follower, and that includes the Jun 4/5/15 collab Reels). With no Reel to push distribution outside the follower graph, discovery leaned on existing followers. The collaboration Reel is the proven reset to widen it again — it's the single highest-leverage item on the calendar.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Brand-Search Dependency on Google", body: `GSC was not re-exported for EEC this cycle, so these carry from the prior 30-day pull: 309 clicks, 16,104 impressions, 1.92% CTR. Every top query is a Dr. El Chaar name variant — "el chaar dentist" converts at 58% CTR, and the homepage takes 170 clicks at 10.4% CTR. The clinical long-tail earns enormous impressions but ranks too low to convert: "periodontal therapy/treatment" pulled ~1,300 impressions at position 76–79. Those pages are the non-brand SEO upside — internal links and on-page work to climb (refresh the GSC export next cycle to track).`, severity: "info" });

  insights.push({ title: "Mobile Outranks Desktop on Google", body: "GSC (carried — not re-exported this cycle): Mobile ranks at position 14.1 vs Desktop at 34.9 — a ~2.5× ranking gap on the same content, with mobile taking more clicks (156 vs 149). Mobile is the stronger-ranking surface. Audit mobile Core Web Vitals and keep booking CTAs thumb-reachable.", severity: "info" });

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "slightly male" : "slightly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for implants, perio, and elective procedures, and a strong match for EEC's authority/credential content.`, severity: "success" });

  if (data.kpi.followers.change != null && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week from ${data.kpi.reach.value.toLocaleString()} reach. Posts held reach but converted few new follows — discovery views didn't translate into follows. A consistent Reel cadence plus a clear follow CTA is how steady reach turns into roster growth.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Get a Reel back on the calendar — zero shipped this week. Line up the next NYC Dental Smiles collab episode now; it's the single most reliable reach lever and the cadence gap is the week's main story", priority: "high" },
    { text: "Lean into the podcast-promo and team posts that held reach — the 'Get to Know the Faces' team post (1,135 views) and the 'Postgraduate Dentistry' episode promo (892) carried the week. Provider-led, educational and behind-the-scenes content resonates; keep weighting the owned calendar that way", priority: "high" },
    { text: "Build toward a 2–3 Reel/week cadence so reach is repeatable, not dependent on whichever feed post catches — this reel-less week is the concentration risk made visible", priority: "high" },
    { text: "Convert clinical SEO impressions to clicks — periodontal-therapy and all-on-6 pages pull thousands of impressions at position 76–79. Internal links + title/meta work to push them toward page one (refresh the GSC export next cycle)", priority: "medium" },
    { text: "Create save-worthy authority carousels ('5 Signs of a Failed Graft', 'Sinus Lift Recovery, Day by Day') with a 'Save before your consult' CTA — saves stayed at 1 this week", priority: "medium" },
    { text: "Audit the website 404s — the 404 page is again a top page by views (237 in 30d), pointing to broken internal links or stale redirects worth a crawl", priority: "low" },
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
    period: "June 22 – June 28, 2026", totalClicks: 45,
    topLinks: [{ path: "Homepage", clicks: 32 }, { path: "DDS-PC Midtown", clicks: 4 }, { path: "DDS-PC UES", clicks: 2 }, { path: "Instagram", clicks: 1 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 45 }, { source: "Bot / datacenter (excluded)", clicks: 444 }],
    topCountries: [{ country: "United States", clicks: 55 }, { country: "Finland", clicks: 2 }, { country: "Canada", clicks: 1 }],
    topCities: [{ city: "New York City", clicks: 3 }, { city: "Helsinki", clicks: 2 }, { city: "Bellmore", clicks: 1 }],
    devices: [{ os: "Windows", clicks: 104 }, { os: "iOS", clicks: 37 }, { os: "Mac OS X", clicks: 12 }],
  };
  const linkData30d = {
    period: "May 30 – June 28, 2026", totalClicks: 1259,
    topLinks: [{ path: "Homepage", clicks: 183 }, { path: "DDS-PC Midtown", clicks: 23 }, { path: "DDS-PC UES", clicks: 19 }, { path: "YouTube", clicks: 4 }, { path: "Instagram", clicks: 4 }],
    trafficSources: [{ source: "Human clicks", clicks: 1259 }, { source: "Bot / datacenter (excluded)", clicks: 2166 }],
    topCountries: [{ country: "United States", clicks: 90 }, { country: "Finland", clicks: 4 }, { country: "Canada", clicks: 2 }],
    topCities: [{ city: "New York City", clicks: 15 }, { city: "Brooklyn", clicks: 8 }],
    devices: [{ os: "Windows", clicks: 590 }, { os: "Mac OS X", clicks: 359 }, { os: "iOS", clicks: 167 }, { os: "Android", clicks: 154 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "June 22 – June 28, 2026",
    sessions: 190,
    topPages: [
      { page: "/", label: "Home", views: 267 },
      { page: "/locations", label: "Locations", views: 15 },
      { page: "/our-doctors", label: "Our Doctors", views: 12 },
      { page: "/404", label: "404 Page", views: 37 },
      { page: "/dental-service/yomi-by-neocis", label: "Yomi by Neocis", views: 3 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 95, pct: 50.0 },
      { source: "Google", sessions: 73, pct: 38.4 },
      { source: "(not set)", sessions: 8, pct: 4.2 },
      { source: "Other", sessions: 14, pct: 7.4 },
    ],
    devices: [
      { device: "Desktop", pct: 75.8 },
      { device: "Mobile", pct: 24.2 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jun 22", visitors: 20 },{ date: "Jun 23", visitors: 19 },
      { date: "Jun 24", visitors: 19 },{ date: "Jun 25", visitors: 33 },
      { date: "Jun 26", visitors: 26 },{ date: "Jun 27", visitors: 12 },
      { date: "Jun 28", visitors: 13 },
    ],
    search: {
      totalClicks: 36, totalImpressions: 723, avgCTR: 4.98, avgPosition: 14.4,
      note: "carried — GSC not re-exported for EEC this cycle",
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
    period: "May 30 – June 28, 2026",
    sessions: 1072,
    topPages: [
      { page: "/", label: "Home", views: 1100 },
      { page: "/our-doctors", label: "Our Doctors", views: 40 },
      { page: "/accidentally-blew-nose-after-sinus-lift", label: "Accidentally Blew Nose", views: 36 },
      { page: "/locations", label: "Locations", views: 31 },
      { page: "/404", label: "404 Page", views: 237 },
      { page: "/about", label: "About", views: 24 },
      { page: "/contactus", label: "Contact Us", views: 16 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 653, pct: 61.4 },
      { source: "Google", sessions: 355, pct: 33.4 },
      { source: "(not set)", sessions: 12, pct: 1.1 },
      { source: "Other", sessions: 52, pct: 4.9 },
    ],
    devices: [
      { device: "Desktop", pct: 80.8 },
      { device: "Mobile", pct: 18.9 },
      { device: "Tablet", pct: 0.3 },
    ],
    dailyVisitors: [
      { date: "May 30", visitors: 28 },{ date: "Jun 3", visitors: 41 },
      { date: "Jun 8", visitors: 35 },{ date: "Jun 13", visitors: 30 },
      { date: "Jun 18", visitors: 31 },{ date: "Jun 22", visitors: 20 },
      { date: "Jun 25", visitors: 33 },{ date: "Jun 28", visitors: 13 },
    ],
    search: {
      totalClicks: 309, totalImpressions: 16104, avgCTR: 1.92, avgPosition: 25.8,
      note: "carried — GSC not re-exported for EEC this cycle",
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
    period: "All Time (as of June 29, 2026)",
    totalEpisodes: 49, totalDownloads: 4770, periodDownloads: 32,
    last7Days: 32, last30Days: 63, last90Days: 394,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 302 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 185 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Spotify", downloads: 1183, pct: 25 },
      { name: "Web Browser", downloads: 1065, pct: 22 },
      { name: "Apple Podcasts", downloads: 1051, pct: 22 },
      { name: "Buzzsprout Site", downloads: 406, pct: 9 },
      { name: "iVoox", downloads: 333, pct: 7 },
    ],
    topCountries: [
      { country: "United States", downloads: 3079 },
      { country: "Canada", downloads: 141 },
      { country: "India", downloads: 139 },
      { country: "Germany", downloads: 125 },
      { country: "Russian Federation", downloads: 113 },
    ],
    topCities: [
      { city: "New York", downloads: 406 },
      { city: "Brooklyn", downloads: 123 },
      { city: "Queens", downloads: 90 },
      { city: "Frankfurt", downloads: 86 },
      { city: "Philadelphia", downloads: 62 },
    ],
  };

  const socialData7d = {
    period: "June 22 – June 28, 2026",
    followers: 3147, followerGrowth: 3, follows: 3, unfollows: 0,
    totalViews: 5781, totalReach: 1283, reachChange: 8.5, totalInteractions: 55,
    viewSplit: { followers: 62, nonFollowers: 38 },
    interactionSplit: { followers: 69.2, nonFollowers: 30.8 },
    viewsByType: { reels: 0, posts: 82, stories: 18 },
    interactionsByType: { reels: 0, posts: 100, stories: 0 },
    totalLikes: 54, totalComments: 0, totalSaves: 1, totalShares: 7,
    storyViews: 527, storyCompletion: 86, storyCount: 5,
    dailyViews: [
      { date: "Jun 22", views: 346 },{ date: "Jun 23", views: 403 },
      { date: "Jun 24", views: 320 },{ date: "Jun 25", views: 220 },
      { date: "Jun 26", views: 601 },{ date: "Jun 27", views: 2335 },
      { date: "Jun 28", views: 1556 },
    ],
    posts: [
      { id: 1, title: "Get to Know the Faces Behind Your Care — Team", type: "Post", date: "Jun 26", views: 1135, reach: 378, likes: 29, comments: 0, saves: 0, shares: 2, er: 7.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaD2rTCGS6T/", isTop: true },
      { id: 2, title: "NEW EPISODE — Postgraduate Dentistry (Podcast Promo)", type: "Post", date: "Jun 27", views: 892, reach: 431, likes: 14, comments: 0, saves: 1, shares: 4, er: 3.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaEBGU2Bh1J/", isTop: false },
      { id: 3, title: "Going to the Dentist Is About More Than a Cleaning", type: "Post", date: "Jun 25", views: 418, reach: 201, likes: 11, comments: 0, saves: 0, shares: 1, er: 5.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaBZMU8RkpO/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "Jun 1 – June 28, 2026",
    followers: 3147, followerGrowth: 11, follows: 23, unfollows: 12,
    totalViews: 15345, totalReach: 2823, reachChange: -0.4, totalInteractions: 456,
    viewSplit: { followers: 60.9, nonFollowers: 39.1 },
    interactionSplit: { followers: 69, nonFollowers: 31 },
    viewsByType: { reels: 39.7, posts: 45.0, stories: 15.3 },
    interactionsByType: { reels: 49.9, posts: 32.4, stories: 17.7 },
    totalLikes: 360, totalComments: 35, totalSaves: 8, totalShares: 24,
    storyViews: 527, storyCompletion: 86, storyCount: 5,
    dailyViews: [
      { date: "May 30", views: 468 },{ date: "Jun 4", views: 2321 },
      { date: "Jun 5", views: 634 },{ date: "Jun 9", views: 1014 },
      { date: "Jun 15", views: 1634 },{ date: "Jun 22", views: 346 },
      { date: "Jun 27", views: 2335 },{ date: "Jun 28", views: 1556 },
    ],
    posts: [
      { id: 1, title: "Why Authenticity Matters · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 4", views: 2360, reach: 1297, likes: 90, comments: 25, saves: 3, shares: 12, er: 10.0, skipRate: 62, avgWatch: "10s", igUrl: "https://www.instagram.com/reel/DZK-h6ZAO_d/", isTop: true },
      { id: 2, title: "Plot Twist: Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 15", views: 1775, reach: 1026, likes: 26, comments: 1, saves: 1, shares: 2, er: 2.9, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/", isTop: false },
      { id: 3, title: "Get to Know the Faces Behind Your Care — Team", type: "Post", date: "Jun 26", views: 1135, reach: 378, likes: 29, comments: 0, saves: 0, shares: 2, er: 7.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaD2rTCGS6T/", isTop: false },
      { id: 4, title: "NEW EPISODE — Postgraduate Dentistry (Podcast Promo)", type: "Post", date: "Jun 27", views: 892, reach: 431, likes: 14, comments: 0, saves: 1, shares: 4, er: 3.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaEBGU2Bh1J/", isTop: false },
      { id: 5, title: "Is Dentistry Losing Its Soul? · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 5", views: 667, reach: 436, likes: 15, comments: 0, saves: 0, shares: 2, er: 3.9, skipRate: 69, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZOF7qTBswB/", isTop: false },
      { id: 6, title: "Going to the Dentist Is About More Than a Cleaning", type: "Post", date: "Jun 25", views: 418, reach: 201, likes: 11, comments: 0, saves: 0, shares: 1, er: 5.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaBZMU8RkpO/", isTop: false },
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
                  <div className="exec-col-body">Reach held at {d.kpi.reach.value.toLocaleString()} accounts (+8.5% WoW) and views climbed to {d.kpi.views.value.toLocaleString()} (native daily) on a week with <em>no Reel at all</em>. Feed posts carried it: the &ldquo;Get to Know the Faces&rdquo; team post (1,135 views / 378 reach) and the &ldquo;Postgraduate Dentistry&rdquo; episode promo (892 / 431), with a big discovery day Jun 27 (2,335 views). Non-follower share is an estimated {d.viewerSplit.nonFollowers}% of views (carried — split not separately re-exported).</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% ER with {d.kpi.engagements.value} native interactions against {d.kpi.reach.value.toLocaleString()} reach — roughly in line with last week&rsquo;s 5.1%, on a reel-less week where feed posts held reach. The team post led interactions (29 likes), the podcast promo added shares and the lone save. With no Reel, 100% of interactions came from feed posts. Follower growth +{d.kpi.followers.change} net. 35&ndash;54 = 58% of the audience.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Posts led views at {d.contentMix.posts}% with no Reel this window — three feed posts (2,445 combined views) and {socialData.storyCount} Stories (527 views) carried the week. GSC was not re-exported for EEC this cycle (carried 30-day: 309 clicks, brand-search heavy, clinical long-tail ranking too low to convert). The takeaway: posts held reach this week, but the collab Reel — the proven discovery engine — needs to come back to push it higher.</div>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>▲ Discovery was follower-heavy this week (~38% non-follower est.) — no Reel to push outside the follower graph</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "45 attributed human clicks over 7 days across named destinations — Homepage 32, DDS-PC Midtown 4, DDS-PC UES 2, Instagram 1 (the /* wildcard at 7 and bot/datacenter traffic excluded; EEC domain total was 489 clicks, only 45 human). Booking-link clicks (Midtown + UES = 6) are the conversion signal worth watching. ✓ DDS-PC merge checked: no DDS-PC-Midtown/UES clicks appeared on the NYCDS Short.io export this week, so the merge added 0. Geo/device panels are carried from the prior pull (only path-level clicks re-exported this cycle)." : "1,259 attributed human clicks across named destinations over 30 days — Homepage 183, DDS-PC Midtown 23, DDS-PC UES 19, YouTube 4, Instagram 4 (EEC domain total 3,425; bot/datacenter excluded). The two booking links are near-even (Midtown 23 / UES 19). ✓ DDS-PC merge applied; no DDS-PC clicks on the NYCDS export at 30 days either. Geo/device panels carried from the prior pull (path-level only re-exported this cycle)."} severity="info" />
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
                { label: "Top Source", value: timeRange === "7d" ? "Direct (50.0%)" : "Direct (61.4%)", delay: 160 },
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "190 sessions Jun 22–28. Direct 50.0% (95), Google 38.4% (73); desktop 75.8% / mobile 24.2%. Home drew 267 landing views; the 404 page (37) and Our Doctors / Locations followed. ⚠ The 404 page is again a top page by views — a likely broken-link/redirect issue worth a crawl. Search panels are carried — GSC was not re-exported for EEC this cycle." : "1,072 sessions over 30 days. Direct 61.4% (653), Google 33.4% (355). Desktop 80.8%, Mobile 18.9%. Beyond Home (1,100), Our Doctors (40), Accidentally Blew Nose (36) and Locations (31) lead. ⚠ The 404 page is again a top page by views (237) — a likely broken-link/redirect issue worth a crawl. Search panels carried — GSC not re-exported this cycle (prior 30-day: 309 clicks, 16,104 impr, 1.92% CTR; periodontal-therapy pages rank pos 76–79)."} severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Views surged Jun 27 and Jun 28 (2,335 and 1,556) as the team post and the Postgraduate-Dentistry episode promo accrued distribution — feed posts carried the week with no Reel published. (Daily series from the Profile Growth & Discovery export.)" : "⚡ The Jun 4 Authenticity collab Reel (2,360 IG views) and the Jun 15 concierge Reel anchor the 30-day window, with this week's team post (1,135) and podcast promo (892) behind them. Collab Reels still drive the month's reach — this week's gap was no new Reel."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ With no Reel this week, 100% of interactions came from feed posts — the team post and podcast promo led. The reach held, but the collab Reel that usually carries engagement was absent." : "✦ Reels still drive ~55% of interactions over 30 days — the dominant engagement format, carried by the NYC Dental Smiles collab episodes"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ An estimated 38% of views from non-followers this week — follower-heavy on a reel-less week (the account's June native split runs ~39% non-follower). Feed posts held discovery without a Reel." : "✦ ~48% of views from non-followers over 30 days — the collab Reels keep distribution reaching new audiences"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Just 1 save and 7 shares this week — saves remain the biggest lever, and the natural fit for EEC's authority content. Posts held reach; convert that visibility into save-worthy carousels" : "▲ 8 saves and 24 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Posts and Stories carried the week. Toggle to 30-day to see the Jun 4–15 collaboration Reels that anchor the broader window.</div>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "5,781 native account views reaching 1,283 accounts (+8.5% WoW) — held without a Reel. 55 native interactions at 4.3% ER, roughly in line with last week's 5.1%. The week's engine was feed posts: the 'Get to Know the Faces' team post (1,135 views / 378 reach, 29 likes) and the 'Postgraduate Dentistry' podcast promo (892 / 431). The third post was lighter (418). A big discovery day Jun 27 (2,335 views) carried the totals. Saves stayed at 1 across all content — the CTA/save layer is the gap, and the absent collab Reel is the reach gap. Net follower growth +3." : "15,345 native account views reaching 2,823 accounts across the Jun 1 – Jun 28 month, with 456 interactions (69% from followers). Top performers: the Jun 4 'Why Authenticity Matters' collab Reel (2,360 IG views, 1,297 reach, 10.0% ER) and the Jun 15 concierge collab Reel (1,775 / 1,026). This week's team post (1,135) and podcast promo (892) follow. The collab Reels remain the clear discovery engine — and this week's gap was the absence of a new one."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "A reel-less week — and the posts held the line. With no Reel published, feed content still held reach at 1,283 (+8.5% WoW): the team post (1,135 views) and the podcast-episode promo (892) carried distribution, and ER held at 4.3%. What's working: provider-led, behind-the-scenes and podcast-promo posts reach the existing audience well, and the podcast itself logged 32 downloads this week. What's not: the NYC Dental Smiles collab Reel — EEC's proven discovery engine — sat idle, so reach held but didn't grow, and saves stayed at 1. Two levers: (1) get the next collab Reel on the calendar to reopen discovery beyond the follower graph, and (2) pair it with these authority posts so reach converts to engagement." : "The 30-day arc is clear: reach is built on the NYC Dental Smiles collaboration Reels (Jun 4 and Jun 15), which drive most of the month's discovery, while authority posts and carousels engage the existing audience but circulate within the follower graph. This week made the dependency visible — with no new Reel, reach held on posts but didn't expand. The strategy that works is in the data: collab Reels open the funnel, authority content deepens it. The constraint is pairing them consistently — a steady collab + credential cadence is how EEC turns reach into durable engagement and growth."} severity="success" />
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
