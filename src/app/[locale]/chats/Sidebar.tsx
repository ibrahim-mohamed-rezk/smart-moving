"use client";
import { useEffect, useState } from "react";
// import { UserDataTypes } from "@/libs/types/types";
import { Link, useRouter } from "@/i18n/routing";
import { Menu, X, Search } from "lucide-react";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { ChatTypes, UserDataTypes } from "@/libs/types/types";
import { useTranslations } from "next-intl";

const Sidebar = ({
  locale,
  token,
  user,
}: {
  locale: string;
  token: string;
  user: UserDataTypes;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [chats, setChats] = useState<ChatTypes[]>([]);
  const t = useTranslations("chat");

  console.log(chats);

  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          "chat?page=1",
          {},
          new AxiosHeaders({
            lang: locale || "en",
            authorization: `Bearer ${token}`,
          })
        );
        setChats(response.data);
      } catch (error) {
        throw error;
      }
    };

    feachData();
  }, []);

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) => {
    const otherParticipant = chat.participants.find(
      (participant) => participant.user_id !== user.id
    );
    const userName = otherParticipant?.user.name || "";
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
                {t("messages")}
              </div>
              <div className="px-2 py-0.5 bg-zinc-100 rounded-3xl flex flex-col justify-start items-start gap-2.5">
                <div className="text-black text-xs font-semibold font-['Inter'] leading-none">
                  {filteredChats.length}
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

        {/* Search Input */}
        <div className="w-full p-3 md:p-4 border-b border-zinc-300">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder={t("search_conversations")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-sm font-['Inter']"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="p-3 md:p-6 flex flex-col justify-start items-start gap-4 w-full overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <>
                <div
                  key={chat.id}
                  className="w-full p-2 bg-zinc-100 rounded-2xl flex flex-col justify-start items-start gap-4 cursor-pointer hover:bg-zinc-200 transition-colors"
                  onClick={() => {
                    router.push(`/chats?id=${chat.id}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="self-stretch flex justify-between items-start w-full">
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/companies/${
                          chat.participants.find(
                            (participant) =>
                              participant.user_id !== user.id &&
                              participant.user.role === "company"
                          )?.user.company?.id
                        }?page=about%20us`}
                        className="w-10 h-10 md:w-16 flex items-center justify-center md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <img
                          className="w-full h-full"
                          src={
                            chat.participants.find(
                              (participant) => participant.user_id !== user.id
                            )?.user.image
                          }
                          alt="user"
                        />
                      </Link>
                      <div className="text-blue-950 text-base md:text-lg font-normal font-['Libre_Baskerville']">
                        {
                          chat.participants.find(
                            (participant) => participant.user_id !== user.id
                          )?.user.name
                        }
                      </div>
                    </div>
                    <div className="opacity-30 text-black text-xs md:text-sm font-normal font-['Libre_Baskerville']">
                      {chat.last_message?.updated_at
                        ? new Date(
                            chat.last_message.updated_at
                          ).toLocaleDateString([], {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                  <div className="self-stretch pl-3 md:pl-6 flex justify-center items-center gap-2.5">
                    <div className="flex-1 text-black/60 text-sm md:text-lg font-normal font-['Libre_Baskerville'] truncate">
                      {chat.last_message?.message}
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300 w-full"></div>
              </>
            ))
          ) : chats.length > 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-8">
              <div className="text-blue-950 text-lg font-normal font-['Libre_Baskerville'] text-center mb-2">
                {t("no_matching_conversations")}
              </div>
              <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] text-center">
                {t("try_adjusting_search")}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-8">
              <div className="text-blue-950 text-lg font-normal font-['Libre_Baskerville'] text-center mb-2">
                {t("no_messages_yet")}
              </div>
              <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] text-center">
                {t("start_conversation_with_company")}
              </div>
            </div>
          )}
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
