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
var onevoneMeHelper = require('../helpers/onevoneMeHelper')

function pickMove(data, moveOptions) {
  var head = snakeHeadHelper.snakeHead(data.you);
  var wallHeight = data.height;
  var wallWidth = data.width;

  senksHelper.avoidSenks(data, head, moveOptions)
  // killHelper.killOrAvoid(data, head, moveOptions)
  selfHelper.avoidSelf(data, head, moveOptions)
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
    head_url: "http://placecage.com/c/100/100",
    taunt: "OH GOD NOT THE BEES",
    head_type: "tongue",
    tail_type: "skinny"
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {


  var moveOptions = [true, true, true, true];
  var moveIndex = pickMove(req.body, moveOptions)
  var options = ['left', 'right', 'up', 'down']
  var snakeHead = snakeHeadHelper.snakeHead(req.body.you)
  var nearestFood = findFood(req.body, req)
  var needsFood = foodHelper.needFood(req.body)
  //var snakes = jsonHelper.getSnakes(req.body)
  var move;

  var killMove = killHelper.kill(req.body, snakeHead, moveOptions)
  //console.log(killMove)

  if (needsFood) {
    var path = pathHelper.findPath(snakeHead, nearestFood)
    var choice = Math.random()
    var pathOption = 0
    if(choice <= 0.5){
      pathOption = 1
    }
    if(path.length > 1){
      move = path[pathOption]
      for(i = 0; i < moveOptions.length; i++){
      if(move === options[i] && !moveOptions[i]){
        move = path[1 - pathOption]
      }
    } else {
      move = path[0]
    }
  } else if (!(killMove === 'no kill')) {
    move = killMove
  }else {
    var index = Math.floor((Math.random() * 4))
    move = options[index]
  }

  //Check if move is invalid
  for(i = 0; i < options.length; i++){
    if(move === options[i] && !moveOptions[i]){
      move = options[moveIndex]
    }
  }

  console.log(move)
  console.log(moveOptions)
  
  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt: taunts[Math.floor((Math.random() * 5))],
    head: snakeHead,
    nearestFood: nearestFood,
    needsFood: needsFood,
    path: pathHelper.findPath(snakeHead, nearestFood)
  }
 
   return res.json(data)
 })
 
 module.exports = router
