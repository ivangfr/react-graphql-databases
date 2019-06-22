import axios from 'axios'

export default axios.create({
  baseURL: window._env_ ? `http://${window._env_.BOOK_REVIEW_API_HOST}:${window._env_.BOOK_REVIEW_API_PORT}` : 'http://localhost:9080'
})