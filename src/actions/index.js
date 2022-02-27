import {
  MOVE_TO_NEXT_SHIP,
  ADD_NEW_SHIP,
  SET_CURRENT_POSITION,
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  SET_SUGGESTED_POSITION,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  TOGGLE_IS_CHOOSING,
  ERASE_SHIP,
  SET_CPU_FLEET,
  SET_IS_CHOOSING,
} from './types';

// this is an action creator, an action its an object like: {type,payload}
const setPlayerNameAction = (payload) => {
  return {
    type: SET_PLAYER_NAME,
    payload,
  };
};
export { setPlayerNameAction };

const moveToNextShip = (payload) => {
  return {
    type: MOVE_TO_NEXT_SHIP,
    payload,
  };
};
export { moveToNextShip };

const toggleIsStarted = () => {
  return {
    type: TOGGLE_GAME_STARTED,
  };
};
export { toggleIsStarted };

const toggleIsChoosing = () => {
  return {
    type: TOGGLE_IS_CHOOSING,
  };
};
export { toggleIsChoosing };

const setIsChoosing = (payload) => {
  return {
    type: SET_IS_CHOOSING,
    payload,
  };
};
export { setIsChoosing };

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

const eraseShip = (payload) => {
  return {
    type: ERASE_SHIP,
    payload,
  };
};
export { eraseShip };

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

const setCPUFleet = (payload) => {
  return {
    type: SET_CPU_FLEET,
    payload,
  };
};
export { setCPUFleet };
