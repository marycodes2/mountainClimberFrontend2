import React from 'react'
import { Card, Comment, Icon, Header, Form, Button } from 'semantic-ui-react'

class RouteCard extends React.Component {

  state = {
    formDisplayed: false
  }

  returnReviews = () => {
    var comments = []
    this.props.route.reviews.forEach(review => {
      comments.push(<Comment key={review.id}>
        <Comment.Avatar src={require('../Images/climber.png')} />
        <Comment.Content>
          <Comment.Author as='a'>{review.reviewer}</Comment.Author>
          <Comment.Text>{review.comments}</Comment.Text>
          <Comment.Action>
              Rating: {review.rating} <Icon name='star' />
          </Comment.Action>
        </Comment.Content>
      </Comment>)
    })
    return comments
  }

  extra = () => {
    return <div>
      Grade: {this.props.route.rating}
        <br/>
      Pitches: {this.props.route.pitches}
        <br/>
      <Button
        content='Add Comment'
        labelPosition='left'
        icon='edit'
        color='grey'
        onClick={this.respondToCommentClick} />
    </div>
  }

  comments = () => {
    if (this.props.route.reviews.length > 0) {
      return <div id="comments">
      <Comment.Group>
        <Header as='h4' dividing>
          Comments
        </Header>
        {this.returnReviews()}
        {this.state.formDisplayed ? this.displayForm() : ""}
      </Comment.Group>
      </div>
    }
    else if (this.state.formDisplayed){
      return this.displayForm()
    }
    else {
      return ""
    }
  }

  respondToCommentClick = () => {
    this.setState({formDisplayed: true})
  }

  displayForm = () => {
    return <Form reply id='reviewHeader'>
      <Form.Group widths='equal'>
        <br/>
        <Header as='h4' dividing>
          Review this Route:
        </Header>
        <Form.Input fluid label='Name' placeholder='Name' />
        <Form.TextArea label='Comment' placeholder='Your comment here..' />
        <Form.Input fluid type='number' max={5} label='Rating' placeholder='5 Stars'/>
      </Form.Group>
    </Form>
  }

  render() {
    return (<Card raised
      image={this.props.route.imgMedium}
      header={this.props.route.name}
      description={this.comments()}
      extra={this.extra()}
      />
    )
  }
}

export default RouteCard
