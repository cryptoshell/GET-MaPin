
DROP TABLE IF EXISTS "favourite";
DROP TABLE IF EXISTS "marker";
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user"(
  "userid" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "email" varchar(50) NOT NULL,
  "password" varchar(50) NOT NULL
);

CREATE TABLE "category"(
  "categoryid" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL
);

CREATE TABLE "marker"(
  "markerid" serial PRIMARY KEY,
  "user_id" integer REFERENCES "user" (userid),
  "category_id" integer REFERENCES "category" (categoryid),
  "lat" integer NOT NULL,
  "long" integer NOT NULL,
  "title" varchar(50) NOT NULL,
  "description" varchar(140) NOT NULL
);

CREATE TABLE "favourite"(
  "favouriteid" serial PRIMARY KEY,
  "user_id" integer REFERENCES "user" (userid),
  "category_id" integer REFERENCES "category" (categoryid)
);
