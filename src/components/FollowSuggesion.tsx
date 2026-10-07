import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function FollowSuggesion() {
  const queryClient = useQueryClient();

  // Get follow suggestions
  function getFollowSuggesion() {
    return axios.get(
      "https://route-posts.routemisr.com/users/suggestions?limit=10",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["followsuggesion"],
    queryFn: getFollowSuggesion,
  });
  

  const followMutation = useMutation({
    mutationFn: (userId) => {
      return axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followsuggesion"],
      });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  const suggestions = data?.data?.data?.suggestions || [];

  return (
    <>
      {suggestions.map((el) => {
        return (
          <div
            key={el._id}
            className="rounded-xl border border-slate-200 p-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              {/* User info */}
              <button
                type="button"
                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
              >
                <img
                  alt={el.name}
                  className="h-10 w-10 rounded-full object-cover"
                  src={el.photo}
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                    {el.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    @{el.username}
                  </p>
                </div>
              </button>

              {/* Follow button */}
              <button
                onClick={() => followMutation.mutate(el._id)}
                disabled={followMutation.isPending}
                className="inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-3 py-1.5 text-xs font-bold text-[#1877f2] transition hover:bg-[#d8ebff] disabled:opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <line x1={19} x2={19} y1={8} y2={14} />
                  <line x1={22} x2={16} y1={11} y2={11} />
                </svg>

                {followMutation.isPending ? "Loading..." : "Follow"}
              </button>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                {el.followersCount || 0} followers
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
