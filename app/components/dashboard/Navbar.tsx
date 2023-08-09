import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import DropDown from "./DropDown";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const items = [
    {
      text: "Settings",
      icon: <HiOutlineCog6Tooth />,
      action: () => router.push("/dashboard/settings"),
    },
    {
      text: "Logout",
      icon: <FiLogOut />,
      action: () => router.push("/dashboard/logout"),
    },
  ];

  return (
    <div className="px-14 py-6 border-b-2 border-black/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Logform</h1>
          <div className="h-8 w-[1px] bg-black/40 rotate-[25deg]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black/40 rounded-full"></div>
            <p className="font-semibold">Akinkunmi</p>
          </div>
        </div>
        {/* <button>Options</button> */}
        <DropDown menuItems={items} />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Navbar;
