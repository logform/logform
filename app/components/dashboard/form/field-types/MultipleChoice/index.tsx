const MultipleChoice = ({
  options,
  onClick,
}: {
  options: string[];
  onClick: () => void;
}) => {
  return (
    <div>
      {options.length}
      {options.map((option, index) => (
        <input key={index} value={option} />
      ))}
      <button onClick={onClick}>Add a new option</button>
    </div>
  );
};

export default MultipleChoice;
