"use client";
import { useState, useRef, useEffect } from "react";
import { ServiceTypes, UserDataTypes } from "@/libs/types/types";
import { UserIcon, Camera, Edit } from "lucide-react";
import { getData, postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { app } from "@/libs/firebase/config";
import PhoneInput from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocale, useTranslations } from "next-intl";

import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

const PersonalInfoForm = ({
  initialData,
  token,
}: {
  initialData: UserDataTypes;
  token: string;
}) => {
  const t = useTranslations("personal_information");
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState<Value>(initialData.phone as Value);
  const locale = useLocale();

  // Form state with validation
  const [formData, setFormData] = useState({
    ...initialData,
    first_name: initialData.name?.split(" ")[0] || "",
    sur_name: initialData.name?.split(" ")[1] || "",
    price_listings: initialData.company?.price_listings || "",
    bio: initialData.company?.bio || "",
    services: initialData.company?.services?.map((s) => s.id) || [],
    verified_phone: initialData.phone === initialData.verified_phone,
    phone: phone,
    status: true,
  });

  // Profile image state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    initialData.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  const auth = getAuth(app);

  // Verification state
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({
    first_name: "",
    sur_name: "",
    email: "",
    phone: "",
    code: "",
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

    // Reset verification when phone changes
    if (name === "phone") {
      setShowVerification(false);
      setVerificationCode("");
      setVerificationSuccess(false);
      setFormData((prev) => ({
        ...prev,
        verified_phone: initialData.phone === value,
      }));
    }
  };

  // firebase for verify phone
  const setupRecaptcha = (): void => {
    // Clear any existing reCAPTCHA to prevent duplicates
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    // Make sure the container exists
    if (!recaptchaContainerRef.current) {
      toast.error("reCAPTCHA container not found");
      return;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA resolved");
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA expired. Please try again.");
          },
        }
      );
    } catch (error) {
      console.error("Error creating reCAPTCHA:", error);
      toast.error(
        "Failed to set up verification. Please refresh and try again."
      );
    }
  };

  const sendOTP = async (): Promise<void> => {
    if (!formData.phone) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSendingCode(true);

    try {
      if (!window.recaptchaVerifier) {
        setupRecaptcha();
      }

      // Format phone number to include "+" if it doesn't already
      const formattedPhone = formData.phone.startsWith("+")
        ? formData.phone
        : `+${formData.phone}`;

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized properly");
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setShowVerification(true);
      toast.success("Verification code sent to your phone");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Try again."
      );
    } finally {
      setSendingCode(false);
    }
  };

  // Validate OTP
  const validateOTP = async () => {
    if (!verificationCode) {
      setErrors((prev) => ({
        ...prev,
        code: "Please enter the verification code",
      }));
      return;
    }

    setVerifyingCode(true);

    try {
      if (!window.confirmationResult) {
        throw new Error(
          "Verification session expired. Please request a new code."
        );
      }

      const result = await window.confirmationResult.confirm(verificationCode);
      if (result.user) {
        toast.success("Phone number verified successfully!");
        setVerificationSuccess(true);
        setFormData((prev) => ({
          ...prev,
          verified_phone: true,
        }));
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setErrors((prev) => ({
        ...prev,
        code: "Invalid verification code. Please try again.",
      }));
      toast.error("Failed to verify code");
    } finally {
      setVerifyingCode(false);
    }
  };

  // get services
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await getData(
          `services`,
          {},
          new AxiosHeaders({ Authorization: `Bearer ${token}`, lang: locale })
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      }
    };

    if (initialData.role === "company") {
      getServices();
    }
  }, [token, initialData.role]);

  // Handle profile image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      first_name: "",
      sur_name: "",
      email: "",
      phone: "",
      code: "",
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
    const phoneRegex = /^\+?\d{5,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      valid = false;
    }

    // Verification code validation if phone changed
    if (formData.phone !== initialData.phone && !formData.verified_phone) {
      newErrors.phone = "Please verify your new phone number";
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
      // Create form data for multipart submission
      const submitData = new FormData();

      // Add form fields
      submitData.append("first_name", formData.first_name || "");
      submitData.append("sur_name", formData.sur_name || "");
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);

      // Add verification status if phone was verified
      if (formData.verified_phone) {
        submitData.append("verified_phone", "true");
      }

      if (initialData.role === "company") {
        submitData.append("bio", formData.bio || "");
        submitData.append("price_listings", formData.price_listings || "");
        // Send services as array of numbers
        submitData.append("services", JSON.stringify(formData.services));
      }

      // Add profile image if selected
      if (profileImage) {
        submitData.append("image", profileImage);
      }

      const response = await postData(
        `${initialData.role}/update-profile-api`,
        submitData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      // Update user in cookies
      if (response.data) {
        document.cookie = `user=${JSON.stringify(response.data)}; path=/`;
        // Reload the window to reflect updated user data
        toast.success("Profile updated successfully");
        setSubmitSuccess(true);

        // Delay reload to allow toast to be seen
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.msg || "An error occurred";
        setSubmitError(errorMessage);
        toast.error(errorMessage);
      } else {
        setSubmitError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col justify-center items-start gap-8 md:gap-12"
    >
      {/* Hidden recaptcha container */}
      <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
      {/* Header - Profile Image and Name */}
      <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-6 md:gap-12">
        <div
          className="w-32 h-32 md:w-44 md:h-44 mx-auto md:mx-0 relative bg-white rounded-full outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex items-center justify-center cursor-pointer group"
          onClick={handleImageClick}
        >
          {profileImageUrl ? (
            typeof profileImageUrl === "string" &&
            profileImageUrl.match(/\.(jpeg|jpg|gif|png|webp)$|blob:http/i) ? (
              <div className="relative w-full h-full">
                <img
                  src={profileImageUrl.toString()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                  <Edit className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
                <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                  <Edit className="w-4 h-4 text-white" />
                </div>
              </div>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
              <div className="absolute bottom-0 mx-auto bg-[#192953] p-1.5 rounded-full m-1 cursor-pointer">
                <Edit className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
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
                {t("first_name")}
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                    errors.first_name
                      ? "outline-red-500"
                      : "outline-1 outline-offset-[-1px] outline-zinc-300"
                  } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">
                    {t(errors.first_name)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                {t("last_name")}
              </div>
              <div className="self-stretch relative w-full">
                <input
                  type="text"
                  name="sur_name"
                  value={formData.sur_name}
                  onChange={handleChange}
                  className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
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
              {t("email")}
            </div>
            <div className="self-stretch relative w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
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
              {t("phone")}
            </div>
            <div className="self-stretch relative w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="flex-1 relative">
                  <PhoneInput
                    international
                    defaultCountry="RU"
                    className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                      errors.phone
                        ? "outline-red-500"
                        : "outline-1 outline-offset-[-1px] outline-zinc-300"
                    } w-full text-black text-base md:text-lg font-bold font-['Libre_Baskerville']`}
                    value={formData.phone}
                    onChange={(value) => {
                      setPhone(value as Value);
                      setFormData((prev) => ({
                        ...prev,
                        phone: value as Value,
                      }));
                    }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {errors.phone}
                    </p>
                  )}

                  {/* Verification Status Indicator */}
                  {formData.phone && !showVerification && (
                    <div
                      className={`text-sm mt-1 ml-2 ${
                        formData.verified_phone
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {formData.verified_phone ? t("verified") : ""}
                    </div>
                  )}
                </div>

                {/* Only show Verify Phone button if phone number has changed and not already verified */}
                {formData.phone &&
                  formData.phone !== initialData.phone &&
                  !formData.verified_phone &&
                  !showVerification && (
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={sendingCode}
                      className={`h-12 md:h-16 px-4 sm:px-6 bg-blue-950 rounded-3xl flex justify-center items-center transition-all ${
                        sendingCode
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-blue-900"
                      }`}
                    >
                      <span className="text-white text-sm md:text-base font-normal font-['Libre_Baskerville']">
                        {sendingCode ? t("sending") : t("verify_phone")}
                      </span>
                    </button>
                  )}
              </div>

              {/* Verification Code Input */}
              {showVerification && (
                <div className="mt-3">
                  <div className="self-stretch text-blue-950 text-base font-bold font-['Libre_Baskerville'] mb-1">
                    {t("verification_code")}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          // Clear error when user types
                          setErrors((prev) => ({ ...prev, code: "" }));
                        }}
                        placeholder="Enter verification code"
                        className={`self-stretch h-12 md:h-16 p-3 md:p-4 bg-zinc-100 rounded-3xl ${
                          errors.code
                            ? "outline-red-500"
                            : "outline-1 outline-offset-[-1px] outline-zinc-300"
                        } w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']`}
                      />
                      {errors.code && (
                        <p className="text-red-500 text-sm mt-1 ml-2">
                          {t(errors.code)}
                        </p>
                      )}
                    </div>

                    {/* Verify Code Button */}
                    <button
                      type="button"
                      onClick={validateOTP}
                      disabled={verifyingCode || !verificationCode}
                      className={`h-12 md:h-16 px-4 sm:px-6 bg-blue-950 rounded-3xl flex justify-center items-center transition-all ${
                        verifyingCode || !verificationCode
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-blue-900"
                      }`}
                    >
                      <span className="text-white text-sm md:text-base font-normal font-['Libre_Baskerville']">
                        {verifyingCode ? t("verifying") : t("verify_code")}
                      </span>
                    </button>
                  </div>

                  {/* Resend Code option */}
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={sendingCode}
                    className="text-blue-950 text-sm font-normal font-['Libre_Baskerville'] mt-2 hover:underline"
                  >
                    {sendingCode ? t("sending") : t("resend_code")}
                  </button>

                  {/* Success message when verified */}
                  {verificationSuccess && (
                    <div className="text-green-600 text-sm mt-2">
                      {t("phone_verified")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* company bio */}
          {initialData.role === "company" && (
            <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                {t("company_bio")}
              </div>
              <div className="self-stretch relative w-full">
                <div className="flex-1 relative">
                  <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className={`self-stretch p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville'] min-h-[120px]`}
                    placeholder={t("company_bio_placeholder")}
                  >
                    {formData.bio || ""}
                  </textarea>
                </div>
              </div>
            </div>
          )}

          {/* Services Checklist */}
          {initialData.role === "company" && (
            <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                {t("available_services")}
              </div>
              <div className="self-stretch w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services?.map((service: ServiceTypes, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl"
                      >
                        <input
                          type="checkbox"
                          id={`service-${index}`}
                          checked={formData.services?.includes(service.id)}
                          onChange={(e) => {
                            const currentServices = [
                              ...(formData.services || []),
                            ];
                            if (e.target.checked) {
                              currentServices.push(service.id);
                            } else {
                              const index = currentServices.indexOf(service.id);
                              if (index > -1) {
                                currentServices.splice(index, 1);
                              }
                            }
                            setFormData((prev) => ({
                              ...prev,
                              services: currentServices,
                            }));
                          }}
                          className="w-5 h-5 text-blue-950 rounded border-zinc-300 focus:ring-blue-950"
                        />
                        <label
                          htmlFor={`service-${index}`}
                          className="text-black text-base font-normal font-['Libre_Baskerville'] cursor-pointer"
                        >
                          {service.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Price Listings */}
          {initialData.role === "company" && (
            <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
              <div className="self-stretch text-blue-950 text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                {t("price_listings")}
              </div>
              <div className="self-stretch w-full space-y-4">
                {formData.price_listings?.split(",").map((item, index) => {
                  const [title, price] = item.split(":").map((i) => i.trim());
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-3 w-full"
                    >
                      <div className="flex-1">
                        <input
                          type="text"
                          value={title || ""}
                          onChange={(e) => {
                            // Add space after each word
                            const valueWithSpaces = e.target.value.replace(/([a-zA-Z])([a-zA-Z])/g, '$1 $2');
                            const newListings = formData.price_listings
                              ?.split(",")
                              .map((i, idx) =>
                                idx === index
                                  ? `${valueWithSpaces}:${
                                      item.split(":")[1] || ""
                                    }`
                                  : i
                              )
                              .join(",");
                            setFormData((prev) => ({
                              ...prev,
                              price_listings: newListings,
                            }));
                          }}
                          className="p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']"
                          placeholder={t("price_listings_placeholder")}
                        />
                      </div>
                      <div className="w-full sm:w-1/3">
                        <input
                          type="text"
                          value={price || ""}
                          onChange={(e) => {
                            const newListings = formData.price_listings
                              ?.split(",")
                              .map((i, idx) =>
                                idx === index
                                  ? `${item.split(":")[0] || ""}:${
                                      e.target.value
                                    }`
                                  : i
                              )
                              .join(",");
                            setFormData((prev) => ({
                              ...prev,
                              price_listings: newListings,
                            }));
                          }}
                          className="p-3 md:p-4 bg-zinc-100 rounded-3xl outline-1 outline-offset-[-1px] outline-zinc-300 w-full text-black text-base md:text-lg font-normal font-['Libre_Baskerville']"
                          placeholder={t("price_listings_placeholder_price")}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  const currentListings = formData.price_listings || "";
                  const newListing = currentListings
                    ? `${currentListings}, :`
                    : ":";
                  setFormData((prev) => ({
                    ...prev,
                    price_listings: newListing,
                  }));
                }}
                className="px-4 py-2 bg-blue-950 rounded-xl text-white font-normal font-['Libre_Baskerville'] hover:bg-blue-900 transition-all"
              >
                {t("add_price_listing")}
              </button>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {submitSuccess && (
          <div className="self-stretch bg-green-100 text-green-800 p-3 rounded-lg mb-4">
            {t("profile_updated")}
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
            {isSubmitting ? t("saving") : t("save_changes")}
          </div>
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
