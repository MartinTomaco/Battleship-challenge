import {
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  ADD_NEW_SHIP,
  SET_CURRENT_POSITION,
  SET_SUGGESTED_POSITION,
  ERASE_SHIP,
  MOVE_TO_NEXT_SHIP,
} from '../actions/types';

const INITIAL_STATE = {
  isPlayer: true,
  playerBoard: Array(100).fill(0),
  cpuBoard: Array(100).fill(0),
  shipOrder: ['4', '3a', '3b', '3c', '2'],
  playerName: '',
  isStarted: false,
  currentPos: [],
  previousPos: [],
  currentMousePos: [],
  currentShipType: '4',
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
        isStarted: !state.isStarted, // It should execute MOVE_TO_NEXT_SHIP?
      };
    case MOVE_TO_NEXT_SHIP: {
      const { shipOrder, currentShipType } = state;
      const index = shipOrder.indexOf(currentShipType);
      if (index + 1 < shipOrder.length) {
        return {
          ...state,
          currentShipType: shipOrder[index + 1],
        };
      }
      console.log('All player\'s ships has been located');
      return {
        ...state,
      };
    }
    case TOGGLE_IS_SUGGESTED_HORIZONTAL:
      return {
        ...state,
        isSuggestedHorizontal: !state.isSuggestedHorizontal,
      };
    case ADD_NEW_SHIP: {
      const { currentShipType, suggestedPositions } = state;
      const newPlayerBoard = [...state.playerBoard];
      for (let index = 0; index < parseInt(currentShipType, 10); index += 1) {
        newPlayerBoard[suggestedPositions[index]] = currentShipType;
      }
      return {
        ...state,
        playerBoard: newPlayerBoard,
      };
    }
    case ERASE_SHIP: {
      const { shipToErase } = action.payload;
      const newPlayerBoard = [...state.playerBoard];
      const playerBoardWithOutShip = newPlayerBoard.map(
        (element) => {
          if (element === shipToErase) {
            return 0;
          }
          return element;
        },
      );
      /*       for (let index = 0; index < parseInt(currentShipType, 10); index += 1) {
        newPlayerBoard[suggestedPositions[index]] = currentShipType;
      } */
      return {
        ...state,
        playerBoard: playerBoardWithOutShip,
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
      const { isSuggestedHorizontal, currentShipType } = state;
      const shipLength = parseInt(currentShipType, 10);
      const { currentMousePos } = action.payload;
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
