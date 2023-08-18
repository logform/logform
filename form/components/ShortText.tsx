import { ChangeEvent } from "react";

const ShortText = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <input
        type="text"
        className="outline-none border border-gray-400 rounded-full pl-3 w-full py-2 font-semibold focus:border-black transition-colors"
        onChange={onChange}
      />
    </div>
  );
};

export default ShortText;
