import React, { useEffect, useRef } from 'react'
import { Form, AutoComplete, Button, Row } from 'antd'
import type { FormProps } from 'antd/es/form'
import { DEV_SERVER_PORT } from '../../../../node'

const { Item } = Form

const options = [
  { value: 'http://a.com' },
  { value: 'http://c.com' },
  { value: 'http://d.com' }
]

const HttpProxy = () => {
  const sockjsRef = useRef<WebSocket>()

  const onFinish: FormProps['onFinish'] = (obj) => {
    // fetch('/')
    sockjsRef.current?.send(JSON.stringify(obj))
  }
  useEffect(() => {
    sockjsRef.current = new WebSocket(
      `ws://${window.location.hostname}:${DEV_SERVER_PORT}`,
      'dev-tool-hmr'
    )

    sockjsRef.current!.addEventListener('message', async ({ data }) => {
      console.log(data, '---')
    })

    return () => {}
  })

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
    >
      <Item
        name="/"
        label="/"
        rules={[{ required: true, message: '请填写匹配对应的 url ' }]}
      >
        <AutoComplete
          allowClear
          style={{ width: 250 }}
          options={options}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Item>
      <Row justify="center">
        <Button style={{ width: 100 }} htmlType="submit" type="primary">
          确定
        </Button>
      </Row>
    </Form>
  )
}

export default React.memo(HttpProxy)
