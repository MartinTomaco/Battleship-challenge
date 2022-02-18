import React from 'react';
import Square from '../Square';
import './Board.css';

const Board = () => {
  // eslint-disable-next-line no-shadow
  const renderRow = (rowNumber) => {
    const columns = [];
    for (let i = 0; i < 10; i += 1) {
      columns.push(<Square key={`${rowNumber}${i}`} id={`${rowNumber}${i}`} />);
    }
    return <div>{columns}</div>;
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < 10; i += 1) {
      rows.push(<div key={i} className="board-row">{renderRow(i)}</div>);
    }
    return <div>{rows}</div>;
  };

  return renderBoard();
};

export default Board;
