import axios from 'axios'

export const bookReviewApi = {
  call
}

const headers = { 'Content-type': 'application/graphql+json' }

function call(query) {
  return instance.post('graphql', { query }, { headers })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `http://${window._env_.BOOK_REVIEW_API_HOST}:${window._env_.BOOK_REVIEW_API_PORT}` : 'http://localhost:9080'
})