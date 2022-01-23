import "./Game.css";

import React from "react";
import Board from "../Board";

export default function Game() {
  return (
    <div className="game">
      <section className="main-container">
        <section className="top-container">
          <div className="game-board">
            <Board isPlayer/>
          </div>
          <div className="right-panel">
            <input className="name-input" placeholder="Player name"></input>
            <button className="startGame-button"> Start Game</button>
          </div>
        </section>
        <section className="bottom-container">
        <b>Available ships:</b>
        <li>carrier of 4 spaces</li>
        <li>cruiser  of 3 spaces</li>
        <li>cruiser  of 3 spaces</li>
        <li>cruiser  of 3 spaces</li>
        <li>submarine of 2 spaces</li>
        </section>
      </section>
    </div>
  );
}
