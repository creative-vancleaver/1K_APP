import React, { useState, useEffect} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// COMPONENTS
import Spinner from '../spinner/Spinner';
import Message from '../Message';

// ACTIONS
import { updateLanguage } from '../../actions/languageActions';

const UpdateLanguage = ({ show, handleClose, selectedLanguage }) => {

    const dispatch = useDispatch();

    const [language_name, setLanguage_Name] = useState('');
    const [country_names, setCountry_Names] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [img, setImg] = useState();
    const [isImageLoading, setIsImageLoading] = useState(true);

    const countryList = useSelector(state => state.countryList);
    const { countries, success: countriesSuccess } = countryList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const countryOptions = () => {
        const countryNames = countries.map(c => ({
            label: c.name,
            value: c.name
        }))
        return countryNames;
    };

    const handleChange = (selectedOptions) => {
        setSelectedCountries(selectedOptions || []);
    }

    const clearForm = () => {
        setLanguage_Name('');
        setSelectedCountries([]);
        setImg(null);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const countryObjects = {};
        selectedCountries.forEach((country, index) => {
            countryObjects[`selectedCountries[${ index }][value]`] = country.label;
        });

        const formData = new FormData();
        formData.append('language', language_name);
        // formData.append('url', language_url);
        formData.append('img', img);
        selectedCountries.map((c, index) => {
            formData.append(`selectedCountries[${ index }]`, c.value)
        });

        dispatch(updateLanguage(selectedLanguage.language, formData));
        clearForm();
        handleClose();

    };

    // useEffect(() => {

    //     if((userInfo && userInfo.isAdmin)) {
    //         dispatch(listCountries)
    //     }
    // })

    useEffect(() => {
        
        if (countriesSuccess && countries.length > 0) {
            const formattedCountryNames = countryOptions();
            setCountry_Names(formattedCountryNames);
            // setSelectedCountries(formattedCountryNames);
        }

        // if (selectedLanguage && selectedLanguage.countries) {
        //     const preSelectedCountries = selectedLanguage.countries.map(country => ({
        //         label: country.name,
        //         value: country.name
        //     }));
        //     setSelectedCountries(preSelectedCountries);
        // }

        if (selectedLanguage) {
            setLanguage_Name(selectedLanguage.language || []);

            const preSelectedCountries = selectedLanguage.countries.map(country => ({
                label: country.name,
                value: country.name
            }));
            setSelectedCountries(preSelectedCountries);

            setImg(selectedLanguage.image || null);

        } else {
            clearForm();
        }

    }, [countriesSuccess, countries, selectedLanguage]);


  return (

    <>

        <Modal show={ show } onHide={ handleClose }>

            <Modal.Header closeButton>
                <Modal.Title>Update Language</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* ADD LOADING CHECK HERE */}
                {/* ADD ERROR CHECK HERE */}

                <Form onSubmit={ submitHandler }>

                    <Form.Group controlId='language_name' className='mb-3'>
                        <Form.Label>Language</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Language'
                            // value={ selectedLanguage.language.slice(0).charAt().toUpperCase() + selectedLanguage.language.slice(1) }
                            value={ language_name.slice(0).charAt().toUpperCase() + language_name.slice(1) }
                            onChange={ (e) => setLanguage_Name(e.target.value) }
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countries' className='mb-3'>
                        <Form.Label>Countries</Form.Label>
                        <Select
                            isMulti
                            options={ country_names }
                            placeholder='Select a Country'
                            value={ selectedCountries }
                            onChange={ handleChange }
                            className='basic-multi-select'
                            classNamePrefix='select'
                        ></Select>
                    </Form.Group>

                    <Form.Group controlId='languageImg'>
                        <Form.Label>
                            Image
                        </Form.Label>

                        <div>
                            { !img ? (
                                <Spinner />
                            ) : (
                                <>
                                    <img 
                                        src={ img } 
                                        alt={ language_name } 
                                        className='mb-3' 
                                        style={{ width: '100px', height: 'auto' }}
                                        // onLoad={ () => {
                                        //     console.log('Image is Loaded');
                                        //     setIsImageLoading(false); }}     
                                        // onError={ () => setIsImageLoading(false) }
                                    />
                                    {/* <div>
                                        <p style={{ fontWeight: '500', lineHeight: '0' }}>Current Image: </p>
                                        <p style={{ fontSize: '11px', fontWeight: '100', lineHeight: '1' }}>{ selectedLanguage.image }</p>
                                    </div> */}
                                </>
                            )}
                        </div>

                        <Form.Control
                            type='file'
                            onChange={ (e) => setImg(e.target.files[0])}
                            // value={ }
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Update
                    </Button>
                    <Button variant='danger' className='my-3 ms-3' onClick={ () => {
                        handleClose();
                    }}>
                        Cancel
                    </Button>
                </Form>

            </Modal.Body>

        </Modal>
    
    </>

  )
}

export default UpdateLanguage