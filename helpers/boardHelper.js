const FOOD = "food";
const SNAKE_BODY = "snakeBody";
const SNAKE_HEAD = "snakeHead";
const EMPTY = "empty";

async function setupBoard(req, dim, id){
  var gameBoard = Array(dim).fill().map(
    () => Array(dim).fill().map(() => {
      return {
       contents: EMPTY,
       score: 0,
       aggregateScore: 0
      };
    })
  )

  await Promise.all([
    addSnakes(gameBoard, req.board.snakes),
    addFood(gameBoard, req.board.food)
  ]);

  addScore(gameBoard)
  refineScore(gameBoard)
  return simpleBoard(gameBoard);
}

async function addFood(board, food) {
  food.forEach((f)=> {
    board[f.x][f.y].contents = FOOD;
    board[f.x][f.y].aggregateScore = 5;
  })
}

async function addSnakes(board, snakes) {
  snakes.forEach((snake) => {
    // this removes the last piece of the snake, then
    let lastBody = { x: null, y: null};
    snake.body.slice(0, snake.body.length - 1).forEach((bodyDims, i) => {
      if( bodyDims.x === lastBody.x && bodyDims.y === lastBody.y) {
        return;
      }
      board[bodyDims.x][bodyDims.y].contents = i === 0 ? SNAKE_HEAD : SNAKE_BODY
      lastBody = bodyDims
    })
  })
}

function addScore(board) {
  board.forEach((row, xCord) => {
    row.forEach((square, yCord) => {
      if (square.contents === SNAKE_BODY || square.contents === SNAKE_HEAD) {
        return
      }

      let score = 0;
      const top = board[xCord - 1] && board[xCord - 1][yCord]
      const right = board[xCord] && board[xCord][yCord + 1]
      const bottom = board[xCord + 1] && board[xCord + 1][yCord]
      const left = board[xCord] && board[xCord][yCord - 1]

      if (top && top.contents === EMPTY) {
        score += 1
      }
      if (right && right.contents === EMPTY) {
        score += 1
      }
      if (bottom &&  bottom.contents === EMPTY) {
        score += 1
      }
      if (left && left.contents === EMPTY) {
        score += 1
      }

      square.score = score;
    })
  })
}


function refineScore(board) {
  board.forEach((row, xCord) => {
    row.forEach((square, yCord) => {
      if (square.contents === SNAKE_BODY || square.contents === SNAKE_HEAD) {
        return
      }

      let aggregateScore = square.score;
      const top = board[xCord - 1] && board[xCord - 1][yCord]
      const right = board[xCord] && board[xCord][yCord + 1]
      const bottom = board[xCord + 1] && board[xCord + 1][yCord]
      const left = board[xCord] && board[xCord][yCord - 1]

      if (top) {
        aggregateScore += top.score
      }
      if (right ) {
        aggregateScore += right.score
      }
      if (bottom) {
        aggregateScore += bottom.score
      }
      if (left) {
        aggregateScore += left.score
      }

      square.aggregateScore += aggregateScore
    })
  })
}

function simpleBoard(board) {
  return board.map((row) => {
    return row.map((square) => {
      return square.aggregateScore
    });
  });
}

function getGoal(board, dim){
  var max = -1
  var x = -1
  var y = -1
  for(i = 0; i < dim; i++){
    for(j = 0; j < dim; j++){
      if(board[i][j] > max){
        max = board[i][j]
        x = i
        y = j
      }
    }
  }
  return {"x" : x, "y" : y}
}

exports.setupBoard = setupBoard
exports.getGoal = getGoal