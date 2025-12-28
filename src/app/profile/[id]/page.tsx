import Link from "next/link";

export default async function UserProfile(props: PageProps<"/profile/[id]">) {
  const { id } = await props.params; // Await the promise – future-proof

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 dark:via-blue-900 dark:to-black px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Details for the account
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username / ID:
          </p>
          <div className="mt-2 inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {id || "Unknown"}
            </span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>More profile information coming soon...</p>
        </div>
        <div className="text-center">
          <Link
            href="/profile"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
