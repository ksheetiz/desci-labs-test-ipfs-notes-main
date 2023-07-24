import { useRouter } from "next/router";
import useNotesModal from "../../hooks/useNotesModal";
import { Heading } from "../Heading";
import Modal from "./Modal";
import { Dispatch, SetStateAction } from "react";

interface NotesModalProps {
  txt : string;
  setTxt : Dispatch<SetStateAction<string>>;
  handleLoad : () => void;
}

const NotesModal : React.FC<NotesModalProps> = ({txt,setTxt,handleLoad}) => {
  const notesModal = useNotesModal();
  const router = useRouter();

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Add Notes" subtitle="Write in box Below" />
      <div className="w-full relative">
        <textarea
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
          name="note"
          id="note"
          rows={5}
          value={txt}
          onChange={(e) => {
            setTxt(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={notesModal.isOpen}
      onClose={notesModal.onClose}
      onSubmit={handleLoad}
      title="New Note"
      body={bodyContent}
      actionLabel="Submit"
    />
  );
};

export default NotesModal;
