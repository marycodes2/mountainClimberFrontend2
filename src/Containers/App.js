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

  // single get fetch call for app
  fetchLocation = () => {
    fetch(`${BASE_URL}/locations`)
    .then(res=> res.json())
    .then(data => this.setState({locationList: data}))
  }

  //callback function to transition to secondScreen
  firstScreenDone = () => {
    this.setState({firstScreenDone: true})
  }

  //callback function to transition to mainScreen
  secondScreenDone = (states) => {
    this.setState({selectedStates: states, secondScreenDone: true})
  }

  // cb function to transition to secondScreen when back button is pressed on MainScreen
  goToSecondScreen = () => {
    this.setState({secondScreenDone: false})
  }

  // render each screen according to whether they are done and the sortLocationList
  // has loaded. Note second screen does not load until locationList len > 0
  render() {
    if (!this.state.firstScreenDone || this.state.locationList.length === 0) {
      return <FirstScreen done={this.firstScreenDone} />
    }
    else if (this.state.firstScreenDone && !this.state.secondScreenDone && this.state.locationList.length > 0){
      return <SecondScreen url={BASE_URL} locationList={this.state.locationList} done={(states) => this.secondScreenDone(states)} />
    }
    else {
      return <MainScreen updateLocationList={(review) => {this.updateLocationList(review)}} url={BASE_URL} selectedStates={this.state.selectedStates} locationList={this.state.locationList} backToSecondScreen={this.goToSecondScreen}/>
    }
  }
}

export default App;
