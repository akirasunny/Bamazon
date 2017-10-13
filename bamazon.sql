CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(8) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    cost FLOAT(8),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	over_head_costs FLOAT(8) NOT NULL,
	product_sales FLOAT(8) DEFAULT 0,
	product_cost FLOAT(8) DEFAULT 0,
	total_profit FLOAT(8) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs, product_sales, total_profit)
VALUES ("fountain pen", 8000, 43560, 8000),
("ink", 13000, 76000, 21200),
("paper", 18000, 86200, 20800),
("accessories", 8500, 0, -8500);

INSERT INTO 

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sailor Piston Converter", "accessories", 8, 20),
("Pilot CON-48 Piston Converter", "accessories", 5.5, 48),
("Sailor Pro Gear", "fountain pen", 248, 30),
("Pilot E95S", "fountain pen", 136, 32),
("Pilot Custom 74", "fountain pen", 160, 20),
("Pilot Falcon", "fountain pen", 152, 33),
("Platinum 3776", "fountain pen", 150, 49),
("Platinum Izumo", "fountain pen", 650, 17),
("Platinum President", "fountain pen", 220, 39),
("Sailor Bespoke 1911 Large", "fountain pen", 298, 20),
("Pilot Prera", "fountain pen", 56, 30),
("Sailor 1911 Standard", "fountain pen", 156, 26),
("Sailor Gentle Four Seasons Ink - Irori", "ink", 18, 100),
("Sailor Gentle Four Seasons Ink - Fuji Musume", "ink", 18, 120),
("Sailor Gentle Four Seasons Ink - Waka Uguisu", "ink", 18, 123),
("Sailor Gentle Four Seasons Ink - Yuki Akari", "ink", 18, 78),
("Sailor Gentle Four Seasons Ink - Yama Dori", "ink", 18, 276),
("Pilot Iroshizuku Ink - Chiku Rin", "ink", 20, 330),
("Pilot Iroshizuku Ink - Kosumosu", "ink", 20, 222),
("Pilot Iroshizuku Ink - Kiri Same", "ink", 20, 145),
("Pilot Iroshizuku Ink - Kon Peki", "ink", 20, 30),
("Pilot Iroshizuku Ink - Momiji", "ink", 20, 233),
("Akkerman Ink - Blauw", "ink", 29, 56),
("Akkerman Ink - Mauritshuis Magenta", "ink", 29, 16),
("Akkerman Ink - Parkpop Purper", "ink", 29, 26),
("Akkerman Ink - Treves-Turquoiser", "ink", 29, 18),
("Meiyutang Rice Paper", "paper", 7.99, 993),
("Kokuyo Grid Paper, A4", "paper", 8.99, 967),
("Kokuyo Grid Paper, A5", "paper", 5.99, 1326),
("Midori Blank Paper, A6", "paper", 7.99, 2306),
("Midori Blank Paper, A5", "paper", 10.99, 1760),
("Midori Blank Paper, A6", "paper", 13.99, 800);