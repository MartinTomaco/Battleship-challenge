import React from "react";
import Square from "../Square";
import "./Board.css";

export default function Board(isPlayer) {
  let ide = "";
  isPlayer ? (ide = "p") : (ide = "c"); //It could be player or CPU

  let renderRow = (rowNumber) => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(<Square id={`${ide}${rowNumber}${i}`} />);
    }
    return <>{rows}</>;
  };

  return (
    <div>
      <div className="board-row">{renderRow(0)}</div>
      <div className="board-row">{renderRow(1)}</div>
      <div className="board-row">{renderRow(2)}</div>
      <div className="board-row">{renderRow(3)}</div>
      <div className="board-row">{renderRow(4)}</div>
      <div className="board-row">{renderRow(5)}</div>
      <div className="board-row">{renderRow(6)}</div>
      <div className="board-row">{renderRow(7)}</div>
      <div className="board-row">{renderRow(8)}</div>
      <div className="board-row">{renderRow(9)}</div>
    </div>
  );
}
