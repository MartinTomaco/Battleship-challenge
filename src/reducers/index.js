import {
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  ADD_NEW_SHIP,
  SET_CURRENT_POSITION,
  SET_SUGGESTED_POSITION,
} from '../actions/types';

const INITIAL_STATE = {
  isPlayer: true,
  value: '',
  playerBoard: Array(100).fill(0),
  cpuBoard: Array(100).fill(0),
  playerName: '',
  isStarted: false,
  currentPos: [],
  previousPos: [],
  currentMousePos: [],
  currentShipLength: 4,
  isSuggestedHorizontal: false,
  suggestedPositions: [],
  forbiddenPositions: [],
};

// eslint-disable-next-line default-param-last
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
      };
    case TOGGLE_GAME_STARTED:
      return {
        ...state,
        isStarted: !state.isStarted,
      };
    case TOGGLE_IS_SUGGESTED_HORIZONTAL:
      return {
        ...state,
        isSuggestedHorizontal: !state.isSuggestedHorizontal,
      };
    case ADD_NEW_SHIP: {
      const { currentShipLength, suggestedPositions } = state;
      const newPlayerBoard = [...state.playerBoard];
      for (let index = 0; index < currentShipLength; index += 1) {
        newPlayerBoard[suggestedPositions[index]] = action.payload.shipType;
      }
      return {
        ...state,
        playerBoard: newPlayerBoard,
      };
    }
    case SET_CURRENT_POSITION: {
      return {
        ...state,
        previousPos: state.currentPos,
        currentPos: action.payload,
      };
    }
    case SET_SUGGESTED_POSITION: {
      const { isSuggestedHorizontal } = state;
      const { currentMousePos } = action.payload;
      const shipLength = 4;
      const newSuggestedPositions = [];
      if (isSuggestedHorizontal) {
        for (let index = 0; index < shipLength; index += 1) {
          newSuggestedPositions.push(currentMousePos + index);
        }
      } else {
        for (let index = 0; index < shipLength; index += 1) {
          newSuggestedPositions.push(currentMousePos + index * 10);
        }
      }
      return {
        ...state,
        suggestedPositions: newSuggestedPositions,
      };
    }
    default:
      return state;
  }
};

export default reducer;
