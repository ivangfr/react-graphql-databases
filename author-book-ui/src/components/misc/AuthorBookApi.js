import axios from 'axios'

export default axios.create({
  baseURL: window._env_ ? `http://${window._env_.AUTHOR_BOOK_API_HOST}:${window._env_.AUTHOR_BOOK_API_PORT}` : 'http://localhost:8080'
})