import React  from "react";

import "./Square.css";

export default function Square(props) {
  const {id} = props;
  
  const handleClick= () => {
    console.log(`Clicked id=${id}`)
  }
 

  return (
    <button onClick={handleClick} className="square">
      {``}
    </button>
  );
}
