DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name varchar(225),
    devoured BOOLEAN NOT NULL default false,
    PRIMARY KEY(id)

);