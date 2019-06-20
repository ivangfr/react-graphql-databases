import React from 'react'
import { Segment, Form, Checkbox } from 'semantic-ui-react'
import BookCard from '../customer/BookCard'

function CompleteStep({ book, createBook, bookReviewApiChecked, handleCheckboxChange }) {
  return (
    <Segment compact>
      <BookCard book={book} />
      <Form>
        <Form.Field>
          <Checkbox
            toggle
            id='bookReviewApiChecked'
            value={bookReviewApiChecked}
            label='Create book in book-review-api'
            onChange={handleCheckboxChange}
          />
        </Form.Field>
        <Form.Button
          fluid
          primary
          onClick={createBook}
        >Create</Form.Button>
      </Form>
    </Segment>
  )
}

export default CompleteStep