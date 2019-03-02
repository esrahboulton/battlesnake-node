var jsonHelper = require('../helpers/jsonHelper')
var snakeHeadHelper = require('../helpers/snakeHead')

function needFood(data) {
  var snakeHealth = data.you.health
  var wallHeight = data.board.height
  var wallWidth = data.board.width
  var dimSum = wallWidth + wallHeight
  var numFood = data.board.food.length
  var threshold = 50 - (10 * numFood)
  if (threshold > 0) {
    dimSum += threshold
  }

  if (snakeHealth <= dimSum) {
    return true;
  } else {
    return false;
  }
}

function findFood(data) {
  var foodLocation = jsonHelper.getFood(data)
  var head = snakeHeadHelper.snakeHead(data.you)
  var dist = []
  if (foodLocation.length >= 1) {
    // go through all food on board
    for (var i = 0; i < foodLocation.length; i++) {
      var x = Math.abs(head.x - foodLocation[i].x)
      var y = Math.abs(head.y - foodLocation[i].y)
      dist[i] = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }
    // index of minimum distance food
    var min = dist.indexOf(Math.min(...dist))
    return foodLocation[min]
  }
  return foodLocation[0]
}

exports.needFood = needFood;
exports.findFood = findFood;
