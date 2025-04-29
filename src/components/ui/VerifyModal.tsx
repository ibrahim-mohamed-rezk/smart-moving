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
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // Start the 60s countdown on mount
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
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
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-sm">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-2">Verify Your Account</h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Enter the 4-digit code sent to your email
                </p>

                <div className="flex justify-between  mb-4">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            ref={el => {
                                inputsRef.current[idx] = el;
                            }} onChange={e => handleChange(e, idx)}
                            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    ))}
                </div>

                <div className="text-gray-600 text-sm mb-4">
                    Code expires in:{' '}
                    <span className="font-medium">{formatTime(timeLeft)}</span>
                </div>

                <div className="text-sm mb-6">
                    Didn’t receive code?{' '}
                    <button
                        onClick={onResend}
                        disabled={timeLeft > 0}
                        className="text-blue-600 hover:underline disabled:opacity-50"
                    >
                        Resend Code
                    </button>
                </div>

                <button
                    onClick={() => onVerify(code.join(''))}
                    disabled={code.some(d => d === '')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium disabled:opacity-50"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};
