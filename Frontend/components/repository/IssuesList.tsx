import { useState } from "react";
import {
  CircleDot,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Loader2,
  AlertCircle,
  GitMerge,
  Clock,
  Gauge,
  FileCode,
  Map,
  CheckCircle2,
  ChevronDown,
  Tag,
} from "lucide-react";

type IssuesListProps = {
  issues: any[];
  loadingIssueId: number | null;
  handleIssueAnalyze: (issueNumber: number) => void;
  issueAnalyses: Record<number, any>;
};

/* ── difficulty colour helper (reused from analysis card) ── */
function diffStyle(raw: string) {
  const d = raw?.toLowerCase() ?? "";
  if (d.includes("beginner") || d.includes("easy"))
    return { chip: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", dot: "bg-emerald-400" };
  if (d.includes("intermediate"))
    return { chip: "bg-amber-500/10 text-amber-400 border-amber-500/25", dot: "bg-amber-400" };
  if (d.includes("advanced"))
    return { chip: "bg-orange-500/10 text-orange-400 border-orange-500/25", dot: "bg-orange-400" };
  if (d.includes("expert"))
    return { chip: "bg-red-500/10 text-red-400 border-red-500/25", dot: "bg-red-400" };
  return { chip: "bg-blue-500/10 text-blue-400 border-blue-500/25", dot: "bg-blue-400" };
}

/* ── Section block inside analysis ── */
function AnalysisSection({
  icon: Icon,
  title,
  accent = "blue",
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  const accents: Record<string, string> = {
    blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    amber:  "bg-amber-500/10 border-amber-500/20 text-amber-400",
    emerald:"bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    rose:   "bg-rose-500/10 border-rose-500/20 text-rose-400",
    cyan:   "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  };
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 ${accents[accent] ?? accents.blue}`}>
          <Icon size={12} />
        </div>
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{title}</h4>
      </div>
      {children}
    </div>
  );
}

/* ── Single issue card ── */
function IssueCard({
  issue,
  loadingIssueId,
  handleIssueAnalyze,
  analysis,
}: {
  issue: any;
  loadingIssueId: number | null;
  handleIssueAnalyze: (n: number) => void;
  analysis: any;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLoading = loadingIssueId === issue.number;
  const hasAnalysis = !!analysis;

  // auto-expand when analysis arrives
  if (hasAnalysis && !expanded) setExpanded(true);

  const diff = analysis ? diffStyle(analysis.difficulty ?? "") : null;

  // label colours
  const labelColours = [
    "bg-blue-500/10 text-blue-400 border-blue-500/25",
    "bg-violet-500/10 text-violet-400 border-violet-500/25",
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    "bg-amber-500/10 text-amber-400 border-amber-500/25",
    "bg-rose-500/10 text-rose-400 border-rose-500/25",
  ];

  return (
    <div className={`
      group rounded-xl border transition-all duration-200 overflow-hidden
      ${hasAnalysis
        ? "border-blue-900/50 bg-blue-950/10"
        : "border-slate-800/70 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-900/60"}
    `}>
      {/* ── Issue header ── */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* icon */}
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
            hasAnalysis
              ? "bg-blue-500/15 border border-blue-500/25"
              : "bg-slate-800/80 border border-slate-700/50 group-hover:border-slate-600/60"
          }`}>
            <CircleDot size={14} className={hasAnalysis ? "text-blue-400" : "text-slate-500"} />
          </div>

          <div className="flex-1 min-w-0">
            {/* number + title */}
            <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
              <span className="text-[11px] font-mono text-slate-600 mt-0.5 flex-shrink-0">
                #{issue.number}
              </span>
              <h3 className={`text-sm font-semibold leading-snug ${
                hasAnalysis ? "text-white" : "text-slate-200"
              }`}>
                {issue.title}
              </h3>
            </div>

            {/* meta row */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {issue.comments > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <MessageSquare size={11} />
                  {issue.comments} {issue.comments === 1 ? "comment" : "comments"}
                </span>
              )}

              {/* labels */}
              {issue.labels?.slice(0, 3).map((label: any, i: number) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    labelColours[i % labelColours.length]
                  }`}
                >
                  <Tag size={9} />
                  {typeof label === "string" ? label : label.name}
                </span>
              ))}
            </div>
          </div>

          {/* right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <a
              href={issue.url ?? issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-slate-700/60 bg-slate-800/50 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors"
              title="View on GitHub"
            >
              <ExternalLink size={13} />
            </a>

            {hasAnalysis && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-blue-800/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                title={expanded ? "Collapse" : "Expand"}
              >
                <ChevronDown size={13} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── Analyze button ── */}
        {!hasAnalysis && (
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => handleIssueAnalyze(issue.number)}
              disabled={isLoading || loadingIssueId !== null}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg border border-blue-500/30 shadow-md shadow-blue-900/20 hover:shadow-blue-500/15 transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  Analyze with AI
                </>
              )}
            </button>

            {isLoading && (
              <span className="text-xs text-slate-600 animate-pulse">
                Running AI analysis…
              </span>
            )}
          </div>
        )}

        {/* analysed badge */}
        {hasAnalysis && !expanded && (
          <div className="mt-3 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-blue-400" />
            <span className="text-xs text-blue-400/80">AI analysis ready — click to expand</span>
          </div>
        )}
      </div>

      {/* ── Analysis panel ── */}
      {hasAnalysis && expanded && (
        <div className="border-t border-blue-900/30 bg-slate-950/60 px-4 sm:px-5 py-5 space-y-5">

          {/* Problem + Root Cause side by side on md+ */}
          <div className="grid md:grid-cols-2 gap-4">
            <AnalysisSection icon={AlertCircle} title="Problem" accent="rose">
              <p className="text-xs text-slate-400 leading-relaxed">{analysis.problem}</p>
            </AnalysisSection>
            <AnalysisSection icon={GitMerge} title="Root Cause" accent="violet">
              <p className="text-xs text-slate-400 leading-relaxed">{analysis.rootCause}</p>
            </AnalysisSection>
          </div>

          {/* Difficulty + Time */}
          <div className="flex flex-wrap gap-4">
            <AnalysisSection icon={Gauge} title="Difficulty" accent="amber">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${diff!.chip}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${diff!.dot}`} />
                {analysis.difficulty}
              </span>
            </AnalysisSection>

            {analysis.estimatedTime && (
              <AnalysisSection icon={Clock} title="Estimated Time" accent="emerald">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
                  <Clock size={11} />
                  {analysis.estimatedTime}
                </span>
              </AnalysisSection>
            )}
          </div>

          {/* Relevant Files */}
          {analysis.relevantFiles?.length > 0 && (
            <AnalysisSection icon={FileCode} title="Relevant Files" accent="cyan">
              <div className="flex flex-wrap gap-1.5">
                {analysis.relevantFiles.map((file: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/50 text-slate-300 font-mono text-[11px] px-2.5 py-1 rounded-md hover:border-blue-500/40 hover:text-slate-100 transition-colors cursor-default"
                  >
                    <FileCode size={10} className="text-blue-400 flex-shrink-0" />
                    {file}
                  </span>
                ))}
              </div>
            </AnalysisSection>
          )}

          {/* Contribution Roadmap */}
          {analysis.roadmap?.length > 0 && (
            <AnalysisSection icon={Map} title="Contribution Roadmap" accent="blue">
              <ol className="space-y-2">
                {analysis.roadmap.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-[10px] font-bold text-blue-400 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-400 leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </AnalysisSection>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export default function IssuesList({
  issues,
  loadingIssueId,
  handleIssueAnalyze,
  issueAnalyses,
}: IssuesListProps) {
  const [filter, setFilter] = useState<"all" | "analyzed" | "unanalyzed">("all");

  if (!issues.length) return null;

  const analyzedCount = Object.keys(issueAnalyses).length;

  const filtered = issues.filter((issue) => {
    if (filter === "analyzed")   return !!issueAnalyses[issue.number];
    if (filter === "unanalyzed") return !issueAnalyses[issue.number];
    return true;
  });

  return (
    <div className="mt-4 space-y-3">

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-0.5">
        <div className="flex items-center gap-2.5">
          <CircleDot size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Open Issues</span>
          <span className="text-xs bg-slate-800/60 border border-slate-700/50 text-slate-400 px-2.5 py-0.5 rounded-full">
            {issues.length}
          </span>
          {analyzedCount > 0 && (
            <span className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full">
              {analyzedCount} analysed
            </span>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-lg p-1">
          {(["all", "analyzed", "unanalyzed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] font-medium px-3 py-1 rounded-md capitalize transition-all duration-150 ${
                filter === f
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Issue list ── */}
      <div className="space-y-2">
        {filtered.map((issue) => (
          <IssueCard
            key={issue.number}
            issue={issue}
            loadingIssueId={loadingIssueId}
            handleIssueAnalyze={handleIssueAnalyze}
            analysis={issueAnalyses[issue.number]}
          />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-slate-800">
            <CircleDot size={24} className="text-slate-700 mb-2" />
            <p className="text-sm text-slate-500">No {filter} issues</p>
          </div>
        )}
      </div>
    </div>
  );
}