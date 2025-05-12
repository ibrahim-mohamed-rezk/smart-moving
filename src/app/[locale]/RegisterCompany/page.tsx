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
import { getData, postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import { useParams } from "next/navigation";
import {
  countryTypes,
  registrationFormData,
  ServiceTypes,
} from "@/libs/types/types";
import { useTranslations } from "next-intl";

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const AccountCreationForm = () => {
  const t = useTranslations("company");

  const [currentTab, setCurrentTab] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ locale: string }>();

  // Form validation states
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validCVR, setValidCVR] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [validPhone, setValidPhone] = useState<boolean | null>(null);
  const [validFirst_name, setValidFirst_name] = useState<boolean | null>(null);
  const [validsur_name, setValidsur_name] = useState<boolean | null>(null);
  const [services, setservices] = useState<ServiceTypes[]>([]);
  const [showCVR, setShowCVR] = useState<boolean>(false);
  const [countries, setCountries] = useState<countryTypes[]>([]);

  const [formData, setFormData] = useState<registrationFormData>({
    first_name: "",
    sur_name: "",
    CVR: "",
    email: "",
    phone: "",
    country_code: "+45",
    password: "",
    password_confirmation: "",
    address: "",
    postal_code: "",
    contact_person: "",
    city: "",
    services: [],
  });

  // Password requirements validation
  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirements>({
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    });

  // get services
  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          "services",
          {},
          new AxiosHeaders({
            lang: params?.locale,
          })
        );
        setservices(response.data);
      } catch (error) {
        throw error;
      }
    };

    feachData();
  }, [params]);

  // get countries
  useEffect(() => {
    const feachCountries = async () => {
      try {
        const response = await axios.get("/api/countries", {
          headers: {
            lang: params?.locale,
          },
        });
        setCountries(response.data);
      } catch (error) {
        throw error;
      }
    };

    feachCountries();
  }, [params]);

  // Validate name fields
  useEffect(() => {
    if (formData.first_name) {
      setValidFirst_name(formData.first_name.trim() !== "");
    } else {
      setValidFirst_name(null);
    }
  }, [formData.first_name]);

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
      // CVR is optional, so empty value is valid
      setValidCVR(true);
    }
  }, [formData.CVR]);

  // Validate phone format
  useEffect(() => {
    if (formData.phone) {
      // Validate phone number (only digits, between 8-15 characters)
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const phoneRegex = /^\d{8,15}$/;
      setValidPhone(phoneRegex.test(phoneDigits));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        services: checked
          ? [...formData.services, parseInt(name)]
          : formData.services.filter((id) => id !== parseInt(name)),
      });
    } else if (name === "phone") {
      setFormData({
        ...formData,
        phone: value,
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
      first_name,
      sur_name,
      email,
      phone,
      password,
      password_confirmation,
    } = formData;

    return (
      first_name.trim() !== "" &&
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitForm()) return;

    setIsLoading(true);

    try {
      const response = await postData(
        "company/register-api",
        formData,
        new AxiosHeaders({
          "Content-Type": "application/json",
          lang: params?.locale as string,
        })
      );

      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: response.token,
          user: JSON.stringify(response.data),
        }),
      });

      toast.success(t("company_registered_successfully"));
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-['libre-baskerville']">
      {/* Left Panel with Background Image */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 bg-[#192953] text-white relative">
        <div className="absolute inset-0">
          <Image
            src={sidebgimage}
            alt={t("background")}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Title with proper styling and spacing */}
          <h1 className="text-3xl font-bold mb-6 text-white">
            {t("why_join_us")}
          </h1>

          {/* Bullet points with proper styling */}
          <ul className="space-y-8">
            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  {t("get_customer_requests")}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {t("sign_up_today")}
                </p>
              </div>
            </li>

            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  {t("too_busy")}
                  <br />
                  {t("let_customers_find_you")}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {t("create_price_list")}
                </p>
              </div>
            </li>

            <li className="flex">
              <div className="text-white mr-3 text-lg font-bold">•</div>
              <div>
                <p className="text-white font-medium text-lg">
                  {t("expand_reach")}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {t("tap_into_network")}
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
                  <span className="text-bold">{t("account_details")}</span>
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
                  <span>{t("address_and_services")}</span>
                </button>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {t("create_your_account")}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Tab 1: Account Details */}
            {currentTab === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label
                      htmlFor="first_name"
                      className="block text-xl text-bold font-medium text-gray-700 mb-1"
                    >
                      {t("first_name")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder={t("enter_first_name")}
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border ${
                          validFirst_name === false
                            ? "border-red-500"
                            : validFirst_name === true
                            ? "border-green-500"
                            : "border-gray-300"
                        } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                        required
                      />
                      {validFirst_name !== null && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {validFirst_name ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {validFirst_name === false && (
                      <p className="mt-1 text-sm text-red-500">
                        {t("first_name_required")}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="sur_name"
                      className="block text-xl text-bold font-medium text-gray-700 mb-1"
                    >
                      {t("last_name")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="sur_name"
                        name="sur_name"
                        placeholder={t("enter_last_name")}
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
                        {t("last_name_required")}
                      </p>
                    )}
                  </div>
                </div>

                {/* CVR */}
                <div>
                  <button
                    onClick={() => setShowCVR((prev) => !prev)}
                    className="blocktext-xl text-bold rounded-full bg-gray-500 py-2 px-4 font-medium text-white mb-1"
                  >
                    {showCVR ? t("hidecvr") : t("showcvr")}
                  </button>
                </div>

                {showCVR && (
                  <div>
                    <label
                      htmlFor="email"
                      className="blocktext-xl text-bold font-medium text-gray-700 mb-1"
                    >
                      {t("cvr")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="CVR"
                        name="CVR"
                        placeholder={t("enter_cvr")}
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
                        {t("enter_valid_cvr")}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="blocktext-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    {t("email")}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("enter_email")}
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
                      {t("enter_valid_email")}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact_person"
                    className="blocktext-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    {t("contact_person")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="contact_person"
                      name="contact_person"
                      placeholder={t("enter_contact_person")}
                      value={formData.contact_person}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    {t("phone_number")}
                  </label>
                  <div className="relative">
                    <div
                      className={`w-full border ${
                        validPhone === true
                          ? "border-green-500"
                          : validPhone === false
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    >
                      <select
                        className=" outline-none focus:border-transparent transition-all px-4 py-4 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
                        value={formData.country_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            country_code: e.target.value,
                          })
                        }
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.phone}>
                            {`${country.name} ${country.phone}`}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder={t("enter_phone_number")}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`border-s-2 ${
                          validPhone === true
                            ? "border-s-green-500"
                            : validPhone === false
                            ? "border-s-red-500"
                            : "border-s-gray-300"
                        } outline-none px-4 py-4`}
                      />
                    </div>
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
                      {t("enter_valid_phone")}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xl text-bold font-medium text-gray-700 mb-1"
                  >
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder={t("create_strong_password")}
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
                        {t("password_requirements")}
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
                            {t("min_length_req")}
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
                            {t("uppercase_req")}
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
                            {t("number_req")}
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
                            {t("special_char_req")}
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
                    {t("confirm_password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showpassword_confirmation ? "text" : "password"}
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder={t("confirm_your_password")}
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
                      {t("passwords_not_match")}
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
                    {t("next")} <ChevronRight size={18} className="ml-1" />
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
                    {t("address")}
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder={t("enter_your_full_address")}
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
                      {t("postal_code")}
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      placeholder={t("enter_postal_code")}
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
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder={t("enter_city_name")}
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {t("service_categories")}
                  </h3>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-1">
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className={`p-3 rounded-2xl flex items-center ${
                            formData.services.includes(service.id)
                              ? "bg-blue-50 border border-blue-200"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={service.id + ""}
                            name={service.id + ""}
                            checked={formData.services.includes(service.id)}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={service.id + ""}
                            className="ml-3 text-sm font-medium text-gray-700 cursor-pointer w-full"
                          >
                            {service.title}
                          </label>
                        </div>
                      ))}
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
                    {t("back")}
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
                        {t("processing")}
                      </>
                    ) : (
                      t("create_account")
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
