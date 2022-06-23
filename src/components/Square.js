import React from "react";
import "../css/Square.css";
import boardhandle from "./boardhandle";
import AllPromotion from "./AllPromotion";
import moveUt from "../utilities/moveUt";

//returns react element.
export default function Square({ click, x, y, state, promotion }) {
  let data = null;
  //variable to check if on this square the Allpromotion element should be shown
  let prom;
  if (state.clickedSquare[0] !== "")
    prom =
      state.promote[0] === x - 1 &&
      state.promote[1] === y - 1 &&
      state.board[state.clickedSquare[1]][state.clickedSquare[0]].piece ===
        "Pawn";

  return (
    <>
      <div
        className={"square " + state.board[y - 1][x - 1].pieceColor}
        onClick={() => {
          //boardhandle returns the new state of the App.js element of null if null is returned the state doesn't change
          data = boardhandle(state, x - 1, y - 1, promotion);
          if (data !== null) click(data);
        }}
      >
        {/* showing the piece */}
        {state.board[y - 1][x - 1].piece}
      </div>
      {/* if the conditions are met show the AllPromotion element */}
      {prom === true && moveUt(state.possibleMoves, y - 1, x - 1) ? (
        <AllPromotion state={state} click={click} x={x - 1} y={y - 1} />
      ) : null}
    </>
  );
}
