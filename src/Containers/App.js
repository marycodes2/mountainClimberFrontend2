import React, { Component } from 'react';
import FirstScreen from '../Components/FirstScreen'
import SecondScreen from '../Components/SecondScreen'
import MainScreen from '../Components/MainScreen'
const BASE_URL = 'https://mountain-climber-back-end.herokuapp.com/api/v1'

class App extends Component {
  state = {
    firstScreenDone: false,
    secondScreenDone: false,
    selectedStates: []
  }

  firstScreenDone = () => {
    this.setState({firstScreenDone: true})
  }

  secondScreenDone = (states) => {
    this.setState({selectedStates: states, secondScreenDone: true})
  }

  render() {
    if (!this.state.firstScreenDone) {
      return <FirstScreen done={this.firstScreenDone} />
    }
    else if (this.state.firstScreenDone && !this.state.secondScreenDone){
      return <SecondScreen url={BASE_URL} done={(states) => this.secondScreenDone(states)} />
    }
    else {
      return <MainScreen />
    }
  }
}

export default App;
