import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoCloseSharp } from "react-icons/io5";
import MainContent from "./MainContent";
import Actions from "./Actions";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import useCardStore from "../../../store/useCardStore";

interface Props {
  listName: string;
}

const CardInformationModal = NiceModal.create(({ listName }: Props) => {
  const modal = useModal();
  const card = useCardStore((state) => state.selectedCard);

  return (
    <>
      <Transition appear show={modal.visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={modal.hide}>
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
                <Dialog.Panel className="w-1/2 transform relative rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {card && (
                    <>
                      <button
                        className="btn-blue absolute right-4 top-4 p-2 z-10 outline-none"
                        onClick={modal.hide}
                      >
                        <IoCloseSharp fontSize={24} />
                      </button>
                      {card.cover && (
                        <div className="img-container w-full h-40">
                          <img
                            src={card.cover.source}
                            alt=""
                            className="img-full"
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-[70%_1fr] gap-10 mt-5">
                        <MainContent listName={listName} card={card} />
                        <Actions />
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default CardInformationModal;
