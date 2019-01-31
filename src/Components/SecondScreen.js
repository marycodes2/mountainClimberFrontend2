import React from 'react'
import { Container, Header, Dropdown, Button, Loader } from 'semantic-ui-react'
import { CSSTransition } from 'react-transition-group';

class SecondScreen extends React.Component {

  state = {
    secondScreenLoad: false,
    stateOptionsList: [],
    selectedStates: [],
    expanded: false,
    setEventHandlerOnDropdown: false
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

  //render loader if there are no stateOptions to choose from (this shouldn't happen because
  // second screen should only load if the fetch call for locationList is complete, but just
  // in case...)
  renderDropdownOrLoader = () => {
   if (this.state.stateOptionsList.length === 0) {
     return <Loader active inline='centered' />
   }
   else {
   return <React.Fragment>
     <Dropdown
       placeholder='State'
       multiple selection
       options={this.sortLocationList()}
       className='star'
       onChange={this.setDropdownEventListener}
     />
     <br/> <br/>
     {this.determineButton()}
   </React.Fragment>
   }
 }

  //add event listener to dropdown menu so that every time it is clicked,
  //setExpandedState function is executed
  setDropdownEventListener = () => {
    var dropdown = document.getElementsByClassName("ui multiple selection dropdown star")[0]
    //event handlers should only be added to dropdown and body once, when this.state.setEventHandlerOnDropdown
    // is false. Once changed to true, event handlers are no longer set
    if (dropdown && !this.state.setEventHandlerOnDropdown) {
      this.setState({setEventHandlerOnDropdown: true})
      dropdown.addEventListener("click", () => this.setExpandedState(dropdown))
      document.body.addEventListener("click", () => this.setExpandedState(dropdown))
      //set state on first click of dropdown
      this.setExpandedState(dropdown)
    }

  }

  //grab dropdown menu aria-expanded element from the DOM and set state for whether it is expanded or
  //not - used to place the submit button under the dropdown at all times
  setExpandedState = (dropdown) => {
      var dropdownActivation = dropdown.getAttribute('aria-expanded')
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

  //determine where the button should be situated on the page based on whether
  //dropdown is activated (updates on every state change as a result of button click)
  //also determines margin based on window width
  determineButton = () => {
    let width = window.innerWidth
    if (this.state.expanded && width < 767) {
      return <Button
          color='green'
          onClick={this.handleSelections}
          id='submitExpanded'
          >
          Submit
        </Button>
    }
    else if (this.state.expanded && width > 766 && width < 988) {
        return <Button
          color='green'
          onClick={this.handleSelections}
          id='submitExpandedMed'
          >
          Submit
        </Button>
    }
    else if (this.state.expanded && width > 987) {
        return <Button
          color='green'
          onClick={this.handleSelections}
          id='submitExpandedLarge'
          >
          Submit
        </Button>
    }
    else {
      return <Button
        color='green'
        onClick={this.handleSelections}
        id='submitNotExpanded'
        >
        Submit
      </Button>
    }
  }

  //add all states selected in dropdown to state:selectedStates
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
    //cannot move to mainScreen until at least one state is selected
    if (states.length === 0) {
      alert("Please select a state before continuing")
    }
    //transition to mainScreen
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
        <br/>
        {this.renderDropdownOrLoader()}
        </React.Fragment>
      </CSSTransition>
    </Container>
  }
}

export default SecondScreen
