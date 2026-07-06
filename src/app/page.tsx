"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "June 29 – July 5, 2026" },
  kpi: {
    followers: { value: 3157, change: 10, label: "Followers" },
    reach: { value: 4620, label: "Reach" },
    views: { value: 28770, label: "Total Views" },
    engagementRate: { value: 11.5, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 529, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Choosing a Postgraduate Program (Carousel)", type: "Post", views: 444, reach: 248, likes: 16, comments: 0, saves: 0, shares: 1, isTop: true, igPostUrl: "https://www.instagram.com/p/DaTSj0UhvIf/" },
    { id: 2, title: "Every Treatment Recommendation Should Have a Reason (Carousel)", type: "Post", views: 342, reach: 161, likes: 5, comments: 0, saves: 0, shares: 1, isTop: false, igPostUrl: "https://www.instagram.com/p/DaTRVEzBnzZ/" },
    { id: 3, title: "Are You a Walking Dental Red Flag? (Carousel)", type: "Post", views: 308, reach: 117, likes: 3, comments: 0, saves: 0, shares: 0, isTop: false, igPostUrl: "https://www.instagram.com/p/DaVi6rVmbUW/" },
  ] as any[],
  contentMix: { posts: 73, reels: 0, stories: 27 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 30, nonFollowers: 70 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Collab Reel reopened discovery — reach and views recovered
  opportunities.push({
    title: "A Paid Campaign Drove a Breakout Reach Week",
    body: `Account reach ran ${data.kpi.reach.value.toLocaleString()} (Metricool avg. reach/day of 660 × 7; +260% WoW) and views hit ${data.kpi.views.value.toLocaleString()} — a step-change from last week's 5,781. But this is paid: owned organic content topped out at 444 views (the postgraduate-program carousel), so the surge came from a boost campaign (paid Instagram + Facebook also drove ~141 website sessions this week). ~70% of views and ~69% of reach were non-followers. No Reel published again — the second reel-less week. Reach is the Metricool avg-reach-per-day basis (the Profile Growth CSV is retired). The paid push bought a big discovery window; the lever is converting it to follows/saves before it closes, and lining up a collab Reel to reopen organic discovery.`,
    severity: "info"
  });

  const er = data.kpi.engagementRate.value;
  if (er >= 8) {
    insights.push({ title: `Engagement Rate ${er}% — Real, but Paid-Lifted`, body: `${data.kpi.engagements.value} accounts engaged against ${data.kpi.reach.value.toLocaleString()} reached = ${er}% — above the 5% healthcare benchmark, but read it with the paid context: a boost campaign drove reach and engagement up together this week (engaged accounts rose roughly 10× from 55). Account-level counts per the locked rule. The engagement is genuine but rented; the durable signals to chase are saves (0 on owned posts) and follows (+10 net). Pair the paid window with a collab Reel and save-CTAs to bank lasting value from it.`, severity: "success" });
  } else {
    insights.push({ title: `Engagement Rate Normalized to ${er}%`, body: `${data.kpi.engagements.value} account-level interactions against ${data.kpi.reach.value.toLocaleString()} accounts reached = ${er}% (account-level counts per the locked rule).`, severity: "info" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Carousels Were the Owned Output — Distribution Was Paid",
    body: `${sortedMix[0].name} led at ${sortedMix[0].val}% of published-content views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%) — with no Reel published again this window. Three carousels (1,094 combined organic views) and five Stories (412 views) were the owned output; the account's ${data.kpi.views.value.toLocaleString()} views were overwhelmingly paid distribution. The 30-day view is anchored by the Jun 15 concierge collab Reel and a heavily-boosted carousel — collaboration Reels and paid remain the reach engines, which is why two straight reel-less weeks is a gap to close.`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves < 3) {
    alerts.push({ title: "Zero Saves Despite Huge Reach", body: `Just ${totalSaves} save${totalSaves === 1 ? "" : "s"} on owned content this week — across all three carousels, despite a paid reach window of ${data.kpi.reach.value.toLocaleString()}. Saves are the #1 algorithmic signal of lasting value and the natural fit for EEC's authority positioning. The boost put content in front of thousands of non-followers; converting even a fraction into saved, bookmark-worthy carousels ('5 Signs of a Failed Graft', 'What to Expect After a Sinus Lift') with a 'Save this before your consult' CTA is how you turn rented reach into durable signal.`, severity: "warning" });
  }

  // Reel cadence
  insights.push({
    title: "No Reel Again — The Cadence Gap",
    body: `Zero Reels published again — the second reel-less week in a row. Paid distribution carried account reach to ${data.kpi.reach.value.toLocaleString()} this week, but that's bought, not earned: Reels are the organic format that reaches new accounts, and the NYC Dental Smiles collab Reels are EEC's proven engine (the Jun 15 concierge Reel still anchors the 30-day window). A 2–3 Reel/week cadence would make organic reach repeatable instead of leaning on paid boosts and whichever carousel gets promoted. The next collab Reel is the highest-leverage thing on the calendar.`,
    severity: "warning"
  });

  // Viewer split
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "A Paid-Bought Discovery Window", body: `${data.viewerSplit.nonFollowers}% of viewers were non-followers this week and ~69% of reach was non-follower — the boost campaign pushed content well outside the follower graph. That's a genuine discovery window, but paid-bought: the challenge is capturing it. Follow-prompts, booking-link stickers and save-CTAs on the boosted creative convert borrowed reach into owned audience before the campaign ends.`, severity: "success" });
  } else {
    opportunities.push({
      title: "Discovery Narrowed Without a Reel",
      body: `Non-follower share was an estimated ${data.viewerSplit.nonFollowers}% of views this week — follower-heavy, as expected on a reel-less week (the account's June native split runs ~39% non-follower, and that includes the Jun 4/5/15 collab Reels). With no Reel to push distribution outside the follower graph, discovery leaned on existing followers. The collaboration Reel is the proven reset to widen it again — it's the single highest-leverage item on the calendar.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Brand-Search Dependency on Google", body: `Fresh GSC this cycle (edgardelchaar.com, Jun 26–Jul 4): 47 clicks on 492 impressions at 9.55% CTR, avg position 11.1. Every top query is a Dr. El Chaar name variant — "dr el chaar" leads (7 clicks, 23% CTR, pos 1.8) and the homepage takes 42 clicks at 11.3% CTR. The clinical long-tail ranks too low to convert: "types of bone graft" sat at position 59.6 and "is gum grafting painful" at 70.9 — impressions but zero clicks. Those pages are the non-brand SEO upside — internal links and on-page work to climb.`, severity: "info" });

  insights.push({ title: "Mobile Outranks Desktop on Google", body: "GSC (Jun 26–Jul 4): Mobile ranks at position 3.9 vs Desktop at 14.8 — a ~3.8× ranking advantage on the same content, though Desktop still takes more clicks (31 vs 16). Mobile is by far the stronger-ranking surface; the upside is converting those better-ranked mobile impressions. Audit mobile Core Web Vitals and keep booking CTAs thumb-reachable.", severity: "info" });

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "slightly male" : "slightly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for implants, perio, and elective procedures, and a strong match for EEC's authority/credential content.`, severity: "success" });

  if (data.kpi.followers.change != null && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week from a ${data.kpi.reach.value.toLocaleString()}-account paid reach window. A big boosted-discovery week converted only +10 follows — the paid reach didn't translate into roster growth. A clear follow CTA on the boosted creative, plus a collab Reel for organic pull, is how a reach spike turns into followers.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Capture the paid reach before it fades — the boost campaign put EEC in front of thousands of non-followers this week. Layer follow-prompts, booking-link stickers and save-CTAs directly on the boosted creative so rented reach converts to owned audience and consults", priority: "high" },
    { text: "Get a Reel back on the calendar — two straight reel-less weeks. Line up the next NYC Dental Smiles collab episode; it's the organic reach engine that doesn't cost media spend", priority: "high" },
    { text: "Build toward a 2–3 Reel/week cadence so organic reach is repeatable, not dependent on paid boosts or whichever carousel gets promoted", priority: "high" },
    { text: "Convert clinical SEO impressions to clicks — 'types of bone graft' and 'is gum grafting painful' rank at position 60–71 with impressions but zero clicks. Internal links + title/meta work to push them toward page one", priority: "medium" },
    { text: "Create save-worthy authority carousels ('5 Signs of a Failed Graft', 'Sinus Lift Recovery, Day by Day') with a 'Save before your consult' CTA — 0 saves this week despite the reach", priority: "medium" },
    { text: "Refresh a Buzzsprout episode — podcast downloads ticked up (17 last 7 days vs 8) but the catalog coasts on evergreen back-episodes; a new release restarts momentum", priority: "low" },
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
    period: "June 29 – July 5, 2026", totalClicks: 83,
    topLinks: [{ path: "Homepage", clicks: 34 }, { path: "DDS-PC Midtown", clicks: 5 }, { path: "DDS-PC UES", clicks: 4 }, { path: "Instagram", clicks: 2 }, { path: "YouTube", clicks: 1 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 83 }, { source: "Bot / datacenter (excluded)", clicks: 591 }],
    topCountries: [{ country: "United States", clicks: 55 }, { country: "Finland", clicks: 2 }, { country: "Canada", clicks: 1 }],
    topCities: [{ city: "New York City", clicks: 3 }, { city: "Helsinki", clicks: 2 }, { city: "Bellmore", clicks: 1 }],
    devices: [{ os: "Windows", clicks: 104 }, { os: "iOS", clicks: 37 }, { os: "Mac OS X", clicks: 12 }],
  };
  const linkData30d = {
    period: "June 6 – July 5, 2026", totalClicks: 907,
    topLinks: [{ path: "Homepage", clicks: 162 }, { path: "DDS-PC Midtown", clicks: 21 }, { path: "DDS-PC UES", clicks: 17 }, { path: "Instagram", clicks: 6 }, { path: "YouTube", clicks: 1 }],
    trafficSources: [{ source: "Human clicks", clicks: 907 }, { source: "Bot / datacenter (excluded)", clicks: 2211 }],
    topCountries: [{ country: "United States", clicks: 90 }, { country: "Finland", clicks: 4 }, { country: "Canada", clicks: 2 }],
    topCities: [{ city: "New York City", clicks: 15 }, { city: "Brooklyn", clicks: 8 }],
    devices: [{ os: "Windows", clicks: 590 }, { os: "Mac OS X", clicks: 359 }, { os: "iOS", clicks: 167 }, { os: "Android", clicks: 154 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "June 29 – July 5, 2026",
    sessions: 464,
    topPages: [
      { page: "/", label: "Home", views: 240 },
      { page: "/locations", label: "Locations", views: 170 },
      { page: "/about", label: "About", views: 17 },
      { page: "/our-doctors", label: "Our Doctors", views: 9 },
      { page: "/all-on-6-dental-implants", label: "All-on-6 Implants", views: 5 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 210, pct: 45.3 },
      { source: "Instagram (paid)", sessions: 87, pct: 18.8 },
      { source: "Google", sessions: 77, pct: 16.6 },
      { source: "Facebook (paid)", sessions: 54, pct: 11.6 },
      { source: "Facebook (ref)", sessions: 14, pct: 3.0 },
      { source: "Other", sessions: 22, pct: 4.7 },
    ],
    devices: [
      { device: "Desktop", pct: 58.6 },
      { device: "Mobile", pct: 41.4 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jun 29", visitors: 43 },{ date: "Jun 30", visitors: 51 },
      { date: "Jul 1", visitors: 34 },{ date: "Jul 2", visitors: 73 },
      { date: "Jul 3", visitors: 73 },{ date: "Jul 4", visitors: 69 },
      { date: "Jul 5", visitors: 64 },
    ],
    search: {
      totalClicks: 47, totalImpressions: 492, avgCTR: 9.55, avgPosition: 11.1,
      note: "GSC Jun 26 – Jul 4 (edgardelchaar.com)",
      topQueries: [
        { query: "dr el chaar", clicks: 7, ctr: 23.33, position: 1.80 },
        { query: "edgard el chaar", clicks: 3, ctr: 18.75, position: 1.00 },
        { query: "dr. edgard el chaar", clicks: 2, ctr: 50.00, position: 1.00 },
        { query: "dr edgard el chaar", clicks: 1, ctr: 10.00, position: 1.10 },
        { query: "edgar el chaar", clicks: 1, ctr: 10.00, position: 1.60 },
      ],
      topPages: [
        { page: "Homepage", clicks: 42, impressions: 373, ctr: 11.26 },
        { page: "Doctors & Periodontists (UES)", clicks: 4, impressions: 69, ctr: 5.80 },
        { page: "Accessibility Statement", clicks: 1, impressions: 6, ctr: 16.67 },
        { page: "Locations", clicks: 0, impressions: 73, ctr: 0.00 },
      ],
    },
  };
  const websiteData30d = {
    period: "June 6 – July 5, 2026",
    sessions: 1198,
    topPages: [
      { page: "/", label: "Home", views: 1064 },
      { page: "/locations", label: "Locations", views: 195 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Doctors (UES)", views: 35 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 30 },
      { page: "/accidentally-blew-nose-after-sinus-lift", label: "Accidentally Blew Nose", views: 22 },
      { page: "/our-doctors", label: "Our Doctors", views: 21 },
      { page: "/about", label: "About", views: 14 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 654, pct: 54.6 },
      { source: "Google", sessions: 334, pct: 27.9 },
      { source: "Instagram (paid)", sessions: 87, pct: 7.3 },
      { source: "Facebook (paid)", sessions: 57, pct: 4.8 },
      { source: "Facebook (ref)", sessions: 10, pct: 0.8 },
      { source: "Other", sessions: 56, pct: 4.7 },
    ],
    devices: [
      { device: "Desktop", pct: 72.3 },
      { device: "Mobile", pct: 27.6 },
      { device: "Tablet", pct: 0.1 },
    ],
    dailyVisitors: [
      { date: "Jun 6", visitors: 42 },{ date: "Jun 11", visitors: 31 },
      { date: "Jun 16", visitors: 28 },{ date: "Jun 21", visitors: 22 },
      { date: "Jun 26", visitors: 40 },{ date: "Jun 30", visitors: 51 },
      { date: "Jul 2", visitors: 73 },{ date: "Jul 5", visitors: 66 },
    ],
    search: {
      totalClicks: 47, totalImpressions: 492, avgCTR: 9.55, avgPosition: 11.1,
      note: "GSC Jun 26 – Jul 4 (edgardelchaar.com; full 30-day GSC not exported)",
      topQueries: [
        { query: "dr el chaar", clicks: 7, ctr: 23.33, position: 1.80 },
        { query: "edgard el chaar", clicks: 3, ctr: 18.75, position: 1.00 },
        { query: "dr. edgard el chaar", clicks: 2, ctr: 50.00, position: 1.00 },
        { query: "dr edgard el chaar", clicks: 1, ctr: 10.00, position: 1.10 },
        { query: "edgar el chaar", clicks: 1, ctr: 10.00, position: 1.60 },
      ],
      topPages: [
        { page: "Homepage", clicks: 42, impressions: 373, ctr: 11.26 },
        { page: "Doctors & Periodontists (UES)", clicks: 4, impressions: 69, ctr: 5.80 },
        { page: "Accessibility Statement", clicks: 1, impressions: 6, ctr: 16.67 },
        { page: "Locations", clicks: 0, impressions: 73, ctr: 0.00 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of July 5, 2026)",
    totalEpisodes: 49, totalDownloads: 4786, periodDownloads: 17,
    last7Days: 17, last30Days: 61, last90Days: 375,
    topEpisodes: [
      { title: "Allograft & Evolution – Dr. Brad McAllister (S5 E3)", downloads: 302 },
      { title: "Future of Dental Industry – Aurelio Sahagun, Straumann (S4 E2)", downloads: 195 },
      { title: "Periodontal Diagnosis – Gingivitis (S1 E2)", downloads: 194 },
      { title: "Periodontal Diagnosis – Periodontitis (S1 E3)", downloads: 185 },
      { title: "Oral and Systemic Health (E1)", downloads: 172 },
    ],
    platforms: [
      { name: "Spotify", downloads: 1191, pct: 25 },
      { name: "Web Browser", downloads: 1066, pct: 22 },
      { name: "Apple Podcasts", downloads: 1055, pct: 22 },
      { name: "Buzzsprout Site", downloads: 406, pct: 8 },
      { name: "iVoox", downloads: 333, pct: 7 },
    ],
    topCountries: [
      { country: "United States", downloads: 3090 },
      { country: "Canada", downloads: 141 },
      { country: "India", downloads: 139 },
      { country: "Germany", downloads: 125 },
      { country: "Russian Federation", downloads: 113 },
    ],
    topCities: [
      { city: "New York", downloads: 407 },
      { city: "Brooklyn", downloads: 123 },
      { city: "Queens", downloads: 90 },
      { city: "Frankfurt", downloads: 86 },
      { city: "Philadelphia", downloads: 62 },
    ],
  };

  const socialData7d = {
    period: "June 29 – July 5, 2026",
    followers: 3157, followerGrowth: 10, follows: 10, unfollows: 0,
    totalViews: 28770, totalReach: 4620, reachChange: 260.1, totalInteractions: 529,
    viewSplit: { followers: 30, nonFollowers: 70 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 0, posts: 73, stories: 27 },
    interactionsByType: { reels: 0, posts: 100, stories: 0 },
    totalLikes: 24, totalComments: 1, totalSaves: 0, totalShares: 2,
    storyViews: 412, storyCompletion: 86, storyCount: 5,
    dailyViews: [
      { date: "Jun 29", views: 800 },{ date: "Jun 30", views: 3500 },
      { date: "Jul 1", views: 4200 },{ date: "Jul 2", views: 5500 },
      { date: "Jul 3", views: 6800 },{ date: "Jul 4", views: 4200 },
      { date: "Jul 5", views: 3770 },
    ],
    posts: [
      { id: 1, title: "Choosing a Postgraduate Program (Carousel)", type: "Post", date: "Jul 5", views: 444, reach: 248, likes: 16, comments: 0, saves: 0, shares: 1, er: 6.9, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaTSj0UhvIf/", isTop: true },
      { id: 2, title: "Every Treatment Recommendation Should Have a Reason (Carousel)", type: "Post", date: "Jul 2", views: 342, reach: 161, likes: 5, comments: 0, saves: 0, shares: 1, er: 3.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaTRVEzBnzZ/", isTop: false },
      { id: 3, title: "Are You a Walking Dental Red Flag? (Carousel)", type: "Post", date: "Jul 3", views: 308, reach: 117, likes: 3, comments: 0, saves: 0, shares: 0, er: 3.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaVi6rVmbUW/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "June 6 – July 5, 2026",
    followers: 3157, followerGrowth: 13, follows: 25, unfollows: 12,
    totalViews: 39790, totalReach: 9480, reachChange: 235.8, totalInteractions: 649,
    viewSplit: { followers: 33, nonFollowers: 67 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 8, posts: 86, stories: 6 },
    interactionsByType: { reels: 8, posts: 86, stories: 6 },
    totalLikes: 160, totalComments: 4, totalSaves: 3, totalShares: 14,
    storyViews: 1375, storyCompletion: 86, storyCount: 18,
    dailyViews: [
      { date: "Jun 6", views: 200 },{ date: "Jun 11", views: 540 },
      { date: "Jun 15", views: 1795 },{ date: "Jun 22", views: 350 },
      { date: "Jun 27", views: 1300 },{ date: "Jul 1", views: 4200 },
      { date: "Jul 3", views: 6800 },{ date: "Jul 5", views: 3770 },
    ],
    posts: [
      { id: 1, title: "Plot Twist: Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 15", views: 1795, reach: 1033, likes: 27, comments: 1, saves: 1, shares: 2, er: 3.0, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/", isTop: true },
      { id: 2, title: "Get to Know the Faces Behind Your Care — Team", type: "Post", date: "Jun 26", views: 1423, reach: 476, likes: 33, comments: 0, saves: 0, shares: 2, er: 7.6, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaD2rTCGS6T/", isTop: false },
      { id: 3, title: "NEW EPISODE — Postgraduate Dentistry (Podcast Promo)", type: "Post", date: "Jun 27", views: 1319, reach: 553, likes: 20, comments: 0, saves: 1, shares: 4, er: 4.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaEBGU2Bh1J/", isTop: false },
      { id: 4, title: "New Publication Spotlight", type: "Post", date: "Jun 9", views: 1071, reach: 366, likes: 28, comments: 0, saves: 0, shares: 2, er: 8.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZYJANtGV5f/", isTop: false },
      { id: 5, title: "Learning Never Stops — Provider Education", type: "Post", date: "Jun 18", views: 594, reach: 242, likes: 6, comments: 0, saves: 0, shares: 1, er: 2.9, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZvOtJXBsn2/", isTop: false },
      { id: 6, title: "Always Looking for Ways to Improve Care", type: "Post", date: "Jun 11", views: 539, reach: 199, likes: 9, comments: 0, saves: 0, shares: 1, er: 5.0, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZdOGizgA3G/", isTop: false },
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
                  <div className="exec-col-body">Account reach ran {d.kpi.reach.value.toLocaleString()} (avg. reach/day &times; 7; +260% WoW) and views hit {d.kpi.views.value.toLocaleString()} on a week with <em>no Reel</em> — but this is <em>paid</em>. Owned organic content topped out at 444 views (the postgraduate-program carousel), so the surge came from a boost campaign (paid IG + FB also drove ~141 website sessions). An estimated {d.viewerSplit.nonFollowers}% of views and ~69% of reach were non-followers. Reach is the Metricool avg-reach-per-day basis (Profile Growth CSV retired).</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% blended ER with {d.kpi.engagements.value} accounts engaged against {d.kpi.reach.value.toLocaleString()} reach — above the 5% benchmark, but paid-lifted: the boost drove reach and engagement up together (engaged accounts rose ~10&times; from 55). The durable signals lagged: 0 saves on owned posts and only +{d.kpi.followers.change} net follows. With no Reel, 100% of owned interactions came from carousels. 35&ndash;54 = 58% of the audience.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Owned output was three carousels ({d.contentMix.posts}% of published views) and {socialData.storyCount} Stories — no Reel again. Fresh GSC (edgardelchaar.com, Jun 26–Jul 4): 47 clicks at 9.55% CTR, position 11, entirely Dr. El Chaar brand terms; the clinical long-tail (bone graft, gum grafting) ranks at 60–71 with impressions but no clicks. The takeaway: a paid boost bought big reach this week, but the collab Reel — the organic discovery engine — needs to come back to make it repeatable.</div>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>▲ Discovery was wide but paid-bought this week (~70% non-follower) — the boost pushed reach outside the follower graph; capturing it is the gap</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={timeRange === "7d" ? "83 human clicks over 7 days across named destinations — Homepage 34, DDS-PC Midtown 5, DDS-PC UES 4, Instagram 2, YouTube 1 (the /* wildcard at 37 and bot/datacenter traffic excluded; EEC domain total 674 clicks, 83 human). Booking-link clicks (Midtown + UES = 9) are the conversion signal worth watching. ✓ DDS-PC merge checked: no legible DDS-PC-Midtown/UES clicks on the NYCDS ShortIO export this week (below the visible cutoff), so the merge added 0. Geo/device panels are carried from the prior pull (ShortIO summary + path-level only this cycle)." : "907 human clicks across named destinations over 30 days — Homepage 162, DDS-PC Midtown 21, DDS-PC UES 17, Instagram 6, YouTube 1 (EEC domain total 3,118; bot/datacenter excluded). The two booking links are near-even (Midtown 21 / UES 17). ✓ DDS-PC merge applied; no legible DDS-PC clicks on the NYCDS export at 30 days either. Geo/device panels carried from the prior pull (ShortIO summary + path-level only this cycle)."} severity="info" />
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "464 sessions Jun 29–Jul 5 (up sharply on the paid push). Direct 45.3% (210), then paid — Instagram 18.8% (87), Google 16.6% (77), Facebook 11.6% (54); desktop 58.6% / mobile 41.4%. Home drew 240 landing views, Locations 170. Fresh GSC (edgardelchaar.com, Jun 26–Jul 4): 47 clicks at 9.55% CTR, position 11, entirely Dr. El Chaar brand terms — homepage takes 42 clicks at 11.3% CTR." : "1,198 sessions over 30 days. Direct 54.6% (654), Google 27.9% (334), then paid IG 7.3% (87) and FB 4.8% (57). Desktop 72.3%, Mobile 27.6%. Beyond Home (1,064), Locations (195), Doctors-UES (35) and the gum-grafting / sinus-lift clinical pages lead. GSC (Jun 26–Jul 4): 47 clicks, 9.55% CTR — brand-dominant; clinical long-tail (bone graft, gum grafting) ranks pos 60–71 with impressions but no clicks."} severity="info" />
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "▲ Account views surged Jul 2–3 as a paid boost campaign ramped — organic content topped out at 444 views, so the ~28.8K account total is overwhelmingly paid distribution. (Daily shape is estimated — the account-view series isn't exported now that the Profile Growth CSV is retired.)" : "⚡ The Jun 15 concierge collab Reel (1,795 IG views) and a heavily-boosted carousel anchor the 30-day window; the late-June/early-July paid push drove the account-view spike. Collab Reels and paid remain the month's reach engines — the gap is two straight weeks with no new Reel."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{timeRange === "7d" ? "✦ With no Reel this week, 100% of owned interactions came from carousels — but the 529 account-level engaged accounts were largely lifted by the paid boost, not organic content." : "✦ Posts drive ~86% of interactions over 30 days — feed carousels and a boosted post dominate; the lone Jun 15 collab Reel is the only Reel in the window"}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{timeRange === "7d" ? "✦ ~70% of views from non-followers this week — the paid boost pushed distribution well outside the follower graph; the challenge is converting that borrowed reach to follows/saves." : "✦ ~67% of views from non-followers over 30 days — paid distribution and the collab Reel keep reaching new audiences"}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{timeRange === "7d" ? "▲ Zero saves and just 2 shares this week — despite a huge paid reach window. Saves remain the biggest lever and the natural fit for EEC's authority content; convert the boosted visibility into save-worthy carousels" : "▲ 3 saves and 14 shares over 30 days — bookmark-worthy formats remain the engagement lever to grow"}</span>
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "28,770 account views reaching ~4,620 (avg. reach/day × 7; +260% WoW) with 529 accounts engaged at 11.5% blended ER — a breakout week, but paid-driven. Owned organic content was modest: three carousels (top: the postgraduate-program carousel, 444 views) and five Stories, no Reel again. A boost campaign drove the ~28.8K account views and the reach/engagement surge (paid IG + FB also sent ~141 website sessions). ~70% of views were non-followers. The paid window is a real opportunity — but saves stayed at 0 and net follows were +10, so converting rented reach to owned signal is the gap. Reach uses the Metricool avg-reach-per-day basis." : "39,790 account views reaching ~9,480 (avg. reach/day × 30) with 649 accounts engaged across Jun 6 – Jul 5, lifted heavily by the late-June/early-July paid push. Top organic performers: the Jun 15 concierge collab Reel (1,795 IG views, 1,033 reach) and the 'Get to Know the Faces' team post (1,423 / 476). Posts drove ~86% of interactions; ~67% of views were non-followers. Paid and the collab Reel remain the month's reach engines — the gap is two straight weeks with no new organic Reel."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "A paid-driven breakout week. A boost campaign pushed account reach to ~4,620 (+260% WoW), views to 28.8K and engaged accounts to 529 (11.5% blended ER) — real numbers, but bought: owned organic content topped out at 444 views and no Reel shipped again. What's working: paid put EEC in front of ~2,900 non-followers and lifted engagement with it; the podcast ticked up (17 downloads last 7 days vs 8). What's not: the paid reach converted to just +10 follows and 0 saves, and there's still no collab Reel driving organic discovery. Two levers: (1) layer follow/booking/save CTAs onto the boosted creative to capture the paid window before it closes, and (2) get the next NYC Dental Smiles collab Reel on the calendar so reach is earned, not only rented." : "The 30-day arc: reach is now built on two engines — the NYC Dental Smiles collaboration Reels (the Jun 15 concierge Reel anchors this window) and paid boosts, which together drive most discovery, while authority posts and carousels engage the existing audience. This month made the reliance on paid visible — a late push drove the account-view spike, but organic Reel cadence went quiet for two straight weeks. The strategy that works is in the data: collab Reels and paid open the funnel, authority content deepens it. The constraint is pairing them consistently — a steady collab + credential cadence, with paid amplifying rather than replacing organic, is how EEC turns reach into durable engagement and growth."} severity="success" />
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
              <InsightCard title="Podcast Intelligence" body="4,786 all-time downloads across 49 episodes — 214 to the 5K milestone, 1 episode to the 50-ep badge. Velocity ticked up this cycle: 17 downloads last 7 days (vs 8), 61 last 30, 375 last 90. The catalog leans on evergreen clinical episodes — Allograft w/ Dr. Brad McAllister (302), Future of Dental Industry w/ Aurelio Sahagun–Straumann (195), and the Periodontal Diagnosis series (194 / 185). Listening is split across Spotify 25%, Web Browser 22% and Apple Podcasts 22% — the strong Web share suggests site/embed plays outpace typical podcasts. NYC metro leads cities (New York 407, Brooklyn 123). No new episode this cycle — the recent uptick coasts on the back catalog; a fresh release is the lever to sustain it." severity="success" />
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
