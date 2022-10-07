import create from "zustand";
import { devtools } from "zustand/middleware";
import { AttachmentData } from "../types";

interface AttachmentState {
  attachments: AttachmentData[];
  setAttachments: (attachment: AttachmentData[]) => void;
  addNewAttachment: (attachment: AttachmentData) => void;
  removeAttachment: (attchmentId: string) => void;
}

const useAttachmentStore = create<AttachmentState>()((set) => ({
  attachments: [],
  setAttachments: (attachments) => set((state) => ({ attachments })),
  addNewAttachment: (attachment) =>
    set((state) => ({ attachments: [...state.attachments, attachment] })),
  removeAttachment: (attachmentId) =>
    set((state) => ({
      attachments: state.attachments.filter(
        (attachment) => attachment.id !== attachmentId
      ),
    })),
}));

export default useAttachmentStore;
