import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { Post } from "../interfaces/posts";
import Comment from "../components/Comment";
import Addpost from "../components/Addpost";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Dropdown, DropdownItem } from "flowbite-react";
import Swal from "sweetalert2";
import { UpdatePost } from "../components/UpdatePost";
import { useQuery } from "@tanstack/react-query";
import FollowSuggesion from "../components/FollowSuggesion";
import HomeFeed from "./HomeFeed";

export default function Feed() {
  const [categ, changeCateg] = useState("feed");
  const { userData } = useContext(AuthContext);
  /*   const [postsList, setPosts] = React.useState<Post[] | null>(null);
  const {userData}=useContext(AuthContext)
  async function getPostsData() {
    if (localStorage.getItem("userToken")) {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      setPosts(data.data.posts);
    }
  }
  useEffect(() => {
    getPostsData();
  }, []);
 */

  function getPostsData() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsData,
  });

  const postsList: Post[] = data?.data.data.posts;

  async function HandleDelete(id) {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    Swal.fire({
      title: "Success!",
      text: data.message,
      icon: "success",
      timer: 1000,
    });
    setTimeout(() => {
      refetch();
    }, 1500);
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
            <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <button
                  onClick={() => changeCateg("feed")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${categ == "feed" ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700 hover:bg-slate-100"} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-newspaper"
                    aria-hidden="true"
                  >
                    <path d="M15 18h-5" />
                    <path d="M18 14h-8" />
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                    <rect width={8} height={4} x={10} y={6} rx={1} />
                  </svg>
                  Feed
                </button>
                <button
                  onClick={() => changeCateg("myposts")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${categ == "myposts" ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700 hover:bg-slate-100"} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles"
                    aria-hidden="true"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx={4} cy={20} r={2} />
                  </svg>
                  My Posts
                </button>
                <button
                  onClick={() => changeCateg("community")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${categ == "community" ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700 hover:bg-slate-100"} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
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
                  Community
                </button>
                <button
                  onClick={() => changeCateg("saved")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${categ == "saved" ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700 hover:bg-slate-100"} `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                    aria-hidden="true"
                  >
                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                  </svg>
                  Saved
                </button>
              </div>
            </aside>

            <section className="space-y-4">
              <Addpost refetch={refetch} />

              {categ == "community" ? (
                <div className="space-y-4">
                  {postsList?.map((post) => {
                    const {
                      _id,
                      createdAt,
                      isShare,
                      commentsCount,
                      likes,
                      likesCount,
                      body,
                      user: { name, username, photo },
                      privacy,
                      sharedPost,
                      sharesCount,
                      topComment,
                      bookmarked,
                      image,
                    } = post;
                    return (
                      <article
                        key={_id}
                        className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm"
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <a
                              className="shrink-0"
                              href="#/profile/6ab56ac58ebe92c2c0c9430f"
                              data-discover="true"
                            >
                              <img
                                alt="Aiat"
                                className="h-11 w-11 rounded-full object-cover"
                                src={photo}
                              />
                            </a>
                            <div className="min-w-0 flex-1">
                              <a
                                className="truncate text-sm font-bold text-foreground hover:underline"
                                href="#/profile/6ab56ac58ebe92c2c0c9430f"
                                data-discover="true"
                              >
                                {name}
                              </a>
                              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                @{username} ·{" "}
                                <button
                                  type="button"
                                  className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                                >
                                  {new Date(createdAt).toLocaleDateString(
                                    "en",
                                    {
                                      hour: "numeric",
                                    },
                                  )}
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
                                  {privacy}
                                </span>
                              </div>
                            </div>
                            <div className="relative">
                              <Dropdown
                                dismissOnClick={false}
                                renderTrigger={() => (
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
                                )}
                              >
                                <DropdownItem>save post</DropdownItem>
                                {/* {_id== userData._id && ( */}
                                <>
                                  <DropdownItem>
                                    <UpdatePost />
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => HandleDelete(_id)}
                                  >
                                    delete post
                                  </DropdownItem>
                                </>
                                {/* )} */}
                              </Dropdown>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                              {body}
                            </p>
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
                              src={image}
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
                                {likesCount}
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
                                {sharesCount} shares
                              </span>
                              <span>{commentsCount} comments</span>
                              <Link
                                to={"/post/" + _id}
                                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
                              >
                                View details
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="mx-4 border-t border-slate-200" />

                        <Comment
                          topComment={topComment}
                          id={_id}
                          likes={likes}
                          refetch={refetch}
                        />
                      </article>
                    );
                  })}
                </div>
              ) : categ == "myposts" ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                    No posts yet. Be the first one to publish.
                  </div>
                </div>
              ) : categ == "feed" ? (
                <HomeFeed />
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                    No posts yet. Be the first one to publish.
                  </div>
                </div>
              )}
            </section>

            <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
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
                      className="lucide lucide-users text-[#1877f2]"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Suggested Friends
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                    5
                  </span>
                </div>
                <div className="mb-3">
                  <label className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      <path d="m21 21-4.34-4.34" />
                      <circle cx={11} cy={11} r={8} />
                    </svg>
                    <input
                      placeholder="Search friends..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                      defaultValue
                    />
                  </label>
                </div>
                <div className="space-y-3">
                  <FollowSuggesion />
                </div>
                <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                  View more
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
