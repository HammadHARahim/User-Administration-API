import helmet from "helmet";
import express from "express";
import router from "./src/routes/user.route.js";
import {
	routeErrorHandler,
	unknownRouteHandler,
} from "./src/middlewares/routeErrorHandlerMiddleware.js";

const app = express();

// Use Helmet!
app.use(helmet());
app.use(express.json());
app.use("/home", express.static("public"));
app.use("/api/v1", router);
app.use(unknownRouteHandler);
// Middleware for handling unknown routes
app.use(routeErrorHandler);

export default app;
