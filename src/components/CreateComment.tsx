import axios from "axios";
import React, { useContext } from "react";
import type { user } from "../interfaces/user";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function CreateComment({ id, refetch }) {
  const [content, setContent] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  const { userData }: { userData: user } = useContext(AuthContext);

  async function HandleCreateComment() {
    const formData = new FormData();

    if (content.trim()) {
      formData.append("content", content.trim());
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    for (const [key, value] of formData.entries()) {
      console.log("FormData:", key, value);
    }

    try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        `https://route-posts.routemisr.com/posts/${id}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Swal.fire({
        title: "Success!",
        text: data.message || "Comment added successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setContent("");
      setImageFile(null);

      setTimeout(() => {
        refetch();
      }, 2000);
    } catch (error) {
      console.log("Create comment error:", error);

      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          "Something went wrong while creating the comment.",
        icon: "error",
      });
    }
  }

  return (
    <div className="mt-3 mb-4">
      <div className="flex items-start gap-2">
        {/* User Image */}
        <img
          alt={userData.name}
          className="h-9 w-9 rounded-full object-cover"
          src={userData.photo}
        />

        <div
          className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
          data-comment-mention-root="true"
        >
          {/* Comment Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Comment as ${userData.name}...`}
            rows={1}
            className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
          />

          <div className="mt-1 flex items-center justify-between">
            {/* Left buttons */}
            <div className="flex items-center gap-1">
              {/* Image Upload */}
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
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
                >
                  <rect width={18} height={18} x={3} y={3} rx={2} />

                  <circle cx={9} cy={9} r={2} />

                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files)}
                />
              </label>

              {/* Emoji */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
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
                >
                  <circle cx={12} cy={12} r={10} />

                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />

                  <line x1={9} x2="9.01" y1={9} y2={9} />

                  <line x1={15} x2="15.01" y1={9} y2={9} />
                </svg>
              </button>

              {/* Selected image name */}
              {imageFile && (
                <span className="max-w-[150px] truncate text-xs text-slate-500">
                  {imageFile.name}
                </span>
              )}
            </div>

            {/* Send */}
            <button
              type="button"
              onClick={HandleCreateComment}
              disabled={!content.trim() && !imageFile}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff]"
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
              >
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />

                <path d="M6 12h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
