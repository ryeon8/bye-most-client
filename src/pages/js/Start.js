import './../css/Start.css'

// src/pages/Start.js

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Icon, Button } from 'semantic-ui-react'

const Start = () => {
  const navigate = useNavigate()
  return (
    <div className="start-container">
      <Header as="h2" icon textAlign="center">
        <Icon name="chat" circular />
        <Header.Content>Bye, Most.</Header.Content>
      </Header>
      <div className="taC">
        <div>
          Bye, Most. 는 Mattermost 메신저의 대화 기록을 삭제해주는 서비스입니다.
        </div>
        <div>
          Mattermost 공식 API를 이용해 이용자 대신 대화 기록을 삭제하며,
        </div>
        <div>어떠한 정보도 수집하지 않습니다.</div>
      </div>
      <Button style={{ marginTop: '20px' }} onClick={() => navigate('/agree')}>
        다음
      </Button>
    </div>
  )
}

export default Start
