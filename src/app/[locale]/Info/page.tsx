"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axios, { AxiosHeaders } from "axios";
import { postData } from "@/libs/axios/server";
import PhoneInput from "react-phone-number-input";
import type { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const MovingInfoPage = () => {
  const t = useTranslations("infoWebsite");
  const locale = useLocale();
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
    phone: undefined as Value | undefined,
  });

  // Get the tab from URL or default to "about"
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabFromUrl && ["about", "terms", "privacy", "contact"].includes(tabFromUrl)
      ? tabFromUrl
      : "about"
  );

  // Update the URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Update URL without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };

  // Listen for URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["about", "terms", "privacy", "contact"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const isRTL = locale === "ar";

  const TABS = [
    {
      key: "about",
      label: t("tabs.about"),
      content: t.raw("content.about"),
    },
    {
      key: "terms",
      label: t("tabs.terms"),
      content: t.raw("content.terms"),
    },
    {
      key: "privacy",
      label: t("tabs.privacy"),
      content: t.raw("content.privacy"),
    },
    {
      key: "contact",
      label: t("tabs.contact"),
      content: null, // we'll render form manually
    },
  ];

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData(
        "contact",
        contactData,
        new AxiosHeaders({
          "Content-Type": "multipart/form-data",
        })
      );

      toast.success(t("message_sent_successfully"));
      setContactData({
        name: "",
        email: "",
        message: "",
        phone: undefined as Value | undefined,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <header className="relative w-full h-[250px] sm:h-[200px] md:h-[260px] bg-gradient-to-r from-[#0F1A36] to-[#192953] flex items-center justify-center text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold z-10">
          {t("title")}
        </h1>
      </header>

      {/* Tabs */}
      <nav className="w-full max-w-3xl mx-auto -mt-12 z-10 px-4">
        <div className="flex flex-wrap justify-center gap-3 bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-base sm:text-lg transition-all duration-200 font-medium ${
                activeTab === tab.key
                  ? "bg-[#192953] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div
          className={`bg-white rounded-2xl shadow p-6 sm:p-8 text-[16px] sm:text-[18px] leading-8 whitespace-pre-wrap text-gray-800 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {activeTab === "contact" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-1">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-semibold mb-1">
                  {t("form.phone")}
                </label>
                <PhoneInput
                  international
                  defaultCountry="DK"
                  value={contactData.phone}
                  onChange={(value) => {
                    setContactData({ ...contactData, phone: value });
                  }}
                  className="w-full"
                  id="loginPhone"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-semibold mb-1">
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-[#192953] text-white px-6 py-2 rounded-md hover:bg-[#0f1a36]"
              >
                {t("form.submit")}
              </button>
            </form>
          ) : (
            TABS.find((tab) => tab.key === activeTab)?.content
          )}
        </div>
      </main>
    </div>
  );
};

export default MovingInfoPage;
