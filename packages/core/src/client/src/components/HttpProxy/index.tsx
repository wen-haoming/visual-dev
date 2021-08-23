import React, { useContext } from 'react'
import { Form, AutoComplete, Button, Row } from 'antd'
import { Context } from '../../App'
import type { FormProps } from 'antd/es/form'

const { Item } = Form

const options = [
  { value: 'http://a.com' },
  { value: 'http://c.com' },
  { value: 'http://d.com' }
]

const HttpProxy = () => {
  const sockjs = useContext<WebSocket>(Context)

  const onFinish: FormProps['onFinish'] = (obj) => {
    // fetch('/')
    sockjs?.send(JSON.stringify(obj))
  }

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
