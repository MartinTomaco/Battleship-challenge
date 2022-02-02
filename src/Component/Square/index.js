import React, { useState } from "react";

import "./Square.css";

export default function Square(props) {

  const [isSelected, setSelected] = useState(false);
  const { id } = props;
  let addedClass = "";
  isSelected ? (addedClass = "selected") : (addedClass = "");

  const handleClick = () => {
    console.log(`Square id=${id} ${addedClass}`);
    setSelected(!isSelected);
    
  };
  
  return (
    <button onClick={handleClick} className={`square ${addedClass}`}>
      {``}
    </button>
  );
}
