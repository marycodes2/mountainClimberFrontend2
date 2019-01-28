import React, { Component } from 'react';
import FirstScreen from '../Components/FirstScreen'
import SecondScreen from '../Components/SecondScreen'
import MainScreen from '../Components/MainScreen'
const BASE_URL = 'https://mountain-climber-back-end.herokuapp.com/api/v1'

class App extends Component {
  state = {
    firstScreenDone: false,
    secondScreenDone: false,
    selectedStates: [],
    locationList: []
  }
  componentDidMount() {
    this.fetchLocation()
  }

  fetchLocation = () => {
    fetch(`${BASE_URL}/locations`)
    .then(res=> res.json())
    .then(data => this.setState({locationList: data}))
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
      return <MainScreen selectedStates={this.state.selectedStates} locationList={this.state.locationList}/>
    }
  }
}

export default App;
