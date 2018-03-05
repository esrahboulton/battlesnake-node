function kill(data, head, moveOptions){
  var snakes = data.snakes.data
  for(i = 0; i < snakes.length; i++){
    var snek = snakes[i].body.data;
    if(snek.length >= data.you.body.data.length){
      //They are bigger so we should not try and kill
      continue
    }

    var sX = snek[0].x
    var sY = snek[0].y
    var xDist = sX - head.x
    var yDist = sY - head.y
    var distSum = Math.abs(xDist) + Math.abs(yDist)

    if(distSum != 2){
      //snek is too far away to consider killing
      continue
    }
    //left, right, up, down
    if(xDist == 0){
      //We are on the same vertical line as the enemy
      if(yDist == -2){
        //They're above us, go up
        //moveOptions[2] = true
        return 'up'
      }
      if(yDist == 2){
        //They're below us, go down
        //moveOptions[3] = true
        return 'down'
      }
    }
    if(yDist == 0){
      //We are on the same horizontal line as the enemy
      if(xDist == -2){
        //They're to the left
        //moveOptions[0] = true
        return 'left'
      }
      if(xDist == 2){
        //They're to the right
        //moveOptions[1] = true
        return 'right'
      }
    }
    var choice = Math.random()
    //Add more logic here to guess which way they will go
    if(xDist == 1 && yDist == 1){
      //They're to the right and down
     // moveOptions[1] = true
      //moveOptions[3] = true
      if(choice <= 0.5){
        return 'right'
      } else {
        return 'down'
      }
    }
    if(xDist == 1 && yDist == -1){
      //They're to the right and up
      //moveOptions[1] = true
      //moveOptions[2] = true
      iif(choice <= 0.5){
        return 'right'
      } else {
        return 'up'
      }
    }
    if(xDist == -1 && yDist == 1){
      //They're to the left and down
      //moveOptions[0] = true
      //moveOptions[3] = true
      if(choice <= 0.5){
        return 'left'
      } else {
        return 'down'
      }
    }
    if(xDist == -1 && yDist == -1){
      //They're left and up
      //moveOptions[0] = true
      //moveOptions[2] = true
      if(choice <= 0.5){
        return 'left'
      } else {
        return 'up'
      }
    }
    return 'no kill'
}
exports.kill = kill;