import React, { useContext } from 'react'

import Start from '../../pages/js/Start'
import lib from '../../utils/lib'
import { InputDataContext } from '../../App'

export function withLoginInfo(Component) {
  const WithLoginInfoComponent = (props) => {
    const context = useContext(InputDataContext)
    if (context.agreed && lib.exists(context.data.myId)) {
      return <Component {...props} />
    } else {
      return <Start />
    }
  }

  return WithLoginInfoComponent
}
