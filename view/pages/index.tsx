import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Container, Grid, Button, Dropdown, Modal, Tab, Select, Text, Checkbox, Radio } from '../components'
import { ModalStore } from "../common/store";

const Home: NextPage = () => {
  const { showModal, hideModal } = ModalStore.useStore();
  const [check, setCheck] = useState<boolean>();
  const [radio, setRadio] = useState<any>();
  const [text, setText] = useState<string>();
  const [select, setSelect] = useState<string>();

  return (
    <div>
      <Head>
        <title>Iitcha</title>
      </Head>
      <main>
        <Modal id="modal">
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
            <Grid direction='col' size={6}>
              <Tab
                id="tab"
                onTabClick={(id, index) => {console.log(id); console.log(index)}}
              >
                <Tab.Sub
                  id="tabSub1"
                  label="Tab 1"
                  title="Tab 1's contents"
                >
                  <Text
                    id="text"
                    label="Text"
                    value={text}
                    required
                    invalidFeedBack="필수값입니다."
                    onChange={(id, value) => {setText(value);}}
                  />
                </Tab.Sub>
                <Tab.Sub
                  id="tabSub2"
                  label="Tab 2"
                  title="Tab 2's contents"
                >
                  <Checkbox
                    id="checkbox"
                    label="Checkbox"
                    checked={check}
                    onChange={(id, checked)=>{console.log(id); console.log(checked); setCheck(checked);}}
                  />
                </Tab.Sub>
                <Tab.Sub
                  id="tabSub3"
                  label="Tab 3"
                  title="Tab 3's contents"
                >
                  <Radio
                    id="radio"
                    label="Radio"
                    value={radio}
                    onChange={(id, value) => {console.log(id); console.log(value); setRadio(value);}}
                  >
                    <Radio.Option value="A">
                      Option A
                    </Radio.Option>
                    <Radio.Option value="B"/>
                  </Radio>
                </Tab.Sub>
                <Tab.Sub
                  id="tabSub4"
                  label="Tab4"
                  title="Tab 4's contents"
                >
                  <Dropdown id="dropDown" label="Dropdown">
                    <Dropdown.Item id="item1" onClick={(id) => {console.log(id);}}>
                      Item1
                    </Dropdown.Item>
                    <Dropdown.Item id="item2" onClick={(id) => {console.log(id);}}>
                      Item2
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item id="item3" onClick={(id) => {console.log(id);}}>
                      Item3
                    </Dropdown.Item>
                  </Dropdown>
                  <Select
                    id="select"
                    label="Select"
                    value={select}
                    onChange={(id, value) => {setSelect(value);}}
                  >
                    <Select.Option value="A">
                      Option A
                    </Select.Option>
                    <Select.Option value="B">
                      Option B
                    </Select.Option>
                    <Select.Option value="C"/>
                  </Select>
                </Tab.Sub>
              </Tab>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export default Home
