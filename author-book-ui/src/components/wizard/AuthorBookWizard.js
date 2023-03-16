import React, { Component } from 'react'
import { Container, Grid, Step, Icon, Button, Divider, Form, Checkbox } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'
import SearchStep from './SearchStep'
import BookStep from './BookStep'
import AuthorStep from './AuthorStep'
import CompleteStep from './CompleteStep'
import openLibraryApi from '../misc/OpenLibraryApi'
import { authorBookApi } from '../misc/AuthorBookApi'
import { bookReviewApi } from '../misc/BookReviewApi'

class AuthorBookWizard extends Component {
  state = {
    step: 1,
    isLoading: false,

    // Search Step
    search: '',
    books: [],
    selectedBook: null,

    // Auhtor Step
    authorId: '',
    authorIdError: false,
    authorName: '',
    authorNameError: false,
    authorDropdown: {
      isFetching: false,
      multiple: false,
      search: true,
      searchQuery: null,
      options: []
    },

    // Book Step
    seq: '',
    isbn: '',
    title: '',
    year: '',
    isbnError: false,
    titleError: false,
    yearError: false,

    // Complete Step
    bookReviewApiChecked: 'unchecked',

    bookCreated: false
  }

  componentDidMount() {
    this.fillAuthorDropdown()
  }

  previousStep = () => {
    let { step } = this.state

    let { selectedBook, authorId, authorName, authorIdError, authorNameError, isbn, title, year, isbnError, titleError, yearError } = this.state
    if (step === 2) {
      selectedBook = null
      authorId = ''
      authorName = ''
      authorIdError = false
      authorNameError = false
      isbn = ''
      title = ''
      year = ''
      isbnError = false
      titleError = false
      yearError = false
    }

    step = step > 1 ? step - 1 : step
    this.setState({ step, selectedBook, authorId, authorName, authorIdError, authorNameError, isbn, title, year, isbnError, titleError, yearError })
  }

  nextStep = () => {
    let { step } = this.state

    if (step === 2 && !this.hasAuthorSelected()) {
      return
    }
    if (step === 3 && !this.isValidBookForm()) {
      return
    }

    step = step < 4 ? step + 1 : step
    this.setState({ step })
  }

  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  handleCheckboxChange = (e, { value }) => {
    let { bookReviewApiChecked } = this.state
    bookReviewApiChecked = value === 'checked' ? 'unchecked' : 'checked'
    this.setState({ bookReviewApiChecked })
  }

  handleDropdownChange = (e, { value }) => {
    this.setState({ authorId: value })
  }

  handleDropdownSearchChange = (e, { searchQuery }) => {
    const authorDropdown = { ...this.state.authorDropdown }
    authorDropdown.searchQuery = searchQuery
    this.setState({ authorDropdown })
  }

  getAuthorByName = (authorName) => {
    const query = `{
      getAuthorByName(authorName: "${authorName}") {
        id
      }
    }`

    authorBookApi.call(query)
      .then(response => {
        if (response.data.data.getAuthorByName.length > 0) {
          let authorId = response.data.data.getAuthorByName[0].id
          this.setState({ authorId })
        } else {
          this.setState({ authorName })
        }
      })
      .catch(error => console.log(error))
  }

  handleTableSelection = (book) => {
    this.getAuthorByName(book.authorName)

    this.setState({
      selectedBook: book,
      isbn: book.isbn,
      title: book.title,
      year: book.year
    })
  }

