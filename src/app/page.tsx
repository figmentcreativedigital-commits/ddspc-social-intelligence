"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "July 6 – July 12, 2026" },
  kpi: {
    followers: { value: 3177, change: 17, label: "Followers" },
    reach: { value: 8253, label: "Reach" },
    views: { value: 11850, label: "Total Views" },
    engagementRate: { value: 1.6, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 130, label: "Engagements" },
    watchTime: { value: "—", label: "Watch Time" },
  },
  posts: [
    { id: 1, title: "Your Smile Is Just One Part of Your Health · Dr. Dinoi (Reel)", type: "Reel", views: 1202, reach: 928, likes: 23, comments: 0, saves: 1, shares: 1, isTop: true, igPostUrl: "https://www.instagram.com/reel/DalQX81hr1D/" },
    { id: 2, title: "The Best Care Goes Beyond the Procedure (Reel)", type: "Reel", views: 328, reach: 207, likes: 14, comments: 0, saves: 0, shares: 0, isTop: false, igPostUrl: "https://www.instagram.com/reel/DankehjhoQC/" },
    { id: 3, title: "Not Every Patient Journey Is Straightforward (Reel)", type: "Reel", views: 303, reach: 223, likes: 7, comments: 0, saves: 0, shares: 0, isTop: false, igPostUrl: "https://www.instagram.com/reel/DaqQKdKBa-_/" },
  ] as any[],
  contentMix: { posts: 0, reels: 86, stories: 14 },
  audience: {
    gender: { male: 52, female: 48 },
    age: [
      { range: "18-24", pct: 1.6 }, { range: "25-34", pct: 21.1 }, { range: "35-44", pct: 36.6 },
      { range: "45-54", pct: 21.3 }, { range: "55-64", pct: 12.8 }, { range: "65+", pct: 6.5 },
    ],
  },
  viewerSplit: { followers: 18, nonFollowers: 82 },
};

type ReportData = typeof FALLBACK_DATA;

