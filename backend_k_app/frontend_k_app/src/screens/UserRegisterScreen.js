import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';

import { register } from '../actions/userActions';
import { listLanguages } from '../actions/languageActions';

import FormContainer from '../components/FormContainer';

const UserRegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [first_name, setFirst_Name] = useState('');
    const [native_language, setNative_Language] = useState('');
    const [language_options, setLanguage_Options] = useState([]);
    // const [last_name, setLast_Name] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const redirect = location.state ? Number(location.state): '/';

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    console.log(userInfo);

    const languageList = useSelector(state => state.languageList);
    const { languages, success: languageSuccess } = languageList;

    useEffect(() => {
        dispatch(listLanguages())
        if (userInfo) {
            navigate('/')
        }

        // if (languageSuccess) {
        //     const formattedLanguageNames = languageSelections();
        //     setLanguage_Options(formattedLanguageNames);
        // }

    }, [dispatch, userInfo])

    useEffect(() => {
    // if (languageSuccess) {
        const formattedLanguageNames = languageSelections();
        setLanguage_Options(formattedLanguageNames);
    // }
    }, [languageSuccess])
    // navigate, redirect, userInfo

    const languageSelections = () => {
        const languageNames = languages.map(l => ({
            label: l.language.charAt(0).toUpperCase() + l.language.slice(1),
            value: l.language.charAt(0).toUpperCase() + l.language.slice(1)
        }));
        console.log('langaugeNames = ', languageNames);
        return languageNames;
    }

    const handleChange = (native_language) => {
        setNative_Language(native_language)
    }

    const findFormErrors = () => {

        // const { first_name, native_language, email, password, confirmPassword } = form;
        const newErrors = {}

        if ( !first_name || first_name === '' ) newErrors.name = 'Please provide a name.'

        if ( !native_language || native_language === '' || native_language.length === 0 ) newErrors.native_language = 'Please provide a native language.'
        setIsValid(false)

        if ( !email || email === '' ) newErrors.email = 'Please provide an email.'

        if ( !password || password === '' ) newErrors.password = 'Please provide a password.'
        else if ( password.length < 8 ) newErrors.password = 'Password must be at least 8 characters.'

        if ( !confirmPassword || confirmPassword === '' ) newErrors.confirmPassword = 'Please confirm your password.'
        else if ( password !== confirmPassword ) newErrors.confirmPassword = 'Passwords do not match.'

        return newErrors

    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted ', email, first_name);
        // if (password != confirmPassword) {
        //     setMessage('Passwords do not match')
        // } else {
        //     dispatch(register(first_name, email, password, native_language))
        //     console.log('register ', first_name, email, password, native_language)
        // }

        // const form = e.currentTarget;
        // if  (form.checkValidity() === false) {
        //     console.log('INVALID');
        //     e.preventDefault();
        //     e.stopPropagation();
        // } else {

        //     console.log('VALID');
        //     setValidated(true);

        // }

        const newErrors = findFormErrors()

        if ( Object.keys(newErrors).length > 0 ) {
            console.log('INVALID ', newErrors); 
            setErrors(newErrors);
        } else {
            // alert('VALID')
            dispatch(register(first_name, email, password, native_language))
        }



    }

  return (

    <FormContainer>

        <h1>Sign Up</h1>

        {/* ADD MESSAGE + ERROR + LOADING */}
        <Form onSubmit={ submitHandler } noValidate validated={ validated }>
            
            <Form.Group controlId='first_name'>
                <Form.Label>
                    First Name
                </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter First Name'
                    value={ first_name }
                    onChange={ (e) => setFirst_Name(e.target.value) }
                    isInvalid={ !!errors.name }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.name }
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='nativeLang'>
                <Form.Label>
                    What's your native language?
                </Form.Label>
                <Select
                    // style={{ borderColor: 'red' }}
                    // aria-required
                    className={ `${ errors.native_language && 'invalid_select' }` }
                    classNamePrefix='react-select'
                    options={ language_options }
                    value={ native_language }
                    onChange={ handleChange }
                    isInvalid={ !!errors.native_language }
                ></Select>
                <Form.Control.Feedback type='invalid' style={{ display: 'block' }}>
                    { errors.native_language }
                </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group controlId='last_name'>
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
            </Form.Group> */}

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
                    isInvalid={ !!errors.email }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.email }
                </Form.Control.Feedback>
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
                    isInvalid={ !!errors.password }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.password }
                </Form.Control.Feedback>
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
                    isInvalid={ !!errors.confirmPassword }
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.confirmPassword }
                </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Register</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?
                <Link to='/login/'>
                    Sign In
                </Link>
            </Col>
        </Row>
    </FormContainer>

  )
}

export default UserRegisterScreen