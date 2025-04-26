// pages/MovingFormPage.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
// import bgImage from "../public/image.png";
import bgImage from "../../../../public/image.png";


const tabs = [
    "Private Moving",
    "Company Relocation",
    "Moving Inventory Goods",
    "Storage",
    "Taxi",
];

const MovingFormPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Company Relocation");
    const [squareMeters, setSquareMeters] = useState<number>(50);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative w-full h-48 sm:h-64 md:h-80">
                <Image
                    src={bgImage}
                    alt="Moving background"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase text-center">
                        services of move
                    </h1>
                    <div className="mt-3 w-full max-w-3xl overflow-x-auto">
                        <div className="inline-flex bg-white rounded-full shadow-lg">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors focus:outline-none ${activeTab === tab
                                        ? "bg-[#192953] text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="container mx-auto flex-grow px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Moving Out Address */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-6">Moving out address</h2>
                    <div className="space-y-4">
                        {/* FRA address */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">FRA address</label>
                            <input
                                type="text"
                                className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Floor address */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Address, possibly floor</label>
                            <input
                                type="text"
                                className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Elevator */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Elevator</label>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="outElevator"
                                        className="form-radio text-blue-600 h-4 w-4"
                                    />
                                    <span className="text-sm">Yes</span>
                                </label>
                                <label className="flex items-center space-x-2">
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
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Number of square meters</label>
                            <div className="flex-1">
                                <input
                                    type="range"
                                    min={0}
                                    max={200}
                                    value={squareMeters}
                                    onChange={(e) => setSquareMeters(+e.target.value)}
                                    className="w-full"
                                />
                                <div className="text-sm text-gray-600 mt-1">{squareMeters} m²</div>
                            </div>
                        </div>

                        {/* Furnishing */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Furnishing</label>
                            <select className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>None</option>
                                <option>Fully Furnished</option>
                                <option>Semi Furnished</option>
                                <option>Not Furnished</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Moving In Address */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-6">Moving address</h2>
                    <div className="space-y-4">
                        {/* TO address */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">TO address</label>
                            <input
                                type="text"
                                className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Floor address */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Address, possibly floor</label>
                            <input
                                type="text"
                                className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Elevator */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Elevator</label>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="inElevator"
                                        className="form-radio text-blue-600 h-4 w-4"
                                    />
                                    <span className="text-sm">Yes</span>
                                </label>
                                <label className="flex items-center space-x-2">
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
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Service level</label>
                            <select className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>None</option>
                                <option>Standard</option>
                                <option>Premium</option>
                            </select>
                        </div>

                        {/* Begin date */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">When do you want the task to begin?</label>
                            <select className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>None</option>
                                <option>ASAP</option>
                                <option>Within a week</option>
                                <option>Later</option>
                            </select>
                        </div>

                        {/* Quotes from */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/3 text-sm font-medium">Get quotes from</label>
                            <select className="flex-1 h-10 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>None</option>
                                <option>1 company</option>
                                <option>3 companies</option>
                                <option>All available</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button className="bg-[#192953] hover:bg-blue-800 text-white font-semibold px-16 py-3 rounded-2xl">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovingFormPage;