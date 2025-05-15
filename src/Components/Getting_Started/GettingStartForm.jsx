import React, { useState } from "react";
import ToastNotification from "../Reusable/ToastNotification";
import { notify } from "../../utils/toast";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, institutionType: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const requiredFields = [
      "fullName",
      "role",
      "address",
      "email",
      "phone",
      "citizenDoc",
      "institutionName",
      "panVat",
      "institutionAddress",
      "institutionEmail",
      "headName",
      "institutionContact",
      "institutionType",
    ];

    // Find any empty required field
    const emptyField = requiredFields.find((field) => !formData[field]);

    if (emptyField) {
      // Trigger error toast with the message for missing fields
      notify("Please fill in all required fields.", "error");
      return; // Prevent form submission
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // Trigger success toast
        notify(result.message, "success");

        // Clear the form by resetting the formData state
        setFormData({
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
      } else {
        // Trigger error toast
        notify("Something went wrong.", "error");
      }
    } catch (err) {
      console.error(err);
      // Trigger error toast for server issues
      notify("Server error. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {/* Include ToastNotification Component */}
      <ToastNotification />

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
                label="Institution Address"
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

              {/* Institution Type Radio Buttons */}
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

              {/* Additional Info */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
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
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md"
          >
            Submit Registration
          </button>
          <p className="text-gray-400 text-sm mt-2">
            "Your data is securely stored and reviewed manually."
          </p>
        </div>
      </form>
    </div>
  );
};

// 🔁 Reusable Input Component
const Input = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
      required
    />
  </div>
);
// 🔁 Reusable Radio Button Component
const Radio = ({ label, name, value, checked, onChange }) => (
  <label className="inline-flex items-center text-white">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio h-4 w-4 text-yellow-500"
    />
    <span className="ml-2">{label}</span>
  </label>
);

export default GettingStartForm;
