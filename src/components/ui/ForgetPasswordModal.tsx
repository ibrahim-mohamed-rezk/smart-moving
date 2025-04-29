// components/ForgetPasswordModal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ForgetPasswordModalProps {
  onClose: () => void;
  onVerify: (email: string) => void;
}

const ForgetPasswordModal: FC<ForgetPasswordModalProps> = ({
  onClose,
  onVerify,
}) => {
  const [email, setEmail] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(email);
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
          Forget password
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your email to send the verification code
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-medium text-[#192953]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email Address"
            className="bg-gray-100 placeholder-gray-400 text-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          <button
            type="submit"
            className="mt-4 bg-[#192953] hover:bg-[#14203d] transition-colors text-white font-semibold rounded-full py-3 w-full"
          >
            Verify
          </button>
        </form>

        {/* Decorative corner image */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-50 -z-10">
          <Image src={"/image0.png"} alt="" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;
