import {
  ADD_NEW_SHIP,
  SET_CURRENT_POSITION,
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  SET_SUGGESTED_POSITION,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
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

const toggleIsSuggestedHorizontal = () => {
  return {
    type: TOGGLE_IS_SUGGESTED_HORIZONTAL,
  };
};
export { toggleIsSuggestedHorizontal };

const addNewShip = (payload) => {
  return {
    type: ADD_NEW_SHIP,
    payload,
  };
};
export { addNewShip };

const setCurrentPosition = (payload) => {
  return {
    type: SET_CURRENT_POSITION,
    payload,
  };
};
export { setCurrentPosition };

const setSuggestedPosition = (payload) => {
  return {
    type: SET_SUGGESTED_POSITION,
    payload,
  };
};
export { setSuggestedPosition };
