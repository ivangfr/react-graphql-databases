import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'

function Navbar() {
  return (
    <Menu>
      <Container>
        <Menu.Item header>Author Book UI</Menu.Item>
        <Menu.Item as={NavLink} to="/customer">Customer</Menu.Item>
        <Dropdown item text='Staff'>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/author">Authors</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/book">Books</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/wizard">Author-Book Wizard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  )
}

export default Navbar