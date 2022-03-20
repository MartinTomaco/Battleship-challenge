import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewShip,
  eraseShip,
  /* setIsPlayer, */
  setAddedClassed,
  setShipStatus,
  checkShipStatus,
  setCurrentPosition,
  setSuggestedPosition,
  setIsPlayer,
  setCurrentCpuMove,
  setNextsCpuMoves,
} from '../../actions';

import './Square.css';

function Square(props) {
  const { isPlayerBoard, isCpuBoard } = props;
  let { id } = props;
  id = Number(id);
  const dispatch = useDispatch();
  const playerBoard = useSelector((state) => state.playerBoard);
  const cpuBoard = useSelector((state) => state.cpuBoard);
  const currentShipType = useSelector((state) => state.currentShipType);
  const isChoosing = useSelector((state) => state.isChoosing);
  /*   const isPlayer = useSelector((state) => state.isPlayer); */
  const suggestedPositions = useSelector((state) => state.suggestedPositions);
  const isCpuFleetVisible = useSelector((state) => state.isCpuFleetVisible);
  const playerBoardAddedClasses = useSelector((state) => state.playerBoardAddedClasses);
  const cpuBoardAddedClasses = useSelector((state) => state.cpuBoardAddedClasses);
  const previousCpuMoves = useSelector((state) => state.previousCpuMoves);
  const nextsCpuMoves = useSelector((state) => state.nextsCpuMoves);

  let addedClass = '';
  if (isPlayerBoard) {
    addedClass = playerBoardAddedClasses[id];
  }
  if (isCpuBoard) {
    addedClass = cpuBoardAddedClasses[id];
  }
  // 4 carrier - 3a 3b 3c cruisers - 2 submarine
  /*   const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
    console.log(`useEffect ${count}`);
  }, []); // It's only runs once per render */

  if (isPlayerBoard) {
    addedClass = suggestedPositions.some((element) => element === id) ? (`${addedClass} suggested`) : (addedClass);
    addedClass = playerBoard[id] === '4' ? (`${addedClass} carrier`) : (addedClass);
    addedClass = playerBoard[id] === '3a' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = playerBoard[id] === '3b' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = playerBoard[id] === '3c' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = playerBoard[id] === '2' ? (`${addedClass} submarine`) : (addedClass);
  }
  if (isCpuFleetVisible && isCpuBoard) {
    addedClass = cpuBoard[id] === '4_cpu' ? (`${addedClass} carrier`) : (addedClass);
    addedClass = cpuBoard[id] === '3a_cpu' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = cpuBoard[id] === '3b_cpu' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = cpuBoard[id] === '3c_cpu' ? (`${addedClass} cruiser`) : (addedClass);
    addedClass = cpuBoard[id] === '2_cpu' ? (`${addedClass} submarine`) : (addedClass);
  }
  const placeAShip = () => {
    dispatch(setCurrentPosition(id));
    dispatch(eraseShip({ shipToErase: currentShipType }));
    // Early return when there are not positions available
    if (!(suggestedPositions.length)) {
      return;
    }
    dispatch(addNewShip({ position: id, currentShipType }));
  };

  const findNextCpuMove = () => {
    const suggestedValues = nextsCpuMoves;
    if (suggestedValues.length === 0) {
      let newRandomId = Math.floor(Math.random() * 100);
      // If it has already been taken then raffle it again. Its could be improved.
      // eslint-disable-next-line no-loop-func
      while (previousCpuMoves.some((oldId) => oldId === newRandomId)) {
        newRandomId = Math.floor(Math.random() * 100);
        if (previousCpuMoves.length === 100) {
          break;
        }
      }
      suggestedValues.push(newRandomId);
    }
    return (suggestedValues);
  };

  const playCpu = () => {
    let suggestedValues = [...nextsCpuMoves];
    if (nextsCpuMoves.length === 0) {
      suggestedValues = findNextCpuMove();
    }
    const cpuId = suggestedValues.pop();
    dispatch(setCurrentCpuMove(cpuId));
    if (playerBoard[cpuId] !== 0) {
      dispatch(setAddedClassed({ addedClasses: ' impact', id: cpuId }));

      dispatch(setNextsCpuMoves({ id: cpuId }));
      dispatch(setShipStatus({ id: cpuId }));

      dispatch(checkShipStatus());
    } else {
      dispatch(setAddedClassed({ addedClasses: ' missed', id: cpuId }));
    }

    dispatch(setIsPlayer({ isPlayer: true }));
  };
  const playPlayer = () => {
    dispatch(setCurrentPosition(id));
    if (cpuBoard[id] !== 0) {
      dispatch(setAddedClassed({ addedClasses: ' impact', id }));
      dispatch(setShipStatus({ id })); // Should be improved (!)
      dispatch(checkShipStatus());
    } else {
      dispatch(setAddedClassed({ addedClasses: ' missed', id }));
    }
    dispatch(setIsPlayer({ isPlayer: false }));
    setTimeout(playCpu, 100);
    // playCpu();
  };
  const handleClick = () => {
    if (isChoosing) { // Used in START_SCREEN
      placeAShip();
    } else if (isCpuBoard) { // Used in GAME_SCREEN
      playPlayer();
    } else if (isPlayerBoard) { // Used in GAME_SCREEN
      // playCpu();
    }
  };

  const handleMouseOver = () => {
    if (isChoosing) {
      dispatch(setSuggestedPosition({ currentMousePos: id }));
    }
  };

  return (
    <button
      type="button"
      aria-label="skip-lint"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver} // for accessibility
      className={`square ${addedClass}`}
    >
      {id}
    </button>
  );
}

export default Square;