  searchBooks = () => {
    this.setState({ isLoading: true })

    openLibraryApi.get(`/search.json?q=${encodeURI(this.state.search)}`)
      .then(response => {
        const books = response.data.docs
          .filter(doc => doc.isbn && doc.title_suggest && doc.author_name && doc.publish_year)
          .map((doc, i) => {
            const book = {
              seq: i,
              isbn: doc.isbn && doc.isbn[0],
              title: doc.title_suggest,
              authorName: doc.author_name && doc.author_name[0],
              year: doc.publish_year && doc.publish_year[0].toString()
            }
            return book
          })
        this.setState({ books, isLoading: false })
      })
      .catch(error => console.log(error))
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

  createAuthor = () => {
    if (!this.isValidAuthorForm()) {
      return
    }

    this.setState({ isLoading: true })
    const { authorName } = this.state

    const query = `mutation {
      createAuthor ( authorInput: { name:"${authorName}" } ) {
        id
      }
    }`

    authorBookApi.call(query)
      .then((response) => {
        this.fillAuthorDropdown()
        const authorId = response.data.data.createAuthor.id
        this.setState({
          isLoading: false,
          authorId,
          authorName: ''
        })
      })
      .catch(error => console.log(error))
  }

  createBook = () => {
    const { isbn, authorId, title, year, bookReviewApiChecked } = this.state

    if (bookReviewApiChecked === 'checked') {
      const query = `mutation {
        createBook(bookInput: {isbn: "${isbn}", title: "${title}"}) {
          id
        }
      }`

      bookReviewApi.call(query)
        .then((response) => {
          const { id } = response.data.data.createBook
          console.log(`Book created successfully in book-review-api, id: ${id}`)
        })
        .catch(error => console.log(error))
    }

    const query = `mutation {
      createBook(bookInput: {isbn: "${isbn}", title: "${title}", authorId: ${authorId}, year: ${year}}) {
        id
      }
    }`

    authorBookApi.call(query)
      .then(() => {
        this.setState({bookCreated: true})
      })
      .catch(error => console.log(error))
  }

  isValidAuthorForm = () => {
    const authorNameError = this.state.authorName.trim() === ''
    this.setState({ authorNameError })
    return authorNameError ? false : true
  }

  hasAuthorSelected = () => {
    const authorIdError = this.state.authorId.trim() === ''
    this.setState({ authorIdError })
    return authorIdError ? false : true
  }

  isValidBookForm = () => {
    const isbnError = this.state.isbn.trim() === ''
    const titleError = this.state.title.trim() === ''
    const yearError = this.state.year.trim() === ''
    this.setState({ isbnError, titleError, yearError })
    return isbnError || titleError || yearError ? false : true
  }

  render() {
    if (this.state.bookCreated) {
      return <Navigate to='/customer' />
    }

    const { step } = this.state

    let stepContent
    if (step === 1) {
      const { search, isLoading, books, selectedBook } = this.state
      stepContent = (
        <SearchStep
          search={search}
          isLoading={isLoading}
          books={books}
          selectedBook={selectedBook}
          handleChange={this.handleChange}
          searchBooks={this.searchBooks}
          handleTableSelection={this.handleTableSelection}
        />
      )
    }
    else if (step === 2) {
      const { isLoading, authorId, authorIdError, authorName, authorNameError, authorDropdown } = this.state
      stepContent = (
        <AuthorStep
          isLoading={isLoading}
          authorId={authorId}
          authorIdError={authorIdError}
          authorName={authorName}
          authorNameError={authorNameError}
          authorDropdown={authorDropdown}
          handleChange={this.handleChange}
          createAuthor={this.createAuthor}
          handleDropdownChange={this.handleDropdownChange}
          handleDropdownSearchChange={this.handleDropdownSearchChange}
        />
      )
    } else if (step === 3) {
      const { isbn, title, year, isbnError, titleError, yearError } = this.state
      stepContent = (
        <BookStep
          isbn={isbn}
          title={title}
          year={year}
          isbnError={isbnError}
          titleError={titleError}
          yearError={yearError}
          handleChange={this.handleChange}
        />
      )
    } else if (step === 4) {
      const { isbn, title, authorId, year, authorDropdown } = this.state
      const name = authorDropdown.options.filter(a => a['key'] === authorId)[0]['text']
      const book = {
        isbn: isbn,
        title: title,
        year: year,
        author: { name }
      }
      stepContent = (
        <CompleteStep book={book} />
      )
    } else {
      stepContent = null
    }

    const { bookReviewApiChecked } = this.state
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Step.Group vertical unstackable>
              <Step active={step === 1}>
                <Icon name='search' />
                <Step.Content>
                  <Step.Title>Search</Step.Title>
                  <Step.Description>Search book</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 2}>
                <Icon name='user' />
                <Step.Content>
                  <Step.Title>Author</Step.Title>
                  <Step.Description>Select or create author</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 3}>
                <Icon name='book' />
                <Step.Content>
                  <Step.Title>Book</Step.Title>
                  <Step.Description>Check book information</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 4}>
                <Icon name='flag checkered' />
                <Step.Content>
                  <Step.Title>Complete</Step.Title>
                  <Step.Description>Preview and complete</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

            <Button.Group fluid>
              <Button
                disabled={step === 1}
                onClick={this.previousStep}>Back</Button>
              <Button.Or />
              <Button
                positive
                disabled={step === 4}
                onClick={this.nextStep}>Next</Button>
            </Button.Group>

            {step === 4 && (
              <>
                <Divider />
                <Form>
                  <Form.Field>
                    <Checkbox
                      toggle
                      id='bookReviewApiChecked'
                      value={bookReviewApiChecked}
                      label='Create book in book-review-api'
                      onChange={this.handleCheckboxChange}
                    />
                  </Form.Field>
                  <Form.Button
                    fluid
                    primary
                    onClick={this.createBook}
                  >Create</Form.Button>
                </Form>
              </>
            )}
          </Grid.Column>

          <Grid.Column mobile={16} tablet={12} computer={12}>
            {stepContent}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default AuthorBookWizard