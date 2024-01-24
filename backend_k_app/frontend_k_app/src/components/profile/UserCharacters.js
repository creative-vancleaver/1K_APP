import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

import Spinner from '../spinner/Spinner';
import CharacterListItem from './CharacterListItem';

const UserCharacters = ({ language, userInfo }) => {

    const dispatch = useDispatch();

    const userCharsNotMastered = useSelector(state => state.notMasteredChars);
    const { notMasteredChars, loading: notMasteredLoading } = userCharsNotMastered;

    const userCharsMastered = useSelector(state => state.masteredChars);
    const { masteredChars, loading: masteredLoading } = userCharsMastered;

  return (

    <Row>

        <Col className='col-md-6'>

            { !notMasteredChars || notMasteredLoading ? (
            
                <Spinner />
            ) : (

                <>
                
                    { notMasteredChars.map((char, index) => (

                        <CharacterListItem key={ char.id } character={ char } index={ index } />

                    ))}
                
                </>

            ) }

        </Col>

        <Col className='col-md-6'>
            <h5>Mastered Characters</h5>

            { !masteredChars || masteredLoading ? (
                <Spinner />
            ) : (

                <>
                
                    { masteredChars.map((char, index) => (
                        <CharacterListItem key={ char.id } character={ char } index={ index } />
                    ))}
                
                </>

            )}
        </Col>

    </Row>

  )
}

export default UserCharacters