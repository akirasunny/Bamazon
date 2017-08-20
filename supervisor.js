var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");
var username = "Hao";
var password = "haothecoder";

var options = ["View product sales by department", "Create new department", "Back to main menu"];

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
});

var login = function() {
	console.log("\n-------------------------------------------------\n");
	console.log("To get access to backstage, please confirm username and password.")
	inquirer.prompt([
		{
			type: "confirm",
			message: "Are you sure?\n",
			name: "islogin"
		}
	]).then(function(res) {
		if (res.islogin) {
			inquirer.prompt([
				{
					type: "input",
					message: "\nUsername:",
					name: "username"
				},
				{
					type: "password",
					message: "Password:",
					name: "password"
				}
			]).then(function(res) {
				if (res.username === username && res.password === password) {
					console.log("\n-------------------------------------------------\n");
					console.log("Dear supervisor Hao, welcome back.");
					console.log("\n-------------------------------------------------\n");
					supervisor();
				}
				else {
					console.log("\n-------------------------------------------------\n");
					console.log("Invalid username or password. Please try again.")
					login();
				}
			});
		}
		else {
			var greeting = require("./bamazon.js");
			greeting();
		};
	});
};

function supervisor() {
	inquirer.prompt([
	{
		type: "list",
		choices: options,
		name: "options",
		message: "What do you want to do next?"
	}
	]).then(function(res) {
		switch (res.options) {
			case options[0]:
				view();
				break;

			case options[1]:
				createdept();
				break;

			case options[2]:
				var greeting = require("./bamazon.js");
				greeting();
				break;
		};
	});
};

function view() {
	console.log("\n-------------------------------------------------\n");
	console.log("Here are financial data of departments.\n")
	connection.query("SELECT * FROM departments", function(err, res) {
		if (err) throw err;
		console.log(
			"\n" + 
			Table.print(res, {
				department_id: {name: "Department ID"},
				department_name: {name: "Department Name"},
				product_cost: {name: "Product Costs ($)", printer: Table.number(2)},
				over_head_costs: {name: "Overhead Costs ($)", printer: Table.number(2)},
				product_sales: {name: "Product Sales ($)", printer: Table.number(2)},
				total_profit: {name: "Total Profit ($)", printer: Table.number(2)}
			})
		);
		console.log("\n-------------------------------------------------\n");
		supervisor();
	});
};

function createdept() {
	inquirer.prompt([
	{
		type: "input",
		name: "dept",
		message: "What's the name of new department you want to create?"
	},
	{
		type: "input",
		message: "Please enter its overhead costs.",
		name: "overhead",
		validate: function(value) {
			if (!isNaN(value) && value >= 0) {
				return true;
			}
			return false;
		}
	}
	]).then(function(res) {
		var dept = res.dept;
		connection.query("INSERT INTO departments SET ?", [{
			department_name: res.dept,
			over_head_costs: res.overhead,
			product_cost: 0,
			total_profit: res.overhead * -1,
			product_sales: 0
		}], function(err, resp) {
			if (err) throw err;
			console.log("\n-------------------------------------------------\n");
			console.log("Department " + dept + " has been created successfully.");
			console.log("\n-------------------------------------------------\n");
			supervisor();
		});
	});
};

module.exports = login;