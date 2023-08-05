const Input = ({
  onChange,
  placeholder,
  text,
  type,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  text: string;
  type: "email" | "text" | "password";
}) => {
  return (
    <div className="my-3">
      <p className="text-black font-semibold mb-1">{text}</p>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none border-2 border-gray-400 rounded-full pl-3 w-[450px] py-2 font-semibold focus:border-black transition-colors"
        type={type}
      />
    </div>
  );
};

export default Input;
