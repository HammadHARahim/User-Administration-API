import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("users", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true,
			max: 25,
			min: 5,
		},
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		isEmail: true,
		validate: {
			notEmpty: true,
			min: 20,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			// is: {
			// 	args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			// 	msg: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
			// },
		},
	},
});

// checking for connection established
async function createTable() {
	try {
		await sequelize.sync();
		console.log("Users table created successfully!");
	} catch (error) {
		console.error("Unable to create table : ", error);
	}
}

// checking for connection established
async function initialize() {
	try {
		sequelize.authenticate();
		console.log("Connection has been established successfully.");
		createTable();
	} catch (error) {
		console.error("Unable to connect to the database: ", error);
	}
}

export { initialize, User };
