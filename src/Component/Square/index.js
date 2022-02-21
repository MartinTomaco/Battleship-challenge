import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewShip,
  setCurrentPosition,
  setSuggestedPosition,
  toggleIsChoosing,
} from '../../actions';

import './Square.css';

function Square(props) {
  const dispatch = useDispatch();
  const playerBoard = useSelector((state) => state.playerBoard);
  const currentShipType = useSelector((state) => state.currentShipType);
  const isChoosing = useSelector((state) => state.isChoosing);
  const suggestedPositions = useSelector((state) => state.suggestedPositions);
  const forbiddenPositions = useSelector((state) => state.forbiddenPositions);

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
  addedClass = suggestedPositions.some((element) => element === id) ? (`${addedClass} suggested`) : (addedClass);
  addedClass = forbiddenPositions.some((element) => element === id) ? (`${addedClass} forbidden`) : (addedClass);
  addedClass = playerBoard[id] === '4' ? (`${addedClass} carrier`) : (addedClass);
  addedClass = playerBoard[id] === '3a' ? (`${addedClass} cruiser`) : (addedClass);
  addedClass = playerBoard[id] === '3b' ? (`${addedClass} cruiser`) : (addedClass);
  addedClass = playerBoard[id] === '3c' ? (`${addedClass} cruiser`) : (addedClass);
  addedClass = playerBoard[id] === '2' ? (`${addedClass} submarine`) : (addedClass);

  const isShipAvailable = (ShipType) => {
    return !playerBoard.some((element) => element === ShipType);
  };

  const handleClick = () => {
    dispatch(setCurrentPosition(id));
    if (isShipAvailable(currentShipType)) {
      dispatch(addNewShip({ position: id, currentShipType }));
      console.log(`A ${ships[currentShipType]} was located`);
      dispatch(toggleIsChoosing());
    } else {
      console.log(`The position of ${ships[currentShipType]} has been already choose. Please press Reset to relocate.`);
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
