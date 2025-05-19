"use client";

import { postData } from "@/libs/axios/server";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { ServiceFormData } from "@/libs/types/types";
import { useTranslations } from "next-intl";
import {
  companyRelocationInputs,
  movingFurnitureInputs,
  privateMovingInputs,
  storageInputs,
} from "@/libs/data/data";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const forms: Record<string, ServiceFormData> = {
  "private-moving": privateMovingInputs,
  storage: storageInputs,
  "moving-individual-furniture-white-goods": movingFurnitureInputs,
  "company-relocation": companyRelocationInputs,
};

const ServiceForm = ({
  service,
  token,
  service_id,
}: {
  service: string;
    token: string | undefined;
    service_id: string | null;
}) => {
  const t = useTranslations("services");
  const [squareMeters, setSquareMeters] = useState<number>();
  const router = useRouter();
  const params = useSearchParams();
  const [formData, setFormData] = useState({
    service_id: params?.get("service_id"),
    details: {
      square_meters: squareMeters,
      moving_address: {},
      title: service
        .replace("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    },
  });

  useEffect(() => {
    setFormData({
      ...formData,
      service_id: service_id,
    });
  }, [params, service_id]);
  const handleSubmit = async () => {
    try {
      await postData(
        "request/service",
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
      );

      router.push("/myprofile?page=tasks");
      toast.success("Request sent successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  if (!forms[service]) {
    return (
      <div className=" w-fit  mx-auto flex items-center justify-center mt-[clamp(20px,5vw,120px)] text-center">
        <Image
          src="/soon.png"
          alt="comming soon"
          width={100}
          height={100}
          className="w-[80%] md:w-[60%]"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[clamp(20px,5vw,120px)] w-full flex-grow py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8">
        {/* first part */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6 text-[#192953] flex items-center">
            {t(forms[service]?.firstPart?.title || "")}
          </h2>
          <div className="space-y-5">
            {forms[service]?.out_address?.map((input) => {
              switch (input.type) {
                case "text":
                  return (
                    <div className="flex flex-col space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700 md:text-base">
                        {t(input.title)}
                      </label>
                      <input
                        type="text"
                        name={t(input.name)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              [e.target.name]: e.target.value,
                            },
                          }))
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={`${t("Enter")} ${t(
                          input.title
                        ).toLowerCase()}`}
                      />
                    </div>
                  );
                case "textarea":
                  return (
                    <div className="flex flex-col space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700 md:text-base">
                        {t(input.title)}
                      </label>
                      <textarea
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              [e.target.name]: e.target.value,
                            },
                          }))
                        }
                        name={t(input.name)}
                        className="w-full p-3 min-h-32 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                        placeholder={`${t("Enter")} ${t(
                          input.title
                        ).toLowerCase()}`}
                      ></textarea>
                    </div>
                  );
                case "select": {
                  return (
                    <div className="flex flex-col space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700 md:text-base">
                        {t(input.title)}
                      </label>
                      <div className="relative">
                        <select
                          name={t(input.name)}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                [e.target.name]: e.target.value,
                              },
                            }))
                          }
                          className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                        >
                          {input.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {t(option.title)}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                }
                case "radio": {
                  return (
                    <div className="flex flex-col space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700 md:text-base">
                        {t(input.title)}
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {input.options?.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={t(input.name)}
                              value={option.value}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  details: {
                                    ...prev.details,
                                    [input.name]: option.value,
                                  },
                                }))
                              }
                              className="w-4 h-4 text-[#192953] border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {t(option.title)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                }
                case "range": {
                  return (
                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700 md:text-base">
                          {t(input.title)}
                        </label>
                        <span className="text-sm font-medium text-[#192953]">
                          {squareMeters} {t("m²")}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={squareMeters}
                        onChange={(e) => setSquareMeters(+e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#192953]"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">0 m²</span>
                        <span className="text-xs text-gray-500">200 m²</span>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>

        {/* second part optional */}
        {forms[service]?.isDivided && (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-[#192953] flex items-center">
              {t(forms[service]?.secondPart?.title || "")}
            </h2>
            <div className="space-y-5">
              {forms[service]?.moving_address?.map((input) => {
                switch (input.type) {
                  case "text":
                    return (
                      <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-700 md:text-base">
                          {t(input.title)}
                        </label>
                        <input
                          type={t("text")}
                          name={t(input.name)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                moving_address: {
                                  ...prev.details.moving_address,
                                  [e.target.name]: e.target.value,
                                },
                              },
                            }))
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder={`${t("Enter")} ${t(
                            input.title
                          ).toLowerCase()}`}
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-700 md:text-base">
                          {t(input.title)}
                        </label>
                        <textarea
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setFormData((prev) => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                moving_address: {
                                  ...prev.details.moving_address,
                                  [e.target.name]: e.target.value,
                                },
                              },
                            }))
                          }
                          name={t(input.name)}
                          className="w-full p-3 min-h-32 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                          placeholder={`${t("Enter")} ${t(
                            input.title
                          ).toLowerCase()}`}
                        ></textarea>
                      </div>
                    );
                  case "select": {
                    return (
                      <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-700 md:text-base">
                          {t(input.title)}
                        </label>
                        <div className="relative">
                          <select
                            name={t(input.name)}
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              setFormData((prev) => ({
                                ...prev,
                                details: {
                                  ...prev.details,
                                  moving_address: {
                                    ...prev.details.moving_address,
                                    [e.target.name]: e.target.value,
                                  },
                                },
                              }))
                            }
                            className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                          >
                            {input.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {t(option.title)}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  case "radio": {
                    return (
                      <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-700 md:text-base">
                          {t(input.title)}
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {input.options?.map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={t(input.name)}
                                value={t(option.value)}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    details: {
                                      ...prev.details,
                                      moving_address: {
                                        ...prev.details.moving_address,
                                        [e.target.name]: e.target.value,
                                      },
                                    },
                                  }))
                                }
                                className="w-4 h-4 text-[#192953] border-gray-300 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {t(option.title)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  case "range": {
                    return (
                      <div className="flex flex-col space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-gray-700 md:text-base">
                            {t(input.title)}
                          </label>
                          <span className="text-sm font-medium text-[#192953]">
                            {squareMeters} {t("m²")}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={200}
                          value={squareMeters}
                          onChange={(e) => setSquareMeters(+e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#192953]"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {t("0 m²")}
                          </span>
                          <span className="text-xs text-gray-500">
                            {t("200 m²")}
                          </span>
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-center lg:justify-end">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-[#192953] text-white font-semibold px-12 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          {t("Submit Request")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ServiceForm;
