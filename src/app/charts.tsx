"use client";

/* Interactive charts. This file receives plain numbers and labels as props and
   never imports report-data, so nothing beyond what the page already shows
   reaches the browser bundle. Server rendering produces the same SVG as the
   idle state, so the charts read correctly before scripts load. */

import { useState, type KeyboardEvent, type PointerEvent } from "react";

export type Fmt = "int" | "pct" | "pos";

function fmtVal(v: number, f?: Fmt) {
  if (f === "pct") return `${v.toFixed(2)}%`;
  if (f === "pos") return v.toFixed(2);
  return v.toLocaleString("en-US");
}

/* Shared scrub handling: pointer position (mouse, pen or touch drag) maps to
   the nearest point, arrow keys step through, Home and End jump, Escape clears. */
function useScrub(count: number, toIndex: (fx: number) => number, W: number, initialOnFocus: number) {
  const [a, setA] = useState<number | null>(null);
  const pick = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width) return;
    const fx = ((e.clientX - r.left) / r.width) * W;
    setA(Math.max(0, Math.min(count - 1, toIndex(fx))));
  };
  const handlers = {
    onPointerMove: pick,
    onPointerDown: pick,
    onPointerLeave: (e: PointerEvent<SVGSVGElement>) => { if (e.pointerType === "mouse") setA(null); },
    onFocus: () => setA((p) => (p === null ? initialOnFocus : p)),
    onBlur: () => setA(null),
    onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => {
      const k = e.key;
      if (k === "ArrowRight" || k === "ArrowUp") setA((p) => Math.min(count - 1, (p ?? initialOnFocus) + 1));
      else if (k === "ArrowLeft" || k === "ArrowDown") setA((p) => Math.max(0, (p ?? initialOnFocus) - 1));
      else if (k === "Home") setA(0);
      else if (k === "End") setA(count - 1);
      else if (k === "Escape") setA(null);
      else return;
      e.preventDefault();
    },
  };
  return { a, handlers };
}

/* ------------------------------------------------------------ trend line */

export function Spark({ name, values, labels, fmt }: { name: string; values: number[]; labels: string[]; fmt?: Fmt }) {
  const W = 132, H = 34, P = 6;
  const v = values;
  const n = v.length;
  const lo = Math.min(...v), hi = Math.max(...v);
  const span = hi - lo || 1;
  const step = (W - 2 * P) / Math.max(n - 1, 1);
  const x = (i: number) => P + i * step;
  const y = (k: number) => H - P - ((k - lo) / span) * (H - 2 * P);
  const pts = v.map((k, i) => `${x(i).toFixed(1)},${y(k).toFixed(1)}`).join(" ");
  const last = n - 1;
  const { a, handlers } = useScrub(n, (fx) => Math.round((fx - P) / step), W, last);
  const said = v.map((k, i) => `${labels[i]}: ${fmtVal(k, fmt)}`).join(", ");
  const tipAlign = a === 0 ? "l" : a === last ? "r" : "c";

  return (
    <span className={`spk${a !== null ? " on" : ""}`}>
      <svg
        className="spark"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        tabIndex={0}
        role="slider"
        aria-label={`${name}, weekly trend`}
        aria-valuemin={0}
        aria-valuemax={last}
        aria-valuenow={a ?? last}
        aria-valuetext={a === null ? said : `${labels[a]}: ${fmtVal(v[a], fmt)}`}
        {...handlers}
      >
        <rect x={0} y={-8} width={W} height={H + 16} fill="transparent" />
        {a !== null ? <line className="spk-g" x1={x(a)} x2={x(a)} y1={1} y2={H - 1} /> : null}
        <polyline points={pts} fill="none" stroke="var(--past)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {last > 0 ? <circle cx={x(last - 1)} cy={y(v[last - 1])} r="3" fill="var(--past)" stroke="#fff" strokeWidth="2" /> : null}
        <circle cx={x(last)} cy={y(v[last])} r="4.5" fill="var(--now)" stroke="#fff" strokeWidth="2" />
        {a !== null && a !== last ? <circle cx={x(a)} cy={y(v[a])} r="4.5" fill="var(--ink)" stroke="#fff" strokeWidth="2" /> : null}
        {a === last ? <circle cx={x(last)} cy={y(v[last])} r="6" fill="none" stroke="var(--now)" strokeWidth="1.5" /> : null}
      </svg>
      {a !== null ? (
        <span className={`spk-tip ${tipAlign}`} style={{ left: `${(x(a) / W) * 100}%` }} aria-hidden="true">
          <b>{fmtVal(v[a], fmt)}</b>
          <span>{a === last ? "This week" : `Week of ${labels[a]}`}</span>
        </span>
      ) : null}
    </span>
  );
}

