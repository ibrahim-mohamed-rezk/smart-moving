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

interface AuthModalProps {
  type: "login" | "register";
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ type, onClose }) => {
  const [modalType, setModalType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [countries, setCountries] = useState<countryTypes[]>([]);
  const params = useParams();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [registerformData, setRegisterFormData] = useState({
    first_name: "",
    sur_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    country_code: "+45",
  });

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
        const response = await postData(
          "customer/register-api",
          registerformData,
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

        toast.success("account created successfully");
        setRegisterFormData({
          email: "",
          password: "",
          password_confirmation: "",
          first_name: "",
          sur_name: "",
          phone: "",
          country_code: "+45",
        });
        onClose();
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
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

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6 text-center text-[#192953]">
          Please login first to request a moving
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {modalType === "register" && (
            <>
              <input
                type="text"
                placeholder="First Name"
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
                placeholder="Second Name"
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
            placeholder="Enter Email Address"
            value={
              modalType === "login" ? formData.login : registerformData.email
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
                  <select
                    className=" outline-none focus:border-transparent transition-all px-4 py-2 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
                    value={registerformData.country_code}
                    onChange={(e) =>
                      setRegisterFormData({
                        ...registerformData,
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
                    placeholder={`enter phone number`}
                    value={registerformData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRegisterFormData({
                        ...registerformData,
                        phone: e.target.value,
                      });
                    }}
                    required
                    className=" p-2 outline-none h-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
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
                Forget Password?
              </a>
            </div>
          ) : (
            <>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
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

          {/* Submit */}
          <button
            type="submit"
            onClick={handelSubmit}
            className="mt-2 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3"
          >
            {modalType === "login" ? "Login" : "Signup"}
          </button>
        </form>

        {/* Switch link */}
        <div className="text-center text-sm text-gray-500 mt-4">
          {modalType === "login" ? (
            <>
              Don’t have an account yet?{" "}
              <span
                onClick={handleSwitchType}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={handleSwitchType}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </div>

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
