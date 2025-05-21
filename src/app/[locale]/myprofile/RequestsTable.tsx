"use client";

import { useLocale, useTranslations } from "next-intl";
import { TaskDetailsTypes, TaskTypes } from "@/libs/types/types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosHeaders } from "axios";
import { postData } from "@/libs/axios/server";

const RequestsTable = ({
  tasksData,
  token,
}: {
  tasksData: TaskTypes[];
  token: string;
}) => {
  const locale = useLocale();
  const t = useTranslations();
  const [openCollapseId, setOpenCollapseId] = useState<number | null>(null);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const offerPopupRef = useRef<HTMLDivElement>(null);

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
                Moving address
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
            Add Offer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      {!tasksData || tasksData?.length === 0 ? (
        <div className="w-full md:p-8 text-center bg-white border border-zinc-300 rounded-lg">
          <p className="text-xl font-['Libre_Baskerville'] text-gray-700">
            No Requests available at the moment.
          </p>
        </div>
      ) : (
        <table className="min-w-full xl:w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-neutral-200">
              <th className="p-2.5 border w-[100px] text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                id
              </th>
              <th className="p-2.5 border text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Name
              </th>
              <th className="p-2.5 border text-center border-zinc-300 text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Status
              </th>
              <th className="p-2.5 w-fit border border-zinc-300 text-center text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasksData?.map((task: TaskTypes) => (
              <>
                <tr key={`task-${task.id}`} className="bg-white">
                  <td className="p-2.5 text-center border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.id}
                  </td>
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.details.title}
                  </td>
                  <td className="p-2.5 border border-zinc-300">
                    <div
                      className={`px-4 py-2 rounded-[30px] flex justify-center items-center
                      ${
                        task.status === "pending"
                          ? "bg-yellow-400/40"
                          : task.status === "accept"
                          ? "bg-green-500/40"
                          : "bg-red-600/40"
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
                        onClick={() => toggleOfferPopup(task.id)}
                        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
                      >
                        Add Offer
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
      )}

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
                  onClick={() => setShowOfferPopup(false)}
                  className="px-6 py-2 rounded-md border border-blue-950 text-blue-950 font-bold transition duration-300 ease-in-out hover:bg-blue-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => currentTaskId && submitOffer(currentTaskId)}
                  className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold transition duration-300 ease-in-out"
                >
                  Submit Offer
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
