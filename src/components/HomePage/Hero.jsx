import { IoSearchOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="space-y-5 text-center">
      <h1 className="pt-10 text-3xl font-bold text-blue-600">
        "Discover, Connect, and Thrive with TradeHub."
      </h1>
      <p className="max-w-xl mx-auto text-lg font-medium text-gray-500">
        Brings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className="relative max-w-sm mx-auto ">
        <input
          type="text"
          className="w-full text-sm text-gray-900 bg-gray-200 border-none rounded-lg focus:ring-0"
        />
        <IoSearchOutline className="absolute text-xl cursor-pointer right-2 top-2" />
      </div>
    </div>
  );
};
export default Hero;
