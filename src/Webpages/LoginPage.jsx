import React from "react";
import GetNav from "../Components/Getting_Started/GettingStartNav";
import Footersection from "../Components/Landing/Footersection";
import LoginForm from "../Components/Login/LoginForm"; // Adjust path if needed

const LoginPage = () => {
  return (
    <>
      <GetNav />

      <div className="text-center pt-25 bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-amber-300 mb-4">
          LOGIN TO YOUR ACCOUNT
        </h1>
        <p className="text-gray-400 mb-8 text-sm max-w-xl">
          Please enter your credentials to access your institution dashboard.
        </p>

        {/* Login form centered */}
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      <Footersection />
    </>
  );
};

export default LoginPage;
