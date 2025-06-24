"use client";

import { postData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";


export default function PaymentRequests({ token }: { token: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false); 
  const [message, setMessage] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const t = useTranslations("PaymentRequests");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setMessage("");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setMessage("");
      } else {
        setMessage(t("selectImageFile"));
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage(t("selectFileToUpload"));
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      await postData(
        "company/payment-request",
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
        })
      );

      setMessage(t("success"));
      setFile(null);
      const form = e.target as HTMLFormElement;
      form.reset();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setMessage(t("error", { error: errorMsg }));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return t("fileSize", { size: 0, unit: t("bytes") });
    const k = 1024;
    const sizes = [t("bytes"), t("kb"), t("mb"), t("gb")];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return t("fileSize", {
      size: parseFloat((bytes / Math.pow(k, i)).toFixed(2)),
      unit: sizes[i],
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Upload className="w-7 h-7" />
            {t("header")}
          </h2>
          <p className="text-blue-100 mt-2 text-sm">{t("subheader")}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : file
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />

              {!file ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload
                      className={`w-12 h-12 ${
                        dragActive ? "text-blue-500" : "text-gray-400"
                      } transition-colors`}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {dragActive ? t("dropHere") : t("chooseOrDrag")}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("supports")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <FileText className="w-12 h-12 text-green-500" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* File Preview */}
            {file && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm truncate max-w-48">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                  disabled={uploading}
                >
                  <X className="w-4 h-4 text-red-600" />
                  <span className="sr-only">{t("removeFile")}</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("uploading")}
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  {t("uploadBtn")}
                </>
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                message.includes("successfully")
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              } animate-in fade-in slide-in-from-top-2 duration-300`}
            >
              {message.includes("successfully") ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
