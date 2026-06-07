"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles size={16} />
            AI-Powered Open Source Assistant
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Understand GitHub Repositories
            <span className="text-blue-500">
              {" "}
              with AI
            </span>
          </h1>

          <p className="text-zinc-400 text-xl mt-6 leading-relaxed">
            RepoPilot helps developers analyze
            repositories, understand issues,
            discover contribution opportunities,
            and generate AI-powered development
            roadmaps.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-xl"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
              <FaGithub className="text-blue-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Repository Analysis
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Analyze GitHub repositories using
              AI and understand architecture,
              tech stack, folder structure, and
              project complexity instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
              <Brain className="text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              AI Issue Analysis
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Understand GitHub issues with
              AI-generated root causes,
              difficulty estimation, relevant
              files, and contribution roadmaps.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-500 transition">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="text-green-400" />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Smart Contribution Guidance
            </h3>

            <p className="text-zinc-400 leading-relaxed">
              Find beginner-friendly issues and
              get step-by-step guidance to start
              contributing to open-source
              projects confidently.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl font-bold leading-tight">
            Ready to Explore Open Source
            Smarter?
          </h2>

          <p className="text-zinc-400 text-lg mt-6">
            Start analyzing repositories and
            understanding issues with AI today.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}