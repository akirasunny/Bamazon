var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");
var username = "Akira";
var password = "akira";

var options = ["View items for sale", "View low inventory", "Add to inventory", "Add new product", "Back to main menu"];

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
					message: "Username:",
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
					console.log("Dear manager Akira, welcome back.");
					console.log("\n-------------------------------------------------\n");
					manager();
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
		}
	});
}

function manager() {
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
				lowinv();
				break;

			case options[2]:
				showlist();
				break;

			case options[3]:
				addpro();
				break;

			case options[4]:
				var greeting = require("./bamazon.js");
				greeting();
				break;
		}
	});
};

function view() {
	inquirer.prompt([
		{
			type: "list",
			message: "\nSort by: ",
			choices: ["Department", "Price (ascending)", "Price (descending)"],
			name: "options"
		}
	]).then(function(res) {
		switch (res.options) {
			case "Price (ascending)":
				connection.query("SELECT * FROM products ORDER BY price", function(err, results) {
					if (err) throw err;
					console.log(
						"\n" + 
						Table.print(results, {
							item_id: {name: "Product ID"},
							product_name: {name: "Product Name"},
							department_name: {name: "Department"},
							price: {name: "Price ($)", printer: Table.number(2)},
							stock_quantity: {name: "Stock Quantity"},
							cost: {name: "Unit Cost"}
						})
					);
					manager();
				});
				break;
			
			case "Price (descending)":
				connection.query("SELECT * FROM products ORDER BY price DESC", function(err, results) {
					if (err) throw err;
					console.log(
						"\n" + 
						Table.print(results, {
							item_id: {name: "Product ID"},
							product_name: {name: "Product Name"},
							department_name: {name: "Department"},
							price: {name: "Price ($)", printer: Table.number(2)},
							stock_quantity: {name: "Stock Quantity"},
							cost: {name: "Unit Cost"}
						})
					);
					manager();
				});
				break;

			case "Department":
				connection.query("SELECT * FROM products ORDER BY department_name", function(err, results) {
					if (err) throw err;
					console.log(
						"\n" + 
						Table.print(results, {
							item_id: {name: "Product ID"},
							product_name: {name: "Product Name"},
							department_name: {name: "Department"},
							price: {name: "Price ($)", printer: Table.number(2)},
							stock_quantity: {name: "Stock Quantity"},
							cost: {name: "Unit Cost"}
						})
					);
					manager();
				});
				break;
		}
	});
};

function lowinv() { // show products in low inventory
	console.log("\n-------------------------------------------------\n");
	console.log("Low inventory criteria:\n\n1. Fountain pen: less than 5;\n2. Ink: less than 20;\n3. Paper: less than 500.")
	console.log("\n-------------------------------------------------\n");
	console.log("Department: Fountain pen\n")
	connection.query("SELECT * FROM products WHERE department_name = \"fountain pen\" AND stock_quantity < 5", function(err, res) {
		if (err) throw err;
		if (res.length === 0) {
			console.log("Everything is sufficient in stock quantity so far.");
		}
		else {
			console.log(
				Table.print(res, {
					item_id: {name: "Product ID"},
					product_name: {name: "Product Name"},
					department_name: {name: "Department"},
					price: {name: "Price ($)", printer: Table.number(2)},
					stock_quantity: {name: "Stock Quantity",
					cost: {name: "Cost"}
				}
				})
			);
		}
		console.log("\n-------------------------------------------------\n");
		console.log("Department: Ink\n");
		connection.query("SELECT * FROM products WHERE department_name = \"ink\" AND stock_quantity < 20", function(err, res1) {
			if (err) throw err;
			if (res1.length === 0) {
				console.log("Everything is sufficient in stock quantity so far.");
			}
			else {
				console.log(
					Table.print(res1, {
						item_id: {name: "Product ID"},
						product_name: {name: "Product Name"},
						department_name: {name: "Department"},
						price: {name: "Price ($)", printer: Table.number(2)},
						stock_quantity: {name: "Stock Quantity",
						cost: {name: "Cost"}
					}
					})
				);
			}
			console.log("\n-------------------------------------------------\n");
			console.log("Department: Paper\n");
			connection.query("SELECT * FROM products WHERE department_name = \"paper\" AND stock_quantity < 500", function(err, res2) {
				if (err) throw err;
				if (res2.length === 0) {
					console.log("Everything is sufficient in stock quantity so far.\n");
				}
				else {
					console.log(
						Table.print(res2, {
							item_id: {name: "Product ID"},
							product_name: {name: "Product Name"},
							department_name: {name: "Department"},
							price: {name: "Price ($)", printer: Table.number(2)},
							stock_quantity: {name: "Stock Quantity",
							cost: {name: "Cost"}
						}
						})
					);
				}
				console.log("\n-------------------------------------------------\n");
				manager();
			});
		});
	});
};

