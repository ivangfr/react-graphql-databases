import React from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'
import BookCard from './BookCard'

function BookList({ isLoading, books, openReviewsModal }) {
  if (isLoading) {
    return null
  }

  const bookList = books && books.map(book => {
    return (
      <BookCard
        key={book.id}
        book={book}
        openReviewsModal={openReviewsModal}
      />
    )
  })

  return (
    books && books.length > 0 ? (
      <Card.Group doubling centered>
        {bookList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No books</Header>
        </Segment>
      )
  )
}

export default BookList