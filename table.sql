--Creación de la base de datos

CREATE DATABASE pizzanodejs;
USE pizzanodejs;

CREATE TABLE user(
  id int primary key AUTO_INCREMENT,
  name varchar(250),
  contactNumber varchar(20),
  email varchar(50),
  password varchar(250),
  status varchar(20),
  role varchar(20),
  UNIQUE (email)
);

INSERT INTO user (name, contactNumber, email, password, status, role) 
VALUES ('Admin', '76233944', 'admin@gmail.com', 'admin', 'true', 'admin');

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
  PRIMARY KEY(id);
);