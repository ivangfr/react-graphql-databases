import React, { Component } from 'react'
import { Container, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import authorBookApi from '../misc/AuthorBookApi'
import AuthorTable from './AuthorTable'
import AuthorForm from './AuthorForm'

class Author extends Component {
  formInitialState = {
    id: '',
    name: '',
    nameError: false,
  }

  state = {
    authors: [],
    form: { ...this.formInitialState }
  }

  componentDidMount() {
    this.getAllAuthors()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  getAllAuthors = () => {
    authorBookApi.post('graphql',
      `{
        getAllAuthors {
          id
          name
          books {
            title
          }
        }
      }`, {
      headers: { 'Content-type': 'application/graphql' }
    })
      .then(response => {
        this.setState({
          authors: response.data.data.getAllAuthors
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  saveAuthor = () => {
    if (!this.isValidForm()) {
      return
    }

    const { id, name } = this.state.form
    let request
    if (id) {
      request = `mutation {
        updateAuthor ( authorId: ${id}, authorInput: { name: "${name}" } ) {
          id
        }
      }`
    } else {
      request = `mutation {
        createAuthor ( authorInput: { name:"${name}" } ) {
          id
        }
      }`
    }
    authorBookApi.post('graphql', request, {
      headers: { 'Content-type': 'application/graphql' }
    })
      .then(() => {
        this.clearForm()
        this.getAllAuthors()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteAuthor = (id) => {
    authorBookApi.post('graphql',
      `mutation {
        deleteAuthor(authorId: ${id}) {
          id
        }
      }`, {
      headers: { 'Content-type': 'application/graphql' }
    })
      .then(() => {
        this.getAllAuthors()
      })
      .catch(error => {
        console.log(error)
      })
  }

  editAuthor = (author) => {
    const form = {
      id: author.id,
      name: author.name,
      nameError: false
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
    const nameError = form.name.trim() === ''
    form.nameError = nameError
    this.setState({ form })
    return nameError ? false : true
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment>
              <Header as='h2' icon='user' content='Authors' />
              <Divider />
              <AuthorForm
                form={this.state.form}
                handleChange={this.handleChange}
                saveAuthor={this.saveAuthor}
                clearForm={this.clearForm}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <Segment>
              <AuthorTable
                authors={this.state.authors}
                deleteAuthor={this.deleteAuthor}
                editAuthor={this.editAuthor}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Author