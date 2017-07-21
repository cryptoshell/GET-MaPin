DROP TABLE IF EXISTS "favourites";
DROP TABLE IF EXISTS "markers";
DROP TABLE IF EXISTS "categories";
DROP TABLE IF EXISTS "users";

-- CREATE TABLE "users"(
--   "userid" serial PRIMARY KEY,
--   "name" varchar(50) NOT NULL,
--   "email" varchar(50) NOT NULL,
--   "password" varchar(50) NOT NULL
-- );
--
-- CREATE TABLE "categories"(
--   "categoryid" serial PRIMARY KEY,
--   "name" varchar(50) NOT NULL
-- );
--
-- CREATE TABLE "markers"(
--   "markerid" serial PRIMARY KEY,
--   "user_id" integer REFERENCES "users" (userid),
--   "category_id" integer REFERENCES "categories" (categoryid),
--   "lat" integer NOT NULL,
--   "long" integer NOT NULL,
--   "title" varchar(50) NOT NULL,
--   "description" varchar(140) NOT NULL
-- );
--
-- CREATE TABLE "favourites"(
--   "favouriteid" serial PRIMARY KEY,
--   "user_id" integer REFERENCES "users" (userid),
--   "category_id" integer REFERENCES "categories" (categoryid)
-- );
