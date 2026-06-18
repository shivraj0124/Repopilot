"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-6">
          About RepoPilot
        </h1>

        <p className="text-zinc-400 text-lg leading-relaxed">
          RepoPilot is an AI-powered platform designed to help
          developers understand GitHub repositories faster and
          contribute to open-source projects with confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="dash-card p-6">
            <h3 className="text-xl font-semibold mb-3">
              Repository Analysis
            </h3>

            <p className="text-zinc-400">
              Understand project purpose, architecture,
              tech stack, and folder structure instantly.
            </p>
          </div>

          <div className="dash-card p-6">
            <h3 className="text-xl font-semibold mb-3">
              Issue Analysis
            </h3>

            <p className="text-zinc-400">
              AI-generated issue explanations, difficulty
              estimation, and contribution roadmaps.
            </p>
          </div>

          <div className="dash-card p-6">
            <h3 className="text-xl font-semibold mb-3">
              Open Source Discovery
            </h3>

            <p className="text-zinc-400">
              Explore trending repositories and beginner
              friendly issues.
            </p>
          </div>
        </div>

        <div className="dash-card p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            We believe contributing to open source should be
            easier. RepoPilot bridges the gap between complex
            repositories and aspiring contributors by using
            AI to explain codebases and issues in simple,
            actionable terms.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}