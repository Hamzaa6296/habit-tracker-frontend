import { Trophy, Flame, ChevronRight } from "lucide-react";
import clsx from "clsx";

export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  streak: number;
  completion: number;
  rank: number;
}

interface LeaderboardProps {
  title?: string;
  users: LeaderboardUser[];
}

export default function Leaderboard({
  title = "Leaderboard",
  users,
}: LeaderboardProps) {
  return (
    <div className="rounded-3xl border border-[#E7DFD4] bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#13254B]">{title}</h2>

          <p className="mt-1 text-sm text-slate-500">
            This months top performers
          </p>
        </div>

        <button className="rounded-xl border border-[#E7DFD4] px-4 py-2 text-sm font-medium transition hover:bg-gray-50">
          View All
        </button>
      </div>

      {/* Users */}

      <div className="mt-8 space-y-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="group flex items-center justify-between rounded-2xl border border-[#ECE7DE] p-4 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Left */}

            <div className="flex items-center gap-4">
              {/* Rank */}

              <div
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-full font-bold",
                  user.rank === 1 && "bg-yellow-100 text-yellow-700",
                  user.rank === 2 && "bg-gray-200 text-gray-700",
                  user.rank === 3 && "bg-orange-100 text-orange-700",
                  user.rank > 3 && "bg-[#F5F5F5] text-slate-600",
                )}
              >
                {user.rank === 1 ? <Trophy size={18} /> : user.rank}
              </div>

              {/* Avatar */}

              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              {/* Info */}

              <div>
                <h3 className="font-semibold text-[#13254B]">{user.name}</h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <Flame
                    size={15}
                    className="text-orange-500"
                    fill="currentColor"
                  />
                  {user.streak} day streak
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-md font-bold text-[#13254B]">
                  {user.completion}%
                </p>

                <p className="text-xs text-slate-500">Completion</p>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
