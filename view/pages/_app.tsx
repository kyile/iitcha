import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Modal, Navbar, Spinner, Text } from '../components';
import { stringToHashCode } from '../common/utility';
import { CommonStore, ModalStore, UserInfoStore } from '../common/store';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }: AppProps) {
  // store
  const { setModal, hideModal } = ModalStore.useStore();
  const { setUserInfo } = UserInfoStore.useStore();
  const { setPath } = CommonStore.useStore();

  // Next hook
  const router = useRouter();

  // state
  const [id, setId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

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

  // login modal id change event handler
  const handleIdChange = (id?: string, value?: string) => {
    if (value !== undefined) setId(value)
  }

  // login modal password change event handler
  const handlePasswordChange = (id?: string, value?: string) => {
    if (value !== undefined) setPassword(value)
  }

  // login
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (id !== undefined && password !== undefined) {
        // Back-end 개발 후 수정 필요
        const result = await axios.get(`/api/login?id=${stringToHashCode(id)}&password=${stringToHashCode(password)}`);

        switch (result.status) {
          case 200 : {
            setUserInfo(result.data);
            console.log(result.data);
            hideModal("login");
          } break;

          case 401: {
            console.log(result.data.message);
          }
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
      <Component {...pageProps} />
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
