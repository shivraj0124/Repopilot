"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

import {
  MessageSquare,
  ExternalLink,
  Search,
  Flame,
  Sparkles,
  Loader2,
  AlertCircle,
  GitMerge,
  Gauge,
  Clock,
  FileCode,
  Map,
  CircleDot,
} from "lucide-react";
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

function SkeletonCard() {
  return (
    <div className="explore-card">
      <div className="explore-skel h-6 w-full mb-4" />
      <div className="explore-skel h-4 w-1/2 mb-6" />
      <div className="flex gap-2">
        <div className="explore-skel h-6 w-16 rounded-full" />
        <div className="explore-skel h-6 w-20 rounded-full" />
      </div>
      <div className="explore-skel h-11 w-full mt-6 rounded-xl" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="dash-empty">
      <div className="dash-empty-icon">
        <Search size={24} />
      </div>
      <p className="dash-empty-title">No issues found</p>
      <p className="dash-empty-sub">
        Try a different search term or switch tabs
      </p>
    </div>
  );
}

function diffStyle(raw: string) {
  const d = raw?.toLowerCase() ?? "";
  if (d.includes("beginner") || d.includes("easy"))
    return { chip: "dash-chip-emerald" };
  if (d.includes("intermediate")) return { chip: "dash-chip-amber" };
  if (d.includes("advanced")) return { chip: "dash-chip-orange" };
  if (d.includes("expert")) return { chip: "dash-chip-red" };
  return { chip: "dash-chip-blue" };
}

