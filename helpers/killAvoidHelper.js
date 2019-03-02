function killOrAvoid(data, head, moveOptions) {
  var snakes = data.board.snakes
  for (i = 0; i < snakes.length; i++) {
    var snek = snakes[i].body;
    var sX = snek[0].x
    var sY = snek[0].y

    if (
      (head.y - 1 == sY || head.y + 1 == sY) &&
      head.x - 1 == sX ||
      (head.y == sY && head.x - 2 == sX)
    ) {
      if (you.length > snek.length) {
        moveOptions[0] = true //go left and kill
      }
    }
    if (
      (head.y - 1 == sY || head.y + 1 == sY) &&
      head.x + 1 == sX ||
      (head.y == sY && head.x + 2 == sX)
    ) {
      if (you.length > snek.length) {
        moveOptions[1] = true //go right and kill
      }
    }
    if (
      (head.x - 1 == sX || head.x + 1 == sX) &&
      head.y - 1 == sY ||
      (head.x == sX && head.y - 2 == sY)
    ) {
      if (you.length > snek.length) {
        moveOptions[2] = true //go up and kill
      }
    }
    if (
      (head.x - 1 == sX || head.x + 1 == sX) &&
      head.y + 1 == sY ||
      (head.x == sX && head.y + 2 == sY)
    ) {
      if (you.length > snek.length) {
        moveOptions[2] = true //go down and kill
      }
    }
  }
}
exports.killOrAvoid = killOrAvoid;
