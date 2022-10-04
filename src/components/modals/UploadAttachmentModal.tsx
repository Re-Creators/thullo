import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdFileUpload } from "react-icons/md";
import { postNewAttachment } from "../../api/services/attachments";
import { supabase } from "../../api/supabaseClient";
import useAttachmentStore from "../../store/useAttachmentStore";
import useCardStore from "../../store/useCardStore";
import { getFIleExtension } from "../../utils/helpers";

type PreviewFile = {
  name: string;
  url: string;
  type: string;
  extension: string;
};

const UploadAttachmentModal = NiceModal.create(() => {
  const modal = useModal();
  const [prevFile, setPrevFile] = useState<PreviewFile | null>(null);
  const selectedCard = useCardStore((state) => state.selectedCard);
  const addNewAttachment = useAttachmentStore.getState().addNewAttachment;
  const [link, setLink] = useState("");

  const fileRef = useRef<File | null>(null);

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPrevFile(null);
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files;
    if (currentFile) {
      const file = currentFile[0];
      const fileType = file.type;

      fileRef.current = file;

      let url = "";

      if (fileType.includes("image")) {
        url = URL.createObjectURL(file);
      }

      setPrevFile({
        name: file.name,
        url: url,
        type: file.type,
        extension: getFIleExtension(file.name),
      });

      console.log(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (fileRef.current && selectedCard) {
        const file = fileRef.current;
        const filename = file.name.replace(" ", "_");
        const { data: pathname, error } = await supabase.storage
          .from("attachments")
          .upload(`${selectedCard.id}/${filename}`, file);
        const { publicURL } = supabase.storage
          .from("attachments")
          .getPublicUrl(`${selectedCard.id}/${filename}`);
        const { data } = await postNewAttachment({
          filename: file.name,
          pathname: pathname?.Key || "",
          url: publicURL,
          type: file.type,
          card_id: selectedCard.id,
          extension: getFIleExtension(file.name),
        });
        addNewAttachment(data);
        modal.hide();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Transition appear show={modal.visible}>
        <Dialog as="div" className="relative z-20" onClose={() => modal.hide()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col md:flex-row border-2 rounded-lg border-dashed hover:bg-slate-200 ">
                      <div className="absolute top-3 right-3 z-5">
                        <button
                          className="bg-red-500 hover:bg-red-600 rounded-lg p-3 text-sm"
                          onClick={handleRemoveFile}
                        >
                          <BsTrashFill className="text-white" />
                        </button>
                      </div>
                      <div className="group relative mx-auto mb-3 h-40 w-full cursor-pointer md:mb-0 md:h-52 md:w-1/2 md:border-0 flex items-center justify-center  ">
                        {prevFile ? (
                          <div className="flex flex-col items-center">
                            {prevFile.type.includes("image") ? (
                              <img
                                src={prevFile.url}
                                alt=""
                                className="w-[100px] h-[100px] object-cover object-center rounded-lg"
                              />
                            ) : (
                              <div className="w-[100px] h-[100px] bg-gray-300 rounded-lg  flex items-center justify-center">
                                {prevFile.extension}
                              </div>
                            )}
                            <div className="mt-2 text-xs text-slate-500">
                              {prevFile.name}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute top-0 h-full w-full  ">
                            <label
                              htmlFor="cover"
                              className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-black"
                            >
                              <MdFileUpload className="mb-3 text-4xl" />
                              <span>Choose File</span>
                            </label>
                            <input
                              type="file"
                              className="absolute h-0 opacity-0"
                              id="cover"
                              onChange={fileChangeHandler}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-center my-2">OR</div>
                    <div>
                      <h2>Attach a link</h2>
                      <input
                        type="text"
                        className="w-full outline-none border-2 py-1 px-3 text-sm focus:border-blue-500 rounded-lg"
                        disabled={prevFile !== null}
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                      />
                    </div>
                    <button
                      className="mt-3 rounded-md bg-secondary px-5 py-2 btn-blue"
                      disabled={link.trim() === "" && prevFile === null}
                    >
                      Attach
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default UploadAttachmentModal;
