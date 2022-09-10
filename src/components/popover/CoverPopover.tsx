import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { updateCard } from "../../api/services/cards";
import useCardStore from "../../store/useCardStore";
import { photos } from "../../utils/constants";

export default function CoverPopover() {
  const updateCardInformation = useCardStore(
    (state) => state.updateCardInformation
  );
  const card = useCardStore((state) => state.selectedCard);

  const chooseCoverHandler = async (source: string) => {
    if (card) {
      const { data } = await updateCard(card.id, {
        cover: {
          type: "Image",
          source,
        },
      });
      updateCardInformation(data);
    }
  };
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="btn-gray w-full px-3 py-1.5 outline-none">
            <BsImageFill />
            <span className="ml-2">Cover</span>
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
            <Popover.Panel className="absolute w-80 left-0 z-10 mt-3  transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                <div className="bg-white p-4 border">
                  <div>
                    <h2 className="font-semibold">Cover</h2>
                    <p className="mt-1 text-gray-400 text-sm">
                      Search unsplash for photos
                    </p>
                  </div>
                  <div className="mt-6 relative w-full overflow-hidden bg-white shadow-md border rounded-lg">
                    <input
                      type="text"
                      className="outline-none p-3 pr-16 text-sm w-full"
                      placeholder="Keywords..."
                    />
                    <button className="btn-blue absolute right-1 top-1 bottom-1  px-3 ">
                      <AiOutlineSearch size={24} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    {photos.map((photo) => (
                      <div
                        className="img-container h-14 cursor-pointer group relative"
                        key={photo.id}
                        onClick={() => chooseCoverHandler(photo.image)}
                      >
                        <img src={photo.image} alt="" className="img-full" />
                        <div
                          className="hidden group-hover:block absolute inset-0"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                        />
                      </div>
                    ))}
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
