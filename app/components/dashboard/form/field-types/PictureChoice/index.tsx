import { PictureChoiceProps } from "@/interfaces";
import { BiPlus } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { PiSwapBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";

const PictureChoice = ({
  options,
  onUpdate,
  addNewOption,
}: {
  options: PictureChoiceProps[];
  onUpdate: () => void;
  addNewOption: () => void;
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <div className="w-44 p-1 h-52 border-2 group border-gray-200 rounded-md relative">
          <button className="opacity-0 transition-opacity absolute -top-2 -right-2 group-hover:opacity-100 bg-white rounded-full border-2 border-gray-300">
            <GrFormClose className="text-xl" />
          </button>
          <div className="absolute flex items-center gap-3 p-1 rounded-md left-2 top-2 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
            <button>
              <PiSwapBold />
            </button>
            <button>
              <RiDeleteBinLine />
            </button>
          </div>
          <div className="w-full h-[170px]">
            <img
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="text"
            className="w-full text-sm outline-none"
            placeholder="Label (optional)"
          />
        </div>
      ))}
      <button
        className="w-44 h-52 rounded-md border-gray-200 border-2 flex items-center justify-center text-3xl hover:bg-gray-50 transition-colors"
        onClick={addNewOption}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default PictureChoice;
