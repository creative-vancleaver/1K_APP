import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminLanguageList = ({ languages, addLanguageForm, updateLanguage, deleteLanguage }) => {

  return (

    <>
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
                        <td>
                            <i className='fas fa-x' style={{ color: 'red' }}></i>
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