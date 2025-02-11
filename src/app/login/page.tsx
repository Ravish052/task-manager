"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });

    if (!result?.error) {
      router.push("/dashboard");
    }else {
      alert("email or password is incorrect.")
    }
  };

  return (
    <div className="w-full h-full md:w-[487px] border-none shadow-none">
      <div className="flex items-center justify-center text-center p-7">
        <h1 className="text-3xl">Sign in</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-gray-800 placeholder-gray-500"
        />
        <input type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-gray-800 placeholder-gray-500"
        />

        <button type="submit"
          className="dark:invert bg-[#86EE02] text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
