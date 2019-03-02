function aStar(start, goal, board, height, width){
    var closedSet = []
    var openSet = []
    openSet.push(makeNode(start))

    while(openSet.length > 0){
        // get lowsest score
        var nodeIndex = getLowestScore(openSet)
        var node = openSet[nodeIndex]
        // check if we're done
        if(isGoal(openSet[nodeIndex])){
            return getPath(node)
        }

        // remove node from open
        delete openSet[nodeIndex]
        // add node to closed
        closedSet.push(node)

        var neighbours = getNeighbours(node, board, height, width)
        for(j = 0; j < neighbours.length; j++){
            if(contains(neighbours[j], closedSet)){
                continue
            }
            var newNode = makeNode(neighbours[j])
            if(contains(neighbours[j], openSet)){
                newNode = getNode(openSet, neighbours[j])
            } else {
                openSet.push(newNode)
            }

            var newGScore = node.g + 1
            if(newGScore > newNode.g){
                continue
            }
            newNode.from = node
            newNode.g = newGScore
            newNode.f = newGScore + getFScore(newNode, goal)
        }
    }
}

function getPath(node, start){
    var path = []
    while(node.from != null){
        path.unshift(node.from)
        node = node.from
    }
    return path
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

function makeNode(node){
    return {"x" : node.x,
            "y" : node.y,
            "g" : Number.POSITIVE_INFINITY,
            "f" : getFScore(node, goal)},
            "from" : null
}

function getFScore(node, goal){
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y)
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