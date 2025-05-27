"use client";

import { useLocale, useTranslations } from "next-intl";
import { TaskDetailsTypes, TaskTypes } from "@/libs/types/types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosHeaders } from "axios";
import { postData } from "@/libs/axios/server";
import { UserIcon } from "lucide-react";

interface AddOffer {
  price: string;
  message: string;
}

const RequestsTable = ({
  tasksData,
  token,
}: {
  tasksData: TaskTypes[];
  token: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("myprofile");
  const [openCollapseId, setOpenCollapseId] = useState<number | null>(null);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerPrice, setOfferPrice] = useState<AddOffer | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const offerPopupRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const [filterdTasks, setFilteredTasks] = useState<TaskTypes[]>(tasksData);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTasks(tasksData);
    } else {
      setFilteredTasks(tasksData.filter((task) => task.status === filter));
    }
  }, [filter, tasksData]);

  const toggleDetails = (taskId: number) => {
    if (openCollapseId === taskId) {
      setOpenCollapseId(null);
    } else {
      setOpenCollapseId(taskId);
    }
  };

  const toggleOfferPopup = (taskId: number) => {
    setCurrentTaskId(taskId);
    setShowOfferPopup(!showOfferPopup);
  };

  const submitOffer = async (id: number) => {
    if (!offerPrice || isNaN(Number(offerPrice.price))) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      await postData(
        `company/offer/${id}`,
        { offer: Number(offerPrice.price), message: offerPrice.message },
        new AxiosHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          lang: locale || "en",
        })
      );

      toast.success("Offer submitted successfully");
      setShowOfferPopup(false);
      setOfferPrice(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Helper function to render task details
  const renderTaskDetails = (details: TaskDetailsTypes) => {
    return (
      <div className="px-4 py-3 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.keys(details)
            .filter(
              (key) =>
                key !== "moving_address" && typeof details[key] !== "object"
            )
            .map((key) => (
              <div key={key} className="flex flex-col">
                <span className="text-black text-lg font-bold font-['Libre_Baskerville']">
                  {t(key.replace(/_/g, " "))}:
                </span>
                <span className="text-black/60 text-base font-normal font-['Libre_Baskerville'] break-words">
                  {details[key] as string}
                </span>
              </div>
            ))}
        </div>

        {details.moving_address &&
          typeof details.moving_address === "object" &&
          !Array.isArray(details.moving_address) && (
            <div className="mt-4 border-t pt-4 border-zinc-300">
              <div className="text-blue-950 text-xl font-bold font-['Libre_Baskerville'] mb-3">
                {t("moving_address")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(details.moving_address).map((key) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-black text-lg font-bold font-['Libre_Baskerville']">
                      {t(key.replace(/_/g, " "))}:
                    </span>
                    <span className="text-black/60 text-base font-normal font-['Libre_Baskerville'] break-words">
                      {details.moving_address![key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => toggleOfferPopup(currentTaskId || 0)}
            className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold transition duration-300 ease-in-out"
          >
            {t("add_offer")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      {!filterdTasks || filterdTasks?.length === 0 ? (
        <div className="w-full md:p-8 text-center bg-white border border-zinc-300 rounded-lg">
          <p className="text-xl font-['Libre_Baskerville'] text-gray-700">
            {t("no_requests_available")}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center gap-2 mb-4">
            {["all", "pending", "processing", "done"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`${
                  filter === status
                    ? "bg-blue-950 text-white"
                    : "bg-white text-blue-950"
                } px-4 py-2 border border-zinc-300 rounded-md hover:bg-blue-950 hover:text-white transition duration-300 ease-in-out`}
              >
                {t(status)}
              </button>
            ))}
          </div>
          <table className="min-w-full xl:w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-neutral-200">
                <th className="p-2.5 border w-[100px] text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  
                </th>
                <th className="p-2.5 border text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  {t("name")}
                </th>
                <th className="p-2.5 border text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  {t("status")}
                </th>
                <th className="p-2.5 w-fit border border-zinc-300 text-center text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filterdTasks?.map((task: TaskTypes, index: number) => (
                <>
                  <tr key={`task-${index + 1}`} className="bg-white">
                    <td className="p-2.5 border text-center w-full  border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                      {task.image ? (
                        <img
                          className="w-12 h-12 mx-auto"
                          src={task.image}
                          alt="user"
                        />
                      ) : (
                        <UserIcon className="w-8 h-8 mx-auto" />
                      )}
                    </td>
                    <td className="p-2.5 border text-center border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                      {task.details.title} <br />
                      <span className="text-sm font-normal">
                        {new Date(task.created_at || "").toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </td>
                    <td className="p-2.5 border  text-center border-zinc-300">
                      <div
                        className={`px-4 mx-auto w-fit py-2 rounded-[30px] flex justify-center items-center
                      ${
                        task.status === "pending"
                          ? "bg-yellow-400"
                          : task.status === "done"
                          ? "bg-green-500"
                          : "bg-red-400"
                      }`}
                      >
                        <div className="text-black text-lg font-normal font-['Libre_Baskerville']">
                          {task.status}
                        </div>
                      </div>
                    </td>
                    <td className="p-2.5 border w-fit border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                      <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
                        <button
                          disabled={task.status !== "pending"}
                          onClick={() => toggleOfferPopup(task.id)}
                          className={`w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                            task.status !== "pending"
                              ? "bg-green-200 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white font-bold rounded-md transition duration-300 ease-in-out`}
                        >
                          {t("add_offer")}
                        </button>

                        <button
                          onClick={() => {
                            toggleDetails(task.id);
                            setCurrentTaskId(task.id);
                          }}
                          className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-md transition duration-300 ease-in-out"
                        >
                          {openCollapseId === task.id ? "Hide" : "Details"}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {openCollapseId === task.id && (
                    <tr key={`details-${task.id}`}>
                      <td colSpan={4} className="border border-zinc-300 p-0">
                        {renderTaskDetails(task.details)}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Offer Popup */}
      {showOfferPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            ref={offerPopupRef}
            className="w-full max-w-md bg-white rounded-2xl flex flex-col justify-start items-start gap-6 p-6"
          >
            <div className="self-stretch justify-start text-blue-950 text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">
              {t("add_your_offer")}
            </div>
            <div className="self-stretch flex flex-col gap-4 w-full">
              <label className="text-black text-lg font-bold font-['Libre_Baskerville']">
                {t("price")}
              </label>
              <input
                type="number"
                value={offerPrice?.price}
                onChange={(e) =>
                  setOfferPrice((prev) => ({
                    price: e.target.value,
                    message: prev?.message || "",
                  }))
                }
                placeholder={t("enter_your_price")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-black text-lg font-bold font-['Libre_Baskerville']">
                {t("message")}
              </label>
              <textarea
                value={offerPrice?.message}
                onChange={(e) =>
                  setOfferPrice((prev) => ({
                    price: prev?.price || "",
                    message: e.target.value,
                  }))
                }
                placeholder={t("enter_your_price")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowOfferPopup(false)}
                  className="px-6 py-2 rounded-md border border-blue-950 text-blue-950 font-bold transition duration-300 ease-in-out hover:bg-blue-100"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => currentTaskId && submitOffer(currentTaskId)}
                  className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold transition duration-300 ease-in-out"
                >
                  {t("submit_offer")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsTable;
