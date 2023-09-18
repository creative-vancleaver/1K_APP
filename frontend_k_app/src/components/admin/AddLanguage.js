import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import FormContainer from '../FormContainer';

import { listLanguages, addLanguage, listCountries } from '../../actions/languageActions';

const AddLanguage = () => {

    const dispatch = useDispatch();

    const [language_name, setLanguage_Name] = useState('');
    const [language_url, setLanguage_Url] = useState('');
    const [country_names, setCounty_Names] = useState([])
    const [selectedCounties, setSelectedCountries] = useState([])
    
    const languageList = useSelector(state => state.languageList);
    const { languages } = languageList;

    const countryList = useSelector(state => state.countryList);
    const { countries, success: countriesSuccess } = countryList;

    // const countryOptions = countries.map(c => ({
    //     label: c.name,
    //     value: c.name
    // }))

    const countryOptions = () => {
        const countryNames = countries.map(c => ({
            label: c.name,
            value: c.name
        }))
        console.log('countryNames ', countryNames);
        return countryNames

    }

    const handleChange = (selectedCounties) => {
        setSelectedCountries({ selectedCounties })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('adding language ', language_name, language_url, selectedCounties);

        // dispatch(addLanguage({
        //     language: language_name,
        //     url: language_url
        // }))
    }

    useEffect(() => {

        dispatch(listCountries());

        if (countriesSuccess) {
            setCounty_Names(countryOptions());
        }

        // if (countriesSuccess) {
        //     // setCounty_Names(countryOptions());
        //     const countryOptions = countries.map(c => ({
        //         label: c.name,
        //         value: c.name
        //     }))
        // }
        
    }, []);

    // const countryOptions = countries.map(c => ({
    //     label: c.name,
    //     value: c.name
    // }))


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

            <Form.Group controlId='langCountry'>
                <Form.Label>
                    Select a Country
                </Form.Label>
                <Select 
                    isMulti
                    options={ country_names }
                    placeholder='Select a Country'
                    value={ selectedCounties.value }
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
        </Form>
    </FormContainer>

  )
}

export default AddLanguage