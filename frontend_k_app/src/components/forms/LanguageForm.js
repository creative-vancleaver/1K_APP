import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form, Modal } from 'react-bootstrap';
import FormContainer from '../FormContainer';

import { listLanguages } from '../../actions/languageActions';
import { addUserLanguage, getUserDetails } from '../../actions/userActions';

const LanguageForm = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const [languageSelection, setLanguageSelection] = useState('');

    const languageList = useSelector(state => state.languageList);
    const { languages } = languageList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    console.log('userInfo languageForm ', userInfo)

    const userDetails = useSelector(state => state.userDetails);
    const { user } = userDetails;

    const addLanguageToUser = useSelector(state => state.addLanguageToUser);
    const { success: languageAddSuccess } = addLanguageToUser

    const checkLanguage = (lang) => {
        return user.languages.some(function (l) {
            return l.language === lang
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(languageSelection);

        const existingLang = checkLanguage(languageSelection)
        console.log('existing language ', user.languages, 'current selection ', languageSelection, existingLang);

        if (existingLang == false) {
            console.log('false');
            dispatch(addUserLanguage({
                'id': user.id,
                'language': languageSelection
            }));
            // dispatch(getUserDetails(user.id));
            handleClose();
            console.log('user from form ', user);
            dispatch(getUserDetails(user.id))
        } else {
            console.log('You are already learning this language');
        }
    }

    useEffect(() => {
        dispatch(listLanguages());

        if (languageAddSuccess) {
            dispatch(getUserDetails(user.id))
            dispatch(listLanguages())
        }

    }, [dispatch, languageAddSuccess]);

    return (
    // <div>
    //     { language.language.charAt(0).toUpperCase(0) + language.language.slice(1) }
        
    // </div>
    <>
    
        <Modal show={ show } onHide={ handleClose }>

            <Modal.Header closeButton>
                <Modal.Title>Start Learning a New Langauge</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormContainer>
                    <h1>Select A Language To Learn</h1>

                    <Form onSubmit={ submitHandler }>

                        <Form.Select
                            onChange={ (e) => setLanguageSelection(e.target.value) }
                        >
                            <option>Select a Language</option>

                            { languages.map((language) => (
                                <option key={ language.id} value={ language.language }>{ language.language.charAt(0).toUpperCase() + language.language.slice(1) }</option>
                            ))}
                        </Form.Select>

                        <Button type='submit' variant='primary' className='my-3'>
                            Let's Learn!
                        </Button>
                        <Button variant='danger' className='ms-3' onClick={ handleClose }>
                            Cancel
                        </Button>

                    </Form>

                </FormContainer>
            </Modal.Body>

        </Modal>
    
    </>

    // <FormContainer>

    //     <h1>Select a Language to Learn</h1>

    //     <Form onSubmit={ submitHandler }>
    //         <Form.Select>
    //             <option>Select a Language</option>

    //             { languages.map((language) => (


    //                 <option value={ language }>{ language }</option>


    //             // <Form.Group controlId='language'>
    //             //     <Form.Label>
    //             //         Language
    //             //     </Form.Label>
    //             // </Form.Group>

    //             ))}
    //         </Form.Select>
 
    //     </Form>


    // </FormContainer>

    )
}

export default LanguageForm