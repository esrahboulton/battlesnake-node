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
      return i
    }
  }
  return -1
}

function getHead(req){
  return req.you.body[0]
}

function getTail(req){
  var len = req.you.body.length
  return req.you.body[len-1]
}

function getHeightWidth(req){
  return req.board.height
}

exports.getSnakes = getSnakes;
exports.getFood = getFood;
exports.getYou = getYou;
exports.getBody = getBody;
exports.getID = getID;
exports.getIndex = getIndex;
exports.getHead = getHead;
exports.getTail = getTail;
exports.getHeightWidth = getHeightWidth;
