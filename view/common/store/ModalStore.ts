import create from "zustand";
import { Modal } from 'bootstrap';

export type Store = {
    modal?: typeof Modal,
    setModal: (modal: typeof Modal) => void;
    showModal: (id: string) => void;
    hideModal: (id: string) => void;
}

namespace ModalStore {
    export const useStore = create<Store>((set, get) => ({
        // bootstrap modal instance
        modal: undefined,
        setModal: (modal: typeof Modal) => set({ modal: modal }),

        // modal show
        showModal: (id: string) => {
            const modal = get().modal;
            // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
            if (typeof document !== 'undefined' && modal !== undefined) {
                const modalEl = document.querySelector(`#${id}`);
    
                if(modalEl !== null){
                    const modalInstance = modal.getOrCreateInstance(modalEl);
                    modalInstance.show();
                }
            }
        },

        // modal hide
        hideModal: (id: string) => {
            const modal = get().modal;
            // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
            if (typeof document !== 'undefined' && modal !== undefined) {
                const modalEl = document.querySelector(`#${id}`);
    
                if(modalEl !== null){
                    const modalInstance = modal.getOrCreateInstance(modalEl);
                    modalInstance.hide();
                }
            }
        }
    }));
}

export default ModalStore;