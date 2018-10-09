# sequelizedBurger
A Sequelize ORM implementation of [Eat-Da-Burger!](https://github.com/muntasir2165/burger)

## Project Motivation

This app was developed as part of the full stack homework assignment at the University of Toronto Full Stack Web Development bootcamp. The implemenation involves usage of MySQL for data persistance via the Sequelize ORM, Node.js and Express.js for server-side code and logic handling, and Handlebars for HTML templating.

[App Link](https://sequelized-burger-mb.herokuapp.com/)

## Environment Setup
1) Download and Install the latest version of [Node.js](https://nodejs.org/en/download/) on you computer.
2) Download and Install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/). Create a database login with "root" as the username and set the database server to run on the port 3306 (3306 is the default port). For development and demo purposes, the password should be changed to an empty string (`""`) using the command on line 7 in the [schema.sql](./db/schema.sql) file. Make sure the server is up and running before executing the app.

Please note that this app was developed using Node v8.11.4.

## Getting Started

1) Either download the zipped project from GitHub or clone the repo into your local machine.
The rest of the steps need to be executed on the Terminal:
2) cd into the directory burger.
3) To install all the dependency packages in the project locally, run: `npm install`
4) To create the database for the application, execute: `npm run-script createdb`
5) To seed the application database with sample data, execute: `npm run-script seeddb`
6) To run the app, execute: `node server` or `node server.js` or `npm run-script start`

## Getting Help

If help is needed to understand something in the app or just to provide feedback/suggestion, please send an email to muntasir2165@hotmail.com

## Author

**Muntasir Biojid** - [GitHub Profile](https://github.com/muntasir2165)