function AnalyzeButton({
  isLoggedIn,
  isLoading,
  onClick,
}: {
  isLoggedIn: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  if (!isLoggedIn) {
    return (
      <div className="relative group flex-1">
        <button
          disabled
          className="explore-btn-primary opacity-60 cursor-not-allowed"
        >
          <Sparkles size={14} />
          Analyze
        </button>
        <div className="explore-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          Login first to analyze issues
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="explore-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          Analyzing…
        </>
      ) : (
        <>
          <Sparkles size={14} />
          Analyze
        </>
      )}
    </button>
  );
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("trending");
  const [issueAnalyses, setIssueAnalyses] = useState<Record<number, any>>({});
  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const fetchTrendingIssues = async (
    pageNumber: number = 1,
    append: boolean = false,
  ) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);

      const response = await api.get(`/issues/trending?page=${pageNumber}`);

      if (append) {
        setIssues((prev) => [...prev, ...response.data.issues]);
      } else {
        setIssues(response.data.issues);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchGoodFirstIssues = async (
    pageNumber: number = 1,
    append: boolean = false,
  ) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);

      const response = await api.get(`/issues/good-first?page=${pageNumber}`);

      if (append) {
        setIssues((prev) => [...prev, ...response.data.issues]);
      } else {
        setIssues(response.data.issues);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      setLoading(true);
      const response = await api.get(`/issues/search?q=${search}&page=${page}`);
      setIssues(response.data.issues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAnalyzeIssue = async (issue: any) => {
  //   try {
  //     setLoadingIssueId(issue.id);
  //     const repoName = issue.repository;
  //     const repoUrl = `https://github.com/${repoName}`;
  //     const issueNumber = issue.url.split("/").pop();

  //     const response = await api.post("/issues/analyze", {
  //       repoUrl,
  //       issueNumber,
  //     });
  //     setIssueAnalyses((prev) => ({
  //       ...prev,
  //       [issue.id]: response.data.analysis,
  //     }));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoadingIssueId(null);
  //   }
  // };
  const handleAnalyzeIssue = (issue: any) => {
  const [owner, repo] = issue.repository.split("/");
  const issueNumber = issue.url.split("/").pop();

  router.push(
    `/issues/${owner}/${repo}/${issueNumber}`
  );
};
  const handleLoadMore = async () => {
    const nextPage = page + 1;

    setPage(nextPage);

    if (activeTab === "trending") {
      await fetchTrendingIssues(nextPage, true);
    } else {
      await fetchGoodFirstIssues(nextPage, true);
    }
  };

  useEffect(() => {
    fetchTrendingIssues(1);
  }, []);

  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 z-10">
          <div className="mb-8">
            <div className="dash-eyebrow mb-4">
              <Flame size={11} />
              Trending Right Now
            </div>
            <h1 className="explore-hero-h1">Explore Issues</h1>
            <p className="explore-hero-sub">
              Discover trending and beginner-friendly GitHub issues powered by
              AI.
            </p>
          </div>

          <div className="explore-search-card flex flex-col sm:flex-row gap-3 mb-6">
            <div className="explore-search-wrap">
              <Search size={15} className="explore-search-icon" />
              <input
                type="text"
                placeholder="Search issues…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="explore-search-input"
              />
            </div>
            <button onClick={handleSearch} className="explore-search-btn">
              Search
            </button>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                setActiveTab("trending");
                setPage(1);
                fetchTrendingIssues(1);
              }}
              className={`explore-tab ${activeTab === "trending" ? "explore-tab-active" : ""}`}
            >
              Trending
            </button>
            <button
              onClick={() => {
                setActiveTab("good-first");
                setPage(1);
                fetchGoodFirstIssues(1);
              }}
              className={`explore-tab ${activeTab === "good-first" ? "explore-tab-active" : ""}`}
            >
              Good First Issues
            </button>
          </div>

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {!loading && issues.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue) => {
                const analysis = issueAnalyses[issue.id];
                const isLoading = loadingIssueId === issue.id;
                const diff = analysis
                  ? diffStyle(analysis.difficulty ?? "")
                  : null;

                return (
                  <div
                    key={issue.id}
                    className={`explore-card flex flex-col ${analysis ? "md:col-span-2 lg:col-span-2" : ""}`}
                  >
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="explore-card-title !text-base leading-snug">
                        {issue.title}
                      </h2>
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="explore-icon-link flex-shrink-0 mt-0.5"
                        title="View on GitHub"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    {/* Repository */}
                    <p className="explore-card-repo mt-3 flex items-center gap-1.5">
                      <CircleDot size={12} />
                      {issue.repository}
                    </p>

                    {/* Comments */}
                    <div className="explore-meta flex items-center gap-1.5 mt-3">
                      <MessageSquare size={13} />
                      {issue.comments}{" "}
                      {issue.comments === 1 ? "comment" : "comments"}
                    </div>

                    {/* Labels */}
                    {issue.labels?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {issue.labels
                          .slice(0, 3)
                          .map((label: string, index: number) => (
                            <span key={index} className="explore-label-chip">
                              {label}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-2 mt-6">
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="explore-btn-outline flex-1"
                      >
                        View Issue
                      </a>
                      <AnalyzeButton
                        isLoggedIn={isLoggedIn}
                        isLoading={isLoading}
                        onClick={() => handleAnalyzeIssue(issue)}
                      />
                    </div>

                    {analysis && (
                      <div className="explore-analysis-panel space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="explore-section-label flex items-center gap-1.5">
                              <AlertCircle size={11} />
                              Problem
                            </p>
                            <p className="dash-text-body !text-xs leading-relaxed">
                              {analysis.problem}
                            </p>
                          </div>
                          <div>
                            <p className="explore-section-label flex items-center gap-1.5">
                              <GitMerge size={11} />
                              Root Cause
                            </p>
                            <p className="dash-text-body !text-xs leading-relaxed">
                              {analysis.rootCause}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <div>
                            <p className="explore-section-label flex items-center gap-1.5">
                              <Gauge size={11} />
                              Difficulty
                            </p>
                            <span
                              className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${diff!.chip}`}
                            >
                              {analysis.difficulty}
                            </span>
                          </div>
                          {analysis.estimatedTime && (
                            <div>
                              <p className="explore-section-label flex items-center gap-1.5">
                                <Clock size={11} />
                                Estimated Time
                              </p>
                              <span className="dash-chip-emerald inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full">
                                <Clock size={11} />
                                {analysis.estimatedTime}
                              </span>
                            </div>
                          )}
                        </div>

                        {analysis.relevantFiles?.length > 0 && (
                          <div>
                            <p className="explore-section-label flex items-center gap-1.5">
                              <FileCode size={11} />
                              Relevant Files
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {analysis.relevantFiles.map(
                                (file: string, index: number) => (
                                  <span
                                    key={index}
                                    className="explore-file-chip"
                                  >
                                    {file}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {analysis.roadmap?.length > 0 && (
                          <div>
                            <p className="explore-section-label flex items-center gap-1.5">
                              <Map size={11} />
                              Contribution Roadmap
                            </p>
                            <ol className="space-y-2 mt-1">
                              {analysis.roadmap.map(
                                (step: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <span className="dash-step-num mt-0.5">
                                      {index + 1}
                                    </span>
                                    <span className="dash-text-body !text-xs leading-relaxed pt-0.5">
                                      {step}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!loading && issues.length === 0 && <EmptyState />}
          {!loading && issues.length > 0 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="explore-search-btn min-w-[180px]"
              >
                {loadingMore ? (
                  <div className="flex gap-2 justify-center items-center">
                    <Loader2 size={16} className="animate-spin" />
                    <span> Loading...</span>
                  </div>
                  
                ) : (
                  "Load More Issues"
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
