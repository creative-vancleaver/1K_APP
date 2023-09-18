import axios from 'axios';

import {
  LANGUAGE_LIST_REQUEST,
  LANGUAGE_LIST_SUCCESS,
  LANGUAGE_LIST_FAIL,

  SET_ACTIVE_LANGUAGE,
  CLEAR_ACTIVE_LANGUAGE,

  ADD_LANGUAGE_REQUEST,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAIL,

  GET_COUNTRY_LIST_REQUEST,
  GET_COUNTRY_LIST_SUCCESS,
  GET_COUNTRY_LIST_FAIL,

} from '../constants/languageConstants'

export const listLanguages = () => async(dispatch) => {

  try {
  
    dispatch({ type: LANGUAGE_LIST_REQUEST });

    const { data } = await axios.get('/languages/');

    dispatch({ type: LANGUAGE_LIST_SUCCESS, payload: data })

  } catch (error) {

    dispatch({
      type: LANGUAGE_LIST_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail
        : error.message
    })
  }
}

export const listCountries = () => async (dispatch, getState) => {

  try {

    dispatch({
      type: GET_COUNTRY_LIST_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    const { data } = await axios.get(
      '/countries/',
      config
      );

    dispatch({
      type: GET_COUNTRY_LIST_SUCCESS, payload: data
    })

  } catch (error) {

    dispatch({
      type: GET_COUNTRY_LIST_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail 
          : error.message
    })

  }
}

export const activeLanguage = (language) => (dispatch) => {
  
  // try {

    dispatch({
      // CLEAR PREVIOUS ACTIVE LANGUAGE BEFORE SETTING NEW ONE
      type: CLEAR_ACTIVE_LANGUAGE
    })

    dispatch({ 
      type: SET_ACTIVE_LANGUAGE,
      // payload: { language }
      payload: language
     });

  // }
}

// NOTE: GETTING PARAMS FROM FROM DATA
export const addLanguage = (language, url) => async(dispatch, getState) => {

  try {

    dispatch({
      type: ADD_LANGUAGE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/JSON',
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    const { data } = await axios.post(
      `/get1000words/`,
      // MUST PASS IN ALL FORM DATA TO BACKEND
      { 'language': language, 'url': url },
      config
    )

    dispatch({
      type: ADD_LANGUAGE_SUCCESS,
      payload: data
    })

  } catch (error) {

    dispatch({
      type: ADD_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail 
          : error.message
    })
  }
}