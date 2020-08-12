CREATE TABLE writer (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    admin BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE story (
	id SERIAL PRIMARY KEY,
	story VARCHAR (1000) NOT NULL,
	writer_id integer REFERENCES writer NOT NULL,
	zipcode integer NOT NULL,
	lat double precision NOT NULL,
	lng double precision NOT NULL,
	inappropriate BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE favorite (
	id SERIAL PRIMARY KEY,
	story_id integer REFERENCES story UNIQUE NOT NULL,
	writer_id integer REFERENCES writer UNIQUE NOT NULL,
	user_id integer
);