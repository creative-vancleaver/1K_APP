import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import FormContainer from '../FormContainer';
import Spinner from '../spinner/Spinner';
import Message from '../Message';

import { listLanguages, addLanguage, listCountries } from '../../actions/languageActions';

const AddLanguage = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const [language_name, setLanguage_Name] = useState('');
    const [language_url, setLanguage_Url] = useState('');
    const [country_names, setCountry_Names] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [formKey, setFormKey] = useState(0);
    const [img, setImg] = useState();
    
    const languageList = useSelector(state => state.languageList);
    const { languages } = languageList;

    const countryList = useSelector(state => state.countryList);
    const { countries, success: countriesSuccess } = countryList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const countryOptions = countries.map(c => ({
    //     label: c.name,
    //     value: c.name
    // }))

    const countryOptions = () => {
        const countryNames = countries.map(c => ({
            label: c.name,
            value: c.name
        }))
        // console.log('countryNames ', countryNames);
        // setCountry_Names(countryNames);
        return countryNames

    }

    const handleChange = (selectedCountries) => {
        setSelectedCountries( selectedCountries )
    }

    const clearForm = () => {
        setLanguage_Name('');
        setLanguage_Url('');
        setSelectedCountries([]);
        setImg(null)
        setFormKey(formKey + 1);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log('adding language ', language_name, language_url, selectedCountries, img);
        // if (language_url) {
        //     const url = language_url
        // } else {
        //     const url = null
        // }

        // const formData = {
        //     language: {
        //         language: language_name,
        //         url: language_url,
        //         img: img,
        //         countries: selectedCountries
        //     }
        // }

        const countryObjects = {};
        selectedCountries.forEach((country, index) => {
            countryObjects[`selectedCountries[${ index }][value]`] = country.label;
        })

        const formData = new FormData();
        formData.append('language', language_name);
        formData.append('url', language_url);
        formData.append('img', img)

        // formData.append('selectedCountries', selectedCountries)

        selectedCountries.map((c, index) => {
            formData.append(`selectedCountries[${ index }]`, c.value)
        })

        // for (const key in countryObjects) {
        //     if (countryObjects.hasOwnProperty(key)) {
        //         formData.append(key, countryObjects[key])
        //     }
        // }
        // formData.append('countries[0]', selectedCountries[0])
        // formData.append('countries[1]', selectedCountries[1])

        dispatch(addLanguage(formData))

        // dispatch(addLanguage({
        //     language: language_name,
        //     url: language_url,
        //     countries: selectedCountries,
        //     img: img
        // }))

        clearForm();
        handleClose();
        
    }

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listCountries());
        }


        // if (countriesSuccess) {
        //     setCountry_Names(countryOptions());
        //     // countryOptions()
        // }

        // if (countriesSuccess) {
        //     // setCountry_Names(countryOptions());
        //     const countryOptions = countries.map(c => ({
        //         label: c.name,
        //         value: c.name
        //     }))
        // }
        
    }, [dispatch]);

    useEffect(() => {

        if (countriesSuccess && countries.length > 0) {
            const formattedCountryNames = countryOptions();
            setCountry_Names(formattedCountryNames);
        }

    }, [countriesSuccess]);

    // const countryOptions = countries.map(c => ({
    //     label: c.name,
    //     value: c.name
    // }))


  return (

    <>
        <Modal show={ show } onHide={ handleClose }>

        <Modal.Header closeButton>
            <Modal.Title>
                Add Language
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {/* <FormContainer> */}
                {/* <h4>Add a New Language</h4> */}

                <Form key={ formKey } onSubmit={ submitHandler }>

                    <Form.Group controlId='languageName' className='mb-3'>
                        <Form.Label>
                            Language
                        </Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Language Name'
                            value={ language_name }
                            onChange={ (e) => setLanguage_Name(e.target.value) }
                            required
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='languageURL' className='mb-3'>
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

                    <Form.Group controlId='languageIMG' className='mb-3'>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control
                            type='file'
                            onChange={ (e) => setImg(e.target.files[0]) }
                            // placeholder='Upload an Image'
                            // value={ img }
                            // autoComplete='off'
                            // onChange={}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='langCountry' className='mb-3'>
                        <Form.Label>
                            Select a Country
                        </Form.Label>
                        <Select 
                            isMulti
                            options={ country_names }
                            placeholder='Select a Country'
                            value={ selectedCountries }
                            onChange={ handleChange }
                            className='basic-multi-select'
                            classNamePrefix='select'
                            // value={ country_name }
                            // onChange={ (e) => setCountry_Name(e.target.value) }
                        >
                            {/* { country_value.map(o => <p>{ o.value }</p>)} */}
                        </Select>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>Add Language</Button>
                    <Button variant='danger' className='my-3 ms-3' onClick={ () => { 
                        clearForm();
                        handleClose();
                    }}>Cancel</Button>
                </Form>
            {/* </FormContainer> */}

        </Modal.Body>
            
        </Modal>
    </>

    

  )
}

export default AddLanguage