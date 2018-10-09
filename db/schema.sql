-- This file is never executed since sequelize is being used to create the tables

-- change the root password to an empty string for development purposes
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

### Schema
DROP DATABASE IF EXISTS sequelized_burgers_db;
CREATE DATABASE sequelized_burgers_db;
USE sequelized_burgers_db;

CREATE TABLE customers
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES customers(id)
);
