//* for throwing exceptions when route is no defined
function unknownRouteHandler(req, res, next) {
	next(new Error("Sorry, the page you are looking for does not exist."));
	return;
}

function routeErrorHandler(err, req, res, next) {
	res.status(404).send("Sorry, the page you are looking for does not exist.");
	console.log({ error: err.message });
}

export { routeErrorHandler, unknownRouteHandler };
