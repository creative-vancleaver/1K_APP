import React, { useEffect } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listLanguages } from '../actions/languageActions'
import { logout } from '../actions/userActions'

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const languageList = useSelector(state => state.languageList)
  const { error, loading, success, languages } = languageList
  console.log('languageList ', languages)

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // const { languages: userLanguages } = userInfo;
  // console.log(userInfo);
  // const result = []

  const logoutHandler = () => {
    console.log('LOGOUT');
    dispatch(logout())
    navigate('/')
  }

  useEffect(() => {
    dispatch(listLanguages())

    // langArray();

  }, [])

  return (

    <header>
    
    <Navbar expand='lg' className='mb-3 ps-5 pe-5'>
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
              {/* <Nav.Link href='#' className='d-flex'>
                <i className='fa-sharp fa-solid fa-house me-1'></i>
                Home
              </Nav.Link> */}
              {/* <Nav.Link href='#'>Link 1</Nav.Link> */}

              { userInfo ? (
                <NavDropdown
                  // title={ userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1) } id='first_name'
                  title={ userInfo.first_name.charAt(0).toUpperCase() + userInfo.first_name.slice(1)}
                  id='first_name'
                >
                  {/* <LinkContainer to='/profile'> */}
                  {/* <Nav.Link as={ Link } to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link> */}
                  {/* </LinkContainer> */}
                  <NavDropdown.Item key='profile' href='/profile'>Profile</NavDropdown.Item>

                  { userInfo.isAdmin && (
                    <NavDropdown.Item key='admin' href='/profile/admin'>Admin</NavDropdown.Item>
                  )}

                  <NavDropdown.Item key='logout' onClick={ logoutHandler }>Logout</NavDropdown.Item>
                </NavDropdown>

              ) : (
                <>
                {/* <LinkContainer to='/login'> */}
                  <Nav.Link as={ Link } to='/login/'>
                    <i className='fa fa-user me-1'></i>Login
                  </Nav.Link>
                {/* </LinkContainer> */}

                  <Nav.Link as={ Link } to='/register/'>
                    <i className='fa fa-user-plus me-1'></i>Sign Up
                  </Nav.Link>
                </>
              )}


              <NavDropdown
                title='Languages'
                id='offcanvasNavbarDropdown-expand-expand'
              >

                { languages.map(l => (

                  <NavDropdown.Item key={ l.id } href={ `/languages/${ l.language }` }>
                    { l.language.charAt(0).toUpperCase() + l.language.slice(1) }
                  </NavDropdown.Item>

                ))}
                
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