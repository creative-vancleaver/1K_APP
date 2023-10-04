import {
  WORLD_REQUEST,
  WORLD_SUCCESS,
  WORLD_FAIL
} from '../constants/worldConstants';

const initialState = {
  data: null,
  loading: null,
  error: null,
};

export const getWorldReducer = (state = initialState, action) => {
  
  switch(action.type) {

    case WORLD_REQUEST:
      return {
        loading: true
      }

    case WORLD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };

    case WORLD_FAIL:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;

  }
};

