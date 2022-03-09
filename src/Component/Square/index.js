import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewShip,
  eraseShip,
  /* setIsPlayer, */
  setAddedClassed,
  setShipStatus,
  setCurrentPosition,
  setSuggestedPosition,
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

  let addedClass = '';
  if (isPlayerBoard) {
    addedClass = playerBoardAddedClasses[id];
  }
  if (isCpuBoard) {
    addedClass = cpuBoardAddedClasses[id];
  }
  // 4 carrier - 3a 3b 3c cruisers - 2 submarine
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
    console.log(`useEffect ${count}`);
  }, []); // It's only runs once per render

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

  const handleClick = () => {
    if (isChoosing) { // Use in START_SCREEN
      dispatch(setCurrentPosition(id));
      dispatch(eraseShip({ shipToErase: currentShipType }));
      // Early return when there are not positions available
      if (!(suggestedPositions.length)) {
        return;
      }
      dispatch(addNewShip({ position: id, currentShipType }));
    } else if (isCpuBoard) {
      if (cpuBoard[id] !== 0) {
        dispatch(setAddedClassed({ addedClasses: ' impact', id }));
        dispatch(setCurrentPosition(id));
        dispatch(setShipStatus({ id })); // Should be improved (!)
      } else {
        dispatch(setAddedClassed({ addedClasses: ' missed', id }));
        dispatch(setCurrentPosition(id));
      }
      // dispatch(setIsPlayer({ isPlayer: true }));
      console.log('id:', id);
      console.log('addedClass:', addedClass);
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
    />
  );
}

export default Square;
