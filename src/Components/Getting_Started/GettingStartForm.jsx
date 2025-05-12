import React from "react";

const GettingStartForm = () => {
  return (
    <div className="w-full px-4 py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Individual Registration */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">For Individual</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-400"
            >
              Register as Individual
            </button>
          </form>
        </div>

        {/* Institution Registration */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">For Institution</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Institution Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="ABC School"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="info@abcschool.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Registration ID</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="INST-123456"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-400"
            >
              Register Institution
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GettingStartForm;
