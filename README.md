# ouroboyos nodejs battlesnake

Based on the SWU nodejs starter snake 🐍

## App
https://ouroboyos.herokuapp.com/

## Running on Docker
- Run `docker run -it --rm -p 3000:3000 sendwithus/battlesnake-server`
- Visit http://localhost:3000

## TODO
1. implement forward checking to avoid getting trapped
2. review avoid function
3. review kill function
4. branch into clean release branch, merge into master
5. implement middle-out strategy
* setup new branch w/ randomized movement snake, create new heroku app

## CHANGELOG
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
