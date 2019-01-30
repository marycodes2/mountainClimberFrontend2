import React from 'react'
import { Icon } from 'semantic-ui-react'

// simple navbar with onClick handler to transition back to second screen
class Navbar extends React.Component {
  render() {
    return(<div
      className={`ui inverted grey menu navbar`}>
      <div
        className="item ui header left"
        >
        <Icon name='map signs'/>
        Mountain Climber
        </div>
      <div
        className="item ui header right"
        onClick={this.props.backToSecondScreen}
        >
        <Icon name='angle double left'/>
        Back</div>
    </div>
    )
  }
}

export  default Navbar
