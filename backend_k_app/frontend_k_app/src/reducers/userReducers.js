import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    UPDATE_USER_INFO,

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

    USER_WORDS_LANGUAGE_REQUEST,
    USER_WORDS_LANGUAGE_SUCCESS,
    USER_WORDS_LANGUAGE_FAIL,
    USER_WORDS_LANGUAGE_RESET,

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

    SUBMIT_BUG_REPORT_REQUEST,
    SUBMIT_BUG_REPORT_SUCCESS,
    SUBMIT_BUG_REPORT_FAIL,

    UPDATE_CONFIRM_RULES_REQUEST,
    UPDATE_CONFIRM_RULES_SUCCESS,
    UPDATE_CONFIRM_RULES_FAIL,

} from '../constants/userConstants';
import { initialState } from '../store';

// USER LOGIN REDUCER
export const userLoginReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_LOGIN_REQUEST:    
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case UPDATE_USER_INFO:
            return {
                loading: false,
                userInfo: action.payload
            }
        
        // case UPDATE_CONFIRM_RULES_SUCCESS:
        //     // localStorage.setItem('userInfo', JSON.stringify({ ...state, userInfo: action.payload }));
        //     return {
        //         ...state,
        //         userInfo: action.payload
        //     }

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

export const getUserFromTokenReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_FROM_TOKEN_REQUEST:
            return {
                loading: true
            };

        case USER_FROM_TOKEN_SUCCESS:
            return {
                loading: false,
                success: true,
                userData: action.payload
            };

        case USER_FROM_TOKEN_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

