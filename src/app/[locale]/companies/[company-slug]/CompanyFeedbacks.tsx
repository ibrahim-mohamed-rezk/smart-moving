"use client";
import { ReviewTypes, ServiceTypes } from "@/libs/types/types";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { postData } from "@/libs/axios/server";
import toast from "react-hot-toast";
import axios, { AxiosHeaders } from "axios";
import { useTranslations } from "next-intl";

const CompanyFeedbacks = ({
  reviews,
  token,
  companySlug,
  services,
}: {
  reviews: ReviewTypes[];
  token: string | undefined;
  companySlug: string;
  services: ServiceTypes[];
}) => {
  const t = useTranslations("feedbacks");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 3,
    service_id: "",
    review: "",
    company_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openFeedbackForm = () => {
    if (!token) {
      toast.error(t("please_login"));
      return;
    }
    setReviewData({
      ...reviewData,
      company_id: companySlug,
    });
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setReviewData({
      ...reviewData,
      rating,
    });
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error(t("please_login"));
      return;
    }

    if (!reviewData.service_id) {
      toast.error(t("select_service_error"));
      return;
    }

    if (!reviewData.review) {
      toast.error(t("add_message_error"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await postData(
        "company/add-review",
        reviewData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
      );

      toast.success(t("review_added"));
      closeFeedbackForm();
      // Refresh the page or update the reviews list
      window.location.reload();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || t("error_occurred"));
      } else {
        toast.error(t("error_occurred"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-950 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Libre_Baskerville']">
            {t("title")}
          </h2>
          <button
            onClick={openFeedbackForm}
            className="px-6 py-3 bg-blue-950 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
          >
            {t("add_feedback")}
          </button>
        </div>

        <div
          className={`${
            reviews.length > 0 ? "grid" : "flex"
          } grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}
        >
          {/* Feedback Card 1 */}
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <div className="w-full flex justify-center flex-col items-center p-8">
              <div className="text-blue-950 text-2xl font-bold font-['Libre_Baskerville'] mb-4">
                {t("no_ratings")}
              </div>
              <p className="text-black/60 text-center text-lg font-normal font-['Libre_Baskerville']">
                {t("no_ratings_message")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Form Popup */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[1139px] px-16 py-12 bg-white rounded-2xl shadow-[2px_4px_8px_0px_rgba(0,0,0,0.08)] inline-flex flex-col justify-center items-center gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-12">
              <div className="self-stretch justify-start text-blue-950 text-4xl font-bold font-['Libre_Baskerville']">
                {t("write_feedback")}
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    {t("rate_services")}
                  </div>
                  <div className="inline-flex justify-start items-center gap-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-12 h-12 relative cursor-pointer"
                        onClick={() => handleRatingChange(star)}
                      >
                        <svg
                          className={`w-10 h-10 left-[4px] top-[4px] absolute ${
                            star <= reviewData.rating
                              ? "text-yellow-400 fill-current"
                              : "text-zinc-300 stroke-current"
                          }`}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="self-stretch h-24 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    {t("select_service")}
                  </div>
                  <select
                    name="service_id"
                    value={reviewData.service_id}
                    onChange={handleInputChange}
                    className="self-stretch h-14 px-6 rounded-[30px] border border-blue-950/40 text-xl font-bold font-['Libre_Baskerville'] focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-950/20 bg-white text-blue-950 hover:border-blue-950/60 transition-colors"
                  >
                    <option value="">{t("select_service_placeholder")}</option>
                    {services.map((service: ServiceTypes) => (
                      <option
                        key={service.id}
                        value={service.id}
                        className="text-blue-950"
                      >
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="self-stretch h-52 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    {t("message")}
                  </div>
                  <textarea
                    name="review"
                    onChange={handleInputChange}
                    className="self-stretch h-40 p-4 rounded-[30px] border border-blue-950/40 resize-none focus:outline-none focus:border-blue-950 focus:ring-2 focus:ring-blue-950/20 bg-white text-blue-950 hover:border-blue-950/60 transition-colors"
                    placeholder={t("message_placeholder")}
                    value={reviewData.review}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[651px] inline-flex justify-center items-center gap-8">
              <div
                onClick={closeFeedbackForm}
                className="flex-1 px-36 py-4 rounded-2xl outline-1 outline-offset-[-1px] outline-blue-950 flex justify-center items-center gap-2 cursor-pointer"
              >
                <div className="justify-start text-blue-950 text-xl font-normal font-['Libre_Baskerville']">
                  {t("cancel")}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 px-36 py-4 bg-blue-950 rounded-2xl flex justify-center items-center gap-2 cursor-pointer ${
                  isSubmitting ? "opacity-70" : ""
                }`}
              >
                <div className="justify-start text-white text-xl font-normal font-['Libre_Baskerville']">
                  {isSubmitting ? t("posting") : t("post")}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFeedbacks;
