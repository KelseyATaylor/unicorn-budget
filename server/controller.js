require("dotenv").config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

module.exports = {
	getBudget: (req, res) => {
		sequelize
			.query(
				`SELECT * FROM budget
			ORDER BY budget_id ASC;`
			)
			//When you add users you'll do WHERE users on all of your functions in here
			.then((dbRes) => res.status(200).send(dbRes[0]))
			.catch((err) => console.log(err));
	},

	createCategory: (req, res) => {
		const { category, amount } = req.body;
		sequelize
			.query(
				`INSERT INTO budget (category, amount, spent)
            VALUES ('${category}', ${amount}, 0)
            ;`
			)
			.then((dbRes) => res.status(200).send(dbRes[0]))
			.catch((err) => console.log(err));
	},

	editCategory: (req, res) => {
		const { category, amount, spent } = req.body;
		const { budget_id } = req.params;

		console.log(req.body);
		console.log(req.params);

		sequelize
			.query(
				`UPDATE budget
            SET 
            category = '${category}',
            amount = ${amount},
            spent = ${spent}
            WHERE budget_id = ${budget_id};`
			)
			.then((dbRes) => res.status(200).send(dbRes[0]))
			.catch((err) => console.log(err));
	},

	deleteCategory: (req, res) => {
		const { budget_id } = req.params;

		sequelize
			.query(
				`DELETE FROM budget
            WHERE budget_id = ${+budget_id}
			;`
			)
			// .then((dbRes) => res.status(200).send(dbRes[0]))
			.then(() => res.sentStatus(200))
			//ask why it was returning two undefined columns when I didn't have the dbres?
			.catch((err) => console.log(err));
	},
};
