var jsonHelper = require('../helpers/jsonHelper')
var snakeHeadHelper = require('../helpers/snakeHead')
var pathHelper = require('../helpers/pathHelper')

function needFood(req) {
  var snakeHealth = req.you.health
  var wallHeight = req.board.height
  var wallWidth = req.board.width
  var dimSum = wallWidth + wallHeight
  var numFood = req.board.food.length
  // add threshold here if needed

  if (snakeHealth <= dimSum) {
    return true;
  } else {
    return false;
  }
}

function findFood(req) {
  var foodLocation = jsonHelper.getFood(req)
  var head = snakeHeadHelper.snakeHead(req.you)
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

function hungry(req, moves){
  var food = jsonHelper.getFood(req)
  if(food.length != 0){
    // food on board
    if(needFood(req)){
      var nearestFood = findFood(req)
      // get path to food and return the move
      var path = pathHelper.findPath(head, nearestFood)
      for(i = 0; i < 4; i++){
        if(path[i] && moves[i]){
          return path
        }
      }
    }
  }
  return false
}

exports.hungry = hungry;
// exports.needFood = needFood;
// exports.findFood = findFood;
