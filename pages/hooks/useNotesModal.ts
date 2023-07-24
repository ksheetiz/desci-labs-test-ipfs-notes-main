import {create} from 'zustand'


interface NotesModalStore {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useNotesModal = create<NotesModalStore>((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}))

export default useNotesModal;