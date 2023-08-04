import { APP_DOMAIN, HOME_DOMAIN } from "../domains";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { SiGithub } from "react-icons/si";

const Hero = () => {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-center font-black text-7xl w-[50%] mx-auto">
        Create Powerful Forms With Ease
      </h1>
      <p className="text-center w-[50%] mx-auto text-gray-600 font-medium mt-5 text-lg">
        Logform is an open-source Google Forms alternative that makes it easy to
        create, monitor, track and analyze forms.
      </p>
      <div className="flex items-center gap-7 w-full justify-center mt-7">
        <Link href={`${APP_DOMAIN}/signup`}>
          <button className="bg-black text-white px-6 py-3 rounded-full group flex items-center gap-2">
            Start for free
            <BsArrowRightShort className="group-hover:translate-x-1 transition-all text-lg" />
          </button>
        </Link>
        <Link href={`${HOME_DOMAIN}/github`} target="_blank">
          <button className="bg-white text-black border border-gray-400 transition-all hover:border-black px-6 py-3 rounded-full group flex items-center gap-2">
            <SiGithub className="text-lg" />
            Star on GitHub
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
