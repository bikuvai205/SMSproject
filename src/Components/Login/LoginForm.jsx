import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <div className="bg-[#0F172A] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-md space-y-8">
                {/* Amber Accent Card */}
                <div className="absolute inset-0 bg-amber-500 opacity-30 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

                <div className="relative bg-[#1E293B] rounded-3xl shadow-xl p-10 z-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
                    <form className="space-y-6">
                        {/* Institution ID */}
                        <div>
                            <label htmlFor="institutionId" className="block text-sm font-medium text-gray-300">
                                Institution ID
                            </label>
                            <input
                                id="institutionId"
                                name="institutionId"
                                type="text"
                                autoComplete="off"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="e.g., INST1234"
                            />
                        </div>

                        {/* User ID */}
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-300">
                                User ID
                            </label>
                            <input
                                id="userId"
                                name="userId"
                                type="text"
                                autoComplete="off"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Enter your User ID"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Haven’t registered?{" "}
                        <Link to="/getting-started" className="text-amber-400 hover:underline">
                           
                       
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
