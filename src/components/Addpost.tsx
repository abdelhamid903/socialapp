import React, { useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import type { user } from "../interfaces/user";
import { useMutation } from "@tanstack/react-query";

export default function Addpost({ refetch }) {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const { userData }: { userData: user } = useContext(AuthContext);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  async function HandleCreatePost() {
    const formData = new FormData();

    if (content.trim()) {
      formData.append("body", content.trim());
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return axios.post("https://route-posts.routemisr.com/posts", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

   /*  try {
      const token = localStorage.getItem("userToken");

      const { data } = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Post created:", data);

      Swal.fire({
        title: "Success!",
        text: data.message || "Post created successfully",
        icon: "success",
        confirmButtonText: "Cool",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset
      setContent("");
      setImageFile(null);
      setShowEmojiPicker(false);

      setTimeout(() => {
        refetch();
      }, 2000);
    } catch (error) {
      console.log("Create post error:", error);
      console.log("Status:", error?.response?.status);
      console.log("Response:", error?.response?.data);

      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          "Something went wrong while creating the post.",
        icon: "error",
      });
    } */
  }
  const { mutate, isPending,data } = useMutation({
    mutationFn: HandleCreatePost,
    onSuccess:()=>{
      Swal.fire({
        title: "Success!",
        text: data?.data.message || "Post created successfully",
        icon: "success",
        confirmButtonText: "Cool",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset
      setContent("");
      setImageFile(null);
      setShowEmojiPicker(false);

      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError:()=>{

    }
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* User */}
      <div className="mb-3 flex items-start gap-3">
        <img
          alt={userData?.name}
          className="h-11 w-11 rounded-full object-cover"
          src={userData?.photo}
        />

        <div className="flex-1">
          <p className="text-base font-extrabold text-slate-900">
            {userData?.name}
          </p>

          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
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
            >
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
              <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
              <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
              <circle cx={12} cy={12} r={10} />
            </svg>

            <select className="bg-transparent outline-none">
              <option value="public">Public</option>
              <option value="following">Followers</option>
              <option value="only_me">Only me</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <textarea
          rows={4}
          value={content}
          placeholder={`What's on your mind, ${userData?.name}?`}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
        />

        {/* Image Preview */}
        {imageFile && (
          <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              className="max-h-[350px] w-full object-cover"
            />

            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-lg font-bold text-white transition hover:bg-black/80"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
        <div className="relative flex items-center gap-2">
          {/* Photo */}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
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
              className="text-emerald-600"
            >
              <rect width={18} height={18} x={3} y={3} rx={2} />
              <circle cx={9} cy={9} r={2} />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>

            <span className="hidden sm:inline">Photo/video</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
              }}
            />
          </label>

          {/* Emoji */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
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
              className="text-amber-500"
            >
              <circle cx={12} cy={12} r={10} />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1={9} x2="9.01" y1={9} y2={9} />
              <line x1={15} x2="15.01" y1={9} y2={9} />
            </svg>

            <span className="hidden sm:inline">Feeling/activity</span>
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 z-50 mb-2">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={320}
                height={400}
                searchDisabled={false}
                skinTonesDisabled={false}
              />
            </div>
          )}
        </div>

        {isPending ? (
          <button
            type="button"
            disabled={!content.trim() && !imageFile}
            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff]"
          >
            Loading...
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
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => mutate()}
            disabled={!content.trim() && !imageFile}
            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff]"
          >
            Post
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
              <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
              <path d="m21.854 2.147-10.94 10.939" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
