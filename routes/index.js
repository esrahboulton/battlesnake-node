var express = require('express')
var router = express.Router()

var snakeHeadHelper = require('../helpers/snakeHead')
var foodHelper = require('../helpers/foodHelper')
var pathHelper = require('../helpers/pathHelper')
var wallsHelper = require('../helpers/wallsHelper')
var killHelper = require('../helpers/killHelper')
var jsonHelper = require('../helpers/jsonHelper')
var moveHelper = require('../helpers/moveHelper')
var avoidHelper = require('../helpers/avoidHelper')
var boardHeler = require('../helpers/boardHelper')

var taunts = [
  'You\'re hisssstory!',
  'nothing personnel kid',
  'try again sweaty',
  'haha me too thanks',
  'The Hisssss of Death!'
];

// Handle POST request to '/start'
router.post('/start', function(req, res) {
  var data = {
    color: "#FFD957",
    secondary_color: "#D15BFE",
    head_url: "https://i.ytimg.com/vi/ZCVTIF1ey0c/hqdefault.jpg",
    taunt: "OH GOD NOT THE BEES",
    head_type: "tongue",
    tail_type: "skinny"
  }
  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function(req, res) {
  var req = req.body
  var index = jsonHelper.getIndex(req)
  var snakes = jsonHelper.getSnakes(req)
  var turn = req.turn
  var taunt = Math.floor((turn / 10)) % 5
  var moveOptions = [true, true, true, true]
  var moveIndex = moveHelper.pickMove(req, moveOptions)
  var options = ['left', 'right', 'up', 'down']
  var snakeHead = snakeHeadHelper.snakeHead(req.you)

  // var dim = req.board.height
  // var id = jsonHelper.getID(req)
  // var board = boardHeler.setupBoard(req, dim, id)
  // console.log(board)

  if(req.board.food.length != 0){
    var nearestFood = foodHelper.findFood(req)
  } else {
    var nearestFood = false
  }
  if(nearestFood != false){
    var needsFood = foodHelper.needFood(req)
    if(req.you.body.length < req.board.height){
      needsFood = true
    }
  } else {
    needsFood = false
  }
  var move;

  var tauntBoi = taunts[taunt];

  var killMove = killHelper.kill(req, snakeHead)

  if (snakes.length == 2 && snakes[1 - index].body.length < jsonHelper.getBody(req) && !needsFood) {
    // 1v1 time. We are king snek, actively kill the other snek
    var enemyName = snakes[1 - index].name
    var tauntBoi = 'rip, ' + enemyName
    var path = pathHelper.findPath(snakeHead, snakes[1 - index].body[0])
    move = pathHelper.pick(path, moveOptions, options)
  } else if (nearestFood != false && needsFood) {
  // } else if (needsFood) {
    var path = pathHelper.findPath(snakeHead, nearestFood)
    move = pathHelper.pick(path, moveOptions, options)
  } else if (!(killMove === 'no kill')) {
    move = killMove
  } else {
    //follow tail
    var myLength = jsonHelper.getBody(req)
    var tail = req.you.body[myLength - 1]
    var path = pathHelper.findPath(snakeHead, tail)
    if(path.length == 0 ){
      var index = Math.floor((Math.random() * 4))
      move = options[index]
    } else {
      move = pathHelper.pick(path, moveOptions, options)
    }
  }

  //Check if move is invalid
  for (i = 0; i < options.length; i++) {
    if (move === options[i] && !moveOptions[i]) {
      move = options[moveIndex]
    }
  }

  /// TODO: add avoid, need to not do our current move if another move exists
  var avoid = avoidHelper.avoid(req, snakeHead)
  if (!(avoid[0] === 'all good')) {
    //Avoid something
    if (avoid.length == 1) {
      if (move == options[avoid[0]]) {
        for (i = 0; i < options.length; i++) {
          if (i != avoid[0] && moveOptions[i]) {
            move = options[i];
          }
        }
      }
    } else if (avoid.length == 2) {
      if (move == options[avoid[0]] || move == options[avoid[1]]) {
        //change this move if there is another valid move
        for (i = 0; i < options.length; i++) {
          if (i != avoid[0] && i != avoid[1] && moveOptions[i]) {
            move = options[i]
          }
        }
      }
    }
  }

  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt: tauntBoi
  }
  return res.json(data)
})

router.post('/end', function(req, res) {
  return res.json({})
})

router.post('/ping', function(req, res) {
  return res.json({})
})

module.exports = router
