function needFood(data){
  var snakeHealth = data.you.health
  var wallHeight = data.height
  var wallWidth = data.width
  var dimSum = wallWidth + wallHeight

  if (snakeHealth <= dimSum) {
    return true;
  } else{
    return false;
  }
}
exports.needFood = needFood;