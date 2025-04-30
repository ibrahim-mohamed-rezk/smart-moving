"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Check, Menu, X } from "lucide-react";
import Image from "next/image";
import AuthModal from "../ui/AuthModal";

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
      <header className="bg-gradient-to-r bg-[#192953] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left side: Logo and Language */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image
                  src={"/logo.png"}
                  alt="MySite Logo"
                  width={130}
                  height={40}
                  className="object-contain"
                />
              </Link>

              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-2 text-white bg-[#263966] hover:bg-[#304680] transition px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <span className={`fi fi-${flagMap[locale]} mr-1`} />
                  <span className="uppercase font-medium text-xs">{locale}</span>
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                </button>

                <div
                  className={`absolute left-0 mt-2 w-36 border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${langOpen
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
                          <span className="uppercase text-xs flex-1">{l}</span>
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

            {/* Right side: Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                locale={locale}
                className="text-white hover:text-blue-400 text-sm font-medium transition-colors"
              >
                Get a quote
              </Link>
              <Link
                href="/protected_route"
                locale={locale}
                className="text-white hover:text-blue-400 text-sm font-medium transition-colors"
              >
                Search price lists
              </Link>
              <Link
                href="/protected_route"
                locale={locale}
                className="text-white hover:text-blue-400 text-sm font-medium transition-colors"
              >
                Ratings
              </Link>
              <button
                onClick={() => setAuthModalType("login")}
                className="text-white bg-transparent border border-white rounded-full py-2 px-9 font-medium text-sm transition-colors"
              >
                Login
              </button>

              <Link href="/RegisterCompany">
                <button className="text-white border-white rounded-full border py-2 px-4 font-medium text-sm transition-colors">
                  Register Moving Company
                </button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-1"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Outside the container but still in the header */}
        {menuOpen && (
          <div className="md:hidden bg-[#192953] shadow-lg border-t border-[#304680]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/"
                locale={locale}
                className="text-white hover:text-blue-400 font-medium text-base block py-2 px-3 hover:bg-[#263966] rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get a quote
              </Link>
              <Link
                href="/protected_route"
                locale={locale}
                className="text-white hover:text-blue-400 font-medium text-base block py-2 px-3 hover:bg-[#263966] rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Search price lists
              </Link>
              <Link
                href="/protected_route"
                locale={locale}
                className="text-white hover:text-blue-400 font-medium text-base block py-2 px-3 hover:bg-[#263966] rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Ratings
              </Link>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setAuthModalType("login");
                    setMenuOpen(false);
                  }}
                  className="text-white bg-transparent hover:bg-blue-600 border border-blue-40hover:border-blue-600 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full sm:w-auto"
                >
                  Login
                </button>
                <Link href="/RegisterCompany" className="w-full sm:w-auto" onClick={() => setMenuOpen(false)}>
                  <button className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 font-medium text-sm transition-colors w-full">
                    Register Moving Company
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