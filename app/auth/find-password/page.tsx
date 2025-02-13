'use client';
import { useState } from "react";
import Link from "next/link";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");

  const handleFindPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // ...handle password reset logic...
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Find Password</h1>
      <form onSubmit={handleFindPassword} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-red-500 text-white p-2 w-full">Reset Password</button>
      </form>
      <div className="mt-4">
        <Link href="/auth/login">Back to Login</Link>
      </div>
    </div>
  );
}
