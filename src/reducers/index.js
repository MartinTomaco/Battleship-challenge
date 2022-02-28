import {
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  TOGGLE_IS_CHOOSING,
  ADD_NEW_SHIP,
  SET_IS_CHOOSING,
  SET_CURRENT_POSITION,
  SET_SUGGESTED_POSITION,
  ERASE_SHIP,
  MOVE_TO_NEXT_SHIP,
  SET_CPU_FLEET,
} from '../actions/types';

const INITIAL_STATE = {
  isPlayer: true,
  playerBoard: Array(100).fill(0),
  cpuBoard: Array(100).fill(0),
  shipOrder: ['4', '3a', '3b', '3c', '2', '4_cpu', '3a_cpu', '3b_cpu', '3c_cpu', '2_cpu'],
  shipPlaced: {
    4: false, '3a': false, '3b': false, '3c': false, 2: false, '4_cpu': false, '3a_cpu': false, '3b_cpu': false, '3c_cpu': false, '2_cpu': false,
  },
  playerName: '',
  isStarted: false,
  currentPos: [],
  previousPos: [],
  currentMousePos: [],
  currentShipType: '4',
  isChoosing: false,
  isSuggestedHorizontal: false,
  suggestedPositions: [],
  forbiddenPositions: [],
};

// eslint-disable-next-line default-param-last
const reducer = (state = INITIAL_STATE, action) => {
  const hasValidatedPositions = (suggestedToValidate) => {
    const {
      isPlayer, isSuggestedHorizontal, playerBoard, cpuBoard, currentShipType,
    } = state;
    // I have to put an early return when max on suggestToValidate jump to next row
    if (isSuggestedHorizontal) {
      const firstInRow = Math.floor(Math.min(...suggestedToValidate) / 10) * 10;
      const lastInRow = firstInRow + 9;
      const maxSuggested = Math.max(...suggestedToValidate);
      if (maxSuggested > lastInRow) {
        return false;
      }
    }
    const shipLength = parseInt(currentShipType, 10);
    const subArrayBoard = [];
    for (let index = 0; index < shipLength; index += 1) {
      if (isPlayer) {
        subArrayBoard.push(playerBoard[suggestedToValidate[index]]);
      } else { // cpuBoard
        subArrayBoard.push(cpuBoard[suggestedToValidate[index]]);
      }
    }
    return !subArrayBoard.some((element) => element !== 0);
  };
  const buildSuggestedCurrentShip = (currentPos) => {
    const { isSuggestedHorizontal, currentShipType } = state;
    const shipLength = parseInt(currentShipType, 10); // ('4_CPU') => 4
    const newSuggestedPositions = [];
    if (isSuggestedHorizontal) {
      for (let index = 0; index < shipLength; index += 1) {
        newSuggestedPositions.push(currentPos + index);
      }
    } else { // Vertical
      for (let index = 0; index < shipLength; index += 1) {
        newSuggestedPositions.push(currentPos + index * 10);
      }
    }
    return newSuggestedPositions;
  };
  switch (action.type) {
    case SET_CPU_FLEET: {
      const { isSuggestedHorizontal } = state;
      let newIsSuggestedHorizontal = isSuggestedHorizontal;
      if (Math.round(Math.random())) {
        newIsSuggestedHorizontal = !newIsSuggestedHorizontal; // Vertical or horizontal randomly
      }
      // Here should implement a 'while' until hasValidatedPositions be true
      const newCurrentPos = Math.floor(Math.random() * 100);
      const suggestedPositions = buildSuggestedCurrentShip(newCurrentPos);
      console.log('suggestedPositions:', suggestedPositions);
      console.log('hasValidatedPositions:', hasValidatedPositions(suggestedPositions));
      hasValidatedPositions(suggestedPositions);
      console.log('hasValidatedPositions:', hasValidatedPositions(suggestedPositions));
      return {
        ...state,
        currentPos: newCurrentPos,
        isSuggestedHorizontal: newIsSuggestedHorizontal,
      };
    }
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
    case TOGGLE_IS_CHOOSING:
      return {
        ...state,
        isChoosing: !state.isChoosing,
      };
    case TOGGLE_IS_SUGGESTED_HORIZONTAL:
      return {
        ...state,
        isSuggestedHorizontal: !state.isSuggestedHorizontal,
      };
    case SET_IS_CHOOSING: {
      const { isChoosing } = action.payload;
      return {
        ...state,
        isChoosing,
      };
    }
    case MOVE_TO_NEXT_SHIP: {
      const { shipOrder } = state;
      const { currentShipType } = action.payload;
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
    case ADD_NEW_SHIP: {
      const { currentShipType, suggestedPositions } = state;
      const newPlayerBoard = [...state.playerBoard];
      const newShipPlaced = { ...state.shipPlaced };
      for (let index = 0; index < parseInt(currentShipType, 10); index += 1) {
        newPlayerBoard[suggestedPositions[index]] = currentShipType;
      }
      newShipPlaced[currentShipType] = true;
      return {
        ...state,
        playerBoard: newPlayerBoard,
        shipPlaced: newShipPlaced,
      };
    }
    case ERASE_SHIP: {
      const { shipToErase } = action.payload;
      const newPlayerBoard = [...state.playerBoard];
      const newShipPlaced = { ...state.shipPlaced };
      const playerBoardWithOutShip = newPlayerBoard.map(
        (element) => {
          if (element === shipToErase) {
            return 0;
          }
          return element;
        },
      );
      newShipPlaced[shipToErase] = false;
      return {
        ...state,
        playerBoard: playerBoardWithOutShip,
        shipPlaced: newShipPlaced,
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
      const { currentMousePos } = action.payload;
      const newSuggestedPositions = buildSuggestedCurrentShip(currentMousePos);
      // Here we need to validate if it is a legal position
      if (hasValidatedPositions(newSuggestedPositions)) {
        return {
          ...state,
          suggestedPositions: newSuggestedPositions,
        };
      }
      return {
        ...state,
        suggestedPositions: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
