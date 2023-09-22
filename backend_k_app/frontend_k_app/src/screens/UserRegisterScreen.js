import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../actions/userActions';

import FormContainer from '../components/FormContainer';

const UserRegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // const [searchParams, setSearchParams] = useSearchParams();
    const redirect = location.state ? Number(location.state): '/';

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted ', email, first_name, last_name);
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(first_name, last_name, email, password))
        }
    }

  return (

    <FormContainer>

        <h1>Sign In</h1>

        {/* ADD MESSAGE + ERROR + LOADING */}
        <Form onSubmit={ submitHandler }>
            
            <Form.Group controlId='first_name'>
                <Form.Label>
                    First Name
                </Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter First Name'
                    value={ first_name }
                    onChange={ (e) => setFirst_Name(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='last_name'>
                <Form.Label>
                    Last Name
                </Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Last Name'
                    value={ last_name }
                    onChange={ (e) => setLast_Name(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control
                    required
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
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={ confirmPassword }
                    onChange={ (e) => setConfirmPassword(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Register</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?
                <Link to='#'>
                    Sign In
                </Link>
            </Col>
        </Row>
    </FormContainer>

  )
}

export default UserRegisterScreen