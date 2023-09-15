import axios from 'axios';

import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_STATS_REQUEST,
    USER_STATS_SUCCESS,
    USER_STATS_FAIL,
    USER_STATS_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

    ADD_LANGUAGE_TO_USER_REQUEST,
    ADD_LANGUAGE_TO_USER_SUCCESS,
    ADD_LANGUAGE_TO_USER_FAIL,
} from '../constants/userConstants';
import jquery from 'jquery';

// USER LOGIN
export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/users/login/',
            { 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,   
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

// USER LOGOUT
export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    console.log('dis', dispatch);
}

// first_name, last_name
export const register = (first_name, last_name, email, password) => async (dispatch) => {
    
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/JSON'
            }
        }

        const { data } = await axios.post(
            '/users/register/',
            { 'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
                : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {

    try {

        dispatch({ type: USER_DETAILS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.get(
            `/users/${ id }/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
        
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log('userLogin from updateUserProfile action');

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } =  await axios.put(
            `/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.message && error.response.data.detail 
            ? error.response.data.detail 
                : error.message
        })

    }
}

export const addUserLanguage = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ADD_LANGUAGE_TO_USER_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log('userinfo addUserLang ', userInfo.token)

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ userInfo.token }` 
            }
        }

        const { data } = await axios.put(
            `/users/${ userInfo.id }/add_lang/`,
            user,
            config
        )

        dispatch({
            type: ADD_LANGUAGE_TO_USER_SUCCESS,
            payload: data
        })

        // I WILL NEED TO UPDATE THE USERINFO STATE HERE--- OR BETTER IN THE REDUCER

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: ADD_LANGUAGE_TO_USER_FAIL,
            payload: error.message 
            // && error.response.data.detail ? 
            //     error.response.data.detail 
            //      : error.message
        })
    }
}

export const getUserStats = () => async (dispatch, getState) => {
    console.log('stats action');

    try {

        dispatch({ type: USER_STATS_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.get(
            `/users/${ userInfo.id }/stats`,
            config
        )
        console.log('userStats Redcuer data ', data)

        dispatch({
            type: USER_STATS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_STATS_FAIL,
            payload: error.message && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }

}

export const listUsers = () => async (dispatch, getState) => {

    try {
        // const {
        //     userLogin: { userInfo },
        // } = getState()
        // console.log(userInfo.token);

        dispatch({ type: USER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } =  await axios.get('/users/', config);
        console.log('data ', data);

        dispatch({ 
            type: USER_LIST_SUCCESS,
            payload: data })

    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail
                : error.message
        })

    }
}

export const deleteUser = (id) => async (dispatch, getState) => {

    try {
        
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log('user login ', userInfo)

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.delete(
            // `/users/delete/${ id }`,
            `/users/${ id }/delete`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: USER_DELETE_FAIL,
            paylaod: error.response && error.response.data.detail ?
                error.response.data.detail 
                : error.message
        })

    }
}

export const updateUser = (user) => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.put(
            // `users/all/update/${ user.id }/`,
            `/users/${ user.id }/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.message && error.response.data.detail ?
                error.response.data.detail 
                    : error.message
        })
    }
}