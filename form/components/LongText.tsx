import { ChangeEvent } from "react";

const LongText = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div>
      <textarea
        className="outline-none border border-gray-400 rounded-md text-lg pl-3 py-1 focus:border-black w-full h-[200px]"
        onChange={onChange}
      />
    </div>
  );
};

export default LongText;
