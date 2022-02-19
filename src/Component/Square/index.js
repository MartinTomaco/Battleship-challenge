import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewShip, setCurrentPosition, setSuggestedPosition } from '../../actions';

import './Square.css';

function Square(props) {
  const dispatch = useDispatch();
  const playerBoard = useSelector((state) => state.playerBoard);
  const suggestedPositions = useSelector((state) => state.suggestedPositions);
  const forbiddenPositions = useSelector((state) => state.forbiddenPositions);
  const [isSelected, setSelected] = useState(false);

  let { id } = props;
  id = Number(id);

  let addedClass = '';
  const shipType = '4';
  // 4 carrier - 3a 3b 3c cruisers - 2 submarine
  addedClass = isSelected ? ('selected') : (addedClass);
  addedClass = suggestedPositions.some((element) => element === id) ? ('suggested') : (addedClass);
  addedClass = forbiddenPositions.some((element) => element === id) ? ('forbidden') : (addedClass);

  const isPositionAvailable = (position) => {
    return playerBoard[position] === 0;
  };

  const handleClick = () => {
    dispatch(setCurrentPosition(id));
    if (isPositionAvailable(id)) {
      dispatch(addNewShip({ position: id, shipType }));
      setSelected(!isSelected);
      console.log(`Square id= ${id} ${addedClass}`);
    } else {
      console.log(`Square id= ${id} it's not empty`);
    }
  };

  const handleMouseOver = () => {
    dispatch(setSuggestedPosition({ currentMousePos: id }));
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
