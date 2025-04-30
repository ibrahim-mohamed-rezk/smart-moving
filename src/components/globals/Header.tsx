"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Check, Menu, X } from "lucide-react";
import Image from "next/image";
import AuthModal from "../ui/AuthModal";
import { navigatons } from "@/libs/data/data";

const flagMap: Record<string, string> = {
  en: "gb",
  ar: "sa",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<
    "login" | "register" | null
  >(null);
  const t = useTranslations("header");

  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (l: string) => {
    router.replace(pathname, { locale: l });
    setLangOpen(false);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      <header className="bg-gradient-to-r w-full max-w-full bg-[#192953] sticky top-0 z-50 shadow-md">
        <div className="px-[10px] w-full sm:px-[clamp(0px,4.167vw,580px)] mx-auto">
          <div className="flex w-full items-center justify-between py-[clamp(5px,0.417vw,20px)] ">
            {/* Left side: Logo and Language */}
            <div className="flex w-full items-center gap-6">
              <Link
                href="/"
                className="flex items-center w-[clamp(70px,11.458vw,520px)] "
              >
                <Image
                  src={"/logo.png"}
                  alt="MySite Logo"
                  width={130}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </Link>

              {/* Right side: Desktop nav */}
              <nav className="hidden ms-[clamp(20px,5.0vw,596px)] md:flex items-center gap-6">
                {navigatons.map((nav) => (
                  <Link
                    href={nav.href}
                    locale={locale}
                    className="text-white hover:text-blue-400 font-[400] font-['Libre_Baskerville'] leading-[100%] text-[clamp(12px,0.938vw,30px)] transition-colors"
                  >
                    {t(nav.name)}
                  </Link>
                ))}
              </nav>

              <div className="items-center justify-center hidden md:flex ms-auto gap-[clamp(5px,1.25vw,50px)] ">
                <button
                  onClick={() => setAuthModalType("login")}
                  className="text-white bg-transparent border border-white rounded-[clamp(10px,0.833vw,25px)] font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,30px)] font-[400] py-[clamp(5px,0.417vw,8px)] px-[clamp(5px,1.562vw,100px)] text-sm transition-colors"
                >
                  {t("Login")}
                </button>

                <Link href="/RegisterCompany">
                  <button className="text-white border-white rounded-[clamp(10px,0.833vw,25px)] border font-['Libre_Baskerville'] text-[clamp(14px,1.042vw,30px)] font-[400] py-[clamp(5px,0.417vw,8px)] px-[clamp(5px,1.562vw,100px)] text-sm transition-colors">
                    {t("Register Moving Company")}
                  </button>
                </Link>
                {/* Language Switcher */}
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => setLangOpen((o) => !o)}
                    className="flex items-center justify-center gap-2 text-white cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <span className={`fi fi-${flagMap[locale]} mr-1`} />
                    <span className="uppercase font-medium font-['Libre_Baskerville'] text-[clamp(10px,0.929vw,120px)]">
                      {locale}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </button>

                  <div
                    className={`absolute start-0 mt-2 w-[clamp(50px,6.5vw,144px)] border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${
                      langOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <ul className="divide-y divide-gray-100">
                      {routing.locales.map((l) => (
                        <li key={l}>
                          <button
                            onClick={() => changeLanguage(l)}
                            className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors rounded-xl"
                          >
                            <span className={`fi fi-${flagMap[l]} mr-2`} />
                            <span className="capitalize font-[400] font-['Libre_Baskerville'] text-[clamp(12px,0.938vw,30px)] flex-1">
                              {l}
                            </span>
                            {l === locale && (
                              <Check className="w-4 h-4 text-blue-600" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-1"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Outside the container but still in the header */}
        {menuOpen && (
          <div className="md:hidden bg-[#192953] shadow-lg border-t border-[#304680]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
              {navigatons.map((nav) => (
                <Link
                  href={nav.href}
                  locale={locale}
                  className="text-white hover:text-blue-400 font-medium text-base block py-2 px-3 hover:bg-[#263966] rounded-lg transition-colors"
                >
                  {t(nav.name)}
                </Link>
              ))}

              {/* Language Switcher */}
              <div className="relative mx-auto" ref={langRef}>
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center justify-center gap-2 text-white cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <span className={`fi fi-${flagMap[locale]} mr-1`} />
                  <span className="uppercase font-medium font-['Libre_Baskerville'] text-[18px]">
                    {locale}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[18px] text-gray-300" />
                </button>

                <div
                  className={`absolute left-0 mt-2 w-36 border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${
                    langOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <ul className="divide-y divide-gray-100">
                    {routing.locales.map((l) => (
                      <li key={l}>
                        <button
                          onClick={() => changeLanguage(l)}
                          className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors rounded-xl"
                        >
                          <span className={`fi fi-${flagMap[l]} mr-2`} />
                          <span className="capitalize font-[400] font-['Libre_Baskerville'] text-[18px] flex-1">
                            {l}
                          </span>
                          {l === locale && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* auth buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setAuthModalType("login");
                    setMenuOpen(false);
                  }}
                  className="text-white bg-transparent hover:bg-blue-600 border border-blue-40hover:border-blue-600 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full sm:w-auto"
                >
                  {t("Login")}
                </button>
                <Link
                  href="/RegisterCompany"
                  className="w-full sm:w-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full">
                    {t("Register Moving Company")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {authModalType && (
          <AuthModal
            type={authModalType}
            onClose={() => setAuthModalType(null)}
          />
        )}
      </header>
    </>
  );
}
