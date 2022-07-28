import { Dialog } from "@headlessui/react";
import { useRef, useState } from "react";
import AllCover from "./AllCover";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { State } from "./enums";
import Photos from "./Photos";
import { CoverType } from "../../../types";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

interface Props {
  selected: string;
  closeModal: () => void;
  chooseCover: (type: CoverType, cover: string) => void;
}

const stateTitle = ["Board Cover", "Photos"];

const BoardCoverModal = NiceModal.create(({ chooseCover, selected }: Props) => {
  const modal = useModal();
  const coverOptionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(0);

  return (
    <Dialog
      as="div"
      open={modal.visible}
      onClose={() => modal.remove()}
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
              <AllCover
                changeState={(value) => setState(value)}
                chooseCover={chooseCover}
                selected={selected}
              />
            )}
            {state === 1 && <Photos />}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
});

export default BoardCoverModal;