function addinv() { // add inventory to in-store products
	inquirer.prompt([
		{
			type: "input",
			message: "Please enter the ID of the product you want to add inventory.",
			name: "id",
			validate: function(value) {
				if (!isNaN(value)) {
					return true;
				}
				return false;
			}
		},
		{
			type: "input",
			message: "How many inventory do you want to add?",
			name: "quant",
			validate: function(value) {
				if (!isNaN(value)) {
					return true;
				}
				return false;
			}
		}
	]).then(function(res) {
		var id = parseInt(res.id);
		var quant = parseInt(res.quant);
		connection.query("SELECT product_name FROM products WHERE item_id = ?", [id], function(err, res1) {
			if (err) throw err;
			var name = res1[0].product_name;
			connection.query("UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id = ?", [quant, id], function(err, res2) {
				console.log("\n-------------------------------------------------\n");
				console.log("The inventory of \"" + name + "\" has been added by " + quant + " successfully.");
				console.log("\n-------------------------------------------------\n");
				manager();
			});
		});
	})
};

function addpro() { // add new entry to database "products"
	console.log("\n-------------------------------------------------\n");
	connection.query("SELECT department_name FROM departments", function(err, res) {
		if (err) throw err;
		var dept = [];
		for (i = 0; i < res.length; i++) {
			dept.push(res[i].department_name);
		}
		inquirer.prompt([
			{
				type: "list",
				choices: dept,
				message: "Which department do you want to add product to?",
				name: "dept"
			},
			{
				type: "input",
				message: "Please enter the name of new product.",
				name: "new"
			},
			{
				type: "input",
				message: "Please enter the price of new product.",
				name: "price",
				validate: function(value) {
					if (!isNaN(value)) {
						return true;
					}
					return false;
				}
			},
			{
				type: "input",
				message: "Please enter its initial inventory.",
				name: "inv",
				validate: function(value) {
					if (!isNaN(value)) {
						return true;
					}
					return false;
				}
			}
		]).then(function(resp) {
			var dept = resp.dept;
			var name = resp.new;
			var price = resp.price;
			var inv = resp.inv;
			connection.query("INSERT INTO products SET ?", [{
				product_name: name,
				department_name: dept,
				price: price,
				stock_quantity: inv,
				cost: resp.price * 0.55
			}], function(err, respo) {
				connection.query("UPDATE departments SET product_cost=product_cost+? WHERE department_name = ?", [0.55 * price * inv, dept], function(err, result) {
					if (err) throw err;
					console.log("\n-------------------------------------------------\n");
					console.log("Product \"" + name + "\" has been added succesfully.");
					console.log("\n-------------------------------------------------\n");
					manager();
				});
			});
		});
	});
};

function showlist() { // for the order of asyncronous functions, addinv() will be called inside
	console.log("\n-------------------------------------------------\n");
	console.log("For your convenience, here is a list of products for sale.")
	connection.query("SELECT * FROM products ORDER BY department_name", function(err, results) {
		if (err) throw err;
		console.log(
			"\n" + 
			Table.print(results, {
				item_id: {name: "Product ID"},
				product_name: {name: "Product Name"},
				department_name: {name: "Department"},
				price: {name: "Price ($)", printer: Table.number(2)},
				stock_quantity: {name: "Stock Quantity"}
			})
			+ "\n"
		);
		console.log("\n-------------------------------------------------\n");
		addinv();
	});
};

module.exports = login;