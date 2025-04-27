"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Check, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";

const flagMap: Record<string, string> = {
  en: "gb",
  ar: "sa",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [langOpen, setLangOpen] = useState(false);
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
    <header className="bg-[#192953] shadow-sm p-4 flex items-center justify-between">
      {/* Left side: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="MySite Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-2 text-white transition px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <span className={`fi fi-${flagMap[locale]} mr-1`} />
            <span className="uppercase font-medium text-xs">{locale}</span>
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </button>

          <div
            className={`absolute left-0 mt-2 w-32 border border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl transform origin-top-left transition-all duration-150 ${langOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <ul className="divide-y divide-gray-100">
              {routing.locales.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => changeLanguage(l)}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <span className={`fi fi-${flagMap[l]} mr-2`} />
                    <span className="uppercase text-xs flex-1">{l}</span>
                    {l === locale && <Check className="w-4 h-4 text-blue-600" />}
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
          className="text-white hover:text-blue-400 text-sm font-['Franklin Gothic Medium']"
        >
          Get a quote
        </Link>
        <Link
          href="/protected_route"
          locale={locale}
          className="text-white hover:text-blue-400 text-sm font-['Franklin Gothic Medium']"
        >
          Search price lists
        </Link>
        <Link
          href="/protected_route"
          locale={locale}
          className="text-white hover:text-blue-400 text-sm font-['Franklin Gothic Medium']"
        >
          Ratings
        </Link>
        <button className="text-white border rounded-2xl py-1 px-4 font-['Franklin Gothic Medium'] text-sm">Login</button>
        <button className="text-white border rounded-2xl py-1 px-4 font-['Franklin Gothic Medium'] text-sm">Register Moving Company</button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#192953] shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <Link
            href="/"
            locale={locale}
            className="text-white hover:text-blue-400 font-['Franklin Gothic Medium'] text-base"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </Link>
          <Link
            href="/protected_route"
            locale={locale}
            className="text-white hover:text-blue-400 font-['Franklin Gothic Medium'] text-base"
            onClick={() => setMenuOpen(false)}
          >
            Search price lists
          </Link>
          <Link
            href="/protected_route"
            locale={locale}
            className="text-white hover:text-blue-400 font-['Franklin Gothic Medium'] text-base"
            onClick={() => setMenuOpen(false)}
          >
            Ratings
          </Link>
          <button className="text-white border rounded-2xl py-2 px-25 font-['Franklin Gothic Medium'] text-base">
            Login
          </button>
          <button className="text-white border rounded-2xl py-2 px-6 font-['Franklin Gothic Medium'] text-base">
            Register Moving Company
          </button>
        </div>
      )}
    </header>
  );
}
