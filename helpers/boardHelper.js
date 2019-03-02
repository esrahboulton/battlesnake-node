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

  // addSnakes(gameBoard, req.board.snakes)
  addFood(gameBoard, req.board.food);

  return gameBoard
}

function addFood(board, food) {
  food.forEach((f)=> {
    board[f.x][f.y].contents = FOOD;
  })
}

function addSnakes(board, snakes) {
  for (i = 0; i < snakes.length; i++) {
    var snek = snakes[i].body;
    var len = snek.length

    if(snakes[i].id == id){
        len = len-1
    }

    for (j = 0; j < len; j++) {
      var x = snek[j].x
      var y = snek[j].y
      board[x][y].contents = SNAKE_BODY
    }
  }
}

exports.setupBoard = setupBoard