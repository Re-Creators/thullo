import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdLabel } from "react-icons/md";
import { labels } from "../../utils/constants";

export default function LabelPopover() {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="btn-gray w-full px-3 py-1.5 outline-none">
            <MdLabel />
            <span className="ml-2"> Label</span>
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
                    <h2 className="font-semibold">Label</h2>
                    <p className="mt-1 text-gray-400 text-sm">
                      Select a name and color
                    </p>
                  </div>
                  <div className="mt-6 relative w-full overflow-hidden bg-white shadow-md border rounded-lg">
                    <input
                      type="text"
                      className="outline-none p-3 pr-16 text-sm w-full"
                      placeholder="Label"
                    />
                  </div>
                  <div className="mt-1 py-3 grid grid-cols-4 gap-2">
                    {labels.map((label) => (
                      <div
                        className="rounded-lg cursor-pointer h-10 group overflow-hidden"
                        key={label.color}
                        style={{ backgroundColor: label.color }}
                      >
                        <div className="hidden group-hover:block w-full h-full bg-black opacity-25"></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center text-gray-400">
                      <MdLabel />
                      <span className="ml-3">Available</span>
                    </div>
                    <div className="mt-3">
                      <ul className="flex space-x-3 text-xs">
                        <li className="px-5 py-2 rounded-full bg-blue-300 hover:bg-blue-400 text-blue-800 cursor-pointer">
                          Technical
                        </li>
                        <li className="px-5 py-2 rounded-full bg-green-300 hover:bg-green-400 text-green-800 cursor-pointer">
                          Design
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-blue mt-5 w-1/2 py-2">Add</button>
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
