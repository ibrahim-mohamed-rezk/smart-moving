"use client";

import ReviewCard from "@/app/[locale]/companies/[company-slug]/ReviewCard";
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
          className="flex gap-6 items-center justify-start overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {reviews.map((review, i) => (
           <ReviewCard  key={i} review={review} />
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
