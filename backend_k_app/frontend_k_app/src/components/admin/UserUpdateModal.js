import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

import Spinner from '../spinner/Spinner';
import Message from '../Message';
import FormContainer from '../FormContainer';


const UserUpdateModal = ({ show, handleClose, selectedUser }) => {

    // const userId = useParams();

    const [email, setEmail] = useState('');
    const [first_name, setFirst_Name] = useState('');
    // const [last_name, setLast_Name] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const redirect = location.state ? Number(location.state) : '/';

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    console.log('user from user modal ', userDetails);

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    useEffect(() => {
        
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/profile/admin/')
        } 
        // else {
            
        //     // if (!user.name || user.id !== Number(userId.id)) {
        //     if (!user.name) {
        //         // dispatch(getUserDetails(userId.id))
        //         console.log('no user ID form parmas');
        //     } else {
        //         setFirst_Name(user.first_name)
        //         // setLast_Name(user.last_name)
        //         setIsAdmin(user.isAdmin)
        //     }
        // }
    }, [user, successUpdate, navigate])
    // userId.id,

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: user.id,
            first_name,
            email,
            isAdmin
        }))
    }

  return (

    <>
    
        <Modal show={ show } onHide={ handleClose }>
            
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* <FormContainer> */}
                    { loadingUpdate && <Spinner /> }
                    { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message> }

                    { loading ? <Spinner /> : error ? <Message variant='danger'>{ error }</Message> : (

                        <Form onSubmit={ submitHandler }>

                            <Form.Group controlId='first_name'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter First Name'
                                    value={ selectedUser.first_name }
                                    onChange={ (e) => setFirst_Name(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='last_name'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Last Name'
                                    value={ last_name }
                                    onChange={ (e) => setLast_Name(e.target.value) }
                                ></Form.Control>
                            </Form.Group> */}

                            <Form.Group controlId='email' className='mt-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={ selectedUser.email }
                                    onChange={ (e) => setEmail(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isAdmin' className='mt-3 mb-3'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={ selectedUser.isAdmin }
                                    onChange={ (e) => setIsAdmin(e.target.value) }
                                ></Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='secondary' className='py-1'>
                                Update
                            </Button>
                            <Button type='button' variant='danger' className='py-1 ms-3' onClick={ handleClose }>
                                Cancel
                            </Button>
                        </Form>

                    )}
                {/* </FormContainer> */}

            </Modal.Body>
        </Modal>

    </>

  )
}

export default UserUpdateModal