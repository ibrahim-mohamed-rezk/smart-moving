"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { UserDataTypes } from "@/libs/types/types";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "lucide-react";
import axios from "axios";

const Sidebar = ({
  userData,
  token,
}: {
  userData: UserDataTypes;
  token: string;
}) => {
  const t = useTranslations("company");
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useSearchParams();
  const [activeRoute, setActiveRoute] = useState(params.get("page"));
  const [showNotification, setShowNotification] = useState(false);

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

  useEffect(() => {
    const feachData = async () => {
      if (!token) return null;
      try {
        const response = await axios.post(
          "/api/coockies/get-data-from-coockies",
          {
            key: "has_hold",
          }
        );
        setShowNotification(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    feachData();
  }, [token]);

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

        <div className="relative z-10 p-4 w-full lg:p-2 h-full flex flex-col">
          <div className="w-full max-w-96 inline-flex flex-col justify-center items-center gap-8 lg:gap-14">
            <div className="inline-flex justify-start w-full items-center gap-2 lg:gap-4">
              <div className="w-16 h-16 md:w-18 md:h-18 relative bg-white rounded-full outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex items-center justify-center">
                {userData.image ? (
                  <img
                    className="w-1full h-full"
                    src={userData.image}
                    alt="User avatar"
                  />
                ) : (
                  <UserIcon className="w-[65%] h-[65%] text-[#192953]" />
                )}
              </div>
              <div className="flex  flex-col justify-center items-start gap-1">
                <div className="text-white text-lg md:text-xl font-bold font-['Libre_Baskerville'] break-words">
                  {userData.name}
                </div>
                <div className="justify-start overflow-hidden ">
                  <span className="text-white/60 text-xs line-clamp-1 text-ellipsis overflow-hidden md:text-sm  font-bold font-['Libre_Baskerville'] truncate max-w-[180px] md:max-w-[220px] lg:max-w-full block">
                    {userData.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4 lg:gap-8">
              <button
                onClick={() => handleNavigation("personal-info")}
                className={`self-stretch p-3 lg:p-4 cursor-pointer ${
                  activeRoute === "personal-info" ? "bg-white/90" : ""
                } rounded-2xl inline-flex justify-center items-center gap-2.5 w-full transition-all hover:bg-white/30`}
              >
                <div
                  className={`flex-1 justify-start ${
                    activeRoute === "personal-info"
                      ? "text-blue-950"
                      : "text-stone-300"
                  } text-base lg:text-xl font-bold font-['Libre_Baskerville']`}
                >
                  {userData.role === "customer"
                    ? t("personal_information")
                    : t("company_information")}
                </div>
              </button>
              <button
                onClick={() => handleNavigation("change-password")}
                className={`cursor-pointer ${
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
                  {t("change_password")}
                </div>
              </button>
              {userData.role === "company" && (
                <button
                  onClick={() => handleNavigation("payment-requests")}
                  className={`cursor-pointer ${
                    activeRoute === "payment-requests" ? "bg-white/90" : ""
                  } self-stretch relative rounded-2xl p-3 lg:p-4 inline-flex justify-center items-center gap-2.5 w-full transition-all hover:bg-white/30`}
                >
                  <div
                    className={`flex-1 justify-start ${
                      activeRoute === "payment-requests"
                        ? "text-blue-950"
                        : "text-stone-300"
                    } text-base  lg:text-xl font-bold font-['Libre_Baskerville']`}
                  >
                    {t("payment requests")}
                  </div>
                </button>
              )}
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
                {t("personal_information")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("change-password")}
              className={`p-4 text-center cursor-pointer ${
                activeRoute === "change-password" ? "bg-white/10" : ""
              } border-t border-white/20`}
            >
              <span
                className={` text-base font-bold font-['Libre_Baskerville']`}
              >
                {t("change_password")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigation("tasks");
                setShowNotification(false);
              }}
              className={`p-4 text-center cursor-pointer relative ${
                activeRoute === "tasks" ? "bg-white/10" : ""
              } border-t border-white/20`}
            >
              <span
                className={`text-base font-bold font-['Libre_Baskerville']`}
              >
                {userData.role === "customer"
                  ? "Your Tasks"
                  : "Services Requests"}
              </span>
              {showNotification && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
