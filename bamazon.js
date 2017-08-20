// Manager: username: Akira password: akira
// Supervisor: username: Hao password: haothecoder

// globals

var inquirer = require("inquirer");
var mysql = require("mysql");
var sha1 = require("sha1");

var customer = require("./customer.js");
var manager = require("./manager.js");
var supervisor = require("./supervisor.js");

var options = ["Customer", "Manager", "Supervisor", "I got here by mistake, just wanna leave."];

function quit() {
	console.log("\n-------------------------------------------------\n");
	console.log("Thanks for visiting Bamazon. See you next time.");
	console.log("\n-------------------------------------------------\n");
	process.exit();
};

function greeting() {
	console.log("\n-------------------------------------------------\n");
	console.log("Welcome to Bamazon, your best retailer of fountain pens and inks.\nIf you doubt, please refer to whatever above.");
	console.log("\n-------------------------------------------------\n");
	inquirer.prompt([
		{
			type: "list",
			choices: options,
			message: "You are our:\n",
			name: "login"
		}
	]).then(function(res) {
		switch (res.login) {
			case options[0]:
				customer();
				break;

			case options[1]:
				manager();
				break;

			case options[2]:
				supervisor();
				break;

			case options[3]:
				quit();
				break;
		};
	});
};

module.exports = greeting;

greeting();