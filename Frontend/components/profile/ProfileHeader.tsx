"use client";

type Props = {
  name: string;
  email: string;
};

export default function ProfileHeader({
  name,
  email,
}: Props) {
  return (
    <div className="dash-card p-8">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
          {name?.charAt(0)}
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {name}
          </h1>

          <p className="text-zinc-400">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}