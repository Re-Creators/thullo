import { colors, photos } from "../../../utils/constants";
import { State } from "./enums";

interface Props {
  changeState: (value: any) => void;
}

export default function AllCover({ changeState }: Props) {
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
              className="img-container h-14 cursor-pointer group relative"
              key={photo.id}
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
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2>Colors</h2>
        </div>
        <div className="grid  grid-cols-3 gap-2 mt-1">
          {colors.map((color) => (
            <div
              className="cursor-pointer rounded-md h-14 curso-pointer group overflow-hidden"
              key={color.name}
              style={{ backgroundColor: color.value }}
            >
              <div
                className="hidden group-hover:block w-full h-full"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
