function aStar(start, goal, board, height, width){
    // console.log(board)
    if(board[goal.x][goal.y] === 0){
        return null
    }
    var closedSet = new Set()
    var startIndex = nodeIndex(start)
    var goalIndex = nodeIndex(goal)

    var openSet = new Set([startIndex])

    var gScore = {}
    gScore[startIndex] = 0

    var fScore = {}

    var from = {}

    while(openSet.size > 0){
        if(openSet.size > height * width){
            console.log("NOOOOOOOOOOO")
            return null
        }
        var current = getLowestScore(openSet, fScore);
        // check if we're done
        if(current === goalIndex){
            return getPath(from, current, width)
        }

        // remove node from open
        openSet.delete(current)
        // add node to closed
        closedSet.add(current)

        var neighbours = getNeighbours(getCords(current, width), board, height, width)
        for(var neighbour of neighbours){
            if(closedSet.has(neighbour)){
                continue
            }

            if(!openSet.has(neighbour)){
                openSet.add(neighbour)
            } 

            var newGScore = gScore[current] + 1
            // var newGScore = node.g - board[newNode.x][newNode.y]
            if(newGScore >= gScore[neighbour]){
                continue
            }

            from[neighbour] = current
            gScore[neighbour] = newGScore
            fScore[neighbour] = gScore[neighbour] + getFScore(getCords(neighbour, width), goal)
        }
    }
    return null
}

function nodeIndex(node){
    return node.x + node.x*node.x
}

function getCords(index, width){
    var x = index % width
    var y = index / width
    return {"x" : x, "y" : y}
}

function getPath(from, current, width){
    var path = []
    while(current in from){
        var next = from[current]
        var dir = getDir(current, next, width)
        path.unshift(dir)
        current = next
    }
    return path[0]
}

function getDir(current, next, width){
    var curNode = getCords(current, width)
    var nextNode = getCords(next, width)
    if(curNode.x - nextNode.x == -1){
        // console.log("right")
        return 'right'
    }
    if(curNode.x - nextNode.x == +1){
        // console.log("left")
        return 'left'
    }
    if(curNode.y - nextNode.y == -1){
        // console.log("down")
        return 'down'
    }
    if(curNode.y - nextNode.y == +1){
        // console.log("up")
        return 'up'
    }
    return null
}

function getNeighbours(node, board, height, width){
    var neighbours = []
    if(node.x + 1 < width && board[node.x + 1][node.y] != 0){
        neighbours.push(nodeIndex({"x" : node.x+1,
                         "y" : node.y}))                  
    }
    if(node.x - 1 >= 0 && board[node.x - 1][node.y] != 0){
        neighbours.push(nodeIndex({"x" : node.x-1,
                         "y" : node.y}))
    }
    if(node.y + 1 < height && board[node.x][node.y + 1] != 0){
        neighbours.push(nodeIndex({"x" : node.x,
                         "y" : node.y+1}))
    }
    if(node.y - 1 >= 0 && board[node.x][node.y-1] != 0){
        neighbours.push(nodeIndex({"x" : node.x,
                         "y" : node.y-1}))
    }
    return neighbours
}

function getFScore(node, goal){
    return (Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y))
}

function getLowestScore(openSet, fScore){
    var lowest = null
    var ind = null
    openSet.forEach((index) => {
        var score = fScore[index]
        if(score !== undefined && score !== null){
            if(lowest === null || score < lowest){
                lowest = score
                ind = index
            }
        }
    })
    return ind
}

exports.aStar = aStar