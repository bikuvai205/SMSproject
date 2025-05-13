import React from "react";

const GettingStartForm = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      

      {/* Form Section */}
      <form className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-[#F59E0B] mb-4 text-amber-300">Personal Information</h2>

            <div className="space-y-4">
              <Input label="Full Name" type="text" />
              <Input label="Role on Institution (e.g. Teacher, Manager, Principal)" type="text" />
              <Input label="Address" type="text" />
              <Input label="Email" type="email" />
              <Input label="Phone Number" type="tel" />
              <Input label="Upload Document (max 1MB)" type="file" accept=".pdf,.jpg,.png" />
              <Input label="Citizenship/Official Document Number" type="text" />
             
              
            </div>
          </div>

          {/* Institution Info */}
          <div>
            <h2 className="text-xl font-semibold text-[#F59E0B] mb-4 text-amber-300">Institution Information</h2>

            <div className="space-y-4">
              <Input label="Institution Name" type="text" />
              <Input label="PAN/VAT Number" type="text" />
              <Input label="Address" type="text" />
              <Input label="Institution Email" type="email" />
              <Input label="Head of Institution" type="text" />
              <Input label="Institution Contact Number" type="tel" />
              <Input label="Upload Institution Document (max 2MB)" type="file" accept=".pdf,.jpg,.png" />

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">Institution Type</label>
                <div className="flex flex-wrap gap-4">
                  <Radio label="Community" name="type" />
                  <Radio label="Organizational" name="type" />
                  <Radio label="Non-Profit" name="type" />
                  <Radio label="Private" name="type" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">Additional Information</label>
                <textarea
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  rows={4}
                  placeholder="Anything you'd like to share about the institution..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Submit Registration
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Once submitted, you will receive a verification email within 24 hours.
            
          </p>
          <p className="text-gray-400 text-sm mt-2">
            
            “Your data is securely stored and reviewed manually. We don’t share your information with third parties.”
          </p>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, type, accept }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-1">{label}</label>
    <input
      type={type}
      accept={accept}
      className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
      placeholder={label}
    />
  </div>
);

// Reusable Radio Component
const Radio = ({ label, name }) => (
  <label className="inline-flex items-center space-x-2 text-sm text-white">
    <input type="radio" name={name} className="form-radio text-yellow-500 focus:ring-yellow-500" />
    <span>{label}</span>
  </label>
);

export default GettingStartForm;
