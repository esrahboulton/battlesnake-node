var express = require('express')
var router = express.Router()

var snakeHeadHelper = require('../helpers/snakeHead')
var foodHelper = require('../helpers/foodHelper')
var pathHelper = require('../helpers/pathHelper')
var snakesHelper = require('../helpers/snakesHelper')
var wallsHelper = require('../helpers/wallsHelper')
var killHelper = require('../helpers/killHelper')
var jsonHelper = require('../helpers/jsonHelper')
var moveHelper = require('../helpers/moveHelper')
var avoidHelper = require('../helpers/avoidHelper')

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
  var move = "up";
  var safeMoves = [true, true, true, true]
  var killMoves = [false, false, false, false]
  // var riskyMoves = [false, false, false, false]
  var head = jsonHelper.getHead(req)
  var boardDim = jsonHelper.getHeightWidth(req)
  var food = jsonHelper.getFood(req)


  wallsHelper.avoidWalls(head, boardDim, safeMoves)
  snakesHelper.avoidSnakes(req, head, safeMoves)
  var killMoves = killHelper.kill(req, head)
  if(food.length != 0){
    // there is food on the board
    if(foodHelper.needFood(req)){
      var nearestFood = foodHelper.findFood(req)
      // path to nearest food
      var path = pathHelper.findPath(head, nearestFood)
      move = pathHelper.pick(path, safeMoves)
    }
  }
  var data = {
    move: move, // one of: ['up','down','left','right']
  }
  return res.json(data)
})

router.post('/end', function(req, res) {
  return res.json({})
})

router.post('/ping', function(req, res) {
  return res.json({});
})

module.exports = router
