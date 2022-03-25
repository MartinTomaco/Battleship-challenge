import {
  SET_PLAYER_NAME,
  TOGGLE_GAME_STARTED,
  TOGGLE_IS_SUGGESTED_HORIZONTAL,
  TOGGLE_IS_CHOOSING,
  TOGGLE_IS_CPU_FLEET_VISIBLE,
  ADD_NEW_SHIP,
  SET_IS_CHOOSING,
  SET_CURRENT_POSITION,
  SET_CURRENT_CPU_MOVE,
  SET_NEXTS_CPU_MOVES,
  SET_SUGGESTED_POSITION,
  ERASE_SHIP,
  MOVE_TO_NEXT_SHIP,
  SET_CURRENT_SHIP,
  SET_AUTO_CPU_SUGGEST_POSITION,
  SET_IS_PLAYER,
  SET_SCREEN_TO_SHOW,
  SET_ADDED_CLASSES,
  SET_SHIP_STATUS,
  CHECK_SHIP_STATUS,
  SET_MESSAGE_TO_SHOW,
  SET_IS_GAME_FINISHED,
} from '../actions/types';

const INITIAL_STATE = {
  isPlayer: true,
  playerBoard: Array(100).fill(0),
  playerBoardAddedClasses: Array(100).fill(''),
  cpuBoard: Array(100).fill(0),
  cpuBoardAddedClasses: Array(100).fill(''),
  shipOrder: ['4', '3a', '3b', '3c', '2', '4_cpu', '3a_cpu', '3b_cpu', '3c_cpu', '2_cpu'],
  shipPlaced: {
    4: false, '3a': false, '3b': false, '3c': false, 2: false, '4_cpu': false, '3a_cpu': false, '3b_cpu': false, '3c_cpu': false, '2_cpu': false,
  },
  // Each ship saves the positions where was impacted.
  shipStatus: {
    4: [], '3a': [], '3b': [], '3c': [], 2: [], '4_cpu': [], '3a_cpu': [], '3b_cpu': [], '3c_cpu': [], '2_cpu': [],
  },
  playerName: '',
  isStarted: false,
  isGameFinished: false,
  currentCpuMove: [],
  nextsCpuMoves: [],
  previousCpuMoves: [],
  currentPos: [],
  previousPos: [],
  currentMousePos: [],
  currentShipType: '4',
  isChoosing: false,
  isSuggestedHorizontal: false,
  suggestedPositions: [],
  forbiddenPositions: [],
  isCpuFleetVisible: false,
  screenToShow: 'START_SCREEN',
  thereAreNewMessage: false,
  messageToShow: '',
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
  const isValidCpuMove = (cpuMoveToCheck) => {
    const {
      previousCpuMoves, currentCpuMove,
    } = state;
    // Early return when out of range
    if (cpuMoveToCheck < 0 || cpuMoveToCheck > 99) {
      return false;
    }
    const firstInRow = Math.floor(currentCpuMove / 10) * 10;
    const lastInRow = firstInRow + 9;
    // I have to put an early return for borders cases
    if (cpuMoveToCheck === firstInRow - 1 && currentCpuMove === firstInRow) {
      return false;
    }
    if (cpuMoveToCheck === lastInRow + 1 && currentCpuMove === lastInRow) {
      return false;
    }
    // Early return when cpuMove was within previous cpu moves
    if (previousCpuMoves.some((prevMove) => prevMove === cpuMoveToCheck)) {
      return false;
    }
    return true;
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
  /*   const takeARandomAndNewId = () => {
    const { previousCpuMoves } = state;
    let newRandomId = Math.floor(Math.random() * 100);
    // If it has already been taken then raffle it again. Its could be improved.
    // eslint-disable-next-line no-loop-func
    while (previousCpuMoves.some((oldId) => oldId === newRandomId)) {
      newRandomId = Math.floor(Math.random() * 100);
      if (previousCpuMoves.length === 100) {
        break;
      }
    }
    return newRandomId;
  }; */
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
    case SET_MESSAGE_TO_SHOW:
      return {
        ...state,
        messageToShow: action.payload,
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
    case TOGGLE_IS_CPU_FLEET_VISIBLE:
      return {
        ...state,
        isCpuFleetVisible: !state.isCpuFleetVisible,
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
      const payloadCurrentShipType = action?.payload?.currentShipType;
      // If it has payload take itm if not take from state
      const currentShipType = payloadCurrentShipType || stateCurrentShipType;
      const index = shipOrder.indexOf(currentShipType);
      if (index + 1 < shipOrder.length) {
        return {
          ...state,
          currentShipType: shipOrder[index + 1],
        };
      }
      return {
        ...state,
      };
    }
    case SET_CURRENT_SHIP: {
      const payloadCurrentShipType = action?.payload?.currentShipType;
      return {
        ...state,
        currentShipType: payloadCurrentShipType,
      };
    }
    case ADD_NEW_SHIP: {
      const { isPlayer, currentShipType, suggestedPositions } = state;
      const newPlayerBoard = [...state.playerBoard];
      const newCpuBoard = [...state.cpuBoard];
      const newShipPlaced = { ...state.shipPlaced };
      const shipLength = parseInt(currentShipType, 10); // '3a_cpu' => 3
      if (isPlayer) {
        for (let index = 0; index < shipLength; index += 1) {
          newPlayerBoard[suggestedPositions[index]] = currentShipType;
        }
      } else {
        for (let index = 0; index < shipLength; index += 1) {
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
      const { isPlayer } = state;
      const { shipToErase } = action.payload;
      let newTempBoard = [];
      if (isPlayer) {
        newTempBoard = [...state.playerBoard];
      } else {
        newTempBoard = [...state.cpuBoard];
      }
      const newShipPlaced = { ...state.shipPlaced };
      const tempBoardWithoutShip = newTempBoard.map(
        (element) => {
          if (element === shipToErase) {
            return 0;
          }
          return element;
        },
      );
      newShipPlaced[shipToErase] = false;
      if (isPlayer) {
        return {
          ...state,
          playerBoard: tempBoardWithoutShip,
          shipPlaced: newShipPlaced,
        };
      }
      return {
        ...state,
        cpuBoard: tempBoardWithoutShip,
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
    case SET_CURRENT_CPU_MOVE: {
      const newNextsCpuMoves = [...state.nextsCpuMoves];
      newNextsCpuMoves.pop();
      return {
        ...state,
        previousCpuMoves: [...state.previousCpuMoves, action.payload],
        currentCpuMove: action.payload,
        nextsCpuMoves: newNextsCpuMoves,
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
    case SET_NEXTS_CPU_MOVES: {
      // It should be improved...
      // hit 74, then miss, then hit 75.
      // It should remember that it hit 74 in first place and try hit 76
      const {
        previousCpuMoves, nextsCpuMoves, shipStatus, playerBoard,
      } = state;
      const currentImpactId = action?.payload?.id;
      const newNextsCpuMoves = [...nextsCpuMoves];

      const isPreviousImpactInSameShip = (toCheckIfIsImpact) => {
        const impactedShipType = playerBoard[currentImpactId];
        const allPreviousImpactsOnShip = shipStatus[impactedShipType];
        const result = allPreviousImpactsOnShip.some((pos) => pos === toCheckIfIsImpact);
        return result;
      };
      const unCheckedCpuMoves = [
        currentImpactId - 10,
        currentImpactId - 1,
        currentImpactId + 1,
        currentImpactId + 10,
      ];
      for (let iToCheck = 0; iToCheck < unCheckedCpuMoves.length; iToCheck += 1) {
        const unCheckCpuMove = unCheckedCpuMoves[iToCheck];
        if (isValidCpuMove(unCheckCpuMove)) {
          newNextsCpuMoves.push(unCheckCpuMove);
        }
      }
      const toCheckIfIsImpact = previousCpuMoves[previousCpuMoves.length - 2];
      const diff = currentImpactId - toCheckIfIsImpact;
      // The objective it's a vertical ship:
      if ((1 % diff && Math.abs(diff) === 10)
      || isPreviousImpactInSameShip(currentImpactId - 10)
      || isPreviousImpactInSameShip(currentImpactId + 10)) { // (-10) || (10) => 1
        let indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 1));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 1));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 10 - 1));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 10 + 1));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 10 - 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 10 + 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
      }
      // The objective it's a horizontal ship:
      if ((!(1 % diff) && Math.abs(diff) === 1)
      || isPreviousImpactInSameShip(currentImpactId - 1)
      || isPreviousImpactInSameShip(currentImpactId + 1)) { // (-1) || (1) => 1
        let indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 1 - 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId - 1 + 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 1 - 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
        indexToDelete = newNextsCpuMoves.findIndex((pos) => pos === (currentImpactId + 1 + 10));
        if (!(indexToDelete === (-1))) {
          newNextsCpuMoves.splice(indexToDelete, 1);
        }
      }

      return {
        ...state,
        nextsCpuMoves: newNextsCpuMoves,
      };
    }
    case SET_SCREEN_TO_SHOW: {
      const { screenToShow: newScreenToShow } = action.payload;
      return {
        ...state,
        screenToShow: newScreenToShow,
      };
    }
    case SET_IS_GAME_FINISHED: {
      const { newIsGameFinished } = action.payload;
      return {
        ...state,
        isGameFinished: newIsGameFinished,
      };
    }
    case SET_ADDED_CLASSES: {
      const { addedClasses: newAddedClasses, id: newId } = action.payload;
      const { isPlayer } = state;
      if (isPlayer) {
        const newCpuBoardAddedClasses = [...state.cpuBoardAddedClasses];
        newCpuBoardAddedClasses[newId] = state.cpuBoardAddedClasses[newId].concat(newAddedClasses);
        return {
          ...state,
          cpuBoardAddedClasses: newCpuBoardAddedClasses,
        };
      }
      const newPlayerBoardAddedClasses = [...state.playerBoardAddedClasses];
      // There are a possible bug in next line
      newPlayerBoardAddedClasses[newId] = state.playerBoardAddedClasses[newId]
        .concat(newAddedClasses);
      return {
        ...state,
        playerBoardAddedClasses: newPlayerBoardAddedClasses,
      };
    }
    case SET_SHIP_STATUS: {
      const { id: newId } = action.payload;
      const {
        isPlayer, playerBoard, cpuBoard,
      } = state;
      let newShipStatus = { ...state.shipStatus };
      let isSunkenShip = false;
      if (isPlayer) {
        const shipType = cpuBoard[newId];
        const shipLength = parseInt(shipType, 10);
        newShipStatus = { ...newShipStatus, [shipType]: newShipStatus[shipType].concat(newId) };
        isSunkenShip = newShipStatus[shipType].length === shipLength;
        console.log('isSunkenShip :', isSunkenShip);
        return {
          ...state,
          shipStatus: newShipStatus,
          thereAreNewMessage: isSunkenShip,
        };
      }
      const shipType = playerBoard[newId];
      const shipLength = parseInt(shipType, 10);
      newShipStatus = { ...newShipStatus, [shipType]: newShipStatus[shipType].concat(newId) };
      isSunkenShip = newShipStatus[shipType].length === shipLength;
      if (isSunkenShip) {
        // const newRandomId = takeARandomAndNewId();
        return {
          ...state,
          shipStatus: newShipStatus,
          thereAreNewMessage: isSunkenShip,
          nextsCpuMoves: [], // newRandomId,
        };
      }
      return {
        ...state,
        shipStatus: newShipStatus,
        thereAreNewMessage: isSunkenShip,
      };
    }
    case CHECK_SHIP_STATUS: {
      // Should implemented
      // Check if there are any winner
      const {
        isPlayer, shipStatus, playerName,
      } = state;
      let newMessageToShow = '';
      let newIsGameFinished = false;
      if (isPlayer) {
        if (shipStatus['4_cpu'].length === 4
        && shipStatus['3a_cpu'].length === 3
        && shipStatus['3b_cpu'].length === 3
        && shipStatus['3c_cpu'].length === 3
        && shipStatus['2_cpu'].length === 2) {
          newMessageToShow = `Congratulation ${playerName}, you win!`;
          newIsGameFinished = true;
          console.log('Player win');
        }

        return {
          ...state,
          messageToShow: newMessageToShow,
          isGameFinished: newIsGameFinished,
        };
      } if (shipStatus['4'].length === 4
      && shipStatus['3a'].length === 3
      && shipStatus['3b'].length === 3
      && shipStatus['3c'].length === 3
      && shipStatus['2'].length === 2) {
        newMessageToShow = 'All your ships has been destroyed, CPU win!';
        newIsGameFinished = true;
        console.log('CPU win');
      }

      return {
        ...state,
        messageToShow: newMessageToShow,
        isGameFinished: newIsGameFinished,
      };
    }
    default:
      return state;
  }
};

export default reducer;
