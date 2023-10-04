import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import axios from 'axios'

import { listWords, listWordsLanguage, randomWord } from '../actions/wordActions'
import { listLanguages } from '../actions/languageActions'

// COMPONENTS
import LanguageList from '../components/LanguageList'
import Word from '../components/Word'
import SubHero from '../components/SubHero'

import Map from '../components/worldMap/Map';
import DeepZoom from '../components/worldMap/DeepZoom';

import { WORD_LIST_RESET } from '../constants/wordConstants'

function HomeScreen() {

  const languageList = useSelector(state => state.languageList);
  const { languages } = languageList;

  const [languageAvailable, setLanguageAvailable] = useState(false);
  const supportedCountries = ['Spain', 'Mexico', 'Italy', 'France'];

  const dispatch = useDispatch()
  const wordList = useSelector(state => state.wordList);
  const { error, loading, words } = wordList;
  console.log(words)

  const wordsLanguage = useSelector(state => state.wordsLanguage);
  const { error:wordsLangError, loading:wordsLangLoading, wordsLang } = wordsLanguage

  const wordRandom = useSelector(state => state.wordRandom)
  const { word: random_word } = wordRandom

  // const [words, setWords] = useState([])
  // const [random, setRandom] = useState('')

  const [language, setLanguage] = useState('');

  useEffect(() => {

    // const language = 'none'
    // dispatch(listWords())
    // dispatch(listWordsLanguage(language))
    // dispatch(listLanguages())


    // dispatch(randomWord())

    // return () => {
    //   dispatch({ type: WORD_LIST_RESET })
    // }


    // async function fetchWords() {
    //   const { data } = await axios.get(`/words/`);
    //   setWords(data)
    // }
    // fetchWords()

  }, [dispatch])
  // REMEMBER TO ADD DEPENDENCY ARRAY (EVEN IF EMPTY) OR WILL HAVE INFINITE 'GET' LOOP FROM API

  // console.log('random word ', random_word)

  return (
    
    <div>

      <h1 className='mb-5 mt-3 text-center'>Choose a Language</h1>


      <Map />
      <LanguageList />

{/* REMOVED THE WORD LIST FROM THE HOME PAGE!! UPDATING THE URLS TO BE LANGUAGE BASED AND WILL LIKELY NOT USE ALL WORDS FROM DB FOR ANYTIHNG... */}
      {/* <div>{ words.map(word => word.word) }</div> */}
      {/* <h1 className='mb-5 mt-5'>Top 10 Words</h1>
      <Container>
      <Row className='mt-5 d-flex justify-items-center'>
        {words.map(word => (
          <Col key={ word.id } sm={12} lg={6} xl={4} className={`my-3 ${word.id}`}>
            
            <Word word={word} />
            
          </Col>
        ))} */}
        {/* NOTE: adding a semicolon to the end of this function will add it to the screen! */}
      {/* </Row>
      </Container>

      <SubHero word={ random_word } /> */}

    </div>
  )
}

export default HomeScreen