// AuthModal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Eye, X } from "lucide-react";
import HiddenIcon from "../../../public/aye";
import Image from "next/image";
import { postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { countryTypes } from "@/libs/types/types";
import { useParams } from "next/navigation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { app } from "@/libs/firebase/config";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface AuthModalProps {
  type: "login" | "register";
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ type, onClose }) => {
  const t = useTranslations("auth");
  const [modalType, setModalType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [countries, setCountries] = useState<countryTypes[]>([]);
  const [openOTP, setOpenOTP] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const params = useParams();
  const [phone, setPhone] = useState<Value>();
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [registerformData, setRegisterFormData] = useState({
    first_name: "",
    sur_name: "",
    email: "",
    phone: phone,
    password: "",
    password_confirmation: "",
    country_code: "+45",
    postal_code: "",
  });
  console.log(countries);
  // Update the registerFormData when phone changes
  useEffect(() => {
    if (phone) {
      setRegisterFormData((prevData) => ({
        ...prevData,
        phone,
      }));
    }
  }, [phone]);

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

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSwitchType = () =>
    setModalType((prev) => (prev === "login" ? "register" : "login"));

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Auto focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "login") {
      try {
        const response = await postData(
          "customer/login-api",
          formData,
          new AxiosHeaders({
            "Content-Type": "application/json",
            lang: params?.locale as string,
          })
        );

        await axios.post("/api/auth/login", {
          token: response.token,
          user: JSON.stringify(response.data),
          remember: true,
        });

        toast.success("Login successful");
        setFormData({
          login: "",
          password: "",
        });
        onClose();
        window.location.href = "/";
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.msg || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
        throw error;
      }
    } else if (modalType === "register") {
      try {
        await postData(
          "customer/register-api",
          registerformData,
          new AxiosHeaders({
            "Content-Type": "application/json",
            lang: params?.locale as string,
          })
        );

        sendOTP();

        toast.success("account created successfully");
        setOpenOTP(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.msg || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
        throw error;
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    validateOTP();
    e.preventDefault();
    const otpCode = otpDigits.join("");

    if (otpCode.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }

    try {
      const response = await postData(
        "customer/verify-code-register",
        { status: true, phone: registerformData.phone },
        new AxiosHeaders({
          "Content-Type": "application/json",
          lang: params?.locale as string,
        })
      );

      toast.success("OTP verified successfully");

      await axios.post("/api/auth/login", {
        token: response.token,
        user: JSON.stringify(response.data),
        remember: true,
      });
      setOpenOTP(false);
      onClose();
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Invalid OTP");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const auth = getAuth(app);

  const handleGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      // Call your API with the token
      const response = await postData(
        "customer/login/google",
        {
          device_token: accessToken,
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        new AxiosHeaders({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        })
      );

      toast.success("Google login successful");

      // Handle successful login
      await axios.post("/api/auth/login", {
        token: response.data.token,
        user: JSON.stringify(response.data.data),
        remember: true,
      });

      onClose();
      window.location.href = "/";
    } catch (error) {
      // Handle Errors here.
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        const errorMessage = (error as Error).message;
        toast.error("Google authentication failed: " + errorMessage);
      }
      console.error("Google auth error:", error);
    }
  };

  // ////////////////////////////////
  // firebase for verify phone

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA solved", response);
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  };

  const sendOTP = async (): Promise<void> => {
    if (!registerformData.phone) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setupRecaptcha();

      // Format phone number to include "+" if it doesn't already
      const formattedPhone = registerformData.phone.startsWith("+")
        ? registerformData.phone
        : `+${registerformData.phone}`;

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
      setOpenOTP(true);
      toast.success("Verification code sent to your phone");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Try again."
      );
    }
  };

  // Validate OTP
  const validateOTP = async () => {
    try {
      if (!window.confirmationResult) {
        throw new Error(
          "Verification session expired. Please request a new code."
        );
      }

      const result = await window.confirmationResult.confirm(
        otpDigits.join("")
      );
      if (result.user) {
        toast.success("Phone number verified successfully!");
        setFormData((prev) => ({
          ...prev,
          verified_phone: true,
        }));
      }
    } catch (error) {
      console.error("Error verifying code:", error);

      toast.error("Failed to verify code");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-xl p-8 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {openOTP ? (
          <>
            <h2 className="text-lg font-semibold mb-6 text-center text-[#192953]">
              {t("Verify Your Account")}
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {t("Please enter the verification code sent to your email/phone")}
            </p>
            <form className="flex flex-col gap-4">
              <div className="flex justify-center gap-4 my-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otpDigits[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                      otpInputRefs.current[index] = el;
                    }}
                    className="w-14 h-14 text-center text-xl font-bold bg-gray-100 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>
              <button
                type="submit"
                onClick={handleVerifyOTP}
                className="mt-2 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3"
              >
                Verify
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Title */}
            <h2 className="text-lg font-semibold mb-6 text-center text-[#192953]">
              {t("Please login first to request a moving")}
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-4">
              {modalType === "register" && (
                <>
                  <input
                    type="text"
                    placeholder={t("First Name")}
                    value={registerformData.first_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRegisterFormData({
                        ...registerformData,
                        first_name: e.target.value,
                      });
                    }}
                    className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={t("Second Name")}
                    value={registerformData.sur_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRegisterFormData({
                        ...registerformData,
                        sur_name: e.target.value,
                      });
                    }}
                    className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              {/* Email */}
              <input
                type="email"
                placeholder={t("Enter Email Address or Phone Number")}
                value={
                  modalType === "login"
                    ? formData.login
                    : registerformData.email
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (modalType === "login") {
                    setFormData({ ...formData, login: e.target.value });
                  } else {
                    setRegisterFormData({
                      ...registerformData,
                      email: e.target.value,
                    });
                  }
                }}
                className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {modalType === "register" && (
                <div>
                  <div className="relative">
                    <div className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <PhoneInput
                        international
                        defaultCountry="DK"
                        value={phone}
                        onChange={setPhone}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password with toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("Enter Password")}
                  value={
                    modalType === "login"
                      ? formData.password
                      : registerformData.password
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (modalType === "login") {
                      setFormData({ ...formData, password: e.target.value });
                    } else {
                      setRegisterFormData({
                        ...registerformData,
                        password: e.target.value,
                      });
                    }
                  }}
                  className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <HiddenIcon className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Forget password link (login only) */}
              {modalType === "login" ? (
                <div className="text-right">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    {t("Forget Password?")}
                  </a>
                </div>
              ) : (
                <>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("Confirm Password")}
                    value={registerformData.password_confirmation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRegisterFormData({
                        ...registerformData,
                        password_confirmation: e.target.value,
                      });
                    }}
                    className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              {modalType === "register" && (
                <input
                  type="text"
                  placeholder={t("Postal Code")}
                  value={registerformData.postal_code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRegisterFormData({
                      ...registerformData,
                      postal_code: e.target.value,
                    });
                  }}
                  className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* google auth */}
              <div className="flex items-center justify-center">
                <button
                  onClick={handleGoogleAuth}
                  className="flex items-center justify-center p-2 transition-colors rounded-full shadow-[5px_5px_15px_0px_rgba(74,74,74,0.15)] "
                >
                  <svg
                    viewBox="-3 0 262 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    fill="#000000"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        fill="#EB4335"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={handelSubmit}
                className="mt-2 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3"
              >
                {modalType === "login" ? t("login") : t("Signup")}
              </button>
            </form>

            {/* Switch link */}
            <div className="text-center text-sm text-gray-500 mt-4">
              {modalType === "login" ? (
                <>
                  {t("Don't have an account yet?")}
                  <span
                    onClick={handleSwitchType}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {t("Signup")}
                  </span>
                </>
              ) : (
                <>
                  {t("Already have an account?")}
                  <span
                    onClick={handleSwitchType}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {t("login")}
                  </span>
                </>
              )}
            </div>
          </>
        )}

        {/* Corner background image */}
        <div
          className={`
            absolute 
            bottom-0 left-0  
            w-1/2 h-1/2 
            opacity-50 
            -z-10
          `}
        >
          <Image
            src={"/image0.png"}
            alt="Background decoration"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
