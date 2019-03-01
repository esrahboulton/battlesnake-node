function avoidWalls(head, dim, moveOptions) {
  if (head.x - 1 < 0) {
    //cant go left
    moveOptions[0] = false
  }
  if (head.x + 1 >= dim) {
    //cant go right
    moveOptions[1] = false
  }
  if (head.y - 1 < 0) {
    //cant go up
    moveOptions[2] = false
  }
  if (head.y + 1 >= dim) {
    //cant go down
    moveOptions[3] = false
  }
}
exports.avoidWalls = avoidWalls;
