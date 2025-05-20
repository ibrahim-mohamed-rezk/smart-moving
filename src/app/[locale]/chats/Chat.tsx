"use client";
import { getData, postData } from "@/libs/axios/server";
import { ChatTypes, MessageTypes, UserDataTypes } from "@/libs/types/types";
import axios, { AxiosHeaders } from "axios";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";

const Chat = ({ token, user }: { token: string; user: UserDataTypes }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const [chat, setChat] = useState<ChatTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);

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
    alert(id);
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
          (a: MessageTypes, b: MessageTypes) =>
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

  // Handle sending new message
  const handleSendMessage = async () => {
    if (!message.trim() || !id || sendingMessage) return;

    try {
      setSendingMessage(true);
      const response = await postData(
        "chat_message",
        { message, chat_id: id, time: new Date().toISOString() },
        new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        })
      );

      // Optimistically update UI with new message
      const newMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

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

  // Scroll to bottom button
  const ScrollToBottomButton = () => {
    if (autoScroll) return null;

    return (
      <button
        onClick={() => {
          setAutoScroll(true);
          scrollToBottom();
        }}
        className="absolute bottom-4 right-4 bg-blue-950 text-white rounded-full p-2 shadow-md hover:bg-blue-800 transition-colors"
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

  if (!id) return (
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
        <div className="w-full p-3 md:p-6 flex justify-start items-center">
          <div className="flex justify-start items-center gap-2">
            <div className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden">
              <img
                className="w-8 h-7 md:w-12 md:h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src={chat?.image || "https://placehold.co/51x39"}
                alt="Company logo"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="text-blue-950 text-sm md:text-lg font-normal font-['Libre_Baskerville']">
                {chat?.name || "Loading..."}
              </div>
              <div className="px-2 py-0.5 md:py-1 bg-green-500/40 rounded-[30px] flex justify-center items-center gap-2.5">
                <div className="text-black text-xs font-normal font-['Libre_Baskerville']">
                  Online
                </div>
              </div>
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
            messages.map((message: MessageTypes, index: number) => (
              <div
                key={message.id || index}
                className={`self-stretch flex ${
                  message.user_id === user?.id ? "justify-end" : "justify-start"
                } items-start gap-2 md:gap-4`}
              >
                {message.user_id !== user?.id && (
                  <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
                    <img
                      className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      src={message.user?.image || "https://placehold.co/31x24"}
                      alt="User avatar"
                    />
                  </div>
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
                    } flex justify-start items-start gap-2.5`}
                  >
                    <div
                      className={`${
                        message.user_id === user?.id
                          ? "text-white"
                          : "text-black"
                      } text-sm md:text-base font-normal font-['Libre_Baskerville']`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
                {message.user_id === user?.id && (
                  <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
                    <img
                      className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      src={user?.image || "https://placehold.co/31x24"}
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
      <div className="flex-none p-3 md:p-6 flex justify-start items-center gap-2 md:gap-6 w-full">
        <button className="w-6 h-6 relative overflow-hidden flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.09997 3 4.96997 6.13 4.96997 10V16C4.96997 19.31 7.65997 22 10.97 22"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
            disabled={sendingMessage || !message.trim()}
            className={`w-6 h-6 relative overflow-hidden flex-shrink-0 ${
              !message.trim() ? "opacity-50" : ""
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
  );
};

export default Chat;
