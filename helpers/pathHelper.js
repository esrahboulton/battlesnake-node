function findPath(head, target) {
  var xMoves = target.x - head.x;
  var yMoves = target.y - head.y;
  var left = false;
  var right = false;
  var up = false;
  var down = false;
  if (xMoves < 0) {
    //moving left
    left = true;
  } else if (xMoves > 0) {
    right = true;
  }
  if (yMoves < 0) {
    //moving up
    up = true
  } else if (yMoves > 0) {
    down = true;
  }
  var horiz = [];
  var vert = [];
  if (left) {
    horiz.push('left')
  }
  if (right) {
    horiz.push('right')
  }
  if (up) {
    horiz.push('up')
  }
  if (down) {
    horiz.push('down')
  }
  var path = horiz.concat(vert)
  return path
}

function pick(path, moveOptions, options) {
  var move;
  var choice = Math.random()
  var pathOption = 0
  if (choice <= 0.5) {
    pathOption = 1
  }
  if (path.length > 1) {
    move = path[pathOption]
    for (i = 0; i < moveOptions.length; i++) {
      if (move === options[i] && !moveOptions[i]) {
        move = path[1 - pathOption]
      }
    }
  } else {
    move = path[0]
  }
  return move
}

exports.findPath = findPath;
exports.pick = pick
