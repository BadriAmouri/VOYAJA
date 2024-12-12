import plane from "../../assets/offerPics/plane.png";
import { FaCircle, FaRegCircle, FaCheckCircle } from "react-icons/fa";

const OfferOverview = ({
  departureCity,
  departureDate,
  arrivalCity,
  arrivalDate,
  description,
  includedItems,
  optionalItems,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-xl font-bold">Overview</h1>
      <div className="p-4 w-full shadow-sm rounded-lg border border-customBorder flex flex-col items-center">
        <div className="flex items-center gap-10 mb-10">
          <div className="flex gap-10">
            <h2 className="text-lg font-medium">{departureCity}</h2>
            <h2 className="text-lg font-semibold">{departureDate}</h2>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center">
              <FaCircle size={8} className="text-black" />
              <div className="h-[2px] w-10 bg-black -ml-[2px]"></div>
            </div>
            <img src={plane} alt="plane" className="h-10" />
            <div className="flex items-center">
              <div className="h-[2px] w-10 bg-black -mr-[2px]"></div>
              <FaCircle size={8} className="text-black" />
            </div>
          </div>
          <div className="flex gap-10">
            <h2 className="text-lg font-semibold">{arrivalDate}</h2>
            <h2 className="text-lg font-medium">{arrivalCity}</h2>
          </div>
        </div>
        <div className="flex space-between items-start">
          <div className="w-1/3 p-2 mr-6">
            <h2 className="text-lg font-semibold">Offer Description</h2>
            <p className="my-4 text-sm">{description}</p>
          </div>
          <div className="w-1/3 p-2 px-10">
            <h2 className="text-lg font-semibold">What's Included?</h2>
            <ul className="my-4">
              {includedItems.map((item, index) => (
                <li key={index} className="my-4 text-sm">
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E6F7F4] shadow-md rounded-lg text-sm text-black font-medium border border-[#4EB7AC]/50"
                  >
                    <FaCheckCircle className="text-primary" />
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/3 p-2 px-10">
            <h2 className="text-lg font-semibold">Optionals</h2>
            <ul className="my-4">
              {optionalItems.map((item, index) => (
                <li key={index} className="my-4 text-sm">
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FFF2F2] shadow-md rounded-lg text-sm text-black font-medium border border-secondary/50"
                  >
                    <FaRegCircle className="text-secondary" />
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferOverview;
