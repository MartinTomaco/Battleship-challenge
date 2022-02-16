import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import setPlayerNameAction from '../../actions';
import './Game.css';

export default function Game() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => { return state.playerName; });
  const isPlayer = useSelector((state) => { return state.isPlayer; });

  return (
    <div className="game">
      <section className="main-container">
        <section className="top-container">
          <div className="game-board">
            <Board isPlayer={isPlayer} />
          </div>
          <div className="right-panel">
            <input
              value={playerName}
              onChange={(event) => { return dispatch(setPlayerNameAction(event.target.value)); }}
              className="name-input"
              placeholder="Player name"
            />
            <button type="button" className="startGame-button"> Start Game</button>
          </div>
        </section>
        <section className="bottom-container">
          <b>Available ships:</b>
          <li>carrier of 4 spaces</li>
          <li>cruiser of 3 spaces</li>
          <li>cruiser of 3 spaces</li>
          <li>cruiser of 3 spaces</li>
          <li>submarine of 2 spaces</li>
        </section>
      </section>
    </div>
  );
}
