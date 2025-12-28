"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("Password changed successfully", response.data.message);
      setPassword("");
      router.push("/login");
    } catch (error) {
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">Reset Password</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      <h2 className="text-2xl">Please enter your new password</h2>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        placeholder="password"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={password.length > 0 ? false : true}
        onClick={changePassword}
      >
        {loading ? "No Submit" : "Submit"}
      </button>
    </div>
  );
}
