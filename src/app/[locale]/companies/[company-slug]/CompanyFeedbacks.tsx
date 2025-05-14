"use client";
import { ReviewTypes } from "@/libs/types/types";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

const CompanyFeedbacks = ({ reviews }: { reviews: ReviewTypes[] }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const openFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-950 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Libre_Baskerville']">
            Customer Feedbacks
          </h2>
          <button
            onClick={openFeedbackForm}
            className="px-6 py-3 bg-blue-950 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
          >
            Add Feedback
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
                No Ratings Yet
              </div>
              <p className="text-black/60 text-center text-lg font-normal font-['Libre_Baskerville']">
                This company has not received any feedback yet. Be the first to
                share your experience!
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
                Write Feedback
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Rate the Services{" "}
                  </div>
                  <div className="inline-flex justify-start items-center gap-6">
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-zinc-300" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-zinc-300" />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-24 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Select Service
                  </div>
                  <div className="self-stretch h-14 relative rounded-[30px] outline-1 outline-offset-[-1px] outline-black/40 overflow-hidden">
                    <div className="w-8 h-8 left-[963px] top-[12.50px] absolute">
                      <div className="w-4 h-2 left-[8px] top-[12px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                    </div>
                    <div className="left-[24px] top-[16px] absolute justify-start text-black/40 text-xl font-bold font-['Libre_Baskerville']">
                      None
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-52 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Message
                  </div>
                  <div className="self-stretch h-40 relative rounded-[30px] border border-black/40" />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[651px] inline-flex justify-center items-center gap-8">
              <div
                onClick={closeFeedbackForm}
                data-left_icon="false"
                data-right_icon="false"
                data-size="large"
                data-type="secondary"
                className="flex-1 px-36 py-4 rounded-2xl outline-1 outline-offset-[-1px] outline-blue-950 flex justify-center items-center gap-2 cursor-pointer"
              >
                <div className="justify-start text-blue-950 text-xl font-normal font-['Libre_Baskerville']">
                  Cancel
                </div>
              </div>
              <div
                data-left_icon="false"
                data-right_icon="false"
                data-size="large"
                data-type="primary"
                className="flex-1 px-36 py-4 bg-blue-950 rounded-2xl flex justify-center items-center gap-2 cursor-pointer"
              >
                <div className="justify-start text-white text-xl font-normal font-['Libre_Baskerville']">
                  Post
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFeedbacks;
