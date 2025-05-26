"use client";
import { Link } from "@/i18n/routing";
// import { postData } from "@/libs/axios/server";
import { TaskTypes } from "@/libs/types/types";
// import axios, { AxiosHeaders } from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

const TaskCard = ({ task, token }: { task: TaskTypes; token: string }) => {
  // const t = useTranslations("profile");
  // const locale = useLocale();
  // const [status, setStatus] = useState(task.status);
  const [count, setCount] = useState(0);

  // const ChangeStatus = async (status: string) => {
  //   try {
  //     await postData(
  //       `customer/change-status/${task.id}`,
  //       { status },
  //       new AxiosHeaders({
  //         lang: locale,
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       })
  //     );
  //     toast.success(t("Status changed successfully"));
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data?.msg || "An error occurred");
  //     } else {
  //       toast.error("An unexpected error occurred");
  //     }
  //     throw error;
  //   }
  // };

  useEffect(() => {
    task?.offers?.forEach((offer) => {
      if (offer.status === "hold") {
        setCount((prevCount) => prevCount + 1);
      }
    });
  }, [task]);

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-2xl inline-flex flex-col justify-center items-start gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-blue-950 text-xl md:text-3xl font-bold font-['Libre_Baskerville']">
          {task.details?.title}
        </div>
        <Link href={`/myprofile?page=task-offers&task=${task.id}`}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.3336 20H6.66699"
              stroke="#192953"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.0007 28.3337C25.0007 28.3337 33.3338 22.1963 33.3338 20.0003C33.3338 17.8043 25.0005 11.667 25.0005 11.667"
              stroke="#192953"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="self-stretch flex flex-col justify-center items-start gap-3 md:gap-4">
        <div className="self-stretch justify-start text-black/60 text-base md:text-xl font-bold font-['Libre_Baskerville']">
          {task.details?.description}
        </div>
        <div className="self-stretch inline-flex justify-between items-center flex-wrap gap-2">
          <div className="px-3 py-1 md:px-5 bg-sky-500 rounded-[30px] flex justify-center items-center gap-2">
            <div className="justify-start text-white text-sm md:text-lg font-normal font-['Libre_Baskerville']">
              {/* <select
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setStatus(e.target.value);
                  ChangeStatus(e.target.value);
                }}
                className="bg-transparent border-none outline-none cursor-pointer text-white text-sm md:text-lg font-normal font-['Libre_Baskerville'] hover:text-sky-200 transition-colors"
              >
                {[
                  { title: t("pending"), value: "pending" },
                  { title: t("processing"), value: "processing" },
                  { title: t("done"), value: "done" },
                ].map((status) => (
                  <option
                    key={status.value}
                    value={status.value}
                    className="bg-sky-500 text-white"
                  >
                    {status.title}
                  </option>
                ))}
              </select> */}
              <div>{task.status}</div>
            </div>
          </div>
          {count > 0 && (
            <div className="flex justify-start items-center gap-1">
              <div className="border rounded-full border-red-500 w-6 h-6 flex items-center justify-center text-red-500 text-xs md:text-sm font-normal font-['Libre_Baskerville']">
                {count}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
