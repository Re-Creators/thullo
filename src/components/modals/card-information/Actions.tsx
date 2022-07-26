import { BsPeopleFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import CoverPopover from "../../popover/CoverPopover";
import InviteMemberPopover from "../../popover/InviteMemberPopover";
import LabelPopover from "../../popover/LabelPopover";

export default function Actions() {
  return (
    <div className="">
      <div className="text-gray-400 flex items-center">
        <HiUserCircle fontSize={24} />
        <span className="ml-3">Actions</span>
      </div>
      <div className="mt-5 space-y-3">
        <InviteMemberPopover
          title="Members"
          description="Assign members to this card"
          className="btn-gray w-full px-3 py-1.5"
        >
          <BsPeopleFill />
          <span className="ml-2">Members</span>
        </InviteMemberPopover>
        <LabelPopover />
        <CoverPopover />
      </div>
    </div>
  );
}
