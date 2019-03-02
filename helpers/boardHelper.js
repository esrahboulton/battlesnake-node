const FOOD = "food";
const SNAKE_BODY = "snakeBody";
const EMPTY = "empty";

function setupBoard(req, dim, id){
  const defaultSquareState = {
    contents: EMPTY,
    score: 0,
  };

  var gameBoard = Array(dim).fill().map(
    () => Array(dim).fill().map(() => Object.assign({},defaultSquareState))
  )

  addSnakes(gameBoard, req.board.snakes)
  addFood(gameBoard, req.board.food);

  return gameBoard
}

function addFood(board, food) {
  food.forEach((f)=> {
    board[f.x][f.y].contents = FOOD;
  })
}

function addSnakes(board, snakes) {
  snakes.forEach((snake) => {
    snake.body.forEach((bodyDims) => {
      board[bodyDims.x][bodyDims.y].contents = SNAKE_BODY
    })
  })
}

exports.setupBoard = setupBoard