"use client";
import { useState } from "react";
// import { useTranslations } from "next-intl";
import { UserDataTypes } from "@/libs/types/types";
import { UserIcon } from "lucide-react";
import { postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";

const PersonalInfoForm = ({
  initialData,
  token,
}: {
  initialData: UserDataTypes;
  token: string;
}) => {
  // const t = useTranslations("company");

  // Form state with validation
  const [formData, setFormData] = useState(initialData);

  // Validation state
  const [errors, setErrors] = useState({
    first_name: "",
    sur_name: "",
    email: "",
    phone: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      first_name: "",
      sur_name: "",
      email: "",
      phone: "",
    };

    // First name validation
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
      valid = false;
    }

    // Last name validation
    if (!formData.sur_name?.trim()) {
      newErrors.sur_name = "Last name is required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
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
       const response = await postData(
        `${initialData.role}/update-profile-api`,
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );
      
      // Update user in cookies
      if (response.data) {
        document.cookie = `user=${JSON.stringify(response.data)}; path=/`;
        // Reload the window to reflect updated user data
        window.location.reload();
      }

      // Mock successful save
      toast.success("Profile updated successfully");
      setSubmitSuccess(true);


      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col justify-center items-start gap-8 md:gap-12"
    >
      {/* Header - Profile Image and Name */}
      <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-6 md:gap-12">
        <div className="w-32 h-32 md:w-44 md:h-44 mx-auto md:mx-0 relative bg-white rounded-full outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex items-center justify-center">
          {/* <img
            className="w-24 h-20 md:w-32 md:h-24"
            src="/api/placeholder/136/103"
            alt="Profile"
          /> */}
          <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
        </div>
        <div className="p-2.5 flex flex-col justify-center items-center sm:items-start gap-5">
          <div className="text-black text-3xl md:text-5xl font-bold font-['Libre_Baskerville'] text-center sm:text-left">
            {formData.name}
          </div>
          <div className="text-black/60 text-base md:text-lg font-bold font-['Libre_Baskerville']">
            {formData.email}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="self-stretch px-2 sm:px-6 py-2.5 flex flex-col justify-center items-end gap-8 md:gap-14 w-full">
        <div className="self-stretch flex flex-col justify-center items-end gap-6 md:gap-10 w-full">
          {/* Name Fields */}
          <div className="self-stretch flex flex-col sm:flex-row justify-start items-start gap-6 md:gap-12 w-full">
            <div className="flex-1 flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                First Name
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl outline ${
                    errors.first_name
                      ? "outline-red-500"
                      : "outline-1 outline-offset-[-1px] outline-zinc-300"
                  } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errors.first_name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                Last Name
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="sur_name"
                  value={formData.sur_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl outline ${
                    errors.sur_name
                      ? "outline-red-500"
                      : "outline-1 outline-offset-[-1px] outline-zinc-300"
                  } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                />
                {errors.sur_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {errors.sur_name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
            <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
              Email
            </div>
            <div className="self-stretch relative w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl outline ${
                  errors.email
                    ? "outline-red-500"
                    : "outline-1 outline-offset-[-1px] outline-zinc-300"
                } w-full text-black text-base md:text-lg font-bold font-['Libre_Baskerville']`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
            <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
              Phone number
            </div>
            <div className="self-stretch relative w-full">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl outline ${
                  errors.phone
                    ? "outline-red-500"
                    : "outline-1 outline-offset-[-1px] outline-zinc-300"
                } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {submitSuccess && (
          <div className="self-stretch bg-green-100 text-green-800 p-3 rounded-lg mb-4">
            Profile information updated successfully!
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
          className={`w-full sm:w-auto px-8 md:px-36 py-3 md:py-4 bg-blue-950 rounded-xl md:rounded-2xl flex justify-center items-center gap-2 mt-4 transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-900"
          }`}
        >
          <div className="text-white text-lg md:text-xl font-normal font-['Libre_Baskerville']">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </div>
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
