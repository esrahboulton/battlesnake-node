function getSnakes(req){
	return req.body.snakes.data;
}

function getFood(req){
	return req.body.food.data;
}

function getYou(req){
	return req.body.you.data
}

function getBody(req) {
	return req.body.you.body.data.length
}
exports.getSnakes = getSnakes;
exports.getFood = getFood;
exports.getYou = getYou;
exports.getBody = getBody;