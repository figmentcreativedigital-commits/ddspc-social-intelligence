"use client";
import { useEffect, useRef, useState } from "react";
import { R, IS_INTERNAL, NAV, numOf, has } from "./report-data";

/* ==========================================================================
   PRESENTATION  ·  Edgard El Chaar, DDS, PC
   --------------------------------------------------------------------------
   Structure and styling only. This file does not change between cycles;
   every figure, date and sentence lives in report-data.ts.
   ========================================================================== */

/* ==========================================================================
   STYLE
   Tokens taken from edgardelchaar.com so the report reads as the practice's
   own, not as a dashboard. Three faces: Prata display, Marcellus subhead,
   Glacial Indifference body (self-hosted, SIL Open Font License).
   ========================================================================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Prata&family=Marcellus&display=swap');

@font-face {
  font-family: 'Glacial Indifference';
  src: url('/fonts/GlacialIndifference-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Glacial Indifference';
  src: url('/fonts/GlacialIndifference-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}

:root {
  --plum: #68505D;
  --plum-dark: #574250;
  --plum-light: #7D6570;
  --nav: #88A3AE;
  --nav-dark: #7494A1;
  --band-blue: #BFCBCE;
  --band-light: #F2EAE6;
  --band-warm: #E8E3DE;
  --rule: #C5BDB5;
  --rule-soft: rgba(104,80,93,0.16);
  --ink: #151515;
  --body: #2A2A2A;
  --muted: #777777;
  --white: #FFFFFF;
  --display: 'Prata', Georgia, serif;
  --sub: 'Marcellus', Georgia, serif;
  --text: 'Glacial Indifference', 'Helvetica Neue', Arial, sans-serif;
  --max: 1500px;
  --gut: clamp(20px, 5vw, 80px);
  --sec: clamp(56px, 8vw, 120px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--text); font-size: 17px; line-height: 1.6;
  color: var(--body); background: var(--white);
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4 { font-family: var(--display); font-weight: 400; line-height: 1.25; color: var(--plum); text-wrap: balance; }
a { color: inherit; text-decoration: none; }
::selection { background: var(--band-blue); color: var(--ink); }

/* ---------- reveal ----------
   The hidden state is the CSS default and a <noscript> block reverses it.
   Nothing mutates <html>: doing so before React hydrates causes a real
   hydration mismatch in Next.js, where RootLayout owns that element. */
.rv { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.rv.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .rv, .rv.in { opacity: 1 !important; transform: none !important; transition: none !important; }
}

/* ---------- layout ---------- */
.wrap { max-width: var(--max); margin: 0 auto; padding-left: var(--gut); padding-right: var(--gut); }
.band { padding-top: var(--sec); padding-bottom: var(--sec); }
.band-white { background: var(--white); }
.band-light { background: var(--band-light); }
.band-warm { background: var(--band-warm); }
.band-blue { background: var(--band-blue); }
.band-plum { background: var(--plum); }
.band-plum h2, .band-plum h3 { color: var(--white); }
.band-plum .sec-lede, .band-plum .sec-num { color: rgba(255,255,255,.78); }

/* ---------- masthead ---------- */
.mast { background: var(--nav); color: var(--white); padding: 46px 0 40px; }
.mast h1 { color: var(--white); font-size: clamp(30px, 4.2vw, 54px); line-height: 1.14; margin-bottom: 14px; }
.mast-kicker { font-family: var(--text); font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.82); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.mast-badge { display: inline-block; background: var(--plum); color: var(--white); padding: 4px 12px; border-radius: 30px; letter-spacing: .12em; font-size: 10.5px; }
.mast-sub { font-family: var(--sub); font-size: clamp(17px, 1.6vw, 21px); color: var(--white); letter-spacing: .01em; }
.mast-meta { margin-top: 26px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.28); display: flex; gap: 40px; flex-wrap: wrap; font-size: 14px; color: rgba(255,255,255,.9); }
.mast-meta b { display: block; font-weight: 700; font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.7); margin-bottom: 5px; }

/* ---------- nav rail ---------- */
.rail { position: sticky; top: 0; z-index: 90; background: var(--white); border-bottom: 1px solid var(--rule); }
/* Longhand only: this element also carries .wrap, and a padding shorthand
   here would reset the horizontal gutter that .wrap sets. */
