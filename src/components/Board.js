import React from "react";
import Row from "./Row";
import "../css/Board.css";

//react element which shows the all pieces
export default function Board({ click, state }) {
  const y = [1, 2, 3, 4, 5, 6, 7, 8];
  let rows = y.map((row) => (
    <Row y={row} click={click} state={state} key={row} />
  ));
  return <div className="board">{rows}</div>;
}
