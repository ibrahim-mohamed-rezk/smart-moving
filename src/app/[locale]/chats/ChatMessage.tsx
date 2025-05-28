import { Link } from "@/i18n/routing";
import {
  UserDataTypes,
  ExtendedMessageTypes,
  AttachmentType,
  TaskTypes,
} from "@/libs/types/types";
import {
  Download,
  FileText,
  UserIcon,
} from "lucide-react";

interface ChatMessageProps {
  message: ExtendedMessageTypes;
  user: UserDataTypes;
  index: number;
  orderDetails: TaskTypes | undefined;
}

const ChatMessage = ({
  message,
  user,
  index,
}: ChatMessageProps) => {
  const renderAttachment = (attachment: AttachmentType) => {
    const isImage =
      attachment.type === "image" ||
      attachment.link.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i);

    if (isImage) {
      return (
        <div key={attachment.id} className="relative group mb-2">
          <img
            src={attachment.link}
            alt={attachment.name}
            className="max-w-full max-h-[300px] rounded-lg object-contain cursor-pointer"
            loading="lazy"
            onClick={() => window.open(attachment.link, "_blank")}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
          <a
            href={attachment.link}
            download={attachment.name}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={16} />
          </a>
        </div>
      );
    } else {
      return (
        <div
          key={attachment.id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2 border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
            <FileText size={20} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium text-gray-900 truncate"
              title={attachment.name}
            >
              {attachment.name}
            </p>
            <p className="text-xs text-gray-500">
              {attachment.size} • {attachment.type.toUpperCase()}
            </p>
          </div>
          <a
            href={attachment.link}
            download={attachment.name}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors flex-shrink-0"
          >
            <Download size={16} />
            <span className="text-sm">Download</span>
          </a>
        </div>
      );
    }
  };

  const isMyMessage = message.user_id === user?.id;

  return (
    <div
      key={message.id || index}
      className={`self-stretch flex ${
        isMyMessage ? "justify-end" : "justify-start"
      } items-start gap-2 md:gap-4`}
    >
      {!isMyMessage && (
        <Link
          href={ user.role === "customer" ?`/companies/${message.user?.company?.id}?page=about%20us`:"#"}
          className="w-8 h-8 md:w-10 flex items-center justify-center md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0"
        >
          {message.user?.image ? <img
            className="w-full h-full"
            src={message.user?.image}
            alt="User avatar"
          />: <UserIcon className="w-[80%] h-[80%]" />}
        </Link>
      )}
      <div
        className={`flex flex-col justify-start items-${
          isMyMessage ? "end" : "start"
        } gap-1 md:gap-2.5 max-w-[75%]`}
      >
        <div
          className={`px-3 py-1.5 md:px-4 md:py-2 ${
            isMyMessage ? "bg-blue-950 rounded-xl" : "bg-zinc-100 rounded-lg"
          } flex flex-col justify-start items-start gap-2.5`}
        >
          {message.message && (
            <div
              className={`${
                isMyMessage ? "text-white" : "text-black"
              } text-sm md:text-base font-normal font-['Libre_Baskerville']`}
            >
              {message.message}
            </div>
          )}

          {/* Render attachments from API response */}
          {message.acttachmets && message.acttachmets.length > 0 && (
            <div className="w-full">
              {message.acttachmets.map((attachment) =>
                renderAttachment(attachment)
              )}
            </div>
          )}

          {/* Fallback for old file_url field */}
          {message.file_url && !message.acttachmets && (
            <div className="w-full">
              {message.file_url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                <div className="relative group">
                  <img
                    src={message.file_url}
                    alt="Shared image"
                    className="max-w-full max-h-[300px] rounded-lg object-contain"
                    loading="lazy"
                  />
                  <a
                    href={message.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Download size={16} />
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {message.file_url.split("/").pop()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {message.file_url
                        .match(/\.([^.]+)$/)?.[1]
                        ?.toUpperCase() || "File"}
                    </p>
                  </div>
                  <a
                    href={message.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isMyMessage && (
        <div className="w-8 h-8 md:w-10 flex items-center justify-center md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
          {message.user.image?<img
            className="w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={message.user?.image}
            alt="User avatar"
          />: <UserIcon className="w-[80%] h-[80%]" />}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
