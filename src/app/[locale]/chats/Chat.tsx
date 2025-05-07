"use client";
import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would implement the logic to send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-tr-2xl rounded-br-2xl border-l border-zinc-300 flex flex-col justify-between items-start overflow-hidden">
      {/* Chat Header */}
      <div className="self-stretch flex flex-col justify-between items-start">
        <div className="w-full p-3 md:p-6 flex justify-start items-center">
          <div className="flex justify-start items-center gap-2">
            <div className="w-10 h-10 md:w-16 md:h-16 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden">
              <img
                className="w-8 h-7 md:w-12 md:h-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/51x39"
                alt="Company logo"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="text-blue-950 text-sm md:text-lg font-normal font-['Libre_Baskerville']">
                FastMove Denmark
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

        {/* Chat Messages */}
        <div className="self-stretch scrollbar-hide p-3 md:p-6 flex flex-col justify-start items-start gap-4 md:gap-8 overflow-y-auto flex-grow max-h-[calc(100vh-200px)]">
          {/* Received Messages */}
          <div className="self-stretch flex justify-start items-start gap-2 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
              <img
                className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/31x24"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 md:gap-2.5 max-w-[75%]">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  omg, this is amazing
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  perfect! ✅
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  Wow, this is really epic
                </div>
              </div>
            </div>
          </div>

          {/* Sent Messages */}
          <div className="self-stretch flex justify-end items-start gap-2 md:gap-4">
            <div className="flex flex-col justify-start items-end gap-1 md:gap-2.5 max-w-[75%]">
              <div
                data-property-1="My Own"
                className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-950 rounded-xl flex justify-start items-start gap-2.5"
              >
                <div className="text-white text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  How are you?
                </div>
              </div>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
              <img
                className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/31x24"
                alt="User avatar"
              />
            </div>
          </div>

          {/* More Received Messages */}
          <div className="self-stretch flex justify-start items-start gap-2 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
              <img
                className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/31x24"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 md:gap-2.5 max-w-[75%]">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  omg, this is amazing
                </div>
              </div>
            </div>
          </div>

          {/* More Sent Messages */}
          <div className="self-stretch flex justify-end items-start gap-2 md:gap-4">
            <div className="flex flex-col justify-start items-end gap-1 md:gap-2.5 max-w-[75%]">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-950 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-white text-xs md:text-sm font-normal font-['Inter'] leading-tight">
                  woohoooo
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-950 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-white text-xs md:text-sm font-normal font-['Inter'] leading-tight">
                  Haha oh man
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-950 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-white text-xs md:text-sm font-normal font-['Inter'] leading-tight">
                  Haha that&apos;s terrifying 😂
                </div>
              </div>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
              <img
                className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/31x24"
                alt="User avatar"
              />
            </div>
          </div>

          {/* Final Received Messages */}
          <div className="self-stretch flex justify-start items-start gap-2 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 relative bg-white rounded-[100px] outline outline-1 outline-offset-[-1px] outline-indigo-950 overflow-hidden flex-shrink-0">
              <img
                className="w-6 h-5 md:w-8 md:h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src="https://placehold.co/31x24"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1 md:gap-2.5 max-w-[75%]">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  omg, this is amazing
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  perfect! ✅
                </div>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-100 rounded-lg flex justify-start items-start gap-2.5">
                <div className="text-black text-sm md:text-base font-normal font-['Libre_Baskerville']">
                  Wow, this is really epic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="self-stretch p-3 md:p-6 flex justify-start items-center gap-2 md:gap-6 w-full">
        <button className="w-6 h-6 relative overflow-hidden flex-shrink-0">
          <div className="w-3.5 h-5 left-[4.97px] top-[3px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-black" />
        </button>
        <div className="flex-1 min-h-[40px] md:h-12 p-2 md:p-4 bg-white rounded-2xl outline-2 outline-offset-[-2px] outline-zinc-300 flex justify-between items-center overflow-hidden">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message"
            className="w-full outline-none text-black text-sm font-normal font-['Libre_Baskerville'] placeholder:text-black/40"
          />
          <button
            onClick={handleSendMessage}
            className="w-6 h-6 relative overflow-hidden flex-shrink-0"
          >
            <div className="w-5 h-5 left-[2.56px] top-[2.56px] absolute bg-sky-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
