import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Row, Col, Form, Modal } from 'react-bootstrap';

// ACTIONS
import { getUserDetails, getUserStats, updateUserProfile } from '../actions/userActions';

// CONSTANTS
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

// FORMS
import LanguageForm from '../components/forms/LanguageForm';


const UserProfileScreen = () => {

    const [show, setShow] = useState(false);

    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [languagesLearning, setLanguagesLearning] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [updateProfile, setUpdateProfile] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    console.log(user)

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userStats = useSelector(state => state.userStats);
    const { error: statsError, loading: statsLoading, stats } = userStats;
    console.log('stats ', userStats, stats)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    const addLanguageToUser = useSelector(state => state.addLanguageToUser);
    const { success: languageAddSuccess } = addLanguageToUser
    // stats.map((userWordObj) => {
    //     const { word, translation } = userWordObj.user_word;
    //     const { language } = userWordObj.user_word.language
    //     console.log('word ', word);
    //     console.log('translation ', translation);
    //     console.log('languag ', language);
    //     return null;
    // })

    const languageWordsMap = stats.reduce((acc, { user_word }) => {
        const { language, ...wordData } = user_word;
        const { id, ...languageData } = language

        if (!acc[id]) {
            acc[id] = {
                language: languageData,
                words: [wordData]
            };
        } else {
            acc[id].words.push(wordData);
        }
        return acc;
    }, {});

    // const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    // const { success } = userUpdateProfile;

    useEffect(() => {
        // dispatch(getUserStats());
        
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(getUserStats());

            if (!user || !user.name || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo.id))
                // dispatch(getUserStats());

            } else {

                // console.log(user)
                setName(user.name);
                setFirst_Name(user.first_name);
                setLast_Name(user.last_name);
                setEmail(user.email);
                setNativeLanguage(user.native_language.language);
                setLanguagesLearning(user.languages);

                // dispatch(getUserStats());
            }
        }

        // if (languageAddSuccess) {
        //     dispatch(getUserDetails(user.id))
        // }
        
    }, [navigate, dispatch, userInfo, user, success])

    const handleClick = () => {
        console.log('update profile clicked');
        setUpdateProfile(!updateProfile);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitHandler = (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            console.log('Updating profile');
            dispatch(updateUserProfile({
                'id': user.id,
                // 'name': name,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': password
            }))
            setMessage('');
            setUpdateProfile(!updateProfile);
        }
    }

  return (

    <>

    <Row>

        <Col md={3} style={{ borderRight: '1px solid black' }}>
            <h2>User Profile</h2>

            { updateProfile ? (
            <Form onSubmit={ submitHandler }>

                {/* <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        // required
                        // disabled
                        type='name'
                        placeholder='Enter Name'
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    ></Form.Control>
                </Form.Group> */}
            
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

                <Form.Group controlId='last_name'>
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control
                        // required
                        // disabled
                        type='name'
                        placeholder='Enter Last Name'
                        value={ last_name }
                        onChange={ (e) => setLast_Name(e.target.value) }
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
{/* 
                <Form.Group controlId='native_language'>
                    <Form.Label>
                        Native Language
                    </Form.Label>
                    <Form.Control
                        // required
                        disabled
                        type='native_language'
                        placeholder='Native Language'
                        value={ nativeLanguage.charAt(0).toUpperCase() + nativeLanguage.slice(1) }
                        onChange={ (e) => setNativeLanguage(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='languages_learning'>
                    <Form.Label>
                        Languages Learning
                    </Form.Label>
                    <Form.Control
                        // required
                        disabled
                        type='languages_learning'
                        placeholder='Languages Learning'
                        value={ 
                            languagesLearning.map(lang => (
                                lang.language.charAt(0).toUpperCase() + lang.language.slice(1)
                            )).join(', ')
                         }
                        onChange={ (e) => setNativeLanguage(e.target.value) }
                    ></Form.Control>
                </Form.Group> */}

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
                {/* <h1>{user.name}</h1> */}
                <h6>Name:</h6>
                <p>{ user.name }</p>

                <h6>Email:</h6>
                <p>{ user.email }</p>

                <h6>Native Language:</h6>
                <p>{ nativeLanguage.charAt(0).toUpperCase() + nativeLanguage.slice(1) }</p>

                {/* <h6>Languages Learning:</h6>
                <p>{ languagesLearning.map(lang => (
                                lang.language.charAt(0).toUpperCase() + lang.language.slice(1)
                            )).join(', ') }</p> */}
                <Button onClick={ handleClick }>Update User Info</Button>
                </>
            )}

        </Col>

        <Col md={9}>
            <h2>User Stats</h2>

            <Row>
            
                <Col md={4}>
                    <h4>Languages Learning</h4>
                    { languagesLearning.map(language => {
                        return (
                            <p key={ language.id } className={ language.id }>
                                { language.language.charAt(0).toUpperCase() + language.language.slice(1) }

                            </p>
                        )
                    })}
                    {/* <Button href='/languagefrom/'>Learn A Language</Button> */}
                    <Button onClick={ handleShow }>Learn A Language</Button>
                    <LanguageForm show={ show } handleClose={ handleClose } />

                </Col>

                <Col md={4}>
                    <h4>Words Mastered</h4>
                    <div>
                        { Object.values(languageWordsMap).map(({ language, words }) => (
                            <div key={ language.id }>
                                <h5>{ language.language.charAt(0).toUpperCase() + language.language.slice(1) }</h5>
                                <ul style={{ listStyle: 'none', paddingLeft: '15px'}}>
                                    { words.map((word) => (
                                        <li key={ word.id }>
                                            { word.word }
                                            {/* <p>Word: { word.word }</p>
                                            <p>Translation: { word.translation }</p> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {/* NOTE: IF USING CURLY BRACES WITH ARROW FUNCTION NEED EXPLICIT RETURN VALUE */}

                    {/* { stats.map((userWordObj) => {

                        const { word } = userWordObj.user_word;
                        console.log(userWordObj.user_word)
                        const { language } = userWordObj.user_word.language;
                        console.log(language)

                        return (
                            <div>
                            <h5>{ language }</h5> */}
    
                            {/* <p>{ language } Word: { word } Score: { score }</p> */}
                            {/* </div>
                        )


                    })} */}

                    {/* { stats.map((userWordObj) =>{
                        const { word, score } = userWordObj.user_word
                        return (

                            <p>Word: { word } Score: { score }</p>

                        )
                    })} */}
                    {/* { stats.map((userWordObj) => {
                        const { word, tanslation } = userWordObj.user_word
                    })} */}
                    {/* { stats.user_word } */}
                    {/* { stats.user_word.map(i => (
                        i.user_word.word
                    ))} */}
                    {/* { userStats } */}
                </Col>

                <Col md={4}>
                    <h4>Languages Mastered</h4>
                    <p>None</p>
                </Col>

            </Row>
            {/* CREATE COMPONENT FOR USER STATS - IE LAGNAUGES LEARNING, WORDS MASTERED, WORDS TOP PRACTICE, ETC.... */}
        </Col>
    </Row>
{/* 
    <Row>
        { user.isAdmin && (
            <h1>{ user.name } is admin</h1>
        )}
    </Row> */}

    </>

  )
}

export default UserProfileScreen