/* ------------------------------------------------------------ daily chart */

export type Day = { d: string; w: string; v: number; shade?: boolean };

function niceMax(n: number) {
  const steps = [10, 20, 25, 50, 100, 200, 250, 500, 1000];
  for (const s of steps) { const m = Math.ceil(n / s) * s; if (m / s <= 5) return { max: m, step: s }; }
  return { max: Math.ceil(n / 1000) * 1000, step: 1000 };
}

/* Fourteen consecutive days: index i in the later week pairs with i - 7.
   Pointing at either day of a pair highlights both, so each weekday is read
   against the same weekday a week earlier. */
export function Daily({ data, unit, nowLabel, pastLabel }: { data: Day[]; unit: string; nowLabel: string; pastLabel: string }) {
  const paired = data.length === 14 && data.slice(0, 7).every((x) => x.shade) && data.slice(7).every((x) => !x.shade);
  const [a, setA] = useState<number | null>(null);
  const pair = (i: number) => (!paired ? { now: i, past: -1 } : i < 7 ? { now: i + 7, past: i } : { now: i, past: i - 7 });
  const sel = a === null ? null : pair(a);
  const lastIdx = data.length - 1;
  const idle = pair(lastIdx);
  const show = sel ?? idle;
  const nowD = data[show.now];
  const pastD = show.past >= 0 ? data[show.past] : null;
  const diff = pastD ? nowD.v - pastD.v : 0;

  return (
    <div className={`dly${sel ? " on" : ""}`}>
      <div className="dly-read">
        <div className="dly-cell now">
          <span className="dly-k"><i />{sel ? nowLabel : `${nowLabel}, latest day`}</span>
          <span className="dly-d">{nowD.w}, {nowD.d}</span>
          <b className="dly-v">{nowD.v}<small> {unit}</small></b>
        </div>
        {pastD ? (
          <div className="dly-cell past">
            <span className="dly-k"><i />{pastLabel}</span>
            <span className="dly-d">{pastD.w}, {pastD.d}</span>
            <b className="dly-v">{pastD.v}</b>
          </div>
        ) : null}
        {pastD ? (
          <div className="dly-cell chg">
            <span className="dly-k">Change</span>
            <span className="dly-d">Same weekday</span>
            <b className="dly-v">{diff > 0 ? "▲ " : diff < 0 ? "▼ " : ""}{diff === 0 ? "No change" : Math.abs(diff)}</b>
          </div>
        ) : null}
        <p className="dly-hint" aria-hidden="true">Move across the chart to compare each day with the same day a week earlier.</p>
      </div>
      <div className="ch-wide"><DailySvg data={data} W={1000} H={280} sel={sel} setA={setA} paired={paired} unit={unit} /></div>
      <div className="ch-narrow"><DailySvg data={data} W={420} H={300} sel={sel} setA={setA} paired={paired} unit={unit} /></div>
    </div>
  );
}

