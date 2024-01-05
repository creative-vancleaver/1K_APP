import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { listUsers, deleteUserSuccess, updateUserList } from '../actions/userActions';
import { listLanguages, listCountries, deleteLanguage, updateLanguageDisplay, deleteLanguageSuccess } from '../actions/languageActions';

// COMPONENTS
import Spinner from '../components/spinner/Spinner';
import Message from '../components/Message';
import ConfirmModal from '../components/ConfirmModal';
import UserUpdateModal from '../components/admin/UserUpdateModal';
import AddLanguage from '../components/admin/AddLanguage';
import UserList from '../components/admin/UserList';
import AdminLanguageList from '../components/admin/AdminLanguageList';
import UpdateLanguage from '../components/admin/UpdateLanguage';
import AddUser from '../components/admin/AddUser';

const AdminScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showAdduser, setShowAddUser] = useState(false);

    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showLanguageForm, setShowLanguageForm] = useState(false)

    const [showUpdateLanguage, setShowUpdateLanguage] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmData, setConfirmData] = useState(null); 

    const [message, setMessage] = useState('');

    const [languageDisplay, setLanguageDisplay] = useState([]);

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const userDelete = useSelector(state => state.userDelete);
    // const { success: successDelete } = userDelete;

    const languageList = useSelector(state => state.languageList);
    const { languages, loading: languageListLoading } = languageList;

    const countryList = useSelector(state => state.countryList);
    const { countries } = countryList;

    const addLanguage = useSelector(state => state.addLanguage);
    const { success: addLanguageSuccess } = addLanguage;

    const userDetails = useSelector(state => state.userDetails);
    const { user } = userDetails;

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
            dispatch(listLanguages())
            dispatch(listCountries())
        } else {
            navigate('/login/')
        }

        if (addLanguageSuccess) {
            dispatch(listLanguages())
        }

    }, [dispatch, userInfo, addLanguageSuccess]);

    const handleShowAddUser = () => setShowAddUser(true);
    const handleCloseAddUser = () => setShowAddUser(false);

    const handleShowUpdateUser = (user) => {
        setSelectedUser(user);
        setShowUpdateUser(true);
    }
    const handleCloseUpdateUser = () => setShowUpdateUser(false);

    const handleShowAddLanguageForm = () => {
        setShowLanguageForm(true);
    }
    const handleLanguageFormClose = () => setShowLanguageForm(false);
    // const handleShow = () => setShow(true);

    const handleShowUpdateLanguage = (language) => {
        setSelectedLanguage(language);
        setShowUpdateLanguage(true);
    }
    const handleCloseUpdateLanguage = () => setShowUpdateLanguage(false);

    const deleteHandler = (id) => {
        // console.log('delete user id ', id);
        if (window.confirm('Are you sure you want to delete this user?')) {
            // dispatch(deleteUser(id))
        }
    }

    const deleteLanguageAJAX = async (language_id) => {
        
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ userInfo.token }`
                }
            }

            await axios.delete(
                `/api/languages/${ language_id }/delete/`,
                config                
            );
            dispatch(deleteLanguageSuccess);
        } catch (error) {
            throw error;
        }

        // dispatch(deleteLanguage(language.id));
    }

    const confirmDeleteLanguage = async (language) => {

        const languageToDelete = languages.find(l => l.id === language.id);

        const updatedLanguageDisplay = languages.filter(l => l.id !== language.id);
        dispatch(updateLanguageDisplay(updatedLanguageDisplay));

        try {
            // console.log('confirm delete language ID === ', language.id);
            await deleteLanguageAJAX(language.id);
        } catch (error) {
            dispatch(updateLanguageDisplay([...languages, language]))
        }

        setShowConfirmModal(false);

        // deleteLanguageAJAX(language).catch(error => {
        //     const updatedLanguageDisplay = [...languages, languageToDelete];
        // })

        // const languageToDelete = languages.find(l => l.id === language.id) };

        // const updatedLanguageListDisplay = languages.filter(l => l.id !== language.id);
        // dispatch(updateLanguageListDisplay(updatedLanguageListDisplay));
        
        // deleteLanguageAJAX(language).catch(error => {
        //     const updatedLanguageListDisplay = languages
        // });

        // // dispatch(deleteLanguage(language.id));
        // console.log('CONFIRM');
        // setShowConfirmModal(false);
    }

    const deleteUserAJAX = async (user_id) => {

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ userInfo.token }`
                }
            }

            await axios.delete(
                `/api/users/${ user_id }/delete/`,
                config
            );
            dispatch(deleteUserSuccess);

        } catch (error) {
            throw error;
        }
        
    }

    const deleteLanguageHandler = (language) => {
        // if (window.confirm(`Are you sure you want to delete this language: ${ language.language }?`)) {
        //     dispatch(deleteLanguage(language.id));
        // }
        setConfirmAction(() => () => confirmDeleteLanguage(language));
        setConfirmData(`Are you sure you want to delete the language: ${ language.language }`);
        setShowConfirmModal(true);
    }

    const confirmDeleteUser = async (user) => {

        const updatedUserList = users.filter(u => u.id !== user.id);
        dispatch(updateUserList(updatedUserList));

        try {
            // dispatch(deleteUser(user.id));
            await deleteUserAJAX(user.id);
        } catch (error) {
            // setMessage(error);
            dispatch(updateUserList([...users, user]));
        }

        setShowConfirmModal(false);
    }

    const deleteUserHandler = (user) => {
        setConfirmAction(() => () => confirmDeleteUser(user));
        setConfirmData(`Are you sure you want to delete the user: ${ user.first_name }, ${ user.email } and all associated data?`);
        setShowConfirmModal(true);
    }

  return (

    <>

        <AddUser show={ showAdduser } handleClose={ handleCloseAddUser } />

        { selectedUser && (
            <UserUpdateModal show={ showUpdateUser } handleClose={ handleCloseUpdateUser } selectedUser={ selectedUser } />
        )}

        <AddLanguage show={ showLanguageForm } handleClose={ handleLanguageFormClose } />

        { selectedLanguage && (
            <UpdateLanguage show={ showUpdateLanguage } handleClose={ handleCloseUpdateLanguage } selectedLanguage={ selectedLanguage } />
        )}

        <ConfirmModal show={ showConfirmModal } handleClose={() => setShowConfirmModal(false) } handleConfirm={ confirmAction } message={ confirmData } />


        <div>

            <Row>

                { languageListLoading ? (
                    <Spinner />
                ) : (
                    <AdminLanguageList languages={ languages } addLanguageForm={ handleShowAddLanguageForm } updateLanguage={ handleShowUpdateLanguage } deleteLanguage={ deleteLanguageHandler } />
                )}



            </Row>

            <Row className='mt-4'>
            
                { loading 
                    ? (
                    <Spinner />
                    ) : error ? 
                        (
                            <Message variant='danger'>{ error }</Message>
                        ) : (
                            <UserList users={ users } deleteHandler={ deleteHandler } updateUser={ handleShowUpdateUser } addUserForm={ handleShowAddUser } deleteUser={ deleteUserHandler } />
                        )
                }

            </Row>

        </div>
    </>

  )
}

export default AdminScreen