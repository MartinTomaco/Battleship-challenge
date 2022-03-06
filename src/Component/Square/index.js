import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewShip,
  eraseShip,
  setCurrentPosition,
  setSuggestedPosition,
} from '../../actions';

import './Square.css';

function Square(props) {
  const dispatch = useDispatch();
  const playerBoard = useSelector((state) => state.playerBoard);
  const cpuBoard = useSelector((state) => state.cpuBoard);
  const currentShipType = useSelector((state) => state.currentShipType);
  const isChoosing = useSelector((state) => state.isChoosing);
  /*   const isPlayer = useSelector((state) => state.isPlayer); */
  const suggestedPositions = useSelector((state) => state.suggestedPositions);
  const forbiddenPositions = useSelector((state) => state.forbiddenPositions);
  const isCpuFleetVisible = useSelector((state) => state.isCpuFleetVisible);
  const { isPlayerBoard, isCpuBoard } = props;
  let { id } = props;
  id = Number(id);

  let addedClass = '';
  const ships = {
    4: 'carrier',
    '3a': 'cruiser',
    '3b': 'cruiser',
    '3c': 'cruiser',
    2: 'submarine',
  };
  // 4 carrier - 3a 3b 3c cruisers - 2 submarine
  // addedClass = isSelected ? ('selected') : (addedClass);
  if (isPlayerBoard) {
    addedClass = suggestedPositions.some((element) => element === id) ? (`${addedClass} suggested`) : (addedClass);
    addedClass = forbiddenPositions.some((element) => element === id) ? (`${addedClass} forbidden`) : (addedClass);
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
    if (isChoosing) {
      dispatch(setCurrentPosition(id));
      dispatch(eraseShip({ shipToErase: currentShipType }));
      // Early return when there are not positions available
      if (!(suggestedPositions.length)) {
        console.log('suggestedPositions:', suggestedPositions);
        console.log('suggested is empty');
        return;
      }
      dispatch(addNewShip({ position: id, currentShipType }));
      console.log(`A ${ships[currentShipType]} was located`);
      console.log('suggestedPositions:', suggestedPositions);
    } else {
      console.log('id', id);
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
      // touchenter={handleMouseOver} Should implement something for mobile
      className={`square ${addedClass}`}
    />
  );
}

export default Square;
