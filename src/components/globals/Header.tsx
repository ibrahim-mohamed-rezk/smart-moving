"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    router.replace(pathname, { locale });
    setOpen(false);
  };

  const t = useTranslations();

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        <span className="text-blue-500">My</span>Site
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/" locale={currentLocale} className="hover:text-blue-500">
          Home
        </Link>
        <Link
          href="/protected_route"
          locale={currentLocale}
          className="hover:text-blue-500"
        >
          Protecged route
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border rounded px-2 py-1"
          >
            <Image
              src={`/flags/${currentLocale}.svg`}
              alt={currentLocale}
              width={20}
              height={15}
            />
            <span className="uppercase">{currentLocale}</span>
          </button>

          {open && (
            <div className="absolute bg-white shadow rounded mt-2 right-0 z-50 w-32">
              {routing.locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => changeLanguage(locale)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <Image
                    src={`/flags/${locale}.svg`}
                    alt={locale}
                    width={20}
                    height={15}
                  />
                  <span className="uppercase">{locale}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
