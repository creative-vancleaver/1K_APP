import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'

// REDUCERS
import { 
  wordListReducer, 
  wordRandomReducer,
  updateWordScoreReducer,
  wordsLanguageReducer,
  wordRandomLanguageReducer,
} from './reducers/wordReducers'

import { 
  languageListReducer,
  activeLanguageReducer,
} from './reducers/languageReducers'

import {
  getWorldReducer,
} from './reducers/worldReducers';

const reducer = combineReducers({
  wordList: wordListReducer,
  wordRandom: wordRandomReducer,
  updateWordScore: updateWordScoreReducer,
  wordsLanguage: wordsLanguageReducer,
  wordRandomLanguage: wordRandomLanguageReducer,

  languageList: languageListReducer,
  activeLanguage: activeLanguageReducer,

  world: getWorldReducer,

})

export const initialState = {}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
})

export default store

