function setupBoard(req, dim, id){
    var gameBoard = Array(dim).fill().map(() => Array(dim).fill(0))
    var snakes = req.board.snakes
    for (i = 0; i < snakes.length; i++) {
        var snek = snakes[i].body;
        var len = snek.length
        if(snakes[i].id == id){
            len = len-1
        }
        for (j = 0; j < len; j++) {
          var x = snek[j].x
          var y = snek[j].y
          gameBoard[x][y] = 1
        }
      }
    return gameBoard
}

exports.setupBoard = setupBoard