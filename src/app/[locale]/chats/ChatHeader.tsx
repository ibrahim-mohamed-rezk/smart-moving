import { Link } from "@/i18n/routing";
import { ChatTypes, UserDataTypes } from "@/libs/types/types";
import {
  UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface ChatHeaderProps {
  chat: ChatTypes | null;
  user: UserDataTypes;
  status: string | undefined;
  onStatusChange: (newStatus: string) => void;
  requestCompletion: () => void;
}

const ChatHeader = ({
  chat,
  user,
  status,
  onStatusChange,
  requestCompletion,
}: ChatHeaderProps) => {
  const t = useTranslations("profile");

  const otherUser = chat?.participants.filter((p) => p.user.id !== user.id)[0];
  // alert(`chat: ${status}, status: ${status}`);

  return (
    <div className="flex-none">
      <div className="w-full p-3 md:p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex justify-start items-start gap-4">
            <Link
              href={
                user.role === "customer"
                  ? `/companies/${otherUser?.user.company?.id}?page=about%20us`
                  : "#"
              }
              className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0"
            >
              {otherUser?.user.image ? (
                <img
                  className="w-full h-full"
                  src={otherUser.user.image}
                  alt="Company logo"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-[80%] h-[80%]" />
                </div>
              )}
            </Link>
            <div className="flex flex-col justify-start items-start gap-1">
              <div className="text-blue-950 text-sm md:text-lg font-normal font-['Libre_Baskerville']">
                {otherUser?.user.name}
              </div>
              <div className="px-2 py-0.5 md:py-1 rounded-[30px] flex justify-center items-center gap-2.5">
                <div className="text-black text-xs font-normal font-['Libre_Baskerville']">
                  {otherUser?.user.phone}
                </div>
              </div>
            </div>
          </div>

          {chat?.order && (status === "processing" || status === "done") && (
            <div className="flex-1 mx-4 grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {chat.order?.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {chat.order?.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 truncate">
                  {chat.order?.address}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <img src="/images/money.svg" alt="Money" className="w-4 h-4" />
                <span className="text-gray-600 truncate">
                  {chat.order?.price}
                </span>
              </div>
              {chat.order.date && (
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600 truncate">
                    {chat.order?.date}
                  </span>
                </div>
              )}
            </div>
          )}

          <div
            className={`px-3 py-1 md:px-5 ${
              status?.toLowerCase() === "pending"
                ? "bg-blue-500"
                : status?.toLowerCase() === "processing"
                ? "bg-orange-500"
                : status?.toLowerCase() === "done"
                ? "bg-green-500"
                : ""
            } rounded-[30px] flex justify-center items-center gap-2`}
          >
            <div className="justify-start text-white text-sm md:text-lg font-normal font-['Libre_Baskerville']">
              {user.role === "customer" ? (
                <select
                  value={status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="border-none outline-none cursor-pointer text-white text-sm md:text-lg font-normal font-['Libre_Baskerville'] hover:text-sky-200 transition-colors bg-transparent"
                  disabled={status === "done"}
                >
                  {[
                    {
                      title: t("pending"),
                      value: "pending",
                      disabled: status === "processing",
                    },
                    { title: t("processing"), value: "processing" },
                    {
                      title: t("done"),
                      value: "done",
                      disabled: status === "pending",
                    },
                  ].map((statusOption) => (
                    <option
                      key={statusOption.value}
                      value={statusOption.value}
                      disabled={statusOption.disabled}
                      className={`${"bg-blue-500"} text-white`}
                    >
                      {statusOption.title}
                    </option>
                  ))}
                </select>
              ) : (
                <>{t(status || "")} </>
              )}
            </div>
          </div>

          {user.role === "company" && status === "processing" && (
            <button
              onClick={requestCompletion}
              className="ms-2 bg-green-500 rounded-full px-3 py-1 flex items-center justify-center text-white "
            >
              {t("complete_order")}
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-px opacity-10 bg-black " />
    </div>
  );
};

export default ChatHeader;
