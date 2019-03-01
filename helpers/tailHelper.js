var pathHelper = require('../helpers/pathHelper')

function followTail(head, tail, safeMoves){
    var path = pathHelper.findPath(head, tail)
    // if no path exists then we need to make a new choice
    if(!path){
        return pathHelper.pick(path, safeMoves)
    } else {
        var options = ['left', 'right', 'up', 'down']
        for(i = 0; i < 4; i++){
            if(safeMoves[i]){
                return options[i]
            }
        }
        return options[Math.floor((Math.random() * 4))]
    }
}

exports.followTail = followTail;