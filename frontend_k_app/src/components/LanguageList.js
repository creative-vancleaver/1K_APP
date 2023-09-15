import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Carousel, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import { listLanguages } from '../actions/languageActions'

function LanguageList() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const languageList = useSelector(state => state.languageList)
  const { error, loading, languages } = languageList

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  const slideLeft = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
      // if (index == languages.length - 1) {
      //   setIndex(0);
      // }
    }
  };

  const slideRight = () => {
    if (index + 1 <= languages.length - 1) {
      setIndex(index + 1);
      // if (index == 0) {
      //   setIndex(1)
      // }
    }
  };

  const cardLink = (language) => {
    navigate(`/${ language }`)
  }
  
  useEffect(() => {

    dispatch(listLanguages())

  }, [dispatch])  
  
  return (

    // <div style={{ position: 'relative', top: '-100px' }}>
    <div>


      <div className='language-container'>
        <i 
          className='fas fa-chevron-left leftBtn'
          onClick={slideLeft}  
        ></i>
        <div className='language-card-container'>

          {languages.map((language, n) => {
            let position = n > index ? "nextCard" : n === index ?
              "activeCard" : "prevCard";
            let languageLink = language.language.toString().toLowerCase();
            return (
              // <LinkContainer to={`/`}>
              <Card 
                className={`language ${ position } card${n}`} 
                key={ language.id }
                // onClick={cardLink( language.language )}  
              >
                <Card.Img src={language.image} className='flag' />
                <Card.ImgOverlay>
                <Card.Title>{ language.language }</Card.Title>
                <Card.Link 
                  as={Button} 
                  href={`/languages/${languageLink}`}
                  className='mt-3'
                  variant='info-outline'  
                >
                  Let's Learn
                </Card.Link>
                </Card.ImgOverlay>
              </Card>
              // </LinkContainer>
             
              )
          })}

        </div>
        <i 
          className='fas fa-chevron-right rightBtn'
          onClick={slideRight}
        ></i>
      </div>

      </div>

  )
}

export default LanguageList