var snakesHelper = require('./snakesHelper')
var wallsHelper = require('./wallsHelper')
var jsonHelper = require('./jsonHelper')

function safeMoves(req){
    var moves = [true, true, true, true]
    var head = jsonHelper.getHead(req)
    var dim = jsonHelper.getHeightWidth(req)
    var id = jsonHelper.getID(req)
    snakesHelper.avoidSnakes(req, head, id, moves)
    wallsHelper.avoidWalls(req, moves)
    return moves
}

exports.safeMoves = safeMoves;