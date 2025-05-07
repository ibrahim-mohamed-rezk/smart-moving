"use client";

import { useState } from "react";

const ChangePassword = () => {
  // Form state with validation
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Current password validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setSubmitSuccess(false);
    setSubmitError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful save
      console.log("Password changed successfully");
      setSubmitSuccess(true);

      // Reset form data
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error changing password:", error);
      setSubmitError("Failed to change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-6 md:px-[60px] py-[100px] flex flex-col justify-center items-end gap-14"
    >
      <div className="self-stretch flex flex-col justify-center items-end gap-10">
        {/* Current Password Field */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
            Current Password
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.currentPassword ? (
                  // Eye icon (visible)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  // Eye-slash icon (hidden)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.currentPassword}
              </p>
            )}
          </div>
        </div>

        {/* New Password Field */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
            New Password
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.newPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.newPassword}
              </p>
            )}
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
            Confirm New Password
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.confirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {submitSuccess && (
        <div className="self-stretch bg-green-100 text-green-800 p-3 rounded-lg mb-4">
          Password changed successfully!
        </div>
      )}

      {submitError && (
        <div className="self-stretch bg-red-100 text-red-800 p-3 rounded-lg mb-4">
          {submitError}
        </div>
      )}

      {/* Save Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-36 py-4 bg-blue-950 rounded-2xl inline-flex justify-center items-center gap-2 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-900"
        }`}
      >
        <div className="text-white text-xl font-normal font-['Libre_Baskerville']">
          {isSubmitting ? "Saving..." : "Save"}
        </div>
      </button>
    </form>
  );
};

export default ChangePassword;
