import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { MdAutoGraph } from "react-icons/md";
import { PiIntersectFill } from "react-icons/pi";
import { TbDeviceIpadHorizontalShare, TbHandClick } from "react-icons/tb";

const routes = [
  {
    title: "Summary",
    path: "/",
    icon: <CiViewList />,
  },
  {
    title: "Submissions",
    path: "/submissions",
    icon: <TbHandClick />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <MdAutoGraph />,
  },
  {
    title: "Share",
    path: "/share",
    icon: <TbDeviceIpadHorizontalShare />,
  },
  {
    title: "Integrations",
    path: "/integrations",
    icon: <PiIntersectFill />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <HiOutlineCog6Tooth />,
  },
];

const Navbar = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="px-24 border-b-2 border-black/10 flex flex-col bg-white items-center sticky top-0 z-50">
      <div className="flex w-full items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <Link href={"/dashboard"}>
            <h1 className="text-2xl font-bold">Logform</h1>
          </Link>
          <div className="h-6 w-[1px] bg-black/40 rotate-[25deg]"></div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{title}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full bg-black text-white">
          <AiOutlineEdit />
          Edit
        </button>
      </div>
      <div className="flex items-center gap-12 mt-3">
        {routes.map((link, i) => (
          <Link
            key={i}
            href={`/forms/${router.query.key}${link.path}`}
            className={`border-b-2 px-2 pb-1 flex items-center gap-2 transition-colors ${
              router.pathname.split("/")[3] === link.path.replace("/", "") ||
              (router.pathname === "/forms/[key]" && link.path === "/")
                ? "border-black"
                : "border-transparent hover:border-black/50"
            }`}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
