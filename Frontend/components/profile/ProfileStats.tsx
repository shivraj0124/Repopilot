"use client";

type Props = {
  repositoriesAnalyzed: number;
  issuesAnalyzed: number;
};

export default function ProfileStats({
  repositoriesAnalyzed,
  issuesAnalyzed,
}: Props) {
  return (
    <div className="dash-card p-6">
      <h2 className="text-xl font-semibold mb-5">
        Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Repositories
          </p>

          <p className="text-3xl font-bold mt-2">
            {repositoriesAnalyzed}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4">
          <p className="text-zinc-400">
            Issues
          </p>

          <p className="text-3xl font-bold mt-2">
            {issuesAnalyzed}
          </p>
        </div>
      </div>
    </div>
  );
}