import Image from "next/image";
import { MoveRight } from "lucide-react";
import BestCompanies from "@/components/home/BestCompanies";
import LatestReviews from "@/components/home/LatestReviews";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { getTranslations } from "next-intl/server";
import MobileServiceSwiper from "@/components/home/MobileServiceSwiper";


const HomePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations("home");
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
    <div className="bg-[#F0F0F0] w-full">
      {/* Hero Section */}
      <section className="bg-[#0F152F] max-w-full overflow-hidden text-white px-[clamp(1rem,5vw,4rem)] py-[clamp(2rem,6vw,5rem)]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-[clamp(2rem,5vw,5rem)]">
          <div>
            <h2
              dangerouslySetInnerHTML={{ __html: hero_section?.name }}
              className="text-[clamp(25px,3.333vw,64px)] capitalize font-bold leading-snug font-['franklin-gothic-heavy']"
            />

            <p
              dangerouslySetInnerHTML={{
                __html: hero_section?.description || "",
              }}
              className="list-disc hero-list pl-6 mt-6 space-y-2 text-[clamp(18px,1.458vw,28px)] text-gray font-['franklin-gothic-heavy'] font-bold"
            />

            <button className="mt-6 inline-flex items-center text-[clamp(18px,1.042vw,120px)] gap-[clamp(4px,0.417vw,18px)] px-[clamp(5px,1.25vw,124px)] py-[clamp(4px,0.625vw,112px)] font-['libre-baskerville'] bg-[#0E1B4D] text-white text-sm rounded-full hover:bg-[#1c2a63] transition">
              <MoveRight className="w-[clamp(15px,0.833vw,16px)] h-[clamp(15px,0.833vw,106px)] " />
              {t("select_move_now")}
            </button>
          </div>
          <Image
            src={hero_section?.image || "/HeroSection.png"}
            alt="Smart Moving"
            width={700}
            height={400}
            className="object-contain w-[clamp(300px,42.448vw,1007px)] h-[clamp(270px,21.458vw,508px)]"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="text-center py-[clamp(2rem,6vw,4rem)] container mx-auto">
        <h3 className="text-[clamp(18px,3.333vw,64px)] text-[#192953] capitalize font-normal leading-[100%] tracking-[0] text-center font-['franklin-gothic-heavy'] mb-[clamp(20px,2.083vw,140px)]">
          {t("services_of_move")}
        </h3>
       
        <MobileServiceSwiper services={services} />
      </section>

      {/* About Section */}
      <section className="bg-[#F3F8FF] px-[10px] py-[clamp(10px,2.5vw,48px)] w-full mt-[clamp(90px,10.417vw,200px)]">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between gap-[clamp(20px,4.167vw,80px)] items-start">
          <div className="order-2 sm:oreder-1">
            <h3 className="text-[clamp(14px,3.333vw,64px)] relative text-[#192953] capitalize font-bold mb-4">
              <span className="z-1 relative">{t("about_us.title")}</span>
              <span className="absolute flex items-center justify-center -start-[clamp(10px,1.562vw,30px)] z-0 top-1/2 ">
                <svg
                  className="w-[clamp(20px,4.635vw,89px)] h-[clamp(20px,4.635vw,89px)]"
                  viewBox="0 0 89 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M48.2083 81.5834C45.1741 81.5834 42.2757 80.3181 36.4785 77.7876C29.7124 74.8343 24.5326 72.5733 20.939 70.4584H7.41663M48.2083 81.5834C51.2425 81.5834 54.1409 80.3181 59.9381 77.7876C74.3684 71.489 81.5833 68.3395 81.5833 63.0417V24.1042M48.2083 81.5834V40.7917M14.8333 24.1042V35.2292"
                    stroke="#93BD5F"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34.5837 35.9389L23.7509 30.6971C17.8059 27.8204 14.8334 26.382 14.8334 24.1042C14.8334 21.8265 17.8059 20.3881 23.7509 17.5114L34.5837 12.2695C41.2693 9.03436 44.6124 7.41675 48.2084 7.41675C51.8043 7.41675 55.1474 9.03432 61.8332 12.2695L72.6659 17.5114C78.6108 20.3881 81.5834 21.8265 81.5834 24.1042C81.5834 26.382 78.6108 27.8204 72.6659 30.6971L61.8332 35.9389C55.1474 39.1742 51.8043 40.7917 48.2084 40.7917C44.6124 40.7917 41.2693 39.1742 34.5837 35.9389Z"
                    stroke="#93BD5F"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.41663 48.2083H18.5416"
                    stroke="#93BD5F"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.41663 59.3333H18.5416"
                    stroke="#93BD5F"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </h3>
            <p
              dangerouslySetInnerHTML={{ __html: about_us.description }}
              className="text-base text-[#7FB63D] my-[clamp(10px,2.604vw,50px)]"
            />

            <h3 className="text-[clamp(18px,1.875vw,36px)] relative text-[#7FB63D] capitalize font-bold">
              {t("about_us.Why choose us")}
            </h3>

            <ul className=" flex flex-col mt-[10px]  gap-[clamp(8px,0.833vw,16px)] ps-[clamp(10px,1.562vw,30px)] text-[#7FB63D]">
              {Array.isArray(about_us.keywords) ? (
                about_us.keywords.map((text: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-[clamp(5px,0.625vw,12px)]"
                  >
                    <div className="w-[clamp(25px,3.333vw,64px)] h-[clamp(25px,3.333vw,64px)] rounded-full bg-[#7FB63D] text-white flex items-center justify-center font-bold text-[clamp(18px,1.667vw,32px)] ">
                      {idx + 1}
                    </div>
                    <span className="text-[clamp(16px,1.458vw,28px)] ">
                      {text}
                    </span>
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
          <div className="relative order-1 sm:order-2 w-[80%] mx-auto  sm:w-[clamp(200px,30.625vw,588px)] -mt-[clamp(100px,10.515vw,175px)]">
            <Image
              src={"/aboutImage.png"}
              alt="Or Section"
              width={700}
              height={400}
              className="w-full max-h-dvh"
            />
            <div className="absolute bottom-15 hidden lg:flex md:flex left-0 p-8 border-8 rounded-full border-amber-50 bg-[#0F152F] -translate-x-1/2">
              <Image src={"/image0.png"} alt="Icon" width={80} height={80} />
            </div>
          </div>
        </div>
        <p className="text-[clamp(16px,1.875vw,36px)] py-3 container mx-auto text-[#7FB63D] font-bold text-start w-full">
          {t("handle_heavy_lifting")}
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
