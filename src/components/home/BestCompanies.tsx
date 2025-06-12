"use client";

import { CompanyTypes } from "@/libs/types/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestCompanies = ({ companies }: { companies: CompanyTypes[] }) => {
  const t = useTranslations("home");
  const swiperRef = useRef<any>(null);

  // Don't render if no companies
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <section className="px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
      <h3 className="text-[clamp(14px,3.333vw,64px)] text-[#192953] w-full text-center font-bold mb-4">
        {t("best_companies")}
      </h3>

      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          centeredSlides={false}
          loop={companies.length > 3}
          initialSlide={0}
          autoplay={
            companies.length > 1
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={false} // We'll use custom navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: ".swiper-pagination-custom",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
              centeredSlides: false,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 5.5,
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
          className="!pb-12"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {companies.map((company, i) => (
            <SwiperSlide
              key={`${company.id}-${i}`}
            >
              <Link
                href={`/companies/${company.id}?page=about%20us`}
                className="block overflow-hidden h-fit p-4 text-center hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={company.image || "/worldCarIcon.png"}
                    alt={`${company.name} ${t("company_logo")}`}
                    className="mx-auto mb-2 w-full aspect-square rounded-full h-full object-cover shadow-lg"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/worldCarIcon.png";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-bold text-[#7FB63D] shadow-sm">
                    {company.reviews && company.reviews.length > 0
                      ? (
                          company.reviews.reduce(
                            (acc, review) => acc + (review.rating || 0),
                            0
                          ) / company.reviews.length
                        ).toFixed(1)
                      : "0"}{" "}
                    ⭐
                  </div>
                </div>
                <h2 className="text-lg text-nowrap line-clamp-1 font-bold text-[#7FB63D]">
                  {company.name}
                </h2>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows - Only show if more than 3 companies */}
        {companies.length > 3 && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-lg rounded-full hover:bg-gray-50 transition-colors duration-200 z-10"
              aria-label={t("scroll_left")}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 shadow-lg rounded-full hover:bg-gray-50 transition-colors duration-200 z-10"
              aria-label={t("scroll_right")}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom mt-4"></div>
      </div>
    </section>
  );
};

export default BestCompanies;
