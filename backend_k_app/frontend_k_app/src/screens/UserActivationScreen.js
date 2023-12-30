import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { getUserFromToken, activateUser, login, logout } from '../actions/userActions';

import Spinner from '../components/spinner/Spinner';
import Message from '../components/Message';

const UserActivationScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    // const decodedToken = decodeURIComponent(token);

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [isActivated, setIsActivated] = useState(false);
    const [message, setMessage] = useState('');

    const userActivation = useSelector(state => state.activateUser);
    const { loading: laodingActivation, error: errorActivation, success: successActivation } = userActivation;

    const userFromToken = useSelector(state => state.userFromToken);
    const { loading: loadingUserFromToken, error: errorUserFromToken, success: successUserFromToken } = userFromToken;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {

        if (userInfo) {
            dispatch(logout());
        }
                
        if (token) {
            console.log('activation token ', token);
            // console.log('decodedToke = ', decodedToken);
            // dispatch(activateUser(token));
            dispatch(getUserFromToken(token));
            setIsActivated(true);
        }

    }, [dispatch, token]);

    useEffect(() => {

        if (successUserFromToken) {
            setEmail(userFromToken.userData.email);
            setFirst_Name(userFromToken.userData.first_name);
        } 

    }, [successUserFromToken]);

    // useEffect(() => {

    //     if (successActivation) {
    //         console.log('USER EMAIL = ', userActivation.userInfo.email);

    //         setIsActivated(true);
    //         setFirst_Name(userActivation.userInfo.first_name);
    //         setEmail(userActivation.userInfo.email);
    //     }
    // }, [successActivation]);

    const clearForm = () => {
        setFirst_Name('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password != passwordConfirmation) {
            setMessage('Passwords do not match');
        } else {
            // dispatch(login())
            console.log('LOGIN');

            dispatch(activateUser(token, password));
            setMessage('Please wait while your account is activated');
        }
        // dispatch(login(email, password));
    }

    useEffect(() => {

        if (successActivation) {
            console.log('ACTIVATE!!');
            dispatch(login(email, password));
            navigate('/');
        }

    }, [successActivation]);

    const handleClose = () => {
        clearForm();
        // navigate('/');
    }

  return (

    <div>

        { errorUserFromToken && <Message variant='danger'>{ errorUserFromToken }</Message> }

        { message && <Message variant='warning'>{ message }</Message> }

        { loadingUserFromToken ? (

                <Spinner />

            ) : laodingActivation ? (

                <Spinner />

            ) : ( 

                <Form onSubmit={ handleSubmit }>

                    <Form.Group controlId='first_name'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='First Name'
                            value={ first_name }
                            disabled
                        ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={ email }
                            disabled
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Set your password'
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={ passwordConfirmation }
                            onChange={ (e) => setPasswordConfirmation(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Submit</Button>
                    <Button variant='danger' className='my-3 ms-3' onClick={ () => {
                        clearForm();
                        handleClose();
                    } }>Cancel</Button>

                </Form>

            ) 
        }

    </div>

  )
}

export default UserActivationScreen