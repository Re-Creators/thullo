import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { deleteSingleList } from "../../api/services/lists";
import useListStore from "../../store/useListStore";

interface Props {
  listId: string;
}

export default function ListOptionPopover({ listId }: Props) {
  const deleteList = useListStore.getState().deleteList;

  const deleteHandler = async () => {
    await deleteSingleList(listId);
    deleteList(listId);
  };

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className=" outline-none">
            <FiMoreHorizontal fontSize={24} />
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
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
