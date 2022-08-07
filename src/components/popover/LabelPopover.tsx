import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdLabel } from "react-icons/md";
import { updateCard } from "../../api/services/cards";
import { postNewLabel } from "../../api/services/labels";
import useBoardStore from "../../store/useBoardStore";
import useCardStore from "../../store/useCardStore";
import useLabelStore from "../../store/useLabelStore";
import { CardData, LabelData } from "../../types";
import { labelPresets, labels, presetKey } from "../../utils/constants";

export default function LabelPopover() {
  const boardId = useBoardStore((state) => state.boardId);
  const boardLabels = useLabelStore((state) => state.labels);
  const card = useCardStore((state) => state.selectedCard) as CardData;
  const addLabel = useLabelStore.getState().addLabel;
  const updateCardInformation = useCardStore.getState().updateCardInformation;
  const [labelSelected, setLabelSelected] = useState<{
    name: string;
    color: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [labelName, setLabelName] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const isLabelSelected = (labelId: string) => {
    if (card.labels) return card.labels.some((label) => label.id === labelId);
    return false;
  };

  const createLabelHandler = async () => {
    const { data } = await postNewLabel({
      name: labelName,
      color: labelSelected?.color || "",
      board_id: boardId || "",
    });
    addLabel(data);
    setLabelName("");
    setLabelSelected(null);
  };

  const selectLabelHandler = async (label: LabelData) => {
    let cardLabels = card.labels || [];
    const isLabelExist = cardLabels.some((l) => l.id === label.id);

    if (isLabelExist) {
      cardLabels = cardLabels.filter((l) => l.id !== label.id);
    } else {
      cardLabels.push(label);
    }

    const { data } = await updateCard(card.id, {
      labels: cardLabels,
    });
    updateCardInformation(data);
  };

  useEffect(() => {
    if (labelName.trim().length > 0 && labelSelected) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [labelSelected, labelName]);

  useEffect(() => {
    if (!isOpen) {
      setLabelName("");
      setLabelSelected(null);
    }
  }, [isOpen]);

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className="btn-gray w-full px-3 py-1.5 outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
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
                      placeholder="Label name..."
                      value={labelName}
                      onChange={(e) => setLabelName(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 py-3 grid grid-cols-4 gap-2">
                    {labels.map((label) => (
                      <div
                        className={`relative rounded-lg cursor-pointer h-10 group overflow-hidden ${
                          labelPresets[label.color as presetKey]
                        }`}
                        key={label.color}
                        onClick={() => setLabelSelected(label)}
                      >
                        <div
                          className={`${
                            labelSelected?.color !== label.color ? "hidden" : ""
                          } group-hover:block w-full h-full`}
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                        >
                          {labelSelected?.color === label.color && (
                            <span className="absolute inset-0 flex items-center justify-center text-white">
                              <BsCheck fontSize={24} />
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {boardLabels.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center text-gray-400">
                        <MdLabel />
                        <span className="ml-3">Available</span>
                      </div>
                      <div className="mt-3">
                        <ul className="flex flex-wrap gap-2 text-xs">
                          {boardLabels.map((label) => (
                            <li
                              className={`px-5 py-2 relative rounded-full ${
                                labelPresets[label.color as presetKey]
                              } text-white cursor-pointer relative overflow-hidden group`}
                              onClick={() => selectLabelHandler(label)}
                            >
                              <div
                                className={`${
                                  !isLabelSelected(label.id) && "hidden"
                                } absolute inset-0  group-hover:block`}
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                                }}
                              >
                                {isLabelSelected(label.id) && (
                                  <span className="absolute inset-0 flex items-center justify-center text-white">
                                    <BsCheck fontSize={24} />
                                  </span>
                                )}
                              </div>
                              {label.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <button
                      className="btn-blue mt-5 w-1/2 py-2"
                      disabled={isDisable}
                      onClick={createLabelHandler}
                    >
                      Add
                    </button>
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
