import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { BiImageAlt, BiLockAlt } from "react-icons/bi";
import BoardCoverModal from "./board-cover/BoardCoverModal";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function NewBoardModal({ isOpen, closeModal }: Props) {
  const [openCover, setOpenCover] = useState(false);
  const coverBtnRef = useRef<HTMLButtonElement>(null);
  const coverOptionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (openCover) {
  //     const pos = coverBtnRef.current?.getBoundingClientRect();
  //     console.log(pos?.y);

  //     if (pos && coverOptionRef.current) {
  //       coverOptionRef.current.style.top = `${pos.y + pos.height - 20}px`;
  //       coverOptionRef.current.style.left = `${pos.x - 250}px`;
  //     }
  //   }
  // }, [openCover]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="img-container h-32">
                    <img
                      src="https://pbs.twimg.com/media/FDRw7kCagAAfb0b?format=jpg&name=900x900"
                      alt=""
                      className="img-full"
                    />
                  </div>
                  <div className="mt-8">
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border shadow-md outline-none text-sm"
                      placeholder="Board title..."
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-5">
                    <button
                      className="py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center"
                      onClick={() => setOpenCover(!openCover)}
                      ref={coverBtnRef}
                    >
                      <BiImageAlt />
                      <span className="text-sm ml-3">Cover</span>
                    </button>
                    <button className="py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center">
                      <BiLockAlt />
                      <span className="text-sm ml-3">Private</span>
                    </button>
                  </div>

                  <div className="mt-8 flex justify-end items-center">
                    <button
                      type="button"
                      className="inline-flex text-gray-600 hover:text-gray-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-blue px-8 py-2 ml-5 flex items-center"
                      onClick={closeModal}
                    >
                      <BsPlusLg />
                      <span className="ml-2">Create</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {openCover && (
        <BoardCoverModal
          isOpen={openCover}
          closeModal={() => setOpenCover(false)}
        />
      )}
    </>
  );
}
