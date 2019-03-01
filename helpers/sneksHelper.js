var jsonHelper = require('../helpers/jsonHelper')

function avoidSneks(data, head, moveOptions) {
  var snakes = data.board.snakes
  for (i = 0; i < snakes.length; i++) {
    var snek = snakes[i].body;
    var len = snek.length
    if(snakes[i].id == jsonHelper.getID(data)){
      len = len-1
    }
    for (j = 0; j < len; j++) {
      if (head.x - 1 == snek[j].x && head.y == snek[j].y) {
        //cant go left
        moveOptions[0] = false
      }
      if (head.x + 1 == snek[j].x && head.y == snek[j].y) {
        //cant go right
        moveOptions[1] = false
      }
      if (head.x == snek[j].x && head.y - 1 == snek[j].y) {
        //cant go up
        moveOptions[2] = false
      }
      if (head.x == snek[j].x && head.y + 1 == snek[j].y) {
        //cant go down
        moveOptions[3] = false
      }
    }
  }
}
exports.avoidSneks = avoidSneks;
