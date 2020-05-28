import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import BookList from './BookList'
import ReviewModal from './ReviewModal'
import authorBookApi from '../misc/AuthorBookApi'
import bookReviewApi from '../misc/BookReviewApi'

class Customer extends Component {
  formInitialState = {
    reviewer: '',
    rating: 3,
    comment: '',
    reviewerError: false,
    commentError: false
  }

  state = {
    isLoading: false,
    books: [],
    book: null,
    modal: {
      open: false,
      form: { ...this.formInitialState }
    }
  }

  componentDidMount() {
    this.getAllBooks()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const modal = { ...this.state.modal }
    modal.form[id] = value
    this.setState({ modal })
  }

  handleRate = (e, { rating }) => {
    const modal = { ...this.state.modal }
    modal.form.rating = rating
    this.setState({ modal })
  }

  getAllBooks = () => {
    this.setState({ isLoading: true })

    authorBookApi.post('graphql',
      `{
      getAllBooks {
        id
        title
        isbn
        year
        author {
          name
        }
        bookReview {
          id
          error
          reviews {
            reviewer
            comment
            rating
            createdAt
          }
        }
      }
    }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(response => {
        this.setState({
          isLoading: false,
          books: response.data.data.getAllBooks
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getBookById = (id) => {
    authorBookApi.post('graphql',
      `{
      getBookById(bookId: ${id}) {
        id
        title
        isbn
        year
        author {
          name
        }
        bookReview {
          id
          error
          reviews {
            reviewer
            comment
            rating
            createdAt
          }
        }
      }
    }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(response => {
        this.setState({
          book: response.data.data.getBookById
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  submitReview = () => {
    if (!this.isValidForm()) {
      return
    }

    const bookId = this.state.book.bookReview.id
    const { reviewer, comment, rating } = this.state.modal.form
    bookReviewApi.post('graphql',
      `mutation {
        addBookReview(bookId: "${bookId}", reviewInput: {reviewer: "${reviewer}", comment: "${comment}", rating: ${rating}}) {
          id
        }
      }`, {
        headers: { 'Content-type': 'application/graphql' }
      })
      .then(() => {
        this.getBookById(this.state.book.id)
        this.getAllBooks()
        this.clearForm()
      })
      .catch(error => {
        console.log(error)
      })
  }

  clearForm = () => {
    const modal = { ...this.state.modal }
    modal.form = { ...this.formInitialState }
    this.setState({ modal })
  }

  isValidForm = () => {
    const modal = { ...this.state.modal }
    const reviewerError = modal.form.reviewer.trim() === ''
    const commentError = modal.form.comment.trim() === ''
    modal.form.reviewerError = reviewerError
    modal.form.commentError = commentError
    this.setState({ modal })
    return (reviewerError || commentError) ? false : true
  }

  openReviewsModal = (book) => {
    const modal = { ...this.state.modal }
    modal.open = true
    this.setState({ modal, book })
  }

  handleClose = () => {
    let modal = { ...this.state.modal }
    modal.open = false
    modal.form = { ...this.formInitialState }
    this.setState({ modal })
  }

  render() {
    const { isLoading, books, book, modal } = this.state

    return (
      <Container>
        <BookList
          isLoading={isLoading}
          books={books}
          openReviewsModal={this.openReviewsModal}
        />

        <ReviewModal
          modal={modal}
          book={book}
          handleChange={this.handleChange}
          handleRate={this.handleRate}
          submitReview={this.submitReview}
          handleClose={this.handleClose}
        />
      </Container>
    )
  }
}

export default Customer