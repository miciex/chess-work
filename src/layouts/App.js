import "../css/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import CreateBoard from "../components/CreateBoard";
import Main from "./Main";

function App() {
  //variable state is handed over to the Square pieces and used there.
  //Set state is a function which changes state and rerenders react elements in which something changed after changing state.
  //Set state is also handed over to Square component so that it is possible to change the state from the Square component.
  //IMPORTANT!!! state doesn't instatly after calling the setState function it changes when the rerendering starts.
  const [state, setState] = useState({
    board: CreateBoard(),
    clickedSquare: ["", ""],
    moves: [],
    lastMove: null,
    whoseTurn: "white",
    ifPlayable: true,
    possibleMoves: [],
    promote: ["", ""],
    result: null,
    howManyMovesAnyTook: 0,
    fenArray: [],
  });

  //function used to to change state
  const handleOnClick = (data) => {
    setState(data);
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Main click={handleOnClick} state={state} />
    </Router>
  );
}

export default App;