function DailySvg({ data, W, H, sel, setA, paired, unit }: {
  data: Day[]; W: number; H: number; sel: { now: number; past: number } | null;
  setA: (f: number | null | ((p: number | null) => number | null)) => void; paired: boolean; unit: string;
}) {
  const L = 36, T = 26, B = 34;
  const ph = H - T - B, pw = W - L - 8;
  const { max, step } = niceMax(Math.max(...data.map((x) => x.v)));
  const slot = pw / data.length;
  const bw = Math.min(28, slot * 0.62);
  const y = (k: number) => T + ph - (k / max) * ph;
  const ticks: number[] = [];
  for (let t = 0; t <= max; t += step) ticks.push(t);
  const weeks = [data.filter((x) => x.shade), data.filter((x) => !x.shade)];
  const peaks = new Set(weeks.map((w) => w.reduce((p, q) => (q.v > p.v ? q : p), w[0])?.d));
  const split = data.findIndex((x) => !x.shade);
  const narrow = W < 600;
  const last = data.length - 1;

  const pick = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width) return;
    const fx = ((e.clientX - r.left) / r.width) * W;
    setA(Math.max(0, Math.min(last, Math.floor((fx - L) / slot))));
  };
  const active = (i: number) => sel !== null && (i === sel.now || i === sel.past);
  const cur = sel ? data[sel.now] : null;
  const prev = sel && sel.past >= 0 ? data[sel.past] : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      tabIndex={0}
      role="slider"
      aria-label={`${unit} each day across both weeks`}
      aria-valuemin={0}
      aria-valuemax={last}
      aria-valuenow={sel ? sel.now : last}
      aria-valuetext={cur ? `${cur.w}, ${cur.d}: ${cur.v}${prev ? `. ${prev.w}, ${prev.d}: ${prev.v}` : ""}` : "Use the arrow keys to move through the days. Values are also in the table below."}
      onPointerMove={pick}
      onPointerDown={pick}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setA(null); }}
      onBlur={() => setA(null)}
      onFocus={() => setA((p) => (p === null ? last : p))}
      onKeyDown={(e) => {
        const k = e.key;
        if (k === "ArrowRight") setA((p) => Math.min(last, (p ?? last) + 1));
        else if (k === "ArrowLeft") setA((p) => Math.max(0, (p ?? last) - 1));
        else if (k === "Home") setA(0);
        else if (k === "End") setA(last);
        else if (k === "Escape") setA(null);
        else if (k === "ArrowUp" || k === "ArrowDown") { if (paired) setA((p) => { const i = p ?? last; return i < 7 ? i + 7 : i - 7; }); }
        else return;
        e.preventDefault();
      }}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line className={t === 0 ? "base" : "grid"} x1={L} x2={W} y1={y(t)} y2={y(t)} />
          <text x={L - 10} y={y(t) + 4} textAnchor="end">{t}</text>
        </g>
      ))}
      {sel ? [sel.past, sel.now].filter((i) => i >= 0).map((i) => (
        <rect key={`band${i}`} className="dly-band" x={L + i * slot + 1} y={T - 22} width={slot - 2} height={ph + 22} rx={4} />
      )) : null}
      {split > 0 ? <line className="base" x1={L + split * slot} x2={L + split * slot} y1={T - 8} y2={T + ph} /> : null}
      {data.map((x, i) => {
        const cx = L + i * slot + slot / 2;
        const top = y(x.v);
        const h = Math.max(T + ph - top, 2);
        const r = Math.min(4, bw / 2, h / 2);
        const path = `M${cx - bw / 2},${T + ph} V${top + r} Q${cx - bw / 2},${top} ${cx - bw / 2 + r},${top} H${cx + bw / 2 - r} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + r} V${T + ph} Z`;
        const isPeak = peaks.has(x.d);
        const on = active(i);
        const showVal = sel ? on : isPeak;
        const showDay = sel ? on : i === 0 || i === split || i === last || (isPeak && !narrow);
        const anchor = narrow && i === last ? "end" : narrow && i === 0 ? "start" : "middle";
        return (
          <g key={x.d} className={`bar${sel && !on ? " dim" : ""}`}>
            <path className={`m ${x.shade ? "b-past" : "b-now"}`} d={path} />
            {showVal ? <text className="pk" x={cx} y={top - 8} textAnchor="middle">{x.v}</text> : null}
            {showDay ? <text className={on ? "dk" : undefined} x={cx} y={H - 10} textAnchor={anchor}>{on ? `${x.w} ${x.d}` : x.d}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}
