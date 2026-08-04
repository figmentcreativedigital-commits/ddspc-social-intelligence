"use client";
import { useState, useEffect } from "react";

// Fallback data — used while loading or if Sheets API fails
const FALLBACK_DATA = {
  client: { name: "EEC", fullName: "Edgard El Chaar, DDS, PC", period: "July 1 – 31, 2026" },
  kpi: {
    followers: { value: 3190, change: 38, label: "Followers" },
    reach: { value: 26691, label: "Reach" },
    views: { value: 45210, label: "Total Views" },
    engagementRate: { value: 3.50, label: "Engagement Rate", suffix: "%" },
    engagements: { value: 934, label: "Engagements" },
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
    title: "Account-level reconciliation recovered 632 interactions the CSVs missed",
    evidence: [
      `${eng} account-level interactions across July`,
      "Published July content accounts for only 302 of them",
      "Post interactions read 620 at account level against 144 from July posts",
      `Engagement rate lands at ${er}% \u2014 not the ~1.1% a CSV-only read would show`,
    ],
    impact: "Two thirds of July\u2019s engagement came from content published before July \u2014 the library is compounding.",
    action: "Keep reporting from account-level exports and treat the back catalogue as a live asset.",
    severity: "info",
  });

  insights.push({
    title: "Carousels are this account\u2019s engine \u2014 not Reels",
    evidence: [
      "Carousels took 21,840 organic views against 5,433 for Reels",
      "10 posts drove 620 interactions; 5 Reels drove 233",
      "The Jul 19 Dr. Sobol carousel led the month at 1,906 views on 782 reach",
      "Clinical explainer topics outperform every other format here",
    ],
    impact: "Depth-led educational content is what this specialty audience responds to.",
    action: "Keep carousels as the primary format and use Reels for reach, not engagement.",
    severity: "success",
  });

  insights.push({
    title: "The gum\u2013heart Reel set the engagement benchmark",
    evidence: [
      "75 likes, 5 comments, 8 shares on 807 reach \u2014 a 10.9% ER",
      "16.3s average watch time, well above the 9.5s monthly average",
      "1,361 views \u2014 the top-performing Reel of the month",
      "Oral\u2013systemic health storytelling out-engaged every promotional post",
    ],
    impact: "Clinical health-connection content is the account\u2019s highest-engagement format.",
    action: "Build a monthly \u2018oral\u2013systemic health\u2019 series in this style.",
    severity: "success",
  });

  insights.push({
    title: "Search is exceptionally efficient but very narrow",
    evidence: [
      "225 clicks on 2,414 impressions \u2014 9.32% CTR at position 5.2",
      "Every top query is a variant of the doctors\u2019 names",
      "Our Doctors grew +36 clicks month-over-month, from near zero",
      "Locations: 371 impressions but 3 clicks (0.81% CTR)",
    ],
    impact: "Reputation search performs superbly; procedure and location search are untouched headroom.",
    action: "Build procedure-question pages and rework the Locations title and meta description.",
    severity: "info",
  });

  insights.push({
    title: "Dr. Castillo is becoming independently discoverable",
    evidence: [
      "\u2018anamaria castillo\u2019 grew +3 clicks month-over-month",
      "4 clicks at 16.67% CTR from position 4.38",
      "\u2018dr anamaria castillo\u2019 adds 2 more at 13.33%",
      "Our Doctors page went from near zero to 36 clicks in the same month",
    ],
    impact: "Associate-doctor search is an expanding entry point beyond the founder\u2019s name.",
    action: "Give each associate a dedicated bio page and interlink from Our Doctors.",
    severity: "success",
  });

  // ---------- OPPORTUNITIES ----------
  opportunities.push({
    title: "The 404 page is absorbing a third of all new visitors",
    evidence: [
      "707 views and 669 new users in July \u2014 the #3 page on the site",
      "That is more new users than the Home page received (540)",
      "It appears on no landing-page report, so the breakage is on-site, not inbound",
      "Paid drove 736 sessions in the same month",
    ],
    impact: "A broken on-site link is intercepting a large share of arriving visitors, paid ones included.",
    action: "Audit links on the Locations page and the live ad destination, then 301 the dead URL.",
    severity: "warn",
  });

  opportunities.push({
    title: "July\u2019s paid campaign closed efficient \u2014 conversion is the next lever",
    evidence: [
      "$312.05 final spend \u2192 404 landing-page views at $0.77",
      "39,434 impressions and 28,804 reach across the flight",
      "Both ads finished conversion-ranked in the bottom 35%",
      "Paid drove 736 site sessions in July (IG 495 + FB 241)",
    ],
    impact: "The media buy filled the funnel efficiently; the landing experience is what capped it.",
    action: "Add a Lead/Booking event and route ads to a booking-first page before the next flight.",
    severity: "info",
  });

  opportunities.push({
    title: "Booking links are the clean signal in a noisy link month",
    evidence: [
      "71 booking-link clicks in July \u2014 Midtown 47, UES 24",
      "Homepage led named links at 171; Website took 54",
      "The gum-disease article link drew 44 clicks on its own",
      "Named-link traffic totalled 363 after bot filtering",
    ],
    impact: "Booking intent is measurable and steady even with heavy bot noise in the raw data.",
    action: "Keep booking links in bio and Stories, and keep the article link in rotation.",
    severity: "success",
  });

  opportunities.push({
    title: "The podcast hit two milestones in the same month",
    evidence: [
      "Crossed exactly 5,000 all-time downloads across exactly 50 episodes",
      "219 downloads in July",
      "\u2018What 50 Years in Dentistry Teaches You\u2019 published Jul 27 \u2014 15 downloads since",
      "The 5K milestone post ran on Instagram Jul 31",
    ],
    impact: "Two round-number milestones landing together is a rare, highly shareable moment.",
    action: "Merchandise the 5,000/50 milestone across email, LinkedIn and the website, not just Instagram.",
    severity: "success",
  });

  opportunities.push({
    title: "Saves remain the weakest engagement signal",
    evidence: [
      "Only 5 saves across all July content",
      "Against 258 likes and 31 shares",
      "Clinical explainer carousels are the natural save format",
    ],
    impact: "Saves carry the most ranking weight, making them the highest-value signal to grow.",
    action: "Close explainer carousels with a \u2018save this for your next check-up\u2019 prompt.",
    severity: "info",
  });

  opportunities.push({
    title: "Email opens are excellent; clicks are the gap",
    evidence: [
      "48.2% open rate across 7,001 sends in two campaigns",
      "Whitening Offer 55.3% opens and 65 clicks; Gum Article 54.1% and 29",
      "94 clicks from 3,371 opens \u2014 2.79% click-to-open",
      "Unsubscribes held at 0.39%",
    ],
    impact: "A warm, attentive list is ready for a clearer booking ask.",
    action: "Add one booking CTA above the fold in every send.",
    severity: "info",
  });

  alerts.push({
    title: "Paid concluded Jul 31 \u2014 August is running fully organic",
    evidence: [
      "The July Whitening Promo ended at $312.05 / 404 results / $0.77 each",
      "Paid contributed 10,230 content views and 736 site sessions in July",
      "No August campaign is live yet",
    ],
    impact: "Both social distribution and site traffic lose a material contributor without a flight.",
    action: "Decide the August offer and relaunch \u2014 after fixing the 404 and adding conversion tracking.",
    severity: "warn",
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

  const linkData = {
    period: "July 1 \u2013 31, 2026", totalClicks: 363,
    topLinks: [
      { path: "Homepage", clicks: 171 },
      { path: "Website", clicks: 54 },
      { path: "DDS-PC Midtown", clicks: 47 },
      { path: "Gum Disease Article", clicks: 44 },
      { path: "DDS-PC UES", clicks: 24 },
      { path: "Locations", clicks: 23 },
    ],
    trafficSources: [
      { source: "Named links + homepage", clicks: 363 },
      { source: "Wildcard / social / other", clicks: 76 },
    ],
    topCountries: [
      { country: "United States", clicks: 278 },
      { country: "Bulgaria", clicks: 41 },
      { country: "The Netherlands", clicks: 28 },
      { country: "Singapore", clicks: 22 },
    ],
    topCities: [
      { city: "New York City", clicks: 45 },
      { city: "Brooklyn", clicks: 19 },
    ],
    devices: [
      { os: "Chrome", clicks: 187 },
      { os: "Mobile Safari", clicks: 144 },
      { os: "Safari", clicks: 51 },
      { os: "Firefox", clicks: 14 },
      { os: "Chrome Mobile", clicks: 10 },
    ],
  };

  const websiteData = {
    period: "July 1 \u2013 31, 2026",
    sessions: 2549,
    topPages: [
      { page: "/", label: "Home", views: 1283 },
      { page: "/locations", label: "Locations", views: 899 },
      { page: "/our-doctors", label: "Our Doctors", views: 152 },
      { page: "/doctors-and-periodontists-at-upper-east-side", label: "Periodontists (UES)", views: 56 },
      { page: "/sinus-lift-long-term-side-effects", label: "Sinus Lift Side Effects", views: 31 },
      { page: "/all-on-6-dental-implants-everything-you-need-to-know", label: "All-on-6 Implants", views: 28 },
      { page: "/do-you-need-a-crown-after-a-root-canal", label: "Crown After Root Canal", views: 25 },
    ],
    trafficSources: [
      { source: "Direct", sessions: 1272, pct: 50.0 },
      { source: "Instagram (paid)", sessions: 495, pct: 19.5 },
      { source: "Google", sessions: 410, pct: 16.1 },
      { source: "Facebook (paid)", sessions: 241, pct: 9.5 },
      { source: "Bing / Yahoo", sessions: 32, pct: 1.3 },
      { source: "Referral", sessions: 75, pct: 2.9 },
      { source: "Other", sessions: 24, pct: 0.9 },
    ],
    devices: [
      { device: "Desktop", pct: 59.9 },
      { device: "Mobile", pct: 40.1 },
      { device: "Tablet", pct: 0.1 },
    ],
    notFoundViews: 707, notFoundNewUsers: 669,
    dailyVisitors: [
      { date: "Jul 1", visitors: 34 },{ date: "Jul 2", visitors: 73 },{ date: "Jul 3", visitors: 73 },
      { date: "Jul 4", visitors: 69 },{ date: "Jul 5", visitors: 66 },{ date: "Jul 6", visitors: 119 },
      { date: "Jul 7", visitors: 86 },{ date: "Jul 8", visitors: 48 },{ date: "Jul 9", visitors: 99 },
      { date: "Jul 10", visitors: 85 },{ date: "Jul 11", visitors: 69 },{ date: "Jul 12", visitors: 72 },
      { date: "Jul 13", visitors: 107 },{ date: "Jul 14", visitors: 94 },{ date: "Jul 15", visitors: 62 },
      { date: "Jul 16", visitors: 65 },{ date: "Jul 17", visitors: 72 },{ date: "Jul 18", visitors: 53 },
      { date: "Jul 19", visitors: 51 },{ date: "Jul 20", visitors: 73 },{ date: "Jul 21", visitors: 78 },
      { date: "Jul 22", visitors: 87 },{ date: "Jul 23", visitors: 55 },{ date: "Jul 24", visitors: 68 },
      { date: "Jul 25", visitors: 50 },{ date: "Jul 26", visitors: 66 },{ date: "Jul 27", visitors: 93 },
      { date: "Jul 28", visitors: 103 },{ date: "Jul 29", visitors: 98 },{ date: "Jul 30", visitors: 32 },
      { date: "Jul 31", visitors: 27 },
    ],
    search: {
      totalClicks: 225, totalImpressions: 2414, avgCTR: 9.32, avgPosition: 5.2,
      note: "GSC Jul 1 \u2013 31, 2026 (edgardelchaar.com \u00b7 totals summed from daily chart)",
      devices: [
        { device: "Desktop", clicks: 128, impressions: 1250, ctr: 10.24, position: 6.6 },
        { device: "Mobile", clicks: 97, impressions: 1144, ctr: 8.48, position: 3.6 },
        { device: "Tablet", clicks: 0, impressions: 20, ctr: 0, position: 2.9 },
      ],
      topQueries: [
        { query: "edgard el chaar", clicks: 22, ctr: 17.32, position: 1.20 },
        { query: "dr el chaar", clicks: 10, ctr: 12.05, position: 2.70 },
        { query: "edgar el chaar", clicks: 8, ctr: 18.18, position: 1.82 },
        { query: "el chaar", clicks: 6, ctr: 5.45, position: 2.95 },
        { query: "dr edgard el chaar", clicks: 6, ctr: 20.69, position: 3.07 },
        { query: "anamaria castillo", clicks: 4, ctr: 16.67, position: 4.38 },
        { query: "dr el chaar nyc", clicks: 3, ctr: 27.27, position: 1.09 },
      ],
      topPages: [
        { page: "Homepage", clicks: 180, impressions: 1813, ctr: 9.93 },
        { page: "Our Doctors", clicks: 36, impressions: 868, ctr: 4.15 },
        { page: "Doctors & Periodontists (UES)", clicks: 11, impressions: 422, ctr: 2.61 },
        { page: "Locations", clicks: 3, impressions: 371, ctr: 0.81 },
        { page: "Dental Services", clicks: 0, impressions: 241, ctr: 0 },
      ],
    },
  };

  const podcastData = {
    period: "July 1 \u2013 31, 2026 (lifetime totals as of Aug 4)",
    totalEpisodes: 50, totalDownloads: 5000, periodDownloads: 219,
    newestEpisode: { title: "What 50 Years in Dentistry Teaches You", date: "Jul 27, 2026", downloads: 15 },
    topEpisodes: [
      { title: "Allograft & Evolution \u2013 Dr. Brad McAllister", downloads: 306 },
      { title: "Future of Dental Industry \u2013 Aurelio Sahagun, Straumann", downloads: 197 },
      { title: "Periodontal Diagnosis \u2013 Gingivitis", downloads: 196 },
      { title: "Periodontal Diagnosis \u2013 Periodontitis", downloads: 187 },
      { title: "Oral and Systemic Health", downloads: 174 },
    ],
    platforms: [
      { name: "Spotify", downloads: 1246, pct: 25 },
      { name: "Web Browser", downloads: 1191, pct: 24 },
      { name: "Apple Podcasts", downloads: 1081, pct: 22 },
      { name: "Buzzsprout Site", downloads: 406, pct: 8 },
      { name: "iVoox", downloads: 334, pct: 7 },
    ],
    topCountries: [
      { country: "United States", downloads: 3168 },
      { country: "India", downloads: 146 },
      { country: "Canada", downloads: 146 },
      { country: "Germany", downloads: 129 },
      { country: "Russian Federation", downloads: 113 },
    ],
    topCities: [
      { city: "New York", downloads: 463 },
      { city: "Brooklyn", downloads: 124 },
      { city: "Queens", downloads: 92 },
      { city: "Frankfurt am Main", downloads: 89 },
      { city: "Philadelphia", downloads: 64 },
    ],
  };

  const socialData = {
    period: "July 1 \u2013 31, 2026",
    followers: 3190, followerGrowth: 38, follows: 38, unfollows: 0,
    totalViews: 45210, totalReach: 26691, totalInteractions: 934,
    accountsEngaged: 660,
    viewSplit: { followers: 28, nonFollowers: 72 },
    reachSplit: { followers: 15, nonFollowers: 85 },
    interactionSplit: { followers: 28, nonFollowers: 72 },
    viewsByType: { reels: 16, posts: 75, stories: 9 },
    interactionsByType: { reels: 25, posts: 67, stories: 8 },
    totalLikes: 258, totalComments: 8, totalSaves: 5, totalShares: 31,
    storyViews: 1980, storyCompletion: 0, storyCount: 21,
    posts: [
      { id: 1, title: "When a Tooth Is Worth Saving \u2014 Dr. Vitaliya Sobol (Carousel)", type: "Post", date: "Jul 19", views: 1910, reach: 782, likes: 40, comments: 1, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: true },
      { id: 2, title: "Your Smile Is Just One Part of Your Health (Carousel)", type: "Post", date: "Jul 9", views: 1350, reach: 992, likes: 29, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 3, title: "Your Gum Health Doesn\u2019t Stop at Your Mouth (Reel)", type: "Reel", date: "Jul 30", views: 1360, reach: 807, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 4, title: "Your Gums and Your Heart May Be Connected (Carousel)", type: "Post", date: "Jul 29", views: 614, reach: 203, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 5, title: "Gum Disease Is Often Silent (Carousel)", type: "Post", date: "Jul 24", views: 610, reach: 215, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 6, title: "Are You a Walking Dental Red Flag? (Carousel)", type: "Post", date: "Jul 3", views: 577, reach: 227, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 7, title: "Not Every Patient Journey Is Straightforward (Reel)", type: "Reel", date: "Jul 11", views: 551, reach: 333, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 8, title: "Before You Add Another Lemon Wedge (Reel)", type: "Reel", date: "Jul 17", views: 481, reach: 284, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 9, title: "The Best Care Goes Beyond the Procedure (Reel)", type: "Reel", date: "Jul 10", views: 453, reach: 262, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
      { id: 10, title: "5,000 Downloads and Counting", type: "Post", date: "Jul 31", views: 365, reach: 156, likes: 0, comments: 0, saves: 0, shares: 0, er: 0, skipRate: 0, avgWatch: "\u2014", igUrl: "", isTop: false },
    ],
  };

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
    ads: [
      { name: "Your best summer accessory", spend: 215.62, impressions: 26817, reach: 17719, results: 290, cpr: 0.74, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
      { name: "Make it a summer to remember", spend: 96.43, impressions: 12617, reach: 11085, results: 114, cpr: 0.85, quality: "Quality Average · Engagement Average · Conversion rate Below average (bottom 35%)" },
    ],
  };

  const emailData = {
    period: "July 1 \u2013 31, 2026",
    campaignCount: 2, sends: 7001, opens: 3371, openRate: 48.2,
    clicks: 94, clickRate: 1.34, ctor: 2.79,
    unsubs: 27, unsubRate: 0.39,
    campaigns: [
      { name: "DDS PC \u00b7 Whitening Offer", date: "Jul 6", sends: 3514, opens: 1709, openRate: 55.3, clicks: 65, clickRate: 2.1, mobile: 31.5 },
      { name: "DDS PC \u00b7 Gum Article", date: "Jul 22", sends: 3487, opens: 1662, openRate: 54.1, clicks: 29, clickRate: 0.9, mobile: 30.7 },
    ],
  };
  const emailLifetime = {
    campaigns: 3, sends: 10569, opens: 4947, openRate: 46.8,
    clicks: 208, clickRate: 1.97, ctor: 4.20, unsubs: 34,
    bestOpens: [
      { name: "DDS PC · Podcast Newsletter", rate: 63.1 },
      { name: "DDS PC · Whitening Offer", rate: 55.3 },
      { name: "DDS PC · Gum Article", rate: 54.1 },
    ],
    campaignUnsubs: [
      { name: "DDS PC · Podcast Newsletter", rate: 0.2, sends: 3568 },
      { name: "DDS PC · Whitening Offer", rate: 0.3, sends: 3514 },
      { name: "DDS PC · Gum Article", rate: 0.5, sends: 3487 },
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
      <style>{`@media (min-width: 1024px) { .root { zoom: 1.25; } }`}</style>
      {/* HEADER */}
      <div className="hdr">
        <div className="hdr-top">
          <div>
            <div className="hdr-brand">Figment Creative · Social Intelligence</div>
            <div className="hdr-title">{d.client.fullName}</div>
            <div className="hdr-sub">Monthly Performance Report · {d.client.period}</div>
          </div>
          <div className="hdr-badge"><div className="hdr-pulse" />Monthly Report</div>
        </div>
      </div>

      {/* TABS */}
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
                      +{k.change}
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
                    { val: d.kpi.views.value.toLocaleString(), label: "Views" },
                    { val: d.kpi.reach.value.toLocaleString(), label: "Reach" },
                    { val: `${d.viewerSplit.nonFollowers}%`, label: "Non-Follower (est.)" },
                  ]}
                  noteLabel="Takeaway"
                  notes={[
                    { text: "Reels returned \u2014 two doctor-led Reels, two posts and seven Stories lifted views 27% week-over-week.", tone: "pos" },
                    { text: "The new-episode Reel reached 1,242 accounts \u2014 the widest single piece of the week.", tone: "pos" },
                    { text: "Ads carried 10,230 views \u2014 23% of the month \u2014 before concluding Jul 31.", tone: "" },
                  ]}
                />
                <ExecCard
                  eyebrow="Engagement"
                  tone="pos"
                  metrics={[
                    { val: `${d.kpi.engagementRate.value}%`, label: "Eng. Rate" },
                    { val: d.kpi.engagements.value.toLocaleString(), label: "Interactions" },
                    { val: `${d.viewerSplit.followers}%`, label: "Follower Views (est.)" },
                  ]}
                  noteLabel="Why"
                  notes={[
                    { text: "Engagement rate of 3.50% on 934 account-level interactions.", tone: "pos" },
                    { text: "The gum\u2013heart Reel earned 73 likes, 5 comments and 8 shares \u2014 a 10.8% ER on its reach.", tone: "pos" },
                    { text: "258 likes and 31 shares across the month; saves remain at just 5.", tone: "" },
                    { text: "Saves remain thin (2); a save prompt is still the open lever.", tone: "" },
                  ]}
                />
                <ExecCard
                  eyebrow="Content"
                  tone="neutral"
                  hero={{
                    label: "Top Performer",
                    title: "Gum Health & Heart Health \u00b7 Reel",
                    stats: [{ val: "1,906", label: "views" }, { val: "782", label: "reach" }, { val: "40", label: "likes" }],
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ Discovery ran overwhelmingly outward — 72% of the month’s 45,210 views and 85% of reach came from non-followers, against a follower base of 3,190. The account still converted 38 new followers, a materially better discovery-to-follow rate than reach volume alone would predict.</span>
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
              <InsightCard title={"Link Attribution · " + linkData.period} body={"363 clicks across named destinations in July — Homepage 171, Website 54, DDS-PC Midtown 47, the gum-disease article 44, DDS-PC UES 24 and Locations 23. Booking links (Midtown + UES = 71) are the clearest intent signal in the set, and the article link at 44 shows educational content pulling its own traffic. ✓ Bot filtering applied — Short.io logged 2,708 raw clicks against 432 human, and the 2,271 clicks that landed on no named path account for nearly all of the difference, so the named totals above are effectively clean. Standard datacenter geo removals applied (Ashburn, Santa Clara, Amsterdam, Singapore, Brussels, Columbus) along with 41 clicks from Bulgaria. New York City (45) and Brooklyn (19) lead the verified city panel. ✓ DDS-PC merge applied — Midtown includes 2 clicks carried from the NYCDS link set; UES had none."} severity="info" />
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
                { label: "Top Source", value: "Direct (50.0%)", delay: 160 },
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
                title={"Website + Search \u00b7 " + websiteData.period}
                evidence={[
                  "2,549 sessions and 2,227 new visitors across July",
                  "Direct climbed to 65.1%; paid social eased to 11.1% (IG 33, FB 26) with ads ending Jul 31",
                  "Home leads at 299 views; Locations 78, Our Doctors 69",
                  "Search: 225 clicks at 9.32% CTR, position 5.2",
                  "Desktop 74.4% / Mobile 25.2%",
                  "The 404 page drew 707 views from 669 new users \u2014 a standing fix",
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>{"✦ Reels took 86% of the week's 119 content interactions — the gum–heart Reel alone earned 86 (73 likes, 5 comments, 8 shares) for a 10.8% ER on its reach. Posts added 13%, Stories 1%."}</span>
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
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#6E8B97" }}>{"✦ 72% of July views came from non-followers and 85% of reach did — both from the native account-level breakdown, not estimated. Carousels drove the bulk of that reach at 21,840 organic views."}</span>
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
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#BE5A5A" }}>{"✦ 258 likes, 31 shares and 8 comments across July, against 934 total account-level interactions — the gap is engagement on content published before the month. Saves stayed at 5, the weakest signal in the mix."}</span>
                </div>
              </div>
            </div>

            <div className="card"><div className="card-hd">Reel-by-Reel Performance</div>
              {socialData.posts.filter(p => p.type === "Reel").length === 0 ? (
                <div style={{ padding: "20px 16px", background: "rgba(190,90,90,0.08)", borderRadius: 12, border: "1px solid rgba(190,90,90,0.20)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#BE5A5A", marginBottom: 4 }}>No Reels published this window</div>
                  <div style={{ fontSize: 12, color: "#9B8E94" }}>Carousels led both reach and engagement in July; the doctor-led Reels (gum–heart, Jul 30; Dr. Sobol carousel, Jul 19) anchored the month.</div>
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
                evidence={[
                  "45,210 views on ~26,691 reach (Metricool 861 avg/day \u00d7 31)",
                  "934 account interactions: Post 67% \u00b7 Reel 25% \u00b7 Story 8%",
                  "Engagement rate ~2.6% \u2014 lifted by the gum\u2013heart Reel's 10.8%",
                  "Eleven pieces published \u2014 2 Reels, 2 posts, 7 Stories",
                  "Followers +5 to 3,193",
                ]}
                impact={"Reels returned and both discovery and engagement rose with them."}
                action={"Hold the two-Reel weekly cadence and keep pairing episodes with launch Reels."}
                severity={"success"} />
              <InsightCard
                title="Key Insight"
                evidence={[
                  "The gum\u2013heart Reel set the engagement benchmark: 10.8% ER, 16.6s avg watch",
                  "Engagement rate rose to ~2.6% as Reels took 86% of interactions",
                  "Podcast crossed 5,000 downloads and 50 episodes in the same week",
                  "The episode launch Reel reached 1,242 accounts \u2014 widest of the week",
                  "Booking clicks at 71 in July \u2014 Midtown 47, UES 24",
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
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>of July site sessions from ads</div>
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
                  "Ads drove 29% of July site sessions (IG 495 + FB 241)",
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
                { label: "July Downloads", value: podcastData.periodDownloads, delay: 160 },
                { label: "Episode 50 (Jul 27)", value: podcastData.newestEpisode.downloads, delay: 240 },
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
                    { label: "Episode 50", value: podcastData.newestEpisode.downloads, max: 600, color: "#715262" },
                    { label: "July", value: podcastData.periodDownloads, max: 600, color: "#88A3AE" },
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
                  "219 downloads in July; 5,000 all-time across 50 episodes",
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
                  { label: "Sent", value: emailData.sends, max: emailData.sends, color: "#88A3AE" },
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ The best-performing email DDS-PC has sent remains the Podcast Newsletter, which opened at 63.1% — ahead of the Whitening Offer (55.3%) and the Gum Article (54.1%). Across July the two sends held that standard, but the click gap is the story: 3,371 opens produced only 94 clicks, and the promotional Whitening Offer out-clicked the editorial Gum Article 65 to 29.</span>
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
                <span style={{ fontSize: 12, fontWeight: 600, color: "#715262" }}>✦ Open rates are strong across the board — the three DDS-PC campaigns average {emailLifetime.openRate}% on {emailLifetime.sends.toLocaleString()} sends. Mobile open share sat near 31% on both July sends, so this list still reads primarily on desktop — subject-line length is less critical here than a single, unmissable booking CTA above the fold.</span>
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
              title="Opens are excellent; the click is where it stalls"
              evidence={[
                "Both July sends cleared 54% opens — Whitening Offer 55.3%, Gum Article 54.1%",
                "But only 94 clicks from 3,371 opens — 2.79% click-to-open",
                "The promotional send out-clicked the editorial one 65 to 29",
                "Unsubscribes held at 0.39% — no fatigue signal from the cadence",
              ]}
              impact="A warm, attentive list is reading but not acting — the ask is the weak link, not the audience."
              action="Put one booking CTA above the fold in every send and lead with a single clear action."
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
              <InsightCard title="Gender Balance" body="At 52% male / 48% female, the audience is nearly balanced, and the 35–44 cohort is the largest single segment. New York is the top follower city at 19.55%. The credential and case-study content resonates with a clinically-engaged, decision-stage audience — pair it with clear consult and booking CTAs to convert that trust into appointments. July added 38 followers to a base of 3,190." severity="info" />
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
