import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Button, Card, Carousel, Checkbox, Container, Dropdown, Grid, Modal, Radio, Select, Switch, Tab, Text } from "../components";
import { ModalStore } from "../common/store";
import { alert } from "../common";

const Test: NextPage = () => {
    const { showModal, hideModal } = ModalStore.useStore();
    const [check, setCheck] = useState<boolean>();

    return (
      <div>
        <Head>
          <title>Iitcha</title>
        </Head>
        <main>
          <Modal id="modal" blur={false} onClose={(id) => {console.log(id);}}>
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
                <Button id="modal" onClick={() => {alert("Alert test", "primary", 6000)}}>
                  show Alert
                </Button>
              </Grid>
              <Grid direction='col' size={3}>
                <Switch
                  id="switch"
                  label="switch"
                  checked={check}
                  onChange={() => { setCheck(!check) }}
                />
                <Switch
                  id="switch"
                  label="switch"
                  checked={!check}
                  onChange={() => { setCheck(!check) }}
                />
              </Grid>
            </Grid>
          </Container>
          <Carousel id="carousel" >
            <div className="d-flex flex-row justify-content-around">
              <Card id="A" title="A" isLoading>
                A
              </Card>
              <Card id="B" title="B" isLoading>
                B
              </Card>
              <Card id="C" title="C" isLoading>
                C
              </Card>
              <Card id="D" title="D" isLoading>
                D
              </Card>
              <Card id="E" title="E" isLoading>
                E
              </Card>
            </div>
            <div className="d-flex flex-row justify-content-around">
              <Card id="A" title="A" isLoading>
                A
              </Card>
              <Card id="B" title="B" isLoading>
                B
              </Card>
              <Card id="C" title="C" isLoading>
                C
              </Card>
              <Card id="D" title="D" isLoading>
                D
              </Card>
              <Card id="E" title="E" isLoading>
                E
              </Card>
            </div>
          </Carousel>
          <Carousel id="carousel" >
            <div className="d-flex flex-row justify-content-around">
              <Card id="A" title="A" isLoading>
                A
              </Card>
              <Card id="B" title="B" isLoading>
                B
              </Card>
              <Card id="C" title="C" isLoading>
                C
              </Card>
              <Card id="D" title="D" isLoading>
                D
              </Card>
              <Card id="E" title="E" isLoading>
                E
              </Card>
            </div>
            <div className="d-flex flex-row justify-content-around">
              <Card id="A" title="A" isLoading>
                A
              </Card>
              <Card id="B" title="B" isLoading>
                B
              </Card>
              <Card id="C" title="C" isLoading>
                C
              </Card>
              <Card id="D" title="D" isLoading>
                D
              </Card>
              <Card id="E" title="E" isLoading>
                E
              </Card>
            </div>
          </Carousel>
        </main>
        <footer>
        </footer>
      </div>
    )
  }
  
  export default Test;