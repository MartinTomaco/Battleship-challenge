import {
  ADD_NEW_SHIP_PART, SET_CURRENT_POSITION, SET_PLAYER_NAME, TOGGLE_GAME_STARTED,
} from './types';

// this is an action creator, an action its an object like: {type,payload}
const setPlayerNameAction = (payload) => {
  return {
    type: SET_PLAYER_NAME,
    payload,
  };
};
export { setPlayerNameAction };

const toggleIsStarted = () => {
  return {
    type: TOGGLE_GAME_STARTED,
  };
};
export { toggleIsStarted };

const addNewShipPart = (payload) => {
  return {
    type: ADD_NEW_SHIP_PART,
    payload,
  };
};
export { addNewShipPart };

const setCurrentPosition = (payload) => {
  return {
    type: SET_CURRENT_POSITION,
    payload,
  };
};
export { setCurrentPosition };
