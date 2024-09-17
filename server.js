import app from "./app.js";
import dotenv from "dotenv";
import { initialize } from "./src/models/Users.js";

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
	// database connection initialization
	initialize();
	console.log(`Server running on port ${port}`);
});
