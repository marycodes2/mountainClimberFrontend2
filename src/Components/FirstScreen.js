import React from 'react'
import { Container, Icon, Header} from 'semantic-ui-react'

var i = 0
var text = "Welcome to MountainClimber!              "

class FirstScreen extends React.Component {

  componentDidMount() {
    this.typeWriter()
  }

  typeWriter = () => {
    if (i < text.length) {
      document.getElementById("typeWriter").innerHTML += text.charAt(i)
      i++
      setTimeout(this.typeWriter, 70);
    }
    else {
      this.props.done();
    }
  }

  render() {
    return <Container
      textAlign='center'>
        <Header
          as='h1'
          id="typeWriter"
          className='star'>
          <Icon name='map signs'/>
        </Header>
  </Container>
  }
}

export default FirstScreen
