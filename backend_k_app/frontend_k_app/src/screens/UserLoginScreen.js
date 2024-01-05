import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

import { login } from '../actions/userActions';

const UserLoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.state ? Number(location.state) : '/'

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {

        if (userInfo) {
            navigate(redirect)
        }
    }, [redirect, userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

  return (

    <Container className='' style={{ minHeight: '80vh' }}>
    <FormContainer>

        <h1>Sign In</h1>

        { error && <Message variant='danger'>{ error }</Message> }

        <Form onSubmit={ submitHandler }>

            <Form.Group controlId='email'>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Button  type='submit' variant='primary' className='my-3'>
                Sign In
            </Button>

        </Form>

        <Row className='py-3'>
            <Col>
                New User? 
                <Link
                    // to={ redirect ? `/register?redirect${ redirect }` : 'register'}
                    to={'/register/'}
                    className='ms-1'
                >
                    Register
                </Link>
            </Col>
        </Row>

    </FormContainer>
    </Container>

  )
}

export default UserLoginScreen