DROP DATABASE IF EXISTS practice;

CREATE DATABASE practice;

\c practice

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR,
    lastname VARCHAR,
    age INT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    poster_id INT REFERENCES users (id), 
    body VARCHAR
);

CREATE TABLE userLikes (
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES users (id),
    post_id INT REFERENCES posts (id)
);

INSERT INTO users(firstname, lastname, age)
    VALUES ('Peter', 'Fiorentino', 25),
            ('George', 'Something', 65),
            ('Tim', 'Dillon', 40),
            ('Mike', 'Freeman', 25),
            ('Pat', 'ODonnell', 26),
            ('Joe', 'Azevedo', 30);

INSERT INTO posts (poster_id, body)
    VALUES (1, 'Lalalalal'),
            (1, 'hi'),
            (2, 'whats up'),
            (3, 'yo'),
            (4, 'yeah yeah yeah'),
            (6, 'that is what I meant');


INSERT INTO userLikes (liker_id, post_id)
    VALUES (2, 1),
            (3, 1),
            (4, 1),
            (5, 1), 
            (6, 1),
            (3, 2),
            (4, 2),
            (2, 3),
            (4, 6);


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes;