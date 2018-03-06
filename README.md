# ouroboyos nodejs battlesnake

Based on the SWU nodejs starter snake

## TODO
- update image, preferably w/ a gif
- remove pickMove, findFood from /routes/index.js and use helpers
- fix killOrAvoid function
- implement middle-out strategy

## Changelog

[0.0.1] - 2017-03-04
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

### Running on Docker
- Run docker run -it --rm -p 3000:3000 sendwithus/battlesnake-server
- Visit http://localhost:3000
