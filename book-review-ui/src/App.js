import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/misc/Navbar';
import Customer from './components/customer/Customer'
import Book from './components/staff/Book'

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Customer} />
      <Route path='/customer' exact component={Customer} />
      <Route path='/book' exact component={Book} />
    </Router>
  );
}

export default App;
