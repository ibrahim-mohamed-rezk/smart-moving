"use client";
import { useState } from "react";
// import { UserDataTypes } from "@/libs/types/types";
import { useRouter } from "@/i18n/routing";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Mobile menu toggle button - only visible on small screens */}
      <div className="md:hidden fixed top-15 end-4 z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-blue-950 text-white rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`
         bg-white rounded-tl-2xl rounded-bl-2xl shadow-[1px_0px_0px_0px_rgba(0,0,0,0.08)] 
        flex flex-col justify-start items-start overflow-hidden
        fixed md:relative top-0 left-0 z-10
        w-[85%] sm:w-72 md:w-80 lg:w-96
        transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        <div className="self-stretch p-3 md:p-4 border-b border-zinc-300 flex justify-between items-center gap-4 w-full">
          <div className="flex justify-start items-center">
            <div className="flex justify-start items-center gap-1.5">
              <div className="text-black text-lg md:text-xl font-bold font-['Libre_Baskerville']">
                Messages
              </div>
              <div className="px-2 py-0.5 bg-zinc-100 rounded-3xl flex flex-col justify-start items-start gap-2.5">
                <div className="text-black text-xs font-semibold font-['Inter'] leading-none">
                  12
                </div>
              </div>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 md:p-6 flex flex-col justify-center items-start gap-4 w-full overflow-y-auto">
          {/* Chat item 1 */}
          <div
            className="w-full p-2 bg-zinc-100 rounded-2xl flex flex-col justify-start items-start gap-4 cursor-pointer hover:bg-zinc-200 transition-colors"
            onClick={() => {
              router.push("/chats?id=1");
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="self-stretch flex justify-between items-start w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden">
                  <img
                    className="w-8 h-7 md:w-12 md:h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src="https://placehold.co/51x39"
                    alt="Company logo"
                  />
                </div>
                <div className="text-blue-950 text-base md:text-lg font-normal font-['Libre_Baskerville']">
                  FastMove Denmark
                </div>
              </div>
              <div className="opacity-30 text-black text-xs md:text-sm font-normal font-['Libre_Baskerville']">
                12m
              </div>
            </div>
            <div className="self-stretch pl-3 md:pl-6 flex justify-center items-center gap-2.5">
              <div className="flex-1 text-black/60 text-sm md:text-lg font-normal font-['Libre_Baskerville'] truncate">
                You : I accepted your offer and I want ...
              </div>
            </div>
          </div>

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300 w-full"></div>

          {/* Chat item 2 */}
          <div
            className="w-full p-2 flex flex-col justify-start items-start gap-4 cursor-pointer hover:bg-zinc-100 transition-colors"
            onClick={() => {
              router.push("/chats?id=2");
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="self-stretch flex justify-between items-start w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden">
                  <img
                    className="w-8 h-7 md:w-12 md:h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src="https://placehold.co/51x39"
                    alt="Company logo"
                  />
                </div>
                <div className="text-blue-950 text-base md:text-lg font-normal font-['Libre_Baskerville']">
                  FastMove Denmark
                </div>
              </div>
              <div className="opacity-30 text-black text-xs md:text-sm font-normal font-['Libre_Baskerville']">
                12m
              </div>
            </div>
            <div className="self-stretch pl-3 md:pl-6 flex justify-center items-center gap-2.5">
              <div className="flex-1 text-black/60 text-sm md:text-lg font-normal font-['Libre_Baskerville'] truncate">
                You : I accepted your offer and I want ...
              </div>
            </div>
          </div>

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300 w-full"></div>

          {/* Chat item 3 */}
          <div
            className="w-full p-2 flex flex-col justify-start items-start gap-4 cursor-pointer hover:bg-zinc-100 transition-colors"
            onClick={() => {
              router.push("/chats?id=3");
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="self-stretch flex justify-between items-start w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden">
                  <img
                    className="w-8 h-7 md:w-12 md:h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src="https://placehold.co/51x39"
                    alt="Company logo"
                  />
                </div>
                <div className="text-blue-950 text-base md:text-lg font-normal font-['Libre_Baskerville']">
                  FastMove Denmark
                </div>
              </div>
              <div className="opacity-30 text-black text-xs md:text-sm font-normal font-['Libre_Baskerville']">
                12m
              </div>
            </div>
            <div className="self-stretch pl-3 md:pl-6 flex justify-center items-center gap-2.5">
              <div className="flex-1 text-black/60 text-sm md:text-lg font-normal font-['Libre_Baskerville'] truncate">
                You : I accepted your offer and I want ...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
