import Image from "next/image";
import { MoveRight } from "lucide-react";
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
      <section className="bg-[#0F152F] text-white px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <h2
              dangerouslySetInnerHTML={{ __html: hero_section?.name }}
              className="text-[clamp(2.5rem,5vw,6rem)] capitalize md:text-4xl font-bold leading-snug font-['franklin-gothic-heavy']"
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
            src={hero_section?.image || "/HeroSection.png"}
            alt="Smart Moving"
            width={700}
            height={400}
            className="object-contain max-w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center px-[clamp(5px,3.333vw,564px)] py-[clamp(2rem,6vw,4rem)]">
        <h3 className="text-[clamp(18px,3.333vw,164px)] text-[#192953] capitalize font-normal leading-[100%] tracking-[0] text-center font-['franklin-gothic-heavy'] mb-[clamp(20px,2.083vw,140px)]">
          services of move
        </h3>
        <div className="flex items-center flex-wrap justify-center gap-[clamp(30px,4vw,100px)] mt-[clamp(50px,5.208vw,300px)] mx-auto">
          {services.map((service: ServiceTypes, idx: number) => (
            <div
              key={idx}
              data-property-1="default"
              className="relative group flex flex-col items-center justify-center w-[clamp(250px,26.042vw,700px)] h-[clamp(250px,23.438vw,650px)]"
            >
              <div className="w-full h-full px-[clamp(5px,1.667vw,132px)] bg-zinc-100 rounded-2xl shadow-[8px_8px_16px_0px_rgba(0,0,0,0.16)] flex flex-col justify-center items-center gap-[clamp(10px,1.667vw,132px)] transition-all duration-300 hover:bg-[#0E172F]">
                <div className="self-stretch flex flex-col justify-center items-center gap-3 sm:gap-4">
                  <div className="text-blue-950 text-[clamp(18px,1.875vw,116px)] font-bold font-['Libre_Baskerville'] capitalize transition-colors group-hover:text-white hover:text-white">
                    {service.title}
                  </div>
                  <div className="self-stretch text-center text-black/60 text-[clamp(14px,1.042vw,120px)] font-bold font-['Libre_Baskerville'] transition-colors group-hover:text-white/70 hover:text-white/70">
                    {service.description}
                  </div>
                </div>
                <div className="p-[clamp(5px,0.833vw,30px)] bg-white rounded-[100px] inline-flex justify-center items-center transition-colors hover:bg-white">
                  <div className="w-[clamp(50px,3.5vw,148px)] h-[clamp(50px,3.5vw,148px)] relative flex items-center justify-center">
                    <svg
                      className="w-[clamp(50px,3.5vw,548px)] h-[clamp(50px,3.5vw,548px)]"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.0002 23.9996H8.00024"
                        stroke="#192953"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M30.0007 34C30.0007 34 40.0005 26.6352 40.0005 24C40.0005 21.3648 30.0005 14 30.0005 14"
                        stroke="#192953"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-[clamp(50px,5.0vw,296px)] -translate-y-1/2 h-[clamp(50px,5.0vw,296px)] p-[clamp(5px,0.833vw,30px)] absolute left-1/2 top-0 transform translate-x-[-50%] bg-zinc-100 rounded-[100px] shadow-[10px_10px_14px_0px_rgba(0,0,0,0.16)] flex flex-col justify-center items-center">
                <div className="w-full h-full relative flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt="Service Logo"
                    width={50}
                    height={50}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#F3F8FF] py-[clamp(2rem,6vw,5rem)] px-[clamp(1rem,5vw,4rem)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl capitalize font-bold mb-4">
              {about_us.title}
            </h3>
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
            <Image
              src={"/OR.png"}
              alt="Or Section"
              width={700}
              height={400}
              className="w-full max-h-dvh"
            />
            <div className="absolute bottom-15 hidden lg:flex md:flex  left-0 p-8 border-8 rounded-full border-amber-50 bg-[#0F152F] -translate-x-1/2">
              <Image src={"/image0.png"} alt="Icon" width={80} height={80} />
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
