var snakeHeadHelper = require('../helpers/snakeHead')
var snakesHelper = require('../helpers/snakesHelper')
var wallsHelper = require('../helpers/wallsHelper')

function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.board.height;
  var wallWidth = data.board.width;

  snakesHelper.avoidSnakes(data, head, moveOptions)
  wallsHelper.avoidWalls(head, wallHeight, wallWidth, moveOptions)

  for (i = 0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }
}

exports.pickMove = pickMove;
