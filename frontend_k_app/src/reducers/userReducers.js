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

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    ADD_LANGUAGE_TO_USER_REQUEST,
    ADD_LANGUAGE_TO_USER_SUCCESS,
    ADD_LANGUAGE_TO_USER_FAIL,
} from '../constants/userConstants';

// USER LOGIN REDUCER
export const userLoginReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_LOGIN_REQUEST:    
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state

    }
}

// USER REGISTER REDUCER
export const userRegisterReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_REGISTER_FAIL:
            return {}

        default:
            return state
    }
}

// SET USER PROFILE
export const userDetailsReducer = (state = { user: {} }, action) => {

    switch(action.type){

        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:  
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state

    }
}

export const userUpdateProfileReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

// NOTE: STATS NEEDS TO BE AN ARRAY BECAUSE WE ARE USING MAP + REDUCE ON IT!! NOT SURE HOW IT WORKED EARLIER.
export const userStatsReducer = (state = { stats: [] }, action) => {
    console.log('stast redcuer');

    switch(action.type) {

        case USER_STATS_REQUEST:
            return { ...state, loading: true}

        case USER_STATS_SUCCESS:
            return { ...state, loading: false, stats: action.payload }

        case USER_STATS_FAIL:
            return { ...state, loading: false, error: action.payload }

        case USER_STATS_RESET:
            return {}

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {

    switch(action.type) {

        case USER_LIST_REQUEST: 
            return { loading: true }

        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        // console.log('users in reducer ', users);

        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;

    } 
}

export const userUpdateReducer = (state = { user: {} }, action) => {

    switch(action.type) {

        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const addLanguageToUserReducer = (state = { user: { languages: [] }  }, action) => {

    switch(action.type) {

        case ADD_LANGUAGE_TO_USER_REQUEST:
            return { loading: true }

        case ADD_LANGUAGE_TO_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                ...state,
                // user: [...state.user, action.payload]
                languages: action.payload
            }

        case ADD_LANGUAGE_TO_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state

    }

}

export const userDeleteReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_DELETE_REQUEST:
            return { loading: true}

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
