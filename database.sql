
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "gradient" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(30),
);

CREATE TABLE "gradient_color" (
	"id" SERIAL PRIMARY KEY,
	"gradient_id" INT REFERENCES "gradient",
	"color" VARCHAR(10),
	"rating" INT
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

INSERT INTO "gradient_color"
	("gradient_id", "color", "rating")
VALUES(2, '#ec2f4b', 1),(2, '#b14b78', 2),(2, '#7667a5', 3),(2, '#3b83d2', 4),(2, '#009fff', 5),
	(3, '#159957', 1),(3, '#158867', 2),(3, '#157878', 3),(3, '#156788', 4),(3, '#155799', 5),
	(4, '#16003b', 1),(4, '#52004b', 2),(4, '#8c1127', 3),(4, '#ffad5c', 4),(4, '#ffe270', 5),
	(5, '#13215c', 1),(5, '#573f99', 2),(5, '#a256d1', 3),(5, '#f792e8', 4),(5, '#ffc4ee', 5),
	(6, '#000046', 1),(6, '#072D6C', 2),(6, '#0E5A93', 3),(6, '#1587B9', 4),(6, '#1CB5E0', 5),
	(7, '#F64E58', 1),(7, '#F160C5', 2),(7, '#C470ED', 3),(7, '#87A2EF', 4),(7, '#4AD4F2', 5);

	