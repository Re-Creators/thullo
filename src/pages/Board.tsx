import { BiCommentDetail } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import CardItem from "../components/board/CardItem";
import CardInformation from "../components/modals/card-information/CardInformation";
import InviteMemberPopover from "../components/popover/InviteMemberPopover";
import VisibilityPopover from "../components/popover/VisibilityPopover";

export default function Board() {
  return (
    <div className="bg-white min-h-screen px-8 py-16">
      <div className="flex justify-between h-10">
        <div className="flex">
          <VisibilityPopover />
          <div className="ml-5 flex space-x-3">
            <div className="img-container w-10 h-10 cursor-pointer">
              <img
                src="https://pbs.twimg.com/media/FDRw7kCagAAfb0b?format=jpg&name=900x900"
                alt=""
                className="img-full"
              />
            </div>
            <div className="img-container w-10 h-10 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1658171402816-315e4cb993bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="img-full"
              />
            </div>
            <InviteMemberPopover />
          </div>
        </div>
        <button className="btn-gray px-8 py-3 ">
          <MdOutlineMoreHoriz fontSize={24} />
          <span className="text-sm ml-3">Show Menu</span>
        </button>
      </div>
      <div className="bg-[#F8F9FD] flex space-x-8 p-5 rounded-lg w-full mt-10">
        <div>
          <div className="w-[343px]">
            <div className="flex justify-between items-center">
              <h2>Backlog</h2>
              <button>
                <FiMoreHorizontal fontSize={24} />
              </button>
            </div>
          </div>
          <div className="space-y-4 mt-5">
            <CardItem />
            <div className="flex items-center justify-between w-full bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer">
              <span>Add another card</span>
              <BsPlusLg />
            </div>
          </div>
        </div>
        <div>
          <div className="w-[343px]">
            <div className="flex justify-between items-center">
              <h2>In Progress</h2>
              <button>
                <FiMoreHorizontal fontSize={24} />
              </button>
            </div>
          </div>
          <div className="space-y-4 mt-5">
            <CardItem />
            <CardItem />
            <CardItem />
          </div>
        </div>
        <div className="flex items-center justify-between w-[343px] h-10 bg-blue-200 hover:bg-blue-300 active:translate-y-0.5 text-blue-800 py-2 px-3 rounded-lg cursor-pointer">
          <span>Add another list</span>
          <BsPlusLg />
        </div>
      </div>
      <CardInformation />
    </div>
  );
}
