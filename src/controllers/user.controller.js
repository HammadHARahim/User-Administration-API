import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import { passwordSchema, idSchema } from "../validators/user.validate.js";

//* Get the user from the database with details
async function getUser(req, res) {
	const { id } = req.params;

	// Validate the password before hashing
	const { error } = idSchema.validate(id);
	if (error) {
		return res.status(400).json({
			error: `Please mantion the id of the user`,
			message: error,
		});
	}

	try {
		const user = await User.findOne({
			where: { id: id },
		});
		// if user doesn't exist
		if (!user) throw new Error("Invalid id, User not found");
		res.status(200).json({
			id: user.id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	} catch (error) {
		console.error({ error: error.message });
		return res.status(404).json({ message: error.message });
	}
}

//* Add User to the database
async function createUser(req, res) {
	const { username, email, password } = req.body;

	// Validate the password before hashing
	const { error } = passwordSchema.validate(password);
	if (error) {
		return res.status(400).json({
			error: `Password must be at least 8
				characters long and include at least one uppercase letter,
				one lowercase letter, one digit, and one special character.`,
			message: error,
		});
	}

	try {
		// hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);
		// create the user
		await User.create({
			username: username,
			password: hashedPassword,
			email: email,
		});
	} catch (error) {
		if (error.errors[0].validatorName === "notEmpty")
			console.error({ message: `${error.errors[0].path} must not be empty` });
		console.log({ message: error.errors[0].message });
		return res.status(409).json({ message: error.errors[0].message });
	}
	return res.status(201).json({ message: "User created successfully" });
}

//* Delete User from the database
async function deleteUser(req, res) {
	const { id } = req.params;

	try {
		// check if user exists
		const user = await User.findByPk(id);
		if (!user) throw new Error("User not found");
		// delete the user
		await User.destroy({
			where: {
				id: id,
			},
		});
	} catch (error) {
		console.log({ message: error.message });
		return res.status(404).json({ message: error.message });
	}

	return res.status(200).json({ message: "User deleted successfully" });
}

//* Update User state from the database
async function updateUser(req, res) {
	//* getting the user id and updating the user
	const { id } = req.params;
	const { username, password, email } = req.body;

	try {
		// check if user exists
		const user = await User.findByPk(id);
		if (!user) throw new Error("User not found");

		// validate the password before updating the user and hashing
		if (password) {
			const { error } = await passwordSchema.validateAsync(password);
			if (error)
				throw new Error(`Password must be at least 8
						characters long and include at least one uppercase letter,
						one lowercase letter, one digit, and one special character.`);
		} else if (!password) {
			password = user.dataValue.password;
		}

		// if (username === user.dataValues.username || ) console.log(user.dataValues);
		// hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// // update the user
		// await User.update(
		// 	{
		// 		username: username,
		// 		password: hashedPassword,
		// 		email: email,
		// 	},
		// 	{
		// 		where: {
		// 			id: id,
		// 		},
		// 	}
		// );
	} catch (error) {
		console.error({ error, message: error.message });
		res.status(error.status).json({ error: error.message });
	}
	return res.status(200).json({ message: "User updated successfully" });
}

export { createUser, deleteUser, getUser, updateUser };
