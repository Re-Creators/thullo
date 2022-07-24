import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import AllCover from "./AllCover";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { State } from "./enums";
import Photos from "./Photos";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const stateTitle = ["Board Cover", "Photos"];

export default function BoardCoverModal({ isOpen, closeModal }: Props) {
  const coverOptionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(0);

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div
            className="bg-white border shadow-md absolute w-96 p-5 rounded-lg"
            ref={coverOptionRef}
          >
            <Dialog.Title>
              <div className="flex items-center">
                {state !== State.Default && (
                  <button
                    className="hover:text-slate-500"
                    onClick={() => setState(State.Default)}
                  >
                    <MdOutlineArrowBackIos />
                  </button>
                )}
                <h1 className="text-md mx-auto">{stateTitle[state]}</h1>
              </div>
              <hr className="mt-3" />
            </Dialog.Title>

            {state === 0 && (
              <AllCover changeState={(value) => setState(value)} />
            )}
            {state === 1 && <Photos />}
            {state === 2 && <div>Colors</div>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
