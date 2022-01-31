import React from "react";
import Square from "../Square";
import "./Board.css";

const Board = (props) => {
 
  const { isPlayer } = props;
  //It could be player(p) or CPU(c)
  
  let ide = "";
  isPlayer ? (ide = "p") : (ide = "c");

  



  let renderRow = (rowNumber, ide) => {
    let columns = [];
    for (let i = 0; i < 10; i++) {
      columns.push(<Square id={`${ide}${rowNumber}${i}`}/>);
    }
    return <>{columns}</>;
  };

  let renderBoard = () => {

    let rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(<div className="board-row">{renderRow(i, ide)}</div>);
    }
    return <>{rows}</>;
  };

  return renderBoard();
};

export default Board;
