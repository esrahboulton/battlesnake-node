const FOOD = "food";
const SNAKE_BODY = "snakeBody";
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
  return gameBoard
}

async function addFood(board, food) {
  food.forEach((f)=> {
    board[f.x][f.y].contents = FOOD;
  })
}

async function addSnakes(board, snakes) {
  snakes.forEach((snake) => {
    snake.body.forEach((bodyDims) => {
      board[bodyDims.x][bodyDims.y].contents = SNAKE_BODY
    })
  })
}

function addScore(board) {
  board.forEach((row, xCord) => {
    row.forEach((square, yCord) => {
      if (square.contents === SNAKE_BODY) {
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
      if (square.contents === SNAKE_BODY) {
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

      square.aggregateScore = aggregateScore
    })
  })
}

exports.setupBoard = setupBoard