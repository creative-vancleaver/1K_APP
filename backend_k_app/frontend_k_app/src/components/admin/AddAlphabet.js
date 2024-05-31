import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addAlphabet } from '../../actions/alphabetActions';

const AddAlphabet = ({ show, handleClose, language }) => {

    const dispatch = useDispatch();

    const [alphabet_name, setAlphabet_Name] = useState('');
    const [alphabet_type, setAlphabet_Type] = useState('');
    const [alphabet_subtype, setAlphabet_Subtype] = useState('');
    const [alphabet_dialect, setAlphabet_Dialect] = useState('');
    const [csvFile, setCSVFile] = useState()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const clearForm = () => {
        setAlphabet_Name('');
        setAlphabet_Type('');
        setCSVFile();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SUBMIT');

        const formData = new FormData();
        formData.append('alphabet_name', alphabet_name);
        formData.append('alphabet_type', alphabet_type);
        formData.append('csv_file', csvFile);

        dispatch(addAlphabet(language.language, formData));

        clearForm();
        handleClose();
        
    };

  return (

    <>
    
        <Modal show={ show } onHide={ handleClose }>

            <Modal.Header closeButton>
                <Modal.Title>
                    Add Alphabet
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form onSubmit={ handleSubmit }>

                    <Form.Group controlId='languageName' className='mb-3'>
                        <Form.Label>
                            Language
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={ language.language.charAt(0).toUpperCase() + language.language.slice(1) }
                            disabled
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='alphabetName' className='mb-3'>
                        <Form.Label>
                            Alphabet Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Alphabet Name'
                            value={ alphabet_name }
                            onChange={ (e) => setAlphabet_Name(e.target.value) }
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='alphabetType' className='mb-3'>
                        <Form.Label>
                            Alphabet Type
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Alphabet Type'
                            value={ alphabet_type }
                            onChange={ (e) => setAlphabet_Type(e.target.value) }
                            // required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='alphabetFile' className='mb-3'>
                        <Form.Label>
                            File
                        </Form.Label>
                        <Form.Control
                            type='file'
                            placeholder='Select a CSV File'
                            // value={ }
                            onChange={ (e) => setCSVFile(e.target.files[0])}
                        ></Form.Control>
                    </Form.Group>

                    {/* <Form.Group controlId='alphabetSubType'>
                        <Form.Label>
                            Alphabet Sub Type
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Alphabet Sub Type'
                            value={ alphabet_subtype }
                            onChange={ (e) => setAlphabet_Subtype(e.target.value) }
                            disabled
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='alphabetDialect'>
                        <Form.Label>
                            Alphabet Dialect
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Alphabet Dialect'
                            value={ alphabet_dialect }
                            onChange={ (e) => setAlphabet_Dialect(e.target.value) }
                            disabled
                        ></Form.Control>
                    </Form.Group> */}

                    <Button type='submit' variant='primary' className='my-3'>Add Alphabet</Button>
                    <Button variant='danger' className='my-3 ms-3' onClick={ () => {
                        clearForm();
                        handleClose();
                    } }>Cancel</Button>

                </Form>

            </Modal.Body>
        </Modal>

    </>
    
  )
}

export default AddAlphabet