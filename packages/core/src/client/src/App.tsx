import React, { useEffect, useState, useRef, createContext } from 'react'
import { Button, Modal, Menu, Row, Col, ConfigProvider } from 'antd'
import {
  SettingOutlined,
  GlobalOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import HttpProxy from './components/HttpProxy'
import Footer from './components/Footer'
import { DEV_SERVER_PORT } from './config'

export const Context = createContext({} as any)
export interface ContextValue {
  sockjsRef: WebSocket
  setVisible: (flag: boolean) => void
}

const App = () => {
  const [visible, setVisible] = useState(false)
  const [selectKey, setSelectKey] = useState('1')
  const sockjsRef = useRef<WebSocket>()

  useEffect(() => {
    sockjsRef.current = new WebSocket(
      `ws://${window.location.hostname}:${DEV_SERVER_PORT}`,
      'dev-tool-hmr'
    )

    // sockjsRef.current!.addEventListener('message', async ({ data }) => {
    //   console.log(data, '---')
    // })

    return () => {}
  }, [])

  return (
    <ConfigProvider prefixCls="web-devtools">
      <Context.Provider value={{ sockjsRef: sockjsRef.current, setVisible }}>
        <Button
          style={{
            position: 'fixed',
            left: 0,
            bottom: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setVisible(true)}
        >
          <SettingOutlined style={{ fontSize: 18 }} />
        </Button>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          width={800}
          bodyStyle={{ padding: 0 }}
          title="Dev plugin"
          footer={<Footer />}
        >
          <Row style={{ minHeight: 500 }}>
            <Col span={5}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectKey]}
                style={{ height: '100%' }}
                onClick={({ key }) => setSelectKey(key)}
              >
                <Menu.Item key="1" icon={<GlobalOutlined />}>
                  http proxy
                </Menu.Item>
                <Menu.Item disabled key="2" icon={<ThunderboltOutlined />}>
                  建设中...
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={19}>
              <div
                className="site-layout-background"
                style={{ padding: 24, height: '100%' }}
              >
                {selectKey === '1' && <HttpProxy />}
              </div>
            </Col>
          </Row>
        </Modal>
      </Context.Provider>
    </ConfigProvider>
  )
}

export default App
