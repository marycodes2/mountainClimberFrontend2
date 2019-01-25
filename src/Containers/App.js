import React, { Component } from 'react';
import FirstScreen from '../Components/FirstScreen'
import SecondScreen from '../Components/SecondScreen'
// import {Route} from 'react-router-dom'

class App extends Component {
  state = {
    firstScreenDone: false
  }

  firstScreenDone = () => {
    this.setState({firstScreenDone: true})
  }

  render() {
    if (!this.state.firstScreenDone) {
      return <FirstScreen done={this.firstScreenDone} />
    }
    else {
      return <SecondScreen />
    }
  }
}

export default App;
