import axios from 'axios'

export const authorBookApi = {
  call
}

function call(query) {
  return instance.post('graphql', { query })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `http://${window._env_.AUTHOR_BOOK_API_HOST}:${window._env_.AUTHOR_BOOK_API_PORT}` : 'http://localhost:8080'
})