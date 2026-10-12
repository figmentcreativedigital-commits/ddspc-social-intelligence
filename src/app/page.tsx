import { R, IS_INTERNAL, NAV, has } from "./report-data";
import { Spark, Daily, type Day, type Fmt } from "./charts";

/* ==========================================================================
   PRESENTATION  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   Structure and styling only; every figure, date and sentence lives in
   report-data.ts.

   SERVER-RENDERED. This file has no "use client" directive and no hooks, so
   Next.js renders it to static HTML at build time. report-data.ts is never
   sent to the browser, and the client build carries only the text it shows.
   Keep it that way: an interactive piece belongs in its own small client
   component that receives only the strings it renders.

   BRAND — follows the Edgard El Chaar Brand Guidelines (05/2025).
   Colors: primary #715262 and #88A3AE; secondary #CCC7CB, #BDCBCE, #F1E4DC,
   #E4CCC2; plus white, black and gray. Charts use the 2 primaries: plum for
   this week, slate for earlier weeks. They separate clearly for color-blind
   readers (validator CVD ΔE 21.9); slate is below 3:1 on white, so every
   chart keeps a legend, selective direct labels and a table view.
   Type: Glacial Indifference (primary) for headings, text and numbers;
   Cinzel (secondary) for small titling. Logo: the EEC monogram, white on the
   plum masthead, from the guidelines' own artwork, with the name set below
   it in tracked Glacial as in the primary lockup.
   ========================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
@font-face { font-family: 'Glacial Indifference'; src: url('/fonts/GlacialIndifference-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: 'Glacial Indifference'; src: url('/fonts/GlacialIndifference-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }

:root {
  --plum: #715262;
  --slate: #88A3AE;
  --ink: #1F1F1F;
  --body: #3B3B3B;
  --muted: #6B6B6B;
  --paper: #FFFFFF;
  --wash: #F1E4DC;
  --rule: #CCC7CB;
  --rule-soft: #E6E3E5;
  --now: #715262;
  --past: #88A3AE;
  --track: #E4CCC2;
  --display: 'Cinzel', Georgia, serif;
  --text: 'Glacial Indifference', 'Helvetica Neue', Arial, sans-serif;
  --max: 1180px;
  --gut: clamp(20px, 5vw, 64px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body { font-family: var(--text); font-size: 17px; line-height: 1.6; color: var(--body); background: var(--paper); -webkit-font-smoothing: antialiased; }
h1, h2, h3 { font-family: var(--text); font-weight: 700; color: var(--plum); line-height: 1.2; text-wrap: balance; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--now); outline-offset: 3px; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.wrap { max-width: var(--max); margin: 0 auto; padding-left: var(--gut); padding-right: var(--gut); }

/* ---------- masthead: the week's headline is the hero ---------- */
.mast { position: relative; overflow: hidden; background: var(--plum); color: #fff; padding: 40px 0 60px; }
.mast-wm { position: absolute; right: -6%; top: 50%; transform: translateY(-50%); width: min(62vw, 820px); opacity: .07; pointer-events: none; }
.mast .wrap { position: relative; }
.mast-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,.3); }
.mast-logo { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; color: #fff; font-family: var(--text); font-weight: 400; }
.mast-logo img { width: 128px; height: auto; display: block; }
.mast-logo span { font-size: 12px; letter-spacing: .32em; text-transform: uppercase; padding-left: .32em; white-space: nowrap; }
.mast-kind { font-family: var(--display); font-size: 15px; letter-spacing: .06em; color: rgba(255,255,255,.88); margin-top: 18px; }
.mast-badge { display: inline-block; margin-left: 10px; padding: 2px 10px; border: 1px solid rgba(255,255,255,.6); border-radius: 30px; font-size: 13px; }
.mast-when { text-align: right; font-size: 15px; color: rgba(255,255,255,.88); line-height: 1.5; }
.mast-when b { display: block; font-weight: 700; font-size: 18px; color: #fff; }
.mast-head { font-family: var(--text); font-weight: 400; font-size: clamp(24px, 3vw, 36px); line-height: 1.38; color: #fff; max-width: 32ch; margin-top: 40px; }
@media (max-width: 640px) { .mast-when { text-align: left; } }

/* ---------- brief: three short columns under the headline ---------- */
.brief { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; padding: 44px 0 8px; }
.brief-i { border-top: 2px solid var(--plum); padding-top: 16px; }
.brief-role { font-family: var(--display); font-weight: 700; font-size: 17px; letter-spacing: .03em; color: var(--plum); margin-bottom: 10px; }
.brief-text { font-size: 16px; line-height: 1.6; color: var(--body); }
@media (max-width: 860px) { .brief { grid-template-columns: 1fr; gap: 26px; } }

/* ---------- nav ---------- */
.rail { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.96); border-bottom: 1px solid var(--rule); margin-top: 40px; }
.rail-in { display: flex; gap: 26px; overflow-x: auto; padding-top: 13px; padding-bottom: 13px; scrollbar-width: none; }
.rail-in::-webkit-scrollbar { display: none; }
.rail a { font-size: 15px; color: var(--muted); text-decoration: none; white-space: nowrap; padding-bottom: 2px; border-bottom: 2px solid transparent; }
.rail a:hover, .rail a:focus-visible { color: var(--plum); border-bottom-color: var(--plum); }

/* ---------- sections ---------- */
.sec { padding: 72px 0; border-top: 1px solid var(--rule-soft); }
.sec-wash { background: var(--wash); border-top: none; }
.sec-head { max-width: 62ch; margin-bottom: 36px; }
.sec-t { font-size: clamp(28px, 3vw, 40px); margin-bottom: 12px; letter-spacing: -.01em; }
.sec-lede { font-size: 19px; line-height: 1.6; color: var(--body); }

/* ---------- scoreboard ledger ---------- */
.lg { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.lg caption { text-align: left; }
.lg-cols th { font-weight: 400; font-size: 14px; color: var(--muted); text-align: right; padding: 0 0 10px 16px; vertical-align: bottom; line-height: 1.3; }
.lg-cols th:first-child { text-align: left; padding-left: 0; }
.lg-cols th small { display: block; font-size: 13px; opacity: .85; }
.lg-g th { text-align: left; font-family: var(--display); font-weight: 700; font-size: 19px; letter-spacing: .04em; color: var(--plum); padding: 30px 0 10px; border-bottom: 2px solid var(--plum); }
.lg-r td { padding: 16px 0 16px 16px; border-bottom: 1px solid var(--rule-soft); vertical-align: middle; text-align: right; }
.lg-r td:first-child { text-align: left; padding-left: 0; width: 42%; }
.lg-k { font-size: 17px; color: var(--ink); font-weight: 700; }
.lg-n { font-size: 14px; color: var(--muted); margin-top: 3px; max-width: 52ch; line-height: 1.5; font-weight: 400; }
.lg-v { font-size: 24px; color: var(--ink); font-weight: 700; font-variant-numeric: proportional-nums; }
.lg-p { font-size: 17px; color: var(--muted); }
.lg-c { font-size: 15px; color: var(--body); white-space: nowrap; }
.lg-c i { font-style: normal; color: var(--muted); margin-right: 4px; }
.spark { display: block; margin-left: auto; overflow: visible; }
@media (max-width: 760px) {
  .lg-cols { display: none; }
  .lg-r { display: grid; grid-template-columns: 1fr auto auto; gap: 4px 16px; padding: 14px 0; border-bottom: 1px solid var(--rule-soft); }
  .lg-r td { border: none; padding: 0; }
  .lg-r td:first-child { grid-column: 1 / -1; width: auto; }
  .lg-r td.lg-sp { grid-column: 1; text-align: left; }
  .spark { margin-left: 0; }
  .lg-r td.lg-pv { display: none; }
  .lg-g th { display: block; }
}

/* ---------- daily chart ---------- */
.chart svg { width: 100%; height: auto; display: block; overflow: visible; }
.chart text { font-family: var(--text); fill: var(--muted); font-size: 13px; }
.ch-narrow { display: none; }
@media (max-width: 640px) { .ch-wide { display: none; } .ch-narrow { display: block; } }
.chart .pk { fill: var(--ink); font-size: 14px; font-weight: 700; }
.chart .grid { stroke: var(--rule-soft); stroke-width: 1; }
.chart .base { stroke: var(--rule); stroke-width: 1; }
.chart .b-now { fill: var(--now); }
.chart .b-past { fill: var(--past); }
.chart svg[role="slider"] { cursor: crosshair; touch-action: pan-y; -webkit-tap-highlight-color: transparent; }
.chart svg[role="slider"]:focus { outline: none; }
.chart svg[role="slider"]:focus-visible { outline: 2px solid var(--plum); outline-offset: 6px; border-radius: 4px; }
.chart g.bar path.m { transition: opacity .15s ease; }
.chart g.bar.dim path.m { opacity: .28; }
.chart .dly-band { fill: var(--plum); opacity: .07; }
.chart text.dk { fill: var(--ink); font-weight: 700; }

/* readout above the daily chart */
.dly-read { display: flex; align-items: stretch; flex-wrap: wrap; gap: 0; margin: 4px 0 22px; min-height: 76px;
  background: #fff; border: 1px solid var(--rule-soft); border-radius: 8px; }
.dly-cell { display: flex; flex-direction: column; gap: 2px; padding: 12px 22px; border-right: 1px solid var(--rule-soft); min-width: 150px; }
.dly-k { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); display: inline-flex; align-items: center; gap: 7px; }
.dly-k i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
.dly-cell.now .dly-k i { background: var(--now); }
.dly-cell.past .dly-k i { background: var(--past); }
.dly-d { font-size: 15px; color: var(--body); }
.dly-v { font-size: 26px; line-height: 1.1; color: var(--ink); font-weight: 700; font-variant-numeric: tabular-nums; }
.dly-v small { font-size: 14px; font-weight: 400; color: var(--muted); }
.dly-cell.chg { border-right: none; }
.dly-hint { margin: 0 0 0 auto; align-self: center; padding: 12px 22px; max-width: 30ch; font-size: 14px; line-height: 1.45; color: var(--muted); }
.dly.on .dly-hint { visibility: hidden; }
@media (max-width: 760px) {
  .dly-read { min-height: 0; }
  .dly-cell { min-width: 0; flex: 1 1 0; padding: 10px 12px; }
  .dly-cell.chg { flex: 0 0 auto; }
  .dly-cell.chg .dly-d { display: none; }
  .dly-k { font-size: 11px; letter-spacing: .05em; gap: 5px; white-space: nowrap; }
  .dly-d { font-size: 14px; white-space: nowrap; }
  .dly-v { font-size: 21px; }
  .dly-v small { display: none; }
  .dly-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) { .chart g.bar path.m { transition: none; } }

/* trend-line scrubbing */
.spk { position: relative; display: inline-block; vertical-align: middle; }
.lg-sp .spk { float: right; }
.spk svg { cursor: crosshair; touch-action: pan-y; -webkit-tap-highlight-color: transparent; border-radius: 4px; }
.spk svg:focus { outline: none; }
.spk svg:focus-visible { outline: 2px solid var(--plum); outline-offset: 4px; }
.spk-g { stroke: var(--rule); stroke-width: 1; }
.spk-tip { position: absolute; bottom: calc(100% + 6px); transform: translateX(-50%); white-space: nowrap; pointer-events: none;
  background: var(--plum); color: #fff; border-radius: 6px; padding: 5px 9px; font-size: 13px; line-height: 1.2; z-index: 3;
  display: flex; gap: 8px; align-items: baseline; box-shadow: 0 2px 8px rgba(31,31,31,.14); }
.spk-tip b { font-size: 15px; font-variant-numeric: tabular-nums; }
.spk-tip span { opacity: .88; }
.spk-tip.l { transform: translateX(-10px); }
.spk-tip.r { transform: translateX(calc(-100% + 10px)); }
@media (max-width: 760px) { .lg-sp .spk { float: none; } }
.key { display: flex; gap: 24px; flex-wrap: wrap; font-size: 14px; color: var(--body); margin-bottom: 14px; }
.key span { display: inline-flex; align-items: center; gap: 8px; }
.key i { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
.note { margin-top: 24px; max-width: 66ch; font-size: 16px; line-height: 1.65; color: var(--body); }
.tv { margin-top: 18px; font-size: 15px; }
.tv summary { cursor: pointer; color: var(--plum); }
.tv table { margin-top: 12px; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.tv td, .tv th { padding: 5px 18px 5px 0; border-bottom: 1px solid var(--rule-soft); text-align: left; font-weight: 400; }
.tv th { color: var(--muted); }

/* ---------- engagement bars ---------- */
.eg { display: grid; gap: 18px; max-width: 900px; }
.eg-r { display: grid; grid-template-columns: 170px 1fr; gap: 6px 20px; align-items: center; }
.eg-l { font-size: 16px; color: var(--ink); font-weight: 700; }
.eg-b { position: relative; height: 22px; }
.eg-t { position: absolute; left: 0; top: 0; bottom: 0; background: var(--track); border-radius: 0 4px 4px 0; }
.eg-f { position: absolute; left: 0; top: 0; bottom: 0; background: var(--now); border-radius: 0 4px 4px 0; border-right: 2px solid var(--paper); }
.eg-f.z { display: none; }
.eg-v { grid-column: 2; font-size: 14px; color: var(--muted); }
.eg-v b { color: var(--ink); }
@media (max-width: 640px) { .eg-r { grid-template-columns: 1fr; } .eg-v { grid-column: 1; } }

/* ---------- what worked ---------- */
.hero { display: grid; grid-template-columns: minmax(280px, 400px) 1fr; gap: 48px; align-items: start; }
@media (max-width: 900px) { .hero { grid-template-columns: 1fr; } }
.ig { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; background: #1c1719; border-radius: 4px; }
.ig iframe { position: absolute; top: -56px; left: -1px; width: calc(100% + 2px); height: calc(100% + 130px); border: 0; }
.hero-meta { font-size: 15px; color: var(--muted); margin-bottom: 10px; }
.hero-t { font-size: clamp(22px, 2.2vw, 28px); line-height: 1.35; color: var(--ink); margin-bottom: 24px; max-width: 30ch; }
.stats { display: grid; grid-template-columns: repeat(4, auto); justify-content: start; gap: 8px 40px; padding: 18px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 22px; }
.stats b { display: block; font-size: 30px; font-weight: 700; color: var(--ink); line-height: 1.1; }
.stats span { font-size: 14px; color: var(--muted); }
@media (max-width: 520px) { .stats { grid-template-columns: repeat(2, auto); } }
.why { font-size: 16px; line-height: 1.7; max-width: 58ch; }
.gal { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 32px; margin-top: 56px; }
.gal .ig { aspect-ratio: 4/5; }
.gal-d { font-size: 14px; color: var(--muted); margin-top: 12px; }
.gal-t { font-size: 17px; font-weight: 700; line-height: 1.4; color: var(--ink); margin: 4px 0 8px; }
.gal-s { font-size: 14px; color: var(--body); font-variant-numeric: tabular-nums; }
.gal-note { margin-top: 32px; font-size: 15px; color: var(--muted); max-width: 66ch; }

/* ---------- text sections ---------- */
.soc { max-width: 70ch; }
.soc p { font-size: 17px; line-height: 1.7; padding: 18px 0; border-bottom: 1px solid var(--rule-soft); }
.soc-take { margin-top: 26px; padding: 22px 26px; border-left: 3px solid var(--plum); background: var(--paper); }
.soc-take h3 { font-family: var(--display); font-size: 16px; letter-spacing: .04em; margin-bottom: 6px; }
.att { display: grid; gap: 0; max-width: 78ch; }
.att-i { padding: 26px 0; border-bottom: 1px solid var(--rule-soft); }
.att-tag { font-family: var(--display); font-size: 14px; letter-spacing: .04em; color: var(--plum); font-weight: 700; margin-bottom: 6px; }
.att-t { font-size: 22px; margin-bottom: 10px; }
.att-b { font-size: 16px; line-height: 1.7; }
.learn { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px 56px; }
.learn h3 { font-size: 21px; margin-bottom: 10px; padding-top: 14px; border-top: 2px solid var(--slate); }
.learn p { font-size: 16px; line-height: 1.7; }
.mv-i { display: grid; grid-template-columns: 1fr 260px; gap: 36px; padding: 26px 0; border-bottom: 1px solid var(--rule-soft); }
.mv-i h3 { font-size: 22px; margin-bottom: 10px; }
.mv-i p { font-size: 16px; line-height: 1.7; }
.mv-m dt { font-size: 14px; color: var(--muted); }
.mv-m dd { font-size: 15px; color: var(--ink); margin-bottom: 12px; }
@media (max-width: 860px) { .mv-i { grid-template-columns: 1fr; gap: 12px; } }
.plan { max-width: 70ch; }
.plan-i { padding: 22px 0; border-bottom: 1px solid var(--rule-soft); }
.plan-i h3 { font-size: 22px; margin-bottom: 8px; }
.plan-i p { font-size: 16px; line-height: 1.7; }

/* ---------- detail ---------- */
.dt { border-top: 1px solid var(--rule); max-width: 900px; }
.dt details { border-bottom: 1px solid var(--rule); }
.dt summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-family: var(--display); font-weight: 700; font-size: 18px; letter-spacing: .04em; color: var(--plum); }
.dt summary::-webkit-details-marker { display: none; }
.dt summary::after { content: "+"; font-family: var(--text); font-size: 24px; color: var(--slate); }
.dt details[open] summary::after { content: "\\2013"; }
.dt-p { padding: 4px 0 30px; }
.dt table { width: 100%; max-width: 680px; border-collapse: collapse; margin-bottom: 18px; font-variant-numeric: tabular-nums; }
.dt td { padding: 9px 0; border-bottom: 1px solid var(--rule-soft); font-size: 15px; vertical-align: top; }
.dt td:first-child { color: var(--muted); padding-right: 24px; }
.dt td:last-child { text-align: right; color: var(--ink); font-weight: 700; }
.dt-note { font-size: 14px; line-height: 1.7; color: var(--muted); max-width: 70ch; }
.faq { padding: 14px 0; border-bottom: 1px solid var(--rule-soft); max-width: 70ch; }
.faq h3 { font-size: 16px; color: var(--ink); margin-bottom: 4px; }
.faq p { font-size: 15px; line-height: 1.65; color: var(--muted); }

.foot { background: var(--plum); color: rgba(255,255,255,.88); padding: 36px 0; font-size: 14px; }
.foot-in { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }

@media print {
  .rail, .ig, .tv { display: none; }
  .mast { background: #fff; color: var(--ink); }
  .mast-logo, .mast-head, .mast-when b { color: var(--plum); }
  .mast-wm { display: none; }
  .mast-logo img { filter: brightness(0) saturate(100%) invert(35%) sepia(10%) saturate(1200%) hue-rotate(275deg); }
  .mast-kind, .mast-when { color: var(--muted); }
  .dt details > *:not(summary) { display: block; }
  .sec { padding: 32px 0; break-inside: avoid; }
  .foot { background: #fff; color: var(--muted); border-top: 1px solid var(--rule); }
}
`;

/* EEC monogram from the brand guidelines' primary logo artwork, white with a
   transparent background, 640 × 400. Used as the masthead logo and, at low
   opacity, as the large background mark the guidelines use on color panels. */
const MONOGRAM = "data:image/png;base64,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";

/* --------------------------------------------------------------- helpers */

/* Daily chart wrapper. The interactive chart lives in charts.tsx; this server
   part adds weekday names (computed from the report year) and the table view. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function weekday(d: string, year: number) {
  const [mon, day] = d.split(" ");
  const m = MONTHS.indexOf(mon.slice(0, 3));
  return m < 0 ? "" : WEEKDAYS[new Date(Date.UTC(year, m, Number(day))).getUTCDay()];
}

function DailyChart({ data, bandA, bandB }: { data: { d: string; v: number; shade?: boolean }[]; bandA: string; bandB: string }) {
  const year = Number((/\d{4}/.exec(R.period) || ["0"])[0]);
  const days: Day[] = data.map((x) => ({ d: x.d, w: weekday(x.d, year), v: x.v, shade: x.shade }));
  return (
    <div className="chart">
      <div className="key">
        <span><i style={{ background: "var(--past)" }} />{bandA}</span>
        <span><i style={{ background: "var(--now)" }} />{bandB}</span>
      </div>
      <Daily data={days} unit="new visitors" nowLabel="This week" pastLabel="Week before" />
      <details className="tv">
        <summary>Show the daily figures as a table</summary>
        <table>
          <thead><tr><th scope="col">Day</th><th scope="col">New visitors</th></tr></thead>
          <tbody>{days.map((x) => <tr key={x.d}><td>{x.w}, {x.d}</td><td>{x.v}</td></tr>)}</tbody>
        </table>
      </details>
    </div>
  );
}

/* Visits by source: the full bar is every visit, the plum part the visits
   that engaged. One scale for all rows, so lengths compare directly. */
function Engagement({ rows }: { rows: { label: string; sessions: number; engaged: number; seconds: number }[] }) {
  const max = Math.max(...rows.map((r) => r.sessions));
  return (
    <div>
      <div className="key">
        <span><i style={{ background: "var(--now)" }} />Visits that engaged</span>
        <span><i style={{ background: "var(--track)" }} />All visits</span>
      </div>
      <div className="eg">
        {rows.map((r) => (
          <div className="eg-r" key={r.label}>
            <div className="eg-l">{r.label}</div>
            <div className="eg-b" role="img" aria-label={`${r.label}: ${r.engaged} of ${r.sessions} visits engaged`}>
              <div className="eg-t" style={{ width: `${(r.sessions / max) * 100}%` }} />
              <div className={`eg-f${r.engaged ? "" : " z"}`} style={{ width: `${(r.engaged / max) * 100}%` }} />
            </div>
            <div className="eg-v"><b>{r.engaged}</b> of {r.sessions.toLocaleString("en-US")} engaged, {r.seconds} seconds on average</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function igEmbed(url: string) {
  const m = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/p/${m[1]}/embed` : url;
}

function IgFrame({ url, title }: { url: string; title: string }) {
  return (
    <div className="ig">
      <iframe src={igEmbed(url)} title={title} scrolling="no" loading="lazy" allowFullScreen />
    </div>
  );
}

function Section({ id, title, lede, wash, children }: { id: string; title: string; lede?: string; wash?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`sec${wash ? " sec-wash" : ""}`} aria-labelledby={`${id}-t`}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-t" id={`${id}-t`}>{title}</h2>
          {lede ? <p className="sec-lede">{lede}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ================================================================== PAGE */
export default function Page() {
  const brief = R.brief.items.map((item) => (IS_INTERNAL ? item : item.client ?? item));
  const [head, ...rest] = brief;
  const groups: { name: string; rows: typeof R.scoreboard.rows }[] = [];
  for (const r of R.scoreboard.rows) {
    const g = groups.find((x) => x.name === r.group);
    if (g) g.rows.push(r); else groups.push({ name: r.group, rows: [r] });
  }
  const weeks = R.scoreboard.weeks;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="mast">
        <img className="mast-wm" src={MONOGRAM} alt="" aria-hidden="true" />
        <div className="wrap">
          <div className="mast-top">
            <div>
              <h1 className="mast-logo"><img src={MONOGRAM} alt="" width={128} height={80} /><span>{R.client}</span></h1>
              <p className="mast-kind">Weekly report{IS_INTERNAL ? <span className="mast-badge">Internal</span> : null}</p>
            </div>
            <p className="mast-when"><b>{R.period}</b>{R.compared}</p>
          </div>
          <p className="mast-head">{head.text}</p>
        </div>
      </header>

      <div className="wrap" id="brief">
        <div className="brief">
          {rest.map((b) => (
            <div className="brief-i" key={b.role}>
              <h2 className="brief-role">{b.role}</h2>
              <p className="brief-text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <nav className="rail" aria-label="Report sections">
        <div className="wrap rail-in">
          {NAV.filter((n) => n.id !== "brief").map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
      </nav>

      <main>
        <Section id="scoreboard" title="The week in numbers" lede={R.scoreboard.lede}>
          <table className="lg">
            <caption className="sr">Each measure this week and the week before, with its trend over {weeks.length} weeks</caption>
            <thead>
              <tr className="lg-cols">
                <th scope="col">Measure</th>
                <th scope="col">{weeks.length} weeks<small>{weeks[0]} to {weeks[weeks.length - 1]}</small></th>
                <th scope="col">{R.scoreboard.cols[0].label}<small>{R.scoreboard.cols[0].sub}</small></th>
                <th scope="col">Change</th>
                <th scope="col">{R.scoreboard.cols[1].label}<small>{R.scoreboard.cols[1].sub}</small></th>
              </tr>
            </thead>
            {groups.map((g) => (
              <tbody key={g.name}>
                <tr className="lg-g"><th colSpan={5} scope="colgroup">{g.name}</th></tr>
                {g.rows.map((r) => {
                  const c = r.cells[0].c;
                  const arrow = c.startsWith("+") ? "▲" : c.startsWith("−") ? "▼" : "";
                  return (
                    <tr className="lg-r" key={r.k}>
                      <td><div className="lg-k">{r.k}</div>{r.note ? <div className="lg-n">{r.note}</div> : null}</td>
                      <td className="lg-sp"><Spark name={r.k} values={r.trend} labels={weeks.slice(weeks.length - r.trend.length)} fmt={r.fmt as Fmt} /></td>
                      <td><span className="lg-v">{r.cells[0].v}</span></td>
                      <td className="lg-c">{arrow ? <i aria-hidden="true">{arrow}</i> : null}{c}</td>
                      <td className="lg-pv"><span className="lg-p">{r.cells[1].v}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            ))}
          </table>
        </Section>

        <Section id="period" title="New website visitors each day" lede={R.period_.lede} wash>
          <DailyChart data={R.period_.daily} bandA={R.period_.bandA} bandB={R.period_.bandB} />
          <p className="note">{IS_INTERNAL ? R.period_.note : R.period_.noteClient}</p>
        </Section>

        <Section id="engaged" title={R.engagement.title} lede={R.engagement.lede}>
          <Engagement rows={R.engagement.rows} />
          <p className="note">{IS_INTERNAL ? R.engagement.note : R.engagement.noteClient}</p>
        </Section>

        <Section id="worked" title="What worked" lede={IS_INTERNAL ? R.worked.lede : R.worked.ledeClient} wash>
          <div className="hero">
            <IgFrame url={R.worked.hero.url} title={R.worked.hero.title} />
            <div>
              <p className="hero-meta">{R.worked.hero.format}, {R.worked.hero.date}</p>
              <h3 className="hero-t">{R.worked.hero.title}</h3>
              <div className="stats">
                {R.worked.hero.stats.map((s) => <div key={s.l}><b>{s.v}</b><span>{s.l}</span></div>)}
              </div>
              <p className="why">{R.worked.hero.why}</p>
            </div>
          </div>
          {R.worked.gallery.length ? (
            <div className="gal">
              {R.worked.gallery.map((g) => (
                <div key={g.url}>
                  <IgFrame url={g.url} title={g.title} />
                  <p className="gal-d">{g.format}, {g.date}</p>
                  <p className="gal-t">{g.title}</p>
                  <p className="gal-s">{g.views.toLocaleString("en-US")} views, {g.reach.toLocaleString("en-US")} reach, {g.interactions} interactions</p>
                </div>
              ))}
            </div>
          ) : null}
          <p className="gal-note">{R.worked.galleryNote}</p>
        </Section>

        {has("social") ? (
          <Section id="social" title={R.social.title} lede={R.social.lede}>
            <div className="soc">
              {R.social.items.map((t) => <p key={t}>{t}</p>)}
              <div className="soc-take"><h3>Takeaway</h3><p>{R.social.takeaway}</p></div>
            </div>
          </Section>
        ) : null}

        {has("attention") ? (
          <Section id="attention" title="What needs attention" lede={R.attention.lede} wash>
            <div className="att">
              {R.attention.items.map((a) => (
                <div className="att-i" key={a.title}>
                  <p className="att-tag">{a.tag}</p>
                  <h3 className="att-t">{a.title}</h3>
                  <p className="att-b">{a.body}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="learned" title="What we learned" lede={R.learned.lede}>
          <div className="learn">
            {R.learned.items.map((item) => {
              const l = IS_INTERNAL ? item : item.client ?? item;
              return <div key={item.title}><h3>{l.title}</h3><p>{l.body}</p></div>;
            })}
          </div>
        </Section>

        {has("moves") ? (
          <Section id="moves" title="Recommended next moves" lede={R.moves.lede} wash>
            {R.moves.items.map((m) => (
              <div className="mv-i" key={m.action}>
                <div><h3>{m.action}</h3><p>{m.body}</p></div>
                <dl className="mv-m"><dt>Owner</dt><dd>{m.owner}</dd><dt>Measured by</dt><dd>{m.metric}</dd></dl>
              </div>
            ))}
          </Section>
        ) : null}

        {has("plan") ? (
          <Section id="plan" title="What we do next" lede={R.plan.lede}>
            <div className="plan">
              {R.plan.items.map((p) => <div className="plan-i" key={p.action}><h3>{p.action}</h3><p>{p.body}</p></div>)}
            </div>
          </Section>
        ) : null}

        <Section id="detail" title="Supporting detail" lede={R.detail.lede} wash>
          <div className="dt">
            {R.detail.panels.map((p) => {
              const note = !IS_INTERNAL && "noteClient" in p && p.noteClient ? p.noteClient : p.note;
              const faq = "faq" in p ? (p.faq as { q: string; a: string }[]) : [];
              return (
                <details key={p.id}>
                  <summary>{p.title}</summary>
                  <div className="dt-p">
                    {p.rows.length ? (
                      <table><tbody>{p.rows.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td></tr>)}</tbody></table>
                    ) : null}
                    {faq.map((f) => <div className="faq" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}
                    {note ? <p className="dt-note">{note}</p> : null}
                  </div>
                </details>
              );
            })}
          </div>
        </Section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>{R.client}, weekly report for {R.period}</span>
          <span>Prepared by {R.studio}</span>
        </div>
      </footer>
    </>
  );
}
