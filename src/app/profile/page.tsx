"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {`Welcome back! Here's your account overview`}
          </p>
        </div>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Logged in as:{" "}
            </p>
            <div className="mt-2 inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
              {data === "nothing" ? (
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Loading...
                </span>
              ) : (
                <Link
                  href={`/profile/${data}`}
                  className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline"
                >
                  {data}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={getUserDetails}
            className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            Refresh User Details
          </button>

          <button
            onClick={logout}
            className="w-full py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            Logout
          </button>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          ></Link>
        </div>
      </div>
    </div>
  );
}
