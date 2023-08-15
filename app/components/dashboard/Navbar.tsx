import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import DropDown from "./DropDown";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const items = [
    {
      text: "Settings",
      icon: <HiOutlineCog6Tooth />,
      action: () => router.push("/settings"),
    },
    {
      text: "Logout",
      icon: <FiLogOut />,
      action: () => router.push("/dashboard/logout"),
    },
  ];

  const links = [
    {
      text: "Forms",
      route: "/dashboard",
    },
    {
      text: "Settings",
      route: "/settings",
    },
  ];

  return (
    <div className="px-24 border-b-2 border-black/10 flex flex-col">
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Logform</h1>
          <div className="h-8 w-[1px] bg-black/40 rotate-[25deg]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black/40 rounded-full"></div>
            <p className="font-semibold">Akinkunmi</p>
          </div>
        </div>
        <DropDown menuItems={items} />
      </div>
      <div className="flex items-center gap-12 mt-3">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.route}
            className={`border-b-2 px-2 pb-1 transition-colors ${
              router.pathname === link.route
                ? " border-black"
                : "border-transparent hover:border-black/50"
            }`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
