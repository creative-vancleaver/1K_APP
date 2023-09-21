import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { listUsers, deleteUser } from '../actions/userActions';
import { listLanguages, listCountries } from '../actions/languageActions';

// COMPONENTS
import Spinner from '../components/spinner/Spinner';
import Message from '../components/Message';
import UserUpdateModal from '../components/admin/UserUpdateModal';
import AddLanguage from '../components/admin/AddLanguage';

const AdminScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    const languageList = useSelector(state => state.languageList);
    const { languages } = languageList;

    const countryList = useSelector(state => state.countryList);
    const { countries } = countryList;

    const addLanguage = useSelector(state => state.addLanguage);
    const { success: addLanguageSuccess } = addLanguage;

    const userDetails = useSelector(state => state.userDelete);
    const { user } = userDetails;

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            dispatch(listLanguages())
            dispatch(listCountries())
        } else {
            navigate('/login')
        }

        if (addLanguageSuccess) {
            dispatch(listLanguages())
        }

    }, [dispatch, navigate, successDelete, userInfo, addLanguageSuccess])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteHandler = (id) => {
        console.log('delete user id ', id);
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

  return (

    <>

    <UserUpdateModal show={ show } onHide={ handleClose } />

    <div>

        <Row>
        
        <h1>Users</h1>

        { loading 
            ? (<Spinner />)
            : error
                ? (<Message variant='danger'>{ error }</Message>)
                : (

                    <Table striped bordered hover responsive className='table-sm'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={ user.id }>
                                    <td>{ user.id }</td>
                                    <td>{ user.name }</td>
                                    <td>{ user.email }</td>
                                    <td>
                                        { user.isAdmin ?
                                            (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                                : (<i className='fas fa-check' style={{ color: 'red' }}></i>)
                                        }
                                    </td>

                                    <td className="d-flex justify-content-center">

                                        <LinkContainer to={`/admin/user/${ user.id }/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={ () => deleteHandler(user.id) }>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                )
        }
        </Row>

        <Row>

            <Col lg={8}>
                <AddLanguage />
            </Col>

            <Col lg={4}>
                <Table striped bordered hover responsive className='table-sm'>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Language</th>
                        </tr>
                    </thead>

                    <tbody>
                        { languages.map(language => (
                            <tr key={ language.id }>
                                <td>{ language.id }</td>
                                <td>{ language.language }</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Col>

        </Row>

    </div>
    </>

  )
}

export default AdminScreen