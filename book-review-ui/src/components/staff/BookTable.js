import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  }
}))

function BookTable({ books, deleteBook, editBook }) {
  const classes = useStyles()

  const bookList = books && books.map(book => {
    return (
      <TableRow key={book.id}>
        <TableCell>
          <IconButton aria-label="Delete" onClick={() => deleteBook(book.id)}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
          <IconButton aria-label="Edit" onClick={() => editBook(book)}>
            <EditOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell>{book.id}</TableCell>
        <TableCell>{book.isbn}</TableCell>
        <TableCell>{book.title}</TableCell>
      </TableRow>
    )
  })

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default BookTable