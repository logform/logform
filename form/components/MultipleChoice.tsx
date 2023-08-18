const MultipleChoice = ({
  options,
}: {
  options: { index: number; value: string }[];
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        {options.map((option) => (
          <button
            key={option.index}
            className="flex gap-2 border border-gray-400 w-full p-1 rounded-full"
          >
            <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full">
              {option.index}
            </div>
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
