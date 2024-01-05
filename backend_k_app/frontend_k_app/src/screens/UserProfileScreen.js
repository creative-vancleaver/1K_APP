import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Row, Col, Form, Modal, Tab, Tabs, Container } from 'react-bootstrap';

// ACTIONS
import { getUserDetails, getUserStats, updateUserProfile, getUserWordsByLanguage, getMasteredWords, getNotMasteredWords, resetMasteredWords, resetNotMasteredWords } from '../actions/userActions';

// CONSTANTS
import { USER_UPDATE_PROFILE_RESET, USER_WORDS_LANGUAGE_RESET } from '../constants/userConstants';

// FORMS
import LanguageForm from '../components/forms/LanguageForm';

// COMPONENTS
import UserWordsPaginate from '../components/profile/UserWordsPaginate';
import Spinner from '../components/spinner/Spinner';
import Message from '../components/Message';
import ConfirmModal from '../components/ConfirmModal';

import { defaultFormat } from 'moment';

const UserProfileScreen = () => {

    const [show, setShow] = useState(false);

    const [first_name, setFirst_Name] = useState('');
    // const [last_name, setLast_Name] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [languagesLearning, setLanguagesLearning] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [languageMessage, setLanguageMessage] = useState('');
    const [updateProfile, setUpdateProfile] = useState(false);

    // const[key, setKey] = useState('languagesLearning'); // SET DEFAULT ACTIVE TAB
    const [key, setKey] = useState(languagesLearning[0]?.id);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState();

    // const [activeLanguage, setActiveLanguage] = useState(languagesLearning[0]?.id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user, success: detailsSuccess } = userDetails;
    // console.log('userDetails', user)

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const masteredWordsStore = useSelector(state => state.masteredWords);
    const { masteredWords, loading: masteredWordsLoading } = masteredWordsStore;

    const notMasteredWordsStore = useSelector(state => state.notMasteredWords);
    const { notMasteredWords, loading: notMasteredWordsLoading } = notMasteredWordsStore;

    const userStats = useSelector(state => state.userStats);
    const { error: statsError, loading: statsLoading, success: statsSuccess, stats } = userStats;
    // console.log('stats ', userStats, stats)

    const userWordsByLanguage = useSelector(state => state.userWordsByLanguage);
    const { error: userWordsError, loading: userWordsLoading, success: userWordsSuccess, userWords } = userWordsByLanguage;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    const addLanguageToUser = useSelector(state => state.addLanguageToUser);
    const { success: languageAddSuccess } = addLanguageToUser

    const isLoading = loading || statsLoading;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {

            // dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetails(userInfo.id));
            // dispatch(resetMasteredWords);
            // dispatch(resetNotMasteredWords);

        }
        
    }, [userInfo]);

    useEffect(() => {
        if (detailsSuccess) {

            setFirst_Name(user.first_name);
            setEmail(user.email);

            if (user.native_language) {
                setNativeLanguage(user.native_language.language);
            }

            if (user.languages) {
                setLanguagesLearning(user.languages);
            }

            dispatch(getUserStats());
            // console.log(languagesLearning);
        }
    }, [detailsSuccess]);

    useEffect(() => {
        // i COULD store this in state and initialize it as below...
        if (languagesLearning.length > 0) {
            // var default_language = languagesLearning[0]?.id;
            // console.log('default language ', default_language);
            // dispatch(getUserWordsByLanguage(default_language, 0, 10));
            setKey(languagesLearning[0]?.id);
            dispatch(getUserWordsByLanguage(languagesLearning[0]?.id));
            setLanguageMessage('');
        } else {
            setLanguageMessage('You have not selected a language to learn');
        }

    }, [languagesLearning, dispatch]);

    // useEffect(() => {
    //     setFirst_Name(user.first_name);
    //     setEmail(user.email);
    // }, [user])

    const handleClick = () => {
        // console.log('update profile clicked ', user.id);
        setUpdateProfile(!updateProfile);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // CALLBACK FUNCTION - PASSED AS PROP TO CHILD IN ORDER TO CLEAR LOCAL STATE FROM CHILD
    const languageFormSubmit = () => {

        setLanguageMessage('');
        dispatch(getUserDetails(userInfo.id));

    }

    const submitHandler = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            // console.log('Updating profile ', user.id);
            dispatch(updateUserProfile({
                'id': user.id,
                // 'name': name,
                'first_name': first_name,
                // 'last_name': last_name,
                'email': email,
                'password': password
            }))
            setMessage('');
            setUpdateProfile(!updateProfile);
        }
    }

    const handleTabChange = (newLanguage) => {
        dispatch(getUserStats(1, newLanguage));
    }

    const handleTabSelect = (key) => {
        
        dispatch(resetMasteredWords());
        dispatch(resetNotMasteredWords());

        setKey(key);

        // dispatch(getMasteredWords(key));
        // dispatch(getNotMasteredWords(key));
        // console.log('TAB SELECT KEY ', key);


        if (key !== 'addLanguage') {

            dispatch(getUserWordsByLanguage(key));
            dispatch(getMasteredWords(key));
            dispatch(getNotMasteredWords(key));
            
            setSelectedLanguage(key);

        }
    }

    const handlePageChange = (newPage, language) => {
        // console.log('currentPage ', currentPage, 'new page = ', newPage, 'language id ', language);
        setCurrentPage(newPage);
        setSelectedLanguage(language);
    }

    useEffect(() => {
        dispatch(resetMasteredWords());
        dispatch(resetNotMasteredWords());

        // console.log('KEY == ', key);
        if (key !== undefined) {
            // console.log('key = undefined');
            dispatch(getNotMasteredWords(key));
            dispatch(getMasteredWords(key));
        }
    }, [key]);



  return (


    <> 
    { loading ? (
    <Spinner />
        ) : (
        <div style={{ minHeight: '80vh' }}>

                <Row style={{ marginBottom: '2rem' }}>

                    { message && <Message variant='danger'>{ message }</Message> }

                    <h2 style={{ marginBottom: '1rem' }}>User Profile</h2>

                    { updateProfile ? (

                        <Form onSubmit={ submitHandler }>
                        
                            <Form.Group controlId='first_name'>
                                <Form.Label>
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    // required
                                    // disabled
                                    type='name'
                                    placeholder='Enter First Name'
                                    value={ first_name }
                                    onChange={ (e) => setFirst_Name(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    // required
                                    // disabled
                                    type='email'
                                    placeholder='Enter Email'
                                    value={ email }
                                    onChange={ (e) => setEmail(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    // required
                                    // disabled
                                    type='password'
                                    placeholder='Enter Password'
                                    value={ password }
                                    onChange={ (e) => setPassword(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control
                                    // required
                                    // disabled
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={ confirmPassword }
                                    onChange={ (e) => setConfirmPassword(e.target.value) }
                                ></Form.Control>
                            </Form.Group>

                            {/* CREATE LINK TO UPDATE PROFILE PAGE */}
                            <Button type='submit' variant='primary' className='my-3'>Update Profile</Button>
                            <Button variant='danger' className='ms-3' onClick={ handleClick }>Cancel</Button>

                        </Form>

                    ) : (

                        <>
                            <Col>
                            <h6>Name:</h6>
                            <p>{ user.name }</p>
                            </Col>

                            <Col>
                            <h6>Email:</h6>
                            <p>{ user.email }</p>
                            </Col>

                            <Col>
                            <h6>Native Language:</h6>
                            { nativeLanguage.charAt(0).toUpperCase() + nativeLanguage.slice(1) }
                            </Col>

                            <Button onClick={ handleClick }>Update User Info</Button>
                        </>

                    )}

                {/* </Col> */}
                </Row>



                <Row>

                    {/* { userWordsLoading ? (
                        // masteredWordsLoading || notMasteredWordsLoading

                        <Spinner />

                    ) : (        */}

                        <>

                            <h2>Stats</h2>
                            {/* 
                            { languageMessage && <Message variant='danger'>{ languageMessage }</Message> } */}

                            <Tabs
                                id="userStatsTabs"
                                activeKey={ key }
                                // onSelect={(k) => setKey(k) }
                                onSelect={ handleTabSelect }
                            >

                                { languagesLearning.map((language) => (

                                    <Tab key={ language.id } eventKey={ language.id } title={ language.language.charAt(0).toUpperCase() + language.language.slice(1) }>

                                        <div className='d-flex justify-content-center mt-3'>

                                        </div>

                                        {/* ADD OTHER DATA HERE */}

                                        { languagesLearning.length > 0 && (

                                            <UserWordsPaginate language={ language } userInfo={ userInfo } langaugesLearning={ languagesLearning } handlePageChange={ handlePageChange } currentPage={ currentPage } />

                                        )}

                                    </Tab>

                                ))}

                                <Tab eventKey="addLanguage" title="+ Language" className="add-lang-tab" id='addLangTab'>
                                    <Col md={12} className="d-flex justify-content-center" style={{ marginTop: '3rem' }}>
                                        {/* <h4>Add Language</h4> */}
                                        {/* <Button onClick={ handleShow }>Learn a New Language</Button> */}
                                        <LanguageForm show={ show } handleClose={ handleClose } onFormSubmit={ languageFormSubmit }></LanguageForm>
                                    </Col>
                                </Tab>

                            </Tabs>
                        </>
                    
                    {/* )} */}

                </Row>
        </div>
    )}



    </>

  )
}

export default UserProfileScreen