"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, GitBranch, Brain, Compass, Target } from "lucide-react";
import "@/styles/dashboard.css";

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

const FEATURES = [
  {
    icon: GitBranch,
    title: "Repository Analysis",
    desc: "Understand project purpose, architecture, tech stack, and folder structure instantly.",
  },
  {
    icon: Brain,
    title: "Issue Analysis",
    desc: "AI-generated issue explanations, difficulty estimation, and contribution roadmaps.",
  },
  {
    icon: Compass,
    title: "Open Source Discovery",
    desc: "Explore trending repositories and beginner friendly issues.",
  },
];

export default function AboutPage() {
  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">

          {/* ── Heading ── */}
          <div className="dash-eyebrow mb-5">
            <Sparkles size={11} />
            About Us
          </div>
          <h1 className="static-page-title">About RepoPilot</h1>
          <p className="static-page-lead mt-5">
            RepoPilot is an AI-powered platform designed to help developers understand
            GitHub repositories faster and contribute to open-source projects with confidence.
          </p>

          {/* ── Feature cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="dash-card p-6">
                <div className="dash-icon-badge-blue mb-4">
                  <Icon size={16} />
                </div>
                <h3 className="static-card-title mb-2.5">{title}</h3>
                <p className="static-text">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── Mission ── */}
          <div className="dash-card p-6 sm:p-8 mt-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="dash-icon-badge-blue">
                <Target size={16} />
              </div>
              <h2 className="static-section-title">Our Mission</h2>
            </div>
            <p className="static-text">
              We believe contributing to open source should be easier. RepoPilot bridges
              the gap between complex repositories and aspiring contributors by using AI
              to explain codebases and issues in simple, actionable terms.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}