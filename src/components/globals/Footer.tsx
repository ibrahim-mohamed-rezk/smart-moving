"use client";

// import { useState, useRef, useEffect } from "react";
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
import logo from "../../../public/logoFooter.png";

const tickerItems = ["Safe and Reliable", "Fast and Easy", "Live Support"];

export default function Footer() {
  // const [langOpen, setLangOpen] = useState(false);
  // const langRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const onClick = (e: MouseEvent) => {
  //     if (langRef.current && !langRef.current.contains(e.target as Node)) {
  //       setLangOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onClick);
  //   return () => document.removeEventListener("mousedown", onClick);
  // }, []);

  return (
    <footer className="text-black">
      {/* marquee */}
      <div className="bg-sky-500 overflow-hidden whitespace-nowrap py-[clamp(0.5rem,1vw,1rem)]">
        <div className="inline-block animate-marquee">
          {Array(2)
            .fill(tickerItems)
            .flat()
            .map((txt, i) => (
              <span key={i} className="inline-flex items-center px-[clamp(1rem,2vw,2rem)]">
                <Truck className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] mr-2" />
                {txt}
              </span>
            ))}
        </div>
      </div>

      {/* main */}
      <div className="relative bg-[#0F152F] px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[clamp(1rem,2vw,2.5rem)] relative z-10">
          <div>
            <Image
              src={logo}
              alt="Smart Moving Services"
              width={140}
              height={40}
              className="object-contain"
            />
            <p className="mt-4 text-[clamp(0.75rem,1vw,1rem)] text-gray-300">
              We make getting around easy! Reliable, safe, and fast
              transportation services throughout the city.
            </p>
            <h4 className="mt-6 font-semibold text-white text-[clamp(1rem,1.5vw,1.25rem)]">
              Stay Connected
            </h4>
            <p className="text-[clamp(0.75rem,1vw,1rem)] text-gray-400">support@smartmoving.com</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-white">
              <Facebook className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <FaWhatsapp className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <FaInstagram className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <Youtube className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <FaXTwitter className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <FaSnapchat className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
              <FaTiktok className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">Quick Help</h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/how-it-works">How it works</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">Explore Services</h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              {[
                ["Private Moving", "/private-moving"],
                ["Company Relocation", "/company-relocation"],
                ["Storage", "/storage"],
              ].map(([label, href]) => (
                <li key={href} className="flex items-center">
                  <Link href={href} className="flex-1">
                    {label}
                  </Link>
                  <ChevronRight className="w-[clamp(0.75rem,1vw,1rem)] h-[clamp(0.75rem,1vw,1rem)]" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white text-[clamp(1rem,1.5vw,1.25rem)]">Company</h4>
            <ul className="space-y-2 text-gray-300 text-[clamp(0.75rem,1vw,1rem)]">
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-sky-500 flex flex-col md:flex-row items-center justify-between px-[clamp(1rem,5vw,4rem)] py-[clamp(1rem,3vw,2rem)] text-gray-900 text-center">
        <span className="text-[clamp(0.8rem,1vw,1rem)]">
          © {new Date().getFullYear()} Copyright@
        </span>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}
