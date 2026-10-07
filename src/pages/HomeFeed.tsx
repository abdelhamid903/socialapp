import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Post } from "../interfaces/posts";
import { Dropdown, DropdownItem } from "flowbite-react";
import { UpdatePost } from "../components/UpdatePost";
import { Link } from "react-router";
import Comment from "../components/Comment";
import Swal from "sweetalert2";

export default function HomeFeed() {
  function getHomeFeed() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/feed?only=following&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, refetch } = useQuery({
    queryKey: ["homefeed"],
    queryFn: getHomeFeed,
  });
  const homeFeedPosts: Post[] = data?.data.data.posts;
  console.log(homeFeedPosts);

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
      {homeFeedPosts?.map((el)=>{
        return (
          <article
            key={el._id}
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
                    src={el.user.photo}
                  />
                </a>
                <div className="min-w-0 flex-1">
                  <a
                    className="truncate text-sm font-bold text-foreground hover:underline"
                    href="#/profile/6ab56ac58ebe92c2c0c9430f"
                    data-discover="true"
                  >
                    {el.user.name}
                  </a>
                  <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                    @{el.user.username} ·{" "}
                    <button
                      type="button"
                      className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                    >
                      {new Date(el.createdAt).toLocaleDateString("en", {
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
                      {el.privacy}
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
                      <DropdownItem onClick={() => HandleDelete(el._id)}>
                        delete post
                      </DropdownItem>
                    </>
                    {/* )} */}
                  </Dropdown>
                </div>
              </div>
              <div className="mt-3">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {el.body}
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
                  src={el.image}
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
                    {el.likesCount}
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
                    {el.sharesCount} shares
                  </span>
                  <span>{el.commentsCount} comments</span>
                  <Link
                    to={"/post/" + el._id}
                    className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-4 border-t border-slate-200" />

            <Comment
              topComment={el.topComment}
              id={el._id}
              likes={el.likes}
              refetch={refetch}
            />
          </article>
        );
      })}
    </>
  );
}
