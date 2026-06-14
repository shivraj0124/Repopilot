import { History, GitBranch, Clock, ChevronRight, PackageOpen } from "lucide-react";

type RepositoryHistoryProps = {
  history: any[];
};

/* ── relative time helper ── */
function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return "just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  < 7)  return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/* ── difficulty colour ── */
function diffBadge(difficulty?: string) {
  const d = difficulty?.toLowerCase() ?? "";
  if (d.includes("beginner") || d.includes("easy"))
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
  if (d.includes("intermediate"))
    return "bg-amber-500/10 text-amber-400 border-amber-500/25";
  if (d.includes("advanced"))
    return "bg-orange-500/10 text-orange-400 border-orange-500/25";
  if (d.includes("expert"))
    return "bg-red-500/10 text-red-400 border-red-500/25";
  return "bg-blue-500/10 text-blue-400 border-blue-500/25";
}

/* ── Empty state ── */
function EmptyHistory() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-dashed border-slate-800">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
        <PackageOpen size={24} className="text-blue-500/50" />
      </div>
      <p className="text-slate-400 font-medium text-sm">No analyses yet</p>
      <p className="text-slate-600 text-xs mt-1">
        Enter a GitHub URL above to run your first analysis
      </p>
    </div>
  );
}

export default function RepositoryHistory({ history }: RepositoryHistoryProps) {
  if (!history.length) return <EmptyHistory />;

  return (
    <div className="mt-4 space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between mb-1 px-0.5">
        <div className="flex items-center gap-2">
          <History size={15} className="text-blue-400" />
          <span className="text-sm font-semibold text-slate-200">Previous Analyses</span>
        </div>
        <span className="text-xs text-slate-600 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full">
          {history.length} {history.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* List */}
      {history.map((item) => (
        <div
          key={item.id}
          className="group relative rounded-xl border border-slate-800/70 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700/80 transition-all duration-200 overflow-hidden"
        >
          {/* left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 via-indigo-500/40 to-transparent rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              {/* Left — repo info */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GitBranch size={14} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors truncate">
                    <span className="text-slate-400">{item.repository.owner}</span>
                    <span className="text-slate-500 mx-0.5">/</span>
                    <span>{item.repository.repoName}</span>
                  </h3>

                  {item.summary && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                </div>
              </div>

              {/* Right — time + chevron */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-slate-600">
                  <Clock size={10} />
                  {relativeTime(item.createdAt)}
                </div>
                <ChevronRight
                  size={15}
                  className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-150"
                />
              </div>
            </div>

            {/* Tech stack + difficulty */}
            {(item.techStack || item.difficulty) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {/* Difficulty badge */}
                {item.difficulty && (
                  <span
                    className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${diffBadge(item.difficulty)}`}
                  >
                    {item.difficulty}
                  </span>
                )}

                {/* Divider */}
                {item.techStack && item.difficulty && (
                  <span className="w-px h-3 bg-slate-700" />
                )}

                {/* Tech chips */}
                {item.techStack
                  ?.split(", ")
                  ?.slice(0, 6)
                  ?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-slate-800/80 border border-slate-700/50 text-slate-400 text-[11px] font-medium px-2 py-0.5 rounded-md"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500/70 flex-shrink-0" />
                      {tech.trim()}
                    </span>
                  ))}

                {/* overflow indicator */}
                {item.techStack?.split(", ")?.length > 6 && (
                  <span className="text-[11px] text-slate-600">
                    +{item.techStack.split(", ").length - 6} more
                  </span>
                )}
              </div>
            )}

            {/* Full date on hover */}
            <div className="mt-2 text-[10px] text-slate-700 group-hover:text-slate-600 transition-colors">
              {new Date(item.createdAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}