import { Link } from "@/i18n/routing";
import { ServiceTypes } from "@/libs/types/types";

const CompanyOffers = ({ services }: { services: ServiceTypes[] }) => {
  return (
    <div className="flex flex-col bg-[#F0F0F0] rounded-[16px] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="self-stretch w-full p-6 inline-flex flex-col justify-center items-end gap-6">
          <div className="self-stretch justify-start text-blue-950 text-4xl font-bold font-['Libre_Baskerville']">
            Select Service
          </div>
          <div className="self-stretch flex w-full flex-col justify-center items-center gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                data-property-1="Frame 87"
                className="self-stretch p-6 bg-zinc-100 rounded-2xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.08)] inline-flex justify-between items-center"
              >
                <div className="flex-1 inline-flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-3xl font-bold font-['Libre_Baskerville']">
                    {service.title}
                  </div>
                  <div className="text-center justify-start text-black/60 text-xl font-bold font-['Libre_Baskerville']">
                    {service.description}
                  </div>
                </div>
                <Link
                  href={`/services?service=${service.slug}&service_id=${service.id}`}
                  className="p-4 bg-white rounded-[100px] flex justify-center items-center gap-2.5"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.3336 20H6.66699"
                      stroke="#192953"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.0002 28.3337C25.0002 28.3337 33.3333 22.1963 33.3333 20.0003C33.3333 17.8043 25 11.667 25 11.667"
                      stroke="#192953"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOffers;
