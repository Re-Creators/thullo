import { BiCommentDetail } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

export default function CardItem() {
  return (
    <div className="w-full p-3 bg-white rounded-lg flex flex-col cursor-pointer">
      <div className="img-container w-full h-40 ">
        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
          alt=""
          className="img-full"
        />
      </div>
      <span className="mt-5">Github job challenge</span>
      <div className="mt-3">
        <ul className="flex space-x-3 text-xs">
          <li className="px-5 py-2 rounded-full bg-blue-300 text-blue-800 cursor-pointer">
            Technical
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="w-1/2 h-8 flex space-x-3">
          <div className="img-container w-8 h-full cursor-pointer">
            <img
              src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
              alt=""
              className="img-full"
            />
          </div>
          <button className="btn-blue px-2 h-full">
            <BsPlusLg />
          </button>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2 text-sm opacity-60">
            <span>
              <BiCommentDetail />
            </span>
            <span>2</span>
          </div>
          <div className="flex items-center space-x-2 text-sm opacity-60">
            <span>
              <MdAttachFile />
            </span>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
