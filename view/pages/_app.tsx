import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { createContext, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal } from 'bootstrap';

// page에서 Modal을 조작하기 위해 Context 생성
export const ModalContext = createContext<{showModal: () => void, hideModal: () => void}>({showModal: () => {}, hideModal: () => {}});

function MyApp({ Component, pageProps }: AppProps) {
  const modal = useRef<typeof Modal>();

  // Modal 조작을 위한 API import
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      modal.current = bootstrap.Modal;
    });
  }, []);

  // Modal 보이기
  const showModal = () => {
    // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
    if (typeof document !== 'undefined' && modal.current !== undefined) {
      const modalEl = document.querySelector("#modal");

      if(modalEl !== null){
          const modalInstance = modal.current.getOrCreateInstance(modalEl);
          modalInstance.show();
      }
  }
  }

  // Modal 숨기기
  const hideModal = () => {
    // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
    if (typeof document !== 'undefined' && modal.current !== undefined) {
      const modalEl = document.querySelector("#modal");

      if(modalEl !== null){
          const modalInstance = modal.current.getOrCreateInstance(modalEl);
          modalInstance.hide();
      }
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ModalContext.Provider value={{showModal: showModal, hideModal: hideModal}}>
        <Component {...pageProps} />
      </ModalContext.Provider>
    </>
  )
}

export default MyApp
