
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "gradient" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30),
	"color1" VARCHAR(10),
	"color2" VARCHAR(10),
	"color3" VARCHAR(10),
	"color4" VARCHAR(10),
	"color5" VARCHAR(10)
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

INSERT INTO "prompt" ("prompt")
VALUES ('Did you get enough sleep last night?'), 
('Did you drink enough water today?'), ('Did you go outside today?'), 
('Did you take your meds today?'), ('Did you talk to a friend today?');

CREATE TABLE "review" (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"user_id" INT REFERENCES "user",
	"rating" INT NOT NULL,
	"notes" VARCHAR(200)
	);

	CREATE TABLE "prompt_review" (
	"id" SERIAL PRIMARY KEY,
	"prompt_id" INT REFERENCES "prompt",
	"review_id" INT REFERENCES "review" ON DELETE CASCADE,
	"answer" BOOLEAN
	);



