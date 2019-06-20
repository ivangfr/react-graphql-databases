import React from 'react'
import { Form, Button, Dropdown } from 'semantic-ui-react'

function BookForm({ form, authorDropdown, handleChange, handleDropdownChange, handleDropdownSearchChange, saveBook, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label='ISBN'
        id='isbn'
        onChange={handleChange}
        value={form.isbn}
        error={form.isbnError}
      />
      <Form.Input
        fluid
        label='Title'
        id='title'
        onChange={handleChange}
        value={form.title}
        error={form.titleError}
      />
      <Form.Field>
        <label>Author</label>
        <Dropdown
          fluid
          selection
          clearable
          multiple={authorDropdown.multiple}
          search={authorDropdown.search}
          options={authorDropdown.options}
          value={form.authorId}
          placeholder='Select Author...'
          onChange={handleDropdownChange}
          onSearchChange={handleDropdownSearchChange}
          disabled={authorDropdown.isFetching}
          loading={authorDropdown.isFetching}
          error={form.authorIdError}
        />
      </Form.Field>
      <Form.Input
        fluid
        label='Year'
        id='year'
        onChange={handleChange}
        value={form.year}
        type='number'
        error={form.yearError}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={saveBook}>Save</Button>
      </Button.Group>
    </Form>
  )
}

export default BookForm