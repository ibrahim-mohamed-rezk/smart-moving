"use client";

import Image from "next/image";
import worldCarIcon from "../../../public/worldCarIcon.png";

const BestCompanies = () => {
  return (
    <section className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
      <h3 className="text-2xl font-bold mb-4">Best companies</h3>
      <div className="relative">
        <div
          id="company-slider"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 p-4 w-[clamp(12rem,15vw,15rem)] text-center"
            >
              <Image
                src={worldCarIcon}
                alt="Company Logo"
                width={200}
                height={200}
                className="mx-auto mb-2"
              />
            </div>
          ))}
        </div>
        {/* Navigation */}
        <button
          onClick={() =>
            document
              .getElementById("company-slider")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
        >
          ←
        </button>
        <button
          onClick={() =>
            document
              .getElementById("company-slider")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default BestCompanies