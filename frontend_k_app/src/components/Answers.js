import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

import { randomWord, RandomWord, updateScore } from '../action/wordActions'


function Answers({ word }) {

  const dispatch = useDispatch()

  // useEffect(() => {

  //   dispatch(randomWord());

  // }, [dispatch])
  const [flip, setFlip] = useState(false);

  function answerSubmitHandler(e, value) {
    e.preventDefault();
    dispatch(updateScore(
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