import './../css/Partners.css'
import React, { useContext, useState } from 'react'
import { Form, Button, Header } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import { InputDataContext } from '../../App'
import HeaderOfApp from '../../components/js/HeaderOfApp'
import BottomOfApp from '../../components/js/BottomOfApp'
import service from './../../services/partners'
import { withLoginInfo } from './../../components/js/withLoginInfo'

const Component = () => {
  const context = useContext(InputDataContext)
  const navigate = useNavigate()
  const [partners, setPartners] = useState([{ id: '', pwd: '' }])

  const handleChange = (index, field, value) => {
    const updatedPartners = [...partners]
    updatedPartners[index][field] = value
    setPartners(updatedPartners)
  }

  const handleAddPartner = () => {
    setPartners([...partners, { id: '', pwd: '' }])
  }

  const handleRemovePartner = (index) => {
    const updatedPartners = partners.filter((partner, i) => i !== index)
    setPartners(updatedPartners)
  }

  const onSubmit = async () => {
    const result = await service.verifyPartners(context.data, partners)
    if (result.success) {
      context.handler.savePartnersAuthList(result.partnersAuth)
      navigate('/remove')
    } else {
      alert(result.error)
    }
  }

  return (
    <div className="app-container">
      <HeaderOfApp />
      <Form>
        <div className="contents">
          <Header as="h3">안내</Header>
          <ul>
            <li>
              입력한 아이디가 전원 참여한 대화방의 대화에 한해 삭제를
              진행합니다.
            </li>
            <li>
              최소 1명의 정보를 필수로 입력해야 하며, 나머지는 빈 칸으로 두어도
              됩니다.
            </li>
            <li>
              이메일 계정이 아닌 아이디(@로 태그되는 아이디)를 입력하세요.
            </li>
          </ul>
          {partners.map((partner, index) => (
            <div key={index} className="pair-input-box">
              <Form.Field className="small field">
                <label>ID</label>
                <input
                  type="text"
                  placeholder="참여 계정"
                  value={partner.id}
                  onChange={(e) => handleChange(index, 'id', e.target.value)}
                />
              </Form.Field>
              <Form.Field className="small field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="참여 계정 비밀번호"
                  value={partner.pwd}
                  onChange={(e) => handleChange(index, 'pwd', e.target.value)}
                />
              </Form.Field>
              {index === partners.length - 1 && (
                <Button type="button" icon="plus" onClick={handleAddPartner} />
              )}
              {index !== 0 && (
                <Button
                  type="button"
                  icon="minus"
                  onClick={() => handleRemovePartner(index)}
                />
              )}
            </div>
          ))}
        </div>
        <BottomOfApp goBackRouteName={'delay'} goToNextClick={onSubmit} />
      </Form>
    </div>
  )
}

const Partners = withLoginInfo(Component)
export default Partners
