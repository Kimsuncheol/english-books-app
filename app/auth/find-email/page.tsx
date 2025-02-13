'use client';
import { useState } from "react";
import Link from "next/link";

export default function FindEmailPage() {
  const [name, setName] = useState("");
  
  const handleFindEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // ...handle finding email logic...
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Find Email</h1>
      <form onSubmit={handleFindEmail} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 w-full">Find Email</button>
      </form>
      <div className="mt-4">
        <Link href="/auth/login">Back to Login</Link>
      </div>
    </div>
  );
}
