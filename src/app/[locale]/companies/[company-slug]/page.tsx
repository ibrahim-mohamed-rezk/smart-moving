import { Link } from "@/i18n/routing";
import { User, Phone, MapPin } from "lucide-react";
import AboutCompany from "./AboutCompany";
import CompanyFeedbacks from "./CompanyFeedbacks";
import CompanyOffers from "./CompanyOffers";
import CompanyPriceList from "./CompanyPriceList";

interface Tab {
  id: string;
  label: string;
}

const CompanyHero = async ({
  searchParams,
  params,
}: {
  params: Promise<{ "company-slug": string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { "company-slug": companySlug } = await params;
  const { page } = await searchParams;

  const tabs: Tab[] = [
    { id: "about", label: "About Us" },
    { id: "feedbacks", label: "Feedbacks" },
    { id: "offer", label: "Get an offer" },
    { id: "prices", label: "Price lists" },
  ];

  return (
    <header className=" text-white w-full  ">
      {/* Main header content */}
      <div className="bg-blue-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-5">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* Company info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-white rounded-2xl outline-1 outline-indigo-950 flex items-center justify-center overflow-hidden">
                <img
                  className="w-3/4 h-auto"
                  src="/api/placeholder/180/120"
                  alt="Company"
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-['Libre_Baskerville']">
                    Name of company
                  </h1>
                  <div className="flex items-center gap-2">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7351 8.65233L17.7159 6.67157C19.9462 4.44128 22.866 3.51617 25.9562 3.365C27.1582 3.3062 27.7591 3.2768 28.241 3.75872C28.723 4.24063 28.6935 4.84159 28.6347 6.04353C28.4835 9.13368 27.5584 12.0536 25.3282 14.2838L23.3474 16.2646C21.7162 17.8958 21.2524 18.3597 21.5948 20.129C21.9328 21.4806 22.2599 22.7894 21.2771 23.7722C20.085 24.9643 18.9975 24.9643 17.8054 23.7722L8.22748 14.1943C7.03536 13.0022 7.03532 11.9147 8.22748 10.7226C9.21027 9.7398 10.5191 10.0669 11.8707 10.4049C13.64 10.7473 14.1039 10.2835 15.7351 8.65233Z"
                        stroke="#7FB63D"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.6613 9.33301H22.6733"
                        stroke="#7FB63D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.33337 28.6667L10 22"
                        stroke="#7FB63D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11.3334 28.6667L14 26"
                        stroke="#7FB63D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M3.33337 20.6667L6.00004 18"
                        stroke="#7FB63D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>

                    <span className="text-base sm:text-lg lg:text-xl font-bold font-['Libre_Baskerville']">
                      Very active on the site
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-white rounded-full flex items-center gap-1">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29.3334 13.4663C29.4667 12.7996 28.9334 11.9996 28.2667 11.9996L20.6667 10.9329L17.2 3.99959C17.0667 3.73293 16.9334 3.59959 16.6667 3.46626C16 3.06626 15.2 3.33293 14.8 3.99959L11.4667 10.9329L3.86669 11.9996C3.46669 11.9996 3.20002 12.1329 3.06669 12.3996C2.53335 12.9329 2.53335 13.7329 3.06669 14.2663L8.53335 19.5996L7.20002 27.1996C7.20002 27.4663 7.20002 27.7329 7.33335 27.9996C7.73335 28.6663 8.53335 28.9329 9.20002 28.5329L16 24.9329L22.8 28.5329C22.9334 28.6663 23.2 28.6663 23.4667 28.6663C23.6 28.6663 23.6 28.6663 23.7334 28.6663C24.4 28.5329 24.9334 27.8663 24.8 27.0663L23.4667 19.4663L28.9334 14.1329C29.2 13.9996 29.3334 13.7329 29.3334 13.4663Z"
                        fill="#FFC107"
                        fill-opacity="0.4"
                      />
                    </svg>

                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Libre_Baskerville'] text-yellow-400/40">
                      4.5
                    </span>
                  </div>
                  <span className="text-base sm:text-lg lg:text-xl font-bold font-['Libre_Baskerville'] text-stone-300">
                    ( 119 ratings )
                  </span>
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div className="w-full sm:w-96 p-4 rounded-2xl  outline-1 outline-white flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-white" />
                <span className="text-lg lg:text-xl font-bold font-['Libre_Baskerville']">
                  Motasem Yousef
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-6 h-6 text-white" />
                <span className="text-lg lg:text-xl font-bold font-['Libre_Baskerville']">
                  Kjaerslund 5 - 8260 Viby Jutland
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-6 h-6 text-white" />
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-bold font-['Libre_Baskerville']">
                    Phone 4220 4145
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 md:mt-20">
            <div className="flex flex-wrap gap-4 sm:gap-8">
              {tabs.map((tab) => (
                <Link
                  href={`/companies/${companySlug}?page=${tab.label.toLowerCase()}`}
                  key={tab.id}
                  className={`pb-2 text-xl sm:text-2xl lg:text-3xl font-bold font-['Libre_Baskerville'] relative ${
                    page === tab.label.toLocaleLowerCase()
                      ? "text-white"
                      : "text-stone-300 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  {page === tab.label.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform translate-y-1"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-5">
        {page === "about us" && <AboutCompany />}
        {page === "feedbacks" && <CompanyFeedbacks />}
        {page === "get an offer" && <CompanyOffers />}
        {page === "price lists" && <CompanyPriceList />}
      </div>
    </header>
  );
};

export default CompanyHero;
