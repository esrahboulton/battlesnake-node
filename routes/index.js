var express = require('express')
var router  = express.Router()

var snakeHeadHelper = require('../helpers/snakeHead')
var foodHelper = require('../helpers/foodHelper')
var pathHelper = require('../helpers/pathHelper')
var selfHelper = require('../helpers/selfHelper')
var senksHelper = require('../helpers/senksHelper')
var wallsHelper = require('../helpers/wallsHelper')
var killHelper = require('../helpers/killHelper')
//var killHelper = require('../helpers/killHelper')
var jsonHelper = require('../helpers/jsonHelper')

function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  senksHelper.avoidSenks(data, head, moveOptions)
  //killHelper.killOrAvoid(data, head, moveOptions)
  //selfHelper.avoidSelf(data, head, moveOptions)
  wallsHelper.avoidWalls(head, wallHeight, wallWidth, moveOptions)

  for (i=0; i < moveOptions.length; i++) {
    if (moveOptions[i] === true) {
      return i
    }
  }
}

function findFood(data, req) {
  var foodLocation = jsonHelper.getFood(req)
  var head = snakeHeadHelper.snakeHead(data.you)
  var dist = []
  if (foodLocation.length >= 1){
    // go through all food on board
    for (var i = 0; i < foodLocation.length; i++){
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

function lookAhead(depth, move, body){
  console.log('here')
  if(depth == 0){
    return true;
  }
  var trapped = false;
  var head = body[0];
  var newHead;
  //['left', 'right', 'up', 'down']
  if(move === 'left'){
    newHead = head.x -1;
  }else if(move === 'right'){
    newHead = head.x +1;
  }else if(move === 'up'){
    newHead = head.y -1;
  }else if(move === 'down'){
    newHead = head.y +1;
  }

  body = body.slice(body.length -1);
  //Add a segment to the head of the snake and then check for vaild moves
  body.unshift()


  return lookAhead(depth -1, move, body);

  // if(trapped){
  //   return trapped;
  // }else {
  //   return lookAhead(depth -1, move, body);
  // }
}

var taunts = [
  'You\'re hisssstory!',
  'nothing personnel kid',
  'try again sweaty',
       'haha me too thanks',
  'The Hisssss of Death!'
];

// Handle POST request to '/start'
router.post('/start', function (req, res) {

  var data = {
    color: "#FFD957",
    secondary_color: "#D15BFE",
    head_url: "https://m.popkey.co/3771fc/Aojzp.gif",
    taunt: "OH GOD NOT THE BEES",
    head_type: "tongue",
    tail_type: "skinny"
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  var myID = req.body.you.id
  var myIndex;
  var snakes = jsonHelper.getSnakes(req)
  for(i = 0; i < snakes.length; i++){
    if(snakes[i].id == myID){
      myIndex = i
    }
  }

  var moveOptions = [true, true, true, true];
  var moveIndex = pickMove(req.body, moveOptions)
  var options = ['left', 'right', 'up', 'down']
  var snakeHead = snakeHeadHelper.snakeHead(req.body.you)
  var nearestFood = findFood(req.body, req)
  var needsFood = foodHelper.needFood(req.body)
  var move;

  var killMove = killHelper.kill(req.body, snakeHead, moveOptions)
  //console.log(killMove)

  if(snakes.length == 2 && snakes[1-myIndex].body.data.length < jsonHelper.getBody(req)){
    // 1v1 time
    //We are king snek, actively kill the other snek
    var path = pathHelper.findPath(snakeHead, snakes[1-myIndex].body.data[0])
    var choice = Math.random()
    var pathOption = 0
    if(choice <= 0.5){
      pathOption = 1
    }
    if (path.length > 1) {
      move = path[pathOption]
      for(i = 0; i < moveOptions.length; i++){
        if(move === options[i] && !moveOptions[i]){
          move = path[1 - pathOption]
        }
      }
    } else {
      move = path[0]
    }
  } else if (needsFood) {
    var path = pathHelper.findPath(snakeHead, nearestFood)
    var choice = Math.random()
    var pathOption = 0
    if(choice <= 0.5){
      pathOption = 1
    }
    if (path.length > 1) {
      move = path[pathOption]
      for(i = 0; i < moveOptions.length; i++){
        if(move === options[i] && !moveOptions[i]){
          move = path[1 - pathOption]
        }
      }
    } else {
      move = path[0]
    }
  } else if (!(killMove === 'no kill')) {
    move = killMove
  }else {
    // Random movement
    // var index = Math.floor((Math.random() * 4))
    // move = options[index]

    //follow tail
    var myLength = req.body.you.body.data.length
    var tail = req.body.you.body.data[myLength-1]
    var path = pathHelper.findPath(snakeHead, tail)
    var choice = Math.random()
    var pathOption = 0
    if(choice <= 0.5){
      pathOption = 1
    }
    if (path.length > 1) {
      move = path[pathOption]
      for(i = 0; i < moveOptions.length; i++){
        if(move === options[i] && !moveOptions[i]){
          move = path[1 - pathOption]
        }
      }
    } else {
      move = path[0]
    }

  }

  //Check if move is invalid
  for(i = 0; i < options.length; i++){
    if(move === options[i] && !moveOptions[i]){
      move = options[moveIndex]
    }
  }

  lookAhead(0, 'left', req.body.you.body.data)

  //console.log(move)
  //console.log(moveOptions)
  var turn = req.body.turn
  var taunt = Math.floor((turn/10))%5

  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt: taunts[taunt],
    head: snakeHead,
    nearestFood: nearestFood,
    needsFood: needsFood,
    path: pathHelper.findPath(snakeHead, nearestFood)
  }

   return res.json(data)
 })

 module.exports = router
