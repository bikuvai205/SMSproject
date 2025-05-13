import React, { useState } from "react";

const GettingStartForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    address: "",
    email: "",
    phone: "",
    citizenDoc: "",
    institutionName: "",
    panVat: "",
    institutionAddress: "",
    institutionEmail: "",
    headName: "",
    institutionContact: "",
    institutionType: "",
    additionalInfo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, institutionType: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-amber-300 mb-4">
              Personal Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Role on Institution (e.g. Teacher, Manager, Principal)"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Citizenship/Official Document Number"
                name="citizenDoc"
                value={formData.citizenDoc}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Institution Info */}
          <div>
            <h2 className="text-xl font-semibold text-amber-300 mb-4">
              Institution Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Institution Name"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
              />
              <Input
                label="PAN/VAT Number"
                name="panVat"
                value={formData.panVat}
                onChange={handleChange}
              />
              <Input
                label="Address"
                name="institutionAddress"
                value={formData.institutionAddress}
                onChange={handleChange}
              />
              <Input
                label="Institution Email"
                name="institutionEmail"
                type="email"
                value={formData.institutionEmail}
                onChange={handleChange}
              />
              <Input
                label="Head of Institution"
                name="headName"
                value={formData.headName}
                onChange={handleChange}
              />
              <Input
                label="Institution Contact Number"
                name="institutionContact"
                type="tel"
                value={formData.institutionContact}
                onChange={handleChange}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Institution Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <Radio
                    label="Community"
                    name="institutionType"
                    value="Community"
                    checked={formData.institutionType === "Community"}
                    onChange={handleRadioChange}
                  />
                  <Radio
                    label="Organizational"
                    name="institutionType"
                    value="Organizational"
                    checked={formData.institutionType === "Organizational"}
                    onChange={handleRadioChange}
                  />
                  <Radio
                    label="Non-Profit"
                    name="institutionType"
                    value="Non-Profit"
                    checked={formData.institutionType === "Non-Profit"}
                    onChange={handleRadioChange}
                  />
                  <Radio
                    label="Private"
                    name="institutionType"
                    value="Private"
                    checked={formData.institutionType === "Private"}
                    onChange={handleRadioChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  rows={4}
                  placeholder="Anything you'd like to share about the institution..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Submit Registration
          </button>
          {message && (
            <p className="text-gray-300 text-sm mt-4">{message}</p>
          )}
          <p className="text-gray-400 text-sm mt-2">
            “Your data is securely stored and reviewed manually.”
          </p>
        </div>
      </form>
    </div>
  );
};

// 🔁 Reusable Input
const Input = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
      placeholder={label}
    />
  </div>
);

// 🔁 Reusable Radio
const Radio = ({ label, name, value, checked, onChange }) => (
  <label className="inline-flex items-center space-x-2 text-sm text-white">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio text-yellow-500 focus:ring-yellow-500"
    />
    <span>{label}</span>
  </label>
);

export default GettingStartForm;
