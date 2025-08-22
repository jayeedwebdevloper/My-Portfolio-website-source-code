"use client";

import { ContextApi } from "@/Context/Context";
import React from "react";

const SignIn = () => {
    const { loginUser, setIsLoading, isLoading } = React.useContext<any>(ContextApi);
    const [error, setError] = React.useState<string>("");

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.email as HTMLInputElement).value;
        const password = (form.password as HTMLInputElement).value;

        setIsLoading(true);
        loginUser(email, password)
            .then(() => {
                setIsLoading(false);
                form.reset();
            })
            .catch((error: any) => {
                const errorMessage = error.message;
                setError(errorMessage);
                console.error(errorMessage);
                setIsLoading(false);
            });
    }
    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="w-fit mx-auto">
                <h2 className="text-3xl font-bold pb-6 text-center text-white drop-shadow-lg">
                    Admin Login
                </h2>

                <form onSubmit={handleSignIn} className="w-full sm:w-[400px] p-6 rounded-2xl shadow-2xl bg-black/10 border border-white/20 backdrop-blur-2xl">
                    {/* Email */}
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                            Email/Username
                        </label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            className="w-full px-4 py-2 rounded-xl bg-black/5 border border-white/20 text-white placeholder-slate-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-xl bg-black/5 border border-white/20 text-white placeholder-slate-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Button */}
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 
            hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30 active:scale-95 transition-transform duration-150 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;