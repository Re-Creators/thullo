import { BsCheck } from "react-icons/bs";
import { CoverType } from "../../../types";
import { colors, photos } from "../../../utils/constants";
import { State } from "./enums";

interface Props {
  changeState: (value: any) => void;
  selected: string;
  chooseCover: (type: CoverType, cover: string) => void;
}

export default function AllCover({
  changeState,
  selected,
  chooseCover,
}: Props) {
  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2>Photos</h2>
          <button
            className="underline text-sm py-2 px-5 hover:bg-slate-200"
            onClick={() => changeState(State.Photos)}
          >
            See more
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {photos.slice(0, 6).map((photo) => (
            <div
              className="img-container h-14 cursor-pointer group relative bg-center bg-cover"
              key={photo.id}
              onClick={() => chooseCover("Image", photo.image)}
              style={{ backgroundImage: `url(${photo.image})` }}
            >
              <div
                className={`${
                  selected !== photo.image && "hidden"
                } group-hover:block w-full h-full`}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
              />
              {selected === photo.image && (
                <span className="absolute inset-0 flex items-center justify-center text-white">
                  <BsCheck fontSize={24} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2>Colors</h2>
        </div>
        <div className="grid  grid-cols-3 gap-2 mt-1">
          {colors.map((color) => (
            <div
              className="cursor-pointer rounded-md h-14 curso-pointer group overflow-hidden relative"
              key={color.name}
              style={{ backgroundColor: color.value }}
              onClick={() => chooseCover("Color", color.value)}
            >
              <div
                className={`${
                  selected !== color.value && "hidden"
                } group-hover:block w-full h-full`}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
              />
              {selected === color.value && (
                <span className="absolute inset-0 flex items-center justify-center text-white">
                  <BsCheck fontSize={24} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
