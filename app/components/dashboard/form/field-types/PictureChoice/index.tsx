import { PictureChoiceProps } from "@/interfaces";
import { BiPlus } from "react-icons/bi";

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
        <div className="w-44 p-1 h-52 border-2 border-gray-200 rounded-md">
          <div className="w-full h-[170px]">
            <img
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              className="w-full h-full object-contain"
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
