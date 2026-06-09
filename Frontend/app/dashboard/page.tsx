"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import RepositoryTree from "@/components/repository/RepositoryTree";
import RepositoryAnalysisCard from "@/components/repository/RepositoryAnalysisCard";
import IssuesList from "@/components/repository/IssuesList";
import RepositoryHistory from "@/components/repository/RepositoryHistory";
import Navbar from "@/components/navbar/Navbar";
export default function DashboardPage() {
  const [repoUrl, setRepoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);

  const [issues, setIssues] = useState<any[]>([]);
  const [issueAnalyses, setIssueAnalyses] = useState<Record<number, any>>({});

  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [tree, setTree] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("history");
  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const response = await api.post("/repositories/analyze", {
        repoUrl,
      });

      setAnalysis(response.data.aiAnalysis);

      const issuesResponse = await api.post("/issues/list", {
        repoUrl,
      });

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

      const response = await api.post("/issues/analyze", {
        repoUrl,
        issueNumber,
      });

      setIssueAnalyses((prev) => ({
        ...prev,
        [issueNumber]: response.data.analysis,
      }));
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
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">RepoPilot Dashboard</h1>

            <div className="flex gap-3">
              <button
                onClick={resetAnalysis}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg"
              >
                New Analysis
              </button>
            </div>
          </div>
          {/* <RepositoryHistory history={history} /> */}

          {loading && (
            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-zinc-800 rounded w-1/3 mb-6"></div>

              <div className="space-y-4">
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                <div className="h-4 bg-zinc-800 rounded w-2/3"></div>

                <div className="flex gap-2 mt-6">
                  <div className="h-8 w-20 bg-zinc-800 rounded-full"></div>
                  <div className="h-8 w-20 bg-zinc-800 rounded-full"></div>
                  <div className="h-8 w-20 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          {/* Analyze Repository */}
          <div className="bg-zinc-900 border mt-2 border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Analyze Repository</h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter GitHub repository URL"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg font-semibold"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>
          {analysis && (
            <div className="mt-8 flex gap-4 border-b border-zinc-800 pb-4">
              <button
                onClick={() => setActiveTab("analysis")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "analysis"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                Analysis
              </button>

              <button
                onClick={() => setActiveTab("tree")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "tree"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                Folder Structure
              </button>

              <button
                onClick={() => setActiveTab("issues")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "issues"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                Issues
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === "history"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                History
              </button>
            </div>
          )}
          {activeTab === "analysis" && (
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
        </div>
      </div>
    </>
  );
}
