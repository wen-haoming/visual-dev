import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import App from './App'

export const DEV_SERVER_PORT = 10012

ReactDOM.render(<App />, document.getElementById('dev-plugin'))
