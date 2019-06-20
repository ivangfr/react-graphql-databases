import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'

function BookCard({ book, openReviewsModal }) {
  const imageStyle = {
    width: '150px',
    height: '200px',
    marginBottom: '10px'
  }

  const reviewButton = (
    book.bookReview && book.bookReview.error == null ? (
      <Button as='div' labelPosition='right' onClick={() => openReviewsModal && openReviewsModal(book)}>
        <Button color='blue'>
          <Icon name='users' />Reviews</Button>
        <Label as='a' basic color='blue' pointing='left'>{book.bookReview.reviews.length}</Label>
      </Button>
    ) : (
        <Button as='div' labelPosition='right'>
          <Button basic color='red'>
            <Icon name='users' />Reviews</Button>
          <Label as='a' basic color='red' pointing='left'></Label>
        </Button>
      )
  )

  return (
    <Card>
      <Card.Content textAlign="center">
        <Image style={imageStyle} src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} />
        <Card.Header>{book.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta>ISBN: <strong>{book.isbn}</strong></Card.Meta>
        <Card.Meta>Author: <strong>{book.author.name}</strong></Card.Meta>
        <Card.Meta>Year: <strong>{book.year}</strong></Card.Meta>
      </Card.Content>
      <Card.Content textAlign="center" extra>
        <Label.Group>
          {reviewButton}
        </Label.Group>
      </Card.Content>
    </Card>
  )
}

export default BookCard