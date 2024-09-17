import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// mysql connection object
const sequelize = new Sequelize(
	process.env.DB,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	}
);

export default sequelize;
