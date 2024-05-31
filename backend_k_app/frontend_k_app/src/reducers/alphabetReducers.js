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

export const addAlphabetReducer = (state = { alphabets: [] }, action) => {

    switch(action.type) {

        case ADD_ALPHABET_REQUEST:
        case GET_ALL_ALPHABETS_REQUEST:
        case GET_ALL_ALPHABETS_LANGUAGE_REQUEST:   
        case GET_ALL_CHARS_LANGUAGE_REQUEST: 
            return { loading: true }

        case ADD_ALPHABET_SUCCESS:
        case GET_ALL_ALPHABETS_SUCCESS:
        case GET_ALL_ALPHABETS_LANGUAGE_SUCCESS:

            const alphabetsByType = action.payload.reduce((acc, alphabet) => {
                if (acc[alphabet.name]) {
                    acc[alphabet.name].push(alphabet.alphabet_type);
                } else {
                    acc[alphabet.name] = [alphabet.alphabet_type];
                }
                return acc;
            }, {});
            return {
                loading: false,
                success: true,
                // alphabets: action.payload
                alphabets: alphabetsByType
            }   

        // case GET_ALL_CHARS_LANGUAGE_SUCCESS:

        //     const updatedAlphabets = { ...state.alphabets };

        //     action.payload.forEach(character => {
        //         // const language = 
        //         const alphabetName = character.alphabet.name;

        //         if (!updatedAlphabets[alphabetName]) {
        //             updatedAlphabets[alphabetName] = {
        //                 name: alphabetName,
        //                 characters: []
        //             };
        //         }

        //         updatedAlphabets[alphabetName].characters.push(character)
        //     });

        //     return {
        //         ...state,
        //         alphabets: updatedAlphabets
        //     };

        case ADD_ALPHABET_FAIL:
        case GET_ALL_ALPHABETS_FAIL:
        case GET_ALL_ALPHABETS_LANGUAGE_FAIL:
        case GET_ALL_CHARS_LANGUAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const characterReducer = (state = {}, action) => {

    switch(action.type) {

        case GET_ALL_CHARS_LANGUAGE_REQUEST:
            return {
                loading: true
            };

        case GET_ALL_CHARS_LANGUAGE_SUCCESS:

            const nestedCharacters = action.payload.reduce((acc, character) => {
                const languageName = character.alphabet.language.language;
                const alphabetName = character.alphabet.name;

                if (!acc[languageName]) {
                    acc[languageName] = {};
                }

                if (!acc[languageName][alphabetName]) {
                    acc[languageName][alphabetName] = [];
                }

                acc[languageName][alphabetName].push(character);

                return acc;
            }, {});

            return {
                loading: false,
                success: true,
                // characters: action.payload
                characters: nestedCharacters
            }
        
        case GET_ALL_CHARS_LANGUAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state
    }
}

const notMasteredCharsInitialState = {
    notMasteredChars: {
        results: [],
        count: 0,
    },
    loading: false,
    error: null
};

export const notMasteredCharsReducer = (state = {}, action) => {

    switch(action.type) {

        case GET_NOT_MASTERED_USER_CHARS_REQUEST:
            return { loading: true }

        case GET_NOT_MASTERED_USER_CHARS_SUCCESS:
            return{
                loading: false,
                success: true,
                notMasteredChars: action.payload
            }

        case GET_NOT_MASTERED_USER_CHARS_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case RESET_NOT_MASTERED_CHARS:
            return state;

        default: 
            return state;
            
    }
}

export const masteredCharsReducer = (state = {}, action) => {

    switch(action.type) {

        case GET_MASTERED_USER_CHARS_REQUEST:
            return { loading: true }

        case GET_MASTERED_USER_CHARS_SUCCESS:
            return{
                loading: false,
                success: true,
                masteredChars: action.payload
            };

        case GET_MASTERED_USER_CHARS_FAIL:
            return {
                loading: false,
                error: action.paylaod
            };

        case RESET_MASTERED_CHARS:
            return state;

        default:
            return state;
    }
}
