"use client";
import { useState } from "react";

const CompanyFeedbacks = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const openFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-950 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Libre_Baskerville']">
            Customer Feedbacks
          </h2>
          <button
            onClick={openFeedbackForm}
            className="px-6 py-3 bg-blue-950 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
          >
            Add Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feedback Card 1 */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="self-stretch h-[532px] relative bg-white rounded-lg shadow-md"
            >
              <div className="w-96 h-[527px] left-0 top-[2px] absolute bg-white blur-md" />
              <div className="left-[24px] top-[24px] absolute inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-black text-xl font-bold font-['Libre_Baskerville']">
                  Grethe
                </div>
                <div className="inline-flex justify-start items-center gap-2">
                  {[1, 2, 3].map(() => (
                    <svg
                      key={index}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8716 3.73152L16.7781 7.57594C17.0381 8.1111 17.7313 8.62441 18.3163 8.7227L21.7717 9.30155C23.9815 9.6729 24.5015 11.2893 22.9091 12.8839L20.2228 15.5924C19.7678 16.0511 19.5187 16.9357 19.6594 17.5693L20.4286 20.9222C21.0352 23.5761 19.6378 24.6028 17.3089 23.2157L14.0701 21.2826C13.4852 20.9331 12.5211 20.9331 11.9253 21.2826L8.68654 23.2157C6.36846 24.6028 4.96028 23.5652 5.56689 20.9222L6.33597 17.5693C6.47678 16.9357 6.22764 16.0511 5.77269 15.5924L3.08632 12.8839C1.50483 11.2893 2.01394 9.6729 4.22369 9.30155L7.67915 8.7227C8.25325 8.62441 8.94651 8.1111 9.20648 7.57594L11.1129 3.73152C12.1528 1.64548 13.8426 1.64548 14.8716 3.73152Z"
                        fill="#FFC107"
                        fill-opacity="0.4"
                      />
                    </svg>
                  ))}
                  {[1, 2].map(() => (
                    <svg
                      key={index}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8716 3.73152L16.7781 7.57594C17.0381 8.1111 17.7313 8.62441 18.3163 8.7227L21.7717 9.30155C23.9815 9.6729 24.5015 11.2893 22.9091 12.8839L20.2228 15.5924C19.7678 16.0511 19.5187 16.9357 19.6594 17.5693L20.4286 20.9222C21.0352 23.5761 19.6378 24.6028 17.3089 23.2157L14.0701 21.2826C13.4852 20.9331 12.5211 20.9331 11.9253 21.2826L8.68654 23.2157C6.36846 24.6028 4.96028 23.5652 5.56689 20.9222L6.33597 17.5693C6.47678 16.9357 6.22764 16.0511 5.77269 15.5924L3.08632 12.8839C1.50483 11.2893 2.01394 9.6729 4.22369 9.30155L7.67915 8.7227C8.25325 8.62441 8.94651 8.1111 9.20648 7.57594L11.1129 3.73152C12.1528 1.64548 13.8426 1.64548 14.8716 3.73152Z"
                        stroke="#D9D9D9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="w-48 h-0 left-[107px] top-[103px] absolute outline-1 outline-offset-[-0.50px] outline-zinc-100"></div>
              <div className="w-48 h-0 left-[107px] top-[172px] absolute outline-1 outline-offset-[-0.50px] outline-zinc-100"></div>
              <div className="w-48 h-0 left-[107px] top-[404px] absolute outline-1 outline-offset-[-0.50px] outline-zinc-100"></div>
              <div className="w-80 left-[24px] top-[119px] absolute justify-start">
                <span className="text-black text-base font-normal font-['Libre_Baskerville']">
                  Service :{" "}
                </span>
                <span className="text-black text-sm font-normal font-['Libre_Baskerville']">
                  Private moving – From Aarhus to Copenhagen
                </span>
              </div>
              <div className="w-80 left-[24px] top-[420px] absolute justify-start">
                <span className="text-black text-base font-normal font-['Libre_Baskerville']">
                  Company response :{" "}
                </span>
                <span className="text-black text-sm font-normal font-['Libre_Baskerville']">
                  We always love to hear that our clients are happy&apos; We
                  hope to see you again in other assignments, and whenever you
                  need us, we&apos;re ready&apos;
                </span>
              </div>
              <div className="w-80 left-[24px] top-[188px] absolute justify-start text-black text-base font-normal font-['Libre_Baskerville']">
                Honestly, the experience was beyond expectations&apos; The guys
                arrived on time, were very respectful, and handled the furniture
                with care, as if they were moving their own belongings&apos;
                Everything arrived intact and without a single scratch&apos;
                Thank you from the bottom of my heart&apos; You&apos;re up to
                it&apos; I will definitely recommend you to anyone in need of a
                respectable moving company.
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-blue-950 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">
            Load More Feedbacks
          </button>
        </div>
      </div>

      {/* Feedback Form Popup */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-[1139px] px-16 py-12 bg-white rounded-2xl shadow-[2px_4px_8px_0px_rgba(0,0,0,0.08)] inline-flex flex-col justify-center items-center gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-12">
              <div className="self-stretch justify-start text-blue-950 text-4xl font-bold font-['Libre_Baskerville']">
                Write Feedback
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Rate the Services{" "}
                  </div>
                  <div className="inline-flex justify-start items-center gap-6">
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute bg-yellow-400/40" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-zinc-300" />
                    </div>
                    <div className="w-12 h-12 relative">
                      <div className="w-10 h-10 left-[4px] top-[4px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-zinc-300" />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-24 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Select Service
                  </div>
                  <div className="self-stretch h-14 relative rounded-[30px] outline-1 outline-offset-[-1px] outline-black/40 overflow-hidden">
                    <div className="w-8 h-8 left-[963px] top-[12.50px] absolute">
                      <div className="w-4 h-2 left-[8px] top-[12px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                    </div>
                    <div className="left-[24px] top-[16px] absolute justify-start text-black/40 text-xl font-bold font-['Libre_Baskerville']">
                      None
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-52 flex flex-col justify-center items-start gap-4">
                  <div className="justify-start text-blue-950 text-xl font-bold font-['Libre_Baskerville']">
                    Message
                  </div>
                  <div className="self-stretch h-40 relative rounded-[30px] border border-black/40" />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[651px] inline-flex justify-center items-center gap-8">
              <div
                onClick={closeFeedbackForm}
                data-left_icon="false"
                data-right_icon="false"
                data-size="large"
                data-type="secondary"
                className="flex-1 px-36 py-4 rounded-2xl outline-1 outline-offset-[-1px] outline-blue-950 flex justify-center items-center gap-2 cursor-pointer"
              >
                <div className="justify-start text-blue-950 text-xl font-normal font-['Libre_Baskerville']">
                  Cancel
                </div>
              </div>
              <div
                data-left_icon="false"
                data-right_icon="false"
                data-size="large"
                data-type="primary"
                className="flex-1 px-36 py-4 bg-blue-950 rounded-2xl flex justify-center items-center gap-2 cursor-pointer"
              >
                <div className="justify-start text-white text-xl font-normal font-['Libre_Baskerville']">
                  Post
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyFeedbacks;
