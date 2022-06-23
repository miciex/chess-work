//function used to change full piece name to it's representation by a letter used in FEN string
function pieceToValue(piece) {
  switch (piece) {
    case "Rook":
      return "R";
    case "Knight":
      return "N";
    case "Bishop":
      return "B";
    case "Queen":
      return "Q";
    case "King":
      return "K";
    case "Pawn":
      return "P";
  }
  return "";
}

export default pieceToValue;