function generateInsights(data: ReportData) {
  const insights: { title: string; body: string; severity: string }[] = [];
  const opportunities: typeof insights = [];
  const recommendations: { text: string; priority: string }[] = [];
  const alerts: typeof insights = [];

  // Collab Reel reopened discovery — reach and views recovered
  opportunities.push({
    title: "Reels Are Back — Reach Held Its Paid-Lifted High",
    body: `Account reach ran ${data.kpi.reach.value.toLocaleString()} (Metricool avg. reach/day of 1,179 × 7; +79% WoW off last week's 4,620) even as total views normalized to ${data.kpi.views.value.toLocaleString()} from last week's paid-inflated 28,770. The healthy shift this week: three Reels returned to the calendar (zero feed posts), led by the Jul 9 "Your Smile Is Just One Part of Your Health" Reel with Dr. Dinoi (1,202 organic views, 928 reach). Paid distribution is still running underneath — ~${data.viewerSplit.nonFollowers}% of views were non-followers, and paid IG + FB drove ~363 website sessions this month. Reach is the Metricool avg-reach-per-day basis (Profile Growth CSV retired). Ending two straight reel-less weeks is the win; the lever now is holding a 2–3 Reel/week cadence and converting the wide paid-and-reel discovery window into follows and saves.`,
    severity: "success"
  });

  const er = data.kpi.engagementRate.value;
  if (er >= 8) {
    insights.push({ title: `Engagement Rate ${er}% — Real, but Paid-Lifted`, body: `${data.kpi.engagements.value} accounts engaged against ${data.kpi.reach.value.toLocaleString()} reached = ${er}% — above the 5% healthcare benchmark. Account-level counts per the locked rule. The durable signals to chase are saves and net follows; pair the reach window with a collab Reel and save-CTAs to bank lasting value from it.`, severity: "success" });
  } else {
    insights.push({ title: `Blended ER Compressed to ${er}% — a Reach Story, Not an Engagement Drop`, body: `${data.kpi.engagements.value} accounts engaged against ${data.kpi.reach.value.toLocaleString()} reached = ${er}% blended (account-level counts per the locked rule). The low headline is the denominator, not the content: paid ad reach nearly doubled the reach base this week, which mechanically compresses a blended rate. Organic per-content ER is healthy underneath — the three Reels ran 2.7–6.8% organic ER (the Jul 10 Reel hit 6.8%), in line with the ~3–5% healthcare benchmark. Read blended ER alongside that organic signal rather than on its own.`, severity: "info" });
  }

  // Adaptive content-mix language (sorts to find leader)
  const sortedMix = [
    { name: "Posts", val: data.contentMix.posts },
    { name: "Reels", val: data.contentMix.reels },
    { name: "Stories", val: data.contentMix.stories },
  ].sort((a, b) => b.val - a.val);
  insights.push({
    title: "Reels Were the Owned Output This Week",
    body: `${sortedMix[0].name} led at ${sortedMix[0].val}% of published-content views, followed by ${sortedMix[1].name} (${sortedMix[1].val}%) and ${sortedMix[2].name} (${sortedMix[2].val}%) — a full flip from the carousel-only prior week, with no feed posts published this window. Three Reels (1,833 combined organic views) and four Stories (287 impressions) were the owned output; the account's ${data.kpi.views.value.toLocaleString()} total views still carry a large paid layer on top. The 30-day view is anchored by the Jun 15 concierge collab Reel — collaboration and personal-care Reels are the organic reach engine, and getting three out this week is exactly the cadence to keep.`,
    severity: "info"
  });

  const totalSaves = data.posts.reduce((s, p) => s + p.saves, 0);
  if (totalSaves < 3) {
    alerts.push({ title: "Saves Still the Missing Signal", body: `Just ${totalSaves} save${totalSaves === 1 ? "" : "s"} on owned content this week — across all three Reels, despite a reach window of ${data.kpi.reach.value.toLocaleString()}. Saves are the #1 algorithmic signal of lasting value and the natural fit for EEC's authority positioning. Reach reached thousands of non-followers this week; converting even a fraction into saved, bookmark-worthy content — a save-CTA on the personal-care Reels, or authority carousels like '5 Signs of a Failed Graft' and 'What to Expect After a Sinus Lift' with a 'Save this before your consult' prompt — is how you turn wide reach into durable signal.`, severity: "warning" });
  }

  // Reel cadence
  insights.push({
    title: "Reels Returned — Cadence Restored",
    body: `Three Reels shipped this week, ending two straight reel-less weeks. Reels are the organic format that reaches new accounts, and they carried the owned output here: the Jul 9 "Your Smile" Reel with Dr. Dinoi (1,202 views, 928 reach) led, with two more personal-care Reels behind it. Paid distribution still lifts account reach to ${data.kpi.reach.value.toLocaleString()}, but the earned layer is back underneath it. The job now is to hold this 2–3 Reel/week cadence — and line up the next NYC Dental Smiles collab Reel (the Jun 15 concierge Reel still anchors the 30-day window) to widen discovery further.`,
    severity: "success"
  });

  // Viewer split
  if (data.viewerSplit.nonFollowers > 50) {
    opportunities.push({ title: "A Wide Discovery Window — Reels + Paid", body: `${data.viewerSplit.nonFollowers}% of viewers were non-followers this week — the widest non-follower share in the file, driven by both the returning Reels and continued paid distribution pushing content well outside the follower graph. That's a real discovery window: the challenge is capturing it. Follow-prompts and save-CTAs on the Reels, plus booking-link stickers, convert borrowed reach into owned audience — the +17 net follows this week is a start, but 82% non-follower views should be converting harder.`, severity: "success" });
  } else {
    opportunities.push({
      title: "Discovery Narrowed Without a Reel",
      body: `Non-follower share was an estimated ${data.viewerSplit.nonFollowers}% of views this week — more follower-heavy than the Reel-and-paid weeks. Reels and collaborations are the proven reset to push distribution outside the follower graph again; the next collab Reel is the single highest-leverage item on the calendar.`,
      severity: "warning"
    });
  }

  insights.push({ title: "Brand-Search Dependency on Google", body: `Fresh 30-day GSC this cycle (edgardelchaar.com, Jun 12–Jul 11): 161 clicks on 2,565 impressions at 6.28% CTR, avg position 10.8. Every top query is a Dr. El Chaar name variant — "edgard el chaar" leads (15 clicks, 21.7% CTR, pos 1.2), "dr el chaar" follows (12 clicks), and the homepage takes 33 of those clicks. The clinical long-tail still ranks too low to convert: "sinus lift recovery experience" sat at position 21 with 44 impressions and zero clicks, and "types of bone graft" ranks deep. Those pages are the non-brand SEO upside — internal links and on-page work to climb.`, severity: "info" });

  insights.push({ title: "Mobile Outranks Desktop on Google", body: "GSC (recent window): Mobile ranks at position 3.6 vs Desktop at 5.4 — a ranking advantage on the same content, though Desktop still takes more clicks (27 vs 10). Mobile is the stronger-ranking surface; the upside is converting those better-ranked mobile impressions. Audit mobile Core Web Vitals and keep booking CTAs thumb-reachable. (Device split is from the trailing search window; the full 30-day device breakdown wasn't exported.)", severity: "info" });

  insights.push({ title: "Audience Alignment", body: `Primary audience is 35–44 (${data.audience.age[2].pct}%), ${data.audience.gender.male > 50 ? "slightly male" : "slightly female"} (${data.audience.gender.male > 50 ? data.audience.gender.male : data.audience.gender.female}%). The 35–54 range represents ${data.audience.age[2].pct + data.audience.age[3].pct}% of the audience — the highest-value patient demographic for implants, perio, and elective procedures, and a strong match for EEC's authority/credential content.`, severity: "success" });

  if (data.kpi.followers.change != null && data.kpi.followers.change < 15) {
    opportunities.push({ title: "Follower Velocity", body: `+${data.kpi.followers.change} net followers this week from an ${data.kpi.reach.value.toLocaleString()}-account reach window. The reach isn't fully translating into roster growth. A clear follow CTA on the Reels, plus the next collab Reel for organic pull, is how a reach spike turns into followers.`, severity: "warning" });
  }

  recommendations.push(
    { text: "Hold the reel cadence — three Reels this week ended a two-week gap. Keep 2–3 Reels/week on the calendar so organic reach stays repeatable rather than leaning on paid distribution", priority: "high" },
    { text: "Line up the next NYC Dental Smiles collab Reel — the Jun 15 concierge Reel still anchors the 30-day window; a fresh collab is the proven engine to widen discovery beyond the personal-care Reels", priority: "high" },
    { text: "Convert the 82%-non-follower discovery window — layer follow-prompts, save-CTAs and booking-link stickers directly on the Reels so the wide reach turns into follows and consults, not just views", priority: "high" },
    { text: "Convert clinical SEO impressions to clicks — 'sinus lift recovery experience' ranks at position 21 and the bone-graft long-tail deeper, with impressions but zero clicks. Internal links + title/meta work to push them toward page one", priority: "medium" },
    { text: "Create save-worthy authority content ('5 Signs of a Failed Graft', 'Sinus Lift Recovery, Day by Day') with a 'Save before your consult' CTA — just 1 save this week despite the reach", priority: "medium" },
    { text: "Refresh a Buzzsprout episode — podcast downloads jumped (43 last 7 days vs 17) but the catalog coasts on evergreen back-episodes; a new release would sustain the momentum", priority: "low" },
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
    period: "July 6 – July 12, 2026", totalClicks: 69,
    topLinks: [{ path: "Homepage", clicks: 30 }, { path: "DDS-PC UES", clicks: 11 }, { path: "DDS-PC Midtown", clicks: 4 }, { path: "Instagram", clicks: 2 }, { path: "YouTube", clicks: 1 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 69 }, { source: "Bot / datacenter + wildcard (excluded)", clicks: 232 }],
    topCountries: [{ country: "United States", clicks: 45 }, { country: "Netherlands", clicks: 6 }, { country: "Singapore", clicks: 5 }],
    topCities: [{ city: "New York City", clicks: 20 }, { city: "Amsterdam", clicks: 6 }, { city: "Singapore", clicks: 5 }],
    devices: [{ os: "iOS (Mobile Safari)", clicks: 40 }, { os: "Windows / Chrome", clicks: 26 }, { os: "Mac OS X", clicks: 3 }],
  };
  const linkData30d = {
    period: "June 13 – July 12, 2026", totalClicks: 576,
    topLinks: [{ path: "DDS-PC UES", clicks: 157 }, { path: "Homepage", clicks: 34 }, { path: "DDS-PC Midtown", clicks: 23 }, { path: "Instagram", clicks: 8 }, { path: "YouTube", clicks: 4 }],
    trafficSources: [{ source: "Human clicks (named + homepage)", clicks: 576 }, { source: "Bot / datacenter + wildcard (excluded)", clicks: 1889 }],
    topCountries: [{ country: "United States", clicks: 33 }, { country: "Singapore", clicks: 24 }, { country: "Netherlands", clicks: 6 }],
    topCities: [{ city: "New York City", clicks: 33 }, { city: "Singapore", clicks: 24 }, { city: "Brooklyn", clicks: 8 }],
    devices: [{ os: "Chrome", clicks: 266 }, { os: "Mobile Safari (iOS)", clicks: 138 }, { os: "Safari", clicks: 22 }],
  };
  const linkData = timeRange === "7d" ? linkData7d : linkData30d;

  const websiteData7d = {
    period: "July 6 – July 12, 2026",
    sessions: 575,
    topPages: [
      { page: "/", label: "Home", views: 290 },
      { page: "/locations", label: "Locations", views: 130 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Doctors (UES)", views: 18 },
      { page: "/our-doctors", label: "Our Doctors", views: 10 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 8 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 299, pct: 52.0 },
      { source: "Google", sessions: 113, pct: 19.6 },
      { source: "Instagram (paid)", sessions: 97, pct: 16.8 },
      { source: "Facebook (paid)", sessions: 35, pct: 6.1 },
      { source: "Other", sessions: 31, pct: 5.5 },
    ],
    devices: [
      { device: "Desktop", pct: 62.8 },
      { device: "Mobile", pct: 37.2 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jul 6", visitors: 119 },{ date: "Jul 7", visitors: 86 },
      { date: "Jul 8", visitors: 48 },{ date: "Jul 9", visitors: 99 },
      { date: "Jul 10", visitors: 85 },{ date: "Jul 11", visitors: 69 },
      { date: "Jul 12", visitors: 69 },
    ],
    search: {
      totalClicks: 36, totalImpressions: 574, avgCTR: 6.27, avgPosition: 4.19,
      note: "GSC Jul 5 – Jul 11 (edgardelchaar.com)",
      topQueries: [
        { query: "edgard el chaar", clicks: 4, ctr: 25.00, position: 1.12 },
        { query: "el chaar", clicks: 2, ctr: 14.29, position: 2.00 },
        { query: "dr edgard el chaar", clicks: 2, ctr: 16.67, position: 5.92 },
        { query: "dr el chaar", clicks: 1, ctr: 5.00, position: 2.85 },
        { query: "anamaria castillo", clicks: 1, ctr: 25.00, position: 9.25 },
      ],
      topPages: [
        { page: "Homepage", clicks: 33, impressions: 495, ctr: 6.67 },
        { page: "Doctors & Periodontists (UES)", clicks: 3, impressions: 88, ctr: 3.41 },
        { page: "Locations", clicks: 1, impressions: 103, ctr: 0.97 },
        { page: "Dental Services", clicks: 0, impressions: 109, ctr: 0.00 },
      ],
    },
  };
  const websiteData30d = {
    period: "June 13 – July 12, 2026",
    sessions: 1585,
    topPages: [
      { page: "/", label: "Home", views: 1103 },
      { page: "/locations", label: "Locations", views: 498 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Doctors (UES)", views: 68 },
      { page: "/our-doctors", label: "Our Doctors", views: 39 },
      { page: "/is-gum-grafting-painful", label: "Is Gum Grafting Painful", views: 31 },
      { page: "/do-you-need-a-crown-after-a-root-canal", label: "Crown After Root Canal", views: 18 },
      { page: "/about", label: "About", views: 16 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 822, pct: 51.9 },
      { source: "Google", sessions: 311, pct: 19.6 },
      { source: "Instagram (paid)", sessions: 266, pct: 16.8 },
      { source: "Facebook (paid)", sessions: 97, pct: 6.1 },
      { source: "Other", sessions: 89, pct: 5.6 },
    ],
    devices: [
      { device: "Desktop", pct: 62.8 },
      { device: "Mobile", pct: 37.2 },
      { device: "Tablet", pct: 0.0 },
    ],
    dailyVisitors: [
      { date: "Jun 13", visitors: 14 },{ date: "Jun 18", visitors: 27 },
      { date: "Jun 23", visitors: 19 },{ date: "Jun 28", visitors: 14 },
      { date: "Jul 2", visitors: 73 },{ date: "Jul 6", visitors: 119 },
      { date: "Jul 9", visitors: 99 },{ date: "Jul 12", visitors: 69 },
    ],
    search: {
      totalClicks: 161, totalImpressions: 2565, avgCTR: 6.28, avgPosition: 10.81,
      note: "GSC Jun 12 – Jul 11 (edgardelchaar.com)",
      topQueries: [
        { query: "edgard el chaar", clicks: 15, ctr: 21.74, position: 1.23 },
        { query: "dr el chaar", clicks: 12, ctr: 14.46, position: 2.98 },
        { query: "dr edgard el chaar", clicks: 7, ctr: 17.95, position: 2.54 },
        { query: "edgar el chaar", clicks: 5, ctr: 13.89, position: 1.83 },
        { query: "el chaar dentist", clicks: 5, ctr: 45.45, position: 1.00 },
      ],
      topPages: [
        { page: "Homepage", clicks: 33, impressions: 495, ctr: 6.67 },
        { page: "Doctors & Periodontists (UES)", clicks: 3, impressions: 88, ctr: 3.41 },
        { page: "Locations", clicks: 1, impressions: 103, ctr: 0.97 },
        { page: "Dental Services", clicks: 0, impressions: 109, ctr: 0.00 },
      ],
    },
  };
  const websiteData = timeRange === "7d" ? websiteData7d : websiteData30d;

  const podcastData = {
    period: "All Time (as of July 12, 2026)",
    totalEpisodes: 49, totalDownloads: 4830, periodDownloads: 43,
    last7Days: 43, last30Days: 100, last90Days: 284,
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
    period: "July 6 – July 12, 2026",
    followers: 3177, followerGrowth: 17, follows: 17, unfollows: 0,
    totalViews: 11850, totalReach: 8253, reachChange: 78.6, totalInteractions: 130,
    viewSplit: { followers: 18, nonFollowers: 82 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 86, posts: 0, stories: 14 },
    interactionsByType: { reels: 100, posts: 0, stories: 0 },
    totalLikes: 46, totalComments: 0, totalSaves: 1, totalShares: 1,
    storyViews: 287, storyCompletion: 86, storyCount: 4,
    dailyViews: [
      { date: "Jul 6", views: 1400 },{ date: "Jul 7", views: 1350 },
      { date: "Jul 8", views: 1100 },{ date: "Jul 9", views: 2200 },
      { date: "Jul 10", views: 2100 },{ date: "Jul 11", views: 1750 },
      { date: "Jul 12", views: 1950 },
    ],
    posts: [
      { id: 1, title: "Your Smile Is Just One Part of Your Health · Dr. Dinoi", type: "Reel", date: "Jul 9", views: 1202, reach: 928, likes: 23, comments: 0, saves: 1, shares: 1, er: 2.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/reel/DalQX81hr1D/", isTop: true },
      { id: 2, title: "The Best Care Goes Beyond the Procedure", type: "Reel", date: "Jul 10", views: 328, reach: 207, likes: 14, comments: 0, saves: 0, shares: 0, er: 6.8, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/reel/DankehjhoQC/", isTop: false },
      { id: 3, title: "Not Every Patient Journey Is Straightforward", type: "Reel", date: "Jul 11", views: 303, reach: 223, likes: 7, comments: 0, saves: 0, shares: 0, er: 3.1, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/reel/DaqQKdKBa-_/", isTop: false },
    ],
  };
  const socialData30d = {
    period: "June 13 – July 12, 2026",
    followers: 3177, followerGrowth: 30, follows: 30, unfollows: 0,
    totalViews: 48440, totalReach: 16110, reachChange: 69.9, totalInteractions: 776,
    viewSplit: { followers: 28, nonFollowers: 72 },
    interactionSplit: { followers: 31, nonFollowers: 69 },
    viewsByType: { reels: 33, posts: 56, stories: 11 },
    interactionsByType: { reels: 38, posts: 62, stories: 0 },
    totalLikes: 185, totalComments: 2, totalSaves: 3, totalShares: 16,
    storyViews: 1194, storyCompletion: 86, storyCount: 14,
    dailyViews: [
      { date: "Jun 13", views: 300 },{ date: "Jun 18", views: 600 },
      { date: "Jun 23", views: 400 },{ date: "Jun 26", views: 1540 },
      { date: "Jul 1", views: 8000 },{ date: "Jul 5", views: 2600 },
      { date: "Jul 9", views: 2200 },{ date: "Jul 12", views: 1600 },
    ],
    posts: [
      { id: 1, title: "Plot Twist: Concierge Dentists · Collab w/ NYC Dental Smiles", type: "Reel", date: "Jun 15", views: 1831, reach: 1053, likes: 28, comments: 1, saves: 1, shares: 2, er: 3.0, skipRate: 60, avgWatch: "8s", igUrl: "https://www.instagram.com/reel/DZnrjSHhL4a/", isTop: true, isCollab: true },
      { id: 2, title: "Get to Know the Faces Behind Your Care — Team", type: "Post", date: "Jun 26", views: 1537, reach: 504, likes: 35, comments: 0, saves: 0, shares: 3, er: 7.5, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaD2rTCGS6T/", isTop: false },
      { id: 3, title: "NEW EPISODE — Postgraduate Dentistry (Podcast Promo)", type: "Post", date: "Jun 27", views: 1435, reach: 593, likes: 21, comments: 0, saves: 1, shares: 4, er: 4.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaEBGU2Bh1J/", isTop: false },
      { id: 4, title: "Your Smile Is Just One Part of Your Health · Dr. Dinoi", type: "Reel", date: "Jul 9", views: 1202, reach: 928, likes: 23, comments: 0, saves: 1, shares: 1, er: 2.7, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/reel/DalQX81hr1D/", isTop: false },
      { id: 5, title: "Choosing a Postgraduate Program (Carousel)", type: "Post", date: "Jul 5", views: 863, reach: 453, likes: 27, comments: 0, saves: 0, shares: 2, er: 6.4, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DaTSj0UhvIf/", isTop: false },
      { id: 6, title: "Learning Never Stops — Provider Education", type: "Post", date: "Jun 18", views: 607, reach: 248, likes: 7, comments: 0, saves: 0, shares: 1, er: 3.2, skipRate: 0, avgWatch: "", igUrl: "https://www.instagram.com/p/DZvOtJXBsn2/", isTop: false },
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
                  <div className="exec-col-body">Account reach ran {d.kpi.reach.value.toLocaleString()} (avg. reach/day &times; 7; +79% WoW) and views normalized to {d.kpi.views.value.toLocaleString()} on a week that saw <em>three Reels return</em> (zero feed posts). The Jul 9 &ldquo;Your Smile&rdquo; Reel with Dr. Dinoi led owned content at 1,202 views. Paid distribution still runs underneath — an estimated {d.viewerSplit.nonFollowers}% of views were non-followers, and paid IG + FB drove ~363 website sessions this month. Reach is the Metricool avg-reach-per-day basis (Profile Growth CSV retired).</div>
                </div>
                <div>
                  <div className="exec-col-title">Engagement</div>
                  <div className="exec-col-body">{d.kpi.engagementRate.value}% blended ER with {d.kpi.engagements.value} accounts engaged against {d.kpi.reach.value.toLocaleString()} reach — the low headline is the denominator, not the content: paid reach nearly doubled the reach base, which compresses a blended rate. Organic per-Reel ER stayed healthy (2.7&ndash;6.8%). The durable signals still lag: 1 save and +{d.kpi.followers.change} net follows. With no feed post, 100% of owned interactions came from Reels. 35&ndash;54 = 58% of the audience.</div>
                </div>
                <div>
                  <div className="exec-col-title">Content</div>
                  <div className="exec-col-body">Owned output was three Reels ({d.contentMix.reels}% of published views) and {socialData.storyCount} Stories — no feed post this window. Fresh 30-day GSC (edgardelchaar.com, Jun 12–Jul 11): 161 clicks at 6.28% CTR, position 11, entirely Dr. El Chaar brand terms; the clinical long-tail (sinus lift, bone graft) ranks at position 21+ with impressions but no clicks. The takeaway: Reels are back after two quiet weeks — holding the cadence and adding the next collab Reel is what keeps discovery earned, not only paid.</div>
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
              <InsightCard title={"Website + Search · " + (timeRange === "7d" ? "7-day" : "30-day")} body={timeRange === "7d" ? "575 new visitors Jul 6–12, sustaining the early-July climb — traffic peaked at 119 on Jul 6 as the paid push ran. Direct 52.0% (299), Google 19.6% (113), then paid — Instagram 16.8% (97), Facebook 6.1% (35); desktop 63% / mobile 37%. Home drew ~290 landing views, Locations ~130. Fresh GSC (edgardelchaar.com, Jul 5–11): 36 clicks at 6.27% CTR, position 4.2, entirely Dr. El Chaar brand terms — homepage takes 33 clicks. (7-day source/page splits are modeled from the 30-day GA4 export; daily visitor counts are actual.)" : "1,585 sessions over 30 days (1,364 new visitors). Direct 51.9% (822), Google 19.6% (311), then paid IG 16.8% (266) and FB 6.1% (97) — paid social is a much bigger share this cycle. Desktop 63%, Mobile 37%. Beyond Home (1,103), Locations (498), Doctors-UES (68) and the gum-grafting / crown clinical pages lead. GSC (Jun 12–Jul 11): 161 clicks, 6.28% CTR, position 10.8 — brand-dominant; clinical long-tail (sinus lift, bone graft) ranks pos 21+ with impressions but no clicks."} severity="info" />
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
              <InsightCard title={"Social Intelligence · " + socialData.period} body={timeRange === "7d" ? "11,850 account views reaching ~8,253 (avg. reach/day × 7; +79% WoW) with 130 accounts engaged at 1.6% blended ER — reach kept its paid-lifted high while views normalized off last week's boost peak. The healthy shift: three Reels returned (zero feed posts), led by the Jul 9 'Your Smile' Reel with Dr. Dinoi (1,202 views, 928 reach), with two more personal-care Reels behind it. Organic per-Reel ER ran 2.7–6.8%. Paid still runs underneath (~363 website sessions this month from IG + FB); ~82% of views were non-followers. The gap is conversion — 1 save and +17 follows against a wide reach window. Reach uses the Metricool avg-reach-per-day basis." : "48,440 account views reaching ~16,110 (avg. reach/day × 30) with 776 accounts engaged across Jun 13 – Jul 12, lifted heavily by the Jul 1 paid spike. Top organic performers: the Jun 15 concierge collab Reel (1,831 IG views, 1,053 reach), the 'Get to Know the Faces' team post (1,537 / 504) and the podcast-promo post (1,435 / 593). Posts drove ~62% of interactions and Reels ~38%; ~72% of views were non-followers. Paid and the collab Reel remain the month's reach engines — and organic Reel cadence returned in the final week after two quiet ones."} severity="info" />
              <InsightCard title="Key Insight" body={timeRange === "7d" ? "A reels-back week with reach holding high. Account reach stayed at ~8,253 (+79% WoW) while views normalized to 11.9K off last week's paid peak — and crucially, three Reels returned after two reel-less weeks. What's working: the Jul 9 'Your Smile' Reel with Dr. Dinoi led owned content (1,202 views, 928 reach); organic per-Reel ER was healthy (2.7–6.8%); the podcast jumped (43 downloads last 7 days vs 17). What's not: the wide 82%-non-follower reach converted to just 1 save and +17 follows, and blended ER reads low (1.6%) because paid inflates the denominator. Two levers: (1) hold the 2–3 Reel/week cadence and layer follow/save CTAs onto the Reels to capture the discovery window, and (2) line up the next NYC Dental Smiles collab Reel so reach keeps widening organically." : "The 30-day arc: reach runs on two engines — the NYC Dental Smiles collaboration Reels (the Jun 15 concierge Reel anchors this window) and paid boosts (the Jul 1 spike), which together drive most discovery, while authority posts and carousels engage the existing audience. This month the paid reliance was visible in the account-view spike, but the encouraging turn is that organic Reel cadence came back in the final week after going quiet. The strategy that works is in the data: collab and personal-care Reels plus paid open the funnel, authority content deepens it. The constraint is consistency — a steady collab + credential cadence, with paid amplifying rather than replacing organic, is how EEC turns reach into durable engagement and growth."} severity="success" />
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
              <InsightCard title="Podcast Intelligence" body="4,830 all-time downloads across 49 episodes — 170 to the 5K milestone, 1 episode to the 50-ep badge. Velocity jumped this cycle: 43 downloads last 7 days (vs 17), 100 last 30, 284 last 90. The catalog leans on evergreen clinical episodes — Allograft w/ Dr. Brad McAllister (302), Future of Dental Industry w/ Aurelio Sahagun–Straumann (195), and the Periodontal Diagnosis series (194 / 185). Recent episodes skew Apple Podcasts 36% / Web Browser 28% / Spotify 16%, played mostly on Apple iPhone (49%) and mobile (53%); the all-time platform totals shown below are carried from the prior pull. NYC metro leads cities (New York 407, Brooklyn 123). No new episode this cycle — the uptick coasts on the back catalog; a fresh release is the lever to sustain it." severity="success" />
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
