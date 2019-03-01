var pathHelper = require('../helpers/pathHelper')

function followTail(head, tail, safeMoves){
    var path = pathHelper.findPath(head, tail)
    return pathHelper.pick(path, safeMoves)
}

exports.followTail = followTail;