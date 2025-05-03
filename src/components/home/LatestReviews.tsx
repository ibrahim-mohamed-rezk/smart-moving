"use client";

import { ReviewTypes } from "@/libs/types/types";
import { useTranslations } from "next-intl";

const LatestReviews = ({ reviews }: { reviews: ReviewTypes[] }) => {
  const t = useTranslations("home");

  return (
    <section className="px-[clamp(1rem,5vw,4rem)] pb-[clamp(2rem,6vw,4rem)]">
      <h3 className="text-[clamp(14px,3.333vw,64px)] text-[#192953] w-full text-center font-bold mb-4">
        {t("latest_reviews")}
      </h3>

      <div className="relative">
        <div
          id="review-slider"
          className="flex gap-6 items-center justify-center overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 bg-white rounded-xl p-4 shadow-[4px_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center text-center">
                <p className="text-sm font-semibold">{review.user}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(review.rating)].map((_, index) => (
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
                {t("review_summary", {
                  company: review.company,
                  service: review.service,
                })}
              </p>

              <p className="text-sm font-semibold mt-4">{t("review")}:</p>
              <p className="text-sm text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            document
              .getElementById("review-slider")
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
              .getElementById("review-slider")
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

export default LatestReviews;
