require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { getBudget, createCategory, editCategory, deleteCategory } = require("./controller.js");

app.use(express.json());
app.use(cors());

//Endpoints - test in postman

app.get("/api/budget", getBudget);
app.post("/api/budget", createCategory);
app.put("/api/budget", editCategory);
app.delete("/api/budget/:budget_id", deleteCategory);

app.listen(SERVER_PORT, () => console.log(`Sam carrying Frodo to Mordor on port ${SERVER_PORT}`));
