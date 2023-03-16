import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/misc/Navbar'
import Customer from './components/customer/Customer'
import Book from './components/staff/Book'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Customer />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/book' element={<Book />} />
      </Routes>
    </Router>
  )
}

export default App
