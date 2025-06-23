import { useTranslations } from 'next-intl';
import React, { FC, useState, useEffect, useRef } from 'react';

interface VerifyModalProps {
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
}

export const VerifyModal: FC<VerifyModalProps> = ({
  onClose,
  onVerify,
  onResend,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const t = useTranslations("VerifyModal");
  // Start the 60s countdown on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress bar percentage
  const progress = (timeLeft / 60) * 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const next = [...code];
    next[idx] = val;
    setCode(next);

    // auto-focus next
    if (val && idx < 3) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 w-full max-w-sm transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">
          {t("title", { defaultMessage: "Verify Your Account" })}
        </h2>
        <p className="text-gray-500 mb-6 text-sm text-center">
          {t("subtitle", {
            defaultMessage: "Enter the 4-digit code sent to your email",
          })}
        </p>

        <div className="flex justify-between mb-4 gap-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              onChange={(e) => handleChange(e, idx)}
              className="w-14 h-14 bg-gray-50 border border-gray-300 rounded-lg text-center text-2xl font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          ))}
        </div>

        {/* Progress bar for timer */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-gray-600 text-sm mb-4 text-center">
          {t("expires_in", { defaultMessage: "Code expires in:" })}{" "}
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>

        <div className="text-sm mb-6 text-center">
          {t("no_code", { defaultMessage: "Didn't receive code?" })}{" "}
          <button
            onClick={onResend}
            disabled={timeLeft > 0}
            className={`ml-1 font-semibold transition-colors px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              timeLeft > 0
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {t("resend", { defaultMessage: "Resend Code" })}
          </button>
        </div>

        <button
          onClick={() => onVerify(code.join(""))}
          disabled={code.some((d) => d === "")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:bg-blue-700 transition-colors"
        >
          {t("verify", { defaultMessage: "Verify" })}
        </button>
      </div>
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};
