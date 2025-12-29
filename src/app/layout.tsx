import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Authentication App",
  description: "Authentication App using nextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center" // Or bottom-center, top-right, etc.
          reverseOrder={false}
          gutter={12} // Space between multiple toasts
          toastOptions={{
            duration: 5000, // Auto-dismiss after 5s
            style: {
              background: "rgba(255, 255, 255, 0.8)", // Light mode glass
              color: "#1e293b", // Dark text
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: "16px 24px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
            className: "font-medium text-base", // Tailwind classes
            success: {
              style: {
                background: "rgba(34, 197, 94, 0.8)", // Green tint
                border: "1px solid rgba(34, 197, 94, 0.3)",
                color: "#115029",
              },
              icon: "✅", // Or custom emoji/SVG
            },
            error: {
              style: {
                background: "rgba(239, 68, 68, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#7f1d1d",
              },
              icon: "❌",
            },
            loading: {
              style: {
                background: "rgba(59, 130, 246, 0.8)", // blue tint
                border: "1px solid rgba(99, 102, 241, 0.3)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
