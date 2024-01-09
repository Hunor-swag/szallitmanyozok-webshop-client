CREATE TABLE webshop_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    address VARCHAR(255),
    billing_country VARCHAR(100),
    billing_state VARCHAR(100),
    billing_city VARCHAR(100),
    billing_postal_code VARCHAR(20),
    billing_address VARCHAR(255)
);