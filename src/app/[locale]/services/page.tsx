// pages/MovingFormPage.tsx

import Image from "next/image";
import { Link, redirect } from "@/i18n/routing";
import ServiceForm from "./ServiceForm";
import { cookies } from "next/headers";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { ServiceTypes } from "@/libs/types/types";

const MovingFormPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service: string; service_id: string }>;
}) => {
  const { service, service_id } = await searchParams;
  const token = (await cookies()).get("token")?.value;
  const { locale } = await params;

  if (!service || !service_id) {
    return redirect({
      href: "/services?service=private-moving&service_id=4",
      locale,
    });
  }

  const feachData = async () => {
    try {
      const response = await getData(
        "services",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const tabs = await feachData();

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
            <div className="w-full shadow-[2px_4px_8px_1px_rgba(0,0,0,0.08)] flex items-center justify-center rounded-xl relative translate-y-1/2 bg-white p-[clamp(5px,0.833vw,106px)]">
              {tabs.map((tab: ServiceTypes) => (
                <Link
                  href={`/services?service=${tab.slug}&service_id=${tab.id}`}
                  key={tab.slug}
                  className={`px-[clamp(5px,1.25vw,50px)] font-["libre_baskerville"] py-3 text-[clamp(8px,1.146vw,52px)] font-medium whitespace-nowrap transition-all duration-200 ${
                    service === tab.slug
                      ? "bg-[#192953] text-white rounded-lg shadow-md"
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
      <ServiceForm token={token} service={service} service_id={service_id} />
    </div>
  );
};

export default MovingFormPage;
