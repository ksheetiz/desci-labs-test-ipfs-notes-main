'use client'

import { useState } from "react"
import {AiOutlineFileAdd} from "react-icons/ai"
import useNotesModal from "../../hooks/useNotesModal"

const AddNotes = () => {
    const notesModal = useNotesModal();
    const [addNotesModal, setNotesModal] = useState(false);

  return (
    <div onClick={notesModal.onOpen} className="shadow-sm hover:shadow-md transition cursor-pointer rounded-sm">
        <AiOutlineFileAdd size={30}/>
    </div>
  )
}

export default AddNotes