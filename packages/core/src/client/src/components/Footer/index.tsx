import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Row } from 'antd'
import type { ContextValue } from '../../App'
import { Context } from '../../App'
import { PlusOutlined } from '@ant-design/icons'

const Footer = () => {
  const context = useContext<ContextValue>(Context)
  const [isSelect, setIsselect] = useState(false)

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    const attr = e.target.getAttribute('__p')
    if (attr) {
      context.sockjsRef.send(
        JSON.stringify({
          type: 'launch-editor-payload',
          path: attr
        })
      )
    }
    setIsselect(false)
  }, [])

  const handleHover = useCallback(() => {}, [])

  useEffect(() => {
    if (isSelect) {
      document.body.style.cursor = 'crosshair'
      document.body.addEventListener('click', handleClick)
      document.body.addEventListener('mousemove', handleHover)
    } else {
      document.body.style.cursor = 'default'
      document.body.removeEventListener('click', handleClick)
      document.body.removeEventListener('mousemove', handleHover)
    }
  }, [handleClick, handleHover, isSelect])

  return (
    <Row
      style={{ height: 30, fontSize: 20, padding: '0 10px' }}
      justify="end"
      align="middle"
    >
      <PlusOutlined
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation()
          context.setVisible(false)
          setIsselect(true)
        }}
      />
    </Row>
  )
}

export default Footer
