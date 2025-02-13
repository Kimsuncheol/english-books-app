'use client';
import { useState } from "react";
import Link from "next/link";
import ReturnHome from "@/components/ReturnHome";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // ...handle login logic...
    };

    return (
        <div className="min-h-screen flex flex-col items-left justify-between p-4">
            <div className="">
                <ReturnHome />
            </div>
            <div className="w-full h-full flex flex-col items-end justify-center">
                <div className="w-full flex justify-center">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                </div>
                <form onSubmit={handleLogin} className="w-full">
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
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
                </form>
                <div className="mt-4 space-x-3 flex flex-col w-full items-end">
                    <Link href="/auth/signup">Sign Up</Link>
                    <Link href="/auth/find-password">Forgot Password?</Link>
                </div>
            </div>
            <div className=""></div>
        </div>
    );
}
