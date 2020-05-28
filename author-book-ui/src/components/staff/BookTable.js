import React from 'react'
import { Table, Button } from 'semantic-ui-react'

function BookTable({ books, deleteBook, editBook }) {
  const bookList = books && books.map(book => {
    return (
      <Table.Row key={book.id}>
        <Table.Cell collapsing>
          <Button
            circular
            color='red'
            size='small'
            icon='trash'
            onClick={() => deleteBook(book.id)}
          />
          <Button
            circular
            color='orange'
            size='small'
            icon='edit'
            onClick={() => editBook(book)}
          />
        </Table.Cell>
        <Table.Cell>{book.id}</Table.Cell>
        <Table.Cell>{book.isbn}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.author.name}</Table.Cell>
        <Table.Cell>{book.year}</Table.Cell>
      </Table.Row>
    )
  })
  
  return (
    <Table compact striped unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Id</Table.HeaderCell>
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
  )
}

export default BookTable