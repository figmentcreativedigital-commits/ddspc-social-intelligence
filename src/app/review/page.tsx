import type { Metadata } from "next";
import { RV, IS_INTERNAL, NAV, has, WINDOWS, DEFAULT_WIN, type WinId, type Row, type Chart } from "./review-data";
import { MONOGRAM } from "./monogram";

/* ==========================================================================
   3, 6 AND 12-MONTH REVIEW  ·  Edgard El Chaar, DDS, PC  ·  /review
   --------------------------------------------------------------------------
   Structure and styling only; every figure, date and sentence lives in
   review-data.ts in this folder.

   SERVER-RENDERED, NO SCRIPT. No "use client", no hooks, no imports from the
   weekly report. The 3 / 6 / 12-month switch is 3 radio inputs and CSS
   :has(), so review-data.ts never reaches the browser and there is nothing to
   hydrate.

   STYLE. The CSS below is the weekly page's (src/app/page.tsx) copied as it
   stands on 21ebf26, followed by the review's own additions. The weekly page
   is not modified; if its styling changes, copy the block again.
   ========================================================================== */

export const metadata: Metadata = {
  title: "Edgard El Chaar, DDS, PC: 3, 6 and 12-month review",
  description: "3, 6 and 12-month review prepared by Figment Creative.",
  robots: { index: false, follow: false },
};

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
.mast { position: relative; overflow: hidden; background: var(--plum); color: #fff; padding: 56px 0 72px; }
.mast-wm { position: absolute; right: -9%; top: 50%; transform: translateY(-50%); width: min(50vw, 640px); opacity: .055; pointer-events: none; }
.mast .wrap { position: relative; }
.mast-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; padding-bottom: 28px; border-bottom: 1px solid rgba(255,255,255,.3); }
.mast-logo { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; color: #fff; font-family: var(--text); font-weight: 400; }
.mast-logo img { width: 128px; height: auto; display: block; }
.mast-logo span { font-size: 12px; letter-spacing: .32em; text-transform: uppercase; padding-left: .32em; white-space: nowrap; }
.mast-kind { font-family: var(--display); font-size: 15px; letter-spacing: .06em; color: rgba(255,255,255,.9); margin-top: 18px; }
.mast-badge { display: inline-block; margin-left: 10px; padding: 2px 10px; border: 1px solid rgba(255,255,255,.6); border-radius: 30px; font-size: 13px; }
.mast-when { text-align: right; font-size: 15px; color: rgba(255,255,255,.9); line-height: 1.5; }
.mast-when b { display: block; font-weight: 700; font-size: 18px; color: #fff; }

/* The lead block runs kicker, headline, deck, then the figure row. The gaps
   step 52 / 18 / 26 / 60 rather than sitting on one flat value, which is what
   stopped the band reading as a single condensed column. Every colour on the
   plum ground is at least 90% white: below that, 12px text drops under 4.5:1. */
.mast-kicker { font-family: var(--display); font-size: 13px; letter-spacing: .26em; text-transform: uppercase; color: rgba(255,255,255,.9); margin-top: 52px; margin-bottom: 18px; }
.mast-head { font-family: var(--text); font-weight: 400; font-size: clamp(28px, 3.9vw, 50px); line-height: 1.2; letter-spacing: -.008em; color: #fff; max-width: 22ch; }
.mast-deck { font-size: clamp(16px, 1.4vw, 18px); line-height: 1.65; color: rgba(255,255,255,.9); max-width: 50ch; margin-top: 26px; }
.mast-note { font-size: 15px; line-height: 1.65; color: rgba(255,255,255,.9); max-width: 70ch; margin-top: 24px; }
.mast-figs { display: flex; flex-wrap: wrap; margin-top: 60px; border-top: 1px solid rgba(255,255,255,.3); padding-top: 40px; }
.mast-fig { flex: 1 1 190px; padding: 0 40px; border-left: 1px solid rgba(255,255,255,.26); }
.mast-fig:first-child { padding-left: 0; border-left: 0; }
.mast-fig b { display: block; font-family: var(--display); font-weight: 700; font-size: clamp(40px, 5vw, 64px); line-height: 1; color: #fff; }
.mast-fig span { display: block; font-size: 12px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.9); margin-top: 14px; }
.mast-fignote { flex: 1 1 230px; align-self: flex-end; padding-left: 40px; border-left: 1px solid rgba(255,255,255,.26); font-size: 15px; line-height: 1.6; color: rgba(255,255,255,.9); }
@media (max-width: 640px) {
  .mast-when { text-align: left; }
  .mast-figs { gap: 28px; padding-top: 28px; }
  .mast-fig, .mast-fignote { flex-basis: 100%; padding-left: 0; border-left: 0; }
}

/* ---------- brief: short columns under the headline ---------- */
/* auto-fit, not repeat(3): the client build carries fewer items than the
   internal one, and a fixed 3-track grid left the client an empty cell. */
.brief { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px; padding: 60px 0 8px; }
.brief-i { border-top: 2px solid var(--plum); padding-top: 20px; }
.brief-role { font-family: var(--display); font-weight: 700; font-size: 18px; letter-spacing: .03em; color: var(--plum); margin-bottom: 14px; }
.brief-text { font-size: 16px; line-height: 1.72; color: var(--body); }
@media (max-width: 860px) { .brief { grid-template-columns: 1fr; gap: 30px; } }

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
  .mast-logo, .mast-head, .mast-when b, .mast-kicker, .mast-fig b { color: var(--plum); }
  .mast-wm { display: none; }
  .mast-logo img { filter: brightness(0) saturate(100%) invert(35%) sepia(10%) saturate(1200%) hue-rotate(275deg); }
  .mast-kind, .mast-when, .mast-deck, .mast-note, .mast-fig span, .mast-fignote { color: var(--muted); }
  .mast-top, .mast-figs { border-color: var(--rule); }
  .mast-fig, .mast-fignote { border-left-color: var(--rule); }
  .dt details > *:not(summary) { display: block; }
  .sec { padding: 32px 0; break-inside: avoid; }
  .foot { background: #fff; color: var(--muted); border-top: 1px solid var(--rule); }
}
`;

/* Additions for the review. The window switch is CSS only: 3 radio inputs in
   the rail, and :has() on the page wrapper shows the matching .wv block and
   colors the month charts. No script, nothing to hydrate. Browsers without
   :has() show the default window, which the rules below build from
   DEFAULT_WIN. */
const REVIEW_CSS = `
.seg { display: inline-flex; flex: none; align-items: center; gap: 2px; padding: 3px; border: 1px solid var(--rule); border-radius: 30px; margin: 0 6px 0 0; }
.seg legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.seg label { position: relative; cursor: pointer; }
.seg input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.seg span { display: block; font-size: 14px; line-height: 1.2; padding: 7px 14px; border-radius: 30px; color: var(--muted); white-space: nowrap; }
.seg input:checked + span { background: var(--plum); color: #fff; }
.seg input:focus-visible + span { outline: 2px solid var(--plum); outline-offset: 2px; }
.seg label:hover span { color: var(--plum); }
.seg input:checked + span, .seg label:hover input:checked + span { color: #fff; }
.rail-in { align-items: center; }
.rail-sep { width: 1px; align-self: stretch; background: var(--rule); flex: none; }

.wv { display: none; }

.mast-when small { display: block; font-size: 14px; color: rgba(255,255,255,.9); }

.lg-na { font-size: 14px; color: var(--muted); text-align: right; }
.lg-ni { font-size: 14px; color: var(--plum); margin-top: 6px; max-width: 60ch; line-height: 1.5; }
.lg-ni b { font-weight: 700; }
@media (max-width: 760px) { .lg-r td.lg-na { grid-column: 2 / -1; text-align: right; } }

.mcs { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 48px 56px; }
.mc h3 { font-size: 20px; margin-bottom: 4px; }
.mc-cap { font-size: 15px; color: var(--ink); font-weight: 700; margin-bottom: 12px; font-variant-numeric: tabular-nums; }
.mc-note { font-size: 14px; color: var(--muted); margin-top: 10px; line-height: 1.55; }
.mc svg { width: 100%; height: auto; display: block; overflow: visible; }
.mc text { font-family: var(--text); fill: var(--muted); font-size: 12px; }
.mc .grid { stroke: var(--rule-soft); stroke-width: 1; }
.mc .base { stroke: var(--rule); stroke-width: 1; }
.mc rect.b { fill: var(--rule); }
.mc .tv { margin-top: 10px; font-size: 14px; }
@media (max-width: 420px) { .mcs { grid-template-columns: 1fr; } }

.srch { max-width: 70ch; }
.srch p { font-size: 17px; line-height: 1.7; padding: 16px 0; border-bottom: 1px solid var(--rule-soft); }
.srch-int { margin-top: 30px; padding: 22px 26px; border-left: 3px solid var(--plum); background: var(--paper); max-width: 78ch; }
.srch-int h3 { font-family: var(--display); font-size: 16px; letter-spacing: .04em; margin-bottom: 8px; }
.srch-int p { font-size: 16px; line-height: 1.7; padding: 8px 0; }
.st { width: 100%; max-width: 860px; border-collapse: collapse; margin-top: 30px; font-variant-numeric: tabular-nums; }
.st th { font-weight: 400; font-size: 14px; color: var(--muted); text-align: right; padding: 0 0 10px 14px; border-bottom: 2px solid var(--plum); }
.st th:first-child, .st td:first-child { text-align: left; padding-left: 0; }
.st td { padding: 12px 0 12px 14px; border-bottom: 1px solid var(--rule-soft); text-align: right; font-size: 16px; color: var(--ink); }
.st-wrap { overflow-x: auto; }
.st-note { font-size: 14px; color: var(--muted); margin-top: 12px; max-width: 70ch; }

@media print { .seg { display: none; } }
`;

const WIN_IDS = WINDOWS.map((w) => w.id);
const num = (id: WinId) => id.replace("m", "");

/* The switch rules, built from the window list so the default lives in one
   place (review-data.ts). Resets come before highlights: a bar can belong to
   several windows, and the later rule of equal weight wins. */
function switchCss() {
  const on = (w: WinId) => `.rv:has(#win-${w}:checked)`;
  const others = WIN_IDS.filter((w) => w !== DEFAULT_WIN);
  const d = num(DEFAULT_WIN);
  const lines: string[] = [];
  lines.push(`.wv-${DEFAULT_WIN} { display: block; }`);
  lines.push(`.mc rect.i${d} { fill: var(--now); }`, `.mc rect.p${d} { fill: var(--past); }`);
  lines.push(`.hide-${DEFAULT_WIN} { display: none; }`);
  for (const w of others) {
    lines.push(`${on(w)} .wv-${DEFAULT_WIN} { display: none; }`);
    lines.push(`${on(w)} .wv-${w} { display: block; }`);
    lines.push(`${on(w)} .mc rect.i${d}, ${on(w)} .mc rect.p${d} { fill: var(--rule); }`);
    lines.push(`${on(w)} .hide-${DEFAULT_WIN} { display: block; }`);
  }
  for (const w of others) {
    const n = num(w);
    lines.push(`${on(w)} .mc rect.i${n} { fill: var(--now); }`, `${on(w)} .mc rect.p${n} { fill: var(--past); }`);
    lines.push(`${on(w)} .hide-${w} { display: none; }`);
  }
  return lines.join("\n");
}

/* --------------------------------------------------------------- helpers */

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthLong = (m: string) => `${MONTH_NAMES[Number(m.slice(5, 7)) - 1]} ${m.slice(0, 4)}`;
const monthShort = (m: string) => `${MONTH_NAMES[Number(m.slice(5, 7)) - 1].slice(0, 3)} ${m.slice(0, 4)}`;
const fmtInt = (v: number) => v.toLocaleString("en-US");
const fmtTick = (v: number) => (v >= 10000 ? `${v / 1000}k` : v.toLocaleString("en-US"));

function niceMax(n: number) {
  const steps = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000];
  for (const s of steps) { const m = Math.ceil(n / s) * s; if (m / s <= 4) return { max: m, step: s }; }
  return { max: Math.ceil(n / 100000) * 100000, step: 100000 };
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

/* One block per window; the switch shows the selected one. */
function PerWin({ render, className }: { render: (w: (typeof WINDOWS)[number]) => React.ReactNode; className?: string }) {
  return (
    <>
      {WINDOWS.map((w) => (
        <div key={w.id} className={`wv wv-${w.id}${className ? ` ${className}` : ""}`}>{render(w)}</div>
      ))}
    </>
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

/* Monthly bars, server-rendered. Each bar carries a class per window it
   belongs to (i3, i6, i12) and per window it is the comparison for (p3, p6,
   p12, only where that window is compared); the switch CSS colors them. */
function MonthChart({ c }: { c: Chart }) {
  const W = 560, H = 196, L = 44, R = 6, T = 14, B = 30;
  const pw = W - L - R, ph = H - T - B;
  const n = c.points.length;
  const slot = pw / n;
  const bw = Math.max(4, Math.min(24, slot * 0.66));
  const { max, step } = niceMax(Math.max(1, ...c.points.map((p) => p.v)));
  const y = (v: number) => T + ph - (v / max) * ph;
  const ticks: number[] = [];
  for (let t = 0; t <= max; t += step) ticks.push(t);
  const last = n - 1;
  const labelAt = new Set<number>([0, last]);
  c.points.forEach((p, i) => { if (p.m.endsWith("-01") && i > 2 && i < last - 2) labelAt.add(i); });
  const cls = (m: string) =>
    WINDOWS.flatMap((w) => [
      w.months.includes(m) ? `i${num(w.id)}` : "",
      c.priorIn.includes(w.id) && w.priorMonths.includes(m) ? `p${num(w.id)}` : "",
    ]).filter(Boolean).join(" ");
  const hidden = WIN_IDS.filter((w) => !c.caption[w]).map((w) => `hide-${w}`).join(" ");
  return (
    <figure className={`mc${hidden ? ` ${hidden}` : ""}`}>
      <h3>{c.title}</h3>
      <PerWin render={(w) => (c.caption[w.id] ? <p className="mc-cap">{w.label}: {c.caption[w.id]}</p> : null)} />
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${c.title} by month, ${monthLong(c.points[0].m)} to ${monthLong(c.points[last].m)}. The figures are in the table below.`}>
        {ticks.map((t) => (
          <g key={t}>
            <line className={t === 0 ? "base" : "grid"} x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
            <text x={L - 8} y={y(t) + 4} textAnchor="end">{fmtTick(t)}</text>
          </g>
        ))}
        {c.points.map((p, i) => {
          const cx = L + i * slot + slot / 2;
          const h = Math.max((p.v / max) * ph, p.v > 0 ? 2 : 0);
          return (
            <g key={p.m}>
              <rect className={`b ${cls(p.m)}`} x={cx - bw / 2} y={T + ph - h} width={bw} height={h} rx={Math.min(3, bw / 2)}>
                <title>{`${monthLong(p.m)}: ${fmtInt(p.v)} ${c.unit}`}</title>
              </rect>
              {labelAt.has(i) ? (
                <text x={cx} y={H - 8} textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}>{i === 0 || i === last ? monthShort(p.m) : p.m.slice(0, 4)}</text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <p className="mc-note">{c.note}</p>
      <details className="tv">
        <summary>Show the monthly figures as a table</summary>
        <table>
          <thead><tr><th scope="col">Month</th><th scope="col">{c.title}</th></tr></thead>
          <tbody>{c.points.map((p) => <tr key={p.m}><td>{monthLong(p.m)}</td><td>{fmtInt(p.v)}</td></tr>)}</tbody>
        </table>
      </details>
    </figure>
  );
}

function Numbers({ w }: { w: (typeof WINDOWS)[number] }) {
  const rows = RV.numbers.rows[w.id];
  const groups: { name: string; rows: Row[] }[] = [];
  for (const r of rows) {
    const g = groups.find((x) => x.name === r.group);
    if (g) g.rows.push(r); else groups.push({ name: r.group, rows: [r] });
  }
  return (
    <table className="lg">
      <caption className="sr">Each measure for {w.period} against {w.prior}</caption>
      <thead>
        <tr className="lg-cols">
          <th scope="col">Measure</th>
          <th scope="col">{w.label}<small>{w.period}</small></th>
          <th scope="col">Change</th>
          <th scope="col">Period before<small>{w.prior}</small></th>
        </tr>
      </thead>
      {groups.map((g) => (
        <tbody key={g.name}>
          <tr className="lg-g"><th colSpan={4} scope="colgroup">{g.name}</th></tr>
          {g.rows.map((r) => {
            const c = r.c ?? "";
            const arrow = c.startsWith("+") ? "▲" : c.startsWith("−") ? "▼" : "";
            return (
              <tr className="lg-r" key={r.k}>
                <td>
                  <div className="lg-k">{r.k}</div>
                  <div className="lg-n">{r.note}</div>
                  {IS_INTERNAL && r.noteInternal ? <div className="lg-ni"><b>Internal: </b>{r.noteInternal}</div> : null}
                </td>
                <td><span className="lg-v">{r.v}</span></td>
                {r.na ? (
                  <td className="lg-na" colSpan={2}>{r.na}</td>
                ) : (
                  <>
                    <td className="lg-c">{arrow ? <i aria-hidden="true">{arrow}</i> : null}{c}</td>
                    <td className="lg-pv"><span className="lg-p">{r.prior}</span></td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      ))}
    </table>
  );
}

/* ================================================================== PAGE */
export default function ReviewPage() {
  return (
    <div className="rv">
      <style dangerouslySetInnerHTML={{ __html: CSS + REVIEW_CSS + switchCss() }} />

      <header className="mast">
        <img className="mast-wm" src={MONOGRAM} alt="" aria-hidden="true" />
        <div className="wrap">
          <div className="mast-top">
            <div>
              <h1 className="mast-logo"><img src={MONOGRAM} alt="" width={128} height={80} /><span>{RV.client}</span></h1>
              <p className="mast-kind">3, 6 and 12-month review{IS_INTERNAL ? <span className="mast-badge">Internal</span> : null}</p>
            </div>
            <PerWin render={(w) => <p className="mast-when"><b>{w.period}</b>Against {w.prior}<small>Read {RV.readOn}</small></p>} />
          </div>
          <PerWin render={(w) => {
            const l = RV.lead[w.id];
            return (
              <>
                <p className="mast-kicker">{w.label} · {l.kicker}</p>
                <h2 className="mast-head">{l.headline}</h2>
                <p className="mast-deck">{l.deck}</p>
                {IS_INTERNAL ? <p className="mast-note">{l.internalNote}</p> : null}
                <div className="mast-figs">
                  {l.figures.map((f) => <div className="mast-fig" key={f.l}><b>{f.v}</b><span>{f.l}</span></div>)}
                  <p className="mast-fignote">{l.figureNote}</p>
                </div>
              </>
            );
          }} />
        </div>
      </header>

      <div className="wrap" id="brief">
        <div className="brief">
          {RV.brief.map((b) => (
            <div className="brief-i" key={b.role}>
              <h2 className="brief-role">{b.role}</h2>
              <p className="brief-text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <nav className="rail" aria-label="Review period and sections">
        <div className="wrap rail-in">
          <fieldset className="seg">
            <legend>Period</legend>
            {WINDOWS.map((w) => (
              <label key={w.id}>
                <input type="radio" name="win" id={`win-${w.id}`} value={w.id} defaultChecked={w.id === DEFAULT_WIN} />
                <span>{w.label}</span>
              </label>
            ))}
          </fieldset>
          <span className="rail-sep" aria-hidden="true" />
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
      </nav>

      <main>
        <Section id="numbers" title="The numbers" lede={RV.numbers.lede}>
          <PerWin render={(w) => <Numbers w={w} />} />
        </Section>

        <Section id="months" title="Month by month" lede={RV.months.lede} wash>
          <div className="key">
            <span><i style={{ background: "var(--now)" }} />Selected period</span>
            <span><i style={{ background: "var(--past)" }} />Period compared</span>
            <span><i style={{ background: "var(--rule)" }} />Other months</span>
          </div>
          <div className="mcs">
            {RV.months.charts.map((c) => <MonthChart key={c.id} c={c} />)}
          </div>
        </Section>

        <Section id="worked" title="What worked" lede={RV.worked.lede}>
          <div className="hero">
            <IgFrame url={RV.worked.hero.url} title={RV.worked.hero.title} />
            <div>
              <p className="hero-meta">{RV.worked.hero.format}, {RV.worked.hero.date}</p>
              <h3 className="hero-t">{RV.worked.hero.title}</h3>
              <div className="stats">
                <div><b>{fmtInt(RV.worked.hero.views)}</b><span>Views</span></div>
                <div><b>{fmtInt(RV.worked.hero.reach)}</b><span>Accounts reached</span></div>
                <div><b>{fmtInt(RV.worked.hero.responses)}</b><span>Responses</span></div>
              </div>
              <p className="why">{RV.worked.hero.why}</p>
            </div>
          </div>
          <PerWin render={(w) => (
            <>
              <div className="gal">
                {RV.worked.byWin[w.id].gallery.map((g) => (
                  <div key={g.url}>
                    <IgFrame url={g.url} title={g.title} />
                    <p className="gal-d">{g.format}, {g.date}</p>
                    <p className="gal-t">{g.title}</p>
                    <p className="gal-s">{fmtInt(g.views)} views, {fmtInt(g.reach)} reach, {fmtInt(g.responses)} responses</p>
                  </div>
                ))}
              </div>
              <p className="gal-note">{RV.worked.byWin[w.id].note} {RV.worked.footnote}</p>
            </>
          )} />
        </Section>

        <Section id="search" title="Search and the website" lede={RV.search.lede} wash>
          <div className="srch">
            {RV.search.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="st-wrap">
            <table className="st">
              <caption className="sr">Search and Google visits by month, February to October 2026</caption>
              <thead><tr>{RV.search.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{RV.search.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="st-note">{RV.search.tableNote}</p>
          {IS_INTERNAL && RV.search.parasInternal.length ? (
            <div className="srch-int">
              <h3>Internal</h3>
              {RV.search.parasInternal.map((p) => <p key={p}>{p}</p>)}
            </div>
          ) : null}
        </Section>

        {has("notes") ? (
          <Section id="notes" title="Data notes" lede={RV.notes.lede}>
            <div className="att">
              {RV.notes.items.map((a) => (
                <div className="att-i" key={a.title}>
                  <h3 className="att-t">{a.title}</h3>
                  <p className="att-b">{a.body}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <Section id="detail" title="Detail" lede={RV.detail.lede} wash={has("notes")}>
          <div className="dt">
            {RV.detail.panels.map((p) => (
              <details key={p.id}>
                <summary>{p.title}</summary>
                <div className="dt-p">
                  {p.rows.length ? <table><tbody>{p.rows.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td></tr>)}</tbody></table> : null}
                  {(p.faq ?? []).map((f) => <div className="faq" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}
                  {p.note ? <p className="dt-note">{p.note}</p> : null}
                </div>
              </details>
            ))}
          </div>
        </Section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>{RV.client}, 3, 6 and 12-month review to October 31, 2026</span>
          <span>Prepared by {RV.studio}</span>
        </div>
      </footer>
    </div>
  );
}
