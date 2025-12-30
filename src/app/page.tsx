"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          My App
        </h1>
        <p className="mt-4 text-xl text-white">
          Welcome — log in to continue{" "}
          <Link
            href="/login"
            className="text-lg font-semibold text-blue-700 dark:text-blue-300 hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
