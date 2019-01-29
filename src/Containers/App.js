import React, { Component } from 'react';
import FirstScreen from '../Components/FirstScreen'
import SecondScreen from '../Components/SecondScreen'
import MainScreen from './MainScreen'
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

  goToSecondScreen = () => {
    this.setState({secondScreenDone: false})
  }

  render() {
    if (!this.state.firstScreenDone) {
      return <FirstScreen done={this.firstScreenDone} />
    }
    else if (this.state.firstScreenDone && !this.state.secondScreenDone){
      return <SecondScreen url={BASE_URL} locationList={this.state.locationList} done={(states) => this.secondScreenDone(states)} />
    }
    else {
      return <MainScreen updateLocationList={(review) => {this.updateLocationList(review)}} url={BASE_URL} selectedStates={this.state.selectedStates} locationList={this.state.locationList} backToSecondScreen={this.goToSecondScreen}/>
    }
  }
}

export default App;
