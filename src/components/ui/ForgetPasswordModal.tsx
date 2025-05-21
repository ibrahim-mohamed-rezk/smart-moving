// components/ForgetPasswordModal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface ForgetPasswordModalProps {
  onClose: () => void;
}

const ForgetPasswordModal: FC<ForgetPasswordModalProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState<Value>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("auth");

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to send OTP
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the OTP
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#192953] mb-2">
          {t("Forget password")}
        </h2>

        {step === "phone" ? (
          <>
            <p className="text-sm text-gray-600 mb-6">
              {t("Please enter your phone number to receive verification code")}
            </p>

            {/* Phone Form */}
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
              <label className="text-sm font-medium text-[#192953]">
                {t("Phone Number")}
              </label>
              <PhoneInput
                international
                defaultCountry="DK"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-full"
              />

              <button
                type="submit"
                className="mt-4 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3 w-full"
              >
                {t("Send Code")}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">
              {t("Please enter the verification code sent to your phone")}
            </p>

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              <label className="text-sm font-medium text-[#192953]">
                {t("Verification Code")}
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    name={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center bg-gray-100 placeholder-gray-400 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="-"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="mt-4 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3 w-full"
              >
                {t("Verify")}
              </button>
            </form>
          </>
        )}

        {/* Decorative corner image */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-50 -z-10">
          <Image src={"/image0.png"} alt="" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
