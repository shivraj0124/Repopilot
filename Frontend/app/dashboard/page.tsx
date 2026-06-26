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
  { key: "analysis", label: "Analysis",         Icon: Sparkles   },
  { key: "tree",     label: "Folder Structure", Icon: FolderTree },
  { key: "issues",   label: "Issues",           Icon: CircleDot  },
  { key: "history",  label: "History",          Icon: History    },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="dash-skeleton-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="dash-skel h-9 w-9" />
        <div className="dash-skel h-5 w-48" />
      </div>
      <div className="space-y-3">
        <div className="dash-skel h-3.5 w-full" />
        <div className="dash-skel h-3.5 w-5/6" />
        <div className="dash-skel h-3.5 w-2/3" />
        <div className="dash-skel h-3.5 w-3/4" />
      </div>
      <div className="flex gap-2 pt-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="dash-skel h-7 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="dash-stat-pill">
      <span className="dash-stat-label">{label}</span>
      <span className="dash-stat-value">{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const [repoUrl, setRepoUrl]               = useState("");
  const [loading, setLoading]               = useState(false);
  const [analysis, setAnalysis]             = useState<any>(null);
  const [issues, setIssues]                 = useState<any[]>([]);
  const [issueAnalyses, setIssueAnalyses]   = useState<Record<number, any>>({});
  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);
  const [history, setHistory]               = useState<any[]>([]);
  const [tree, setTree]                     = useState<any[]>([]);
  const [activeTab, setActiveTab]           = useState<TabKey>("history");

  const searchParams = useSearchParams();
  const repoFromUrl = searchParams.get("repo");

  const handleAnalyze = async (url: string) => {
    if (!url.trim()) return;
    try {
      setLoading(true);
      const response = await api.post("/repositories/analyze", { repoUrl: url });
      console.log("Repository Analysis Response:", response.data.aiAnalysis);
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
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 z-10">

          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <div className="dash-eyebrow mb-3">
                <Cpu size={11} />
                AI Developer Dashboard
              </div>
              <h1 className="dash-title">
                Repo<span className="dash-title-accent">Pilot</span>
              </h1>
              <p className="dash-subtitle mt-1">
                Analyze repositories, understand issues, and contribute smarter.
              </p>
            </div>

            {analysis && (
              <button onClick={resetAnalysis} className="dash-btn-reset">
                <RotateCcw size={14} />
                New Analysis
              </button>
            )}
          </div>

          <div className="dash-input-card">
            <div className="dash-input-accent-line" />

            <div className="flex items-center gap-2.5 mb-4">
              <div className="dash-input-icon-badge">
                <GitBranch size={15} />
              </div>
              <h2 className="dash-input-title">Analyze Repository</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="dash-search-wrap">
                <Search size={15} className="dash-search-icon" />
                <input
                  type="text"
                  placeholder="https://github.com/owner/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze(repoUrl)}
                  className="dash-search-input"
                />
              </div>
              <button
                onClick={() => handleAnalyze(repoUrl)}
                disabled={loading || !repoUrl.trim()}
                className="dash-analyze-btn"
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

            <p className="dash-helper-text">
              <span className="dash-helper-dot" />
              Paste any public GitHub repository URL and press Analyze or hit Enter
            </p>
          </div>

        
          {loading && <SkeletonLoader />}

          {analysis && !loading && (
            <div className="mt-6 flex flex-wrap items-center gap-3 px-1">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                <span className="dash-status-dot" />
                Analysis complete
              </div>
              {repoName && <StatPill label="repo" value={repoName} />}
              {issues.length > 0 && <StatPill label="open issues" value={issues.length} />}
              {tree.length > 0 && <StatPill label="files" value={tree.length} />}
            </div>
          )}

          {(analysis || activeTab === "history") && !loading && (
            <div className="dash-tabs mt-5">
              {TABS.filter((t) => analysis || t.key === "history").map(({ key, label, Icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`dash-tab ${isActive ? "dash-tab-active" : ""}`}
                  >
                    <Icon size={14} />
                    {label}
                    {key === "issues" && issues.length > 0 && (
                      <span className="dash-tab-badge">{issues.length}</span>
                    )}
                    {isActive && <span className="dash-tab-underline" />}
                  </button>
                );
              })}
            </div>
          )}

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

              {!analysis && activeTab !== "history" && (
                <div className="dash-empty">
                  <div className="dash-empty-icon">
                    <GitBranch size={24} />
                  </div>
                  <p className="dash-empty-title">No analysis yet</p>
                  <p className="dash-empty-sub">Enter a GitHub URL above to get started</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}