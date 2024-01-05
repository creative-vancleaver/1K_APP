import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';

import { submitBugReport } from '../../actions/userActions';

const DebugForm = ({ show, handleClose }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [first_name, setFirst_Name] = useState('');
    const [email, setEmail] = useState('');
    const [issueSelection, setIssueSelection] = useState('');
    const [description, setDescription] = useState('');
    const [issueLocation, setIssueLocation] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const issueTypes = [
        'Error',
        'Bug',
        'Spelling',
        'Feature Suggestion',
    ];

    useEffect(() => {
        if (userInfo) {
            setFirst_Name(userInfo.first_name);
            setEmail(userInfo.email);
            setIssueLocation(location.pathname);
        } else {
            navigate('/login/')
        }
    });

    const clearForm = () => {
        setFirst_Name('');
        setEmail('');
        setIssueSelection('');
        setDescription('');
    }

    const submitHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('email', email);
        formData.append('issue', issueSelection);
        formData.append('description', description);
        formData.append('location', issueLocation);

        dispatch(submitBugReport(formData));

        // console.log('submitting bug report = ', formData);

        clearForm();
        handleClose();
        
    }

  return (

    <Modal show={ show } onHide={ handleClose }>
        
        <Modal.Header closeButton>
            <Modal.Title>Submit an Issue</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <Form onSubmit={ submitHandler }>

                <Form.Group controlId='user' className='mb-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='First Name'
                        value = { first_name }
                        disabled
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='userEmail' className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        value={ email }
                        disabled
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='issueType' className='mb-3'>
                    <Form.Label>Issue Type</Form.Label>
                    <Form.Select
                        value={ issueSelection }
                        onChange={ (e) => setIssueSelection(e.target.value) }
                        required
                    >
                        <option value=''>Select an Issue Type</option>
                        { issueTypes.map((issue, index) => (
                            <option key={ index } value={ issue }>
                                { issue }
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId='detailedDescription' className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={ 3 }
                        placeholder='Please provide a description of the issue you are facing.'
                        value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                        required
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className='my-3'>
                    Submit
                </Button>
                <Button type='button' variant='danger' className='my-3 ms-3' onClick={ handleClose }>
                    Cancel
                </Button>
                
            </Form>

        </Modal.Body>

    </Modal>

  )
}

export default DebugForm