import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

// COMPONENTS
import Score from './Score'
import Answers from './Answers';


// NOTE: CAN ACCESS PROPS IN 2 WAYS
  // 1. PROPS.WORD.SPANISH...
  // 2. DESTRUCTURE IT TO ACCESS WORD DIRECTLY
function Word({ word, onStateChange }) {

  const location = useLocation()
  // console.log('word comp path = ', location.pathname)
  const [flip, setFlip] = useState(false);
  const { language } = useParams()
  // console.log(language)

  const updateWordScore = useSelector(state => state.updateWordScore)
  const { error: updateWordError, success: updateWordSuccess, word: updateWordWord } = updateWordScore


  function handleClick() {
    // console.log('flipping the card on click')


    
    setFlip(!flip)
    if(location.pathname != '/') {
      // FOR SOME REASON THE OR (||) OPERATOR WAS NOT WORKING HERE
      if(location.pathname != `/${ language }`) {
        onStateChange(!flip);
        // setFlip(!flip)
      }
    }
    // setFlip(!flip)
    // console.log('will need to rest setFlip')
  }

  useEffect(() => {
    if (updateWordSuccess) {
      setFlip(false)
    }
  }, [updateWordSuccess])

  return (

    <div>

      <div className={` `}>
        {/* card-container */}

      <Card id='word_card' className={`cards ${ flip ? "flip" : ""} `}>

        <div 
          className={`front`}
          // onClick={ () => (setFlip(!flip) )}
          onClick={ handleClick }
        >
          { word.user_word ? ( word.user_word ) : ( word.word ) }
          {/* { word.word ? ( word.word ) : word.user_word.word ? ( word.user_word.word ) : ('') } */}
          {/* { word.user_word.word } */}
          <div>
            {/* <Score value={ word.score } color='#f8e825' text={ word.score } /> */}
          </div>
        </div>

        <div 
          className={`back`}
          // onClick={ () => setFlip(!flip)}
          onClick={ handleClick }
        >
          { word.user_word ? ( word.translation ) : ( word.translation ) }
          {/* { word.user_word.translation } */}
          {/* { word.score } */}
        </div>
      
      </Card>

      </div>

      {/* { flip && location.pathname === '/random' && (
        <div className='d-flex justify-content-center me-3'>
          <Answers word={ word } />
        </div>
      )} */}


    </div>

  )
}

export default Word