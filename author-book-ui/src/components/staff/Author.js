import React, { Component } from 'react'
import { Container, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { authorBookApi } from '../misc/AuthorBookApi'
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
    this.getAuthors()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  getAuthors = () => {
    const query = `{
      getAuthors {
        id
        name
        books {
          title
        }
      }
    }`

    authorBookApi.call(query)
      .then(response => this.setState({ authors: response.data.data.getAuthors }))
      .catch(error => console.log(error))
  }

  saveAuthor = () => {
    if (!this.isValidForm()) {
      return
    }

    const { id, name } = this.state.form
    let query
    if (id) {
      query = `mutation {
        updateAuthor ( authorId: ${id}, authorInput: { name: "${name}" } ) {
          id
        }
      }`
    } else {
      query = `mutation {
        createAuthor ( authorInput: { name:"${name}" } ) {
          id
        }
      }`
    }
    authorBookApi.call(query)
      .then(() => {
        this.clearForm()
        this.getAuthors()
      })
      .catch(error => console.log(error))
  }

  deleteAuthor = (id) => {
    const query = `mutation {
      deleteAuthor(authorId: ${id}) {
        id
      }
    }`

    authorBookApi.call(query)
      .then(() => {
        this.getAuthors()
      })
      .catch(error => console.log(error))
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