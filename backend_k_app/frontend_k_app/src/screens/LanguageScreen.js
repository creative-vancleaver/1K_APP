import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listWordsLanguage } from '../actions/wordActions'
import { addUserLanguage } from '../actions/userActions';

import Word from '../components/Word'
import Message from '../components/Message'
import Spinner from '../components/spinner/Spinner';
import { listLanguages } from '../actions/languageActions'

function LanguageScreen() {

  const dispatch = useDispatch();
  var { language } = useParams();
  const navigate = useNavigate();
  // console.log('params ', language);

  const [lang, setLang] = useState('')
  const [flip, setFlip] = useState(false);


  const wordsLanguage = useSelector(state => state.wordsLanguage)
  const { error, loading, words } = wordsLanguage

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  console.log(user)

  const languageList = useSelector(state => state.languageList)
  const { languages } = languageList
  console.log(languageList)
  // console.log(error)

  // const availLanguages = languages.map(language => language.language)
  // console.log('availLanguage ', availLanguages)

  function handleChildFlipStateChange(newState) {
    setFlip(newState);
  }

  useEffect(() => {

    dispatch(listLanguages());
    if (language !== 'english') {
      dispatch(listWordsLanguage(language))
    }

  }, [dispatch, language])

  const checkLanguage = (lang) => {
    return userInfo.languages.some(function (l) {
      return l.language === lang
    })
  }

  const addLang = () => {

    // const existLang = state.languages.find(x => x.langauge == lang.language)
    // const existingLang = userInfo.languages.find(x => x.language == language.language)
    // const existingLang = userInfo.languages.some(function (lang) {
    //   console.log(lang)
    //   return lang.language === language
    // })
    const existingLang = checkLanguage(language)
    console.log('existing language ', userInfo.languages, 'current language ', language,  existingLang);

    if (existingLang == false) {
      console.log('false')
      dispatch(addUserLanguage({
        'id': user.id,
        'language': language
      }))
    } else {
      console.log('language already associated with user');
    }


    console.log('lets learn ', language)
  }


  return (

    <div>
      {/* <Button>{languages}</Button> */}

      <Link to={`/`} className='backLink'>Go Back</Link>
      
      <h1 className='mb-5 mt-5 text-center' style={{ textTransform: 'capitalize' }}>{ language }</h1>

      { loading && <Spinner /> }

      {error ? ( <Message variant='danger'>{ error }</Message> )
        : language !== 'english' ? (

          <div>
          <Row className='mt-5 d-flex justify-items-center'>
            { words.slice(0, 12).map(word => (
              <Col key={ word.id } sm={12} lg={6} xl={4} className={`my-3 ${word.id}`}>
                <Word word={word} onStateChange={ handleChildFlipStateChange }/>
              </Col>
            ))}
          </Row>

          <Row className='justify-content-center mt-5'>
            <Col xs={6}>
              {/* <Button className='w-100'>Play</Button> */}
              <Button as={ Link } to={`/languages/${language}/random`} className='w-100' onClick={ addLang }>Play</Button>
              {/* <Button as={ Link } to={`/${ word.id }`} className='w-100'>Play</Button> */}
            </Col>

            {/* <Col xs={5}>
              <Button className='w-100'></Button>
            </Col> */}

          </Row>

          </div>

        ) : (

          <div className='d-flex justify-content-center'>
            <h4>Coming Soon</h4>
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

 

    </div>

  )
}

export default LanguageScreen