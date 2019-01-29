import React from 'react'
import { Container, Header, Dropdown, Button} from 'semantic-ui-react'
import { CSSTransition } from 'react-transition-group';

class SecondScreen extends React.Component {

  state = {
    secondScreenLoad: false,
    stateOptionsList: [],
    selectedStates: [],
    expanded: false
  }

  componentDidMount() {
    // need secondScreenLoad for CSSTransition
    this.setState({secondScreenLoad: true})
    this.createStateOptionsList()
  }

  //use locationList prop to create options list for dropdown
  createStateOptionsList = () => {
    var statesList = []
    this.props.locationList.forEach(loc => {
      statesList.push({key: loc.name, text: loc.name, value: loc.name})
    })
    this.setState({stateOptionsList: statesList})
  }

  //sort stateOptionsList
  sortLocationList = () => {
    return this.state.stateOptionsList.sort(this.compare)
  }

  //basic sort function
  compare = (a, b) => {
    let comparison = 0
    if (a.key > b.key) {
      comparison = 1
    }
    else {
      comparison = -1
    }
    return comparison
  }

  //add event listener to dropdown menu so that every time it is clicked,
  //setExpandedState function is executed
  setDropdownEventListener = () => {
    if (document.getElementsByClassName("ui multiple selection dropdown star")[0]) {
      var dropdown = document.getElementsByClassName("ui multiple selection dropdown star")[0]
      dropdown.addEventListener("click", () => this.setExpandedState())
      document.body.addEventListener("click", () => this.setExpandedState())
    }
  }

  //grab dropdown menu aria-expanded element from the DOM and set state for whether it is expanded or
  //not - used to place the submit button under the dropdown at all times
  setExpandedState = () => {
    if (document.getElementsByClassName("ui multiple selection dropdown star")[0]) {
      var dropdownActivation = document.getElementsByClassName("ui multiple selection dropdown star")[0].getAttribute('aria-expanded')
      if (dropdownActivation === "false") {
        dropdownActivation = false
      }
      else if (dropdownActivation === "true") {
        dropdownActivation = true
      }
      //only set state if aria-expanded is different from expanded state
      if (this.state.expanded !== dropdownActivation) {
        this.setState({expanded: dropdownActivation})
      }
    }
  }

  //determine where the button should be situated on the page based on whether
  //dropdown is activated
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

  //add all selected states to selectedStates state
  handleSelections = (event) => {
    var stateNodes = document.getElementsByClassName("ui label")
    //remove event listener from body
    document.body.removeEventListener("click", () => this.setExpandedState(), false)
    document.body.removeEventListener("click", () => this.setExpandedState(), true)
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

  //render container with CSS Trainsitions
  render() {
    return  <Container
      textAlign='center'>
      <CSSTransition
        in={this.state.secondScreenLoad}
        timeout={3000}
        classNames="star"
        unmountOnExit
        >
        <React.Fragment>
        <Header
          as='h1'
          className='star'>
          Select a state to see its climbs
        </Header>
        <Dropdown
          placeholder='State'
          multiple selection
          options={this.sortLocationList()}
          className='star'
        />
        <br/> <br/>
        {this.determineButton()}
        {this.setDropdownEventListener()}
        </React.Fragment>
      </CSSTransition>
    </Container>

  }
}

export default SecondScreen
