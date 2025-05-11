"use client";

import { getData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";

const TableActionButtons = ({ id, token }: { id: number; token: string }) => {
  const acceptOffer = async () => {
    try {
      await getData(
        `customer/accept-api/${id}`,
        {},
        new AxiosHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  return (
    <div className="flex mx-auto w-fit items-center justify-center gap-2 md:gap-4">
      <button
        onClick={acceptOffer}
        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-300 ease-in-out"
      >
        Accept
      </button>
      <button onClick={declineOffer} className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition duration-300 ease-in-out">
        Decline
      </button>
    </div>
  );
};

export default TableActionButtons;
