import React from 'react'
import { Card } from 'semantic-ui-react'

class RouteCard extends React.Component {

  render() {
    return (<Card raised
      image={this.props.route.imgMedium}
      header={this.props.route.name}
      extra={<div>
        Grade: {this.props.route.rating}
          <br/>
         Pitches: {this.props.route.pitches}
        </div>}
      />
    )
  }
}

export default RouteCard
