# ouroboyos nodejs battlesnake

Based on the SWU nodejs starter snake 🐍

## Branches
`feature/[feature-name]` branches are used for features (new functions, etc). `test/[feature-name]` branches are used for a stable dev build of a feature. We then create a new heroku app so we can run older snakes against newer.

## App
### Main build
https://ouroboyos.herokuapp.com/
### Testing
https://ouroboyos-random.herokuapp.com/

## Running on Docker
- Run `docker run -it --rm -p 3000:3000 sendwithus/battlesnake-server`
- Visit http://localhost:3000

## TODO
1. implement forward checking to avoid getting trapped
2. review avoid function
3. review kill function
4. implement middle-out strategy
5. implement space checking to choose the move with more space
6. implement a check to allow for tail moves (moving into a tail if the snake is not eating)

## CHANGELOG
## [2.0.0] - 2019-02-27
### Added
- `battlesnake-2019` branch!

## [1.6.0] - 2018-03-10
### Added
- taunt variant for 1v1 situations

## [1.5.0] - 2018-03-09
### Added
- getID and getIndex in jsonHelper
- pick function in pathHelper to select a random move in the path

### Changed
- moved find food into foodHelper
- moved pick move into moveHelper
- cleaned up routes/index
- added avoid function
- cleaned follow tail function

### Removed
- removed onevoneMeHelper.js
- removed selfHelper.js

## [1.4.0] - 2018-03-08
### Changed
- implemented improved taunt switching 

### Added
- follow tail option 

## [1.3.0] - 2018-03-07
### Added
- added 1v1 test to search out the other snakes head

### Changed
- updated image w/ a gif

## [1.2.0] - 2018-03-06
### Added
- getBody function to jsonHelper

### Changed
- updated kill function

## [1.1.0] - 2018-03-04
### Added
- battlesnake-2018 branch
	- intact code from Battlesnake 2018
- develop branch
	- intended to be used for new work going forward, before being merged into master
- added json helper 
- added new helper to separate killOrAvoid into two functions for easier testing
- added kill function
- added random movement

### Changed
- updated all helpers w/ code from routes/index

### Removed
- removed all functions except pickMove, findFood from routes/index
- cleaned empty lines, unnecessary comments
