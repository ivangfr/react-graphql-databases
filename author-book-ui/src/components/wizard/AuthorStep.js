import React from 'react'
import { Segment, Dropdown, Input, Form, Divider } from 'semantic-ui-react'

function AuthorStep({ isLoading, authorId, authorIdError, authorName, authorNameError, authorDropdown, handleChange, createAuthor, handleDropdownChange, handleDropdownSearchChange }) {
  return (
    <Segment loading={isLoading}>
      <Form>
        <Form.Group>
          <Form.Field inline error={authorNameError}>
            <label>Name</label>
            <Input
              id='authorName'
              value={authorName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Button
            primary
            content='Create'
            onClick={createAuthor}
          />
        </Form.Group>
      </Form>

      <Divider />
      
      <Dropdown
        fluid
        selection
        clearable
        multiple={authorDropdown.multiple}
        search={authorDropdown.search}
        options={authorDropdown.options}
        value={authorId}
        placeholder='Select Author...'
        onChange={handleDropdownChange}
        onSearchChange={handleDropdownSearchChange}
        disabled={authorDropdown.isFetching}
        loading={authorDropdown.isFetching}
        error={authorIdError}
      />
    </Segment>
  )
}

export default AuthorStep