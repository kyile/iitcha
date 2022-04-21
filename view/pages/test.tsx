import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Button, Checkbox, Container, Dropdown, Grid, Modal, Radio, Select, Tab, Text } from "../components";
import { ModalStore } from "../common/store";
import { alert } from "../common";

const Test: NextPage = () => {
    const { showModal, hideModal } = ModalStore.useStore();

    return (
      <div>
        <Head>
          <title>Iitcha</title>
        </Head>
        <main>
          <Modal id="modal" blur={false}>
            <Modal.Header>
                Modal Test
            </Modal.Header>
            <Modal.Body>
              modal body
            </Modal.Body>
            <Modal.Footer>
              <Button
                id="modalClose"
                type="secondary"
                onClick={()=>{hideModal("modal")}}
              >
                close
              </Button>
            </Modal.Footer>
          </Modal>
          <Container>
            <Grid direction='row' justifyContents='center' size={2}>
              <Grid direction='col' size={3}>
                <Button id="modal" onClick={() => {showModal("modal")}}>
                  show Modal
                </Button>
              </Grid>
              <Grid direction='col' size={3}>
                <Button id="modal" onClick={() => {alert("Alert test")}}>
                  show Alert
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
        <footer>
        </footer>
      </div>
    )
  }
  
  export default Test;