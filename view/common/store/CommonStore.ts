import create from "zustand";

type Store = {
    path: string,
    setPath: (path: string) => void;
}

namespace CommonStore {
    export const useStore = create<Store>((set) => ({
        // routing 경로
        path: "/",
        setPath: (path: string) => set({path: path}),
    }));
}

export default CommonStore;