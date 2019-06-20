import React from 'react'
import { Form, Button } from 'semantic-ui-react'

function AuthorForm({ form, handleChange, saveAuthor, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label='Name'
        id='name'
        onChange={handleChange}
        value={form.name}
        error={form.nameError}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={saveAuthor}>Save</Button>
      </Button.Group>
    </Form>
  )
}

export default AuthorForm