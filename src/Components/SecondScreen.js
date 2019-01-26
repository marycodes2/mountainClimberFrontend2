import React from 'react'
import { Container, Header} from 'semantic-ui-react'
import { CSSTransition } from 'react-transition-group';

class SecondScreen extends React.Component {

  state = {
    secondScreenLoad: false
  }
  componentDidMount() {
    this.setState({secondScreenLoad: true})
  }

  render() {
    return <Container
      textAlign='center'>

      <CSSTransition
        in={this.state.secondScreenLoad}
        timeout={3000}
        classNames="star"
        unmountOnExit
      >
        <Header
          as='h1'
          className='star'>
          Get started by selecting a state to see its climbs
        </Header>
      </CSSTransition>

  </Container>
  }
}

export default SecondScreen
