import create from "zustand";

type UserInfo = {
    id: string;
    nickname: string,
    auth: string;
}

type Store = {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
}

namespace UserInfoStore {
    export const useStore = create<Store>((set) => ({
        // 사용자 정보
        userInfo: undefined,
        setUserInfo: (userInfo: UserInfo) => set({userInfo: userInfo}),
    }));
}

export default UserInfoStore;