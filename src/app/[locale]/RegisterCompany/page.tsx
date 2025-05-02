"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import sidebgimage from "../../../../public/side.svg";
import HiddenIcon from "../../../../public/aye";
import toast from "react-hot-toast";
import { postData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";

interface FormData {
  firstName: string;
  sur_name: string;
  email: string;
  CVR: string;
  phone: string;
  password: string;
  password_confirmation: string;
  address: string;
  postal_code: string;
  city: string;
  contact_person: string;
  services: {
    privateMeeting: boolean;
    customerRetention: boolean;
    businessConsultation: boolean;
    storage: boolean;
    misc: boolean;
  };
}

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const AccountCreationForm = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Form validation states
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validCVR, setValidCVR] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [validPhone, setValidPhone] = useState<boolean | null>(null);
  const [validFirstName, setValidFirstName] = useState<boolean | null>(null);
  const [validsur_name, setValidsur_name] = useState<boolean | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    sur_name: "",
    CVR: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    address: "",
    postal_code: "",
    contact_person: "",
    city: "",
    services: {
      privateMeeting: false,
      customerRetention: false,
      businessConsultation: false,
      storage: false,
      misc: false,
    },
  });

  // Password requirements validation
  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirements>({
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    });

  // Validate name fields
  useEffect(() => {
    if (formData.firstName) {
      setValidFirstName(formData.firstName.trim() !== "");
    } else {
      setValidFirstName(null);
    }
  }, [formData.firstName]);

  useEffect(() => {
    if (formData.sur_name) {
      setValidsur_name(formData.sur_name.trim() !== "");
    } else {
      setValidsur_name(null);
    }
  }, [formData.sur_name]);

  // Validate email format
  useEffect(() => {
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(emailRegex.test(formData.email));
    } else {
      setValidEmail(null);
    }
  }, [formData.email]);

  // Validate CVR (Danish business registration number)
  useEffect(() => {
    if (formData.CVR) {
      // CVR is typically 8 digits in Denmark
      const cvrRegex = /^\d{8}$/;
      setValidCVR(cvrRegex.test(formData.CVR.trim()));
    } else {
      setValidCVR(null);
    }
  }, [formData.CVR]);

  // Validate phone format
  useEffect(() => {
    if (formData.phone) {
      // Simple validation for demonstration - adjust based on your requirements
      const phoneRegex = /^[\d\s()+-]{10,15}$/;
      setValidPhone(phoneRegex.test(formData.phone.replace(/[^\d]/g, "")));
    } else {
      setValidPhone(null);
    }
  }, [formData.phone]);

  // Validate password requirements
  useEffect(() => {
    if (formData.password) {
      const requirements = {
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      };

      setPasswordRequirements(requirements);
      setValidPassword(Object.values(requirements).every((req) => req));
    } else {
      setValidPassword(null);
      setPasswordRequirements({
        minLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecial: false,
      });
    }
  }, [formData.password]);

  // Check if passwords match
  useEffect(() => {
    if (formData.password && formData.password_confirmation) {
      setPasswordMatch(formData.password === formData.password_confirmation);
    } else {
      setPasswordMatch(null);
    }
  }, [formData.password, formData.password_confirmation]);

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        services: {
          ...formData.services,
          [name]: checked,
        },
      });
    } else if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        phone: formattedPhone,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const canProceedToNextTab = () => {
    const {
      firstName,
      sur_name,
      email,
      phone,
      password,
      password_confirmation,
    } = formData;

    return (
      firstName.trim() !== "" &&
      sur_name.trim() !== "" &&
      email.trim() !== "" &&
      validEmail === true &&
      phone.trim() !== "" &&
      validPhone === true &&
      password.trim() !== "" &&
      validPassword === true &&
      password_confirmation.trim() !== "" &&
      passwordMatch === true
    );
  };

  const canSubmitForm = () => {
    const { address, postal_code, city, services } = formData;
    const hasSelectedService = Object.values(services).some((value) => value);

    return (
      address.trim() !== "" &&
      postal_code.trim() !== "" &&
      city.trim() !== "" &&
      hasSelectedService
    );
  };

  const handleNext = () => {
    if (canProceedToNextTab()) {
      setCurrentTab(2);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentTab(1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!canSubmitForm()) return;

    setIsLoading(true);

    try {
      const response = await postData(
        "company/register-api",
        formData,
        new AxiosHeaders({
          Authorization: `Bearer token`,
          "Content-Type": "multipart/form-data",
        })
      );

      setFormSuccess(true);
    } catch (error) {
      toast.error("something went wrong, please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (formSuccess) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden md:block md:w-1/3 lg:w-1/4 bg-[#192953] text-white relative">
          <div className="absolute inset-0">
            <Image
              src={sidebgimage}
              alt="Background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-gray-600">
                Thank you for registering with us. You can now access all our
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-['libre-baskerville']">
      {/* Left Panel with Background Image */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 bg-[#192953] text-white relative">
        <div className="absolute inset-0">
          <Image
            src={sidebgimage}
            alt="Background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Title with proper styling and spacing */}
          <h1 className="text-3xl font-bold mb-6 text-white">Why Join Us?</h1>

          {/* Bullet points with proper styling */}
          <ul className="space-y-8">
            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  Get customer requests instantly!
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Sign up today and start receiving job opportunities without
                  delay.
                </p>
              </div>
            </li>

            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  Too busy?
                  <br />
                  Let the customers find you!
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Create your price list and let new clients reach out to you
                  directly.
                </p>
              </div>
            </li>

            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  Expand your reach to over 50,000 monthly visitors!
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Tap into a massive network and grow your business with ease.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto md:p-8">
          {/* Progress Tabs */}
          <div className="mb-8">
            <div className="flex mb-2">
              <div className="flex-1">
                <button
                  onClick={() => currentTab === 2 && handleBack()}
                  className={`w-full text-left pb-2 border-b-2 flex items-center ${
                    currentTab === 1
                      ? "border-[#25B4DE] text-blue-600 font-medium"
                      : "border-gray-200 text-gray-500"
                  }`}
                  disabled={currentTab === 1}
                >
                  <div
                    className={`mr-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      currentTab === 1
                        ? "bg-[#25B4DE] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-bold">Account Details</span>
                </button>
              </div>

              <div className="flex-1 ml-4">
                <button
                  className={`w-full text-left pb-2 border-b-2 flex items-center ${
                    currentTab === 2
                      ? "border-[#25B4DE] text-blue-600 font-medium"
                      : "border-gray-200 text-gray-500"
                  }`}
                  disabled={true}
                >
                  <div
                    className={`mr-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      currentTab === 2
                        ? "bg-[#25B4DE] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    2
                  </div>
                  <span>Address & Services</span>
                </button>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Tab 1: Account Details */}
            {currentTab === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block text-xl text-bold font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border ${
                          validFirstName === false
                            ? "border-red-500"
                            : validFirstName === true
                            ? "border-green-500"
                            : "border-gray-300"
                        } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                        required
                      />
                      {validFirstName !== null && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {validFirstName ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {validFirstName === false && (
                      <p className="mt-1 text-sm text-red-500">
                        First name is required
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="sur_name"
                      className="block text-xl text-bold font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="sur_name"
                        name="sur_name"
                        placeholder="Enter Last Name"
                        value={formData.sur_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border rounded-full ${
                          validsur_name === false
                            ? "border-red-500"
                            : validsur_name === true
                            ? "border-green-500"
                            : "border-gray-300"
                        } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                        required
                      />
                      {validsur_name !== null && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {validsur_name ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {validsur_name === false && (
                      <p className="mt-1 text-sm text-red-500">
                        Last name is required
                      </p>
                    )}
                  </div>
                </div>

               
                <div>
                  <label
                    htmlFor="email"
                    className="blocktext-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    CVR
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="CVR"
                      name="CVR"
                      placeholder="Enter CVR"
                      value={formData.CVR}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border ${
                        validCVR === true
                          ? "border-green-500"
                          : validCVR === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                    {validCVR !== null && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validCVR ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {validCVR === false && (
                    <p className="mt-1 text-sm text-red-500">
                      Please enter a valid CVR
                    </p>
                  )}
                </div>

               
                <div>
                  <label
                    htmlFor="email"
                    className="blocktext-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border ${
                        validEmail === true
                          ? "border-green-500"
                          : validEmail === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                    {validEmail !== null && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validEmail ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {validEmail === false && (
                    <p className="mt-1 text-sm text-red-500">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border ${
                        validPhone === true
                          ? "border-green-500"
                          : validPhone === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                    {validPhone !== null && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validPhone ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {validPhone === false && (
                    <p className="mt-1 text-sm text-red-500">
                      Please enter a valid phone number
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${
                        validPassword === true
                          ? "border-green-500"
                          : validPassword === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <HiddenIcon className="w-5 h-5" />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="mt-3 bg-gray-50 p-3">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <AlertTriangle
                          size={16}
                          className="mr-2 text-amber-500"
                        />
                        Password Requirements
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center text-sm">
                          {passwordRequirements.minLength ? (
                            <CheckCircle2
                              size={14}
                              className="text-green-500 mr-2 flex-shrink-0"
                            />
                          ) : (
                            <XCircle
                              size={14}
                              className="text-gray-400 mr-2 flex-shrink-0"
                            />
                          )}
                          <span
                            className={
                              passwordRequirements.minLength
                                ? "text-green-700"
                                : "text-gray-600"
                            }
                          >
                            At least 8 characters
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          {passwordRequirements.hasUppercase ? (
                            <CheckCircle2
                              size={14}
                              className="text-green-500 mr-2 flex-shrink-0"
                            />
                          ) : (
                            <XCircle
                              size={14}
                              className="text-gray-400 mr-2 flex-shrink-0"
                            />
                          )}
                          <span
                            className={
                              passwordRequirements.hasUppercase
                                ? "text-green-700"
                                : "text-gray-600"
                            }
                          >
                            At least one uppercase letter
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          {passwordRequirements.hasNumber ? (
                            <CheckCircle2
                              size={14}
                              className="text-green-500 mr-2 flex-shrink-0"
                            />
                          ) : (
                            <XCircle
                              size={14}
                              className="text-gray-400 mr-2 flex-shrink-0"
                            />
                          )}
                          <span
                            className={
                              passwordRequirements.hasNumber
                                ? "text-green-700"
                                : "text-gray-600"
                            }
                          >
                            At least one number
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          {passwordRequirements.hasSpecial ? (
                            <CheckCircle2
                              size={14}
                              className="text-green-500 mr-2 flex-shrink-0"
                            />
                          ) : (
                            <XCircle
                              size={14}
                              className="text-gray-400 mr-2 flex-shrink-0"
                            />
                          )}
                          <span
                            className={
                              passwordRequirements.hasSpecial
                                ? "text-green-700"
                                : "text-gray-600"
                            }
                          >
                            At least one special character
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showpassword_confirmation ? "text" : "password"}
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="Confirm your password"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border ${
                        passwordMatch === true
                          ? "border-green-500"
                          : passwordMatch === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setShowpassword_confirmation(!showpassword_confirmation)
                      }
                    >
                      {showpassword_confirmation ? (
                        <HiddenIcon className="w-5 h-5" />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {passwordMatch === false && (
                    <p className="mt-1 text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedToNextTab()}
                    className={` py-3 px-9 flex items-center justify-center rounded-lg text-white font-medium ${
                      canProceedToNextTab()
                        ? "bg-[#192953] hover:bg-[#0f1b36]"
                        : "bg-gray-300 cursor-not-allowed"
                    } transition-colors`}
                  >
                    Next <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Address & Services */}
            {currentTab === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      placeholder="Enter Postal Code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter City Name"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Service Categories
                  </h3>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-1">
                    <div className="grid grid-cols-1 gap-2">
                      <div
                        className={`p-3 rounded-2xl flex items-center ${
                          formData.services.privateMeeting
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="privateMeeting"
                          name="privateMeeting"
                          checked={formData.services.privateMeeting}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="privateMeeting"
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                        >
                          Private Meeting
                        </label>
                      </div>

                      <div
                        className={`p-3 rounded-2xl flex items-center ${
                          formData.services.customerRetention
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="customerRetention"
                          name="customerRetention"
                          checked={formData.services.customerRetention}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="customerRetention"
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                        >
                          Customer Retention
                        </label>
                      </div>

                      <div
                        className={`p-3 rounded-2xl flex items-center ${
                          formData.services.businessConsultation
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="businessConsultation"
                          name="businessConsultation"
                          checked={formData.services.businessConsultation}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="businessConsultation"
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                        >
                          Business consultation (premium-style goods)
                        </label>
                      </div>

                      <div
                        className={`p-3 rounded-2xl flex items-center ${
                          formData.services.storage
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="storage"
                          name="storage"
                          checked={formData.services.storage}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="storage"
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                        >
                          Storage
                        </label>
                      </div>

                      <div
                        className={`p-3 rounded-2xl flex items-center ${
                          formData.services.misc
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="misc"
                          name="misc"
                          checked={formData.services.misc}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="misc"
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                        >
                          Misc
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full sm:w-auto px-5 py-4 border border-gray-300 rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || !canSubmitForm()}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-white font-medium flex items-center justify-center min-w-32 ${
                      canSubmitForm() && !isLoading
                        ? "bg-[#192953] hover:bg-[#0f1b36]"
                        : "bg-gray-300 cursor-not-allowed"
                    } transition-colors`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationForm;
