// class which is used to create empty squares also it is the foundation of class Piece and specific pieces classes. To save memory it is possible to remove pieceColor and piece variable from it.
class SquareData {
  constructor(x, y, pieceColor = "", piece = "") {
    this.x = x;
    this.y = y;
    this.pieceColor = pieceColor;
    this.piece = piece;
  }
}

export default SquareData;
