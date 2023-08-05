import { CgSpinner } from "react-icons/cg";

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
      className="outline-none border-2 text-white bg-black/90 hover:bg-black transition-colors rounded-full pl-3 w-[450px] py-3 font-semibold text-center mt-5 flex items-center justify-center disabled:cursor-not-allowed h-12"
      disabled={disabled || loading}
    >
      {loading ? (
        <CgSpinner className="text-lg text-center animate-spin" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
