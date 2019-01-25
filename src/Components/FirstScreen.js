import React from 'react'
import { Button, Container, Icon, Header, Modal} from 'semantic-ui-react'


class FirstScreen extends React.Component {
  state = {
    open: true
  }

  close = () => this.setState({open: false})

  render() {
    if (true) {
      return <React.Fragment>
      <Container
        textAlign='center'>

      <Header as='h1'>
        <Icon name='map signs'/>
        Welcome to MountainClimber! It's great to have you.
      </Header>

      <Header as='h4'>
      Start by selecting your state<
      /Header>

      <Button
        onClick={this.close}>Next</Button>
    </Container>
      </React.Fragment>
    }
    return <Modal
    open={true}
    dimmer='inverted'
    >
      <Header size='large'>
        <Icon name='map signs'/>
      <Header.Content>Welcome to MountainClimber! It's great to have you.</Header.Content>
      </Header>
      <Header as='h4'>Start by selecting your state</Header>
    <br/><br/><br/>
      <Button
        onClick={this.close}>Next</Button>
    </Modal>
  }

}

export default FirstScreen
