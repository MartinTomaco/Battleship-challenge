import React, { useState } from 'react';

import './Square.css';

export default function Square(props) {
  const [isSelected, setSelected] = useState(false);
  const { id } = props;
  let addedClass = '';

  addedClass = isSelected ? ('selected') : ('');

  const handleClick = () => {
    console.log(`Square id=${id} ${addedClass}`);
    setSelected(!isSelected);
  };

  return (
    <button type="button" aria-label="skip-lint" onClick={handleClick} className={`square ${addedClass}`} />
  );
}
