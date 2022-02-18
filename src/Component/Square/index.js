import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewShipPart, setCurrentPosition } from '../../actions';

import './Square.css';

export default function Square(props) {
  const dispatch = useDispatch();
  const playerBoard = useSelector((state) => state.playerBoard);
  // const suggestedPositions = useSelector((state) => state.suggestedPositions);
  const [isSelected, setSelected] = useState(false);
  // const [isSuggested, setSuggested] = useState(false);

  let { id } = props;
  id = Number(id);

  let addedClass = '';
  const shipType = '4';
  // 4 carrier - 3a 3b 3c cruisers - 2 submarine
  addedClass = isSelected ? ('selected') : ('');
  const isPositionAvailable = (position) => {
    return playerBoard[position] === 0;
  };

  const handleClick = () => {
    dispatch(setCurrentPosition(id));
    if (isPositionAvailable(id)) {
      dispatch(addNewShipPart({ position: id, shipType }));
      setSelected(!isSelected);
      console.log(`Square id= ${id} ${addedClass}`);
    } else {
      console.log(`Square id= ${id} it's not empty`);
    }
  };

  return (
    <button
      type="button"
      aria-label="skip-lint"
      onClick={handleClick}
      className={`square ${addedClass}`}
    />
  );
}
