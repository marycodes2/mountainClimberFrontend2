import React from 'react'
import { Button, Container, Icon, Header} from 'semantic-ui-react'


class FirstScreen extends React.Component {

  render() {
    return <Container
      textAlign='center'>

    <Header as='h1'>
      <Icon name='map signs'/>
      Welcome to MountainClimber! It's great to have you.
    </Header>

  </Container>
  }

}

export default FirstScreen
