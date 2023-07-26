import React, { useEffect } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listLanguages } from '../action/languageActions'

function Header() {

  const dispatch = useDispatch() 

  const languageList = useSelector(state => state.languageList)
  const { error, loading, success, languages } = languageList
  // console.log(languages)

  useEffect(() => {
    // dispatch(listLanguages())
  }, [])

  return (

    <header>
    
    <Navbar expand='lg' className='mb-3'>
      <Container fluid>
        {/* <LinkContainer to='/'> */}
        {/* <Link to='/'> */}
          <Navbar.Brand as={ Link } to='/' className='ms-3 ps-3'>1K Words</Navbar.Brand>
        {/* </Link> */}
        {/* </LinkContainer> */}
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-expand`} />
        <Navbar.Offcanvas
          id='offcanvasNavbar-expand-expand'
          aria-labelledby='offcanvasNavbarLabel-expand-expand'
          placement='end'
        >

          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-expand'>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3 me-3'>
              <Nav.Link href='#' className='d-flex'>
                <i className='fa-sharp fa-solid fa-house me-1'></i>
                Home
              </Nav.Link>
              {/* <Nav.Link href='#'>Link 1</Nav.Link> */}

              <NavDropdown
                title='Language'
                id='offcanvasNavbarDropdown-expand-expand'
              >
                {/* {languages.map(language => (
                  <NavDropdown.Item key={ language.id } href={`/${ language.language }`}>{ language.language }</NavDropdown.Item>
                ))} */}
                <NavDropdown.Item href='/spanish'>Spanish</NavDropdown.Item>
                <NavDropdown.Item href='/french'>French</NavDropdown.Item>
                <NavDropdown.Item href='/italian'>Italian</NavDropdown.Item>
              </NavDropdown>
            
            </Nav>

            {/* <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='search'
                className='me-2'
                aria-label='Search'
              />

              <Button variant='outline-success'>Search</Button>
            </Form> */}

          </Offcanvas.Body>

        </Navbar.Offcanvas>
      </Container>

    </Navbar>
    </header>

  )
}

export default Header