type IssuesListProps = {
  issues: any[];
  loadingIssueId: number | null;
  handleIssueAnalyze: (
    issueNumber: number
  ) => void;

  issueAnalyses: Record<number, any>;
};

export default function IssuesList({
  issues,
  loadingIssueId,
  handleIssueAnalyze,
  issueAnalyses,
}: IssuesListProps) {
  if (!issues.length) return null;

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Open Issues
      </h2>

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.number}
            className="border border-zinc-800 rounded-xl p-4 bg-zinc-950"
          >
            <h3 className="font-semibold text-lg">
              #{issue.number} -{" "}
              {issue.title}
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
              onClick={() =>
                handleIssueAnalyze(
                  issue.number
                )
              }
              className="block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
            >
              {loadingIssueId ===
              issue.number
                ? "Analyzing..."
                : "Analyze Issue"}
            </button>

            {/* Issue Analysis */}
            {issueAnalyses[
              issue.number
            ] && (
              <div className="mt-6 border-t border-zinc-800 pt-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Problem
                  </h3>

                  <p className="text-zinc-300">
                    {
                      issueAnalyses[
                        issue.number
                      ].problem
                    }
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Root Cause
                  </h3>

                  <p className="text-zinc-300">
                    {
                      issueAnalyses[
                        issue.number
                      ].rootCause
                    }
                  </p>
                </div>

                <div className="flex gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Difficulty
                    </h3>

                    <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      {
                        issueAnalyses[
                          issue.number
                        ].difficulty
                      }
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Estimated Time
                    </h3>

                    <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      {
                        issueAnalyses[
                          issue.number
                        ].estimatedTime
                      }
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Relevant Files
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {issueAnalyses[
                      issue.number
                    ].relevantFiles?.map(
                      (
                        file: string,
                        index: number
                      ) => (
                        <span
                          key={index}
                          className="bg-zinc-800 px-3 py-1 rounded-lg text-sm"
                        >
                          {file}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Contribution Roadmap
                  </h3>

                  <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                    {issueAnalyses[
                      issue.number
                    ].roadmap?.map(
                      (
                        step: string,
                        index: number
                      ) => (
                        <li key={index}>
                          {step}
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}