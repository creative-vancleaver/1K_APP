import axios from 'axios';

import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,

  WORD_RANDOM_REQUEST,
  WORD_RANDOM_SUCCESS,
  WORD_RANDOM_FAIL,

  UPDATE_WORD_SCORE_REQUEST,
  UPDATE_WORD_SCORE_SUCCESS,
  UPDATE_WORD_SCORE_FAIL,

  WORD_LANGUAGE_REQUEST,
  WORD_LANGUAGE_SUCCESS,
  WORD_LANGUAGE_FAIL,

  WORD_RANDOM_LANGUAGE_REQUEST,
  WORD_RANDOM_LANGUAGE_SUCCESS,
  WORD_RANDOM_LANGUAGE_FAIL,

} from '../constants/wordConstants'

export const listWords = () => async(dispatch) => {

  try {

    dispatch({ type: WORD_LIST_REQUEST });

    const { data } = await axios.get(`words/`);

    dispatch({ type: WORD_LIST_SUCCESS, payload: data })

  } catch (error) {

    dispatch({
      type: WORD_LIST_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail
        : error.message
    })
  }
}

export const listWordsLanguage = (language) => async(dispatch) => {
  // console.log(language);
  try{

    dispatch({ type: WORD_LANGUAGE_REQUEST });
    // const { data } = await axios.get(`/words/${ language }`);
    const { data } = await axios.get(`/api/languages/${ language }/words/`)
    
    dispatch({ type: WORD_LANGUAGE_SUCCESS, payload: data })

  } catch (error) {

    dispatch({
      type: WORD_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail
        : error.message
    })
  }
}

export const randomWord = () => async(dispatch) => {

  try {
    
    dispatch({ type: WORD_RANDOM_REQUEST })

    // const { data } = await axios.get(`words/${ id }/random`)
    const { data } = await axios.get('words/random');

    dispatch({ type: WORD_RANDOM_SUCCESS, payload: data })

  } catch (error) {
    
    dispatch({ type: WORD_RANDOM_FAIL,
      payload: error.response && error.response.data.detail
      ? error.resposne.data.detail
        : error.message
    })
  }
}

export const randomWordByLanguage = (language, user_id) => async(dispatch, getState) => {
  // console.log('randomwordbylanguage ', language);

  try {

    dispatch({ type: WORD_RANDOM_LANGUAGE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    // const { data } = await axios.get(`/words/random/${ language }/`)
    const { data } = await axios.get(`/api/languages/${ language }/words/random/`, config, user_id)

    dispatch({ type: WORD_RANDOM_LANGUAGE_SUCCESS, payload: data })

  } catch (error) {

    dispatch({
      type: WORD_RANDOM_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail
          : error.message
    })
  }
}

export const updateScore = (language, word, value) => async(dispatch, getState) => {
  // console.log('updateWordScore ', word, value)

  try {

    dispatch({
      type: UPDATE_WORD_SCORE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    
    const config = {
      headers: {
        // 'Content-type': 'multipart/form-data'
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    const formData = new FormData()

    formData.append('value', value)

    const { data } = await axios.put(
    //   `/words/score/${ word.id }/`,
      // `/words/${ word.id }/score/`,
      `/api/languages/${ language }/words/${ word }/score/`,

      {
        language,
        word, 
        value
      },
      config
    )

    dispatch({
      type:  UPDATE_WORD_SCORE_SUCCESS,
      payload: data
    })

  } catch(error) {

    dispatch({
      type: UPDATE_WORD_SCORE_FAIL,
      payload: error.message && error.response.data.detail
      ? error.response.data.detail
        : error.message
    })

  }
}