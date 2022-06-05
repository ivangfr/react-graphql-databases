import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import { bookReviewApi } from '../misc/BookReviewApi'
import BookList from './BookList'
import ReviewModal from './ReviewModal'

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
    this.getBooks()
  }

  handleChange = (e) => {
    const { name, value } = e.target
    const modal = { ...this.state.modal }
    modal.form[name] = value
    this.setState({ modal })
  }

  getBooks = () => {
    this.setState({ isLoading: true })

    const query = `{
      getBooks {
        id
        isbn
        title
        reviews {
          reviewer
          comment
          rating
          createdAt
        }
      }
    }`

    bookReviewApi.call(query)
      .then(response => this.setState({ isLoading: false, books: response.data.data.getBooks }))
      .catch(error => console.log(error))
  }

  submitReview = () => {
    if (!this.isValidForm()) {
      return
    }

    const { id } = this.state.book
    const { reviewer, comment, rating } = this.state.modal.form

    const query = `mutation {
      addBookReview(bookId: "${id}", reviewInput: {reviewer: "${reviewer}", comment: "${comment}", rating: ${rating}}) {
        id
        isbn
        title
        reviews {
          reviewer
          comment
          rating
          createdAt
        }
      }
    }`

    bookReviewApi.call(query)
      .then(response => {
        this.setState({ book: response.data.data.addBookReview })
        this.getBooks()
        this.clearForm()
      })
      .catch(error => console.log(error))
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

  clearForm = () => {
    const modal = { ...this.state.modal }
    modal.form = { ...this.formInitialState }
    this.setState({ modal })
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
    const { isLoading, books, modal, book } = this.state
    return (
      <Container maxWidth='md'>
        <BookList
          isLoading={isLoading}
          books={books}
          openReviewsModal={this.openReviewsModal}
        />

        <ReviewModal
          modal={modal}
          book={book}
          handleClose={this.handleClose}
          handleChange={this.handleChange}
          submitReview={this.submitReview}
        />
      </Container>
    )
  }
}

export default Customer