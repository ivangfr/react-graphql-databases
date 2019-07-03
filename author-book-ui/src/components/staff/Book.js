import React, { Component } from 'react'
import { Container, Grid, Segment, Header } from 'semantic-ui-react'
import authorBookApi from '../misc/author-book-api'
import BookTable from './BookTable'
import BookForm from './BookForm'

class Book extends Component {
  formInitialState = {
    id: '',
    isbn: '',
    authorId: '',
    title: '',
    year: 2019,

    isbnError: false,
    titleError: false,
    authorIdError: false,
    yearError: false,
  }

  state = {
    books: [],
    form: { ...this.formInitialState },
    authorDropdown: {
      isFetching: false,
      multiple: false,
      search: true,
      searchQuery: null,
      options: []
    },
  }

  componentDidMount() {
    this.fillAuthorDropdown()
    this.getAllBooks()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  handleDropdownChange = (e, { value }) => {
    const form = { ...this.state.form }
    form.authorId = value
    this.setState({ form })
  }

  handleDropdownSearchChange = (e, { searchQuery }) => {
    const authorDropdown = { ...this.state.authorDropdown }
    authorDropdown.searchQuery = searchQuery
    this.setState({ authorDropdown })
  }

  fillAuthorDropdown = () => {
    const authorDropdown = { ...this.state.authorDropdown }
    authorDropdown.isFetching = true
    this.setState({ authorDropdown })

    authorBookApi.post('graphql',
      `{
        getAllAuthors {
          id
          name
        }
      }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(response => {
        const authors = response.data.data.getAllAuthors
        const options = authors.map(author => {
          return {
            "key": author.id,
            "text": author.name,
            "value": author.id
          }
        })
        const authorDropdown = { ...this.state.authorDropdown }
        authorDropdown.options = options
        authorDropdown.isFetching = false
        this.setState({ authorDropdown })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getAllBooks = () => {
    authorBookApi.post('graphql',
      `{
        getAllBooks {
          id
          isbn
          title
          year
          author {
            id
            name
          }
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

    const { id, isbn, authorId, title, year } = this.state.form
    let request
    if (id) {
      request = `mutation {
        updateBook(bookId: ${id}, bookInput: {isbn: "${isbn}", title: "${title}", authorId: ${authorId}, year: ${year}}) {
          id
        }
      }`
    } else {
      request = `mutation {
        createBook(bookInput: {isbn: "${isbn}", title: "${title}", authorId: ${authorId}, year: ${year}}) {
          id
        }
      }`
    }

    authorBookApi.post('graphql', request, {
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
    authorBookApi.post('graphql',
      `mutation {
        deleteBook(bookId: ${id}) {
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
      authorId: book.author.id,
      title: book.title,
      year: book.year,
      isbnError: false,
      titleError: false,
      authorIdError: false,
      yearError: false,
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
    const authorIdError = form.authorId.trim() === ''
    const yearError = form.year <= 0

    form.isbnError = isbnError
    form.titleError = titleError
    form.authorIdError = authorIdError
    form.yearError = yearError

    this.setState({ form })
    return (isbnError || titleError || authorIdError || yearError) ? false : true
  }

  render() {
    return (
      <Container>
        <Header as='h3' textAlign='center'>Books</Header>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment>
              <BookForm
                form={this.state.form}
                authorDropdown={this.state.authorDropdown}
                handleChange={this.handleChange}
                handleDropdownChange={this.handleDropdownChange}
                handleDropdownSearchChange={this.handleDropdownSearchChange}
                saveBook={this.saveBook}
                clearForm={this.clearForm}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <Segment>
              <BookTable
                books={this.state.books}
                deleteBook={this.deleteBook}
                editBook={this.editBook}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Book