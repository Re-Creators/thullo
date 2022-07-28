import { Dialog, Transition } from "@headlessui/react";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsPlusLg } from "react-icons/bs";
import { BiImageAlt, BiLockAlt } from "react-icons/bi";
import BoardCoverModal from "./board-cover/BoardCoverModal";
import { CardBoardData, CoverType } from "../../types";
import { photos } from "../../utils/constants";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const intitalData = {
  id: "",
  title: "",
  type: "Color" as CoverType,
  cover: "#ccc",
  isPrivate: false,
};

interface Props {
  createBoard: (board: CardBoardData) => void;
}

const NewBoardModal = NiceModal.create(({ createBoard }: Props) => {
  const modal = useModal();
  const boardId = useId();
  const coverBtnRef = useRef<HTMLButtonElement>(null);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState({
    type: "Image" as CoverType,
    cover: photos[4].image,
  });
  const [isPrivate, setIsPrivate] = useState(false);

  const reset = useCallback(() => {
    setTitle("");
    setCover({
      type: "Image" as CoverType,
      cover: photos[4].image,
    });
    setIsPrivate(false);
  }, []);

  const chooseCover = (type: CoverType, cover: string) => {
    setCover({ type, cover });
  };

  const createBoardHandler = () => {
    createBoard({
      id: `${new Date().getTime()}`,
      title,
      type: cover.type,
      cover: cover.cover,
      isPrivate,
    });
    reset();
    modal.hide();
  };

  const showCoverModal = () => {
    NiceModal.show(BoardCoverModal, { chooseCover, selected: cover.cover });
  };

  useEffect(() => {
    if (modal.visible) {
      reset();
    }
  }, [modal.visible, reset]);

  return (
    <>
      <Transition appear show={modal.visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => modal.hide()}>
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
                    {cover.type === "Color" ? (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: cover.cover }}
                      ></div>
                    ) : (
                      <img src={cover.cover} alt="" className="img-full" />
                    )}
                  </div>
                  <div className="mt-8">
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border shadow-md outline-none text-sm"
                      placeholder="Board title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-5">
                    <button
                      className="py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center"
                      onClick={showCoverModal}
                      ref={coverBtnRef}
                    >
                      <BiImageAlt />
                      <span className="text-sm ml-3">Cover</span>
                    </button>
                    <button
                      className={`py-3 ${
                        isPrivate
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                      } rounded-lg flex items-center justify-center`}
                      onClick={() => setIsPrivate(!isPrivate)}
                    >
                      <BiLockAlt />
                      <span className="text-sm ml-3">Private</span>
                    </button>
                  </div>

                  <div className="mt-8 flex justify-end items-center">
                    <button
                      type="button"
                      className="inline-flex text-gray-600 hover:text-gray-500"
                      onClick={() => modal.hide()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-blue px-8 py-2 ml-5 flex items-center"
                      onClick={createBoardHandler}
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
    </>
  );
});

export default NewBoardModal;
