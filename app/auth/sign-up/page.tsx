'use client';
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // ...handle sign-up logic...
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Sign Up</button>
      </form>
      <div className="mt-4">
        <Link href="/auth/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
