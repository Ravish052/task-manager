"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DottedSeparator from "@/components/DottedSeparator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSocialAuth = (provider: string) => {
    alert(`${provider} authentication coming soon!`);
  };

  return (
    <div className="w-full h-full md:w-[487px] border-none shadow-none">
      <div className="flex items-center justify-center text-center p-7">
        <h1 className="text-3xl">Sign Up</h1>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded text-gray-800 placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-gray-800 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-gray-800 placeholder-gray-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>

        <div>
          <DottedSeparator />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleLogin}
            className="dark:invert bg-[#86EE02] text-white px-4 py-2 rounded"
          >
            Login
          </button>

          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={() => handleSocialAuth("Google")}
              className="flex items-center bg-gray-200 text-black px-4 py-2 rounded"
            >
              <FcGoogle className="mr-2 size-5" />
              Sign up with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth("GitHub")}
              className="flex items-center bg-gray-200 text-black px-4 py-2 rounded"
            >
              <FaGithub className="mr-2 size-5" />
              Sign up with GitHub
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
