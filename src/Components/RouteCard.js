import React from 'react'
import { Header, Card } from 'semantic-ui-react'

class RouteCard extends React.Component {

  render() {
    return (<Card 
      image={this.props.route.imgMedium}
      header={this.props.route.name}
      />
    )
  }
}

export default RouteCard
