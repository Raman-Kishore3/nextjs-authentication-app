"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length >= 6;
  const canSubmit = passwordsMatch && !loading;

  const changePassword = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      setSuccess(true);
      toast.success("Password changed successfully", response.data.message);
      setPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setError(true);
      console.log("Error in changing password", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {success ? "Password Updated!" : "Reset Your Password"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {success
              ? "Redirecting to login..."
              : "Choose a strong new password"}
          </p>
        </div>

        {!success ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                type="password"
                placeholder="Enter new password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 transition-shadow ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent"
                }`}
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
              {password && password.length < 6 && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            {error && (
              <div className="px-4 py-3 bg-red-100 dark:bg-red-900/50 rounded-xl text-center">
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}
            <button
              onClick={changePassword}
              disabled={!canSubmit}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting Password..." : "Set New Password"}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="inline-block px-8 py-6 bg-green-100 dark:bg-green-900/50 rounded-xl">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
                Success!
              </h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Your password has been changed.
              </p>
            </div>
          </div>
        )}
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
