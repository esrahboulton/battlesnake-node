var express = require('express')
node_priority = require('node-priority-queue')
var router = express.Router()

// var snakeHeadHelper = require('../helpers/snakeHead')
var foodHelper = require('../helpers/foodHelper')
var safeMovesHelper = require('../helpers/safeMovesHelper')
var aStar = require('../helpers/aStarHelper')
// var pathHelper = require('../helpers/pathHelper')
// var snakesHelper = require('../helpers/snakesHelper')
// var wallsHelper = require('../helpers/wallsHelper')
// var killHelper = require('../helpers/killHelper')
var jsonHelper = require('../helpers/jsonHelper')
// var moveHelper = require('../helpers/moveHelper')
// var avoidHelper = require('../helpers/avoidHelper')
var tailHelper = require('../helpers/tailHelper')
var boardHelper = require('../helpers/boardHelper')

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
  var move = 'down'
  var head = jsonHelper.getHead(req)
  var dim = jsonHelper.getHeightWidth(req)
  var id = jsonHelper.getID(req)
  var goal = [1,1]
  var board = boardHelper.setupBoard(req, dim, id)
  console.log(board)
  aStar.aStar(board, )
  // var opts = ['left', 'right', 'up', 'down']
  // // these are move where we know there isn't a wall or another snakes body
  // // still need to add some checks for snakes tail as a risky move?
  // var moves = safeMovesHelper.safeMoves(req)
  // var hungry = foodHelper.hungry(req, moves)
  // var chaseTail = tailHelper.followTail(req, moves)

  // // var kill = ___
  // // var singleCombat = ___
  // if(hungry){
  //   // were hungry and we have a path to food
    
  // } else if(chaseTail){

  // }
  var data = {
    move: move, // one of: ['up','down','left','right']
  }
  console.log(move)
  return res.json(data)
})

router.post('/end', function(req, res) {
  return res.json({})
})

router.post('/ping', function(req, res) {
  return res.json({});
})

module.exports = router
