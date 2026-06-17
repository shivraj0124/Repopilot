"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import api from "@/lib/axios";

import { Star, GitFork, ExternalLink, Sparkles, Compass } from "lucide-react";
import "@/styles/dashboard.css";
import "@/styles/explore.css";
import { useAuth } from "@/context/AuthContext";

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="explore-card">
      <div className="explore-skel h-6 w-2/3 mb-4" />
      <div className="space-y-2">
        <div className="explore-skel h-4 w-full" />
        <div className="explore-skel h-4 w-5/6" />
      </div>
      <div className="flex gap-3 mt-6">
        <div className="explore-skel h-6 w-16 rounded-full" />
        <div className="explore-skel h-6 w-16 rounded-full" />
      </div>
      <div className="explore-skel h-11 w-full mt-6 rounded-xl" />
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div className="dash-empty">
      <div className="dash-empty-icon">
        <Compass size={24} />
      </div>
      <p className="dash-empty-title">No repositories found</p>
      <p className="dash-empty-sub">Check back later for trending picks</p>
    </div>
  );
}

/* ── Analyze button with login-gated tooltip ── */
function AnalyzeButton({ repoUrl, isLoggedIn }: { repoUrl: string; isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return (
      <a href={`/dashboard?repo=${encodeURIComponent(repoUrl)}`} className="explore-btn-primary mt-6">
        <Sparkles size={14} />
        Analyze Repository
      </a>
    );
  }

  return (
    <div className="relative group mt-6">
      <button disabled className="explore-btn-primary opacity-60 cursor-not-allowed">
        <Sparkles size={14} />
        Analyze Repository
      </button>
      <div className="explore-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        Login first to analyze repository
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/explore/repositories");
      setRepositories(response.data.repositories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 z-10">
          {/* ── Heading ── */}
          <div className="mb-10">
            <div className="dash-eyebrow mb-4">
              <Sparkles size={11} />
              AI-Curated Picks
            </div>
            <h1 className="explore-hero-h1">Explore Repositories</h1>
            <p className="explore-hero-sub">
              Discover trending GitHub repositories powered by AI.
            </p>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {/* ── Repository Cards ── */}
          {!loading && repositories.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo) => (
                <div key={repo.id} className="explore-card flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="explore-card-title truncate">{repo.name}</h2>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="explore-icon-link flex-shrink-0"
                      title="View on GitHub"
                    >
                      <ExternalLink size={17} />
                    </a>
                  </div>

                  <p className="explore-card-desc mt-3 min-h-[64px] line-clamp-3">
                    {repo.description}
                  </p>

                  <div className="explore-meta flex items-center gap-4 mt-5">
                    <span className="flex items-center gap-1.5">
                      <Star size={15} />
                      {repo.stars?.toLocaleString?.() ?? repo.stars}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork size={15} />
                      {repo.forks?.toLocaleString?.() ?? repo.forks}
                    </span>
                    {repo.language && (
                      <span className="explore-lang-chip ml-auto">{repo.language}</span>
                    )}
                  </div>

                  <AnalyzeButton repoUrl={repo.url} isLoggedIn={isLoggedIn} />
                </div>
              ))}
            </div>
          )}

          {!loading && repositories.length === 0 && <EmptyState />}
        </div>
      </section>

      <Footer />
    </div>
  );
}