"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("api/users/forgotpassword", { email });
      toast.success("User found");
    } catch (error) {
      console.log("Something went wrongs", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };
  useEffect(() => {
    if (email && !email.includes("@")) {
      console.log("email not detected or invalid");
      toast.error("Fake email detected—try again");
    }
  }, [email]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Forgot Password</h1>
      <br />
      <label htmlFor="email">Enter your email to get reset password link</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={email.length > 0 ? false : true}
        onClick={verifyEmail}
      >
        {loading ? "Sending.." : "Send reset link"}
      </button>
      <Link href="/login">Back to Login</Link>
    </div>
  );
}
