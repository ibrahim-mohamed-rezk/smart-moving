"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { UserDataTypes } from "@/libs/types/types";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "lucide-react";

const Sidebar = ({ userData }: { userData: UserDataTypes }) => {
  const t = useTranslations("company");
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useSearchParams();
  const [activeRoute, setActiveRoute] = useState(params.get("page"));


  // Navigation handlers for sidebar
  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    router.push(`/myprofile?page=${route}`);
  };

  useEffect(() => {
    setActiveRoute(params.get("page"));
  }, [params]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-1/3 lg:w-1/4 bg-[#192953] text-white relative">
        <div className="absolute inset-0">
          <Image
            src="/side.svg"
            alt={t("background")}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        <div className="relative z-10 p-4 lg:p-8 h-full flex flex-col">
          <div className="w-full max-w-96 inline-flex flex-col justify-center items-center gap-8 lg:gap-14">
            <div className="inline-flex justify-start items-center gap-2 lg:gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative bg-white rounded-full outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex items-center justify-center">
                {/* <img
                  className="w-12 h-10 md:w-16 md:h-12 lg:w-20 lg:h-14 object-contain"
                  src="https://placehold.co/75x57"
                  alt="User avatar"
                /> */}
                <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
              </div>
              <div className="flex flex-col justify-center items-start gap-1">
                <div className="text-white text-lg md:text-xl lg:text-3xl font-bold font-['Libre_Baskerville'] break-words">
                  {userData.name}
                </div>
                <div className="justify-start max-w-full overflow-hidden text-ellipsis">
                  <span className="text-white/60 text-xs md:text-sm lg:text-lg font-bold font-['Libre_Baskerville'] truncate max-w-[180px] md:max-w-[220px] lg:max-w-full block">
                    {userData.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4 lg:gap-8">
              <button
                onClick={() => handleNavigation("personal-info")}
                className={`self-stretch p-3 lg:p-4 ${
                  activeRoute === "personal-info" ? "bg-white/90" : ""
                } rounded-2xl inline-flex justify-center items-center gap-2.5 w-full transition-all hover:bg-white`}
              >
                <div
                  className={`flex-1 justify-start ${
                    activeRoute === "personal-info"
                      ? "text-blue-950"
                      : "text-stone-300"
                  } text-base lg:text-xl font-bold font-['Libre_Baskerville']`}
                >
                  Personal Information
                </div>
              </button>
              <button
                onClick={() => handleNavigation("change-password")}
                className={`${
                  activeRoute === "change-password" ? "bg-white/90" : ""
                } self-stretch rounded-2xl p-3 lg:p-4 inline-flex justify-center items-center gap-2.5 w-full transition-all hover:bg-white/30`}
              >
                <div
                  className={`flex-1 justify-start ${
                    activeRoute === "change-password"
                      ? "text-blue-950"
                      : "text-stone-300"
                  } text-base lg:text-xl font-bold font-['Libre_Baskerville']`}
                >
                  Change Password
                </div>
              </button>
              <button
                onClick={() => handleNavigation("tasks")}
                className={`${
                  activeRoute === "tasks" ? "bg-white/90" : ""
                } self-stretch rounded-2xl p-3 lg:p-4 inline-flex justify-center items-center gap-2.5 w-full transition-all hover:bg-white/30`}
              >
                <div
                  className={`flex-1 justify-start ${
                    activeRoute === "tasks" ? "text-blue-950" : "text-stone-300"
                  } text-base  lg:text-xl font-bold font-['Libre_Baskerville']`}
                >
                  Your Tasks
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header with menu toggle */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-between p-4 text-white rounded-t-lg">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 rounded-md hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  stroke="#192953"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#192953"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`bg-[#192953] text-white rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => handleNavigation("personal-info")}
              className={`p-4 ${
                activeRoute === "personal-info" ? "bg-white/10" : ""
              }`}
            >
              <span
                className={` text-base font-bold font-['Libre_Baskerville']`}
              >
                Personal Information
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("change-password")}
              className={`p-4 text-center ${
                activeRoute === "change-password" ? "bg-white/10" : ""
              } border-t border-white/20`}
            >
              <span
                className={` text-base font-bold font-['Libre_Baskerville']`}
              >
                Change Password
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("tasks")}
              className={`p-4 text-center ${
                activeRoute === "tasks" ? "bg-white/10" : ""
              } border-t border-white/20`}
            >
              <span
                className={`text-base font-bold font-['Libre_Baskerville']`}
              >
                Your Tasks
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
