import React from 'react';
import Square from '../Square';
import './Board.css';

const Board = (props) => {
  const { isPlayerBoard, isCpuBoard } = props;
  const renderRow = (rowNumber) => {
    const columns = [];
    for (let i = 0; i < 10; i += 1) {
      columns.push(<Square isPlayerBoard={isPlayerBoard} isCpuBoard={isCpuBoard} key={`${rowNumber}${i}`} id={`${rowNumber}${i}`} />);
    }
    return <div>{columns}</div>;
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < 10; i += 1) {
      rows.push(<div key={i} className="board-row">{renderRow(i)}</div>);
    }
    return <div className="board">{rows}</div>;
  };

  return renderBoard();
};

export default Board;
