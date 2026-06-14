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

const TABS = [
  { key: "analysis", label: "Analysis",        Icon: Sparkles   },
  { key: "tree",     label: "Folder Structure", Icon: FolderTree },
  { key: "issues",   label: "Issues",           Icon: CircleDot  },
  { key: "history",  label: "History",          Icon: History    },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function SkeletonLoader() {
  return (
    <div className="mt-6 rounded-2xl border border-blue-950/60 bg-[#070f22] p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-lg bg-blue-950/80" />
        <div className="h-5 w-48 rounded-md bg-blue-950/80" />
      </div>
      <div className="h-3.5 rounded bg-blue-950/60 w-full" />
      <div className="h-3.5 rounded bg-blue-950/60 w-5/6" />
      <div className="h-3.5 rounded bg-blue-950/60 w-4/6" />
      <div className="h-3.5 rounded bg-blue-950/60 w-3/4" />
      <div className="flex gap-2 pt-4">
        {[1,2,3].map((i) => (
          <div key={i} className="h-7 w-20 rounded-full bg-blue-950/80" />
        ))}
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 bg-blue-950/30 border border-blue-900/40 rounded-lg px-3 py-1.5">
      <span className="text-[11px] text-blue-400/70 uppercase tracking-wider font-medium">{label}</span>
      <span className="text-xs font-semibold text-blue-100">{value}</span>
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
  const handleAnalyze = async (repoUrl: string) => {
    if (!repoUrl.trim()) return;
    try {
      setLoading(true);
      const response = await api.post("/repositories/analyze", { repoUrl });
      setAnalysis(response.data.aiAnalysis);
      const issuesResponse = await api.post("/issues/list", { repoUrl });
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
    <div className="min-h-screen bg-[#050a18] text-slate-200">
      <Navbar />

      {/* ── Page wrapper ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
              <Cpu size={11} />
              AI Developer Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Repo<span className="text-blue-500">Pilot</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Analyze repositories, understand issues, and contribute smarter.
            </p>
          </div>

          {analysis && (
            <button
              onClick={resetAnalysis}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 px-4 py-2 rounded-xl transition-all duration-200 shrink-0"
            >
              <RotateCcw size={14} />
              New Analysis
            </button>
          )}
        </div>

        {/* ── URL Input card ── */}
        <div className="relative rounded-2xl border border-blue-900/40 bg-gradient-to-b from-[#0d1628] to-[#080f20] p-5 sm:p-6 shadow-xl shadow-black/30">
          {/* top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full" />

          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <GitBranch size={15} className="text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-white">Analyze Repository</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="https://github.com/owner/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze(repoUrl)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-slate-100 placeholder-slate-600 text-sm outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
              />
            </div>
            <button
              onClick={() => handleAnalyze(repoUrl)}
              disabled={loading || !repoUrl.trim()}
              className="flex cursor-pointer items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/20 transition-all duration-200 shrink-0"
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
          <p className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-slate-600 inline-block" />
            Paste any public GitHub repository URL and press Analyze or hit Enter
          </p>
        </div>

        {/* ── Skeleton ── */}
        {loading && <SkeletonLoader />}

        {/* ── Post-analysis header ── */}
        {analysis && !loading && (
          <div className="mt-6 flex flex-wrap items-center gap-3 px-1">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
              Analysis complete
            </div>
            {repoName && (
              <StatPill label="repo" value={repoName} />
            )}
            {issues.length > 0 && (
              <StatPill label="open issues" value={issues.length} />
            )}
            {tree.length > 0 && (
              <StatPill label="files" value={tree.length} />
            )}
          </div>
        )}

        {/* ── Tabs ── */}
        {(analysis || activeTab === "history") && !loading && (
          <div className="mt-5 flex items-center gap-1 border-b border-slate-800/80 pb-0 overflow-x-auto">
            {TABS.filter((t) => analysis || t.key === "history").map(({ key, label, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    cursor-pointer relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg
                    transition-all duration-200 whitespace-nowrap
                    ${isActive
                      ? "text-blue-400 bg-blue-500/8"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/40"}
                  `}
                >
                  <Icon size={14} />
                  {label}
                  {/* issues badge */}
                  {key === "issues" && issues.length > 0 && (
                    <span className="ml-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-500/20">
                      {issues.length}
                    </span>
                  )}
                  {/* active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
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
            {activeTab === "tree" && (
              <RepositoryTree tree={tree} />
            )}
            {activeTab === "issues" && (
              <IssuesList
                issues={issues}
                loadingIssueId={loadingIssueId}
                handleIssueAnalyze={handleIssueAnalyze}
                issueAnalyses={issueAnalyses}
              />
            )}
            {activeTab === "history" && (
              <RepositoryHistory history={history} />
            )}

            {/* empty state when no analysis yet and not on history */}
            {!analysis && activeTab !== "history" && (
              <div className="mt-10 flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-dashed border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <GitBranch size={24} className="text-blue-500/60" />
                </div>
                <p className="text-slate-400 font-medium">No analysis yet</p>
                <p className="text-slate-600 text-sm mt-1">
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