import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import {
  eraseShip,
  setPlayerName,
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
  setSuggestedPosition,
  setCurrentShip,
  setIsGameFinished,
} from '../../actions';
import './Game.css';

function Game() {
  const dispatch = useDispatch();
  const screenToShow = useSelector((state) => state.screenToShow);
  const isStarted = useSelector((state) => state.isStarted);
  const isPlayer = useSelector((state) => state.isPlayer);
  const playerName = useSelector((state) => state.playerName);
  const currentShipType = useSelector((state) => state.currentShipType);
  const shipPlaced = useSelector((state) => state.shipPlaced);
  const shipOrder = useSelector((state) => state.shipOrder);
  const messageToShow = useSelector((state) => state.messageToShow);

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
      dispatch(setSuggestedPosition([])); // to empty suggested position
      dispatch(setScreenToShow({ screenToShow: 'GAME_SCREEN' }));
      dispatch(setIsPlayer({ isPlayer: true }));
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
  const handleChooseRandomly = () => {
    dispatch(setIsChoosing({ isChoosing: false }));
    // First We remove all player ships
    const indexOfFistsPlayerShip = shipOrder.indexOf('4');
    const indexOfLastPlayerShip = shipOrder.indexOf('2');
    const onlyPlayerShipOrder = shipOrder.slice(indexOfFistsPlayerShip, indexOfLastPlayerShip + 1);
    onlyPlayerShipOrder.forEach((ship) => dispatch(eraseShip({ shipToErase: `${ship}` })));

    dispatch(setCurrentShip({ currentShipType: '4' }));
    for (let index = 0; index < 5; index += 1) {
      dispatch(setAutoCpuSuggestPosition());
      dispatch(addNewShip());
      dispatch(moveToNextShip());
    }
  };
  const handleClickDoneFromRandom = () => {
    dispatch(moveToNextShip({ currentShipType }));
    dispatch(setIsChoosing({ isChoosing: false }));
    dispatch(setIsPlayer({ isPlayer: false }));
    setCpuFleet();
    dispatch(setSuggestedPosition([])); // to empty suggested position
    dispatch(setScreenToShow({ screenToShow: 'GAME_SCREEN' }));
    dispatch(setIsPlayer({ isPlayer: true }));
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
  const isDoneRandomButtonDisabled = () => {
    return !(shipPlaced['4'] && shipPlaced['3a'] && shipPlaced['3b'] && shipPlaced['3c'] && shipPlaced['2']);
  };
  const renderShipsRandomButton = () => {
    return (
      <>
        <button onClick={handleChooseRandomly} className="shipsButtons" type="button">Choose Randomly</button>
        <button disabled={isDoneRandomButtonDisabled()} onClick={handleClickDoneFromRandom} className="shipsButtons" type="button">Done</button>

      </>
    );
  };
  switch (screenToShow) {
    case 'START_SCREEN':
      return (
        <div className="game">
          <section className="main-container">
            <section className="top-container">
              <h3 className="main-title">Battleship Game</h3>
              <form className="intro-form">
                <p>To start input your name and press Start button</p>
                <input
                  value={playerName}
                  onChange={(event) => {
                    dispatch(setPlayerName(event.target.value));
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
                <Board isPlayerBoard />
              </div>
            </section>
            <section className="bottom-container">
              {isStarted && (
              <div>
                <p>
                  <b>
                    Hi
                    {` ${playerName}`}
                    , to start to play please select your ships positions. Or draw random positions.
                  </b>
                  {renderShipsRandomButton()}
                </p>
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
              </div>

              )}

            </section>

          </section>
        </div>
      );
    case 'GAME_SCREEN':
      return (
        <div className="game">
          <section className="main-container">

            <section className="top-container">
              <section className="player-info">
                <h3>{playerName || 'Player Name'}</h3>
                <p>You have 5 ships left</p>
              </section>

              <div className="game-board">
                <Board isPlayerBoard />
              </div>

              <section className="player-info">
                <h3>CPU</h3>
                <p>He has 5 ships left</p>
              </section>
              <div className="game-board">
                <Board isCpuBoard />
              </div>

            </section>
            <section className="bottom-container">

              <p>
                {' '}
                Is Playing:
                {' '}
                <b>
                  {isPlayer ? `${playerName} ` : 'CPU '}
                </b>
                <span className="redMessage">{messageToShow || ''}</span>
              </p>
              <button
                type="button"
                className="startGame-button surrender-button"
                onClick={() => {
                  dispatch(toggleIsCpuFleetVisible());
                  dispatch(setIsGameFinished(true));
                }}
              >
                Surrender
              </button>
            </section>
          </section>
        </div>
      );
    default:
      console.log('switch screenToShow fell into default');
      break;
  }
}

export default Game;
