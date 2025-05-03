"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ServiceTypes } from "@/libs/types/types";

import { Link } from "@/i18n/routing";


const MobileServiceSwiper = ({ services }: { services: ServiceTypes[] } ) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check
      checkMobile();

      // Add event listener for window resize
      window.addEventListener("resize", checkMobile);

      // Cleanup
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // If not mobile, render the regular services grid
  if (!isMobile) {
    return (
      <div className="md:flex hidden items-center flex-wrap justify-center gap-y-[clamp(30px,4vw,100px)] gap-x-[clamp(20px,2vw,50px)] mt-[clamp(50px,5.208vw,300px)] mx-auto">
        {services?.map((service, idx) => (
          <ServiceCard service={service} idx={idx} key={idx} />
        ))}
      </div>
    );
  }

  // For mobile, render the swiper
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={1.7}
      pagination={{ clickable: true }}
      autoplay={{ delay: 9500, disableOnInteraction: false }}
      className="w-full py-8 "
      centeredSlides={true}
      loop={true}
    >
      {services.map((service, idx) => (
        <SwiperSlide
          key={idx}
          className="py-10 w-[clamp(200px,22.042vw,450px)] max-w-[200px] "
        >
          <ServiceCard service={service} idx={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// ServiceCard component - extracted from your original code
const ServiceCard = ({ service, idx }:{ service: ServiceTypes, idx: number}) => {

  return (
    <Link
      href={`/services?service=${service.slug}&service_id=${service.id}`}
      key={idx}
      data-property-1="default"
      className="relative group flex flex-col items-center justify-center w-[clamp(210px,22.042vw,450px)] h-[clamp(250px,20.438vw,450px)]"
    >
      <div className="w-full h-full px-[clamp(5px,1.667vw,32px)] bg-zinc-100 rounded-2xl shadow-[8px_8px_16px_0px_rgba(0,0,0,0.16)] flex flex-col justify-center items-center gap-[clamp(10px,1.667vw,32px)] transition-all duration-500 ease-in-out group-hover:bg-[#0E172F] group-hover:scale-105 group-hover:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.3)]">
        <div className="self-stretch flex flex-col justify-center items-center gap-3 sm:gap-4">
          <div className="text-blue-950 text-[clamp(18px,1.675vw,36px)] font-bold font-['Libre_Baskerville'] capitalize transition-colors duration-300 ease-in-out group-hover:text-white">
            {service.title}
          </div>
          <div className="self-stretch text-center text-black/60 text-[clamp(14px,1vw,22px)] font-bold font-['Libre_Baskerville'] transition-colors duration-300 ease-in-out group-hover:text-white/80">
            {service.description}
          </div>
        </div>
        <div className="p-[clamp(5px,0.833vw,30px)] bg-white rounded-full inline-flex justify-center items-center transition-all duration-500 ease-in-out group-hover:bg-[#fff] group-hover:transform group-hover:scale-110 group-hover:shadow-lg">
          <div className="w-[clamp(20px,2.604vw,50px))] h-[clamp(20px,2.604vw,50px))] relative flex items-center justify-center">
            <svg
              className="w-[clamp(20px,2.604vw,50px))] h-[clamp(20px,2.604vw,50px))] transition-all duration-500 ease-in-out group-hover:translate-x-2"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.0002 23.9996H8.00024"
                stroke="#192953"
                className="transition-all duration-500 ease-in-out group-hover:stroke-[#192953]"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.0007 34C30.0007 34 40.0005 26.6352 40.0005 24C40.0005 21.3648 30.0005 14 30.0005 14"
                stroke="#192953"
                className="transition-all duration-500 ease-in-out group-hover:stroke-[#192953]"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[clamp(50px,5.0vw,100px)] -translate-y-1/2 h-[clamp(50px,5.0vw,100px)] p-[clamp(5px,0.833vw,30px)] absolute left-1/2 top-0 transform translate-x-[-50%] bg-zinc-100 rounded-full shadow-[10px_10px_14px_0px_rgba(0,0,0,0.16)] flex flex-col justify-center items-center transition-all duration-500 ease-in-out group-hover:bg-white group-hover:shadow-[0px_10px_25px_rgba(0,0,0,0.3)] group-hover:scale-115">
        <div className="w-full h-full relative flex items-center justify-center">
          <Image
            src={service.image}
            alt="Service Logo"
            width={50}
            height={50}
            className="object-contain w-full h-full transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3"
          />
        </div>
      </div>
    </Link>
  );
};

export default MobileServiceSwiper;
