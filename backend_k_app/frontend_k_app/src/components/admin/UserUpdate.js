import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useSearchParams, useParams, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

import Spinner from '../spinner/Spinner';
import Message from '../Message';
import FormContainer from '../FormContainer';

const UserUpdate = () => {

    const userId = useParams();

    const [first_name, setFirst_Name] = useState('')
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirect = location.state ? Number(location.state) : '/'

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/profile/admin')
        } else {

            if (!user.name || user.id !== Number(userId.id)) {
                dispatch(getUserDetails(userId.id))
            } else {
                setFirst_Name(user.first_name)
                setLast_Name(user.last_name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [userId.id, user, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: user.id,
            first_name,
            last_name,
            email,
            isAdmin
        }))
    }    

  return (

    <div>

    <Link to={`/profile/admin/`}>
        Go Back
    </Link>

    <FormContainer>

    <h1>Edit User</h1>

    { loadingUpdate && <Spinner /> }
    { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message>}

    { loading ? <Spinner /> : error ? <Message variant='danger'>{ error }</Message> : (

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>

                <Form.Label>
                    Name
                </Form.Label>

                <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={ first_name }
                    onChange={ (e) => setFirst_Name(e.target.value)}
                ></Form.Control>

            </Form.Group>

            <Form.Group controlId='email'>

                <Form.Label>
                    Email
                </Form.Label>

                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>

                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={ isAdmin }
                    onChange={ (e) => setIsAdmin(e.target.checked) }
                ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Update</Button>

        </Form>

    )}

        
    </FormContainer>
</div>

  )
}

export default UserUpdate