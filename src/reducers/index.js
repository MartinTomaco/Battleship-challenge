import {
  SET_PLAYER_NAME, TOGGLE_GAME_STARTED, ADD_NEW_SHIP_PART, SET_CURRENT_POSITION,
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
  suggestedPositions: [],
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
    case ADD_NEW_SHIP_PART: {
      const newPlayerBoard = [...state.playerBoard];
      newPlayerBoard[action.payload.position] = action.payload.shipType;
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
    default:
      return state;
  }
};

export default reducer;
