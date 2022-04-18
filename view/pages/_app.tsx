import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal as bootstrapModal } from 'bootstrap';
import { Button, Container, Grid, Modal, Navbar, Spinner, Text } from '../components';
import { useRouter } from 'next/router';
import { ModalContext, UserContext, PathContext } from "../common/context";
import axios from "axios";
import { stringToHashCode } from '../common/utility';

function MyApp({ Component, pageProps }: AppProps) {
  const modal = useRef<typeof bootstrapModal>();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{} | undefined>();
  const [id, setId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  // Modal 조작을 위한 API import
  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      modal.current = bootstrap.Modal;
    });
  }, []);

  // Modal 보이기
  const showModal = (id: string) => {
    // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
    if (typeof document !== 'undefined' && modal.current !== undefined) {
      const modalEl = document.querySelector(`#${id}`);

      if(modalEl !== null){
          const modalInstance = modal.current.getOrCreateInstance(modalEl);
          modalInstance.show();
      }
    }
  }

  // Modal 숨기기
  const hideModal = (id: string) => {
    // rendering이 완료되어 document, bootstrap이 정상적으로 있는 경우 진행
    if (typeof document !== 'undefined' && modal.current !== undefined) {
      const modalEl = document.querySelector(`#${id}`);

      if(modalEl !== null){
          const modalInstance = modal.current.getOrCreateInstance(modalEl);
          modalInstance.hide();
      }
    }
  }

  // login modal id change event handler
  const handleIdChange = (id?: string, value?: string) => {
    if (value !== undefined) setId(value)
  }

  // login modal password change event handler
  const handlePasswordChange = (id?: string, value?: string) => {
    if (value !== undefined) setPassword(value)
  }

  const handleLogin = async () => {
    setLoading(true);
    /* TO-DO
     * login 기능 추가
    */

    try {
      if (id !== undefined && password !== undefined) {
        const result = await axios.get(`/api/login?id=${stringToHashCode(id)}&password=${stringToHashCode(password)}`);

        if (result.status === 200) {
          setUserInfo(result.data);
          console.log(result.data);
          hideModal("login");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PathContext.Provider value={router.pathname}>
        <UserContext.Provider value={userInfo}>
          <ModalContext.Provider value={{showModal: showModal, hideModal: hideModal}}>
            <Navbar>
              <Navbar.Item path="/">
                Home
              </Navbar.Item>
              <Navbar.Item path="/test">
                Test
              </Navbar.Item>
            </Navbar>
            <Component {...pageProps} />
          </ModalContext.Provider>
        </UserContext.Provider>
      </PathContext.Provider>
      <Modal id="login">
        <Modal.Header>
          Login
        </Modal.Header>
        <Modal.Body>
          <Text
              id="id"
              label="ID"
              value={id}
              required
              onChange={handleIdChange}
          />
          <Text 
              id="password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Grid direction="row">
              <Button
                id="login"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Spinner size="sm"/>
                ) : ("login")}
              </Button>
            </Grid>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyApp
