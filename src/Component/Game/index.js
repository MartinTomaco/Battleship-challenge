import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import { setPlayerNameAction, toggleIsStarted } from '../../actions';
import './Game.css';

export default function Game() {
  const dispatch = useDispatch();
  const isStarted = useSelector((state) => state.isStarted);
  const playerName = useSelector((state) => state.playerName);

  const isShipSelected = true;

  const renderShipsButton = () => {
    return (
      <>
        <button className="shipsButtons" type="button">Done</button>
        <button className="shipsButtons" type="button">Restart</button>
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
              type="button"
              className="startGame-button"
              onClick={() => dispatch(toggleIsStarted())}
            >
              Start Game
            </button>
          </div>
        </section>
        <section className="bottom-container">
          <b>Available ships:</b>
          {isShipSelected && (
          <li>
            carrier of 4 spaces
            {' '}
            {renderShipsButton()}
          </li>
          )}
          <li>cruiser of 3 spaces</li>
          <li>cruiser of 3 spaces</li>
          <li>cruiser of 3 spaces</li>
          <li>submarine of 2 spaces</li>
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
