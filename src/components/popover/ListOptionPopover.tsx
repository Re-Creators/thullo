import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ListOptionPopover() {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className=" outline-none">
            <FiMoreHorizontal fontSize={24} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute w-80 left-0 z-10 mt-3  transform px-4 sm:px-0 ">
              <div className="overflow-hidden w-64">
                <div className="bg-white p-1 border rounded-lg shadow-lg">
                  <ul className="divide-y-2 space-y-1">
                    <li className="px-5 py-4 cursor-pointer hover:bg-gray-100">
                      Rename
                    </li>
                    <li className="px-5 py-4 cursor-pointer hover:bg-gray-100">
                      Delete this list
                    </li>
                  </ul>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
