import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addUser } from '../../actions/userActions';

const AddUser = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const [first_name, setFirst_Name] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const clearForm = () => {
        setFirst_Name('');
        setEmail('');
        setIsAdmin(false);
        setIsActive(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('email', email);
        formData.append('isAdmin', isAdmin);
        // formData.append()

        dispatch(addUser(formData));

        clearForm();
        handleClose();
    }


  return (

    <>

        <Modal show={ show } onHide={ handleClose }>

            <Modal.Header closeButton>
                <Modal.Title>
                    Add User
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form onSubmit={ submitHandler }>

                    <Form.Group controlId='first_name' className='mb-3'>
                        <Form.Label>
                            First Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter First Name'
                            value={ first_name }
                            onChange={ (e) => setFirst_Name(e.target.value) }
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin' className='mb-3'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={ isAdmin }
                            onChange={ (e) => setIsAdmin(e.target.value) }
                        ></Form.Check>
                    </Form.Group>

                    <Form.Group controlId='isActive' className='mb-3'>
                        <Form.Check
                            type='checkbox'
                            label='Is Active'
                            checked={ isActive }
                            onChange={ (e) => setIsActive(e.target.value) }
                        ></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Add User
                    </Button>
                    <Button variant='danger' className='my-3 ms-3' onClick={ () => {
                        clearForm();
                        handleClose();
                    }}>
                        Cancel
                    </Button>

                </Form>

            </Modal.Body>
        </Modal>
    
    </>

  )
}

export default AddUser