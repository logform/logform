import { Switch as SwitchHeadless } from "@headlessui/react";

const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <SwitchHeadless
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-gray-400" : "bg-gray-200"}
      relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-6" : "translate-x-0"}
        pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </SwitchHeadless>
  );
};

export default Switch;
