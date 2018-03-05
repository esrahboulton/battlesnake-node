function needFood(data){
  var snakeHealth = data.you.health
  var wallHeight = data.height
  var wallWidth = data.width
  var dimSum = wallWidth + wallHeight
  var numFood = data.food.data.length
  var threshold = 50 - (10*numFood)
  if(threshold > 0){
  	dimSum += threshold
  }

  if (snakeHealth <= dimSum) {
    return true;
  } else{
    return false;
  }
}
exports.needFood = needFood;