const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

const snakeHeadHelper = require('./helpers/snakeHead')
const foodHelper = require('./helpers/foodHelper')
const pathHelper = require('./helpers/pathHelper')
const killHelper = require('./helpers/killHelper')
const jsonHelper = require('./helpers/jsonHelper')
const moveHelper = require('./helpers/moveHelper')
const avoidHelper = require('./helpers/avoidHelper')
const boardHeler = require('./helpers/boardHelper')
const {timeout} = require('./helpers/timeoutHelper')
const aStarHelper = require('./helpers/aStarHelper')


// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  // Response data
  const data = {
    color: '#DFFF00',
  }
  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', async (request, response) => {
  // NOTE: Do something here to generate your move
  try {
    var req = request.body
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

    // let goal = boardHeler.getGoal(board, dim)
    // console.log('goal')
    // console.log(goal)
    // var move = aStarHelper.aStar(snakeHead, goal, board, dim, dim)

    if(req.board.food.length != 0){
      nearestFood = foodHelper.findFood(req)
    } else {
      nearestFood = false
    }
    if(nearestFood != false){
      needsFood = foodHelper.needFood(req)
      if(req.you.body.length < req.board.height){
        // needsFood = true
      }
    } else {
      needsFood = false
    }
    var move;
    

    if (needsFood && nearestFood) {
      // console.log("food")
      move = aStarHelper.aStar(snakeHead, nearestFood, board, dim, dim)
    } else if (OneVsOne) {
      // console.log("1v1")
      // console.log(snakes[1 - index].body[0])
      move = aStarHelper.aStar(
        snakeHead,
        snakes[1 - index].body[0],
        board,
        dim,
        dim
      )
    } else {
      // console.log("tail")
      // console.log(req.you.body[req.you.body.length - 1])
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
      return response.json(data)
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
      if (!response.headersSent) {
        console.log("fallback..");
        var data = {
          move: move, // one of: ['up','down','left','right']
        }
        response.json(data).end();
      }
    })
    return response.json(data)
  } catch(e) {
    console.log(e);
  }
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
