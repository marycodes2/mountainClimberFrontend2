import React from 'react'
import { Card, Comment, Icon, Header, Form, Button } from 'semantic-ui-react'

class RouteCard extends React.Component {

  state = {
    formDisplayed: false,
    reviewer: "",
    comments: "",
    rating: "",
    reviews: []
  }

  componentDidMount() {
    this.setState({reviews: this.props.route.reviews})
  }

  returnReviews = () => {
    var comments = []
    this.state.reviews.forEach(review => {
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
    if (this.state.reviews.length > 0) {
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
        <Form.Group>
          <Header as='h4' dividing>
            Your Review:
          </Header>
        </Form.Group>
        <Form.Group>
          <Form.Input width={7} required fluid label='Name' placeholder='Name' onChange={(event) => {this.setState({reviewer: event.target.value})}}/>
        </Form.Group>
        <Form.Group>
          <Form.TextArea width={15} required label='Comment' placeholder='Your comment here..' onChange={(event) => {this.setState({comments: event.target.value})}}/>
        </Form.Group>
        <Form.Group>
          <Form.Input width={5} required fluid type='number' max={5} label='Rating' placeholder='5' onChange={(event) => {this.setState({rating: event.target.value})}}/>
        </Form.Group>
        <Button
          type='submit'
          content='Submit'
          primary
          onClick={this.submitReview}
          />
    </Form>
  }

  submitReview = () => {
    if (this.state.reviewer && this.state.comments && this.state.rating <=5 && this.state.rating) {
    let formData = {
      reviewer: this.state.reviewer,
      comments: this.state.comments,
      rating: this.state.rating,
      route_id: this.props.route.id
    }
    console.log(this.props.url)
    fetch(`${this.props.url}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(review => {
      if (review.id) {
        this.setState({formDisplayed: false, reviews: [...this.state.reviews, review]})
      }
      else {
        alert('The development server is down - please wait a minute and try again. Thanks for your patience.')
      }
    })
  }
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
