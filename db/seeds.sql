USE sequelized_burgers_db;
INSERT INTO Customers (name, createdAt, updatedAt) VALUES ("Adam", NOW(), NOW());
INSERT INTO Customers (name, createdAt, updatedAt) VALUES ("Eve", NOW(), NOW());
INSERT INTO Customers (name, createdAt, updatedAt) VALUES ("John", NOW(), NOW());
INSERT INTO Customers (name, createdAt, updatedAt) VALUES ("Jane", NOW(), NOW());
INSERT INTO Burgers (name, createdAt, updatedAt) VALUES ("Big Mac", NOW(), NOW());
INSERT INTO Burgers (name, createdAt, updatedAt) VALUES ("Junior Chicken", NOW(), NOW());
INSERT INTO Burgers (name, devoured, CustomerId, createdAt, updatedAt) VALUES ("Cheese Burger", true, 1, NOW(), NOW());
INSERT INTO Burgers (name, devoured, createdAt, updatedAt) VALUES ("Turkey Burger", false, NOW(), NOW());
