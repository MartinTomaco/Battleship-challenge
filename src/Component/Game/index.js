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
  toggleIsCpuFleetVisible,
  moveToNextShip,
  setAutoCpuSuggestPosition,
  setIsPlayer,
  addNewShip,
  setScreenToShow,
} from '../../actions';
import './Game.css';

function Game() {
  const dispatch = useDispatch();
  const screenToShow = useSelector((state) => state.screenToShow);
  const isStarted = useSelector((state) => state.isStarted);
  const playerName = useSelector((state) => state.playerName);
  const currentShipType = useSelector((state) => state.currentShipType);
  const shipPlaced = useSelector((state) => state.shipPlaced);
  const shipOrder = useSelector((state) => state.shipOrder);

  const setCpuFleet = () => {
    // First We remove all ships for debugging purposes
    const indexOfFistsCpuShip = shipOrder.indexOf('4_cpu');
    const onlyCpuShipOrder = shipOrder.slice(indexOfFistsCpuShip);
    onlyCpuShipOrder.forEach((ship) => dispatch(eraseShip({ shipToErase: `${ship}` })));

    dispatch(moveToNextShip({ currentShipType: '2' })); // Ship: 2 is the last player ship
    for (let index = 0; index < 5; index += 1) {
      dispatch(setAutoCpuSuggestPosition());
      dispatch(addNewShip());
      dispatch(moveToNextShip());
    }
    // We need suggestedPosition array empty
    // dispatch(setCurrentPosition());
  };
  const handleClickDone = () => {
    // When Player place the last ship. Set all CPU fleet
    if (currentShipType === '2') {
      dispatch(moveToNextShip({ currentShipType }));
      dispatch(setIsChoosing({ isChoosing: false }));
      dispatch(setIsPlayer({ isPlayer: false }));
      setCpuFleet();
      dispatch(setScreenToShow({ screenToShow: 'GAME_SCREEN' }));
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
  // This handle is only for debugging

  /*   const handleShowCPUFleetButton = () => {
    console.log('handleShowCPUFleetButton');
    dispatch(toggleIsCpuFleetVisible());
  }; */
  const renderShipsButton = () => {
    return (
      <>
        <button disabled={!shipPlaced[currentShipType]} onClick={handleClickDone} className="shipsButtons" type="button">Done</button>
        <button onClick={handleClickRotate} onKeyDown={handleKeyDown} className="shipsButtons" type="button">Rotate</button>
        <button onClick={handleClickReset} className="shipsButtons" type="button">Reset</button>
      </>
    );
  };
  // START_SCREEN
  // GAME_SCREEN
  switch (screenToShow) {
    case 'START_SCREEN':
      return (
        <div className="game">
          <section className="main-container">
            <section className="top-container">
              <h3>Battleship Game</h3>
              <form className="intro-form">
                <p>To start input your name and press Start button</p>
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
              </form>
              <div className="game-board">
                <Board />
              </div>
              <div className="right-panel">

                {/*                 <button
                  type="button"
                  className="startGame-button"
                  onClick={() => {
                    dispatch(setIsPlayer({ isPlayer: false }));
                    setCpuFleet();
                  }}
                >
                  setCPUFleet()
                </button>
                <button
                  type="button"
                  className="startGame-button"
                  onClick={() => {
                    handleShowCPUFleetButton();
                    dispatch(setScreenToShow({ screenToShow: 'GAME_SCREEN' }));
                  }}
                >
                  showCPUFleet()|| Go to GAME SCREEN
                </button> */}
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

          </section>
        </div>
      );
    case 'GAME_SCREEN':
      return (
        <div className="game">
          <section className="main-container">
            <h3>{playerName || 'Player Name'}</h3>
            <section className="top-container">

              <div className="game-board">
                <Board />
              </div>

            </section>
            <h3>CPU</h3>
            <section className="top-container">

              <div className="game-board">
                <Board />
              </div>

            </section>
            <p>
              {' '}
              Is Playing:
              {' '}
              <b>CPU</b>
            </p>
            <button
              type="button"
              className="startGame-button"
              onClick={() => {
                dispatch(toggleIsCpuFleetVisible());
              }}
            >
              Surrender || showCPUFleet
            </button>
          </section>
        </div>
      );
    default:
      console.log('switch screenToShow fell into default');
      break;
  }
}

export default Game;
