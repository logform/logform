const MultipleChoice = ({
  options,
  onClick,
  onChange,
}: {
  options: string[];
  onClick: () => void;
  onChange?: () => void;
}) => {
  return (
    <div>
      {options.map((option, index) => (
        <div
          className="border-2 border-gray-300 pl-3 rounded-full px-2 flex items-center justify-between my-2 group focus:border-gray-400 group"
          key={index}
        >
          <small>{index + 1}.</small>
          <input
            defaultValue={option}
            onChange={onChange}
            className="pl-3 py-2 rounded-full outline-none"
          />
          <button className="opacity-0 group-hover:opacity-100">x</button>
        </div>
      ))}
      <button onClick={onClick}>Add a new option</button>
    </div>
  );
};

export default MultipleChoice;
