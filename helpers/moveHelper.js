var snakeHeadHelper = require('../helpers/snakeHead')
var senksHelper = require('../helpers/senksHelper')
var wallsHelper = require('../helpers/wallsHelper')

function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  senksHelper.avoidSenks(data, head, moveOptions)
  wallsHelper.avoidWalls(head, wallHeight, wallWidth, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }
}

exports.pickMove = pickMove;