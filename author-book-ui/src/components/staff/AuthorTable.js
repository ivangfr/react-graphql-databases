import React from 'react'
import { Table, Button } from 'semantic-ui-react'

function AuthorTable({ authors, deleteAuthor, editAuthor }) {
  const authorList = authors && authors.map(author => {
    return (
      <Table.Row key={author.id}>
        <Table.Cell collapsing>
          <Button
            circular
            color='red'
            size='small'
            icon='trash'
            onClick={() => deleteAuthor(author.id)}
          />
          <Button
            circular
            color='orange'
            size='small'
            icon='edit'
            onClick={() => editAuthor(author)}
          />
        </Table.Cell>
        <Table.Cell>{author.id}</Table.Cell>
        <Table.Cell>{author.name}</Table.Cell>
        <Table.Cell>{author.books.map(book => `"${book.title}"`).join(', ')}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <Table compact striped unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Books</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {authorList}
      </Table.Body>
    </Table>
  )
}

export default AuthorTable