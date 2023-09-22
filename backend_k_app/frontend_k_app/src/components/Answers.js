import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { randomWord, RandomWord, updateScore } from '../actions/wordActions'


function Answers({ word, language }) {

  const dispatch = useDispatch()

  // const { language } = useParams();
  console.log('Answer props language = ', language);

  // useEffect(() => {

  //   dispatch(randomWord());

  // }, [dispatch])
  const [flip, setFlip] = useState(false);

  function answerSubmitHandler(e, value) {
    e.preventDefault();
    dispatch(updateScore(
      language,
      word,
      value,
    ));
    // setFlip(!flip)
    // onStateChange(!flip)
    // if (value === 'correct') {
    //   setScore(score => score + 1)
    // }
  }

  // useEffect(() => {
  //   setFlip(!flip)
  // }, [dispatch, setFlip])

  return (
    <div>
      
      <Button 
          className='mt-5 me-3' 
          variant='success'
          value='correct'
          onClick={ (e) => answerSubmitHandler(e, e.target.value) }  
        >Correct</Button>



        <Button 
          className='mt-5' 
          variant='danger'
          value='incorrect'
          onClick={(e) => answerSubmitHandler(e, e.target.value) }
        
        >Incorrect</Button>

    </div>
  )
}

export default Answers