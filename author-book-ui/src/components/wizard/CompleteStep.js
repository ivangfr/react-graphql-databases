import React from 'react'
import { Card } from 'semantic-ui-react'
import BookCard from '../customer/BookCard'

function CompleteStep({ book }) {
  return (
    <Card.Group doubling centered>
      <BookCard book={book} />
    </Card.Group>
  )
}

export default CompleteStep