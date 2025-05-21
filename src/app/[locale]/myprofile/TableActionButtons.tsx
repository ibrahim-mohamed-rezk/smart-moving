"use client";

import { getData, postData } from "@/libs/axios/server";
import { OfferTypes, UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/routing";

const TableActionButtons = ({
  id,
  token,
  locale,
  offer,
}: {
  id: number;
  token: string;
  user?: UserDataTypes;
  locale?: string;
  offer?: OfferTypes;
  openCollabse?: boolean;
  setOpenCollabse?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const offerPopupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

      const chat = await postData(
        "chat",
        { user_id: offer?.company?.user_id },
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      toast.success("Offer accepted successfully");
      router.push(`/chats?id=${chat.data.id}`);
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


  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        offerPopupRef.current &&
        !offerPopupRef.current.contains(event.target as Node)
      ) {
        setShowOfferPopup(false);
      }
    };



    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOfferPopup]);


  return (
    <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
      {offer?.status !== "accept" && (
        <button
          onClick={acceptOffer}
          className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
        >
          Accept
        </button>
      )}
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
