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

    UPDATE_USER_INFO,

    USER_WORDS_LANGUAGE_REQUEST,
    USER_WORDS_LANGUAGE_SUCCESS,
    USER_WORDS_LANGUAGE_FAIL,

    MASTERED_WORDS_REQUEST,
    MASTERED_WORDS_SUCCESS,
    MASTERED_WORDS_FAIL,
    UPDATE_MASTERED_WORDS,
    MASTERED_WORDS_RESET,

    NOT_MASTERED_WORDS_REQUEST,
    NOT_MASTERED_WORDS_SUCCESS,
    NOT_MASTERED_WORDS_FAIL,
    UPDATE_NOT_MASTERED_WORDS,
    NOT_MASTERED_WORDS_RESET,

    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,

    USER_ACTIVATION_REQUEST,
    USER_ACTIVATION_SUCCESS,
    USER_ACTIVATION_FAIL,

    USER_FROM_TOKEN_REQUEST,
    USER_FROM_TOKEN_SUCCESS,
    USER_FROM_TOKEN_FAIL,

    UPDATE_USER_LIST,

} from '../constants/userConstants';
import jquery from 'jquery';

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
    return cookieValue;
}

// ADMIN ADD USER
export const addUser = (userData) => async (dispatch, getState) => {
    
    try {

        dispatch({
            type: ADD_USER_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${ userInfo.token }`,
            }
        };

        const { data } = await axios.post(
            `/api/users/add_user/`,
            userData,
            config
        );

        dispatch({
            type: ADD_USER_SUCCESS,
            payload: data
        });

    } catch (error) {

        dispatch({
            type: ADD_USER_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

// USER LOGIN
export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        console.log(email, password)

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
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
export const register = (first_name, email, password, native_language) => async (dispatch) => {
    
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        console.log('register ', config);
        const { data } = await axios.post(
            '/api/users/register/',
            { 'first_name': first_name, 'email': email, 'password': password, 'native_language': native_language },
            config
        )
        console.log('register ', data, config);
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
        console.log(error);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message && error.response.data.detail
            ? error.response.data.detail
                : error.message
        })
    }
}

export const getUserFromToken = (token) => async (dispatch) => {

    try {

        dispatch({
            type: USER_FROM_TOKEN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.get(
            `/api/users/data_from_token/${ token }/`,
            config
        );

        dispatch({
            type: USER_FROM_TOKEN_SUCCESS,
            payload: data
        });

    } catch  (error) {
        dispatch({
            type: USER_FROM_TOKEN_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        });
    }
}

export const activateUser = (token, password) => async (dispatch) => {

    try {

        dispatch({ type: USER_ACTIVATION_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/users/activate_user/${ token }/`,
            { 'password': password },
            config
        );

        dispatch({
            type: USER_ACTIVATION_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_ACTIVATION_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                    : error.message
        });
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
            // `/api/users/${ id }/`,
            `/api/users/profile/`,
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
            `/api/users/profile/update/${ userInfo.id }/`,
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
            `/api/users/${ userInfo.id }/add_lang/`,
            user,
            config
        )

        dispatch({
            type: ADD_LANGUAGE_TO_USER_SUCCESS,
            payload: data
        })

        dispatch({
            type: UPDATE_USER_INFO,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

        // I WILL NEED TO UPDATE THE USERINFO STATE HERE--- OR BETTER IN THE REDUCER

        // localStorage.setItem('userInfo', JSON.stringify(data))

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

// export const getUserStats = () => async (dispatch, getState) => {
//     console.log('stats action');

//     try {

//         dispatch({ type: USER_STATS_REQUEST})

//         const {
//             userLogin: { userInfo }
//         } = getState();

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${ userInfo.token }`
//             }
//         }

//         const { data } = await axios.get(
//             `/api/users/${ userInfo.id }/stats/`,
//             config
//         )
//         console.log('userStats Redcuer data ', data)

//         dispatch({
//             type: USER_STATS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {

//         dispatch({
//             type: USER_STATS_FAIL,
//             payload: error.message && error.response.data.detail 
//                 ? error.response.data.detail
//                 : error.message
//         })
//     }

// }

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

        // const params = {
        //     pageNumber,
        //     language
        // }

        const { data } = await axios.get(
            `/api/users/${ userInfo.id }/stats/`,
            config,
            // params
        )
        console.log('userStats Redcuer data ', data)

        dispatch({
            type: USER_STATS_SUCCESS,
            payload: data
        });

    } catch (error) {

        console.log('errror = ', error);

        dispatch({
            type: USER_STATS_FAIL,
            payload: error.message && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }

}

export const getMasteredWords = (language, offset = 0, limit = 20) => async(dispatch, getState) => {

    try {

        dispatch({ type: MASTERED_WORDS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.get(
            `/api/users/${ userInfo.id }/mastered_words/${ language }/?limit=${ limit }&offset=${ offset }`,
            config
        )

        dispatch({
            type: MASTERED_WORDS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: MASTERED_WORDS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.message.data.detail
                : error.message
        })
    }
}

export const updateMasteredWords = (words) => ({
    type: UPDATE_MASTERED_WORDS,
    payload: words,
});

export const resetMasteredWords = () => ({
    type: MASTERED_WORDS_RESET
});

export const getNotMasteredWords = (language, offset = 0 , limit = 20) => async(dispatch, getState) => {

    try {

        console.log('getNOTmasteredWords action ', offset, limit);

        dispatch({ type: NOT_MASTERED_WORDS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        console.log('GETNOTMASTEREDWORDS ACTION == ', limit, offset);

        const { data } = await axios.get(
            `/api/users/${ userInfo.id }/not_mastered/${ language }/?limit=${ limit }&offset=${ offset }`,
            config
        )

        console.log(data)

        dispatch({
            type: NOT_MASTERED_WORDS_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: NOT_MASTERED_WORDS_FAIL,
            payload: error.message && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const updateNotMasteredWords = (words) => ({
    type: UPDATE_NOT_MASTERED_WORDS,
    payload: words,
});

export const resetNotMasteredWords = () => ({
    type: NOT_MASTERED_WORDS_RESET
});

export const getUserWordsByLanguage = (language,  offset = 0, limit = 20) => async (dispatch, getState) => {
    // pageNumber = 1, 
    // limit = 10
    try {

        dispatch({ type: USER_WORDS_LANGUAGE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState();

        // const limit = 10;
        // const offset = (pageNumber - 1) * limit;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.get(
            // `/api/users/${ userInfo.id }/user_words/${ language }/?page=${ pageNumber }`,
            `/api/users/${ userInfo.id }/user_words/${ language }/?limit=${ limit }&offset=${ offset }`,
            config
        )

        console.log('RESPONSE DATA ++_ ', data);

        dispatch({
            type: USER_WORDS_LANGUAGE_SUCCESS,
            payload: data,
            // offset: offset
        })

    } catch (error) {

        dispatch({
            type: USER_WORDS_LANGUAGE_FAIL,
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

        const { data } =  await axios.get('/api/users/', config);
        console.log('data ', data);

        dispatch({ 
            type: USER_LIST_SUCCESS,
            payload: data })

    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.message && error.response.data.detail ?
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

        const csrfToken = getCookie('csrftoken');

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'X-CSRFToken': csrfToken,
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.delete(
            // `/api/users/delete/${ id }`,
            `/api/users/${ id }/delete/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: id
        })

    } catch (error) {
        
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.message && error.response.data.detail ?
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
            `/api/users/${ user.id }/update/`,
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

export const updateUserList = (users) => ({
    type: UPDATE_USER_LIST,
    payload: users
});

export const deleteUserSuccess = (user_id) => ({
    type: USER_DELETE_SUCCESS,
    payload: user_id
});

