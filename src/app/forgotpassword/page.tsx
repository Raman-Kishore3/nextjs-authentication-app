"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      await axios.post("api/users/forgotpassword", { email: email.trim() });
      toast.success("Reset link sent! Check your inbox (and spam folder)");
      setEmail("");
    } catch (error: any) {
      console.log("Something went wrongs", error.message);
      toast.error(error.message || "Failed to send reset link. Try again");
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled = loading || !email.trim() || !email.includes("@");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={buttonDisabled}
            onClick={verifyEmail}
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </div>
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
