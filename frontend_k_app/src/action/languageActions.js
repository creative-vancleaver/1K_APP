import axios from 'axios';

import {
  LANGUAGE_LIST_REQUEST,
  LANGUAGE_LIST_SUCCESS,
  LANGUAGE_LIST_FAIL,

  SET_ACTIVE_LANGUAGE,
  CLEAR_ACTIVE_LANGUAGE,

} from '../constants/languageConstants'

export const listLanguages = () => async(dispatch) => {

  try {
  
    dispatch({ type: LANGUAGE_LIST_REQUEST });

    const { data } = await axios.get('languages/');

    dispatch({ type: LANGUAGE_LIST_SUCCESS, payload: data })

  } catch (error) {

    dispatch({
      type: LANGUAGE_LIST_FAIL,
      payload: error.response && error.response.data.detail ?
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