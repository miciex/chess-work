// function used to check if the square on the with given coordinates exists
function inBounds(x, y) {
  if (x <= 7 && x >= 0 && y >= 0 && y <= 7) return true;
  else return false;
}

export default inBounds;
