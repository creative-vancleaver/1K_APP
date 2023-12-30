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

  UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_FAIL,

  DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_FAIL,

  GET_COUNTRY_LIST_REQUEST,
  GET_COUNTRY_LIST_SUCCESS,
  GET_COUNTRY_LIST_FAIL,

  UPDATE_LANGUAGE_DISPLAY,

} from '../constants/languageConstants';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(',');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  console.log('cookieValue = ', cookieValue);
  return cookieValue;
}

export const listLanguages = () => async(dispatch) => {

  try {
  
    dispatch({ type: LANGUAGE_LIST_REQUEST });

    const { data } = await axios.get('/api/languages/');

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

  console.log('list countriess!!!! ')

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
      '/api/languages/countries/',
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
export const addLanguage = (formData) => async(dispatch, getState) => {

  try {

    dispatch({
      type: ADD_LANGUAGE_REQUEST
    })


    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    // const formData = new FormData();
    // formData.append('language', language);
    // formData.append('url', url);
    // formData.append('countries', countries);
    // formData.append('img', img);

    const { data } = await axios.post(
      `/api/languages/get1000words/`,
      // MUST PASS IN ALL FORM DATA TO BACKEND
      // { 'language': language, 'url': url, 'countries': countries, 'img': img },
      formData,
      config
    )

    console.log(data)

    dispatch({
      type: ADD_LANGUAGE_SUCCESS,
      payload: data
    })

  } catch (error) {

    dispatch({
      type: ADD_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail 
      ? error.response.data.detail
          : error.message
    })
  }
}

export const updateLanguage = (language, formData) => async(dispatch, getState) => {

  try {

    dispatch({
      type: UPDATE_LANGUAGE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const csrfToken = getCookie('csrftoken');

    const config = {
      headers:{
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken,
        Authorization: `Bearer ${ userInfo.token }`
      }
    };

    const { data } = await axios.post(
      `/api/languages/${ language }/update/`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_LANGUAGE_SUCCESS,
      payload: data
    });

  } catch (error) {
    
    dispatch({
      type: UPDATE_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail
        ? error.response.data.detail
          : error.message
    });
  }
}

export const updateLanguageDisplay = (languages) => ({
  type: UPDATE_LANGUAGE_DISPLAY,
  payload: languages
})

export const deleteLanguageSuccess = (languageId) => ({
  type: DELETE_LANGUAGE_SUCCESS,
  payload: languageId
})

export const deleteLanguage = (language_id) => async (dispatch, getState) => {

  try {

    dispatch({
      type: DELETE_LANGUAGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ userInfo.token }`
      }
    }

    const { data } = await axios.delete(
      `/api/languages/${ language_id }/delete/`,
      config
    )

    dispatch({
      type: DELETE_LANGUAGE_SUCCESS,
      payload: language_id
    })
    
  } catch (error) {

    dispatch({
      type: DELETE_LANGUAGE_FAIL,
      payload: error.message && error.response.data.detail ?
        error.response.data.detail
          : error.message
    })

  }
}