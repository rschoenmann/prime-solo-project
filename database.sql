
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "gradient" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30)
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (100),
    "gradient_id" INT REFERENCES "gradient"
);

CREATE TABLE "prompt" (
    "id" SERIAL PRIMARY KEY,
    "prompt" VARCHAR(100)
);



