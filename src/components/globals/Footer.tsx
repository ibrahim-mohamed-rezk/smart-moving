"use client";

import Link from "next/link";
import Image from "next/image";
import { Truck, ChevronRight, Youtube, Facebook } from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";

const tickerItems = ["Safe and Reliable", "Fast and Easy", "Live Support"];

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale(); // ⬅️ Get current locale

  return (
    <footer className="text-black overflow-hidden max-w-full">
      {/* Ticker */}
      <div className="bg-sky-500 overflow-hidden py-[clamp(0.5rem,1vw,1rem)]">
        <div className="ticker-wrapper">
          <div className="ticker">
            {Array(6)
              .fill(tickerItems)
              .flat()
              .map((txt, i) => (
                <span key={i} className="ticker-item">
                  <Truck className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] mr-2" />
                  {t(txt)}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative bg-[#0F152F] px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[clamp(1rem,2vw,2.5rem)] relative z-10">
          {/* Logo + Contact */}
          <div>
            <Image
              src={"/logoFooter.png"}
              alt="Smart Moving Services"
              width={140}
              height={40}
              className="object-contain"
            />
            <p className="mt-4 text-[clamp(0.75rem,1vw,1rem)] text-gray-300">
              {t("We make getting around easy")}
            </p>
            <h4 className="mt-6 font-semibold text-white text-[clamp(1rem,1.5vw,1.25rem)]">
              {t("Stay Connected")}
            </h4>
            <p className="text-[clamp(0.75rem,1vw,1rem)] text-gray-400">
              support@smartmoving.com
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-white">
              <Facebook />
              <FaWhatsapp />
              <FaInstagram />
              <Youtube />
              <FaXTwitter />
              <FaSnapchat />
              <FaTiktok />
            </div>
          </div>

          {/* Quick Help */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">
              {t("Quick Help")}
            </h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              <li>
                <Link href={`/${locale}/faq`}>{t("FAQ")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/Info`}>{t("How it works")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/Info`}>{t("Contact us")}</Link>
              </li>
            </ul>
          </div>

          {/* Explore Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">
              {t("Explore Services")}
            </h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              {[
                [t("Private Moving"), "login"],
                [t("Company Relocation"), "RegisterCompany"],
                [t("Storage"), "RegisterCompany"],
              ].map(([label, path]) => (
                <li key={path} className="flex items-center">
                  <Link href={`/${locale}/${path}`} className="flex-1">
                    {label}
                  </Link>
                  <ChevronRight />
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">
              {t("Company")}
            </h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              <li>
                <Link href={`/${locale}/Info`}>{t("Terms & Conditions")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/Info`}>{t("Privacy Policy")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-sky-500 flex flex-col md:flex-row items-center justify-between px-[clamp(1rem,5vw,4rem)] py-[clamp(1rem,3vw,2rem)] text-gray-900 text-center">
        <span className="text-[clamp(0.8rem,1vw,1rem)]">
          {t("Copyright", { year: new Date().getFullYear() })}
        </span>
      </div>

      <style jsx global>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 0 clamp(1rem, 2vw, 2rem);
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-wrapper:hover .ticker {
          animation-play-state: paused;
        }
      `}</style>
    </footer>
  );
}
