const AboutCompany = ({ bio }: { bio: string }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="self-stretch p-4 md:p-6 lg:p-8 bg-white flex flex-col md:flex-row justify-start items-center md:items-start gap-4 md:gap-8 lg:gap-16">
        <div className="w-full md:flex-1 justify-start text-blue-950 text-xl sm:text-2xl lg:text-3xl font-bold font-['Libre_Baskerville'] mb-4 md:mb-0">
          {!bio || bio === "" ? "Moving company" : bio}
        </div>
        {/* <div className="flex flex-row flex-wrap justify-center gap-4">
          <img
            className="w-40 h-56 sm:w-52 sm:h-72 object-cover"
            src="https://placehold.co/208x298"
            alt="Company image 1"
          />
          <img
            className="w-36 h-56 sm:w-48 sm:h-72 object-cover"
            src="https://placehold.co/186x280"
            alt="Company image 2"
          />
          <img
            className="w-56 h-44 sm:w-72 sm:h-56 object-cover"
            src="https://placehold.co/285x220"
            alt="Company image 3"
          />
        </div> */}
      </div>
      {/* <div className="self-stretch  flex flex-col lg:flex-row justify-center items-stretch gap-4 pt-4">
        <div className="flex-1 p-4 bg-white rounded-2xl flex flex-col justify-start items-start gap-4 md:gap-6">
          <div className="self-stretch justify-start text-blue-950 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Libre_Baskerville']">
            Categories
          </div>
          <ul className="w-full list-disc p-4">
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 172 in the Single Transport category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 13 in the Moving Company category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 348 in the Horse transport category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 172 in the Single Transport category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 232 in the Storage category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville'] mb-3 md:mb-4">
              number 348 in the Horse transport category
            </li>
            <li className="self-stretch justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville']">
              number 172 in the Single Transport category
            </li>
          </ul>
         
        </div>
        <div className="flex-1 self-stretch p-4 bg-white rounded-2xl flex flex-col justify-start items-start gap-4 md:gap-6 mt-4 lg:mt-0">
          <div className="self-stretch justify-start text-blue-950 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Libre_Baskerville']">
            Relocation offer obligations
          </div>
          <div className="self-stretch flex justify-start items-end gap-1">
            <div className="flex-1 justify-start text-black text-base sm:text-lg font-normal font-['Libre_Baskerville']">
              We never delete reviews for work performed, neither positive nor
              negative.
              <br />
              <br />
              If a company changes its name or CVR number, the ratings will
              always follow.
              <br />
              <br />
              We verify all new companies with personal Facebook accounts or
              their websites. This way, a company cannot register twice.
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutCompany;
