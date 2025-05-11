"use client";

import { getData, postData } from "@/libs/axios/server";
import { TaskTypes, UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

const TableActionButtons = ({
  id,
  token,
  user,
  task,
  locale,
}: {
  id: number;
  token: string;
  user?: UserDataTypes;
  task?: TaskTypes;
  locale?: string;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const offerPopupRef = useRef<HTMLDivElement>(null);

  const acceptOffer = async () => {
    try {
      await getData(
        `customer/accept-api/${id}`,
        {},
        new AxiosHeaders({
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: locale || "en",
        })
      );
      toast.success("Offer accepted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const declineOffer = async () => {
    try {
      await getData(
        `customer/refuse-api/${id}`,
        {},
        new AxiosHeaders({
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            lang: locale || "en",
        })
      );
      toast.success("Offer declined successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleOfferPopup = () => {
    setShowOfferPopup(!showOfferPopup);
  };

  const submitOffer = async () => {
    if (!offerPrice || isNaN(Number(offerPrice))) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      await postData(
        `company/offer/${id}`,
        { offer: Number(offerPrice) },
        new AxiosHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          lang: locale || "en",
        })
      );
      toast.success("Offer submitted successfully");
      setShowOfferPopup(false);
      setOfferPrice("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowDetails(false);
      }
      if (
        offerPopupRef.current &&
        !offerPopupRef.current.contains(event.target as Node)
      ) {
        setShowOfferPopup(false);
      }
    };

    if (showDetails || showOfferPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails, showOfferPopup]);

  if (user?.role === "company") {
    return (
      <>
        <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
          <button
            onClick={toggleOfferPopup}
            className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
          >
            Add Offer
          </button>
          <button
            onClick={toggleDetails}
            className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-md transition duration-300 ease-in-out"
          >
            Details
          </button>
        </div>

        {/* Add Offer Popup */}
        {showOfferPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              ref={offerPopupRef}
              className="w-full max-w-md bg-white rounded-2xl flex flex-col justify-start items-start gap-6 p-6"
            >
              <div className="self-stretch justify-start text-blue-950 text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">
                Add Your Offer
              </div>
              <div className="self-stretch flex flex-col gap-4 w-full">
                <label className="text-black text-lg font-bold font-['Libre_Baskerville']">
                  Price:
                </label>
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="Enter your price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={toggleOfferPopup}
                    className="px-6 py-2 rounded-md border border-blue-950 text-blue-950 font-bold transition duration-300 ease-in-out hover:bg-blue-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitOffer}
                    className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold transition duration-300 ease-in-out"
                  >
                    Submit Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Popup */}
        {showDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              ref={popupRef}
              className="w-full max-w-4xl bg-white scrollbar-hide rounded-2xl inline-flex flex-col justify-start items-start gap-6 md:gap-8 p-4 md:p-6 max-h-[95vh]  overflow-y-auto"
            >
              <div className="self-stretch justify-start text-blue-950 text-2xl md:text-4xl font-bold font-['Libre_Baskerville']">
                Details Of Task
              </div>
              <div className="self-stretch px-2 md:px-6 flex flex-col justify-center items-end gap-4 w-full">
                <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
                  <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
                    {Object.keys(task?.details || {})?.map((key) => {
                      const value =
                        task?.details?.[key as keyof typeof task.details];
                      return (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 w-full"
                        >
                          <div className="justify-start text-black text-lg md:text-xl font-bold font-['Libre_Baskerville'] whitespace-nowrap">
                            {typeof task?.details[
                              key as keyof typeof task.details
                            ] === "object"
                              ? ""
                              : `${key}:`}
                          </div>
                          <div className="justify-start text-black/60 text-base md:text-lg font-normal font-['Libre_Baskerville'] break-words">
                            {typeof value === "object" ? "" : value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {task?.details.moving_address &&
                  typeof task?.details.moving_address === "object" &&
                  !Array.isArray(task?.details.moving_address) && (
                    <>
                      <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300 w-full"></div>
                      <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
                        <div className="self-stretch justify-start text-blue-950 text-xl md:text-3xl font-bold font-['Libre_Baskerville']">
                          Moving address
                        </div>
                        <div className="self-stretch flex flex-col justify-center items-start gap-2 w-full">
                          {Object.keys(task?.details.moving_address)?.map(
                            (key) => {
                              return (
                                <div
                                  key={key}
                                  className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 w-full"
                                >
                                  <div className="justify-start text-black text-lg md:text-xl font-bold font-['Libre_Baskerville'] whitespace-nowrap">
                                    {key} :
                                  </div>
                                  <div className="justify-start text-black/60 text-base md:text-lg font-normal font-['Libre_Baskerville'] break-words">
                                    {
                                      task?.details?.moving_address?.[
                                        key as keyof typeof task.details.moving_address
                                      ]
                                    }
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </>
                  )}
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setShowOfferPopup(true);
                  }}
                  className="mt-4 px-8 sm:px-14 py-2 sm:py-3.5 rounded-2xl outline-1 outline-offset-[-1px] outline-blue-950 inline-flex justify-center items-center gap-2"
                >
                  <div className="justify-start text-blue-950 text-lg sm:text-xl font-normal font-['Libre_Baskerville']">
                    Add Offer
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
      <button
        onClick={acceptOffer}
        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
      >
        Accept
      </button>
      <button
        onClick={declineOffer}
        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
      >
        Decline
      </button>
    </div>
  );
};

export default TableActionButtons;
