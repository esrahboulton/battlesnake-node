var express = require('express')
var router  = express.Router()

var snakeHeadHelper = require('../helpers/snakeHead')
var foodHelper = require('../helpers/foodHelper')
var pathHelper = require('../helpers/pathHelper')
var senksHelper = require('../helpers/senksHelper')
var wallsHelper = require('../helpers/wallsHelper')
var killHelper = require('../helpers/killHelper')
var jsonHelper = require('../helpers/jsonHelper')
var moveHelper = require('../helpers/moveHelper')

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
  var ID = jsonHelper.getID(req)
  var index = jsonHelper.getIndex(req);
  var snakes = jsonHelper.getSnakes(req)
  var turn = req.body.turn
  var taunt = Math.floor((turn/10))%5
  var moveOptions = [true, true, true, true];
  var moveIndex = moveHelper.pickMove(req.body, moveOptions)
  var options = ['left', 'right', 'up', 'down']
  var snakeHead = snakeHeadHelper.snakeHead(req.body.you)
  var nearestFood = foodHelper.findFood(req.body, req)
  var needsFood = foodHelper.needFood(req.body)
  var move;

  var killMove = killHelper.kill(req.body, snakeHead, moveOptions)

  if(snakes.length == 2 && snakes[1-index].body.data.length < jsonHelper.getBody(req)){
    // 1v1 time. We are king snek, actively kill the other snek
    var path = pathHelper.findPath(snakeHead, snakes[1-index].body.data[0])
    move = pathHelper.pick(path, moveOptions, options)
  } else if (needsFood) {
    var path = pathHelper.findPath(snakeHead, nearestFood)
    move = pathHelper.pick(path, moveOptions, options)
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
    move = pathHelper.pick(path, moveOptions, options)
  }

  //Check if move is invalid
  for(i = 0; i < options.length; i++){
    if(move === options[i] && !moveOptions[i]){
      move = options[moveIndex]
    }
  }

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