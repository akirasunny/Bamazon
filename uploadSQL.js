var mysql = require("mysql");

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


connection.query("SELECT * FROM products", function(err, results) {
	if (err) throw err;
	for (i = 0; i < results.length; i++) {
		connection.query("UPDATE products SET cost = ? WHERE item_id = ?", [results[i].price * 0.55, results[i].item_id], function(err, res) {
			console.log("It has been updated.");
		})
	};
});
connection.query("SELECT department_name, product_sales FROM departments", function(err, results) {
	if (err) throw err;
	for (i = 0; i < results.length; i++) {
		connection.query("UPDATE departments SET product_cost = ? WHERE department_name = ?", [results[i].product_sales * 0.55, results[i].department_name], function(err, res) {
			console.log("It has been updated.");
		});
	}
});