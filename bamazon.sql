CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(8) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

USE Test

CREATE TABLE friday(
	id INTEGER AUTO_INCREMENT NOT NULL,
    breakfast VARCHAR(50),
    lunch VARCHAR(50),
    dinner VARCHAR(50),
    PRIMARY KEY(id)
);

INSERT INTO friday(breakfast, lunch, dinner)
VALUES ("Starbucks", "postmate", "unknown");

INSERT INTO friday(breakfast, lunch, dinner)
VALUES ("Starbucks again", "postmate again", "unknown");

INSERT INTO friday(breakfast, lunch, dinner)
VALUES ("Starbucks", "postmate", "unknown");

CREATE DATABASE top_songsDB;

USE top_songsDB;

CREATE TABLE Top5000(
	ranking INTEGER NOT NULL,
	artist TEXT NOT NULL,
    song TEXT NOT NULL,
    year INTEGER NOT NULL,
    total_score FLOAT(5, 3),
    us_score FLOAT(5, 3),
    uk_score FLOAT(5, 3),
    non_eng_eu FLOAT(5, 3),
    other FLOAT(5, 3)
);