import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useResolvedPath } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { listWordsLanguage } from '../actions/wordActions'
import { addUserLanguage } from '../actions/userActions';
import { listLanguages } from '../actions/languageActions';
import { getAllAlphabetsLanguage } from '../actions/alphabetActions'

import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

import CharacterCard from '../components/alphabet/CharacterCard';
import Word from '../components/Word';
import Message from '../components/Message';
import Spinner from '../components/spinner/Spinner';
import DebugForm from '../components/forms/DebugForm';

function LanguageScreen() {

  const dispatch = useDispatch();
  var { language } = useParams();
  const navigate = useNavigate();
  // console.log('params ', language);

  const [lang, setLang] = useState('')
  const [flip, setFlip] = useState(false);

  const [showDebugModal, setShowDebugModal] = useState(false);

  const wordsLanguage = useSelector(state => state.wordsLanguage)
  const { error, loading, words } = wordsLanguage

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;
  // console.log(user)

  const languageList = useSelector(state => state.languageList)
  const { languages } = languageList
  // console.log(languageList)

  const addLanguageToUser = useSelector(state => state.addLanguageToUser);
  const { success: languageAddSuccess, loading: languageAddLoading } = addLanguageToUser;

  const alphabetList = useSelector(state => state.alphabetList);
  const { success: alphabetListSuccess, loading: alphabetListeLoading, alphabetList: alphabets } = alphabetList;
  console.log('alphabets = ', alphabetList);
  // // console.log(error)

  // const availLanguages = languages.map(language => language.language)
  // // console.log('availLanguage ', availLanguages)

  function handleChildFlipStateChange(newState) {
    setFlip(newState);
  }

  useEffect(() => {

    dispatch(listLanguages());
    if (language !== 'english') {
      dispatch(listWordsLanguage(language))
      dispatch(getAllAlphabetsLanguage(language))
    }

    if (languageAddSuccess) {
      navigate(`/languages/${ language }/random/`);
    }

  }, [dispatch, language, languageAddSuccess])

  const checkLanguage = (lang) => {
    return userInfo.languages.some(function (l) {
      return l.language === lang
    })
  }

  const addLang = () => {

    // const existLang = state.languages.find(x => x.langauge == lang.language)
    // const existingLang = userInfo.languages.find(x => x.language == language.language)
    // const existingLang = userInfo.languages.some(function (lang) {
    //   // console.log(lang)
    //   return lang.language === language
    // })
    const existingLang = checkLanguage(language)
    // console.log('existing language ', userInfo.languages, 'current language ', language,  existingLang);

    if (!existingLang) {
      dispatch(addUserLanguage({
        'id': user.id,
        'language': language
      }))
      
      // , () => {
      //   navigate(`languages/${ language }/random/`)
      // });

    } else {
      // console.log('language already associated with user');
      navigate(`/languages/${ language }/random/`)

    }

    // if (existingLang == false) {
    //   // console.log('false')
    //   dispatch(addUserLanguage({
    //     'id': user.id,
    //     'language': language
    //   }))
    // } else {
    //   // console.log('language already associated with user');
    // }


    // // console.log('lets learn ', language)
  }

  const checkLanguageExists = (language) => {
    if (userInfo && userInfo.languages) {
      return userInfo.languages.some(lang => lang.language === language);
    } else {
      return null
    }
  }

  const languageExists = checkLanguageExists(language);
  // console.log('langaugeExists ', languageExists);


  return (

    <>



      <Container className='d-flex flex-column' style={{ minHeight: '80vh' }}>
        {/* <Button>{languages}</Button> */}
        <DebugForm show={ showDebugModal } handleClose={ () => setShowDebugModal(false) } />

        <div className="text-start">
          <Link to={`/`} className='backLink'>Go Back</Link>
        </div>
        
        <h1 className='mb-5 mt-5 text-center' style={{ textTransform: 'capitalize' }}>{ language }</h1>

        { languageAddLoading && <Spinner /> }
  {/* NOTE: I switched these loading ternaries for better loading experience. NOT sure why they were set up the way they were.. */}
        { loading ? (<Spinner />) :

        error ? ( <Message variant='danger'>{ error }</Message> )
          : language !== 'english' ? (

            <>

            <div className="text-center mb-2">

              {/* <h5>Alphabet</h5>

              <Row className='mt-5 text-start'>
                <Col sm={ 8 } lg={ 6 } xl={ 4 } className='my-3'>

                  { Object.entries(alphabetList.alphabets).map(([aName, types]) => (
                    <div key={ aName }>
                      <h3>{ aName }</h3>
                      <ul>
                        { types.map((type, index) => (
                          <li key={ index }>{ type }</li>
                        ))}
                      </ul>
                    </div>
                  ))} */}
                                    
                {/* { alphabetList.alphabets.map((alphabet) => (
                    // console.log(alphabet);
                    <Col key={ alphabet.id }>
                      { alphabet.name }
                      { alphabet.alphabet_type }
                    </Col>
                  )) }
                   */}
                {/* </Col>
              </Row>

              <Row className="mt-5 d-flex justify-items-center">
                <Col sm={12} lg={6} xl={4} className='my-3 card-container'>



                 <CharacterCard />

                </Col>
              </Row> */}

              <Row className="justify-content-center">
                <Col xs={ 6 }>

                  {/* {!userInfo ? (
                    <Button className='w-100'>Sign Up</Button>
                  ) : !loading && languageExists ? (
                    <Button className='w-100'>
                      Start Learning
                    </Button>
                  ) : (
                    <Button className='w-100'>Start Learning</Button>
                  )} */}

                </Col>
              </Row>
            </div>

            <div className='text-center'>
              {/* <h5>Words</h5> */}
              <Row className='mt-3 d-flex justify-items-center'>
                { words.slice(0, 12).map(word => (
                  <Col key={ word.id } sm={12} lg={6} xl={4} className={`my-5 ${word.id} card-container`}>
                    <Word word={ word } />
                    {/* onStateChange={ handleChildFlipStateChange } */}
                  </Col>
                ))}
              </Row>

              <Row className='justify-content-center mt-5'>
                <Col xs={6}>
                  {/* <Button className='w-100'>Play</Button> */}

                  { !userInfo ? (
                    <Button as={ Link } to={'/register/'} className='w-100'>Sign Up</Button>
                  ) : !loading && languageExists ? (
                    <Button as={ Link } to={`/languages/${ language }/random/`} className='w-100'>
                      Start Learning
                    </Button>
                  ) : (
                    <Button className='w-100' onClick={ addLang }>
                      Start Learning
                    </Button>
                  )}

                  {/* <Button as={ Link } className='w-100' onClick={ addLang }>Play</Button> */}

                  {/* <Button as={ Link } to={`/${ word.id }`} className='w-100'>Play</Button> */}
                </Col>

                {/* <Col xs={5}>
                  <Button className='w-100'></Button>
                </Col> */}

              </Row>

            </div>
            </>

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

      </Container>
    </>

  )
}

export default LanguageScreen