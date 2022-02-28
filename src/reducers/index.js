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
  SET_AUTO_CPU_SUGGEST_POSITION,
  SET_IS_PLAYER,
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
  const setRandomSuggestedHorizontal = () => {
    const { isSuggestedHorizontal } = state;
    let newIsSuggestedHorizontal = isSuggestedHorizontal;
    if (Math.round(Math.random())) {
      newIsSuggestedHorizontal = !newIsSuggestedHorizontal; // Vertical or horizontal randomly
    }
    return newIsSuggestedHorizontal;
  };
  const hasValidatedPositions = (suggestedToValidate, isSuggestedHorizontal) => {
    const {
      isPlayer, playerBoard, cpuBoard, currentShipType,
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
  const buildSuggestedCurrentShip = (currentPos, isSuggestedHorizontal) => {
    const { currentShipType } = state;
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
    case SET_AUTO_CPU_SUGGEST_POSITION: {
      let newIsSuggestedHorizontal; let newCurrentPos; let newSuggestedPositions; let isValidated;

      do { // It raffles a ship position until it is valid
        newCurrentPos = Math.floor(Math.random() * 100);
        newIsSuggestedHorizontal = setRandomSuggestedHorizontal();
        newSuggestedPositions = buildSuggestedCurrentShip(newCurrentPos, newIsSuggestedHorizontal);
        isValidated = hasValidatedPositions(newSuggestedPositions, newIsSuggestedHorizontal);
      } while (!isValidated);

      return {
        ...state,
        currentPos: newCurrentPos,
        isSuggestedHorizontal: newIsSuggestedHorizontal,
        suggestedPositions: newSuggestedPositions,
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
        isStarted: !state.isStarted,
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
    case SET_IS_PLAYER: {
      const { isPlayer } = action.payload;
      return {
        ...state,
        isPlayer,
      };
    }
    case MOVE_TO_NEXT_SHIP: {
      const { shipOrder, currentShipType: stateCurrentShipType } = state;
      console.log('stateCurrentShipType:', stateCurrentShipType);
      const payloadCurrentShipType = action?.payload?.currentShipType;
      console.log('payloadCurrentShipType:', payloadCurrentShipType);
      // If it has payload take itm if not take from state
      const currentShipType = payloadCurrentShipType || stateCurrentShipType;
      console.log('currentShipType:', currentShipType);
      const index = shipOrder.indexOf(currentShipType);
      if (index + 1 < shipOrder.length) {
        return {
          ...state,
          currentShipType: shipOrder[index + 1],
        };
      }
      console.log('All ships has been located');
      return {
        ...state,
      };
    }
    case ADD_NEW_SHIP: {
      const { isPlayer, currentShipType, suggestedPositions } = state;
      const newPlayerBoard = [...state.playerBoard];
      const newCpuBoard = [...state.cpuBoard];
      const newShipPlaced = { ...state.shipPlaced };
      if (isPlayer) {
        for (let index = 0; index < parseInt(currentShipType, 10); index += 1) {
          newPlayerBoard[suggestedPositions[index]] = currentShipType;
        }
      } else {
        for (let index = 0; index < parseInt(currentShipType, 10); index += 1) {
          newCpuBoard[suggestedPositions[index]] = currentShipType;
        }
      }

      newShipPlaced[currentShipType] = true;
      return {
        ...state,
        playerBoard: newPlayerBoard,
        cpuBoard: newCpuBoard,
        shipPlaced: newShipPlaced,
      };
    }
    case ERASE_SHIP: {
      // Should implement cpuBoard case
      const { shipToErase } = action.payload;
      const newPlayerBoard = [...state.playerBoard];
      const newShipPlaced = { ...state.shipPlaced };
      const playerBoardWithoutShip = newPlayerBoard.map(
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
        playerBoard: playerBoardWithoutShip,
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
      const { isSuggestedHorizontal } = state;
      const { currentMousePos } = action.payload;
      const newSuggestedPositions = buildSuggestedCurrentShip(
        currentMousePos,
        isSuggestedHorizontal,
      );
      // Here we need to validate if it is a legal position
      if (hasValidatedPositions(newSuggestedPositions, isSuggestedHorizontal)) {
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
