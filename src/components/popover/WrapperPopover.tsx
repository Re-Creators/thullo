import { Popover, Transition } from "@headlessui/react";
import React, { Children, Fragment } from "react";
import { BsPlusLg } from "react-icons/bs";

interface Props {
  children: React.ReactNode;
}

export default function WrapperPopover({ children }: Props) {
  return (
    <Popover className="relative">
      <Popover.Button className="btn-blue px-3 h-full outline-none">
        <BsPlusLg />
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
        <Popover.Panel className="absolute w-80 left-0 z-10 mt-3  transform px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
