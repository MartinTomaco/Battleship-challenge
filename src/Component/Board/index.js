import React from 'react';
import Square from '../Square';
import './Board.css';

const Board = (props) => {
  const { isPlayer } = props;
  // It could be player(p) or CPU(c)

  let ide = '';

  // eslint-disable-next-line no-unused-expressions
  isPlayer ? (ide = 'p') : (ide = 'c');

  // eslint-disable-next-line no-shadow
  const renderRow = (rowNumber, ide) => {
    const columns = [];
    for (let i = 0; i < 10; i += 1) {
      columns.push(<Square key={`${rowNumber}${i}`} id={`${ide}${rowNumber}${i}`} />);
    }
    return <div>{columns}</div>;
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < 10; i += 1) {
      rows.push(<div key={i} className="board-row">{renderRow(i, ide)}</div>);
    }
    return <div>{rows}</div>;
  };

  return renderBoard();
};

export default Board;
