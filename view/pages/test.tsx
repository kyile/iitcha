import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { Button, Checkbox, Container, Dropdown, Grid, Modal, Radio, Select, Tab, Text } from "../components";
import { ModalContext } from "../common/context";

const Test: NextPage = () => {
    const modal = useContext(ModalContext);
    const [check, setCheck] = useState<boolean>();
    const [radio, setRadio] = useState<any>();
    const [text, setText] = useState<string>();
  
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
                onClick={()=>{modal.hideModal("modal")}}
              >
                close
              </Button>
            </Modal.Footer>
          </Modal>
          <Container>
            <Grid direction='row' justifyContents='center' size={2}>
              <Grid direction='col' size={6}>
                <Button id="modal" onClick={() => {modal.showModal("modal")}}>
                  show Modal
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