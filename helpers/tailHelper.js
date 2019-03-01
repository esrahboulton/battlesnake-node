var pathHelper = require('../helpers/pathHelper')
var jsonHelper = require('../helpers/jsonHelper')

function followTail(req, moves){
    var head = jsonHelper.getHead(req)
    var tail = jsonHelper.getTail(req)
    var xMoves = tail.x - head.x;
    var yMoves = tail.y - head.y;
    var path = [false, false, false, false]
    if (xMoves < 0) {
        //moving left
        path[0] = true;
    } else if (xMoves > 0) {
        path[1] = true;
    }
    if (yMoves < 0) {
        //moving up
        path[2] = true
    } else if (yMoves > 0) {
        path[3] = true;
    }




    // var path = pathHelper.findPath(head, tail)
    // for(i = 0; i < 4; i++){
    //     if(path[i] && moves[i]){
    //       return path
    //     }
    //   }
    // return false
}

exports.followTail = followTail;