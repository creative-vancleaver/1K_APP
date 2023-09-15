import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../FormContainer';

import { listLanguages, addLanguage } from '../../actions/languageActions';

const AddLanguage = () => {

    const dispatch = useDispatch();

    const [language_name, setLanguage_Name] = useState('');
    const [language_url, setLanguage_Url] = useState('');
    
    const languageList = useSelector(state => state.languageList);
    const { languages } = languageList;

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('adding language ', language_name, language_url);
        dispatch(addLanguage({
            language: language_name,
            url: language_url
        }))
    }

    useEffect(() => {

    })

  return (

    <FormContainer>
        <h1>Add a New Language</h1>

        <Form onSubmit={ submitHandler }>

            <Form.Group controlId='languageName'>
                <Form.Label>
                    Language
                </Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter Language Name'
                    value={ language_name }
                    onChange={ (e) => setLanguage_Name(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='languageURL'>
                <Form.Label>
                    URL
                </Form.Label>
                <Form.Control
                    type='url'
                    placeholder='Enter URL'
                    value={ language_url }
                    onChange={ (e) => setLanguage_Url(e.target.value) }
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='languageIMG'>
                <Form.Label>
                    Image
                </Form.Label>
                <Form.Control
                    type='file'
                    // placeholder='Upload an Image'
                    // value={ language_image }
                    // onChange={}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Add Language</Button>
        </Form>
    </FormContainer>

  )
}

export default AddLanguage