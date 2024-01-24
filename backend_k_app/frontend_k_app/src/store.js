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
} from './reducers/wordReducers';

import { 
  languageListReducer,
  activeLanguageReducer,
  addLanguageReducer,
  getCountryListReducer,
  // updateLanguageReducer,
} from './reducers/languageReducers';

import {
  addAlphabetReducer,
  characterReducer,
  notMasteredCharsReducer,
  masteredCharsReducer
} from './reducers/alphabetReducers';

import {
  getWorldReducer,
} from './reducers/worldReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userStatsReducer,
  userUpdateReducer,
  // userDeleteReducer,
  addLanguageToUserReducer,
  userWordsByLanguageReducer,
  masteredWordsReducer,
  notMasteredWordsReducer,
  activateUserReducer,
  getUserFromTokenReducer,
  submitBugReportReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  wordList: wordListReducer,
  wordRandom: wordRandomReducer,
  updateWordScore: updateWordScoreReducer,
  wordsLanguage: wordsLanguageReducer,
  wordRandomLanguage: wordRandomLanguageReducer,

  languageList: languageListReducer,
  activeLanguage: activeLanguageReducer,
  addLanguage: addLanguageReducer,
  countryList: getCountryListReducer,
  // updateLanguage: updateLanguageReducer,

  alphabetList: addAlphabetReducer,
  characterList: characterReducer,
  notMasteredChars: notMasteredCharsReducer,
  masteredChars: masteredCharsReducer,

  world: getWorldReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userStats: userStatsReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  // userDelete: userDeleteReducer,
  addLanguageToUser: addLanguageToUserReducer,
  userWordsByLanguage: userWordsByLanguageReducer,
  masteredWords: masteredWordsReducer,
  notMasteredWords: notMasteredWordsReducer,
  activateUser: activateUserReducer,
  userFromToken: getUserFromTokenReducer,

  bugReport: submitBugReportReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

export const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
})

export default store

