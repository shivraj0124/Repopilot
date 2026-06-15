"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

const sections = [
  "Introduction",
  "Features",
  "Repository Analysis",
  "Issue Analysis",
  "Tech Stack",
  "API Endpoints",
  "Authentication",
  "FAQs",
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 sticky top-24 h-fit">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">
              Documentation
            </h2>

            <div className="space-y-3">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="block text-zinc-400 hover:text-white transition"
                >
                  {section}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-12">
          {/* Hero */}
          <section>
            <h1 className="text-5xl font-bold leading-tight">
              RepoPilot Documentation
            </h1>

            <p className="text-zinc-400 text-lg mt-6 leading-relaxed max-w-3xl">
              RepoPilot is an AI-powered GitHub repository
              and issue analysis platform that helps
              developers understand open-source projects,
              analyze GitHub issues, and generate AI-based
              contribution guidance.
            </p>
          </section>

          {/* Introduction */}
          <section
            id="Introduction"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              Introduction
            </h2>

            <p className="text-zinc-300 leading-relaxed">
              RepoPilot helps developers quickly understand
              GitHub repositories using AI. Users can analyze
              repositories, visualize folder structures,
              explore trending issues, and receive
              AI-generated contribution roadmaps.
            </p>
          </section>

          {/* Features */}
          <section
            id="Features"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Features
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                "AI Repository Analysis",
                "Folder Structure Visualization",
                "AI Issue Analysis",
                "Contribution Roadmaps",
                "Trending Repository Discovery",
                "Beginner-Friendly Issues",
                "JWT Authentication",
                "Repository History",
              ].map((feature) => (
                <div
                  key={feature}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-5"
                >
                  <p className="text-zinc-200">
                    ✅ {feature}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Repository Analysis */}
          <section
            id="Repository Analysis"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              Repository Analysis
            </h2>

            <div className="space-y-5 text-zinc-300 leading-relaxed">
              <p>
                Users can enter a public GitHub repository
                URL to generate AI-powered repository
                insights.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <pre className="text-sm overflow-x-auto">
{`GitHub Repository
      ↓
Fetch README + Repository Data
      ↓
Gemini AI Analysis
      ↓
Generate:
- Project Purpose
- Tech Stack
- Architecture
- Folder Explanation
- Difficulty`}
                </pre>
              </div>
            </div>
          </section>

          {/* Issue Analysis */}
          <section
            id="Issue Analysis"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              Issue Analysis
            </h2>

            <div className="space-y-5 text-zinc-300 leading-relaxed">
              <p>
                RepoPilot analyzes GitHub issues using AI and
                helps developers understand how to contribute.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <pre className="text-sm overflow-x-auto">
{`GitHub Issue
      ↓
Gemini AI Analysis
      ↓
Generate:
- Root Cause
- Difficulty
- Estimated Time
- Relevant Files
- Contribution Roadmap`}
                </pre>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section
            id="Tech Stack"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Tech Stack
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-4">
                  Frontend
                </h3>

                <div className="space-y-2 text-zinc-300">
                  <p>• Next.js</p>
                  <p>• TypeScript</p>
                  <p>• Tailwind CSS</p>
                  <p>• Axios</p>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-4">
                  Backend
                </h3>

                <div className="space-y-2 text-zinc-300">
                  <p>• Express.js</p>
                  <p>• Prisma ORM</p>
                  <p>• MySQL</p>
                  <p>• Redis</p>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-4">
                  AI & APIs
                </h3>

                <div className="space-y-2 text-zinc-300">
                  <p>• Gemini API</p>
                  <p>• Octokit</p>
                  <p>• GitHub API</p>
                  <p>• JWT Auth</p>
                </div>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section
            id="API Endpoints"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              API Endpoints
            </h2>

            <div className="space-y-4">
              {[
                "POST /api/auth/register",
                "POST /api/auth/login",
                "POST /api/repositories/analyze",
                "POST /api/issues/analyze",
                "GET /api/explore/repositories",
                "GET /api/issues/trending",
                "GET /api/issues/good-first",
              ].map((endpoint) => (
                <div
                  key={endpoint}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-sm"
                >
                  {endpoint}
                </div>
              ))}
            </div>
          </section>

          {/* Authentication */}
          <section
            id="Authentication"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              Authentication
            </h2>

            <p className="text-zinc-300 leading-relaxed">
              RepoPilot uses JWT-based authentication with
              secure cookie storage. Protected routes are
              handled using Next.js middleware and backend
              authentication middleware.
            </p>
          </section>

          {/* FAQs */}
          <section
            id="FAQs"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              FAQs
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  How does AI generate analysis?
                </h3>

                <p className="text-zinc-300">
                  RepoPilot uses Gemini AI to analyze
                  repository README files, folder structures,
                  and GitHub issues.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Can I analyze private repositories?
                </h3>

                <p className="text-zinc-300">
                  Currently RepoPilot supports only public
                  GitHub repositories.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is authentication required?
                </h3>

                <p className="text-zinc-300">
                  Some features are public, but advanced AI
                  analysis requires authentication.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}