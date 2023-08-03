import { Popover } from "@headlessui/react";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { deleteSingleList } from "../../api/services/lists";
import useListStore from "../../store/useListStore";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

interface Props {
  listId: string;
}

export default function ListOptionPopover({ listId }: Props) {
  const deleteList = useListStore.getState().deleteList;

  const deleteHandler = async () => {
    await deleteSingleList(listId);
    deleteList(listId);
  };

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none" ref={setReferenceElement}>
        <FiMoreHorizontal fontSize={24} />
      </Popover.Button>
      {createPortal(
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="overflow-hidden w-64">
            <div className="bg-white p-1 border rounded-lg shadow-lg">
              <ul className="space-y-1">
                <li
                  className="px-5 py-4 cursor-pointer hover:bg-gray-100"
                  onClick={deleteHandler}
                >
                  Delete this list
                </li>
              </ul>
            </div>
          </div>
        </Popover.Panel>,
        document.getElementById("popover-parent") as HTMLElement
      )}
    </Popover>
  );
}
