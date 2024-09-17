import Joi from "joi";

// schema for id validation
const idSchema = Joi.number().integer().positive().required();

// Define a schema for password validation
const passwordSchema = Joi.string()
	.pattern(
		new RegExp(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
	)
	.required();

export { passwordSchema, idSchema };
