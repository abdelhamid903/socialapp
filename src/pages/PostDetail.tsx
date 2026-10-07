import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Post } from "../interfaces/posts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function PostDetail() {
  const { id } = useParams();
  /* const [post, setPost] = useState<Post | null>(null);
  async function getPostDetail() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    setPost(data.data.post);
  }

  useEffect(() => {
    getPostDetail();
  }, []); */

  function getPostDetail() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data } = useQuery({
    queryKey: ["postDetails",id],
    queryFn: getPostDetail,
  });

  const post: Post = data?.data.data.post;
  return (
    <>
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <div className="mx-auto max-w-3xl space-y-4">
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
                aria-hidden="true"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </Link>
            <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <a
                    className="shrink-0"
                    href="#/profile/6ab403608ebe92c2c0c6e02c"
                    data-discover="true"
                  >
                    <img
                      alt={post?.user.name}
                      className="h-11 w-11 rounded-full object-cover"
                      src={post?.user.photo}
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1 text-sm">
                      <a
                        className="font-extrabold text-foreground hover:underline"
                        href="#/profile/6ab403608ebe92c2c0c6e02c"
                        data-discover="true"
                      >
                        {post?.user.name}
                      </a>
                      
                    </div>
                    <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                      <button
                        type="button"
                        className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                      >
                        {new Date(post?.createdAt).toLocaleDateString("en", {
                          hour: "numeric",
                        })}
                      </button>
                      <span className="mx-1">·</span>
                      <span className="inline-flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={11}
                          height={11}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-earth"
                          aria-hidden="true"
                        >
                          <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                          <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                          <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                          <circle cx={12} cy={12} r={10} />
                        </svg>
                        {post?.privacy}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-ellipsis"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-h-[620px] overflow-hidden border-y border-slate-200">
                <button
                  type="button"
                  className="group relative block w-full cursor-zoom-in"
                >
                  <img
                    alt="post"
                    className="w-full object-cover"
                    src={post?.image}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </button>
              </div>
              <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-thumbs-up"
                        aria-hidden="true"
                      >
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        <path d="M7 10v12" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
                    >
                     {post?.likesCount} likes
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                    <span className="inline-flex items-center gap-1">
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
                        className="lucide lucide-repeat2 lucide-repeat-2"
                        aria-hidden="true"
                      >
                        <path d="m2 9 3-3 3 3" />
                        <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                        <path d="m22 15-3 3-3-3" />
                        <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                      </svg>
                      {post?.sharesCount} shares
                    </span>
                    <span>{post?.commentsCount} comments</span>
                    <button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                      View details
                    </button>
                  </div>
                </div>
              </div>
              <div className="mx-4 border-t border-slate-200" />
              <div className="grid grid-cols-3 gap-1 p-1">
                <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-thumbs-up"
                    aria-hidden="true"
                  >
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                    <path d="M7 10v12" />
                  </svg>
                  <span>Like</span>
                </button>
                <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle"
                    aria-hidden="true"
                  >
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  </svg>
                  <span>Comment</span>
                </button>
                <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share2 lucide-share-2"
                    aria-hidden="true"
                  >
                    <circle cx={18} cy={5} r={3} />
                    <circle cx={6} cy={12} r={3} />
                    <circle cx={18} cy={19} r={3} />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}
