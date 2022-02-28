import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import {
  eraseShip,
  setPlayerNameAction,
  toggleIsStarted,
  setIsChoosing,
  toggleIsChoosing,
  toggleIsSuggestedHorizontal,
  moveToNextShip,
  setAutoCpuSuggestPosition,
  setIsPlayer,
  addNewShip,
} from '../../actions';
import './Game.css';

function Game() {
  const dispatch = useDispatch();
  const isStarted = useSelector((state) => state.isStarted);
  const playerName = useSelector((state) => state.playerName);
  const currentShipType = useSelector((state) => state.currentShipType);
  const shipPlaced = useSelector((state) => state.shipPlaced);

  const handleClickDone = () => {
    if (currentShipType === '2') {
      dispatch(moveToNextShip({ currentShipType }));
      dispatch(setIsChoosing({ isChoosing: false }));
      dispatch(setAutoCpuSuggestPosition());
      return;
    }
    dispatch(moveToNextShip({ currentShipType }));
  };
  const handleClickRotate = () => {
    dispatch(toggleIsSuggestedHorizontal());
  };
  const handleClickReset = () => {
    dispatch(eraseShip({ shipToErase: currentShipType }));
    dispatch(setIsChoosing({ isChoosing: true }));
  };
  const handleKeyDown = (event) => {
    if (event.key === 'r') {
      dispatch(toggleIsSuggestedHorizontal());
    }
  };
  const handleCPUStartButton = () => {
    dispatch(moveToNextShip({ currentShipType: '2' })); // Ship: 2 is the last player ship
    dispatch(setIsPlayer({ isPlayer: false }));
    for (let index = 0; index < 5; index += 1) {
      dispatch(setAutoCpuSuggestPosition());
      dispatch(addNewShip());
      dispatch(moveToNextShip());
    }
  };
  const handleShowCPUFleetButton = () => {
    console.log('handleShowCPUFleetButton');
  };
  const renderShipsButton = () => {
    return (
      <>
        <button disabled={!shipPlaced[currentShipType]} onClick={handleClickDone} className="shipsButtons" type="button">Done</button>
        <button onClick={handleClickRotate} onKeyDown={handleKeyDown} className="shipsButtons" type="button">Rotate</button>
        <button onClick={handleClickReset} className="shipsButtons" type="button">Reset</button>
      </>
    );
  };

  return (
    <div className="game">
      <section className="main-container">
        <section className="top-container">
          <div className="game-board">
            <Board />
          </div>
          <div className="right-panel">
            <input
              value={playerName}
              onChange={(event) => {
                dispatch(setPlayerNameAction(event.target.value));
              }}
              className="name-input"
              placeholder="Player name"
            />
            <button
              disabled={isStarted}
              type="button"
              className="startGame-button"
              onClick={() => {
                dispatch(toggleIsChoosing());
                dispatch(toggleIsStarted());
              }}
            >
              Start Game
            </button>
            <button
              type="button"
              className="startGame-button"
              onClick={() => {
                handleCPUStartButton();
              }}
            >
              setCPUFleet()
            </button>
            <button
              type="button"
              className="startGame-button"
              onClick={() => {
                handleShowCPUFleetButton();
              }}
            >
              showCPUFleet()
            </button>
          </div>
        </section>
        <section className="bottom-container">
          <b>Available ships:</b>

          <li>
            carrier of 4 spaces
            {currentShipType === '4' && isStarted && (renderShipsButton())}
          </li>
          <li>
            cruiser of 3 spaces
            {currentShipType === '3a' && (renderShipsButton())}
          </li>
          <li>
            cruiser of 3 spaces
            {currentShipType === '3b' && (renderShipsButton())}
          </li>
          <li>
            cruiser of 3 spaces
            {currentShipType === '3c' && (renderShipsButton())}
          </li>
          <li>
            submarine of 2 spaces
            {currentShipType === '2' && (renderShipsButton())}
          </li>
        </section>
        {isStarted && (
          <p>
            <b>
              Hi
              {` ${playerName}`}
              , to start to play please select your ships positions
            </b>
          </p>
        )}
      </section>
    </div>
  );
}

export default Game;
