import React from 'react'
import { Segment, Form } from 'semantic-ui-react'

function BookStep({ isbn, title, year, isbnError, titleError, yearError, handleChange }) {
  return (
    <Segment>
      <Form>
        <Form.Input
          label='ISBN'
          id='isbn'
          onChange={handleChange}
          value={isbn}
          error={isbnError}
        />
        <Form.Input
          fluid
          label='Title'
          id='title'
          onChange={handleChange}
          value={title}
          error={titleError}
        />
        <Form.Input
          label='Year'
          id='year'
          type='number'
          onChange={handleChange}
          value={year}
          error={yearError}
        />
      </Form>
    </Segment>
  )
}

export default BookStep