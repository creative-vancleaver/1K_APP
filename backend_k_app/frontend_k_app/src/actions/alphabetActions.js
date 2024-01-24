import axios from 'axios';

import {

    ADD_ALPHABET_REQUEST,
    ADD_ALPHABET_SUCCESS,
    ADD_ALPHABET_FAIL,

    GET_ALL_ALPHABETS_REQUEST,
    GET_ALL_ALPHABETS_SUCCESS,
    GET_ALL_ALPHABETS_FAIL,

    GET_ALL_ALPHABETS_LANGUAGE_REQUEST,
    GET_ALL_ALPHABETS_LANGUAGE_SUCCESS,
    GET_ALL_ALPHABETS_LANGUAGE_FAIL,

    GET_ALL_CHARS_LANGUAGE_REQUEST,
    GET_ALL_CHARS_LANGUAGE_SUCCESS,
    GET_ALL_CHARS_LANGUAGE_FAIL,

    GET_NOT_MASTERED_USER_CHARS_REQUEST,
    GET_NOT_MASTERED_USER_CHARS_SUCCESS,
    GET_NOT_MASTERED_USER_CHARS_FAIL,
    RESET_NOT_MASTERED_CHARS,

    GET_MASTERED_USER_CHARS_REQUEST,
    GET_MASTERED_USER_CHARS_SUCCESS,
    GET_MASTERED_USER_CHARS_FAIL,
    RESET_MASTERED_CHARS,

} from '../constants/alphabetConstants';

export const addAlphabet = (language, formData) => async(dispatch, getState) => {

    try {
        
        dispatch({
            type: ADD_ALPHABET_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.post(
            `/api/languages/${ language }/alphabet/add/`,
            formData,
            config
        );

        dispatch({
            type: ADD_ALPHABET_SUCCESS,
            payload: data
        });

    } catch (error) {

        let errorMessage = 'An unexpected error occured.';

        if (error.response && error.response.data && error.response.data.detail) {
            errorMessage = error.response.data.detail;
        } else if (error.message) {
            errorMessage = error.message;
        }

        dispatch({
            type: ADD_ALPHABET_FAIL,
            payload: errorMessage
        });
    }
}

export const getAllAlphabets = () => async(dispatch, getState) => {

    try {

        dispatch({
            type: GET_ALL_ALPHABETS_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(
            `/api/languages/alphabet/`,
            config
        );

        dispatch({
            type: GET_ALL_ALPHABETS_SUCCESS,
            payload: data
        });

    } catch (error) {

        dispatch({
            type: GET_ALL_ALPHABETS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        });

    }
}

export const getAllAlphabetsLanguage = (language) => async(dispatch, getState) => {

    try {

        dispatch({
            type: GET_ALL_ALPHABETS_LANGUAGE_REQUEST
        });

        const { 
            userLogin: { userInfo }
         } = getState();
         
         const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
         };

         const { data } = await axios.get(
            `/api/languages/${ language }/alphabet/get_all/`,
            config
         );

         dispatch({
            type: GET_ALL_ALPHABETS_LANGUAGE_SUCCESS,
            payload: data
         });

    } catch (error) {

        dispatch({
            type: GET_ALL_ALPHABETS_LANGUAGE_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        })
    }
}

export const getAllCharsLanguage = (language) => async (dispatch, getState) => {

    try {

        dispatch({
            type: GET_ALL_CHARS_LANGUAGE_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(
            `/api/languages/${ language }/characters/all/`,
            config
        );

        dispatch({
            type: GET_ALL_CHARS_LANGUAGE_SUCCESS,
            payload: data
        });

    } catch (error) {

        console.log(error);

        dispatch({
            type: GET_ALL_CHARS_LANGUAGE_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        });
    }
}

export const getNotMasteredCharacters = (language) => async (dispatch, getState) => {

    try {

        dispatch({
            type: GET_NOT_MASTERED_USER_CHARS_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(
            `/api/users/${ userInfo.id }/not_mastered_characters/${ language }/`,
            config
        )

        dispatch({
            type: GET_NOT_MASTERED_USER_CHARS_SUCCESS,
            payload: data
        });

    } catch (error) {

        dispatch({
            type: GET_NOT_MASTERED_USER_CHARS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        });
    }
}

export const resetNotMasteredChars = () => ({
    type: RESET_NOT_MASTERED_CHARS
});

export const getMasteredCharacters = (language) => async (dispatch, getState) => {

    try {

        dispatch({
            type: GET_MASTERED_USER_CHARS_REQUEST,
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        };

        const { data } = await axios.get(
            `/api/users/${ userInfo.id }/mastered_characters/${ language }/`,
            config
        );

        dispatch({
            type: GET_MASTERED_USER_CHARS_SUCCESS,
            payload: data
        });

    } catch (error) {
        
        dispatch({
            type: GET_MASTERED_USER_CHARS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        })

    }
}

export const resetMasteredChars = () => ({
    type: RESET_MASTERED_CHARS
});