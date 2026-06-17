"use client";

type Props = {
  name: string;
  email: string;
  createdAt: string;
};

export default function ProfileInfo({
  name,
  email,
  createdAt,
}: Props) {
  return (
    <div className="dash-card p-6">
      <h2 className="text-xl font-semibold mb-5">
        Personal Information
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-500 text-sm">
            Name
          </p>

          <p>{name}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Email
          </p>

          <p>{email}</p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Joined
          </p>

          <p>
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}