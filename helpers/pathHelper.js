function findPath(head, target) {
  var xMoves = target.x - head.x;
  var yMoves = target.y - head.y;
  var path = [false, false, false, false]
  if (xMoves < 0) {
    //moving left
    path[0] = true;
  } else if (xMoves > 0) {
    path[1] = true;
  }
  if (yMoves < 0) {
    //moving up
    path[2] = true
  } else if (yMoves > 0) {
    path[3] = true;
  }
  for(i = 0; i < 4; i++){
    if(path[i]){
      return path
    }
  }
  return false
}

function pick(path, moveOptions) {
  var moves = ["left", "right", "up", "down"]
  var move = moves[0]
  var opt1 = false;
  var opt2 = false;
  for(i = 0; i < 4; i++){
    if(path[i] && moveOptions[i]){
      if(opt1 == -1){
        opt1 = i
      } else {
        opt2 = i;
      }
    }
  }
  if(opt1 && opt2){
    // pick a random move
    console.log("random")
    var flip = Math.random()
    if(flip < 0.5){
      move = moves[opt1]
    } else {
      move = moves[opt2]
    }
  } else if(opt1){
    // use option 1
    move = moves[opt1]
  } else {
    // use option2
    move = moves[opt2]
  }
  return move
}

exports.findPath = findPath;
exports.pick = pick
