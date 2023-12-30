import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

import { getMasteredWords, getNotMasteredWords, updateMasteredWords, updateNotMasteredWords, getUserStats, getUserWordsByLanguage } from '../../actions/userActions';

import Spinner from '../spinner/Spinner';
import WordListItem from './WordListItem';

const UserWordsPaginate = ({ language, userInfo, langaugesLearning, handlePageChange, currentPage }) => {

    const dispatch = useDispatch();

    const limit = 20;
    const [displayCount, setDisplayCount] = useState(10)
    const [displayCountMastered, setDisplayCountMastered] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [showAllMastered, setShowAllMastered] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const userWordsByLanguage = useSelector(state => state.userWordsByLanguage);
    const { userWords } = userWordsByLanguage;

    const masteredWordsStore = useSelector(state => state.masteredWords);
    const { masteredWords, loading: masteredWordsLoading } = masteredWordsStore;
    console.log('usreMasteredWords from store = ', masteredWords);

    const notMasteredWordsStore = useSelector(state => state.notMasteredWords);
    const { notMasteredWords, loading: notMasteredWordsLoading } = notMasteredWordsStore;

    useEffect(() => {
        dispatch(getMasteredWords(language.id));
        dispatch(getNotMasteredWords(language.id))
    }, [language.id]);

    useEffect(() => {
        setTotalResults(userWords.count);
    }, [userWords]);

    const toggleWordStatus = async (wordId) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            },
        };

        console.log('config ', config);
        
        try {

            const response = await axios.post(
                `/api/users/${ userInfo.id }/user_words/${ wordId }/update/?language=${ language.id }`,
                null,
                config
            );
            return response.data;

        } catch (error) {
            console.error('Error updating word status', error);
        }
    }

    const handleWordMove = async (wordId) => {

        const wordToMove = notMasteredWords.results.find(word => word.id === wordId) || masteredWords.results.find(word => word.id === wordId);
        const updatedWord = { ...wordToMove, isMastered: !wordToMove.isMastered }

        // 'OPTIMISTIC STATE UPDATE' - UPDATE BEFORE RESPONSE IS RETURNED
        if (updatedWord.isMastered) {

            const updatedNotMasteredWords = notMasteredWords.results.filter(word => word.id !== wordId);
            const updatedMasteredWords = [...masteredWords.results, updatedWord];
            dispatch(updateNotMasteredWords(updatedNotMasteredWords));
            dispatch(updateMasteredWords(updatedMasteredWords));

            // IF NEW updated ARRAY (with word removed) IS LESS THAN 20
            if (updatedNotMasteredWords.length <= 20) {
                // DO I WANT TO FETCH FROM THE NEW ARRAY LENGTH?? OR OLD ARRAY LENGTH?
                // i think old? because the words will have been loaded, but MOVED...
                dispatch(getNotMasteredWords(language.id, notMasteredWords.results.length, limit));
            }

        } else {

            const updatedMasteredWords = masteredWords.results.filter(word => word.id !== wordId);
            const updatedNotMasteredWords = [...notMasteredWords.results, updatedWord]
            dispatch(updateMasteredWords(updatedMasteredWords));
            dispatch(updateNotMasteredWords(updatedNotMasteredWords));

            if (updatedMasteredWords.length <= 20) {
                dispatch(getMasteredWords(language.id, masteredWords.results.length, limit));
            }

        }

        toggleWordStatus(wordId).catch(error => {
            console.log('Failed to update word status: ', error);

            if (updatedWord.isMastered) {

                const updatedNotMasteredWords = notMasteredWords.results.filter(word => word.id !== wordId);
                const updatedMasteredWords = [...masteredWords.results, wordToMove];
                dispatch(updateNotMasteredWords(updatedNotMasteredWords));
                dispatch(updateMasteredWords(updatedMasteredWords));

            } else {
                
                const updatedMasteredWords = masteredWords.results.filter(word => word.id !== wordId);
                const updatedNotMasteredWords = [...notMasteredWords.results, wordToMove];
                dispatch(updateMasteredWords(updatedMasteredWords));
                dispatch(updateNotMasteredWords(updatedNotMasteredWords));

            }
        });
    }

    const moveWord = useCallback((id) => {

        handleWordMove(id);
        
    }, [handleWordMove]);

    const loadMoreMastered = () => {

        const currentMasteredWords = masteredWords.results.length;
        const totalMasteredWords = masteredWords.count;

        if (currentMasteredWords >= totalMasteredWords) {
            // UPDATE TO USE MESSAGE COMPONENT ***
            alert('All words have been loaded');
            return;
        };

        const newOffset = masteredWords.results.length;
        dispatch(getMasteredWords(language.id, newOffset, limit));

    }
    

    const loadMoreNotMastered = () => {

        const currentNotMasteredWords = notMasteredWords.results.length;
        const totalNotMasteredWords = notMasteredWords.count;

        if (currentNotMasteredWords >= totalNotMasteredWords) {
            // UPDATE TO USE MESSAGE COMPONENT ***
            alert('All words have been loaded');
            return;
        };

        const newOffset = notMasteredWords.results.length;
        dispatch(getNotMasteredWords(language.id, newOffset, limit));

    }

  return (

    <Row>



        <Col className='col-md-6'>
    
            <h5>Words ({ notMasteredWords.count })</h5>

            { !notMasteredWords || notMasteredWordsLoading && notMasteredWords.results.length === 0 ? (

                <Spinner />

            ) : (

                <>

                    { notMasteredWords.results && notMasteredWords.results.slice(0, showAll ? notMasteredWords.results.length : displayCount).map((word, index) => (

                        <WordListItem key={ word.id } word={ word } moveWord={ moveWord } index={ index } />

                    ))}

                    <button onClick={ loadMoreNotMastered } className='btn-primary btn me-3'>Load More</button>
                    <button onClick={ () => {
                        setShowAll(prevShowAll => !prevShowAll);
                        if (displayCount > 10) {
                            setDisplayCount(10);
                        } else {
                            setDisplayCount(notMasteredWords.results.length);
                        }
                     } }
                     className='btn btn-secondary'
                     >
                        { showAll ? 'Show Less' : 'Show More' }
                    </button>

                </>
            )} 

        </Col>

        <Col className='col-md-6'>
            
            <h5>Words Mastered ({ masteredWords.count })</h5>
            
            { !masteredWords || masteredWordsLoading && masteredWords.results.length === 0 ? (

                <Spinner />

            ) : (

                <>

                    { masteredWords.results && masteredWords.results.slice(0, showAllMastered ? masteredWords.results.length : displayCountMastered).map((word, index) => (
                        
                        <WordListItem key={ word.id } word={ word } moveWord={ moveWord } index={ index } />

                    ))}

                    { masteredWords.count ? (
                        <>
                            <button onClick={ loadMoreMastered } className='btn btn-primary me-3'>Load More</button>
                            <button onClick={ () => {
                                setShowAllMastered(prevshowAllMastered => !prevshowAllMastered);
                                if (displayCountMastered > 10) {
                                    setDisplayCountMastered(10);
                                } else {
                                    setDisplayCountMastered(masteredWords.results.length);
                                }
                            } }
                            className='btn btn-secondary'
                            >{ showAllMastered ? 'Show Less' : 'Show More' }</button>
                        </>
                    ) : (
                        <div style={{ fontWeight: '100' }}>
                            <p className='mb-0'>Words you've mastered will appear here.</p>
                            <p className='mb-0'>You can master words by learning the flashcards.</p>
                            <p>Or you can also select words you already know in the left column to move them to the 'Mastered' list.</p>
                        </div>
                    )}



                </>

            )}

        </Col>
    </Row>

  )
}

export default UserWordsPaginate