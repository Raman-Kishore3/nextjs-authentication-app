"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; //the right side is the token
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {loading ? "Verifying Your Email..." : "Verfy Email"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Almost there, confirming your account
          </p>
        </div>

        {loading && !verified && !error && (
          <div className="text-center">
            <div className="inline-block px-8 py-6 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
              <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
                Checking verification link...
              </p>
            </div>
          </div>
        )}

        {verified && (
          <div className="text-center space-y-6">
            <div className="inline-block px-8 py-6 bg-green-100 dark:bg-green-900/50 rounded-xl">
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
                Email Verified Successfully!
              </h2>
            </div>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Go to Login
            </Link>
          </div>
        )}
        {error && (
          <div className="text-center space-y-6">
            <div className="inline-block px-8 py-6 bg-red-100 dark:bg-red-900/50 rounded-xl">
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-300">
                Verification Failed
              </h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                The link may be invalid or expired.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Back to Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
