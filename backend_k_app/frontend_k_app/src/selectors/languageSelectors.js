export const getLanguageByName = (state, languageName) => {
  return state.languageList.languages.find(language => language.language === languageName);
};