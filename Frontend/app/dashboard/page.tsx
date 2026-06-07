"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function DashboardPage() {
  const [repoUrl, setRepoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);

  const [issues, setIssues] = useState<any[]>([]);
  const [issueAnalyses, setIssueAnalyses] = useState<Record<number, any>>({});

  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

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
      fetchHistory();
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

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">RepoPilot Dashboard</h1>
        {history.length > 0 && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Previous Analyses</h2>

            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                >
                  <h3 className="text-lg font-semibold">
                    {item.repository.owner}/{item.repository.repoName}
                  </h3>

                  <p className="text-zinc-400 mt-2">{item.summary}</p>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    {item.techStack
                      ?.split(", ")
                      ?.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
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

        {/* Repository Analysis */}
        {analysis && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Purpose</h3>

              <p className="text-zinc-300">{analysis.projectPurpose}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>

              <div className="flex flex-wrap gap-2">
                {analysis.techStack?.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Architecture</h3>

              <p className="text-zinc-300">{analysis.architecture}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Folder Explanation</h3>

              <p className="text-zinc-300">{analysis.folderExplanation}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Difficulty</h3>

              <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                {analysis.difficulty}
              </span>
            </div>
          </div>
        )}

        {/* Issues List */}
        {issues.length > 0 && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Open Issues</h2>

            <div className="space-y-4">
              {issues.map((issue) => (
                <>
                  <div
                    key={issue.number}
                    className="border border-zinc-800 rounded-xl p-4 bg-zinc-950"
                  >
                    <h3 className="font-semibold text-lg">
                      #{issue.number} - {issue.title}
                    </h3>

                    <p className="text-zinc-400 text-sm mt-2">
                      Comments: {issue.comments}
                    </p>

                    <a
                      href={issue.url}
                      target="_blank"
                      className="inline-block mt-3 text-blue-400 text-sm hover:underline"
                    >
                      View on GitHub
                    </a>

                    <button
                      onClick={() => handleIssueAnalyze(issue.number)}
                      className="block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                    >
                      {loadingIssueId === issue.number
                        ? "Analyzing..."
                        : "Analyze Issue"}
                    </button>

                    {issueAnalyses[issue.number] && (
                      <div className="mt-6 border-t border-zinc-800 pt-6 space-y-5">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            Problem
                          </h3>

                          <p className="text-zinc-300">
                            {issueAnalyses[issue.number].problem}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            Root Cause
                          </h3>

                          <p className="text-zinc-300">
                            {issueAnalyses[issue.number].rootCause}
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <div>
                            <h3 className="font-semibold mb-2">Difficulty</h3>

                            <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                              {issueAnalyses[issue.number].difficulty}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">
                              Estimated Time
                            </h3>

                            <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                              {issueAnalyses[issue.number].estimatedTime}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            Relevant Files
                          </h3>

                          <div className="flex flex-wrap gap-2">
                            {issueAnalyses[issue.number].relevantFiles?.map(
                              (file: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-zinc-800 px-3 py-1 rounded-lg text-sm"
                                >
                                  {file}
                                </span>
                              ),
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            Contribution Roadmap
                          </h3>

                          <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                            {issueAnalyses[issue.number].roadmap?.map(
                              (step: string, index: number) => (
                                <li key={index}>{step}</li>
                              ),
                            )}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
