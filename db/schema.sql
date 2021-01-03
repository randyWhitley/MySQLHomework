DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department( 
department_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR (50) NOT NULL
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineers"), ("Finance"), ("Legal");

CREATE TABLE role (
role_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR (50) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT,
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales VP", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesemployee", 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Head Engineer", 350000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 130000,3);
INSERT INTO role (title, salary, department_id)
VALUES ("Account", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 600000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Secretary Legal", 19000, 5);

CREATE TABLE employee(
employee_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (50) NOT NULL,
last_name VARCHAR (50) NOT NULL,
role_id INT,
manager_id INT NULL,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL,
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE CASCADE
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Jon", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bon", "Don", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Rake", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lake", "Fake", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Randy", "Whitley", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zoro", "Toro", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Riff", "Raff", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Stan", "Dan", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gaaaa", "Haaa", 5, null);
INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUES ("Voltron", "White", 5, null);
