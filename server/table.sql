CREATE DATABASE pizzanodejs;
USE pizzanodejs;

CREATE TABLE user(
  id int primary key AUTO_INCREMENT,
  name varchar(250),
  contactNumber varchar(20),
  email varchar(50),
  password varchar(250),
  UNIQUE (email)
);

CREATE TABLE category(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId integer NOT NULL,
  description varchar(255),
  price integer,
  PRIMARY KEY(id),
  FOREIGN KEY (categoryId) REFERENCES category(id)
);

CREATE TABLE bill(
  id int NOT NULL AUTO_INCREMENT,
  uuid varchar(200) NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  contactNumber varchar(20) NOT NULL,
  paymentMethod varchar(50) NOT NULL,
  total int NOT NULL,
  productDetails JSON DEFAULT NULL,
  createdBy varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact_number VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
