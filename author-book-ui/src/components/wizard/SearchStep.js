import React from 'react'
import { Segment, Table, Form } from 'semantic-ui-react'

function SearchStep({ search, isLoading, books, selectedBook, handleChange, searchBooks, handleTableSelection }) {
  const bookList = books ? books.map(book => {
    const active = book && selectedBook && book.seq === selectedBook.seq ? true : false
    return (
      <Table.Row
        key={book.seq}
        active={active}
        onClick={() => handleTableSelection(book)}
      >
        <Table.Cell>{book.isbn}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.authorName}</Table.Cell>
        <Table.Cell>{book.year}</Table.Cell>
      </Table.Row>
    )
  }) : (
      <Table.Row>
        <Table.Cell></Table.Cell>
      </Table.Row>
    )

  return (
    <Segment loading={isLoading}>
      <Form onSubmit={searchBooks}>
        <Form.Group widths='equal'>
          <Form.Input
            placeholder='Search for a book title or an author name...'
            id='search'
            value={search}
            onChange={handleChange}
            width={12}
            fluid
          />
          <Form.Button
            primary
            content='Search'
            width={4}
            fluid
          />
        </Form.Group>
      </Form>

      <Table compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default SearchStep