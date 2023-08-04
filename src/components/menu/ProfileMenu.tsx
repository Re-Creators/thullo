import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import useUserStore from "../../store/useUserStore";
import { MdAccountCircle } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { supabase } from "../../api/supabaseClient";

export default function ProfileMenu() {
  const user = useUserStore((state) => state.user);

  const signOut = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <div className="flex items-center space-x-2">
            <Menu.Button className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user?.user_metadata.avatar_url}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
            </Menu.Button>
            <div className="hidden lg:block">
              {user?.user_metadata.username}
            </div>
            <Menu.Button className="hidden lg:block">
              <AiOutlineCaretDown />
            </Menu.Button>
          </div>
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
          <Menu.Items className="absolute z-50 right-0 mt-2 w-32 lg:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  className="flex space-x-3 items-center py-2 px-4 w-full rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={signOut}
                >
                  <BiLogOut className="w-7 h-7" />
                  <span>Logout</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
