import React, { FC, useState } from 'react';
import { Eye } from 'lucide-react';
import HiddenIcon from '../../../public/aye';

interface CreatePasswordModalProps {
    onClose: () => void;
    onSave: (password: string) => void;
}

export const CreatePasswordModal: FC<CreatePasswordModalProps> = ({
    onClose,
    onSave,
}) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isMatch = password.length > 0 && password === confirm;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl p-8 shadow-lg w-full max-w-xl">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold mb-6">Create new password</h2>

                {/* Inputs */}
                <div className="space-y-5 mb-6">
                    {/* New Password */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full bg-gray-100 placeholder-gray-400 text-gray-900 rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                {showPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    // your custom “eye” icon for hidden state
                                    <HiddenIcon width={18} height={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full bg-gray-100 placeholder-gray-400 text-gray-900 rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="absolute inset-y-0 right-3 flex items-center"
                            >
                                {showConfirm ? (
                                    <Eye size={18} />
                                ) : (
                                    <HiddenIcon width={18} height={18} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save */}
                <button
                    onClick={() => onSave(password)}
                    disabled={!isMatch}
                    className={`
            w-full py-3 rounded-lg font-medium text-white
            ${isMatch ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 opacity-50 cursor-not-allowed'}
          `}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
