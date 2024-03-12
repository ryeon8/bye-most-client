import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderOfApp = () => {
  return (
    <Header as="h2" className="title">
      <Header.Content>Bye, Most.</Header.Content>
      <Icon name="chat" />
    </Header>
  )
}

export default React.memo(HeaderOfApp)
