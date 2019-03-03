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
var {timeout} = require('../helpers/timeoutHelper')
var aStarHelper = require('../helpers/aStarHelper')

// Handle POST request to '/start'
router.post('/start', function(req, res) {
  var data = {
    color: "#FFD957",
    secondary_color: "#D15BFE",
    head_url: "https://i.ytimg.com/vi/ZCVTIF1ey0c/hqdefault.jpg",
    head_type: "tongue",
    tail_type: "skinny"
  }
  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', async function(req, res) {
  try {
    var req = req.body
    var index = jsonHelper.getIndex(req)
    var snakes = jsonHelper.getSnakes(req)
    var moveOptions = [true, true, true, true]
    var moveIndex = moveHelper.pickMove(req, moveOptions)
    var options = ['left', 'right', 'up', 'down']
    var snakeHead = snakeHeadHelper.snakeHead(req.you)

    var dim = req.board.height
    var id = jsonHelper.getID(req)
    var board = await boardHeler.setupBoard(req, dim, id)
    // console.log(board)

    // ---------------------------------------------
    // VARIABLES
    // ---------------------------------------------
    let nearestFood;
    let needsFood;
    let OneVsOne = snakes.length == 2 && snakes[1 - index].body.length < jsonHelper.getBody(req);
    let killMove = killHelper.kill(req, snakeHead)


    if(req.board.food.length != 0){
      nearestFood = foodHelper.findFood(req)
    } else {
      nearestFood = false
    }
    if(nearestFood != false){
      needsFood = foodHelper.needFood(req)
      if(req.you.body.length < req.board.height){
        needsFood = true
      }
    } else {
      needsFood = false
    }
    var move;

    if (needsFood && nearestFood) {
      move = aStarHelper.aStar(snakeHead, nearestFood, board, dim, dim)
    } else if (OneVsOne) {
      move = aStarHelper.aStar(
        snakeHead,
        snakes[1 - index].body[0],
        board,
        dim,
        dim
      )
    } else {
      move = aStarHelper.aStar(
        snakeHead,
        req.you.body[req.you.body.length - 1],
        board,
        dim,
        dim
      )
    }
    if(move != null){
      var data = {
        move: move, // one of: ['up','down','left','right']
      }
      return res.json(data)
    }

    if (OneVsOne) {
      // 1v1 time. We are king snek, actively kill the other snek
      var enemyName = snakes[1 - index].name
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
    }

    timeout(() => {
      if (!res.headersSent) {
        // console.log("fallback..");
        res.json(data).end();
      }
    })
    return res.json(data)
  } catch(e) {
    console.log(e);
  }

})

router.post('/end', function(req, res) {
  return res.json({})
})

router.post('/ping', function(req, res) {
  return res.json({})
})

module.exports = router
