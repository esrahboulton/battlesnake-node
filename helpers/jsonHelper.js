function getSnakes(req) {
  return req.body.snakes;
}

function getFood(req) {
  return req.body.food;
}

function getYou(req) {
  return req.body.you
}

function getBody(req) {
  return req.body.you.body.length
}

function getID(req) {
  return req.body.you.id
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
