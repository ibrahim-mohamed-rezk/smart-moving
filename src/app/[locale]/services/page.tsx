"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const MovingInfoPage = () => {
    const t = useTranslations("infoWebsite");
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState("about");

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
            content: t.raw("content.contact"),
        },
    ];

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
                          onClick={() => setActiveTab(tab.key)}
                          className={`px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-base sm:text-lg transition-all duration-200 font-medium ${activeTab === tab.key
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
                  className={`bg-white rounded-2xl shadow p-6 sm:p-8 text-[16px] sm:text-[18px] leading-8 whitespace-pre-wrap text-gray-800 ${isRTL ? "text-right" : "text-left"
                      }`}
              >
                  {TABS.find((tab) => tab.key === activeTab)?.content}
              </div>
          </main>
    </div>
  );
};

export default MovingInfoPage;
