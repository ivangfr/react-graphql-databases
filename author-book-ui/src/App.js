import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Customer from './components/customer/Customer'
import Author from './components/staff/Author'
import Book from './components/staff/Book'
import Navbar from './components/misc/Navbar'
import AuthorBookWizard from './components/wizard/AuthorBookWizard'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Customer />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/author' element={<Author />} />
        <Route path='/book' element={<Book />} />
        <Route path='/wizard' element={<AuthorBookWizard />} />
      </Routes>
    </Router>
  )
}

export default App
