import { IoMdClose } from "react-icons/io";
import { ChangeEvent } from "react";

const MultipleChoice = ({
  options,
  onClick,
  onChange,
  onRemoveOption,
}: {
  options: { index: number; value: string }[];
  onClick: () => void;
  onChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveOption: (index: number) => void;
}) => {
  return (
    <div>
      {options.map((option) => (
        <div
          className="border-2 border-gray-300 pl-3 rounded-full px-2 flex items-center justify-between my-2 group focus:border-gray-400 group"
          key={option.index}
        >
          <small>{option.index}.</small>
          <input
            defaultValue={option.value}
            onChange={(e) => onChange(option.index, e)}
            className="pl-3 py-2 rounded-full outline-none text-sm"
          />
          {options.length > 1 && (
            <button
              className="opacity-0 group-hover:opacity-100 transition-colors p-1 hover:bg-gray-200 rounded-full"
              onClick={() => onRemoveOption(option.index)}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      ))}
      <button onClick={onClick} className="text-sm hover:underline">
        Add a new option
      </button>
    </div>
  );
};

export default MultipleChoice;
