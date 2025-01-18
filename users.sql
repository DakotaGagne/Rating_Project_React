DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar NOT NULL,
    "password" varchar,
    "oauth" varchar,
    "oauthid" varchar,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX users_id_key ON public.users USING btree (id);
CREATE UNIQUE INDEX users_oauthid_key ON public.users USING btree (oauthid);

INSERT INTO "public"."users" ("id", "username", "password", "oauth", "oauthid") VALUES
(1, 'John Doe', 'passingwords', NULL, NULL);
INSERT INTO "public"."users" ("id", "username", "password", "oauth", "oauthid") VALUES
(20, 'dakota gagne', NULL, 'google', '100174036047347845192');
INSERT INTO "public"."users" ("id", "username", "password", "oauth", "oauthid") VALUES
(21, 'Dakota Gagne', NULL, 'github', '33745192');
INSERT INTO "public"."users" ("id", "username", "password", "oauth", "oauthid") VALUES
(22, 'savannah kirkeby', NULL, 'google', '112128740827961774449'),
(32, 'Momma G', '$2b$10$.eQatLdOMGzWk3DJaSCQnOUK/uB4D1Lfmexdec9nskx1oel06Kzai', NULL, NULL),
(33, 'Stryker69669', '$2b$10$lq04xNSjlW0IZLO8nlSjpOI7KFW3xH2Z0aY5o1ACFYQIJlBg.1Fw.', NULL, NULL),
(5, '00001', '$2b$10$pc11aRlFMmkjMwsF3nJj9ex8LN9unHU06MLK2e6ZpHoUbogkkP0ku', NULL, NULL),
(2, 'Admin', '$2b$10$yAWON82gdwtCb5kzvI.1D.JF.kBFn.ofW1UEM0CvC9iPzLdicCrQC', NULL, NULL);