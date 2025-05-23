"use client";

import { postData } from "@/libs/axios/server";
import { UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const ChangePassword = ({
  token,
  userData,
}: {
  token: string;
  userData: UserDataTypes;
}) => {
  const t = useTranslations("personal_information.changePassword");
  // Form state with validation
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Validation state
  const [errors, setErrors] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState({
    current_password: false,
    new_password: false,
    new_password_confirmation: false,
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
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    };

    // Current password validation
    if (!formData.current_password.trim()) {
      newErrors.current_password = t("current_password_is_required");
      valid = false;
    }

    // New password validation
    if (!formData.new_password.trim()) {
      newErrors.new_password = t("new_password_is_required");
      valid = false;
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = t("password_must_be_at_least_8_characters");
      valid = false;
    }

    // Confirm password validation
    if (!formData.new_password_confirmation.trim()) {
      newErrors.new_password_confirmation = t("please_confirm_your_new_password");
      valid = false;
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = t("passwords_must_match");
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
       await postData(
        `${userData.role}/change-password-api`,
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      // Mock successful save
      toast.success(t("password_changed_successfully"));
      setSubmitSuccess(true);

      // Reset form data
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });

      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || t("an_error_occurred"));
      } else {
        toast.error(t("an_unexpected_error_occurred"));
      }
      throw error;
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
            {t("current_password")}
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={showPassword.current_password ? "text" : "password"}
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                placeholder={t("enter_password")}
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current_password")}
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.current_password ? (
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
            {errors.current_password && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.current_password}
              </p>
            )}
          </div>
        </div>

        {/* New Password Field */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
            {t("new_password")}
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={showPassword.new_password ? "text" : "password"}
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder={t("enter_password")}
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new_password")}
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.new_password ? (
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
            {errors.new_password && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.new_password}
              </p>
            )}
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="self-stretch text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
            {t("confirm_new_password")}
          </div>
          <div className="self-stretch relative">
            <div className="self-stretch h-16 p-4 bg-zinc-100 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-between items-center w-full">
              <input
                type={
                  showPassword.new_password_confirmation ? "text" : "password"
                }
                name="new_password_confirmation"
                value={formData.new_password_confirmation}
                onChange={handleChange}
                placeholder={t("enter_password")}
                className="bg-transparent border-none outline-none flex-1 text-black text-lg font-normal font-['Libre_Baskerville']"
              />
              <button
                type="button"
                onClick={() =>
                  togglePasswordVisibility("new_password_confirmation")
                }
                className="w-6 h-6 relative flex items-center justify-center focus:outline-none"
              >
                {showPassword.new_password_confirmation ? (
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
            {errors.new_password_confirmation && (
              <p className="text-red-500 text-sm mt-1 ml-2">
                {errors.new_password_confirmation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {submitSuccess && (
        <div className="self-stretch bg-green-100 text-green-800 p-3 rounded-lg mb-4">
          {t("password_changed_successfully")}
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
        onClick={handleSubmit}
        className={`px-36 py-4 bg-blue-950 rounded-2xl inline-flex justify-center items-center gap-2 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-900"
        }`}
      >
        <div className="text-white text-xl font-normal font-['Libre_Baskerville']">
          {isSubmitting ? t("saving") : t("save_changes")}
        </div>
      </button>
    </form>
  );
};

export default ChangePassword;
