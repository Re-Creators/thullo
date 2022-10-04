import { MdAdd, MdAttachFile } from "react-icons/md";
import NiceModal from "@ebay/nice-modal-react";
import useAttachmentStore from "../../../store/useAttachmentStore";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { fetchAttachments } from "../../../api/services/attachments";
import useCardStore from "../../../store/useCardStore";
import moment from "moment";

function Attachment() {
  const [attachments, setAttachments] = useAttachmentStore(
    (state) => [state.attachments, state.setAttachments],
    shallow
  );
  const selectedCard = useCardStore((state) => state.selectedCard);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAttachments(selectedCard?.id);
      setAttachments(data);
    };
    fetchData();
  }, []);
  return (
    <div className="mt-5">
      <div className="flex items-center ">
        <div className="flex items-center">
          <MdAttachFile />
          <span className="ml-2">Attachment</span>
        </div>
        <button
          className="flex items-center ml-5 py-1 px-3 text-sm rounded-lg border border-slate-500 hover:shadow-md"
          onClick={() => NiceModal.show("upload-attachment")}
        >
          <MdAdd />
          <span className="ml-2">Add</span>
        </button>
      </div>
      <div className="space-y-5 mt-5">
        {attachments.map((attachment) => (
          <div className="flex h-[100px]" key={attachment.id}>
            <div className="img-container w-[120px] h-full cursor-pointer">
              {attachment.type.includes("image") ? (
                <img
                  src={attachment.url}
                  alt=""
                  className="w-full h-[100px] object-cover object-center rounded-lg"
                />
              ) : (
                <div className="w-full h-[100px] bg-gray-300 rounded-lg  flex items-center justify-center">
                  {attachment.extension}
                </div>
              )}
            </div>
            <div className="flex flex-col ml-5 justify-between ">
              <div>
                <small className="text-xs text-gray-400">
                  {moment(attachment.created_at).format("ll")}
                </small>
                <h2 className="font-semibold">{attachment.filename}</h2>
              </div>
              <div className="flex space-x-3">
                <button className="w-24 py-2 rounded-lg border-2 text-sm hover:bg-gray-300">
                  Download
                </button>
                <button className="w-24 py-2 rounded-lg border-2 text-sm hover:bg-gray-300">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attachment;
