# ouroboyos nodejs battlesnake

Based on the SWU nodejs starter snake 🐍

## App
https://nodejs-battlesnake-test.herokuapp.com/

## Running on Docker
- Run docker run -it --rm -p 3000:3000 sendwithus/battlesnake-server
- Visit http://localhost:3000

## TODO
- update image, preferably w/ a gif
- clean routes/index
- write avoid function
- review kill function
- implement middle-out strategy

## CHANGELOG

## [1.2.0] - 2018-03-06
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
