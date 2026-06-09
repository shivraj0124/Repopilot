type RepositoryHistoryProps = {
  history: any[];
};

export default function RepositoryHistory({
  history,
}: RepositoryHistoryProps) {
  if (!history.length) return null;

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Previous Analyses
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold">
              {item.repository.owner}/
              {item.repository.repoName}
            </h3>

            <p className="text-zinc-400 mt-2">
              {item.summary}
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {item.techStack
                ?.split(", ")
                ?.map(
                  (
                    tech: string,
                    index: number
                  ) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  )
                )}
            </div>

            <div className="mt-4 text-sm text-zinc-500">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}