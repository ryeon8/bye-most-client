/**
 * @author r3n
 * @since 2023. 12. 28.
 */

import './App.css'
import 'semantic-ui-css/semantic.min.css'

import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import Start from './pages/js/Start'
import Agree from './pages/js/Agree'
import Login from './pages/js/Login'
import Delay from './pages/js/Delay'
import Partners from './pages/js/Partners'
import Remove from './pages/js/Remove'
import Done from './pages/js/Done'

export const InputDataContext = React.createContext()

function App() {
  const [agreed, setAgreed] = useState(false)
  // id: mattermost 로그인 계정(email, username), myId: mattermost에서 id에 부여하는 고유값.
  // id, pwd, serverInfo, myId, token, delayTime, partnersAuthList 등 전 데이터 관리.
  const [inputData, setInputData] = useState({})
  // { success: , tooManyFailed, }
  const [result, setResult] = useState({})
  const inputDataHandler = (() => {
    return {
      agreed: () => {
        setAgreed(true)
      },
      save: (changedData) => {
        setInputData(changedData)
      },
      saveDelayTime: (delayTime) => {
        setInputData({ ...inputData, delayTime })
      },
      savePartnersAuthList: (partnersAuthList) => {
        setInputData({ ...inputData, partnersAuthList })
      },
      saveResult: (removeResult) => {
        setResult(removeResult)
      }
    }
  })()

  // TODO context value에 depth가 2 이상인 객체 할당 x. 구조 변경 필요.
  return (
    <div className="App">
      <InputDataContext.Provider
        value={{
          agreed,
          data: inputData,
          result,
          handler: inputDataHandler
        }}
      >
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/login" element={<Login />} />
          <Route path="/delay" element={<Delay />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/remove" element={<Remove />} />
          <Route path="/done" element={<Done />} />
        </Routes>
      </InputDataContext.Provider>
    </div>
  )
}

export default App
