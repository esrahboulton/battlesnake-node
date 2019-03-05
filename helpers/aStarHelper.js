function aStar(start, goal, board, height, width){
    if(board[goal.x][goal.y] == 0){
        return null
    }
    var closedSet = []
    var openSet = []
    var s = makeNode(start, goal)
    s.g = 0
    openSet.push(s)

    while(openSet.length > 0){
        // get lowsest score
        var nodeIndex = getLowestScore(openSet)
        var node = openSet[nodeIndex]
        // check if we're done
        if(isGoal(node, goal)){
            return getPath(node)
        }

        // remove node from open
        openSet.splice(nodeIndex, 1)
        // add node to closed
        closedSet.push(node)

        var neighbours = getNeighbours(node, board, height, width)
        for(j = 0; j < neighbours.length; j++){
            if(contains(neighbours[j], closedSet)){
                continue
            }
            var newNode = makeNode(neighbours[j], goal)
            if(contains(neighbours[j], openSet)){
                newNode = getNode(openSet, neighbours[j])
            } else {
                openSet.push(newNode)
            }

            var newGScore = node.g + 1
            // var newGScore = node.g - board[newNode.x][newNode.y]
            if(newGScore > newNode.g){
                continue
            }
            newNode.from = node
            newNode.g = newGScore
            newNode.f = newGScore + getFScore(newNode, goal)
        }
    }
    return null
}

function getPath(node, start){
    var path = []
    path.unshift(node)
    while(node.from != null){
        path.unshift(node.from)
        node = node.from
    }
    // console.log(path)
    var curr = path[0]
    var nextMove = path[1]
    if(curr.x - nextMove.x == -1){
        // console.log("right")
        return 'right'
    }
    if(curr.x - nextMove.x == +1){
        // console.log("left")
        return 'left'
    }
    if(curr.y - nextMove.y == -1){
        // console.log("down")
        return 'down'
    }
    if(curr.y - nextMove.y == +1){
        // console.log("up")
        return 'up'
    }
    return null
}

function isGoal(node, goal){
    if(node.x == goal.x && node.y == goal.y){
        return true
    }
    return false
}

function getNeighbours(node, board, height, width){
    var neighbours = []
    if(node.x + 1 < width && board[node.x + 1][node.y] != 0){
        neighbours.push({"x" : node.x+1,
                         "y" : node.y})
    }
    if(node.x - 1 >= 0 && board[node.x - 1][node.y] != 0){
        neighbours.push({"x" : node.x-1,
                         "y" : node.y})
    }
    if(node.y + 1 < height && board[node.x][node.y + 1] != 0){
        neighbours.push({"x" : node.x,
                         "y" : node.y+1})
    }
    if(node.y - 1 >= 0 && board[node.x][node.y-1] != 0){
        neighbours.push({"x" : node.x,
                         "y" : node.y-1})
    }
    return neighbours
}

function contains(node, set){
    for(k = 0; k < set.lenght; k++){
        if(set[k].x == node.x && set[k].y == node.y){
            return true
        }
    }
    return false
}

function getNode(set, node){
    for(k = 0; k < set.lenght; k++){
        if(set[k].x == node.x && set[k].y == node.y){
            return set[k]
        }
    }
    return null
}

function makeNode(node, goal){
    return {"x" : node.x,
            "y" : node.y,
            "g" : Number.POSITIVE_INFINITY,
            "f" : getFScore(node, goal),
            "from" : null}
}

function getFScore(node, goal){
    return (Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y))
}

function getLowestScore(openSet){
    var lowest = Number.POSITIVE_INFINITY
    var index = -1
    for(i = 0; i < openSet.length; i++){
        if(openSet[i].f < lowest){
            lowest = openSet[i].f
            index = i
        }
    }
    return index
}

exports.aStar = aStar