.rail-in { display: flex; gap: 26px; overflow-x: auto; padding-top: 14px; padding-bottom: 14px; scrollbar-width: none; }
.rail-in::-webkit-scrollbar { display: none; }
.rail a { font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); white-space: nowrap; padding-bottom: 3px; border-bottom: 2px solid transparent; transition: color .25s, border-color .25s; }
.rail a:hover, .rail a:focus-visible { color: var(--plum); border-bottom-color: var(--plum); }

/* ---------- section furniture ---------- */
.sec-head { max-width: 62ch; margin-bottom: 46px; }
.sec-num { font-family: var(--text); font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--nav-dark); display: block; margin-bottom: 14px; }
.sec-t { font-size: clamp(26px, 3.2vw, 42px); margin-bottom: 16px; }
.sec-lede { font-family: var(--sub); font-size: clamp(17px, 1.5vw, 20px); line-height: 1.55; color: var(--body); }

/* ---------- brief ---------- */
.brief-i { display: grid; grid-template-columns: minmax(150px, 210px) 1fr; gap: 32px; padding: 30px 0; border-top: 1px solid var(--rule); }
.brief-i:last-child { border-bottom: 1px solid var(--rule); }
.brief-role { font-family: var(--text); font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--plum); padding-top: 5px; }
.brief-text { font-family: var(--sub); font-size: clamp(18px, 1.7vw, 23px); line-height: 1.5; color: var(--ink); max-width: 46ch; }
@media (max-width: 760px) { .brief-i { grid-template-columns: 1fr; gap: 10px; } }

/* ---------- period chart ---------- */
.chart { margin-top: 8px; }
.chart-key { display: flex; gap: 26px; flex-wrap: wrap; margin-bottom: 22px; font-size: 12.5px; color: var(--body); }
.chart-key span { display: flex; align-items: center; gap: 8px; }
.chart-key i { width: 13px; height: 13px; display: inline-block; border-radius: 2px; }
.bars { display: flex; align-items: flex-end; gap: 2px; height: 230px; padding-bottom: 2px; border-bottom: 1px solid var(--plum); }
.bar { flex: 1; min-width: 0; position: relative; background: var(--plum); transition: opacity .25s; }
.bar.paid { background: var(--nav); }
.bar:hover { opacity: .72; }
.bar-cap { position: absolute; inset: auto 0 100% 0; text-align: center; font-size: 10px; color: var(--muted); padding-bottom: 3px; opacity: 0; transition: opacity .2s; }
.bar:hover .bar-cap { opacity: 1; }
.axis { display: flex; justify-content: space-between; margin-top: 10px; font-size: 11.5px; color: var(--muted); letter-spacing: .04em; }
.chart-note { margin-top: 26px; font-size: 15px; line-height: 1.6; color: var(--body); max-width: 62ch; padding-left: 16px; border-left: 2px solid var(--nav); }

