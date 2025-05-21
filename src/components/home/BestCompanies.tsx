"use client";

import { CompanyTypes } from "@/libs/types/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const BestCompanies = ({ companies }: { companies: CompanyTypes[] }) => {
  const t = useTranslations("home"); // Namespace: "home"

  return (
    <section className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
      <h3 className="text-[clamp(14px,3.333vw,64px)] text-[#192953] w-full text-center font-bold mb-4">
        {t("best_companies")}
      </h3>

      <div className="relative">
        <div
          id="company-slider"
          className="flex gap-6 items-center justify-center overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {companies.map((company, i) => (
            <Link
              href={`/companies/${company.id}?page=about%20us`}
              key={i}
              className="flex-shrink-0 p-4 w-[clamp(12rem,15vw,15rem)] text-center"
            >
              <img
                src={company.image || "/worldCarIcon.png"}
                alt={t("company_logo")}
                width={200}
                height={200}
                className="mx-auto mb-2 w-[200px] h-[200px]"
              />
              {/* Optional: if you want to show company names */}
              {/* <h2 className="text-lg font-bold text-[#7FB63D] ">
                {company.name}
              </h2> */}
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            document
              .getElementById("company-slider")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full"
          aria-label={t("scroll_left")}
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
          aria-label={t("scroll_right")}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default BestCompanies;
