import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  title: String;
  description: String;
  className: string;
  children: React.ReactNode;
}

export default function InviteMemberPopover({
  title,
  description,
  className,
  children,
}: Props) {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className={className}>{children}</Popover.Button>
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
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-1 text-gray-400 text-sm">{description}</p>
                  </div>
                  <div className="mt-6 relative w-full overflow-hidden bg-white shadow-md border rounded-lg">
                    <input
                      type="text"
                      className="outline-none p-3 pr-16 text-sm w-full"
                      placeholder="User..."
                    />
                    <button className="btn-blue absolute right-1 top-1 bottom-1  px-3 ">
                      <AiOutlineSearch size={24} />
                    </button>
                  </div>
                  <div className="mt-5 p-3 border shadow-lg rounded-lg">
                    <div className="flex space-x-3 items-center hover:bg-gray-300 p-2 cursor-pointer rounded-lg">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <div className="w-full h-full bg-slate-500 flex items-center justify-center text-white">
                          CA
                        </div>
                      </div>
                      <div>Carl Adamantite</div>
                    </div>
                    <div className="flex space-x-3 items-center hover:bg-gray-300 p-2 cursor-pointer rounded-lg">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <div className="w-full h-full bg-slate-500 flex items-center justify-center text-white">
                          CA
                        </div>
                      </div>
                      <div>Carl Adamantite</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button className="btn-blue mt-5 w-1/2 py-2">Invite</button>
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
