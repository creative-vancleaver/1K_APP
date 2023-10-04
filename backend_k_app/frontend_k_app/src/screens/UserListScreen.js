import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';


import { listUsers } from '../actions/userActions';

const UserListScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList);
    console.log('userList = ', userList)
    const { loading, error, users } = userList;
    console.log(users);

    useEffect(() => {

        dispatch(listUsers());

    }, [dispatch, loading]);

  return (

    <div>

        <h1>Users</h1>

        <Table striped bordered hover responsive className='table-sm'>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                </tr>
            </thead>

            <tbody>
                { users.map(user => (
                    <tr key={ user.id }>
                        <td>{ user.id }</td>
                        <td>{ user.name }</td>
                        <td>{ user.email }</td>
                        <td>
                            { user.isAdmin ? 
                                (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                    : (<i className='fas fa-check' style={{ color: 'red'}}></i>)
                            }
                        </td>

                        <td className='d-flex justify-content-center'>
                            <LinkContainer to={'#'}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>

                            <Button variant='danger' className='btn-sm'>
                                <i className='fas fa-trash'></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>

    </div>

  )
}

export default UserListScreen