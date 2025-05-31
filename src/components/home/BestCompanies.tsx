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
              className="flex-shrink-0 overflow-hidden h-fit  p-4 w-[clamp(12rem,15vw,13rem)] text-center"
            >
              <div className="relative">
                <img
                  src={company.image || "/worldCarIcon.png"}
                  alt={t("company_logo")}
                  className="mx-auto mb-2 w-full aspect-square rounded-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-bold text-[#7FB63D] shadow-sm">
                  {company.reviews?.length > 0
                    ? (
                        company.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / company.reviews.length
                      ).toFixed(1)
                    : "0"}{" "}
                  ⭐
                </div>
              </div>
              {/* Optional: if you want to show company names */}
              <h2 className="text-lg text-nowrap line-clamp-1 font-bold text-[#7FB63D] ">
                {company.name}
              </h2>
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
