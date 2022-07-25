import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiLockAlt } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";

export default function VisibilityPopover() {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="btn-gray px-8 py-3 outline-none">
            <BiLockAlt />
            <span className="text-sm ml-3">Private</span>
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
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                <div className="bg-white p-4 border">
                  <div>
                    <h2>Visibility</h2>
                    <p className="mt-1 text-gray-400">
                      Choose who can see this board
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <MdOutlinePublic />
                        <span className="ml-3">Public</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-2">
                        Anyone on the internet can see this.
                      </p>
                    </div>
                    <div className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <BiLockAlt />
                        <span className="ml-3">Private</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-2">
                        Only board member can see this.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
