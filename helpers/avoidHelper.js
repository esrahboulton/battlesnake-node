function avoid(data, head) {
  var snakes = data.board.snakes
  for (i = 0; i < snakes.length; i++) {
    var snek = snakes[i].body;
    if (snek.length < data.you.body.length) {
      //They are bigger so we should not try and kill
      continue
    }

    var sX = snek[0].x
    var sY = snek[0].y
    var xDist = sX - head.x
    var yDist = sY - head.y
    var distSum = Math.abs(xDist) + Math.abs(yDist)

    if (distSum != 2) {
      //snek is too far away to consider killing
      continue
    }
    //left, right, up, down
    if (xDist == 0) {
      //We are on the same vertical line as the enemy
      if (yDist == -2) {
        //They're above us, go up
        return [2]
      }
      if (yDist == 2) {
        //They're below us, go down
        return [3]
      }
    }
    if (yDist == 0) {
      //We are on the same horizontal line as the enemy
      if (xDist == -2) {
        //They're to the left
        return [0]
      }
      if (xDist == 2) {
        //They're to the right
        return [1]
      }
    }
    var choice = Math.random()
    //Add more logic here to guess which way they will go
    if (xDist == 1 && yDist == 1) {
      //They're to the right and down
      return [1, 3]
    }
    if (xDist == 1 && yDist == -1) {
      //They're to the right and up
      return [1, 2]
    }
    if (xDist == -1 && yDist == 1) {
      //They're to the left and down
      return [0, 3]
    }
    if (xDist == -1 && yDist == -1) {
      //They're left and up
      return [0, 2]
    }
  }
  return ['all good']
}
exports.avoid = avoid;
