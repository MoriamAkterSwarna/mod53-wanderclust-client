import { Separator } from "@heroui/react";

const Banner = () => {
  return (
    <div className="bg-img text-white flex justify-between flex-col items-center gap-3 sm:gap-5 min-h-96 sm:min-h-screen p-0 overflow-x-hidden">
      <div className="p-4 sm:p-10 text-center flex justify-center flex-col items-center gap-2 sm:gap-3.5 flex-1 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-2xl px-2">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto justify-center">
          <button className="uppercase bg-cyan-500 px-4 sm:px-5 py-2 sm:py-3 cursor-pointer text-sm sm:text-base">
            Explore Now
          </button>

          <button className="uppercase px-4 sm:px-5 py-2 sm:py-3 bg-white/50 cursor-pointer text-sm sm:text-base">
            View Destination
          </button>
        </div>
      </div>

      <div className="bg-white/30 flex flex-col sm:flex-row justify-center sm:justify-between gap-3 sm:gap-2 w-full items-center px-3 sm:px-4 py-3 sm:py-4 flex-wrap">
        <div className="px-2 sm:px-3 text-center sm:text-left">
          <h3 className="text-xs sm:text-sm font-semibold">Location</h3>
          <p className="text-xs">Address, City or Zip</p>
        </div>

         <Separator variant="tertiary" orientation="vertical" className="hidden sm:block" />

        <div className="text-center sm:text-left">
          <h3 className="text-xs sm:text-sm font-semibold">Date/Duration</h3>
          <p className="text-xs">Anytime/3 Days</p>
        </div>

         <Separator variant="tertiary" orientation="vertical" className="hidden sm:block" />

        <div className="text-center sm:text-left">
          <h3 className="text-xs sm:text-sm font-semibold">Budget</h3>
          <p className="text-xs">$0-$3000</p>
        </div>

         <Separator variant="tertiary" orientation="vertical" className="hidden sm:block" />

        <div className="text-center sm:text-left">
          <h3 className="text-xs sm:text-sm font-semibold">People</h3>
          <p className="text-xs">5-10</p>
        </div>

        <div className="bg-cyan-500 py-2 px-3 sm:px-4 cursor-pointer text-sm sm:text-base">
          <h3>Search</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
