import { R, IS_INTERNAL, NAV, has } from "./report-data";

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

   Type: Prata for titles, Marcellus for the narrative, Glacial Indifference
   for body text and every number. Data colors (#8A3A6E this week, #3A8CB5
   earlier weeks) pass the six-check palette validator on white; the
   practice's own plum stays for type and structure.
   ========================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Prata&family=Marcellus&display=swap');
@font-face { font-family: 'Glacial Indifference'; src: url('/fonts/GlacialIndifference-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: 'Glacial Indifference'; src: url('/fonts/GlacialIndifference-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }

:root {
  --plum: #68505D;
  --plum-deep: #4E3B46;
  --ink: #241D21;
  --body: #3A3236;
  --muted: #6F666B;
  --paper: #FFFFFF;
  --wash: #F5F0EE;
  --rule: #DDD5D0;
  --rule-soft: #ECE6E2;
  --now: #8A3A6E;
  --past: #3A8CB5;
  --track: #E2DAD5;
  --display: 'Prata', Georgia, serif;
  --narr: 'Marcellus', Georgia, serif;
  --text: 'Glacial Indifference', 'Helvetica Neue', Arial, sans-serif;
  --max: 1180px;
  --gut: clamp(20px, 5vw, 64px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body { font-family: var(--text); font-size: 17px; line-height: 1.6; color: var(--body); background: var(--paper); -webkit-font-smoothing: antialiased; }
h1, h2, h3 { font-family: var(--display); font-weight: 400; color: var(--plum); line-height: 1.2; text-wrap: balance; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--now); outline-offset: 3px; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.wrap { max-width: var(--max); margin: 0 auto; padding-left: var(--gut); padding-right: var(--gut); }

/* ---------- masthead: the week's headline is the hero ---------- */
.mast { background: var(--plum); color: #fff; padding: 40px 0 56px; }
.mast-top { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; flex-wrap: wrap; padding-bottom: 22px; border-bottom: 1px solid rgba(255,255,255,.28); }
.mast-name { font-family: var(--display); font-size: clamp(26px, 3.4vw, 40px); color: #fff; line-height: 1.15; }
.mast-kind { font-size: 15px; color: rgba(255,255,255,.82); margin-top: 6px; }
.mast-badge { display: inline-block; margin-left: 10px; padding: 2px 10px; border: 1px solid rgba(255,255,255,.6); border-radius: 30px; font-size: 13px; }
.mast-when { text-align: right; font-size: 15px; color: rgba(255,255,255,.88); line-height: 1.5; }
.mast-when b { display: block; font-weight: 700; font-size: 18px; color: #fff; }
.mast-head { font-family: var(--narr); font-size: clamp(24px, 3.1vw, 38px); line-height: 1.35; color: #fff; max-width: 30ch; margin-top: 40px; }
@media (max-width: 640px) { .mast-when { text-align: left; } }

/* ---------- brief: three short columns under the headline ---------- */
.brief { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; padding: 44px 0 8px; }
.brief-i { border-top: 2px solid var(--plum); padding-top: 16px; }
.brief-role { font-family: var(--display); font-size: 19px; color: var(--plum); margin-bottom: 10px; }
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
.sec-t { font-size: clamp(26px, 2.8vw, 36px); margin-bottom: 12px; }
.sec-lede { font-family: var(--narr); font-size: 19px; line-height: 1.55; color: var(--body); }

/* ---------- scoreboard ledger ---------- */
.lg { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.lg caption { text-align: left; }
.lg-cols th { font-weight: 400; font-size: 14px; color: var(--muted); text-align: right; padding: 0 0 10px 16px; vertical-align: bottom; line-height: 1.3; }
.lg-cols th:first-child { text-align: left; padding-left: 0; }
.lg-cols th small { display: block; font-size: 13px; opacity: .85; }
.lg-g th { text-align: left; font-family: var(--display); font-weight: 400; font-size: 21px; color: var(--plum); padding: 30px 0 10px; border-bottom: 2px solid var(--plum); }
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
.chart .hv { opacity: 0; }
.chart g.bar:hover .hv, .chart g.bar:focus .hv { opacity: 1; }
.chart g.bar:hover rect.m, .chart g.bar:focus rect.m { opacity: .8; }
.chart g.bar:focus { outline: none; }
.chart g.bar:focus rect.hit { stroke: var(--now); stroke-width: 2; }
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
.hero-t { font-family: var(--narr); font-size: clamp(22px, 2.2vw, 28px); line-height: 1.35; color: var(--ink); margin-bottom: 24px; max-width: 30ch; }
.stats { display: grid; grid-template-columns: repeat(4, auto); justify-content: start; gap: 8px 40px; padding: 18px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 22px; }
.stats b { display: block; font-size: 30px; font-weight: 700; color: var(--ink); line-height: 1.1; }
.stats span { font-size: 14px; color: var(--muted); }
@media (max-width: 520px) { .stats { grid-template-columns: repeat(2, auto); } }
.why { font-size: 16px; line-height: 1.7; max-width: 58ch; }
.gal { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 32px; margin-top: 56px; }
.gal .ig { aspect-ratio: 4/5; }
.gal-d { font-size: 14px; color: var(--muted); margin-top: 12px; }
.gal-t { font-family: var(--narr); font-size: 17px; line-height: 1.4; color: var(--ink); margin: 4px 0 8px; }
.gal-s { font-size: 14px; color: var(--body); font-variant-numeric: tabular-nums; }
.gal-note { margin-top: 32px; font-size: 15px; color: var(--muted); max-width: 66ch; }

/* ---------- text sections ---------- */
.soc { max-width: 70ch; }
.soc p { font-size: 17px; line-height: 1.7; padding: 18px 0; border-bottom: 1px solid var(--rule-soft); }
.soc-take { margin-top: 26px; padding: 22px 26px; border-left: 3px solid var(--plum); background: var(--paper); }
.soc-take h3 { font-size: 18px; margin-bottom: 6px; }
.att { display: grid; gap: 0; max-width: 78ch; }
.att-i { padding: 26px 0; border-bottom: 1px solid var(--rule-soft); }
.att-tag { font-size: 14px; color: var(--now); font-weight: 700; margin-bottom: 6px; }
.att-t { font-size: 22px; margin-bottom: 10px; }
.att-b { font-size: 16px; line-height: 1.7; }
.learn { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px 56px; }
.learn h3 { font-size: 21px; margin-bottom: 10px; padding-top: 14px; border-top: 2px solid var(--past); }
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
.dt summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-family: var(--narr); font-size: 20px; color: var(--plum); }
.dt summary::-webkit-details-marker { display: none; }
.dt summary::after { content: "+"; font-family: var(--text); font-size: 24px; color: var(--past); }
.dt details[open] summary::after { content: "\\2013"; }
.dt-p { padding: 4px 0 30px; }
.dt table { width: 100%; max-width: 680px; border-collapse: collapse; margin-bottom: 18px; font-variant-numeric: tabular-nums; }
.dt td { padding: 9px 0; border-bottom: 1px solid var(--rule-soft); font-size: 15px; vertical-align: top; }
.dt td:first-child { color: var(--muted); padding-right: 24px; }
.dt td:last-child { text-align: right; color: var(--ink); font-weight: 700; }
.dt-note { font-size: 14px; line-height: 1.7; color: var(--muted); max-width: 70ch; }
.faq { padding: 14px 0; border-bottom: 1px solid var(--rule-soft); max-width: 70ch; }
.faq h3 { font-family: var(--narr); font-size: 17px; color: var(--ink); margin-bottom: 4px; }
.faq p { font-size: 15px; line-height: 1.65; color: var(--muted); }

.foot { background: var(--plum-deep); color: rgba(255,255,255,.85); padding: 36px 0; font-size: 14px; }
.foot-in { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }

@media print {
  .rail, .ig, .tv { display: none; }
  .mast { background: #fff; color: var(--ink); }
  .mast-name, .mast-head, .mast-when b { color: var(--plum); }
  .mast-kind, .mast-when { color: var(--muted); }
  .dt details > *:not(summary) { display: block; }
  .sec { padding: 32px 0; break-inside: avoid; }
  .foot { background: #fff; color: var(--muted); border-top: 1px solid var(--rule); }
}
`;

/* --------------------------------------------------------------- helpers */

type Trend = { values: number[]; labels: string[]; fmt?: "int" | "pct" | "pos" };

function fmtVal(v: number, f?: Trend["fmt"]) {
  if (f === "pct") return `${v.toFixed(2)}%`;
  if (f === "pos") return v.toFixed(2);
  return v.toLocaleString("en-US");
}

/* Five-week trend line: earlier weeks in blue, this week as a plum end dot.
   Shape only, scaled to the row's own range; the values sit in the <title>
   and in the screen-reader text, so nothing depends on reading the line. */
function Spark({ t }: { t: Trend }) {
  const W = 120, H = 30, P = 5;
  const v = t.values;
  const lo = Math.min(...v), hi = Math.max(...v);
  const span = hi - lo || 1;
  const x = (i: number) => P + (i * (W - 2 * P)) / Math.max(v.length - 1, 1);
  const y = (n: number) => H - P - ((n - lo) / span) * (H - 2 * P);
  const pts = v.map((n, i) => `${x(i).toFixed(1)},${y(n).toFixed(1)}`).join(" ");
  const said = v.map((n, i) => `${t.labels[i]}: ${fmtVal(n, t.fmt)}`).join(", ");
  const last = v.length - 1;
  return (
    <svg className="spark" width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Weekly trend. ${said}`}>
      <title>{said}</title>
      <polyline points={pts} fill="none" stroke="var(--past)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {last > 0 ? <circle cx={x(last - 1)} cy={y(v[last - 1])} r="3" fill="var(--past)" stroke="#fff" strokeWidth="2" /> : null}
      <circle cx={x(last)} cy={y(v[last])} r="4.5" fill="var(--now)" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

function niceMax(n: number) {
  const steps = [10, 20, 25, 50, 100, 200, 250, 500, 1000];
  for (const s of steps) { const m = Math.ceil(n / s) * s; if (m / s <= 5) return { max: m, step: s }; }
  return { max: Math.ceil(n / 1000) * 1000, step: 1000 };
}

/* Daily column chart, rendered on the server as SVG. Earlier week in blue,
   this week in plum. The highest day of each week carries its value; every
   bar shows its value on hover or keyboard focus, and the table below holds
   all of them. */
function DailyChart({ data, bandA, bandB }: { data: { d: string; v: number; shade?: boolean }[]; bandA: string; bandB: string }) {
  return (
    <div className="chart">
      <div className="key">
        <span><i style={{ background: "var(--past)" }} />{bandA}</span>
        <span><i style={{ background: "var(--now)" }} />{bandB}</span>
      </div>
      <div className="ch-wide"><DailySvg data={data} W={1000} H={280} /></div>
      <div className="ch-narrow"><DailySvg data={data} W={420} H={300} /></div>
      <details className="tv">
        <summary>Show the daily figures as a table</summary>
        <table>
          <thead><tr><th scope="col">Day</th><th scope="col">New visitors</th></tr></thead>
          <tbody>{data.map((x) => <tr key={x.d}><td>{x.d}</td><td>{x.v}</td></tr>)}</tbody>
        </table>
      </details>
    </div>
  );
}

function DailySvg({ data, W, H }: { data: { d: string; v: number; shade?: boolean }[]; W: number; H: number }) {
  const L = 36, T = 26, B = 34;
  const ph = H - T - B, pw = W - L - 8;
  const { max, step } = niceMax(Math.max(...data.map((x) => x.v)));
  const slot = pw / data.length;
  const bw = Math.min(28, slot * 0.62);
  const y = (n: number) => T + ph - (n / max) * ph;
  const ticks: number[] = [];
  for (let t = 0; t <= max; t += step) ticks.push(t);
  const weeks = [data.filter((x) => x.shade), data.filter((x) => !x.shade)];
  const peaks = new Set(weeks.map((w) => w.reduce((a, b) => (b.v > a.v ? b : a), w[0])?.d));
  const split = data.findIndex((x) => !x.shade);
  const narrow = W < 600;
  return (
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="New website visitors each day across both weeks. Values are in the table below.">
        {ticks.map((t) => (
          <g key={t}>
            <line className={t === 0 ? "base" : "grid"} x1={L} x2={W} y1={y(t)} y2={y(t)} />
            <text x={L - 10} y={y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        {split > 0 ? <line className="base" x1={L + split * slot} x2={L + split * slot} y1={T - 8} y2={T + ph} /> : null}
        {data.map((x, i) => {
          const cx = L + i * slot + slot / 2;
          const top = y(x.v);
          const h = Math.max(T + ph - top, 2);
          const r = Math.min(4, bw / 2, h / 2);
          const path = `M${cx - bw / 2},${T + ph} V${top + r} Q${cx - bw / 2},${top} ${cx - bw / 2 + r},${top} H${cx + bw / 2 - r} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + r} V${T + ph} Z`;
          const isPeak = peaks.has(x.d);
          return (
            <g key={x.d} className="bar" tabIndex={0} aria-label={`${x.d}: ${x.v}`}>
              <title>{`${x.d}: ${x.v}`}</title>
              <rect className="hit" x={L + i * slot + 1} y={T} width={slot - 2} height={ph} fill="transparent" />
              <path className={`m ${x.shade ? "b-past" : "b-now"}`} d={path} />
              {isPeak ? <text className="pk" x={cx} y={top - 8} textAnchor="middle">{x.v}</text> : <text className="pk hv" x={cx} y={top - 8} textAnchor="middle">{x.v}</text>}
              {i === 0 || i === split || i === data.length - 1 || (isPeak && !narrow) ? <text x={cx} y={H - 10} textAnchor={narrow && i === data.length - 1 ? "end" : narrow && i === 0 ? "start" : "middle"}>{x.d}</text> : null}
            </g>
          );
        })}
      </svg>
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
        <div className="wrap">
          <div className="mast-top">
            <div>
              <h1 className="mast-name">{R.client}</h1>
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
                      <td className="lg-sp"><Spark t={{ values: r.trend, labels: weeks.slice(weeks.length - r.trend.length), fmt: r.fmt as Trend["fmt"] }} /></td>
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
