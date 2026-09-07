-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS mi_app_db;

-- Seleccionar la base de datos para crear las tablas dentro de ella
USE mi_app_db;

-- Crear la tabla 'users' basada exactamente en tu entidad de JPA
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

-- Crear la tabla 'search_histories' basada en tu nueva entidad
CREATE TABLE IF NOT EXISTS search_histories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    search_date DATETIME NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user_history FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );