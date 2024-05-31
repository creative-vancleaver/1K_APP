import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getAllAlphabets, getAllAlphabetsLanguage, getAllCharsLanguage } from '../../actions/alphabetActions';

const AdminLanguageList = ({ languages, addLanguageForm, updateLanguage, deleteLanguage, addAlphabet }) => {

    const dispatch = useDispatch();

    const [allAlphabets, setAllAlphabets] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const alphabetStore = useSelector(state => state.alphabetList);
    const { alphabets } = alphabetStore;

    const characterList = useSelector(state => state.characterList);
    const { characters } = characterList;

    useEffect(() => {
        dispatch(getAllAlphabets());
    }, []);

    useEffect(() => {
        dispatch(getAllCharsLanguage('japanese'));
    }, []);

  return (

    <>

        {/* <h4>Alphabets</h4>

        { characters && (

            <>
            
                {Object.keys(characters).map(language => (
                    <div key={ language }>
                        <h2>{ language }</h2>
                        {Object.keys(characters[language]).map(alphabet => (
                            <div key={ alphabet }>
                                <h3>{ alphabet }</h3>
                                <ul>
                                    {characters[language][alphabet].map(character => (
                                        <li key={character.id}>
                                            { character.character } | { character.pronunciation }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}

            </>

        )} */}
        
        {/* { alphabets && (
            <>
                { alphabets.map(alphabet => (
                    <div key={ alphabet.id }>
                        <p>{ alphabet.language.langauge }</p>
                        <p>{ alphabet.name }</p>
                        <p>{ alphabet.alphabet_type }</p>
                    </div>
                ))}
            </>
        )} */}

        <h4>Languages</h4>
        <Table striped bordered hover responsive className='table-sm'>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Language</th>
                    <th>Countries</th>
                    <th>Words</th>
                    <th>Alphabet</th>
                </tr>
            </thead>

            <tbody>
                { languages.map(language => (
                    <tr key={ language.id }>
                        <td>
                            { language.id }
                        </td>
                        <td>
                            { language.language.slice(0).charAt().toUpperCase() + language.language.slice(1) }
                        </td>
                        <td>
                            { language.countries.map((country, index) => (
                                <span key={ country.id }>
                                    { country.name } 
                                    { index < language.countries.length - 1 ? ', ' : '' }
                                </span>
                            ))}
                        </td>

                        <td>{ language.word_count }</td>

                        {/* ALPHABET */}
                        <td>
                            {/* <i className='fas fa-x' style={{ color: 'red' }}></i> */}
                            <LinkContainer to={''}>
                                <Button variant='light' className='btn-sm' onClick={ () => addAlphabet(language) }>
                                    {/* <i className="fas fa-edit"></i> */}
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </LinkContainer>
                            {/* <Button variant='danger' className='btn-sm'>
                                <i className="fas fa-trash"></i>
                            </Button> */}
                        </td>

                        <td className="d-flex justify-content-center">

                            <LinkContainer to={``}>
                                <Button variant='light' className='btn-sm me-3' onClick={ () => updateLanguage(language) }>
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </LinkContainer>

                            <Button variant='danger' className='btn-sm' onClick={ () => deleteLanguage(language) }>
                                <i className="fas fa-trash"></i>
                            </Button>

                        </td>
                    </tr>
                ))}

            </tbody>

            {/* <tfoot>
                <tr>
                    <td colSpan='6'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ width: '50%' }}>Add a Language</Button>
                        </div>
                    </td>
                </tr>
            </tfoot> */}

        </Table>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '50%' }} onClick={ addLanguageForm }>
                Add a Language
            </Button>
        </div>
    </>

  )
}

export default AdminLanguageList