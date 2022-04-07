import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { Container, Grid, Button, Dropdown, Modal, Tab, Select, Text, Checkbox, Radio } from '../components'
import { ModalContext } from './_app'

const Home: NextPage = () => {
  const modal = useContext(ModalContext);
  const [check, setCheck] = useState<boolean>();
  const [radio, setRadio] = useState<any>();
  const [text, setText] = useState<string>();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <Modal>
          <Modal.Header>
            <h5 className="modal-title">
              Modal Test
            </h5>
          </Modal.Header>
          <Modal.Body>
            modal body
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="modalClose"
              type="secondary"
              onClick={()=>{modal.hideModal()}}
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
                <Tab.Sub id="tabSub1" label="Tab 1">
                  <h5>
                    Tab 1's contents
                  </h5>
                  <Text
                    id="text"
                    label="Text"
                    value={text}
                    required
                    invalidFeedBack="필수값입니다."
                    onChange={(id, value) => {setText(value);}}
                  />
                </Tab.Sub>
                <Tab.Sub id="tabSub2" label="Tab 2">
                  <h5>
                    Tab 2's contents
                  </h5>
                  <Checkbox
                    id="checkbox"
                    label="Checkbox"
                    checked={check}
                    onChange={(id, checked)=>{console.log(id); console.log(checked); setCheck(checked);}}
                  />
                </Tab.Sub>
                <Tab.Sub id="tabSub3" label="Tab 3">
                  <h5>
                    Tab 3's contents
                  </h5>
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
                <Tab.Sub id="tabSub4" label="Tab4">
                  <h5>
                    Tab 3's contents
                  </h5>
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
                  <Select id="select" label="Select">
                    <Select.Option value="A" display="Option A"/>
                    <Select.Option value="B" display="Option B"/>
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
