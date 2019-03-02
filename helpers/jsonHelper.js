function getSnakes(req) {
  return req.board.snakes;
}

function getFood(req) {
  return req.board.food;
}

function getYou(req) {
  return req.you
}

function getBody(req) {
  return req.you.body.length
}

function getID(req) {
  return req.you.id
}

function getIndex(req) {
  var ID = getID(req)
  var snakes = getSnakes(req)
  for (i = 0; i < snakes.length; i++) {
    if (snakes[i].id == ID) {
      return i;
    }
  }
  return -1
}

exports.getSnakes = getSnakes;
exports.getFood = getFood;
exports.getYou = getYou;
exports.getBody = getBody;
exports.getID = getID;
exports.getIndex = getIndex;
