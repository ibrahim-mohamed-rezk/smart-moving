const CompanyPriceList = () => {
  return (
    <div className="flex flex-col bg-[#F0F0F0] rounded-[16px] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full bg-white rounded-2xl inline-flex justify-between items-center">
          <div className="flex-1 self-stretch p-6 inline-flex flex-col justify-center items-end gap-2">
            <div className="self-stretch flex flex-col justify-center items-center gap-1">
              <div className="self-stretch justify-start text-blue-950 text-3xl font-bold font-['Libre_Baskerville']">Price list for Name of company</div>
              <div className="w-full justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">Prices are quoted all inclusive</div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">Moving company Hourly rates      <br/>Below are hourly rates for various services. The time starts when the car arrives at the address. The time ends when the car is empty and the goods have been delivered. A minimum of two hours is charged, regardless of the size of the task.</div>
              <div className="self-stretch justify-start text-lime-500 text-xl font-bold font-['Libre_Baskerville']">Payment is made directly to the moving company upon completion of the move.       The price includes consumption of gasoline/diesel. The price does not include any bridge tolls or ferry fees.</div>
              <div className="self-stretch px-4 flex flex-col justify-center items-center gap-4">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">1 man with van - approx. 10 m3          </div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">700 kr          </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">1 man with small truck - approx. 25 m3</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">800 kr</div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">1 man with medium truck - approx. 40 m3</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">1,200 kr</div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">1 man with large truck - approx. 70 m3</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">1,000 kr          </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">2 men with van - approx. 10 m3</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">1,000 kr          </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">2 men with small truck - approx. 25 m3</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">1,200 kr          </div>
                </div>
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-zinc-300"></div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-blue-950 text-base font-normal font-['Libre_Baskerville']">Supplement for piano</div>
                  <div className="justify-start text-blue-950 text-lg font-normal font-['Libre_Baskerville']">3,500 kr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPriceList;
