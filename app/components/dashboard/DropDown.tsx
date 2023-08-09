import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { GrAppsRounded } from "react-icons/gr";

interface MenuItemProps {
  text: string;
  icon: ReactNode;
  action: () => void;
}

const DropDown = ({ menuItems }: { menuItems: MenuItemProps[] }) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full p-2 text-sm font-medium text-white hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <GrAppsRounded className="text-xl" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {menuItems.map((item, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-black/10" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 font-semibold text-sm`}
                      onClick={item.action}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.text}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
