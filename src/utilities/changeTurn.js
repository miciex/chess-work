//function which changes turns from black to white and from white to black
function changeTurn(turn) {
  if (turn === "white") {
    return "black";
  } else if (turn === "black") {
    return "white";
  } else return;
}

export default changeTurn;
