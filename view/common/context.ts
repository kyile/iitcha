import { createContext } from "react";

// Modal 조작 Context
export const ModalContext = createContext<{showModal: (id: string) => void, hideModal: (id: string) => void}>({showModal: () => {}, hideModal: () => {}});

// User 정보 Context
export const UserContext = createContext<{} | undefined>(undefined);

// 라우팅 정보 Context
export const PathContext = createContext<string>("/");