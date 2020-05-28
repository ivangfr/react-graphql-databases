import React, { Component } from 'react'
import { Container, Grid } from '@material-ui/core'
import BookForm from './BookForm'
import BookTable from './BookTable'
import bookReviewApi from '../misc/BookReviewApi'

class Staff extends Component {
  formInitialState = {
    id: '',
    isbn: '',
    title: '',
    isbnError: false,
    titleError: false
  }

  state = {
    books: [],
    form: { ...this.formInitialState }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  getAllBooks = () => {
    bookReviewApi.post('graphql',
      `{
        getAllBooks {
          id
          isbn
          title
        }
      }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(response => {
        this.setState({
          books: response.data.data.getAllBooks
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  saveBook = () => {
    if (!this.isValidForm()) {
      return
    }

    const { id, isbn, title } = this.state.form

    let request
    if (id) {
      request = `mutation {
        updateBook(bookId: "${id}", bookInput: {isbn: "${isbn}", title: "${title}"}) {
          id
        }
      }`
    } else {
      request = `mutation {
        createBook(bookInput: {isbn: "${isbn}", title: "${title}"}) {
          id
        }
      }`
    }

    bookReviewApi.post('graphql', request, {
      headers: { 'Content-type': 'application/graphql' }
    })
      .then(() => {
        this.clearForm()
        this.getAllBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteBook = (id) => {
    bookReviewApi.post('graphql',
      `mutation {
        deleteBook(bookId: "${id}") {
          id
        }
      }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(() => {
        this.getAllBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  editBook = (book) => {
    const form = {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      isbnError: false,
      titleError: false
    }
    this.setState({ form })
  }

  clearForm = () => {
    this.setState({
      form: { ...this.formInitialState }
    })
  }

  isValidForm = () => {
    const form = { ...this.state.form }
    const isbnError = form.isbn.trim() === ''
    const titleError = form.title.trim() === ''
    form.isbnError = isbnError
    form.titleError = titleError
    this.setState({ form })
    return (isbnError || titleError) ? false : true
  }

  render() {
    const { form, books } = this.state
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <BookForm
              form={form}
              handleChange={this.handleChange}
              clearForm={this.clearForm}
              saveBook={this.saveBook}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <BookTable
              books={books}
              deleteBook={this.deleteBook}
              editBook={this.editBook}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Staff