/* ---------- scoreboard ---------- */
.score { border-top: 1px solid var(--rule); }
.score-h { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 24px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
.score-h > div { font-family: var(--sub); font-size: 11px; letter-spacing: .13em; text-transform: uppercase; color: var(--muted); text-align: right; }
.score-h > div:first-child { text-align: left; }
.score-h i { display: block; font-style: normal; font-size: 11px; letter-spacing: .03em; text-transform: none; color: var(--muted); opacity: .7; margin-top: 3px; }
.score-r { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 24px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--rule); }
.score-k { font-family: var(--sub); font-size: 18px; color: var(--ink); }
.score-cell { text-align: right; }
.score-v { font-family: var(--display); font-size: clamp(22px, 2.3vw, 30px); color: var(--plum); letter-spacing: .01em; }
.score-v.empty { color: var(--muted); opacity: .45; }
.score-c { font-size: 13px; font-weight: 700; letter-spacing: .04em; margin-top: 2px; }
.score-c.up { color: #3F6B54; }
.score-c.down { color: #9A5F5F; }
.score-c.flat { color: var(--muted); }
.score-n { font-size: 12.5px; color: var(--muted); margin-top: 4px; }
@media (max-width: 760px) {
  .score-h { grid-template-columns: 1fr 1fr; gap: 16px; }
  .score-h > div:first-child { display: none; }
  .score-r { grid-template-columns: 1fr 1fr; gap: 10px 16px; }
  .score-k { grid-column: 1 / -1; }
  .score-cell { text-align: left; }
}

/* ---------- instagram frames ---------- */
.hero-card { display: grid; grid-template-columns: 440px 1fr; gap: 52px; align-items: start; }
@media (max-width: 980px) { .hero-card { grid-template-columns: 1fr; gap: 30px; } }
/* The site rounds one edge of its hero imagery into a lozenge. At 3:4 a full
   999px radius collapses into a half-circle and eats the picture, so the
   reference is kept at a restrained 150px on the leading edge only. */
.ig-frame { position: relative; width: 100%; max-width: 440px; aspect-ratio: 3/4; overflow: hidden; background: #0a0809; border-radius: 150px 0 0 150px; }
.ig-frame iframe { position: absolute; top: -64px; left: -1px; width: calc(100% + 2px); height: calc(100% + 140px); border: none; pointer-events: none; }
.ig-frame:hover iframe { pointer-events: auto; }
.hero-fmt { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--nav-dark); margin-bottom: 12px; }
.hero-t { font-family: var(--display); font-size: clamp(22px, 2.3vw, 31px); line-height: 1.3; color: var(--plum); margin-bottom: 22px; max-width: 22ch; }
.hero-stats { display: flex; gap: 40px; flex-wrap: wrap; padding: 22px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); margin-bottom: 22px; }
.hero-s-v { font-family: var(--display); font-size: 28px; color: var(--plum); display: block; }
.hero-s-l { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-top: 4px; display: block; }
.hero-why { font-size: 16px; line-height: 1.65; max-width: 48ch; }

.gal { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 30px; margin-top: 56px; }
.gal-i .ig-frame { max-width: none; border-radius: 0; aspect-ratio: 3/4; }
.gal-m { margin-top: 14px; }
.gal-fmt { font-size: 10.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--nav-dark); }
.gal-t { font-family: var(--sub); font-size: 15.5px; line-height: 1.4; color: var(--ink); margin: 6px 0 10px; }
.gal-s { font-size: 12.5px; color: var(--muted); }
.gal-note { margin-top: 34px; font-size: 13.5px; color: var(--muted); max-width: 62ch; }

/* ---------- attention ---------- */
.att-i { padding: 30px 0; border-top: 1px solid var(--rule-soft); }
.att-i:last-child { border-bottom: 1px solid var(--rule-soft); }
.att-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--white); background: var(--plum); padding: 4px 11px; border-radius: 30px; margin-bottom: 14px; }
.att-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 25px); line-height: 1.35; margin-bottom: 12px; max-width: 34ch; }
.att-b { font-size: 15.5px; line-height: 1.65; max-width: 62ch; }

/* ---------- learned ---------- */
.learn { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 44px 56px; }
.learn-t { font-family: var(--display); font-size: 21px; line-height: 1.35; color: var(--plum); margin-bottom: 12px; padding-top: 18px; border-top: 2px solid var(--nav); }
.learn-b { font-size: 15.5px; line-height: 1.65; }

