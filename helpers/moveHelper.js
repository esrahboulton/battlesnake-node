var snakeHeadHelper = require('../helpers/snakeHead')
var sneksHelper = require('../helpers/sneksHelper')
var wallsHelper = require('../helpers/wallsHelper')

function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.board.height;
  var wallWidth = data.board.width;

  sneksHelper.avoidSneks(data, head, moveOptions)
  wallsHelper.avoidWalls(head, wallHeight, wallWidth, moveOptions)

  for (i = 0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }
}

exports.pickMove = pickMove;
