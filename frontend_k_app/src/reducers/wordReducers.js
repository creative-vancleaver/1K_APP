import {
  WORD_LIST_REQUEST,
  WORD_LIST_SUCCESS,
  WORD_LIST_FAIL,
  WORD_LIST_RESET,

  WORD_RANDOM_REQUEST,
  WORD_RANDOM_SUCCESS,
  WORD_RANDOM_FAIL,
  WORD_RANDOM_RESET,

  UPDATE_WORD_SCORE_REQUEST,
  UPDATE_WORD_SCORE_SUCCESS,
  UPDATE_WORD_SCORE_FAIL,
  UPDATE_WORD_SCORE_RESET,

  WORD_LANGUAGE_REQUEST,
  WORD_LANGUAGE_SUCCESS,
  WORD_LANGUAGE_FAIL,

  WORD_RANDOM_LANGUAGE_REQUEST,
  WORD_RANDOM_LANGUAGE_SUCCESS,
  WORD_RANDOM_LANGUAGE_FAIL,

} from '../constants/wordConstants'

// BECAUSE WE PLAN ON MAPPING OVER THIS DATA MUST PASS IT IN AS ARRAY!
// .map IS AN ARRAY FUNCTION + WILL NOT WORK ON OBJECTS
export const wordListReducer = (state = { words: [] }, action) => {

  switch(action.type) {
    
    case WORD_LIST_REQUEST:
      return { loading: true, words: []}

    case WORD_LIST_SUCCESS:
      return { loading: false, success: true, words: action.payload }

    case WORD_LIST_FAIL:
      return { loading: false, success: false, error: action.payload }

    case WORD_LIST_RESET:
      return { ...state }

    default: 
      return state

  }
}

export const wordsLanguageReducer = (state = { words: [] }, action) => {
  
  switch(action.type) {

    case WORD_LANGUAGE_REQUEST:
      return { loading: true, words: [] }

    case WORD_LANGUAGE_SUCCESS:
      return { loading: false, words: action.payload }

    case WORD_LANGUAGE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }

}

export const wordRandomReducer = (state = { word: {} }, action) => {

  switch(action.type) {

    case WORD_RANDOM_REQUEST:
      return { loading: true, word: [] }

    case WORD_RANDOM_SUCCESS:
      return { loading: false, word: action.payload }

    case WORD_RANDOM_FAIL:
      return { loading: false, erorr: action.payload }

    case WORD_RANDOM_RESET:
      return { word: {} }

    default:
      return state

  }
}

export const wordRandomLanguageReducer = (state = { word: {} }, action) => {

  switch(action.type) {

    case WORD_RANDOM_LANGUAGE_REQUEST:  
      return { loading: true, word: [] }

    case WORD_RANDOM_LANGUAGE_SUCCESS:
      return { loading: false, word: action.payload }

    case WORD_RANDOM_LANGUAGE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state

  }
}

export const updateWordScoreReducer = (state = { word: {} }, action) => {

  switch(action.type) {

    case UPDATE_WORD_SCORE_REQUEST:
      return { loading: true }
    
    case UPDATE_WORD_SCORE_SUCCESS:
      return { loading: false, success: true, word: action.payload }

    case UPDATE_WORD_SCORE_FAIL:
      return { loading: false, error: action.payload }

    case UPDATE_WORD_SCORE_RESET:
      return { word: {} }

    default:
      return state

  }
}