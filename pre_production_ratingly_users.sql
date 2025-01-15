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
(26, 'Trigger Happy', '$2b$10$2WLsvU87vUHGbHYSg5g2dOTOt8aPGcotKMBrrvubqQuPFXJiSqfzC', NULL, NULL),
(27, 'Sixten 610', '$2b$10$aiOJG8MYmL7IP5Ei31TGzulPY2p.lAQjhtTaxpEY4Uf52Ow6.w5GS', NULL, NULL),
(28, 'Tryhard', '$2b$10$GwPQJbfIHyjBPEbKroK0Ke9earVdFss19IQW.RXoLLQd8css0e3ty', NULL, NULL),
(29, 'Mayhaps Perchance', '$2b$10$db7OA8RCBq1F4i4nO.2qZuPHsSVf6VzenRUPUEIo87PH1a7Z27pDe', NULL, NULL),
(30, 'De Oderant', '$2b$10$Z/4C8YyzjNKxHHalU..2nuiE1uIWbhRjDqXLBAT6xvxiz2PeMXI7q', NULL, NULL),
(31, 'asfsdf', '$2b$10$klBRL6Vq12Ku6coDu6BTAeYwEWa7gtGHjXoO64asoBHkwgWEbv1mK', NULL, NULL),
(32, 'Momma G', '$2b$10$.eQatLdOMGzWk3DJaSCQnOUK/uB4D1Lfmexdec9nskx1oel06Kzai', NULL, NULL),
(33, 'Stryker69669', '$2b$10$lq04xNSjlW0IZLO8nlSjpOI7KFW3xH2Z0aY5o1ACFYQIJlBg.1Fw.', NULL, NULL);