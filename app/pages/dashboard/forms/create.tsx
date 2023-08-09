import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { FaShareNodes } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";

const Create = () => {
  return (
    <div>
      <div className="px-4 py-5 border-b-2 border-gray-500/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/forms" className="">
            <MdArrowBack className="text-4xl bg-gray-500/40 rounded-full p-2" />
          </Link>
          <input
            type="text"
            placeholder="Title"
            value="My Form"
            className="text-lg font-semibold outline-gray-500 pl-2"
          />
        </div>
        <div className="flex items-center gap-5 font-semibold">
          <button>
            <FaShareNodes />
          </button>
          <button>Preview</button>
          <button className="bg-black/80 rounded-full px-6 py-2 text-white">
            Publish
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="px-2 w-[20%] border-r-2 border-gray-200">
          <div className="flex items-center justify-between px-2 py-3">
            <p className="font-semibold text-lg">Form fields</p>
            <button className="">
              <BiPlus />
            </button>
          </div>
        </div>
        <div className="w-[55%]">content</div>
        <div className="w-[25%]">options</div>
      </div>
    </div>
  );
};

export default Create;
