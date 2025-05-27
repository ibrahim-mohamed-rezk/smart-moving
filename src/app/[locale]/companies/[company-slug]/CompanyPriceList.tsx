"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const CompanyPriceList = ({
  priceLists,
  companyName,
}: {
  priceLists: string;
  companyName: string;
}) => {
  const t = useTranslations("company");
  const [priceItems, setPriceItems] = useState<
    { text: string; price: string }[]
  >([]);

  useEffect(() => {
    if (priceLists) {
      // Parse the price list string into an array of objects
      const items = priceLists.split(",").map((item) => {
        const [text, price] = item.split(":").map((part) => part.trim());
        return { text, price };
      });
      setPriceItems(items);
    }
  }, [priceLists]);

  return (
    <div className="flex flex-col bg-[#F0F0F0] rounded-[16px] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full bg-white rounded-2xl inline-flex justify-between items-center">
          <div className="flex-1 self-stretch p-6 inline-flex flex-col justify-center items-end gap-2">
            <div className="self-stretch flex flex-col justify-center items-center gap-1">
              <div className="self-stretch justify-start text-blue-950 text-3xl font-bold font-['Libre_Baskerville']">
                {t("price_list_for")} {companyName}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch px-4 flex flex-col justify-center items-center gap-4">
                {priceItems.length > 0 ? (
                  priceItems.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="self-stretch w-full inline-flex justify-between items-center">
                        <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">
                          {item.text}
                        </div>
                        <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">
                          {item.price} kr
                        </div>
                      </div>
                      {index < priceItems.length - 1 && (
                        <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300 my-4"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="self-stretch inline-flex justify-between items-center">
                    <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">
                      {t("no_price_list_available")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPriceList;
