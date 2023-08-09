import { ReactNode } from "react";

const Flex = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-between my-7">{children}</div>
  );
};

export default Flex;
