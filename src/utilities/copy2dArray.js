import createPiece from "./createPiece";
//function creating the copy of board because it is not possible without it
function copy2dArray(currentArray) {
  return currentArray.map((arr) => {
    return arr.map((elem) => {
      return createPiece(
        elem.piece,
        elem.x,
        elem.y,
        elem.pieceColor,
        elem.didMove ?? 0
      );
    });
  });
}

export default copy2dArray;
