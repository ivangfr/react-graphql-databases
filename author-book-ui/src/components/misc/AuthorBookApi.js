import axios from 'axios'

export const authorBookApi = {
  call
}

const headers = { 'Content-type': 'application/graphql+json' }

function call(query) {
  return instance.post('graphql', { query }, { headers })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `http://${window._env_.AUTHOR_BOOK_API_HOST}:${window._env_.AUTHOR_BOOK_API_PORT}` : 'http://localhost:8080'
})