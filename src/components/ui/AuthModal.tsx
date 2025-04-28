// AuthModal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Eye, X } from "lucide-react";
import HiddenIcon from '../../../public/aye';
import Image from "next/image";
import image0 from "../../../public/image0.png";

interface AuthModalProps {
    type: "login" | "register";
    onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ type, onClose }) => {
    const [modalType, setModalType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

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
                    Please{" "}
                    {modalType === "login"
                        ? "login first to request a moving"
                        : "register moving company"}
                </h2>

                {/* Form */}
                <form className="flex flex-col gap-4">
                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Password with toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
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
                    {modalType === "login" && (
                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forget Password?
                            </a>
                        </div>
                    )}

                    {/* Company name (register only) */}
                    {modalType === "register" && (
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-2 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3"
                    >
                        {modalType === "login" ? "Login" : "Register"}
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
                        src={image0}
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
