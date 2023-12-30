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

} from '../constants/languageConstants'
import { WORD_LIST_FAIL } from '../constants/wordConstants'

export const languageListReducer = (state = { languages: [] }, action) => {

  switch(action.type) {

    case LANGUAGE_LIST_REQUEST:
    case UPDATE_LANGUAGE_REQUEST:
    case DELETE_LANGUAGE_REQUEST:
      return { loading: true, languages: [] }

    case LANGUAGE_LIST_SUCCESS:
      return { loading: false, success: true, languages: action.payload }

    case LANGUAGE_LIST_FAIL:
    case UPDATE_LANGUAGE_FAIL:
    case DELETE_LANGUAGE_FAIL:
      return { loading: false, success: false, error: action.payload }

    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: state.languages.map(language => 
          language.id === action.payload.id ? action.payload : language)
      }

    case UPDATE_LANGUAGE_DISPLAY:
      return {
        ...state,
        languages: action.payload
      }
      // return {
      //   ...state,
      //   languages: {
      //     ...state.languages
      //   }
      // }

    case DELETE_LANGUAGE_SUCCESS:
      return state
      // return {
      //   ...state,
      //   langauges: state.languages.filter(language => language.id !== action.payload)
      // }

    default:
      return state

  } 
}

export const getCountryListReducer = (state = { countries: [] }, action) => {

  switch(action.type) {

    case GET_COUNTRY_LIST_REQUEST:
      return {
        loading: true, 
      }

    case GET_COUNTRY_LIST_SUCCESS: 
      console.log('getCountryListReducer ', action.payload)
      return {
        loading: false,
        success: true,
        countries: action.payload
      }

    case GET_COUNTRY_LIST_FAIL: 
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const activeLanguageReducer = (state = { language: {} }, action) => {

  switch(action.type) {

    case SET_ACTIVE_LANGUAGE:

      // const selectedLanguage = state.languages.find(language => languages.language === action.payload);
      // const selectedLanguage = state.languages.find(language => language.language == action.payload)

      return { loading: false, language: action.payload }
      // return {
      //   ...state,
      //   language: selectedLanguage
      // }
    
    case CLEAR_ACTIVE_LANGUAGE: 
      return { loading: false, language: '' }

    default:
      return state;
  }

}

export const addLanguageReducer = (state = { languages: [] }, action) => {

  switch(action.type) {

    case ADD_LANGUAGE_REQUEST:
      return { loading: true }

    case ADD_LANGUAGE_SUCCESS:

      // const lang = action.payload;
      // const existLang = state.languages.find(x => x.langauge == lang.language)

      // if(existLang) {

      //   return {
      //     loading: false,
      //     success: false,
      //     ...state,
      //     // languages: state.languages.map(x => x.language === lang.language ? lang : x)
      //   }

      // } else {

      return {
        loading: false,
        success: true,
        // ...state,
        // languages: [...state.languages, action.payload]
        langauges: action.payload
      }

      // }

    case ADD_LANGUAGE_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    default:
      return state

  }
}

// export const updateLanguageReducer = (state = { languages: [] }, action) => {

//   switch(action.type) {

//     case UPDATE_LANGUAGE_REQUEST:
//       return { loading: true }

//     case UPDATE_LANGUAGE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         // languages: action.payload
//         languages: state.languages.map(language => language.id === action.payload.id ? action.payload : language)
//       }

//     case UPDATE_LANGUAGE_FAIL:
//       return {
//         loading: false,
//         error: action.payload
//       }

//     default:
//       return state
//   }
// }