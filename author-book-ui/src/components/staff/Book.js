import React, { Component } from 'react'
import { Container, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { authorBookApi } from '../misc/AuthorBookApi'
import BookTable from './BookTable'
import BookForm from './BookForm'

class Book extends Component {
  formInitialState = {
    id: '',
    isbn: '',
    authorId: '',
    title: '',
    year: 2022,

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
    this.getBooks()
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

    const query = `{
      getAuthors {
        id
        name
      }
    }`

    authorBookApi.call(query)
      .then(response => {
        const authors = response.data.data.getAuthors
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
      .catch(error => console.log(error))
  }

  getBooks = () => {
    const query = `{
      getBooks {
        id
        isbn
        title
        year
        author {
          id
          name
        }
      }
    }`

    authorBookApi.call(query)
      .then(response => this.setState({ books: response.data.data.getBooks }))
      .catch(error => console.log(error))
  }

  saveBook = () => {
    if (!this.isValidForm()) {
      return
    }

    const { id, isbn, authorId, title, year } = this.state.form
    let query
    if (id) {
      query = `mutation {
        updateBook(bookId: ${id}, bookInput: {isbn: "${isbn}", title: "${title}", authorId: ${authorId}, year: ${year}}) {
          id
        }
      }`
    } else {
      query = `mutation {
        createBook(bookInput: {isbn: "${isbn}", title: "${title}", authorId: ${authorId}, year: ${year}}) {
          id
        }
      }`
    }

    authorBookApi.call(query)
      .then(() => {
        this.clearForm()
        this.getBooks()
      })
      .catch(error => console.log(error))
  }

  deleteBook = (id) => {
    const query = `mutation {
      deleteBook(bookId: ${id}) {
        id
      }
    }`

    authorBookApi.call(query)
      .then(() => {
        this.getBooks()
      })
      .catch(error => console.log(error))
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
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment>
              <Header as='h2' icon='book' content='Books' />
              <Divider />
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
            <BookTable
              books={this.state.books}
              deleteBook={this.deleteBook}
              editBook={this.editBook}
            />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Book