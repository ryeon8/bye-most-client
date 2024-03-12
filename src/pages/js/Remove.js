import React, { useContext, useEffect } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { InputDataContext } from '../../App'
import HeaderOfApp from '../../components/js/HeaderOfApp'
import service from './../../services/remove'
import { useNavigate } from 'react-router-dom'
import { withLoginInfo } from './../../components/js/withLoginInfo'

const Component = () => {
  const context = useContext(InputDataContext)
  const navigate = useNavigate()
  const auth = context.data
  const partnersAuth = context.data.partnersAuthList
  const delay = context.data.delayTime
  const partnerNames = partnersAuth.map((e) => e.id).join(', ')
  let mounted = false

  useEffect(() => {
    if (!mounted) {
      mounted = true
      service
        .init(auth.serverInfo)
        .removeConversations(auth, delay, partnersAuth)
        .then((result) => {
          context.handler.saveResult(result)
          navigate('/done')
        })
        .catch((error) => {
          console.log(error)
          alert(
            error.noChannel
              ? '입력하신 계정이 모두 참여한 채팅이 존재하지 않습니다.'
              : '삭제 중 원인을 알 수 없는 오류가 발생했습니다. 대화 참여 상대 설정 화면으로 돌아갑니다.'
          )
          navigate('/partners')
        })
    }
  }, []) // 컴포넌트가 마운트될 때 한 번만 실행

  const onCancel = () => {
    service.cancelRemoving()
    navigate('/partners')
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <div className="contents">
        <Header as="h3">대화 삭제</Header>
        <ul>
          <li>{partnerNames}와(과)의 대화를 삭제 중입니다.</li>
          {delay > 0 && (
            <>
              <li>{`${delay}초당 1건씩 대화를 삭제합니다. 초를 변경하고 싶은 경우는 취소 후 다시 지정하세요.`}</li>
              <lib>
                단, 취소한다 해도 이전에 삭제된 대화는 복구되지 않습니다.
              </lib>
            </>
          )}
        </ul>
        <div>
          <div style={{ marginTop: '100px' }}>
            <div className="ui active centered inline loader"></div>
          </div>
        </div>
      </div>
      <div className="right-btn-box">
        <Button type="button" onClick={onCancel}>
          삭제 중지 후 이전으로 돌아가기
        </Button>
      </div>
    </div>
  )
}

const Remove = withLoginInfo(Component)
export default Remove
