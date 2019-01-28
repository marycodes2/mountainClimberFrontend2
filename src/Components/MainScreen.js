import React from 'react'
import { Header, Container, Grid, Card } from 'semantic-ui-react'


class MainScreen extends React.Component {
  state = {
    filteredLocations: []
  }

  filterLocationList = () => {
    var filteredLocations = this.props.locationList.filter(location => {
      return this.props.selectedStates.includes(location.name)
    })
    console.log(filteredLocations)
    return filteredLocations
  }

  render() {
    return ( <Container
      textAlign='center'>

      <Grid padded columns={1} textAlign='centered'>
        <Grid.Row>
          <Grid.Column padded>
            hello
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </Container>
    )
  }
}

export default MainScreen
