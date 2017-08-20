var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

var options = ["View items for sale", "Place an order", "Back to main menu"];

var i = 0; // for nestedinquirer();

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

var customer = function() { 
	inquirer.prompt([
		{
			type: "list",
			message: "\nWhat do you want to do next?\n",
			choices: options,
			name: "customer"
		}
	]).then(function(res) {
		switch (res.customer) {
			case options[0]:
				view();
				break;

			case options[1]:
				order();
				break;

			case options[2]:
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
				connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price", function(err, results) {
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
					);
					customer();
				});
				break;
			
			case "Price (descending)":
				connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY price DESC", function(err, results) {
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
					);
					customer();
				});
				break;

			case "Department":
				connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name", function(err, results) {
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
					);
					customer();
				});
				break;
		}
	});
};

function order() { // show checkboxes for order
	showlist();
	connection.query("SELECT * FROM products", function(err, res1) {
		if (err) throw err;
		var results = res1;
		connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, res2) {
			if (err) throw err;
			var results1 = res2;
			var a = Table.print(results1).substring(Table.print(results1).indexOf("1")).split("\n");
			var itemsopt = a.splice(0, a.indexOf(""));
			inquirer.prompt([
				{
					type: "checkbox",
					message: "\nPlease select the products you want to purchase.\n(product ID, product name, department, price ($), stock quantity)\n",
					choices: itemsopt,
					name: "order"
				}
			]).then(function(res) {
				nestedinquirer(res.order, results);
			});
		});
	});
};

function nestedinquirer(answer, data) { // allow multiple choices for order
	var data1 = data;
	var index = [];
	for (i = 0; i < answer.length; i++) {
		index.push(answer[i].split(" ")[0]);
	}
	i = 0;
	inquiry(index, data1);
	function inquiry(index, data) {
		if (i < index.length) {
			var ind = index[i] - 1;
			var name = data[ind].product_name;
			var stock = data[ind].stock_quantity;
			var dept = data[ind].department_name;
			var cost = data[ind].cost;
			var price = data[ind].price;
			inquirer.prompt([
				{
					type: "input",
					message: "\nHow many " + name + " do you want to purchase?",
					name: "quantity",
					validate: function(value) {
						if (!isNaN(value) && value <= stock) {
							return true;
						}
						return false;
					}
				}
			]).then(function(res) {
				connection.query("UPDATE products SET stock_quantity = ? WHERE product_name = ?", [stock - res.quantity, name], function(err, results) {
					if (err) throw err;
				});
				updatedept(dept, cost, price, res.quantity);
				i++;
				inquiry(index, data1);
			});
		}
		else {
			console.log("\n-------------------------------------------------\n");
			console.log("Thanks for your order, we'll accomplish it as soon as possible!")
			console.log("\n-------------------------------------------------\n");
			customer();
		};
	};
};

function updatedept(dept, cost, price, quant) { // update database "departments" when customer orders
	connection.query("SELECT * FROM departments WHERE department_name = ?", [dept], function(err, res) {
		var result = res;
		var newcost = parseFloat(result[0].product_cost) + parseFloat(cost) * parseInt(quant);
		var newsales = parseFloat(result[0].product_sales) + parseFloat(price) * parseInt(quant);
		var newprofit = parseFloat(result[0].total_profit) + (parseFloat(price) - parseFloat(cost)) * parseInt(quant);
		connection.query("UPDATE departments SET product_cost = ? WHERE department_name = ?", [newcost, dept], function(err, resp) {
			if (err) throw err;
		});
		connection.query("UPDATE departments SET product_sales = ? WHERE department_name = ?", [newsales, dept], function(err, resp) {
			if (err) throw err;
		});
		connection.query("UPDATE departments SET total_profit = ? WHERE department_name = ?", [newprofit, dept], function(err, resp) {
			if (err) throw err;
		});
	});
};

function showlist() { // for user's convenience
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
	});
};

module.exports = customer;

// For updating sql. There's no way for me to type them one by one..

// connection.query("SELECT * FROM products", function(err, results) {
// 	if (err) throw err;
// 	for (i = 0; i < results.length; i++) {
// 		connection.query("UPDATE products SET cost = ? WHERE item_id = ?", [results[i].price * 0.55, results[i].item_id], function(err, res) {
// 			console.log("It has been updated.");
// 		})
// 	};
// });
// connection.query("SELECT department_name, product_sales FROM departments", function(err, results) {
// 	if (err) throw err;
// 	console.log(results);
// 	for (i = 0; i < results.length; i++) {
// 		connection.query("UPDATE departments SET product_cost = ? WHERE department_name = ?", [results[i].product_sales * 0.55, results[i].department_name], function(err, res) {
// 			console.log("It has been updated.");
// 		});
// 	}
// });