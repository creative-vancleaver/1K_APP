import axios from 'axios'

import {
  WORLD_REQUEST,
  WORLD_SUCCESS,
  WORLD_FAIL
}  from '../constants/worldConstants';

export const getWorld = () => async(dispatch) => {

  try {
    dispatch({ type: WORLD_REQUEST });

    const { data } = await axios.get('get_geojson/');
    console.log('world map resposne data ', data);

    dispatch({ type: WORLD_SUCCESS, payload: data });

  } catch(error) {
    dispatch({
      type: WORLD_FAIL,
      payload: error.response && error.response.data.detail ?
        error.response.data.detail 
        : error.message
    })
  }
}