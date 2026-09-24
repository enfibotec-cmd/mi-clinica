CREATE DATABASE IF NOT EXISTS mi_app
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mi_app;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email)
VALUES
    ('Usuario Demo', 'demo@ejemplo.com');
