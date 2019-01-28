import React from 'react'
import { Container, Grid, Header, Card, Responsive } from 'semantic-ui-react'
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
        <Header key={location.id} as='h2'>{location.name}</Header>

        <Responsive maxWidth={670}>
        <Card.Group itemsPerRow={1}>
          {location.routes.map(route => {
            return <RouteCard key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

        <Responsive minWidth={671} maxWidth={900}>
        <Card.Group itemsPerRow={2}>
          {location.routes.map(route => {
            return <RouteCard key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

        <Responsive minWidth={901}>
        <Card.Group itemsPerRow={4}>
          {location.routes.map(route => {
            return <RouteCard key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

      </React.Fragment>
    })
  }

  render() {
    return ( <Container>

      <Grid>
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
