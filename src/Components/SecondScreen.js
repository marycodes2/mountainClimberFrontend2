import React from 'react'
import { Container, Header, Dropdown, Loader, Button} from 'semantic-ui-react'
import { CSSTransition } from 'react-transition-group';

class SecondScreen extends React.Component {

  state = {
    secondScreenLoad: false,
    locationList: [],
    selectedStates: [],
    expanded: false
  }

  componentDidMount() {
    this.setState({secondScreenLoad: true})
    this.fetchLocation()
  }

  fetchLocation = () => {
    fetch(`${this.props.url}/locations`)
    .then(res=> res.json())
    .then(data => data.forEach(location => {
      this.setState({locationList: [...this.state.locationList, ({key: location.name, text: location.name, value: location.name})]})
    }))
  }

  renderDropdownOrLoader = () => {
    if (this.state.locationList.length === 0) {
      return <Loader active inline='centered' />
    }
    else {
    return <React.Fragment>
      <Dropdown
        placeholder='State'
        multiple selection
        options={this.state.locationList}
        className='star'
      />
      <br/> <br/>
      {this.determineButton()}
      {this.setDropdownEventListener()}
    </React.Fragment>
    }
  }

  setExpandedState = () => {
    console.log("setting expanded State..")
    var dropdownActivation = document.getElementsByClassName("ui multiple selection dropdown star")[0].getAttribute('aria-expanded')
    if (dropdownActivation === "false") {
      dropdownActivation = false
    }
    else if (dropdownActivation === "true") {
      dropdownActivation = true
    }
    if (this.state.expanded !== dropdownActivation) {
      this.setState({expanded: dropdownActivation})
    }
  }

  setDropdownEventListener = () => {
    if (document.getElementsByClassName("ui multiple selection dropdown star")[0]) {
      var dropdown = document.getElementsByClassName("ui multiple selection dropdown star")[0]
      dropdown.addEventListener("click", () => this.setExpandedState()) 
    }
  }

  determineButton = () => {
    if (this.state.expanded) {
      return <Button
        color='green'
        onClick={() => this.handleSelections()}
        id='submitExpanded'
        >
        Submit
      </Button>
    }
    else {
      return <Button
        color='green'
        onClick={() => this.handleSelections()}
        id='submitNotExpanded'
        >
        Submit
      </Button>
    }
  }

  handleSelections = (event) => {
    var stateNodes = document.getElementsByClassName("ui label")
    var states = []
      Array.from(stateNodes).forEach(stateNode => {
        states.push(stateNode.innerText)
      }
    )
    if (states.length === 0) {
      alert("Please select a state before continuing")
    }
    else {
      this.setState({selectedStates: states})
      this.props.done(states)
    }
  }

  render() {
    return  <Container
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
      <br></br>
      {this.renderDropdownOrLoader()}
    </Container>

  }
}

export default SecondScreen
