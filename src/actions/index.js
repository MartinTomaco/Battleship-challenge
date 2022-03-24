import {
  MOVE_TO_NEXT_SHIP,
  SET_CURRENT_SHIP,
  ADD_NEW_SHIP,
  SET_CURRENT_POSITION,
  SET_CURRENT_CPU_MOVE,
  SET_NEXTS_CPU_MOVES,
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  SET_SUGGESTED_POSITION,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  TOGGLE_IS_CHOOSING,
  TOGGLE_IS_CPU_FLEET_VISIBLE,
  ERASE_SHIP,
  SET_AUTO_CPU_SUGGEST_POSITION,
  SET_IS_CHOOSING,
  SET_IS_PLAYER,
  SET_SCREEN_TO_SHOW,
  SET_ADDED_CLASSES,
  SET_SHIP_STATUS,
  CHECK_SHIP_STATUS,
  SET_MESSAGE_TO_SHOW,
  SET_IS_GAME_FINISHED,
} from './types';

// this is an action creator, an action its an object like: {type,payload}
const setPlayerName = (payload) => {
  return {
    type: SET_PLAYER_NAME,
    payload,
  };
};
export { setPlayerName };

const setMessageToShow = (payload) => {
  return {
    type: SET_MESSAGE_TO_SHOW,
    payload,
  };
};
export { setMessageToShow };

const setAddedClassed = (payload) => {
  return {
    type: SET_ADDED_CLASSES,
    payload,
  };
};
export { setAddedClassed };

const setShipStatus = (payload) => {
  return {
    type: SET_SHIP_STATUS,
    payload,
  };
};
export { setShipStatus };

const checkShipStatus = (payload) => {
  return {
    type: CHECK_SHIP_STATUS,
    payload,
  };
};
export { checkShipStatus };

const moveToNextShip = (payload) => {
  return {
    type: MOVE_TO_NEXT_SHIP,
    payload,
  };
};
export { moveToNextShip };

const setCurrentShip = (payload) => {
  return {
    type: SET_CURRENT_SHIP,
    payload,
  };
};
export { setCurrentShip };

const toggleIsStarted = () => {
  return {
    type: TOGGLE_GAME_STARTED,
  };
};
export { toggleIsStarted };

const toggleIsCpuFleetVisible = () => {
  return {
    type: TOGGLE_IS_CPU_FLEET_VISIBLE,
  };
};
export { toggleIsCpuFleetVisible };

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

const setIsGameFinished = (payload) => {
  return {
    type: SET_IS_GAME_FINISHED,
    payload,
  };
};
export { setIsGameFinished };

const setIsPlayer = (payload) => {
  return {
    type: SET_IS_PLAYER,
    payload,
  };
};
export { setIsPlayer };

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

const setCurrentCpuMove = (payload) => {
  return {
    type: SET_CURRENT_CPU_MOVE,
    payload,
  };
};
export { setCurrentCpuMove };

const setNextsCpuMoves = (payload) => {
  return {
    type: SET_NEXTS_CPU_MOVES,
    payload,
  };
};
export { setNextsCpuMoves };

const setSuggestedPosition = (payload) => {
  return {
    type: SET_SUGGESTED_POSITION,
    payload,
  };
};
export { setSuggestedPosition };

const setAutoCpuSuggestPosition = (payload) => {
  return {
    type: SET_AUTO_CPU_SUGGEST_POSITION,
    payload,
  };
};
export { setAutoCpuSuggestPosition };

const setScreenToShow = (payload) => {
  return {
    type: SET_SCREEN_TO_SHOW,
    payload,
  };
};
export { setScreenToShow };
