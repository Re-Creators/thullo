import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import Description from "./Description";
import Team from "./Team";
import useBoardStore from "../../store/useBoardStore";
import shallow from "zustand/shallow";
import moment from "moment";

interface Props {
  isShowing: boolean;
  setIsShowing: (val: boolean) => void;
}

export default function BoardMenu({ isShowing, setIsShowing }: Props) {
  const [board, setBoard] = useBoardStore(
    (state) => [state.board, state.setBoard],
    shallow
  );

  return (
    <Transition.Root show={isShowing} as={Fragment}>
      <Dialog as={Fragment} onClose={() => {}}>
        <div className="fixed z-10 inset-y-0 overflow-hidden">
          <div className="pointer-events-none fixed bottom-0 top-[70px] right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-auto bg-white py-6 border-l shadow-sm">
                  <div className="px-4 sm:px-6">
                    <div className="flex justify-between pb-5 border-b">
                      <h1 className="font-semibold">Menu</h1>
                      <button onClick={() => setIsShowing(false)}>
                        <AiOutlineClose className="text-2xl" />
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-3 flex-1 px-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6 space-y-8">
                      <div>
                        <div className=" text-gray-400 flex items-center">
                          <span>
                            <HiUserCircle className="text-xl" />
                          </span>{" "}
                          <span className="text-xs ml-2">Made by</span>
                        </div>
                        <div className="mt-5 flex">
                          <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <img
                              src="https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg"
                              alt=""
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-3">
                            <h2>{board?.profiles.username}</h2>
                            <p className="text-gray-400 text-xs">
                              on {moment(board?.created_at).format("ll")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Description
                        text={board?.description || ""}
                        setBoard={setBoard}
                      />
                      <Team />
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
