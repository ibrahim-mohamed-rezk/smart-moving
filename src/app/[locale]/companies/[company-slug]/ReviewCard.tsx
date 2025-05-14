import { ReviewTypes } from "@/libs/types/types";
import React from "react";

const ReviewCard = ({ review }: { review: ReviewTypes }) => {
  return (
    <div className="self-stretch relative bg-white rounded-lg shadow-md p-6">
      <div className="relative py-2 flex flex-col justify-start items-start gap-1">
        <div className="text-black text-xl font-bold font-['Libre_Baskerville']">
          {review.user}
        </div>
        <div className="flex flex-wrap justify-start items-center gap-2">
          {[...Array(review.rating)].map((_, index) => (
            <svg
              key={index}
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                d="M14.8716 3.73152L16.7781 7.57594C17.0381 8.1111 17.7313 8.62441 18.3163 8.7227L21.7717 9.30155C23.9815 9.6729 24.5015 11.2893 22.9091 12.8839L20.2228 15.5924C19.7678 16.0511 19.5187 16.9357 19.6594 17.5693L20.4286 20.9222C21.0352 23.5761 19.6378 24.6028 17.3089 23.2157L14.0701 21.2826C13.4852 20.9331 12.5211 20.9331 11.9253 21.2826L8.68654 23.2157C6.36846 24.6028 4.96028 23.5652 5.56689 20.9222L6.33597 17.5693C6.47678 16.9357 6.22764 16.0511 5.77269 15.5924L3.08632 12.8839C1.50483 11.2893 2.01394 9.6729 4.22369 9.30155L7.67915 8.7227C8.25325 8.62441 8.94651 8.1111 9.20648 7.57594L11.1129 3.73152C12.1528 1.64548 13.8426 1.64548 14.8716 3.73152Z"
                fill="#FFC107"
                fill-opacity="0.4"
              />
            </svg>
          ))}
          {[...Array(5 - review.rating)].map((_, index) => (
            <svg
              key={index}
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                d="M14.8716 3.73152L16.7781 7.57594C17.0381 8.1111 17.7313 8.62441 18.3163 8.7227L21.7717 9.30155C23.9815 9.6729 24.5015 11.2893 22.9091 12.8839L20.2228 15.5924C19.7678 16.0511 19.5187 16.9357 19.6594 17.5693L20.4286 20.9222C21.0352 23.5761 19.6378 24.6028 17.3089 23.2157L14.0701 21.2826C13.4852 20.9331 12.5211 20.9331 11.9253 21.2826L8.68654 23.2157C6.36846 24.6028 4.96028 23.5652 5.56689 20.9222L6.33597 17.5693C6.47678 16.9357 6.22764 16.0511 5.77269 15.5924L3.08632 12.8839C1.50483 11.2893 2.01394 9.6729 4.22369 9.30155L7.67915 8.7227C8.25325 8.62441 8.94651 8.1111 9.20648 7.57594L11.1129 3.73152C12.1528 1.64548 13.8426 1.64548 14.8716 3.73152Z"
                stroke="#D9D9D9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="w-[50%] mx-auto my-1 h-[1px] bg-[#F0F0F0]" />

      <div className="relative py-2 flex flex-col items-start justify-start w-full">
        <span className="text-black text-base font-normal font-['Libre_Baskerville']">
          Service:{" "}
        </span>
        <span className="text-black text-sm font-normal font-['Libre_Baskerville']">
          {review.service}
        </span>
      </div>

      <div className="w-[50%] mx-auto my-1 h-[1px] bg-[#F0F0F0]" />

      <div className="relative py-2  w-full ">
        <p className="text-black text-base font-normal font-['Libre_Baskerville'] break-words">
          {review.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
