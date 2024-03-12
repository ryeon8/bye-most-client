import React, { useContext, useEffect, useState } from 'react'
import { Header, Form, Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import { InputDataContext } from '../../App'
import HeaderOfApp from './../../components/js/HeaderOfApp'
import BottomOfApp from './../../components/js/BottomOfApp'
import { withLoginInfo } from './../../components/js/withLoginInfo'

const delayOptions = [
  { key: 'none', value: '0', text: '지연 시간 없음' },
  { key: '1', value: '1', text: '1초당 1건' },
  { key: '2', value: '2', text: '2초당 1건' },
  { key: '3', value: '3', text: '3초당 1건' },
  { key: '5', value: '5', text: '5초당 1건' },
  { key: '10', value: '10', text: '10초당 1건' }
]

const Component = () => {
  const context = useContext(InputDataContext)
  const navigate = useNavigate()
  const [delayTime, setDelayTime] = useState(0)

  useEffect(() => {
    setDelayTime(isNaN(context.data.delayTime) ? 0 : context.data.delayTime)
  }, [])

  const onSubmit = () => {
    context.handler.saveDelayTime(delayTime)
    navigate('/partners')
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <Form>
        <div className="contents">
          <Header as="h3">대화 이력 건당 삭제 요청 시간 설정</Header>
          <ul>
            <li>
              대화 이력 삭제 시 한 건씩 삭제 요청이 이루어지며, Mattermost 서버
              정책에 따라 단 시간 내 많은 삭제 요청을 하면 차단될 수 있습니다.
            </li>
            <li>
              참가 중인 Mattermost 서버 정책에 맞는 대화 이력 건당 삭제 요청
              시간을 초 단위로 입력해 주세요.
            </li>
            <li>
              미입력 시 요청 지연 없이 전체 대화 이력을 일괄 삭제 요청
              시도합니다.
            </li>
          </ul>

          <Form.Field>
            <div style={{ width: '50%' }}>
              <Dropdown
                placeholder="지연 시간 선택"
                selection
                options={delayOptions}
                value={delayTime.toString()}
                onChange={(e, { value }) => setDelayTime(parseInt(value))}
              />
            </div>
          </Form.Field>
        </div>
        <BottomOfApp goBackRouteName={'login'} goToNextClick={onSubmit} />
      </Form>
    </div>
  )
}

const Delay = withLoginInfo(Component)
export default Delay
