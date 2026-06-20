"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Shield, Database, Settings, Lock, Share2, Mail } from "lucide-react";
import "@/styles/dashboard.css";

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

const SECTIONS = [
  {
    icon: Database,
    title: "Information We Collect",
    body: "RepoPilot may collect account information such as your name, email address, and repository analysis history.",
  },
  {
    icon: Settings,
    title: "How We Use Information",
    body: "We use collected information to provide AI repository analysis, improve our platform, and enhance user experience.",
  },
  {
    icon: Lock,
    title: "Data Security",
    body: "We take reasonable measures to protect user data and authentication credentials.",
  },
  {
    icon: Share2,
    title: "Third-Party Services",
    body: "RepoPilot integrates with GitHub APIs and AI services such as Gemini for repository and issue analysis.",
  },
  {
    icon: Mail,
    title: "Contact",
    body: "If you have questions regarding privacy, contact us at support@repopilot.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">

          {/* ── Heading ── */}
          <div className="dash-eyebrow mb-5">
            <Shield size={11} />
            Legal
          </div>
          <h1 className="static-page-title">Privacy Policy</h1>
          <p className="static-page-lead mt-5">
            Your privacy matters to us. Here's how RepoPilot collects, uses, and protects your information.
          </p>

          {/* ── Sections ── */}
          <div className="dash-card p-6 sm:p-8 mt-10">
            <div className="space-y-8">
              {SECTIONS.map(({ icon: Icon, title, body }, i) => (
                <section
                  key={title}
                  className={i > 0 ? "static-section-divider border-t pt-8" : ""}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="static-field-icon">
                      <Icon size={15} />
                    </div>
                    <h2 className="static-section-title !text-lg sm:!text-xl">{title}</h2>
                  </div>
                  <p className="static-text">{body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}