import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { randomWordByLanguage, updateScore, randomWord} from '../actions/wordActions'

import Word from '../components/Word'
import Answers from '../components/Answers'
import RecallScore from '../components/score/RecallScore'
// import { WORD_LIST_RESET, WORD_RANDOM_RESET } from '../constants/wordConstants'

// import words from '../words'

function WordScreen() {

  // const [word, setWord] = useState([])
  const dispatch = useDispatch()

  const { language } = useParams()
  console.log('lanuage from params === ', useParams(), language);

  const navigate = useNavigate()

  // const wordID = useParams()

  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [flip, setFlip] = useState(false);
  const [childState, setChildState] = useState(null);

  const wordRandomLanguage = useSelector(state => state.wordRandomLanguage)
  const { error, succes, loading, word} = wordRandomLanguage
  console.log(wordRandomLanguage, flip)

  const updateWordScore = useSelector(state => state.updateWordScore)
  const { error: updateWordError, success: updateWordSuccess, word: updateWordWord } = updateWordScore

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  function handleChildFlipStateChange(newState) {
    setFlip(newState);
  }

  // const [score, setScore] = useState(word.score)
  // console.log(wordRandom)
  // const word = words.find((w) => w.id == wordID.id)

  useEffect(() => {

    if (userInfo) {
      if (language !== 'english') {
        dispatch(randomWordByLanguage(language, userInfo.id))
      }
    } else {
      navigate('/login/');
    }
    setFlip(false)
    // setFlip(!flip)
    if (language !== 'english') {
      document.getElementById('word_card').classList.remove('flip')
    }

    if (updateWordSuccess) {
      console.log('updateWordSuccess - un flip?')
      // setFlip(!flip)

      // document.getElementById('word_card').classList.remove('flip')
      // resetFlipState()

    }
    // setFlip(!flip)
    // if (updateWordSuccess) {
    //   console.log(updateWordWord);
    //   setScore(c => c + 1)
    //   console.log(score)
    // }

    // if (successRandom) {
    //   // dispatch(randomWord())
    //   navigate(`/${ word.id }`)
    // }
    // dispatch({ type: WORD_LIST_RESET })
    // return () => {
    //   dispatch({ type: WORD_RANDOM_RESET })
    // }

    // return () => {
      // THIS HAS THE SAME EFFECT AS 'UNMOUNT'
    //   dispatch({ type: WORD_LIST_RESET })
    // }

    // async function fetchWord() {
    //   const { data } = await axios.get(`/words/${wordID.id}`)
    //   setWord(data)
    //   console.log(data)
    // }
    // fetchWord()

  }, [dispatch, score, updateWordScore])

  // function answerSubmitHandler (e, value) {
  //   e.preventDefault();
  //   console.log('value ', value);
  //   // console.log(score);

  //   // if (value == 'correct') {
  //   //   setIsCorrect(true)
  //   dispatch(updateScore(
  //     word,
  //     value,
      
  //   ))

  //   if (value === 'correct') {
  //     setScore(score => score + 1)
  //   }
    // }

    // if (value === 'correct') {
    //   setScore(prevScore => score + 1);
    //   console.log('new score ', score);
    // } else if (value === 'incorrect') {
    //   setScore(prevScore => score);
    //   console.log('incorrect score ', score);
    // }


    // dispatch(updateWordScore(word, value));
  // }

  return (

    <div className=''>

    <Link to={`/languages/${ language }/`} className='backLink'>Go Back</Link>

    { language === 'english' ? (
      <div className='d-flex justify-content-center mt-5 pt-5'>
        <h4 className='mt-5 pt-5'>Coming Soon</h4>
      </div>
    ) : (
    <>
    {/* { flip && ()} */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}> 
        <RecallScore value={ word.score } color={ '#f8e825' } />
      </div>
        
      <div className='card-page d-flex'>

        <Row className='card-row'>
          <Col className='card-col'>
            <Word word={ word } onStateChange={ handleChildFlipStateChange } />
            {/* { word.word } */}
          </Col>
        </Row>

        { flip && (
          <div className={`d-flex justify-content-center me-3`} style={{ display: 'block' }}>
            <Answers word={ word } language={ language } />
          </div>
        )}

      </div>

      {/* { !flip && 
      <div className='d-flex justify-content-center' style={{ marginTop: '5rem' }}>
        <span className='me-2'><b>Score: </b>{ word.score }/10</span>
        <RecallScore value={ word.score } color={ '#f8e825' } />
      </div>
      } */}
    </>
    )}

    </div>
  )
}

export default WordScreen