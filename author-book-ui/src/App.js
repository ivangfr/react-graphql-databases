import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Customer from './components/customer/Customer'
import Author from './components/staff/Author'
import Book from './components/staff/Book'
import Navbar from './components/misc/Navbar'
import AuthorBookWizard from './components/wizard/AuthorBookWizard'

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Customer} />
      <Route path='/customer' exact component={Customer} />
      <Route path='/author' exact component={Author} />
      <Route path='/book' exact component={Book} />
      <Route path='/wizard' exact component={AuthorBookWizard} />
    </Router>
  )
}

export default App
