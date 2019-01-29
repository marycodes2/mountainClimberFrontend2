import React from 'react'
import { Card, Comment, Icon, Header, Form, Button } from 'semantic-ui-react'

class RouteCard extends React.Component {

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
        <Form reply>
          <Form.TextArea />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
      </div>
    }
    else {
      return <Form reply id='comments'>
        <Form.TextArea />
        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    }
  }

  form = () => {
    var ratingOptions = [1, 2, 3, 4, 5]
    return <Form reply>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Name' placeholder='Name' />
        <Form.TextArea label='Comment' placeholder='Your comment here..' />
        <Form.Select fluid label='Rating' options={ratingOptions} placeholder='3' />
        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
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
