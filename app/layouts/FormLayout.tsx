import { ReactNode } from "react";
import Navbar from "@/components/form/Navbar";

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default FormLayout;
