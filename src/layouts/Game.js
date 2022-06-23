import Board from "../components/Board";
import React from "react";
import io from "socket.io-client";
import brd from "../img/chessBoard.png";
import changeTurn from "../utilities/changeTurn";
const socket = io.connect("http://localhost:5000");

function Game({ click, state }) {
  let whoWon =
    state.result === "check-mate"
      ? `by ${changeTurn(state.whoseTurn)}, ${state.whoseTurn} lost`
      : "";
  return (
    <div className="placement">
      <div className="imgplace">
        <img src={brd} alt="" />
      </div>
      <Board click={click} state={state} />
      {state.result !== null && (
        <div className="result">{`${state.result} ${whoWon}`}</div>
      )}
    </div>
  );
}

export default Game;
