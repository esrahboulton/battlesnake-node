function aStar(start, goal, board, height, width){
    if(board[goal.x][goal.y] === 0){
        return null
    }
    var closedSet = new Set()
    var startIndex = nodeIndex(start, width)
    var goalIndex = nodeIndex(goal, width)

    var openSet = new Set([startIndex])
    var gScore = {}
    gScore[startIndex] = 0

    var fScore = {}

    fScore[startIndex] = getFScore(start, goal)

    var from = {}

    // console.log("Open set pre loop:",openSet)
    while(openSet.size > 0){
        if(openSet.size > height * width){
            console.log("NOOOOOOOOOOO")
            return null
        }
        var current = getLowestScore(openSet, fScore);
        // console.log(current)
        // check if we're done
        if(current === goalIndex){
            return getPath(from, current, width)
        }

        // remove node from open
        openSet.delete(current)
        // add node to closed
        closedSet.add(current)

        var currentNode = getCords(current, width)
        // console.log("node:", currentNode)
        var neighbours = getNeighbours(currentNode, board, height, width)
        for(var neighbour of neighbours){
            // console.log("Neighbour:", getCords(neighbour, width))
            if(closedSet.has(neighbour)){
                continue
            }

            if(!openSet.has(neighbour)){
                openSet.add(neighbour)
            } 

            var newGScore = gScore[current] + board[currentNode.x][currentNode.y]
            if(newGScore >= gScore[neighbour]){
                continue
            }

            from[neighbour] = current
            gScore[neighbour] = newGScore
            fScore[neighbour] = gScore[neighbour] + getFScore(getCords(neighbour, width), goal)
        }
        // console.log("Open set:",openSet)
    }
    console.log("No Path Found")
    return null
}

function nodeIndex(node, dim){
    // console.log("Node index call x", node.x, " y", node.y)
    return node.x + (node.y*dim)
}

function getCords(index, width){
    var x = index % width
    var y = Math.floor(index / width)
    return {"x" : x, "y" : y}
}

function getPath(from, current, width){
    var path = []
    while(current in from){
        var next = from[current]
        var dir = getDir(current, next, width)
        // console.log(next)
        path.unshift(dir)
        current = next
    }
    // console.log(path)
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
    // console.log("x", node.x, " y",node.y)
    var neighbourIndex;
    if(node.x + 1 < width && board[node.x + 1][node.y] !== 0){
        neighbourIndex = node.x+1 + (node.y*width)
        // console.log("x + 1", neighbourIndex)
        neighbours.push(neighbourIndex)                  
    }
    if(node.x - 1 >= 0 && board[node.x - 1][node.y] !== 0){
        neighbourIndex = node.x-1 + (node.y*width)
        // console.log("x - 1", neighbourIndex)
        neighbours.push(neighbourIndex)    
    }
    if(node.y + 1 < height && board[node.x][node.y + 1] !== 0){
        neighbourIndex = node.x + (node.y+1)*width
        // console.log("y + 1", neighbourIndex)
        neighbours.push(neighbourIndex)    
    }
    if(node.y - 1 >= 0 && board[node.x][node.y-1] !== 0){
        neighbourIndex = node.x + (node.y-1)*width
        // console.log("y - 1", neighbourIndex)
        neighbours.push(neighbourIndex)    
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