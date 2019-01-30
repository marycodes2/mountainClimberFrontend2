import React from 'react'
import { Grid, Header, Card, Responsive } from 'semantic-ui-react'
import RouteCard from '../Components/RouteCard'
import Navbar from '../Components/Navbar'


class MainScreen extends React.Component {
  state = {
    filteredLocations: []
  }

  componentDidMount() {
    this.filterLocationList()
  }

  // filter locationList for just the objects for states that the user selected
  // in secondScreen
  filterLocationList = () => {
    var filteredLocationsList = this.props.locationList.filter(location => {
      return this.props.selectedStates.includes(location.name)
    })
    this.setState({filteredLocations: filteredLocationsList})
  }

  // return header with state name
  returnStateName = (state) => {
    return <Header key={state.id} as="h1">{state.name}</Header>
  }

  // return header with name of Climbing Location and also make responsives for mobile,
  // tablet, and desktop with different row sizes
  returnStateLocations = (state) => {
    return state.locations.map(location => {
      return <React.Fragment
        key={location.id}>
        {location.routes.length > 0 ? <Header key={location.id} as='h2'>{location.name}</Header> : "" }

        <Responsive maxWidth={529}>
        <Card.Group itemsPerRow={1}>
          {location.routes.map(route => {
            return <RouteCard url={this.props.url} key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

        <Responsive minWidth={530} maxWidth={900}>
        <Card.Group itemsPerRow={2}>
          {location.routes.map(route => {
            return <RouteCard url={this.props.url} key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

        <Responsive minWidth={901}>
        <Card.Group itemsPerRow={4}>
          {location.routes.map(route => {
            return <RouteCard url={this.props.url} key={route.id} route={route}/>
            }
          )}
        </Card.Group>
        </Responsive>

      </React.Fragment>
    })
  }

  render() {
    return ( <React.Fragment>
        <Navbar backToSecondScreen={this.props.backToSecondScreen}/>
        <div
          id='mainPageContainer'>
        <Grid>
          <Grid.Row>
            <Grid.Column padded="true">
              {this.state.filteredLocations.map(state => {
                return <React.Fragment
                  key={state.id}>
                  {this.returnStateName(state)}
                  {this.returnStateLocations(state)}
                </React.Fragment>
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </React.Fragment>
    )
  }
}

export default MainScreen
