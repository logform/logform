import Link from "next/link";
import { CgList } from "react-icons/cg";
import { BsCreditCard, BsArrowRightShort } from "react-icons/bs";
import { APP_DOMAIN } from "@/constants";

const Navbar = () => {
  const links = [
    { route: "/pricing", text: "Pricing", icon: <BsCreditCard /> },
    {
      route: "/changelog",
      text: "Changelog",
      icon: <CgList />,
      openInNewTab: true,
    },
  ];
  return (
    <div className="flex items-center justify-between px-14 py-7 font-medium">
      <h2>Logform</h2>
      <div className="flex gap-16 items-center">
        <div className="flex gap-10 items-center">
          {links.map((link, i) => (
            <Link
              href={link.route}
              key={i}
              className="flex items-center gap-2 hover:bg-black/10 transition-colors rounded-lg px-2 py-1"
              target={link?.openInNewTab ? "_blank" : ""}
            >
              {link.icon} {link.text}
            </Link>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <Link href={`${APP_DOMAIN}/login`}>Login</Link>
          <Link href={`${APP_DOMAIN}/signup`}>
            <button className="bg-black text-white px-4 py-3 rounded-full group flex items-center gap-2">
              Get Started
              <BsArrowRightShort className="group-hover:translate-x-1 transition-all text-lg" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
