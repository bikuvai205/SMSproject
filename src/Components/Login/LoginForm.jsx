import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <div className="bg-[#0F172A] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative w-full max-w-md space-y-8">
                {/* Amber Accent Card */}
                <div className="absolute inset-0 bg-amber-500 opacity-30 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

                <div className="relative bg-[#1E293B] rounded-3xl shadow-xl p-10 z-10">
                    <h2 className="text-3xl font-bold text-amber-300 text-center mb-6">Login</h2>
                    <form className="space-y-6">
                        {/* Institution ID */}
                      
<div>
    <label htmlFor="institutionId" className="block text-sm font-medium text-gray-300">
        Institution ID
    </label>
    <div className="relative">
        <i className="fas fa-graduation-cap absolute left-3 top-3.5 text-gray-400"></i>
        <input
            id="institutionId"
            name="institutionId"
            type="text"
            autoComplete="off"
            required
            className="mt-1 block w-full pl-10 pr-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your Institution ID"
        />
    </div>
</div>

{/* User ID */}
<div>
    <label htmlFor="userId" className="block text-sm font-medium text-gray-300">
        User ID
    </label>
    <div className="relative">
        <i className="fas fa-user-graduate absolute left-3 top-3.5 text-gray-400"></i>
        <input
            id="userId"
            name="userId"
            type="text"
            autoComplete="off"
            required
            className="mt-1 block w-full pl-10 pr-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your User ID"
        />
    </div>
</div>

{/* Password */}
<div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
        Password
    </label>
    <div className="relative">
        <i className="fas fa-key absolute left-3 top-3.5 text-gray-400"></i>
        <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full pl-10 pr-4 py-2 bg-[#334155] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="••••••••"
        />
    </div>
</div>


                       
<div className="flex items-center justify-center">
    <button
        type="submit"
        className="px-8 py-2 border border-transparent rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 font-medium "
    >
        Login
    </button>
</div>

                    </form>

                
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Haven’t registered?{" "}
                        <Link to="/getting-started" className="text-yellow-500 hover:underline">
                           
                       
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