export const activateUserReducer = (state = {}, action) => {

    switch(action.type) {

        case USER_ACTIVATION_REQUEST:
            return {
                loading: true
            };

        case USER_ACTIVATION_SUCCESS:
            return {
                loading: false, 
                success: true,
                userInfo: action.payload
            };

        case USER_ACTIVATION_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

// SET USER PROFILE
export const userDetailsReducer = (state = { user: {} }, action) => {

    switch(action.type){

        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:  
            return { loading: false, user: action.payload, success: true }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload, success: false}

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

export const updateConfirmedRulesReducer = (state = { userInfo: {} }, action) => {
    switch(action.type) {
        case UPDATE_CONFIRM_RULES_REQUEST:
            return { loading: true }

        case UPDATE_CONFIRM_RULES_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }

        case UPDATE_CONFIRM_RULES_FAIL:
            return { loading: false, erorr: action.payload }

        default:
            return state
    }
}

// NOTE: STATS NEEDS TO BE AN ARRAY BECAUSE WE ARE USING MAP + REDUCE ON IT!! NOT SURE HOW IT WORKED EARLIER.
export const userStatsReducer = (state = { stats: [] }, action) => {
    // console.log('stast redcuer');

    switch(action.type) {

        case USER_STATS_REQUEST:
            return { ...state, loading: true}

        case USER_STATS_SUCCESS:

            const restructuredStats = action.payload.reduce((acc, stat) => {
                // const languageName = stat.user_word.language.language;
                // // console.log('stat ==== ', stat);
                const languageName = stat.language;
                if (!acc[languageName]) {
                    // acc[languageName] = { user_words: [] };
                    acc[languageName] = { mastered: [], learning: [] };
                }
                // acc[languageName].user_words.push(stat.user_word);
                if (stat.isMastered) {
                    acc[languageName].mastered.push(stat.user_word);
                } else {
                    acc[languageName].learning.push(stat.user_word);
                }
                return acc;
            }, {});

            return { ...state, loading: false, stats: restructuredStats, success: true }

        case USER_STATS_FAIL:
            return { ...state, loading: false, error: action.payload, success: false }

        case USER_STATS_RESET:
            return {}

        default:
            return state
    }
}

// const initialState = {
//     notMasteredWords: [],
//     masteredWords: [],
// };

const masteredWordsInitialState = {
    masteredWords: {
        results: [],
        count: 0,
    },
    // masteredWordsOffset: 0,
    loading: false,
    error: null
};

export const masteredWordsReducer = (state = masteredWordsInitialState, action) => {

    switch(action.type) {

        case MASTERED_WORDS_REQUEST:
            return { ...state, loading: true }

        case MASTERED_WORDS_SUCCESS:

            return {
                ...state,
                loading: false,
                masteredWords: {
                    ...state.masteredWords,
                    results: [...state.masteredWords.results, ...action.payload.results],
                    count: action.payload.count,
                }
                // masteredWordsOffset: state.masteredWordsOffset + action.payload.length
            };

        case UPDATE_MASTERED_WORDS:
            return {
                ...state,
                masteredWords: {
                    ...state.masteredWords,
                    // results: [...state.masteredWords.results, ...action.payload]
                    results: action.payload
                }
            };

        case MASTERED_WORDS_RESET:
            return masteredWordsInitialState;

        case MASTERED_WORDS_FAIL:
            return {...state, loading: false, error: action.payload }

        default:
            return state
    }
}

const notMasteredInitialState = {
    notMasteredWords: {
        results: [],
        count: 0,
    },
    // notMasteredOffset: 0,
    loading: false,
    error: null
};

export const notMasteredWordsReducer = (state = notMasteredInitialState, action) => {

    switch(action.type) {

        case NOT_MASTERED_WORDS_REQUEST:
            return { ...state, loading: true }

        case NOT_MASTERED_WORDS_SUCCESS:

            // // console.log('payload lenght = ', action.payload.results.length);
            // console.log('action.payload.total_count ', action.payload);

            return {
                ...state,
                loading: false,
                notMasteredWords: {
                    ...state.notMasteredWords,
                    results: [...state.notMasteredWords.results, ...action.payload.results],
                    count: action.payload.count,
                }
                // notMasteredOffset: state.notMasteredOffset + action.payload.results.length
            };

        case NOT_MASTERED_WORDS_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };

        case UPDATE_NOT_MASTERED_WORDS:
            return {
                ...state,
                notMasteredWords: {
                    ...state.notMasteredWords,
                    // results: [...state.notMasteredWords.results, ...action.payload]
                    results: action.payload
                }
            };

        case NOT_MASTERED_WORDS_RESET:
            return notMasteredInitialState;

        default:
            return state
    }
}

export const userWordsByLanguageReducer = (state = { userWords: [] }, action) => {

    switch(action.type) {

        case USER_WORDS_LANGUAGE_REQUEST:  
            return { ...state, loading: true }

        case USER_WORDS_LANGUAGE_SUCCESS:

        // const isAppending = action.offset > 0;
        const isAppending = state.userWords.length > 0;
        const newWords = isAppending ? state.userWords.concat(action.payload)
            : action.payload;

            return { ...state, loading: false, userWords: newWords, success: true }

        case USER_WORDS_LANGUAGE_FAIL:
            return { ...state, loading: false, error: action.payload, success: false }

        case USER_WORDS_LANGUAGE_RESET:
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

        case ADD_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case UPDATE_USER_LIST:
            return {
                ...state,
                users: action.payload
            }

        case USER_DELETE_SUCCESS:
            return state;
            // return {
            //     ...state,
            //     users: state.users.filter(user => user.id !== action.payload)
            // };

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
                success: false,
                error: action.payload
            }

        default:
            return state

    }

}

export const submitBugReportReducer = (state = {}, action) => {

    switch(action.type) {

        case SUBMIT_BUG_REPORT_REQUEST:
            return { loading: true }

        case SUBMIT_BUG_REPORT_SUCCESS:
            return {
                loading: false,
                success: true,
                bugReport: action.payload
            }

        case SUBMIT_BUG_REPORT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
            
    }
}

// export const userDeleteReducer = (state = {}, action) => {

//     switch(action.type) {

//         case USER_DELETE_REQUEST:
//             return { loading: true}

//         case USER_DELETE_SUCCESS:
//             return { loading: false, success: true }

//         case USER_DELETE_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }