"use client";

import Link from "next/link";
import { ArrowRight, Brain, Sparkles, GitBranch, Search, Zap, Star, GitPullRequest, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

/* ─── Animated grid background ────────────────────────────────────────── */
function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

/* ─── Floating badge ───────────────────────────────────────────────────── */
function Badge({ children }) {
  return (
    <span className="rp-hero-badge">
      <Sparkles size={13} strokeWidth={2.5} />
      {children}
    </span>
  );
}

/* ─── Animated counter ─────────────────────────────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = Math.ceil(end / 50);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { setVal(end); clearInterval(timer); }
        else setVal(start);
      }, 28);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Feature card ─────────────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, accent, title, desc, items }) {
  return (
    <div className="rp-feature-card" style={{ "--accent": accent }}>
      <div className="rp-feature-icon">
        <Icon size={20} />
      </div>
      <h3 className="rp-feature-title">{title}</h3>
      <p className="rp-feature-desc">{desc}</p>
      <ul className="rp-feature-list">
        {items.map((item) => (
          <li key={item}>
            <span className="rp-check">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Step card ────────────────────────────────────────────────────────── */
function StepCard({ num, title, desc }) {
  return (
    <div className="rp-step-card">
      <div className="rp-step-num">{String(num).padStart(2, "0")}</div>
      <h4 className="rp-step-title">{title}</h4>
      <p className="rp-step-desc">{desc}</p>
    </div>
  );
}

/* ─── Mock terminal ────────────────────────────────────────────────────── */
function Terminal() {
  const lines = [
    { t: 80,  text: "$ repopilot analyze facebook/react",           cls: "cmd"  },
    { t: 600, text: "✦ Fetching repository metadata...",            cls: "info" },
    { t: 900, text: "✦ Running AI analysis pipeline...",            cls: "info" },
    { t: 1300, text: "● Tech Stack: React, TypeScript, Rollup",     cls: "ok"   },
    { t: 1500, text: "● Architecture: Monorepo, packages/react-*",  cls: "ok"   },
    { t: 1700, text: "● Difficulty:  ★★★★☆  Advanced",              cls: "warn" },
    { t: 1900, text: "● Open Issues: 847  (23 good-first-issue)",   cls: "ok"   },
    { t: 2200, text: "✔ Analysis complete in 2.3s",                 cls: "done" },
  ];
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const timers = lines.map(({ t, text, cls }, i) =>
      setTimeout(() => setVisible((v) => [...v, { text, cls, i }]), t)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rp-terminal">
      <div className="rp-terminal-bar">
        <span className="rp-dot-red" /><span className="rp-dot-yellow" /><span className="rp-dot-green" />
        <span className="rp-terminal-title">repopilot — terminal</span>
      </div>
      <div className="rp-terminal-body">
        {visible.map(({ text, cls, i }) => (
          <div key={i} className={`rp-terminal-line rp-tl-${cls}`}>
            {text}
            {i === visible.length - 1 && <span className="rp-cursor" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="rp-page">
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="rp-hero">
          <GridBackground />
          <div className="rp-hero-inner">
            <div className="rp-hero-left">
              <Badge>AI-Powered Open Source Assistant</Badge>

              <h1 className="rp-hero-h1">
                Understand any
                <br />
                <span className="rp-hero-accent">GitHub repo</span>
                <br />
                in seconds.
              </h1>

              <p className="rp-hero-sub">
                RepoPilot uses AI to decode repository architecture, surface contribution opportunities,
                and generate step-by-step development roadmaps — so you spend less time reading
                and more time building.
              </p>

              <div className="rp-hero-actions">
                <Link href="/register" className="rp-btn-primary">
                  Start for free
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                <Link href="/explore" className="rp-btn-ghost">
                  <FaGithub size={16} />
                  Browse repos
                </Link>
              </div>

              <div className="rp-hero-social">
                {[
                  { label: "Repositories analyzed", val: 12000, suffix: "+" },
                  { label: "Issues explained",       val: 48000, suffix: "+" },
                  { label: "Contributors helped",    val: 3200,  suffix: "+" },
                ].map(({ label, val, suffix }) => (
                  <div key={label} className="rp-hero-stat">
                    <strong><Counter end={val} suffix={suffix} /></strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rp-hero-right">
              <Terminal />
            </div>
          </div>
        </section>

        

        {/* ── FEATURES ───────────────────────────────────────────────────── */}
        <section className="rp-section">
          <div className="rp-section-inner">
            <div className="rp-section-header">
              <span className="rp-eyebrow">Capabilities</span>
              <h2 className="rp-section-h2">Everything you need to contribute faster</h2>
              <p className="rp-section-sub">
                Three AI-powered modules that turn any open-source repo from a black box into a clear map.
              </p>
            </div>

            <div className="rp-features-grid">
              <FeatureCard
                icon={FaGithub}
                accent="#3b82f6"
                title="Repository Analysis"
                desc="Paste any GitHub URL and get an instant AI-generated breakdown of the entire codebase."
                items={["Tech stack detection", "Architecture overview", "Folder structure explained", "Complexity scoring"]}
              />
              <FeatureCard
                icon={Brain}
                accent="#8b5cf6"
                title="AI Issue Analysis"
                desc="Stop staring at cryptic bug reports. RepoPilot explains what's wrong and where to look."
                items={["Root cause analysis", "Relevant files highlighted", "Difficulty estimation", "Fix strategy outline"]}
              />
              <FeatureCard
                icon={Sparkles}
                accent="#10b981"
                title="Contribution Roadmap"
                desc="Get a personalised path from zero to first pull request, tailored to your skill level."
                items={["Good-first-issue finder", "Step-by-step guidance", "Context-aware suggestions", "PR checklist generator"]}
              />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
        <section className="rp-section rp-section-alt">
          <div className="rp-section-inner">
            <div className="rp-section-header">
              <span className="rp-eyebrow">How it works</span>
              <h2 className="rp-section-h2">From URL to insight in three steps</h2>
            </div>
            <div className="rp-steps-grid">
              <StepCard num={1} title="Paste a GitHub URL" desc="Drop in any public repository link. RepoPilot fetches the repo tree, README, and open issues automatically." />
              <StepCard num={2} title="AI analyses the code" desc="Gemini AI processes the structure, identifies patterns, and generates human-readable explanations." />
              <StepCard num={3} title="Start contributing" desc="Pick an issue, read the roadmap, and open your first PR — with full context already in hand." />
            </div>
          </div>
        </section>

        {/* ── SECOND FEATURE STRIP ───────────────────────────────────────── */}
        <section className="rp-section">
          <div className="rp-section-inner">
            <div className="rp-mini-grid">
              {[
                { Icon: Search,        label: "Semantic Search",     desc: "Find relevant code by meaning, not just keywords." },
                { Icon: Zap,           label: "Instant Results",      desc: "Analysis completes in under 3 seconds on average." },
                { Icon: GitBranch,     label: "Branch Awareness",     desc: "Compare main vs feature branches side-by-side." },
                { Icon: GitPullRequest,label: "PR Context",           desc: "Understand exactly what a pull request changes." },
                { Icon: Star,          label: "Bookmark Repos",       desc: "Save repositories you're tracking for later." },
                { Icon: Shield,        label: "Security Signals",     desc: "Spot outdated deps and known vulnerability patterns." },
              ].map(({ Icon, label, desc }) => (
                <div key={label} className="rp-mini-card">
                  <Icon size={18} className="rp-mini-icon" />
                  <div>
                    <p className="rp-mini-label">{label}</p>
                    <p className="rp-mini-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="rp-cta-section">
          <div className="rp-cta-glow" aria-hidden="true" />
          <div className="rp-cta-inner">
            <span className="rp-eyebrow">Get started today</span>
            <h2 className="rp-cta-h2">
              Open source is easier<br />when you have a pilot.
            </h2>
            <p className="rp-cta-sub">
              Join thousands of developers who use RepoPilot to navigate unfamiliar codebases with confidence.
            </p>
            <div className="rp-cta-actions">
              <Link href="/register" className="rp-btn-primary rp-btn-lg">
                Create free account
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link href="/explore" className="rp-btn-outline-light">
                Explore live demo
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════════════════════ */
const CSS = `
  /* ── fonts ── */
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800&display=swap');

  /* ── theme tokens ── */
  :root[data-theme="dark"], :root:not([data-theme="light"]) {
    --bg:           #050a18;
    --bg-alt:       #080f22;
    --surface:      #0d1628;
    --surface-2:    #111d34;
    --border:       rgba(30,60,130,0.4);
    --border-hover: rgba(59,130,246,0.5);
    --text:         #e2e8f0;
    --text-muted:   #64748b;
    --text-dim:     #475569;
    --blue:         #3b82f6;
    --blue-dark:    #1d4ed8;
    --heading:      #f1f5f9;
    --card-bg:      rgba(13,22,40,0.7);
    --grid-color:   rgba(37,99,235,0.07);
    --glow:         rgba(37,99,235,0.18);
    --terminal-bg:  #070d1f;
    --terminal-br:  rgba(37,99,235,0.25);
  }
  :root[data-theme="light"] {
    --bg:           #f8faff;
    --bg-alt:       #f0f4ff;
    --surface:      #ffffff;
    --surface-2:    #f0f4ff;
    --border:       rgba(147,197,253,0.45);
    --border-hover: rgba(37,99,235,0.5);
    --text:         #1e293b;
    --text-muted:   #64748b;
    --text-dim:     #94a3b8;
    --blue:         #2563eb;
    --blue-dark:    #1d4ed8;
    --heading:      #0f172a;
    --card-bg:      rgba(255,255,255,0.9);
    --grid-color:   rgba(37,99,235,0.045);
    --glow:         rgba(37,99,235,0.12);
    --terminal-bg:  #0b1120;
    --terminal-br:  rgba(37,99,235,0.3);
  }

  /* ── base ── */
  .rp-page {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    transition: background 0.3s, color 0.3s;
  }

  /* ── grid background ── */
  .rp-grid-bg {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .rp-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--grid-color) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 100%);
  }
  .rp-radial-fade {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 50% at 60% 0%, rgba(37,99,235,0.08) 0%, transparent 70%);
  }

  /* ── hero ── */
  .rp-hero {
    position: relative;
    overflow: hidden;
    padding: 100px 24px 80px;
  }
  .rp-hero-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 64px;
  }
  @media (max-width: 900px) {
    .rp-hero-inner { grid-template-columns: 1fr; gap: 48px; }
    .rp-hero-right { order: -1; }
  }

  .rp-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(37,99,235,0.12);
    border: 1px solid rgba(59,130,246,0.25);
    color: var(--blue);
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.03em;
    padding: 5px 12px; border-radius: 999px;
    margin-bottom: 24px;
  }

  .rp-hero-h1 {
    font-size: clamp(2.6rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--heading);
    margin-bottom: 20px;
  }
  .rp-hero-accent {
    background: linear-gradient(135deg, #3b82f6 0%, #818cf8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rp-hero-sub {
    font-size: 1.0625rem; line-height: 1.7;
    color: var(--text-muted); max-width: 500px;
    margin-bottom: 36px;
  }

  .rp-hero-actions {
    display: flex; flex-wrap: wrap; gap: 12px;
    margin-bottom: 44px;
  }

  .rp-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff; font-weight: 600; font-size: 0.9rem;
    padding: 12px 24px; border-radius: 10px;
    border: 1px solid rgba(96,165,250,0.2);
    box-shadow: 0 4px 20px rgba(37,99,235,0.35);
    transition: opacity 0.2s, box-shadow 0.2s, transform 0.15s;
    text-decoration: none;
  }
  .rp-btn-primary:hover {
    opacity: 0.92; box-shadow: 0 6px 28px rgba(37,99,235,0.5);
    transform: translateY(-1px);
  }
  .rp-btn-primary.rp-btn-lg {
    font-size: 1rem; padding: 14px 28px; border-radius: 12px;
  }

  .rp-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    color: var(--text-muted); font-weight: 500; font-size: 0.9rem;
    padding: 12px 20px; border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--card-bg);
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    text-decoration: none;
  }
  .rp-btn-ghost:hover {
    color: var(--text); border-color: var(--border-hover);
    background: var(--surface-2);
  }

  .rp-btn-outline-light {
    display: inline-flex; align-items: center; gap: 8px;
    color: #93c5fd; font-weight: 500; font-size: 1rem;
    padding: 14px 24px; border-radius: 12px;
    border: 1px solid rgba(96,165,250,0.3);
    background: rgba(255,255,255,0.04);
    transition: background 0.2s, border-color 0.2s;
    text-decoration: none;
  }
  .rp-btn-outline-light:hover {
    background: rgba(255,255,255,0.08); border-color: rgba(96,165,250,0.5);
  }

  .rp-hero-social {
    display: flex; gap: 32px; flex-wrap: wrap;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }
  .rp-hero-stat {
    display: flex; flex-direction: column; gap: 2px;
  }
  .rp-hero-stat strong {
    font-size: 1.375rem; font-weight: 700; color: var(--heading);
  }
  .rp-hero-stat span {
    font-size: 0.75rem; color: var(--text-muted); white-space: nowrap;
  }

  /* ── terminal ── */
  .rp-terminal {
    background: var(--terminal-bg);
    border: 1px solid var(--terminal-br);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1);
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
  }
  .rp-terminal-bar {
    display: flex; align-items: center; gap: 7px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .rp-dot-red    { width:11px;height:11px;border-radius:50%;background:#ff5f57;flex-shrink:0; }
  .rp-dot-yellow { width:11px;height:11px;border-radius:50%;background:#febc2e;flex-shrink:0; }
  .rp-dot-green  { width:11px;height:11px;border-radius:50%;background:#28c840;flex-shrink:0; }
  .rp-terminal-title {
    font-size: 0.73rem; color: rgba(255,255,255,0.35);
    margin-left: auto; margin-right: auto;
  }
  .rp-terminal-body {
    padding: 20px; min-height: 230px; display: flex; flex-direction: column; gap: 8px;
  }
  .rp-terminal-line { line-height: 1.5; }
  .rp-tl-cmd  { color: #e2e8f0; }
  .rp-tl-info { color: #64748b; }
  .rp-tl-ok   { color: #34d399; }
  .rp-tl-warn { color: #fbbf24; }
  .rp-tl-done { color: #60a5fa; font-weight: 500; }
  .rp-cursor {
    display: inline-block; width: 8px; height: 14px;
    background: #3b82f6; border-radius: 1px; margin-left: 3px;
    vertical-align: text-bottom;
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── trust strip ── */
  .rp-trust {
    max-width: 1200px; margin: 0 auto;
    padding: 20px 24px 40px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
    border-top: 1px solid var(--border);
  }
  .rp-trust-label {
    font-size: 0.75rem; color: var(--text-dim); white-space: nowrap; margin-right: 6px;
  }
  .rp-trust-chip {
    font-size: 0.75rem; font-weight: 500; color: var(--text-muted);
    background: var(--surface); border: 1px solid var(--border);
    padding: 4px 12px; border-radius: 999px;
  }

  /* ── sections ── */
  .rp-section { padding: 80px 24px; }
  .rp-section-alt { background: var(--bg-alt); }
  .rp-section-inner { max-width: 1200px; margin: 0 auto; }

  .rp-section-header { text-align: center; margin-bottom: 56px; }
  .rp-eyebrow {
    display: inline-block; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue);
    margin-bottom: 12px;
  }
  .rp-section-h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 800; letter-spacing: -0.025em; color: var(--heading);
    margin-bottom: 14px; line-height: 1.2;
  }
  .rp-section-sub {
    font-size: 1.0625rem; color: var(--text-muted); max-width: 560px; margin: 0 auto;
    line-height: 1.65;
  }

  /* ── feature cards ── */
  .rp-features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;
  }
  .rp-feature-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .rp-feature-card:hover {
    border-color: var(--accent, var(--blue));
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.2), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
  }
  .rp-feature-icon {
    width: 44px; height: 44px; border-radius: 11px;
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  }
  .rp-feature-title {
    font-size: 1.0625rem; font-weight: 700; color: var(--heading);
    margin-bottom: 10px;
  }
  .rp-feature-desc {
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.65;
    margin-bottom: 18px;
  }
  .rp-feature-list {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 7px;
  }
  .rp-feature-list li {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.8125rem; color: var(--text-muted);
  }
  .rp-check {
    color: var(--accent); font-weight: 700; font-size: 0.75rem; flex-shrink: 0;
  }

  /* ── steps ── */
  .rp-steps-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 20px;
  }
  .rp-step-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 28px;
    position: relative; overflow: hidden;
    transition: border-color 0.25s;
  }
  .rp-step-card:hover { border-color: var(--blue); }
  .rp-step-num {
    font-family: 'DM Mono', monospace;
    font-size: 2.5rem; font-weight: 500;
    color: rgba(37,99,235,0.15);
    line-height: 1; margin-bottom: 14px;
    letter-spacing: -0.04em;
  }
  .rp-step-title {
    font-size: 1rem; font-weight: 700; color: var(--heading); margin-bottom: 8px;
  }
  .rp-step-desc {
    font-size: 0.875rem; color: var(--text-muted); line-height: 1.65;
  }

  /* ── mini grid ── */
  .rp-mini-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;
  }
  .rp-mini-card {
    display: flex; align-items: flex-start; gap: 14px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px 20px;
    transition: border-color 0.2s;
  }
  .rp-mini-card:hover { border-color: var(--blue); }
  .rp-mini-icon { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
  .rp-mini-label { font-size: 0.875rem; font-weight: 600; color: var(--heading); margin-bottom: 3px; }
  .rp-mini-desc  { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; }

  /* ── CTA section ── */
  .rp-cta-section {
    position: relative; overflow: hidden;
    padding: 100px 24px;
    background: #050a18;
    border-top: 1px solid rgba(37,99,235,0.2);
  }
  :root[data-theme="light"] .rp-cta-section {
    background: #0f172a;
  }
  .rp-cta-glow {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%);
  }
  .rp-cta-inner {
    position: relative; max-width: 680px; margin: 0 auto; text-align: center;
  }
  .rp-cta-h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800; letter-spacing: -0.03em; color: #f1f5f9;
    margin: 10px 0 16px; line-height: 1.15;
  }
  .rp-cta-sub {
    font-size: 1.0625rem; color: #64748b; line-height: 1.65; margin-bottom: 40px;
  }
  .rp-cta-actions {
    display: flex; justify-content: center; flex-wrap: wrap; gap: 14px;
  }
`;