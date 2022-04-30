import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { Navbar } from '../components';
import { CommonStore, ModalStore } from '../common/store';
import "bootstrap/dist/css/bootstrap.css";
import LoginModal from '../components/layout/LoginModal';

function MyApp({ Component, pageProps }: AppProps) {
  // store
  const { setModal } = ModalStore.useStore();
  const { setPath } = CommonStore.useStore();

  // Next hook
  const router = useRouter();
  const currentPath = router.pathname;

  // Modal 조작을 위한 API import
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      setModal(bootstrap.Modal);
    });
  }, []);

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar>
        <Navbar.Item path="/">
          Home
        </Navbar.Item>
        <Navbar.Item path="/test">
          Test
        </Navbar.Item>
      </Navbar>
      <div
        id="alertContainer"
        className="position-absolute d-inline top-25 start-50 z-index-tooltip"
      />
      <LoginModal/>
      <div className="mx-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
