import React from 'react'
import "../Game.css";

const GameCircle = ({ id, children, className, onCircleClicked }) => {

  return (
    <div className="gameCircleContainer" onClick={() => onCircleClicked(id)}>
      {className !== 'player0' && <div className={`piece ${className}`}></div>}
      <div className="boardFace"></div>
    </div>
  )
}
export default GameCircle