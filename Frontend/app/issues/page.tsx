"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import api from "@/lib/axios";

import { MessageSquare, ExternalLink, Search } from "lucide-react";

export default function IssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("trending");
  const [issueAnalyses, setIssueAnalyses] = useState<Record<number, any>>({});

  const [loadingIssueId, setLoadingIssueId] = useState<number | null>(null);

  const fetchTrendingIssues = async () => {
    try {
      setLoading(true);

      const response = await api.get("/issues/trending");

      setIssues(response.data.issues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoodFirstIssues = async () => {
    try {
      setLoading(true);

      const response = await api.get("/issues/good-first");

      setIssues(response.data.issues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);

      const response = await api.get(`/issues/search?q=${search}`);

      setIssues(response.data.issues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeIssue = async (issue: any) => {
    try {
      setLoadingIssueId(issue.id);
      const repoName = issue.repository;

      const repoUrl = `https://github.com/${repoName}`;

      const issueNumber = issue.url.split("/").pop();

      const response = await api.post("/issues/analyze", {
        repoUrl,
        issueNumber,
      });

      setIssueAnalyses((prev) => ({
        ...prev,
        [issue.id]: response.data.analysis,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIssueId(null);
    }
  };

  useEffect(() => {
    fetchTrendingIssues();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">Explore Issues</h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Discover trending and beginner-friendly GitHub issues powered by AI.
          </p>
        </div>

        {/* Search */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-3 mb-8">
          <div className="flex items-center gap-2 flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4">
            <Search size={18} className="text-zinc-500" />

            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-semibold"
          >
            Search
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab("trending");

              fetchTrendingIssues();
            }}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "trending"
                ? "bg-blue-600"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Trending
          </button>

          <button
            onClick={() => {
              setActiveTab("good-first");

              fetchGoodFirstIssues();
            }}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "good-first"
                ? "bg-blue-600"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Good First Issues
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-zinc-800 rounded mb-4"></div>

                <div className="h-4 bg-zinc-800 rounded w-1/2 mb-6"></div>

                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-zinc-800 rounded-full"></div>

                  <div className="h-6 w-20 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Issues */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >
                {/* Title */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold leading-relaxed">
                    {issue.title}
                  </h2>

                  <a href={issue.url} target="_blank">
                    <ExternalLink
                      size={18}
                      className="text-zinc-400 hover:text-white"
                    />
                  </a>
                </div>

                {/* Repository */}
                <p className="text-zinc-400 mt-4">{issue.repository}</p>

                {/* Comments */}
                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-400">
                  <MessageSquare size={16} />
                  {issue.comments} comments
                </div>

                {/* Labels */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {issue.labels
                    ?.slice(0, 3)
                    .map((label: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs"
                      >
                        {label}
                      </span>
                    ))}
                </div>

                {/* Button */}
                <a
                  href={issue.url}
                  target="_blank"
                  className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-center font-semibold"
                >
                  View Issue
                </a>
                <a
                  href={`/issues/${issue.repository}/${issue.url
                    .split("/")
                    .pop()}`}
                  className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-center font-semibold"
                >
                  Analyze Issue
                </a>
                {issueAnalyses[issue.id] && (
                  <div className="mt-6 border-t border-zinc-800 pt-6 space-y-5">
                    {/* Problem */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Problem</h3>

                      <p className="text-zinc-300">
                        {issueAnalyses[issue.id].problem}
                      </p>
                    </div>

                    {/* Root Cause */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Root Cause</h3>

                      <p className="text-zinc-300">
                        {issueAnalyses[issue.id].rootCause}
                      </p>
                    </div>

                    {/* Difficulty + Time */}
                    <div className="flex gap-4 flex-wrap">
                      <div>
                        <h3 className="font-semibold mb-2">Difficulty</h3>

                        <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                          {issueAnalyses[issue.id].difficulty}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Estimated Time</h3>

                        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          {issueAnalyses[issue.id].estimatedTime}
                        </span>
                      </div>
                    </div>

                    {/* Relevant Files */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Relevant Files
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {issueAnalyses[issue.id].relevantFiles?.map(
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

                    {/* Roadmap */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Contribution Roadmap
                      </h3>

                      <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                        {issueAnalyses[issue.id].roadmap?.map(
                          (step: string, index: number) => (
                            <li key={index}>{step}</li>
                          ),
                        )}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

