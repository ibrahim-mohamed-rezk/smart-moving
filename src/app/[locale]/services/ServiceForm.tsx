"use client";

import { postData } from "@/libs/axios/server";
import { useState } from "react";
import { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { ServiceFormData } from "@/libs/types/types";
import { companyRelocationInputs, movingFurnitureInputs, privateMovingInputs, storageInputs } from "@/libs/data/data";

const forms: Record<string, ServiceFormData> = {
  "private-moving": privateMovingInputs,
  storage: storageInputs,
  "moving-individual-furniture-white-goods": movingFurnitureInputs,
  "company-relocation": companyRelocationInputs,
};

const ServiceForm = ({
  service_id,
  service,
  token,
}: {
  service_id: string;
  service: string;
  token: string | undefined;
}) => {
  const [squareMeters, setSquareMeters] = useState<number>();
  const [formData, setFormData] = useState({
    service_id,
    square_meters: squareMeters,
    details: {},
  });
  const handleSubmit = async () => {
    try {
      const response = await postData(
        "request/service",
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
      );
      toast.success("Request sent successfully");
      return response.data;
    } catch (error) {
      toast.error("something went wrong");
      throw error;
    }
  };

  if(!forms[service]) {
    return (
      <div className="bg-white container mx-auto mt-[clamp(20px,5vw,120px)] text-center rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
        Comming soon
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-[clamp(20px,5vw,120px)] w-full flex-grow py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8">
        {/* first part */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-6 text-[#192953] flex items-center">
            {forms[service]?.firstPart?.title}
          </h2>
          <div className="space-y-5">
            {forms[service]?.out_address?.map((input) => {
              switch (input.type) {
                case "text":
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                        {input.title}
                      </label>
                      <input
                        type="text"
                        name={input.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                  );
                case "textarea":
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                        {input.title}
                      </label>
                      <textarea
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        name={input.name}
                        className="flex-1 h-[100px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      ></textarea>
                    </div>
                  );
                case "select": {
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                        {input.title}
                      </label>
                      <select
                        name={input.name}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
                      >
                        {input.options?.map((option) => {
                          return (
                            <option key={option.value} value={option.value}>{option.title}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
                case "radio": {
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                        {input.title}
                      </label>

                      <div className="flex items-center space-x-6">
                        {input.options?.map((option) => {
                          return (
                            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [input.name]: option.value,
                                  }))
                                }
                                className="form-radio text-blue-600 h-4 w-4"
                              />
                              <span className="text-sm">{option.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                case "range": {
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                        {input.title}
                      </label>
                      <div className="flex-1">
                        <input
                          type="range"
                          min={0}
                          max={200}
                          value={squareMeters}
                          onChange={(e) => setSquareMeters(+e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0 m²</span>
                          <span className="text-sm font-medium text-blue-600">
                            {squareMeters} m²
                          </span>
                          <span className="text-xs text-gray-500">200 m²</span>
                        </div>
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
              {forms[service]?.secondPart?.title}
            </h2>
            <div className="space-y-5">
              {forms[service]?.moving_address?.map((input) => {
                switch (input.type) {
                  case "text":
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                          {input.title}
                        </label>
                        <input
                          type="text"
                          name={input.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }))
                          }
                          className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                          {input.title}
                        </label>
                        <textarea
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }))
                          }
                          name={input.name}
                          className="flex-1 h-[100px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        ></textarea>
                      </div>
                    );
                  case "select": {
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                          {input.title}
                        </label>
                        <select
                          name={input.name}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }))
                          }
                          className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
                        >
                          {input.options?.map((option) => {
                            return (
                              <option key={option.value} value={option.value}>
                                {option.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  }
                  case "radio": {
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                          {input.title}
                        </label>

                        <div className="flex items-center space-x-6">
                          {input.options?.map((option) => {
                            return (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  onChange={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      [input.name]: option.value,
                                    }))
                                  }
                                  className="form-radio text-blue-600 h-4 w-4"
                                />
                                <span className="text-sm">{option.title}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  case "range": {
                    return (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                          {input.title}
                        </label>
                        <div className="flex-1">
                          <input
                            type="range"
                            min={0}
                            max={200}
                            value={squareMeters}
                            onChange={(e) => setSquareMeters(+e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">0 m²</span>
                            <span className="text-sm font-medium text-blue-600">
                              {squareMeters} m²
                            </span>
                            <span className="text-xs text-gray-500">
                              200 m²
                            </span>
                          </div>
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
          Submit Request
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