/* ---------- moves / plan ---------- */
.mv-i { display: grid; grid-template-columns: 1fr 260px; gap: 40px; padding: 30px 0; border-top: 1px solid var(--rule); }
.mv-i:last-child { border-bottom: 1px solid var(--rule); }
.mv-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 24px); line-height: 1.35; color: var(--plum); margin-bottom: 12px; max-width: 26ch; }
.mv-b { font-size: 15.5px; line-height: 1.65; max-width: 54ch; }
.mv-meta b { display: block; font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
.mv-meta p { font-size: 14.5px; margin-bottom: 16px; color: var(--ink); }
@media (max-width: 860px) { .mv-i { grid-template-columns: 1fr; gap: 18px; } }

.plan-i { display: grid; grid-template-columns: 10px 1fr; gap: 24px; padding: 28px 0; border-top: 1px solid var(--rule); }
.plan-i:last-child { border-bottom: 1px solid var(--rule); }
.plan-m { width: 10px; height: 10px; border-radius: 999px; background: var(--nav); margin-top: 13px; }
.plan-t { font-family: var(--display); font-size: clamp(19px, 1.9vw, 24px); line-height: 1.35; color: var(--plum); max-width: 30ch; }
.plan-b { font-size: 15.5px; line-height: 1.65; margin-top: 10px; max-width: 60ch; }

/* ---------- detail ---------- */
.disc { border-top: 1px solid var(--rule); }
.disc-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; background: none; border: none; border-bottom: 1px solid var(--rule); cursor: pointer; font-family: var(--sub); font-size: 19px; color: var(--plum); text-align: left; }
.disc-btn:hover { color: var(--plum-dark); }
.disc-btn:focus-visible { outline: 2px solid var(--plum); outline-offset: 3px; }
.disc-x { font-family: var(--text); font-size: 22px; line-height: 1; color: var(--nav-dark); flex-shrink: 0; }
.disc-p { padding: 26px 0 34px; border-bottom: 1px solid var(--rule); }
.disc-p[hidden] { display: none; }
.t { width: 100%; border-collapse: collapse; max-width: 640px; margin-bottom: 20px; }
.t td { padding: 9px 0; border-bottom: 1px solid var(--rule-soft); font-size: 15px; vertical-align: top; }
.t td:first-child { color: var(--muted); padding-right: 26px; }
.t td:last-child { text-align: right; font-weight: 700; color: var(--ink); white-space: nowrap; }
.d-note { font-size: 13.5px; line-height: 1.65; color: var(--muted); max-width: 68ch; }
.faq-i { padding: 16px 0; border-bottom: 1px solid var(--rule-soft); max-width: 68ch; }
.faq-q { font-family: var(--sub); font-size: 16px; color: var(--ink); margin-bottom: 5px; }
.faq-a { font-size: 14.5px; line-height: 1.65; color: var(--muted); }

/* ---------- footer ---------- */
.foot { background: var(--plum); color: rgba(255,255,255,.8); padding: 44px 0; font-size: 13.5px; }
.foot-in { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }

/* ---------- print ---------- */
.print-only { display: none; }
@media print {
  .rv { opacity: 1 !important; transform: none !important; }
  .rail, .mast-meta { display: none; }
  .ig-frame { display: none; }
  .print-only { display: block; border: 1px solid var(--rule); padding: 16px; font-size: 13px; }
  .print-only b { display: block; font-family: var(--sub); font-size: 15px; color: var(--plum); margin-bottom: 4px; }
  .disc-p[hidden] { display: block !important; }
  .band { padding-top: 34px; padding-bottom: 34px; break-inside: avoid; }
  .band-plum, .mast { background: var(--white) !important; color: var(--ink) !important; }
  .mast h1, .mast-sub, .mast-kicker { color: var(--plum) !important; }
  .foot { background: var(--white) !important; color: var(--muted) !important; border-top: 1px solid var(--rule); }
}
`;

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */

/* Scroll reveal. The hidden state is the CSS default and a <noscript> block
   reverses it, so the report still reads with JavaScript off. Nothing touches
   <html>: mutating it before hydration is a real mismatch in Next.js, where
   RootLayout owns that element. */
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return <div ref={ref} className={`rv${seen ? " in" : ""}`}>{children}</div>;
}

function Section({
  id, num, title, lede, band = "white", children,
}: {
  id: string; num: string; title: string; lede?: string;
  band?: "white" | "light" | "warm" | "blue" | "plum";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`band band-${band}`}>
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="sec-num">Section {num}</span>
            <h2 className="sec-t">{title}</h2>
            {lede ? <p className="sec-lede">{lede}</p> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Signature chart: daily visitors across the thirty-day context, with the
   previous period shaded so this one reads against it. Legend text and axis
   ticks are both derived from the data, so a new cycle needs no edit here. */
function PeriodChart({ data }: { data: { d: string; v: number; paid?: boolean }[] }) {
  if (!data.length) return null;
  const top = Math.max(...data.map((x) => x.v)) || 1;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) =>
    data[Math.min(data.length - 1, Math.round(f * (data.length - 1)))].d
  );
  return (
    <div className="chart">
      <div className="chart-key">
        <span><i style={{ background: "var(--nav)" }} />{R.period_.paidLabel}</span>
        <span><i style={{ background: "var(--plum)" }} />{R.period_.windowLabel}</span>
      </div>
      <div className="bars">
        {data.map((x) => (
          <div
            key={x.d}
            className={`bar${x.paid ? " paid" : ""}`}
            style={{ height: `${Math.max((x.v / top) * 100, 2)}%` }}
          >
            <span className="bar-cap">{x.v}</span>
          </div>
        ))}
      </div>
      <div className="axis">
        {ticks.map((t, i) => <span key={`${t}-${i}`}>{t}</span>)}
      </div>
    </div>
  );
}

/* Instagram embeds render straight from the /embed endpoint: no API, no
   token, no files to manage. Normalisation handles every link form
   Instagram produces (/p/, /reel/, /reels/, with or without query strings). */
function igEmbed(url: string) {
  const m = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/p/${m[1]}/embed` : url;
}

