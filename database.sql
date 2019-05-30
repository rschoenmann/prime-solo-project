
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
	"prompt_review_id" INT REFERENCES "prompt_review",
	"rating" INT NOT NULL,
	"notes" VARCHAR(200)
	);

	CREATE TABLE "prompt_review" (
	"id" SERIAL PRIMARY KEY,
	"prompt_id" INT REFERENCES "prompt",
	"review_id" INT REFERENCES "review",
	"answer" BOOLEAN
	);



