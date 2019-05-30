
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

CREATE TABLE "review" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"date" DATE DEFAULT CURRENT_DATE,
	"prompt1" BOOLEAN,
	"prompt2" BOOLEAN,
	"prompt3" BOOLEAN,
	"prompt4" BOOLEAN,
	"prompt5" BOOLEAN,
	"rating" INT NOT NULL,
	"notes" VARCHAR(200)
	);



