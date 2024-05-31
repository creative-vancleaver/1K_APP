import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserList = ({ users, deleteHandler, updateUser, addUserForm, deleteUser }) => {

  return (

    <>
        <h4>Users</h4>
        <Table striped bordered hover responsive className='table-sm'>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Active</th>
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
                                    : (<i className='fas fa-x' style={{ color: 'red' }}></i>)
                            }
                        </td>

                        <td>
                            { user.isActive ? ( 
                                    <i className='fas fa-check'  style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-x' style={{ color: 'red' }}></i>
                                )
                            }
                        </td>

                        <td className="d-flex justify-content-center">

                            {/* <LinkContainer to={`/profile/admin/user/${ user.id }/edit`}> */}
                            <Button variant='light' className='btn-sm me-3' onClick={ () => updateUser(user) }>
                                <i className="fas fa-edit"></i>
                            </Button>
                            {/* </LinkContainer> */}

                            <Button variant='danger' className='btn-sm' onClick={ () => deleteUser(user) }>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '50%' }} onClick={ addUserForm}>
                Add a User
            </Button>
        </div>

    </>

  )
}

export default UserList