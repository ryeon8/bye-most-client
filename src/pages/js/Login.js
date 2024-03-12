import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { InputDataContext } from '../../App'
import HeaderOfApp from '../../components/js/HeaderOfApp'
import service from './../../services/login'

const Login = () => {
  const context = useContext(InputDataContext)
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const [serverInfo, setServerInfo] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastContent, setToastContent] = useState('')

  useEffect(() => {
    setId(context.data.id)
    setPwd(context.data.pwd)
    setServerInfo(context.data.serverInfo)
  }, [])

  const onSubmit = async () => {
    const result = await service.signin(serverInfo, id, pwd)
    if (result.success) {
      context.handler.save(result.auth)
      navigate('/delay')
    } else {
      setToastContent(result.error)
      setShowToast(true)
    }
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <Form>
        <Form.Field>
          <label>Server URL</label>
          <input
            placeholder="Enter server URL"
            value={serverInfo}
            onChange={(e) => setServerInfo(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Login ID</label>
          <input
            placeholder="Enter login ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Login Password</label>
          <input
            type="password"
            placeholder="Enter login password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Field>
        <Button primary style={{ width: '100%' }} onClick={onSubmit}>
          Login
        </Button>
        <Message
          negative
          hidden={!showToast}
          onDismiss={() => setShowToast(false)}
          content={toastContent}
        />
      </Form>
    </div>
  )
}

export default Login
