// pages/MovingFormPage.tsx

import Image from "next/image";
import { Link } from "@/i18n/routing";
import ServiceForm from "./ServiceForm";

const MovingFormPage = async ({ searchParams }: { searchParams: Promise<{ service: string }> }) => {
  const tabs = [
    { title: "Private Moving", slug: "private-moving" },
    { title: "Company Relocation", slug: "company-relocation" },
    { title: "Moving Inventory Goods", slug: "moving-inventory-goods" },
    { title: "Storage", slug: "storage" },
    { title: "Taxi", slug: "taxi" },
  ];
  const { service } = await searchParams;
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative w-full h-64 sm:h-72 md:h-96 bg-gradient-to-r from-[#0F1A36] to-[#192953]">
        <Image
          src={"/image.png"}
          alt="Moving background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40 mix-blend-overlay"
        />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 flex flex-col justify-center items-center px-4 z-10">
          <div className=" w-full mx-auto flex flex-col items-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-center mb-8">
              Services of Move
            </h1>

            {/* Tabs Container */}
            <div className="w-full flex items-center justify-center rounded-xl relative translate-y-1/2 bg-white p-[clamp(5px,0.833vw,106px)]">
              {tabs.map((tab) => (
                <Link
                  href={`/services?service=${tab.slug}`}
                  key={tab.slug}
                  className={`px-[clamp(5px,1.25vw,50px)] font-["libre_baskerville"] py-3 text-[clamp(8px,1.146vw,52px)] font-medium whitespace-nowrap transition-all duration-200 ${
                    service === tab.slug
                      ? "bg-blue-600 text-white rounded-lg shadow-md"
                      : "text-black/40 hover:bg-white/20 rounded-lg"
                  }`}
                >
                  {tab.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <ServiceForm />
    </div>
  );
};

export default MovingFormPage;
