const Button = ({
  text,
  disabled,
  loading,
}: {
  text: string;
  disabled: boolean;
  loading: boolean;
}) => {
  return (
    <button
      className="outline-none border-2 text-white bg-black/90 hover:bg-black transition-colors rounded-full pl-3 w-[450px] py-3 font-semibold text-center mt-5"
      disabled={disabled}
    >
      {loading ? <></> : text}
    </button>
  );
};

export default Button;