function IgFrame({ url, title }: { url: string; title: string }) {
  return (
    <>
      <div className="ig-frame">
        <iframe src={igEmbed(url)} title={title} scrolling="no" loading="lazy" allowFullScreen />
      </div>
      <div className="print-only"><b>{title}</b>Instagram post &middot; view online</div>
    </>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */
export default function Page() {
  const [open, setOpen] = useState<string | null>("website");
  const d = R.detail;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* With JavaScript off the observer never fires, so reverse the hidden
          state here. This is inert markup, identical on server and client. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>.rv{opacity:1!important;transform:none!important}</style>",
        }}
      />

      {/* MASTHEAD */}
      <header className="mast">
        <div className="wrap">
          <div className="mast-kicker">
            <span>{R.studio} &middot; Social Intelligence</span>
            {IS_INTERNAL ? <span className="mast-badge">Internal</span> : null}
          </div>
          <h1>{R.client}</h1>
          <p className="mast-sub">Performance report &middot; {R.period}</p>
          <div className="mast-meta">
            {R.meta.map((m) => (
              <div key={m.k}><b>{m.k}</b>{m.v}</div>
            ))}
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="rail" aria-label="Report sections">
        <div className="wrap rail-in">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </div>
      </nav>

      <main>
        {/* ------------------------------------------------------- BRIEF */}
        <Section id="brief" num={numOf("brief")} title={R.brief.title} lede={R.brief.lede} band="white">
          <Reveal>
            <div>
              {R.brief.items.map((item) => {
                const b = IS_INTERNAL ? item : (item.client ?? item);
                return (
                  <div className="brief-i" key={item.role}>
                    <div className="brief-role">{b.role}</div>
                    <p className="brief-text">{b.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ PERIOD */}
        <Section id="period" num={numOf("period")} title="The period in one picture" lede={R.period_.lede} band="light">
          <Reveal>
            <div>
              <PeriodChart data={R.period_.daily} />
              <p className="chart-note">{IS_INTERNAL ? R.period_.note : R.period_.noteClient}</p>
            </div>
          </Reveal>
        </Section>

        {/* -------------------------------------------------- SCOREBOARD */}
        <Section id="scoreboard" num={numOf("scoreboard")} title="Scoreboard" lede={R.scoreboard.lede} band="white">
          <Reveal>
            <div className="score">
              <div className="score-h">
                <div />
                {R.scoreboard.cols.map((c) => (
                  <div key={c.label}>{c.label}<i>{c.sub}</i></div>
                ))}
              </div>
              {R.scoreboard.rows.map((r) => (
                <div className="score-r" key={r.k}>
                  <div className="score-k">
                    {r.k}
                    {r.note ? <div className="score-n">{r.note}</div> : null}
                  </div>
                  {[r.d14, r.d30].map((cell, i) => (
                    <div className="score-cell" key={i}>
                      <div className={`score-v${cell ? "" : " empty"}`}>{cell ? cell.v : "\u2014"}</div>
                      {cell && cell.c ? <div className={`score-c ${cell.dir}`}>{cell.c}</div> : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------------ WORKED */}
        <Section
          id="worked"
          num={numOf("worked")}
          title="What worked"
          lede={IS_INTERNAL ? R.worked.lede : R.worked.ledeClient}
          band="warm"
        >
          <Reveal>
            <div className="hero-card">
              <IgFrame url={R.worked.hero.url} title={R.worked.hero.title} />
              <div>
                <div className="hero-fmt">{R.worked.hero.format} &middot; {R.worked.hero.date} &middot; Best of the period</div>
                <h3 className="hero-t">{R.worked.hero.title}</h3>
                <div className="hero-stats">
                  {R.worked.hero.stats.map((s) => (
                    <div key={s.l}>
                      <span className="hero-s-v">{s.v}</span>
                      <span className="hero-s-l">{s.l}</span>
                    </div>
                  ))}
                </div>
                <p className="hero-why">{R.worked.hero.why}</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="gal">
                {R.worked.gallery.map((g) => (
                  <div className="gal-i" key={g.url}>
                    <IgFrame url={g.url} title={g.title} />
                    <div className="gal-m">
                      <div className="gal-fmt">{g.format} &middot; {g.date}</div>
                      <div className="gal-t">{g.title}</div>
                      <div className="gal-s">
                        {g.views.toLocaleString()} views &middot; {g.reach.toLocaleString()} reach &middot; {g.interactions} interactions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="gal-note">{R.worked.galleryNote}</p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------- ATTENTION (internal) */}
        {has("attention") && (
          <Section id="attention" num={numOf("attention")} title="What needs attention" lede={R.attention.lede} band="white">
            <Reveal>
              <div>
                {R.attention.items.map((a) => (
                  <div className="att-i" key={a.title}>
                    <span className="att-tag">{a.tag}</span>
                    <h3 className="att-t">{a.title}</h3>
                    <p className="att-b">{a.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* ----------------------------------------------------- LEARNED */}
        <Section id="learned" num={numOf("learned")} title="What we learned" lede={R.learned.lede} band="blue">
          <Reveal>
            <div className="learn">
              {R.learned.items.map((item) => {
                const l = IS_INTERNAL ? item : ((item as any).client ?? item);
                return (
                  <div key={item.title}>
                    <h3 className="learn-t">{l.title}</h3>
                    <p className="learn-b">{l.body}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        {/* ----------------------------------------------- MOVES (internal) */}
        {has("moves") && (
          <Section id="moves" num={numOf("moves")} title="Recommended next moves" lede={R.moves.lede} band="white">
            <Reveal>
              <div>
                {R.moves.items.map((m) => (
                  <div className="mv-i" key={m.action}>
                    <div>
                      <h3 className="mv-t">{m.action}</h3>
                      <p className="mv-b">{m.body}</p>
                    </div>
                    <div className="mv-meta">
                      <b>Owner</b><p>{m.owner}</p>
                      <b>Measured by</b><p>{m.metric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* -------------------------------------------------- PLAN (client) */}
        {has("plan") && (
          <Section id="plan" num={numOf("plan")} title="What we do next" lede={R.plan.lede} band="white">
            <Reveal>
              <div>
                {R.plan.items.map((p) => (
                  <div className="plan-i" key={p.action}>
                    <div className="plan-m" />
                    <div>
                      <h3 className="plan-t">{p.action}</h3>
                      <p className="plan-b">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        )}

        {/* ------------------------------------------------------ DETAIL */}
        <Section id="detail" num={numOf("detail")} title="Supporting detail" lede={d.lede} band="light">
          <Reveal>
            <div className="disc">
              {d.panels.map((p) => {
                const isOpen = open === p.id;
                const note =
                  !IS_INTERNAL && (p as any).noteClient ? (p as any).noteClient : p.note;
                return (
                  <div key={p.id}>
                    <button
                      className="disc-btn"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${p.id}`}
                      onClick={() => setOpen(isOpen ? null : p.id)}
                    >
                      <span>{p.title}</span>
                      <span className="disc-x" aria-hidden="true">{isOpen ? "\u2013" : "+"}</span>
                    </button>
                    <div className="disc-p" id={`panel-${p.id}`} hidden={!isOpen}>
                      {p.rows.length > 0 && (
                        <table className="t">
                          <tbody>
                            {p.rows.map((row) => (
                              <tr key={row[0]}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {(p as any).faq
                        ? (p as any).faq
                            .filter((f: any) => (IS_INTERNAL ? !f.clientOnly : !f.internalOnly))
                            .map((f: any) => (
                              <div className="faq-i" key={f.q + (f.internalOnly ? "-i" : "")}>
                                <div className="faq-q">{f.q}</div>
                                <div className="faq-a">{f.a}</div>
                              </div>
                            ))
                        : null}
                      {note ? <p className="d-note">{note}</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>{R.client} &middot; {R.period}</span>
          <span>Prepared by {R.studio}</span>
        </div>
      </footer>
    </>
  );
}
