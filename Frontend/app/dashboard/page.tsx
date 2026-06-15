"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import RepositoryTree from "@/components/repository/RepositoryTree";
import RepositoryAnalysisCard from "@/components/repository/RepositoryAnalysisCard";
import IssuesList from "@/components/repository/IssuesList";
import RepositoryHistory from "@/components/repository/RepositoryHistory";
import Navbar from "@/components/navbar/Navbar";
import { useSearchParams } from "next/navigation";
import {
  GitBranch,
  Sparkles,
  FolderTree,
  CircleDot,
  History,
  RotateCcw,
  Search,
  Loader2,
  ArrowRight,
  Cpu,
} from "lucide-react";
import "@/styles/dashboard.css"; 
const TABS = [
  { key: "analysis", label: "Analysis",        Icon: Sparkles   },
  { key: "tree",     label: "Folder Structure", Icon: FolderTree },
  { key: "issues",   label: "Issues",           Icon: CircleDot  },
  { key: "history",  label: "History",          Icon: History    },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function SkeletonLoader() {
  return (
    <div className="dash-skeleton-card mt-6 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="dash-skeleton-block h-8 w-8 rounded-lg" />
        <div className="dash-skeleton-block h-5 w-48 rounded-md" />
      </div>
      <div className="dash-skeleton-block-alt h-3.5 rounded w-full" />
      <div className="dash-skeleton-block-alt h-3.5 rounded w-5/6" />
      <div className="dash-skeleton-block-alt h-3.5 rounded w-4/6" />
      <div className="dash-skeleton-block-alt h-3.5 rounded w-3/4" />
      <div className="flex gap-2 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash-skeleton-block h-7 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="dash-stat-pill flex items-center gap-2 rounded-lg px-3 py-1.5">
      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--blue)" }}>
        {label}
      </span>
      <span className="text-xs font-semibold" style={{ color: "var(--dash-text)" }}>
        {value}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [repoUrl, setRepoUrl]           = useState("");
  const [loading, setLoading]           = useState(false);
  const [analysis, setAnalysis]         = useState<any>(null);
  const [issues, setIssues]             = useState<any[]>([]);
  const [issueAnalyses, setIssueAnalyses] = useState<Record<number, any>>({});
  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);
  const [history, setHistory]           = useState<any[]>([]);
  const [tree, setTree]                 = useState<any[]>([]);
  const [activeTab, setActiveTab]       = useState<TabKey>("history");
  const searchParams = useSearchParams();
  const repoFromUrl = searchParams.get("repo");

  const handleAnalyze = async (url: string) => {
    if (!url.trim()) return;
    try {
      setLoading(true);
      const response = await api.post("/repositories/analyze", { repoUrl: url });
      setAnalysis(response.data.aiAnalysis);
      const issuesResponse = await api.post("/issues/list", { repoUrl: url });
      setIssues(issuesResponse.data.issues);
      setTree(response.data.tree);
      fetchHistory();
      setActiveTab("analysis");
    } catch (error: any) {
      alert(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleIssueAnalyze = async (issueNumber: number) => {
    try {
      setLoadingIssueId(issueNumber);
      const response = await api.post("/issues/analyze", { repoUrl, issueNumber });
      setIssueAnalyses((prev) => ({ ...prev, [issueNumber]: response.data.analysis }));
    } catch (error: any) {
      alert(error.response?.data?.message || "Issue analysis failed");
    } finally {
      setLoadingIssueId(null);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get("/repositories/history");
      setHistory(response.data.analyses);
    } catch (error) {
      console.error(error);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setIssues([]);
    setTree([]);
    setRepoUrl("");
    setIssueAnalyses({});
    setActiveTab("history");
  };

  useEffect(() => {
    fetchHistory();

    if (repoFromUrl) {
      setRepoUrl(repoFromUrl);
      handleAnalyze(repoFromUrl);
    }
  }, []);

  const repoName = analysis
    ? repoUrl.replace("https://github.com/", "").replace(/\/$/, "")
    : null;

  return (
    <div className="dash-page">
      <Navbar />

      {/* ── Page wrapper ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wide uppercase border"
              style={{
                background: "color-mix(in srgb, var(--blue) 8%, transparent)",
                borderColor: "color-mix(in srgb, var(--blue) 20%, transparent)",
                color: "var(--blue)",
              }}
            >
              <Cpu size={11} />
              AI Developer Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "var(--dash-text)" }}>
              Repo<span style={{ color: "var(--blue)" }}>Pilot</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--dash-text-dim)" }}>
              Analyze repositories, understand issues, and contribute smarter.
            </p>
          </div>

          {analysis && (
            <button
              onClick={resetAnalysis}
              className="dash-surface flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all duration-200 shrink-0 cursor-pointer"
              style={{ color: "var(--dash-text-muted)" }}
            >
              <RotateCcw size={14} />
              New Analysis
            </button>
          )}
        </div>

        {/* ── URL Input card ── */}
        <div className="dash-input-card relative rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/10">
          {/* top accent line */}
          <div
            className="absolute top-0 left-8 right-8 h-px rounded-full"
            style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--blue) 50%, transparent), transparent)" }}
          />

          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                background: "color-mix(in srgb, var(--blue) 12%, transparent)",
                borderColor: "color-mix(in srgb, var(--blue) 20%, transparent)",
              }}
            >
              <GitBranch size={15} style={{ color: "var(--blue)" }} />
            </div>
            <h2 className="text-base font-semibold" style={{ color: "var(--dash-text)" }}>
              Analyze Repository
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--dash-text-dim)" }}
              />
              <input
                type="text"
                placeholder="https://github.com/owner/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze(repoUrl)}
                className="dash-search-input w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 transition-all duration-200"
                style={{ "--tw-ring-color": "color-mix(in srgb, var(--blue) 10%, transparent)" } as React.CSSProperties}
              />
            </div>
            <button
              onClick={() => handleAnalyze(repoUrl)}
              disabled={loading || !repoUrl.trim()}
              className="flex cursor-pointer items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-xl border shadow-lg transition-all duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, var(--blue), color-mix(in srgb, var(--blue) 70%, #1e3a8a))",
                borderColor: "color-mix(in srgb, var(--blue) 30%, transparent)",
                boxShadow: "0 10px 25px -8px color-mix(in srgb, var(--blue) 40%, transparent)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Analyze
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

          {/* helper text */}
          <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: "var(--dash-text-faint)" }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--dash-text-faint)" }} />
            Paste any public GitHub repository URL and press Analyze or hit Enter
          </p>
        </div>

        {/* ── Skeleton ── */}
        {loading && <SkeletonLoader />}

        {/* ── Post-analysis header ── */}
        {analysis && !loading && (
          <div className="mt-6 flex flex-wrap items-center gap-3 px-1">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--dash-text-muted)" }}>
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
              Analysis complete
            </div>
            {repoName && <StatPill label="repo" value={repoName} />}
            {issues.length > 0 && <StatPill label="open issues" value={issues.length} />}
            {tree.length > 0 && <StatPill label="files" value={tree.length} />}
          </div>
        )}

        {/* ── Tabs ── */}
        {(analysis || activeTab === "history") && !loading && (
          <div className="dash-tabs-border mt-5 flex items-center gap-1 border-b pb-0 overflow-x-auto">
            {TABS.filter((t) => analysis || t.key === "history").map(({ key, label, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    dash-tab cursor-pointer relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg
                    transition-all duration-200 whitespace-nowrap
                    ${isActive ? "dash-tab-active" : ""}
                  `}
                >
                  <Icon size={14} />
                  {label}
                  {/* issues badge */}
                  {key === "issues" && issues.length > 0 && (
                    <span
                      className="ml-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full border"
                      style={{
                        background: "color-mix(in srgb, var(--blue) 18%, transparent)",
                        borderColor: "color-mix(in srgb, var(--blue) 25%, transparent)",
                        color: "var(--blue)",
                      }}
                    >
                      {issues.length}
                    </span>
                  )}
                  {/* active underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(to right, var(--blue), #818cf8)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Tab content ── */}
        {!loading && (
          <div className="mt-4">
            {activeTab === "analysis" && analysis && (
              <RepositoryAnalysisCard analysis={analysis} />
            )}
            {activeTab === "tree" && <RepositoryTree tree={tree} />}
            {activeTab === "issues" && (
              <IssuesList
                issues={issues}
                loadingIssueId={loadingIssueId}
                handleIssueAnalyze={handleIssueAnalyze}
                issueAnalyses={issueAnalyses}
              />
            )}
            {activeTab === "history" && <RepositoryHistory history={history} />}

            {/* empty state when no analysis yet and not on history */}
            {!analysis && activeTab !== "history" && (
              <div className="dash-empty mt-10 flex flex-col items-center justify-center text-center py-20 rounded-2xl">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border"
                  style={{
                    background: "color-mix(in srgb, var(--blue) 8%, transparent)",
                    borderColor: "color-mix(in srgb, var(--blue) 18%, transparent)",
                  }}
                >
                  <GitBranch size={24} style={{ color: "color-mix(in srgb, var(--blue) 60%, transparent)" }} />
                </div>
                <p className="font-medium" style={{ color: "var(--dash-text-muted)" }}>No analysis yet</p>
                <p className="text-sm mt-1" style={{ color: "var(--dash-text-dim)" }}>
                  Enter a GitHub URL above to get started
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}