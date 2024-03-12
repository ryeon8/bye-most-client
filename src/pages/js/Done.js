import React, { useContext } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import { InputDataContext } from '../../App'
import HeaderOfApp from './../../components/js/HeaderOfApp'
import { withLoginInfo } from './../../components/js/withLoginInfo'

const Component = () => {
  const navigate = useNavigate()
  const context = useContext(InputDataContext)
  const tooManyFailed =
    context.result.tooManyFailed !== undefined &&
    Object.keys(context.result.tooManyFailed).length > 0

  const onSubmit = () => {
    navigate('/partners')
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <div className="contents">
        <Header as="h3">대화 삭제</Header>
        <ul>
          {tooManyFailed ? (
            <>
              <li>일부 대화 삭제 중 오류가 있었습니다.</li>
              <li>대화방을 한번 확인해 보세요.</li>
            </>
          ) : (
            <li> 대화 삭제가 완료되었습니다.</li>
          )}
        </ul>
      </div>
      <div className="right-btn-box">
        <Button primary onClick={onSubmit}>
          다른 사람과의 대화 더 삭제하기
        </Button>
      </div>
    </div>
  )
}

const Done = withLoginInfo(Component)
export default Done
