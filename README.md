# Bamazon

Demonstration video: https://www.youtube.com/watch?v=5VdWBuk9o2k&feature=youtu.be

## Overview

A Node.js version of Amazon. Multiple user interfaces allow users to experience various features under different identities (customer, manager and supervisor). Rooted in powerful MySQL database, user could operate a complete supply chain system within the app, from adding new products to managing department sales.

## Guidance

To use Bamazon, please follow steps below.

Before getting started, make sure you have access to these apps: 

`Terminal`

`MySQL Workbench`

1. Clone this repository;
2. Open `Terminal`, navigate to the folder of this repository;
3. In command line, type `npm i` and press `enter` to install npm modules involved in this app;
4. In command line, type `mysqld` and press `enter` to start MySQL progress;
5. Open `MySQL Workbench`, make a connection, then paste codes in `Bamazon.sql` to query window and run queries;
6. Open `Terminal` and navigate to the folder of this repository, type `node uploadSQL.js` in command line and press `enter`. After everything has been updated, press `ctrl + c` to terminate this progress.
**(Notice: this step is extremely important, otherwise many values in database will be missing!)**
7. In command line, type `node bamazon.js` and press `enter`. Enjoy it!

## Copyright

Sunny (Hao) Su (C) 2017. All rights reserved.