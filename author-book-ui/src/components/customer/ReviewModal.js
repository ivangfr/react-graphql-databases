import React from 'react'
import { Modal, Form, Rating, TextArea, Divider, Comment, Icon, Header } from 'semantic-ui-react'
import Moment from 'react-moment'

function ReviewModal({ modal, book, handleChange, handleRate, submitReview, handleClose }) {
  const reviews = book && book.bookReview.reviews && book.bookReview.reviews.length > 0 ?
    book.bookReview.reviews.map(review => {
      const stars = [...Array(review.rating).keys()].map(i => <Icon key={i} name='star' />)
      return (
        <Comment key={review.reviewer}>
          <Comment.Avatar src={`https://robohash.org/${review.reviewer}.png`} />
          <Comment.Content>
            <Comment.Author as='a'>{review.reviewer}</Comment.Author>
            <Comment.Metadata>
              <Moment fromNow ago>{review.createdAt}</Moment>
              <div>{stars}</div>
            </Comment.Metadata>
            <Comment.Text>{review.comment}</Comment.Text>
          </Comment.Content>
        </Comment>
      )
    }) : <Header as='h4'>No reviews</Header>

  const modalHeader = book && `"${book.title}" Reviews`

  return (
    <Modal size='small' open={modal.open} onClose={handleClose}>
      <Modal.Header>{modalHeader}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                size='small'
                id='reviewer'
                label='Reviewer'
                placeholder='Your name'
                onChange={handleChange}
                value={modal.form.reviewer}
                error={modal.form.reviewerError}
              />
              <Form.Field>
                <label>Rating</label>
                <Rating
                  icon='star'
                  defaultRating={3}
                  maxRating={5}
                  onRate={handleRate}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field
              id='comment'
              size='small'
              control={TextArea}
              label='Comment'
              placeholder='Tell us more about the book ...'
              onChange={handleChange}
              value={modal.form.comment}
              error={modal.form.commentError}
            />
            <Form.Button size='small' color='blue' onClick={submitReview}>Submit</Form.Button>
          </Form>
          <Divider />
          <Comment.Group>
            {reviews}
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ReviewModal