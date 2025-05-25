"use client";
import { Link } from "@/i18n/routing";
import { getData, postData } from "@/libs/axios/server";
import { ChatTypes, MessageTypes, UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import {
  UserIcon,
  Paperclip,
  X,
  Download,
  FileText,
  Image,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Define attachment type based on API response
interface AttachmentType {
  id: number;
  type: string;
  name: string;
  size: string;
  link: string;
}

// Extended MessageTypes to include attachments
interface ExtendedMessageTypes extends MessageTypes {
  acttachmets?: AttachmentType[];
}

const Chat = ({ token, user }: { token: string; user: UserDataTypes }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ExtendedMessageTypes[]>([]);
  const [chat, setChat] = useState<ChatTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);
  const t = useTranslations("profile");
  const [status, setStatus] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const locale = useLocale();

  // Enhanced scroll to bottom function with smooth behavior
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  }, []);

  // Handle scroll events to determine if user has manually scrolled up
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const bottomThreshold = 100; // pixels from bottom to consider "at bottom"
    const isAtBottom =
      scrollHeight - scrollTop - clientHeight < bottomThreshold;

    setAutoScroll(isAtBottom);
  }, []);

  // Fetch chat data
  useEffect(() => {
    const fetchChat = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getData(
          `chat/${id}`,
          {},
          new AxiosHeaders({
            lang: locale || "en",
            authorization: `Bearer ${token}`,
          })
        );
        setChat(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat:", error);
        toast.error("Failed to load chat information");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [id, locale, token]);

  // Fetch messages and handle scrolling
  useEffect(() => {
    const fetchMessages = async () => {
      if (!id) return;

      try {
        const response = await getData(
          `chat_message?chat_id=${id}&page=1`,
          {},
          new AxiosHeaders({
            lang: locale || "en",
            authorization: `Bearer ${token}`,
          })
        );

        // Sort messages chronologically
        const sortedMessages = response.data.sort(
          (a: ExtendedMessageTypes, b: ExtendedMessageTypes) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch messages immediately
    fetchMessages();

    // Set up polling interval
    const intervalId = setInterval(fetchMessages, 10000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [id, locale, token]);

  // Scroll to bottom when messages change or component mounts
  useEffect(() => {
    const isFirstLoad =
      prevMessagesLengthRef.current === 0 && messages.length > 0;
    const hasNewMessages = messages.length > prevMessagesLengthRef.current;

    // Always scroll on first load
    if (isFirstLoad) {
      // Use immediate scroll for initial load
      setTimeout(() => scrollToBottom(false), 100);
    }
    // Scroll when new messages arrive if auto-scroll is enabled
    else if (hasNewMessages && autoScroll) {
      scrollToBottom(true);
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, autoScroll, scrollToBottom]);

  // Add scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Helper function to get file type from extension or MIME type
  const getFileType = (filename: string, type?: string): string => {
    if (type) return type;

    const extension = filename.split(".").pop()?.toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];

    if (extension && imageExtensions.includes(extension)) {
      return "image";
    }

    return "file";
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle file selection (multiple files)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" exceeds 10MB limit`);
        return;
      }
      validFiles.push(file);
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all selected files
  const handleClearAllFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle sending new message
  const handleSendMessage = async () => {
    if (
      (!message.trim() && selectedFiles.length === 0) ||
      !id ||
      sendingMessage
    )
      return;

    try {
      setSendingMessage(true);
      const formData = new FormData();
      formData.append("message", message);
      formData.append("chat_id", id);
      formData.append("time", new Date().toISOString());

      // Handle multiple file attachments
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formData.append(`attachments`, file);

          // Add metadata for each file
          const fileType = getFileType(
            file.name,
            file.type.startsWith("image/") ? "image" : "file"
          );
          formData.append("attach_type", fileType);
          formData.append("attach_size", formatFileSize(file.size));
          formData.append("attach_name", file.name);
        });
      }

      const response = await postData(
        "chat_message",
        formData,
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      // Optimistically update UI with new message
      const newMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Force auto-scroll when user sends a message
      setAutoScroll(true);
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Failed to send message");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render attachment component
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

  // Scroll to bottom button
  const ScrollToBottomButton = () => {
    if (autoScroll) return null;

    return (
      <button
        onClick={() => {
          setAutoScroll(true);
          scrollToBottom();
        }}
        className="absolute bottom-4 right-4 bg-blue-950 text-white rounded-full p-2 shadow-md hover:bg-blue-800 transition-colors z-10"
        aria-label="Scroll to bottom"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 15L12 21L6 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 9L12 15L6 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  const ChangeStatus = async (status: string) => {
    try {
      await postData(
        `customer/change-status/${"task.id"}`,
        { status },
        new AxiosHeaders({
          lang: locale,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        })
      );
      toast.success(t("Status changed successfully"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  if (!id)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-blue-950 text-lg md:text-xl font-normal font-['Libre_Baskerville'] text-center p-8">
          <p>No conversation selected</p>
          <p className="text-black/60 text-sm md:text-base mt-2">
            Please select a conversation from the sidebar or start a new one
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-full h-full bg-white rounded-tr-2xl rounded-br-2xl border-l border-zinc-300 flex flex-col">
      {/* Chat Header */}
      <div className="flex-none">
        <div className="w-full p-3 md:p-6 flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <Link
              href={`/companies/${
                chat?.participants.filter((p) => p.user.id !== user.id)[0].user
                  .company?.id
              }?page=about%20us`}
              className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden"
            >
              {chat?.participants.filter((p) => p.user.id !== user.id)[0].user
                .image ? (
                <img
                  className="w-full h-full"
                  src={
                    chat?.participants.filter((p) => p.user.id !== user.id)[0]
                      .user.image
                  }
                  alt="Company logo"
                />
              ) : (
                <div className=" w-full h-full flex items-center justify-center">
                  <UserIcon className="w-[80%] h-[80%]" />
                </div>
              )}
            </Link>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="text-blue-950 text-sm md:text-lg font-normal font-['Libre_Baskerville']">
                {
                  chat?.participants.filter((p) => p.user.id !== user.id)[0]
                    .user.name
                }
              </div>
              <div className="px-2 py-0.5 md:py-1 rounded-[30px] flex justify-center items-center gap-2.5">
                <div className="text-black text-xs font-normal font-['Libre_Baskerville']">
                  {
                    chat?.participants.filter((p) => p.id !== user.id)[0].user
                      .phone
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 md:px-5 bg-sky-500 rounded-[30px] flex justify-center items-center gap-2">
            <div className="justify-start text-white text-sm md:text-lg font-normal font-['Libre_Baskerville']">
              {user.role === "customer" ? (
                <select
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setStatus(e.target.value);
                    ChangeStatus(e.target.value);
                  }}
                  className="bg-transparent border-none outline-none cursor-pointer text-white text-sm md:text-lg font-normal font-['Libre_Baskerville'] hover:text-sky-200 transition-colors"
                >
                  {[
                    { title: t("pending"), value: "pending" },
                    { title: t("processing"), value: "processing" },
                    { title: t("done"), value: "done" },
                  ].map((status) => (
                    <option
                      key={status.value}
                      value={status.value}
                      className="bg-sky-500 text-white"
                    >
                      {status.title}
                    </option>
                  ))}
                </select>
              ) : (
                status
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-px opacity-10 bg-black" />
      </div>

      {/* Chat Messages - Scrollable Section */}
      <div className="flex-1 overflow-hidden max-h-screen relative">
        <div
          ref={messagesContainerRef}
          className="h-full scrollbar-hide p-3 md:p-6 flex flex-col justify-start items-start gap-4 md:gap-8 overflow-y-auto"
        >
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center py-8">
              <div className="text-blue-950 text-lg font-normal font-['Libre_Baskerville'] text-center">
                Loading messages...
              </div>
            </div>
          ) : messages.length > 0 ? (
            messages.map((message: ExtendedMessageTypes, index: number) => (
              <div
                key={message.id || index}
                className={`self-stretch flex ${
                  message.user_id === user?.id ? "justify-end" : "justify-start"
                } items-start gap-2 md:gap-4`}
              >
                {message.user_id !== user?.id && (
                  <Link
                    href={`/companies/${message.user?.company?.id}?page=about%20us`}
                    className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0"
                  >
                    <img
                      className="w-full h-full"
                      src={message.user?.image}
                      alt="User avatar"
                    />
                  </Link>
                )}
                <div
                  className={`flex flex-col justify-start items-${
                    message.user_id === user?.id ? "end" : "start"
                  } gap-1 md:gap-2.5 max-w-[75%]`}
                >
                  <div
                    className={`px-3 py-1.5 md:px-4 md:py-2 ${
                      message.user_id === user?.id
                        ? "bg-blue-950 rounded-xl"
                        : "bg-zinc-100 rounded-lg"
                    } flex flex-col justify-start items-start gap-2.5`}
                  >
                    {message.message && (
                      <div
                        className={`${
                          message.user_id === user?.id
                            ? "text-white"
                            : "text-black"
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
                        {message.file_url.match(
                          /\.(jpg|jpeg|png|gif|webp|svg)$/i
                        ) ? (
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
                {message.user_id === user?.id && (
                  <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      src={message.user?.image}
                      alt="User avatar"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-8">
              <div className="text-blue-950 text-lg font-normal font-['Libre_Baskerville'] text-center mb-2">
                No messages yet
              </div>
              <div className="text-black/60 text-sm font-normal font-['Libre_Baskerville'] text-center">
                Start a conversation by sending a message
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ScrollToBottomButton />
      </div>

      {/* Message Input - Fixed at Bottom */}
      <div className="flex-none p-3 md:p-6 flex flex-col gap-2 w-full">
        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedFiles.length} file
                {selectedFiles.length !== 1 ? "s" : ""} selected
              </span>
              <button
                onClick={handleClearAllFiles}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-2 py-1 bg-white rounded border text-sm"
                >
                  {file.type.startsWith("image/") ? (
                    <Image size={16} className="text-green-600" />
                  ) : (
                    <FileText size={16} className="text-blue-600" />
                  )}
                  <span className="truncate max-w-32" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({formatFileSize(file.size)})
                  </span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-400 hover:text-red-500 ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-start items-center gap-2 md:gap-6 w-full">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt,.zip,.rar"
            multiple
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-6 h-6 relative overflow-hidden flex-shrink-0 hover:text-blue-600 transition-colors"
            title="Attach files"
          >
            <Paperclip className="w-6 h-6" />
          </button>
          <div className="flex-1 min-h-[40px] md:h-12 p-2 md:p-4 bg-white rounded-2xl outline-2 outline-offset-[-2px] outline-zinc-300 flex justify-between items-center overflow-hidden">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message"
              disabled={sendingMessage}
              className="w-full outline-none text-black text-sm font-normal font-['Libre_Baskerville'] placeholder:text-black/40"
            />
            <button
              onClick={handleSendMessage}
              disabled={
                sendingMessage ||
                (!message.trim() && selectedFiles.length === 0)
              }
              className={`w-6 h-6 relative overflow-hidden flex-shrink-0 transition-opacity ${
                (!message.trim() && selectedFiles.length === 0) ||
                sendingMessage
                  ? "opacity-50"
                  : "hover:opacity-80"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8285 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                  fill="#25B4DE"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
