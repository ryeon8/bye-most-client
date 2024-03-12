import './../css/Agree.css'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import HeaderOfApp from '../../components/js/HeaderOfApp'
import { InputDataContext } from '../../App'

const Agree = () => {
  const context = useContext(InputDataContext)
  const navigate = useNavigate()

  const onSubmit = () => {
    context.handler.agreed()
    navigate('/login')
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <div className="contents">
        <Header as="h3">이용 안내</Header>
        <ul>
          <li>
            Bye, Most.는 사용자를 대신해 Mattermost 공식 API를 이용해 대화
            기록을 삭제합니다.
          </li>
          <li>
            대화에 참여한 모든 참여자의 계정 정보가 필요하므로 참여자들의 동의를
            받은 후 진행해 주세요.
          </li>
          <li>
            자신과의 대화 내역은 자신의 계정 정보만으로 삭제할 수 있습니다.
          </li>
          <li>
            Bye, Most. 는 삭제 과정에서 어떠한 정보도 수집하지 않으며 대화 기록
            삭제로 인한 책임은 이용자에게 있습니다.
          </li>
        </ul>
      </div>
      <div className="agree-btn-box">
        <p>
          위 내용에 동의하지 않을 수 있으며, 동의하지 않을 시 서비스 이용이
          불가합니다.
        </p>
        <Button primary onClick={onSubmit}>
          동의합니다.
        </Button>
      </div>
    </div>
  )
}

export default Agree
