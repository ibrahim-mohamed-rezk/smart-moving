"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MoveRight, Car, Building2, Armchair, Database, CarTaxiFront } from "lucide-react";
import logo from "../../../public/HeroSection.png";
import or from "../../../public/OR.png";
import worldCarIcon from "../../../public/worldCarIcon.png";
import image from "../../../public/image0.png";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#0E172F] text-white px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,6rem)] md:text-4xl font-bold leading-snug font-['Franklin Gothic Heavy']">
              Get 3 free quotes for <br /> your move
            </h2>
            <ul className="list-disc pl-6 mt-6 space-y-2 text-[clamp(1rem,2vw,1.5rem)] text-gray font-['Franklin Gothic Heavy'] font-bold">
              <li>No commitment</li>
              <li>Professional movers</li>
              <li>Save up to 70%</li>
            </ul>
            <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#0E1B4D] text-white text-sm rounded-full hover:bg-[#1c2a63] transition">
              <MoveRight className="w-4 h-4" />
              Select your move now
            </button>
          </div>
          <Image src={logo} alt="Smart Moving" width={700} className="object-contain max-w-full" />
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
        <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[100%] tracking-[0] text-center font-['Franklin Gothic Heavy'] mb-10">
          services of move
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
          {[
            {
              title: "Company Relocation",
              desc: "Professional office moving with zero business disruption",
              icon: <Building2 className="w-6 h-6" />,
            },
            {
              title: "Private Moving",
              desc: "Moving tailored to your needs.",
              icon: <Car className="w-6 h-6" />,
            },
            {
              title: "Furniture Pick-up",
              desc: "Stress-free full service.",
              icon: <Armchair className="w-6 h-6" />,
            },
            {
              title: "Storage",
              desc: "Secure storage solutions.",
              icon: <Database className="w-6 h-6" />,
            },
            {
              title: "Taxi",
              desc: "Quick delivery for small loads.",
              icon: <CarTaxiFront className="w-6 h-6" />,
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="relative bg-[#F3F4F6] p-10 rounded-xl text-center border shadow-md transition-all duration-300 group my-5 mx-3 hover:bg-[#0E172F] hover:text-white"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow">
                <div className="text-[#0E172F]">{service.icon}</div>
              </div>
              <h4 className="text-lg font-extrabold mt-10 mb-3 text-[#0E172F] group-hover:text-white transition-colors">
                {service.title}
              </h4>
              <p className="text-sm text-gray-700 mb-6 max-w-xs mx-auto group-hover:text-white transition-colors">
                {service.desc}
              </p>
              <div className="mx-auto w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#0E172F]">
                <span className="text-2xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#F3F8FF] py-[clamp(2rem,6vw,5rem)] px-[clamp(1rem,5vw,4rem)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">About Us</h3>
            <p className="text-base text-[#7FB63D] mb-4">
              Smart Moving Services are reliable, safe, and fast moving partners
              who help make your relocation stress-free. Our platform connects you
              with top-rated companies.
            </p>
            <ul className="text-base space-y-4 text-[#7FB63D]">
              {["Best deals", "Fast responses", "Professional support", "Secure payments"].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7FB63D] text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Image src={or} alt="Or Section" className="w-full max-h-dvh" />
            <div className="absolute bottom-15 hidden lg:flex md:flex  left-0 p-8 border-8 rounded-full border-amber-50 bg-[#0F152F] -translate-x-1/2">
              <Image src={image} alt="Icon" width={80} height={80} />
            </div>
          </div>
        </div>
        <p className="text-base mt-6 text-[#7FB63D] font-bold text-center w-full">
          Let us handle the heavy lifting - you focus on the excitement of your new beginning!
        </p>
      </section>

      {/* Best Companies Section */}
      <section className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
        <h3 className="text-2xl font-bold mb-4">Best companies</h3>
        <div className="relative">
          <div id="company-slider" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 p-4 w-[clamp(12rem,15vw,15rem)] text-center"
              >
                <Image src={worldCarIcon} alt="Company Logo" width={200} height={200} className="mx-auto mb-2" />
              </div>
            ))}
          </div>
          {/* Navigation */}
          <button
            onClick={() => document.getElementById("company-slider")?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
          >
            ←
          </button>
          <button
            onClick={() => document.getElementById("company-slider")?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
          >
            →
          </button>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="px-[clamp(1rem,5vw,4rem)] pb-[clamp(2rem,6vw,4rem)]">
        <h3 className="text-2xl font-bold mb-4">Latest reviews</h3>
        <div className="relative">
          <div id="review-slider" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-white rounded-xl p-4 shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"
              >
                <div className="flex justify-between items-center text-center">
                  <p className="text-sm font-semibold">Gert</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={index < 4 ? "#facc15" : "#e5e7eb"}
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.179L12 18.897l-7.336 3.858 1.402-8.179L.132 9.21l8.2-1.192z" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  wrote a review for CR Logistic ApS<br />
                  about a Private Moving task in Næstved
                </p>
                <p className="text-sm font-semibold mt-4">Review:</p>
                <p className="text-sm text-gray-700">Absolutely perfect move</p>
              </div>
            ))}
          </div>
          {/* Navigation */}
          <button
            onClick={() => document.getElementById("review-slider")?.scrollBy({ left: -300, behavior: "smooth" })}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
          >
            ←
          </button>
          <button
            onClick={() => document.getElementById("review-slider")?.scrollBy({ left: 300, behavior: "smooth" })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}
