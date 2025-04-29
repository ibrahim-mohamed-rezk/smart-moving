import Image from "next/image";
import { MoveRight } from "lucide-react";
import logo from "../../../public/HeroSection.png";
import or from "../../../public/OR.png";
import image from "../../../public/image0.png";
import BestCompanies from "@/components/home/BestCompanies";
import LatestReviews from "@/components/home/LatestReviews";
import { getData } from "@/libs/axios/server";
import { ServiceTypes } from "@/libs/types/types";
import { AxiosHeaders } from "axios";

const HomePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const feachData = async () => {
    try {
      const response = await getData(
        "home",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { services, hero_section, about_us, companies, reviews } =
    await feachData();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#0E172F] text-white px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <h2
              dangerouslySetInnerHTML={{ __html: hero_section?.name }}
              className="text-[clamp(2.5rem,5vw,6rem)] md:text-4xl font-bold leading-snug font-['franklin-gothic-heavy']"
            />

            <p
              dangerouslySetInnerHTML={{
                __html: hero_section?.description || "",
              }}
              className="list-disc pl-6 mt-6 space-y-2 text-[clamp(1rem,2vw,1.5rem)] text-gray font-['franklin-gothic-heavy'] font-bold"
            />

            <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 font-['libre-baskerville'] bg-[#0E1B4D] text-white text-sm rounded-full hover:bg-[#1c2a63] transition">
              <MoveRight className="w-4 h-4 " />
              Select your move now
            </button>
          </div>
          <Image
            src={hero_section?.image || logo}
            alt="Smart Moving"
            width={700}
            height={400}
            className="object-contain max-w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,4rem)]">
        <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[100%] tracking-[0] text-center font-['franklin-gothic-heavy'] mb-10">
          services of move
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service: ServiceTypes, idx: number) => (
            <div
              key={idx}
              className="relative bg-[#F3F4F6] p-10 rounded-xl text-center border shadow-md transition-all duration-300 group my-5 mx-3 hover:bg-[#0E172F] hover:text-white"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow">
                <div className="text-[#0E172F]">
                  <Image
                    src={service.image}
                    alt="Service Logo"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <h4 className="text-lg font-extrabold mt-10 mb-3 text-[#0E172F] group-hover:text-white transition-colors">
                {service.title}
              </h4>
              <p className="text-sm text-gray-700 mb-6 max-w-xs mx-auto group-hover:text-white transition-colors">
                {service.description}
              </p>
              <div className="mx-auto w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-[#0E172F]">
                <span className="text-2xl">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#F3F8FF] py-[clamp(2rem,6vw,5rem)] px-[clamp(1rem,5vw,4rem)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">{about_us.title}</h3>
            <p
              dangerouslySetInnerHTML={{ __html: about_us.description }}
              className="text-base text-[#7FB63D] mb-4"
            />
            <ul className="text-base space-y-4 text-[#7FB63D]">
              {Array.isArray(about_us.keywords) ? (
                about_us.keywords.map((text: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7FB63D] text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span>{text}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7FB63D] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <span>{about_us.keywords}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="relative">
            <Image src={or} alt="Or Section" className="w-full max-h-dvh" />
            <div className="absolute bottom-15 hidden lg:flex md:flex  left-0 p-8 border-8 rounded-full border-amber-50 bg-[#0F152F] -translate-x-1/2">
              <Image src={image} alt="Icon" width={80} height={80} />
            </div>
          </div>
        </div>
        <p className="text-base mt-6 text-[#7FB63D] font-bold text-center w-full">
          Let us handle the heavy lifting - you focus on the excitement of your
          new beginning!
        </p>
      </section>

      {/* Best Companies Section */}
      <BestCompanies companies={companies} />

      {/* Latest Reviews Section */}
      <LatestReviews reviews={reviews} />
    </div>
  );
};

export default HomePage;
