// pages/MovingFormPage.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";

const MovingFormPage: React.FC = () => {
  const tabs = [
    "Private Moving",
    "Company Relocation",
    "Moving Inventory Goods",
    "Storage",
    "Taxi",
  ];
  const [activeTab, setActiveTab] = useState<string>("Company Relocation");
  const [squareMeters, setSquareMeters] = useState<number>(50);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative w-full h-64 sm:h-72 md:h-96 bg-gradient-to-r from-[#0F1A36] to-[#192953] overflow-hidden">
        <Image
          src={"/image.png"}
          alt="Moving background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 z-10">
          <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-center mb-8">
              Services of Move
            </h1>
            
            {/* Tabs Container */}
            <div className="w-full max-w-4xl overflow-x-auto rounded-xl bg-white/10 p-1.5 backdrop-blur-sm">
              <div className="inline-flex w-full min-w-max rounded-lg shadow-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-blue-600 text-white rounded-lg shadow-md"
                        : "text-white hover:bg-white/20 rounded-lg"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto w-full flex-grow px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Moving Out Address */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-[#192953] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Moving out address
            </h2>
            <div className="space-y-5">
              {/* FRA address */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">FRA address</label>
                <input
                  type="text"
                  className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Enter origin address"
                />
              </div>
              
              {/* Floor address */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                  Address, possibly floor
                </label>
                <input
                  type="text"
                  className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Apartment, floor, etc."
                />
              </div>

              {/* Elevator */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">Elevator</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="outElevator"
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="outElevator"
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Square meters */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                  Number of square meters
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
                    <span className="text-sm font-medium text-blue-600">{squareMeters} m²</span>
                    <span className="text-xs text-gray-500">200 m²</span>
                  </div>
                </div>
              </div>

              {/* Furnishing */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">Furnishing</label>
                <select className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white">
                  <option value="">Select furnishing type</option>
                  <option value="fully">Fully Furnished</option>
                  <option value="semi">Semi Furnished</option>
                  <option value="not">Not Furnished</option>
                </select>
              </div>
            </div>
          </div>

          {/* Moving In Address */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-[#192953] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Moving address
            </h2>
            <div className="space-y-5">
              {/* TO address */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">TO address</label>
                <input
                  type="text"
                  className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Enter destination address"
                />
              </div>
              
              {/* Floor address */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                  Address, possibly floor
                </label>
                <input
                  type="text"
                  className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  placeholder="Apartment, floor, etc."
                />
              </div>

              {/* Elevator */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">Elevator</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="inElevator"
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="inElevator"
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>

              {/* Service level */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">Service level</label>
                <select className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white">
                  <option value="">Select service level</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Begin date */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                  When do you want the task to begin?
                </label>
                <select className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white">
                  <option value="">Select timeframe</option>
                  <option value="asap">ASAP</option>
                  <option value="week">Within a week</option>
                  <option value="later">Later</option>
                </select>
              </div>

              {/* Quotes from */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="sm:w-1/3 text-sm font-medium text-gray-700">
                  Get quotes from
                </label>
                <select className="flex-1 h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white">
                  <option value="">Select number of quotes</option>
                  <option value="1">1 company</option>
                  <option value="3">3 companies</option>
                  <option value="all">All available</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center lg:justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            Submit Request
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovingFormPage;