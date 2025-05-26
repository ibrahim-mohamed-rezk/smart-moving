"use client";
import { getData, postData } from "@/libs/axios/server";
import {
  ChatTypes,
  UserDataTypes,
  ExtendedMessageTypes,
} from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import ScrollToBottomButton from "./ScrollToBottomButton";
import DoneFormPopup from "./DoneFormPopup";
import OrderDetails from "./OrderDetails";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Form data interface for done status
interface DoneFormData {
  price: string;
  email: string;
  phone: string;
  address: string;
  date: string;
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
  const [status, setStatus] = useState(chat?.order?.status);

  // Done form popup states
  const [showDoneForm, setShowDoneForm] = useState(false);
  const [doneFormData, setDoneFormData] = useState<DoneFormData>({
    price: "",
    email: "",
    phone: "",
    address: "",
    date: "",
  });
  const [isSubmittingDoneForm, setIsSubmittingDoneForm] = useState(false);

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
        // Set initial status from chat data
        setStatus(response.data.order?.status || "pending");
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
        selectedFiles.forEach((file) => {
          formData.append(`attachments`, file);

          // Add metadata for each file
          const fileType = file.type.startsWith("image/") ? "image" : "file";
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

  // Handle done form input changes
  const handleDoneFormChange = (field: keyof DoneFormData, value: string) => {
    setDoneFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit done form with status change
  const handleSubmitDoneForm = async () => {
    // Validate required fields
    if (
      !doneFormData.price ||
      !doneFormData.email ||
      !doneFormData.phone ||
      !doneFormData.address ||
      !doneFormData.date
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmittingDoneForm(true);

      // Combine status change with form data
      const requestData = {
        status: "processing",
        ...doneFormData,
      };

      await postData(
        `customer/change-status/${chat?.order?.id}`,
        requestData,
        new AxiosHeaders({
          lang: locale,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        })
      );

      setStatus(requestData.status);
      setShowDoneForm(false);
      // Reset form data
      setDoneFormData({
        price: "",
        email: "",
        phone: "",
        address: "",
        date: "",
      });

      toast.success("Status changed successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmittingDoneForm(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    if (status === "done") {
      toast.error("Cannot change status once it's marked as done");
      return;
    }

    if (newStatus === "processing") {
      // Show form popup for processing status
      setShowDoneForm(true);
      return;
    }

    // For other status changes, proceed normally
    try {
      await postData(
        `customer/change-status/${chat?.order?.id}`,
        { status: newStatus },
        new AxiosHeaders({
          lang: locale,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        })
      );
      setStatus(newStatus);
      toast.success("Status changed successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
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
      <ChatHeader
        chat={chat}
        user={user}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {/* Chat Messages - Scrollable Section */}
      <div className="flex-1 overflow-hidden max-h-screen relative">
        {status === "done" && (
          <div className="absolute inset-0 bg-black/50 flex items-start justify-center overflow-auto z-10 p-4">
            <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 h-fit block">
              <h3 className="text-blue-950 text-xl font-bold font-['Libre_Baskerville'] mb-4 sticky top-0 bg-white pb-2">
                Order Details
              </h3>
              <div className="space-y-4">
                {chat?.order?.email && (
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Email</span>
                    <span className="text-black font-medium break-words">
                      {chat.order.email}
                    </span>
                  </div>
                )}
                {chat?.order?.phone && (
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Phone</span>
                    <span className="text-black font-medium break-words">
                      {chat.order.phone}
                    </span>
                  </div>
                )}
                {chat?.order?.address && (
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Address</span>
                    <span className="text-black font-medium break-words">
                      {chat.order.address}
                    </span>
                  </div>
                )}
                {chat?.order?.price && (
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Price</span>
                    <span className="text-black font-medium break-words">
                      {chat.order.price}
                    </span>
                  </div>
                )}
                {chat?.order?.date && (
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Date</span>
                    <span className="text-black font-medium break-words">
                      {chat.order.date}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center text-gray-600">
                This conversation is marked as done
              </div>
            </div>
          </div>
        )}
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
          ) : (
            <>
              {chat?.order && status !== "processing" && (
                <OrderDetails order={chat.order} />
              )}
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <ChatMessage
                    key={message.id || index}
                    message={message}
                    user={user}
                    index={index}
                    orderDetails={chat?.order}
                  />
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
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ScrollToBottomButton
          autoScroll={autoScroll}
          onScrollToBottom={() => {
            setAutoScroll(true);
            scrollToBottom();
          }}
        />
      </div>

      {/* Message Input */}
      <MessageInput
        message={message}
        setMessage={setMessage}
        selectedFiles={selectedFiles}
        onFileSelect={handleFileSelect}
        onRemoveFile={handleRemoveFile}
        onClearAllFiles={handleClearAllFiles}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        sendingMessage={sendingMessage}
        formatFileSize={formatFileSize}
        disabled={status === "done"}
      />

      {/* Done Form Popup */}
      <DoneFormPopup
        showDoneForm={showDoneForm}
        doneFormData={doneFormData}
        isSubmittingDoneForm={isSubmittingDoneForm}
        onClose={() => setShowDoneForm(false)}
        onFormChange={handleDoneFormChange}
        onSubmit={handleSubmitDoneForm}
      />
    </div>
  );
};

export default Chat;
