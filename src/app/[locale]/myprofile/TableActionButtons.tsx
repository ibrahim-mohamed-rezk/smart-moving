"use client";

import { getData, postData } from "@/libs/axios/server";
import { OfferTypes, UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const TableActionButtons = ({
  id,
  token,
  locale,
  offer,
  taskDataId,
}: {
  id: number;
  token: string;
  user?: UserDataTypes;
  locale?: string;
  offer?: OfferTypes;
  openCollabse?: boolean;
  taskDataId?: number;
  setOpenCollabse?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const t = useTranslations("table_actions");
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
        { user_id: offer?.company?.user_id, order_id: taskDataId },
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      toast.success(t("offer_accepted"));
      router.push(`/chats?id=${chat.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || t("error_occurred"));
      } else {
        toast.error(t("unexpected_error"));
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
      toast.success(t("offer_declined"));
      setShowOfferPopup(false);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || t("error_occurred"));
      } else {
        toast.error(t("unexpected_error"));
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOfferPopup]);

  return (
    <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
      <button
        onClick={() => setShowOfferPopup(!showOfferPopup)}
        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
      >
        {showOfferPopup ? t("close_details") : t("view_details")}
      </button>
      {showOfferPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={offerPopupRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
          >
            <button
              onClick={() => setShowOfferPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">{t("offer_details")}</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">{t("price")}:</p>
                <p className="text-gray-700">
                  {offer?.offer || t("not_specified")}
                </p>
              </div>
              <div>
                <p className="font-semibold">{t("message")}:</p>
                <p className="text-gray-700">
                  {offer?.message || t("no_message")}
                </p>
              </div>
              <div className="flex justify-between gap-2 mt-6">
                {offer?.status === "hold" && (
                  <button
                    onClick={acceptOffer}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
                  >
                    {t("accept")}
                  </button>
                )}
                {offer?.status === "hold" &&<button
                  onClick={declineOffer}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
                >
                  {t("decline")}
                </button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableActionButtons;
