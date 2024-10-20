CREATE DATABASE pizzanodejs;
USE pizzanodejs;

CREATE TABLE user(
  id int primary key AUTO_INCREMENT,
  name varchar(250),
  contactNumber varchar(20),
  email varchar(50),
  password varchar(250),
  status varchar(20),
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
  status varchar(20),
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
