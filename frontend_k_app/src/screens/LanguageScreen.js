import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listWordsLanguage } from '../action/wordActions'

import Word from '../components/Word'
import Message from '../components/Message'
import { listLanguages } from '../action/languageActions'

function LanguageScreen() {

  const dispatch = useDispatch();
  var { language } = useParams();
  const navigate = useNavigate();
  // console.log('params ', language);

  const [lang, setLang] = useState('')

  const wordsLanguage = useSelector(state => state.wordsLanguage)
  const { error, loading, words } = wordsLanguage

  // const languageList = useSelector(state => state.languageList)
  // const { error: languageListError, loading: languageListLoading, languages } = languageList
  // console.log(languages)
  console.log(error)

  // const availLanguages = languages.map(language => language.language)
  // console.log('availLanguage ', availLanguages)

  useEffect(() => {
    dispatch(listWordsLanguage(language))
    // dispatch(listLanguages())


    if(error) {
      console.log('llll');
      if (error.includes('supported')) {
      console.log('dingus');
      }
    }


    // dispatch(listLanguages()) 

    // language = language.slice(0,1).toUpperCase() + language.slice(1, language.length)
    // console.log(language)

    // if(languages.filter(lang => lang.language.toString().toLowerCase() != language)) {
    //   console.log('no match')
    //   navigate('/')
    // }



    // if (!languages.includes(language.slice(0,1).toUpperCase() + language.slice(1, language.length))) {
    //   console.log()
    //   navigate('/')
    // }

    // if (error) {
    //   navigate('/')
    // }

  }, [dispatch, language])


  return (

    <div>
      {/* <Button>{languages}</Button> */}

      <Link to={`/`} className='backLink'>Go Back</Link>
      
      <h1 className='mb-5 mt-5 text-center' style={{ textTransform: 'capitalize' }}>{ language }</h1>

      {error ? ( <Message variant='danger'>{ error }</Message> )
        : (

          <div>
          <Row className='mt-5 d-flex justify-items-center'>
            { words.map(word => (
              <Col key={ word.id } sm={12} lg={6} xl={4} className={`my-3 ${word.id}`}>
                <Word word={word} />
              </Col>
            ))}
          </Row>
          </div>
        )
      }

      {/* <Row className='mt-5 d-flex justify-items-center'>
        { words.map(word => (
          <Col key={ word.id } sm={12} md={8} lg={6} xl={4} className={`my-3 ${word.id}`}>
            <Word word={word} />
          </Col>
        ))}
      </Row> */}

      <Row className='justify-content-center mt-5'>
        <Col xs={6}>
          {/* <Button className='w-100'>Play</Button> */}
          <Button as={ Link } to={`/${language}/random`} className='w-100'>Play</Button>
          {/* <Button as={ Link } to={`/${ word.id }`} className='w-100'>Play</Button> */}
        </Col>

        {/* <Col xs={5}>
          <Button className='w-100'></Button>
        </Col> */}

      </Row>

    </div>

  )
}

export default LanguageScreen