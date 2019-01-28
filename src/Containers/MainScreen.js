import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import RouteCard from '../Components/RouteCard'


class MainScreen extends React.Component {
  state = {
    filteredLocations: []
  }

  componentDidMount() {
    this.filterLocationList()
  }

  filterLocationList = () => {
    var filteredLocationsList = this.props.locationList.filter(location => {
      return this.props.selectedStates.includes(location.name)
    })
    console.log(filteredLocationsList)
    this.setState({filteredLocations: filteredLocationsList})
  }

  returnStateName = (state) => {
    return <Header key={state.id} as="h1">{state.name}</Header>
  }

  returnStateLocations = (state) => {
    return state.locations.map(location => {
      return <React.Fragment>
        <Header key={location.id} as='h3'>{location.name}</Header>
        {location.routes.map(route => {
          return <RouteCard route={route}/>
        })}
      </React.Fragment>
    })
  }

  render() {
    return ( <Container>

      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column padded="true">
            {this.state.filteredLocations.map(state => {
              return <React.Fragment>
              {this.returnStateName(state)}
              {this.returnStateLocations(state)}
              </React.Fragment>
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </Container>
    )
  }
}

export default MainScreen
