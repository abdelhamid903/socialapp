import axios from "axios";
import React, { useContext } from "react";
import type { CommentElement } from "../interfaces/Comments";
import CreateComment from "./CreateComment";
import { AuthContext } from "../context/AuthContext";

export default function Comment({ topComment, id, likes, refetch }) {
  const [commentList, setComments] = React.useState<CommentElement[] | null>(
    null,
  );
  const { userData } = useContext(AuthContext);

  async function getPostComment(id: string) {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    setComments(data.data.comments);
    refetch()
  }

  async function HandleLike() {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${id}/like`,
      "",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    refetch();
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 p-1">
        <button
          onClick={() => HandleLike()}
          className={`cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm ${likes.find((el) => el == userData._id) ? "text-blue-700" : "text-slate-600"} hover:bg-slate-100`}
        >
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
        <button
          onClick={() => getPostComment(id)}
          className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
        >
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
      {topComment && !commentList && (
        <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Top Comment
          </p>

          <div className="flex items-start gap-2">
            <img
              alt={topComment?.commentCreator.name}
              className="h-8 w-8 rounded-full object-cover"
              src={topComment?.commentCreator.photo}
            />
            <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
              <p className="truncate text-xs font-bold text-slate-900">
                {topComment?.commentCreator.name}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                {topComment?.content}
              </p>
            </div>
          </div>

          <button
            onClick={() => getPostComment(id)}
            className="mt-2 text-xs font-bold text-[#1877f2] hover:underline"
          >
            View all comments
          </button>
        </div>
      )}

      {commentList &&
        commentList.map((el) => {
          return (
            <div key={id} className="flex items-start gap-2">
              <img
                alt={el?.commentCreator.name}
                className="h-8 w-8 rounded-full object-cover"
                src={el?.commentCreator.photo}
              />
              <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                <p className="truncate text-xs font-bold text-slate-900">
                  {el?.commentCreator.name}
                </p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                  {el?.content}
                </p>
              </div>
            </div>
          );
        })}
      {commentList && <CreateComment id={id} refetch={refetch}/>}
    </>
  );
}
