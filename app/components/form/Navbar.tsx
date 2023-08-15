import { APP_DOMAIN } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";

const routes = [
  {
    title: "Summary",
    path: "/",
  },
  {
    title: "Submissions",
    path: "/submissions",
  },
  {
    title: "Share",
    path: "/share",
  },
  {
    title: "Integrations",
    path: "/integrations",
  },
  {
    title: "Settings",
    path: "/settings",
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="px-24 border-b-2 border-black/10 flex flex-col items-center">
      <div className="flex w-full items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">Logform</h1>
          </Link>
          <div className="h-6 w-[1px] bg-black/40 rotate-[25deg]"></div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Test form</p>
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
            className={`border-b-2 px-2 pb-1 transition-colors ${
              router.pathname === link.path ||
              (router.pathname === "/forms/[key]" && link.path === "/")
                ? "border-black"
                : "border-transparent hover:border-black/50"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
