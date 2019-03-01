var pathHelper = require('../helpers/pathHelper')

function followTail(head, tail, safeMoves){
    var path = pathHelper.findPath(head, tail)
    for(i = 0; i < 4; i++){
        if(path[i] && safeMoves[i]){
            return pathHelper.pick(path, safeMoves)
        }
    }
    var moves = ["left", "right", "up", "down"]
    return moves[Math.floor((Math.random() * 4))]
}

exports.followTail = followTail;