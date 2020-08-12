##GOOD DEEDS ANONYMOUS

#Application Purpose:

A little emotional uplift! There are good people, living among us, doing good deeds for others simply because they can. And they are us! Not looking for credit, not looking for the limelight,  simply wanting share our stories. We can do that on Good Deeds Anonymous. By sharing our stories and reading those of others, we can create a quiet feedback loop that benefits ourselves, others, and the communities we share. "So shines a good deed in a weary world."

#Application Overview:

Good Deeds Anonymous (GDA) is a Single Page Application promoting the creation and reading of Stories describing a good deed done, sorted by State (USA).

Each Story is a piece of user-generated content from a Writer, a registered/logged-in user. All visitors to the site are Readers. Stories are sorted by each Writer’s State of Residence. In a subsequent update, an Admin role will be added for the purpose of removing Stories flagged as inappropriate by registered users.

#Usernames/Passwords:
You are encouraged to Register with a Username/Password combo of your own, but you are welcome to use some existing combos that were used during development:

tympls/ty

tymemphis/ty

tykalispell/ty

tyoakland/ty

tydavis/ty

#Views/Features:

Public (not logged in):
The public reading view is the Landing page/Home page of Good Deeds Anonymous. All visitors are Readers. Readers can go scroll through all the stories. All visitors are encouraged to become Writers via the Login / Register button in the navigation bar. Each story has a Google Maps Static Map with a custom marker (a "water ripple" icon) which is centered on the story's ZIP code, as entered by the story's Writer.

#Login / Register:
The Login / Register views allows a visitor to register as a Writer or, if already a Writer, they can login. The Public button remains active, so the user go back if they decide not to registration or login. If a registration or login is submitted and is successful, the Write view displays.

#Write:
The Write view allows a Writer to type up a Story and enter the zipcode where their good deed was done. Upon clicking Publish, a prompt is displayed letting the user know their story will be displayed on the Read and Archive pages. The Write view displays a Google Maps Javascript API map with custom cluster markers centered on the ZIP codes entered for each story by their Writers.

#Read (logged in):
The Read view is always accessible for a logged-in Writer. Unlike a Reader, a Writer can mark Stories as Favorites and share them via social media buttons (Facebook, Twitter, and Email). They can also mark stories as "Inappropriate." When logged-in as an administrator, stories marked "Inappropriate" can be removed or unmarked as such. Each story has a Google Maps Static Map with a custom marker (a "water ripple" icon) which is centered on the story's ZIP code, as entered by the story's Writer.

#Archive:
The Archive view displays a list of the Writer’s published stories, which allows them to Edit or Delete Stories. Each story has a Google Maps Static Map with a custom marker (a "water ripple" icon) which is centered on the story's ZIP code, as entered by the story's Writer.

#Favorites:
The Favorites view displays list of the Writer’s Favorites, which allows them to unfavorite an item, which removes it from their Favorites list. Each story has a Google Maps Static Map with a custom marker (a "water ripple" icon) which is centered on the story's ZIP code, as entered by the story's Writer.

#Routes:
Registration/Login
GET all for Read view sorted by most recent
GET for Google Maps Javascript API
GET for Google Maps Static API
GET Writer's stories
GET Writer's favorites
GET specific story for editing
POST for new Story from Write view
POST favorites
DELETE for deleting a Writer's Story and all instances of it as a Favorite for other Writers
DELETE favorite
UPDATE an edited story
UPDATE with "Inappropriate = true" by Writer
UPDATE with toggle "Inappropriate" by Admin


#For next iteration:
	~ port to React-Native

#Entity Relationship Diagram:

![ERD](documentation/images/ERD_GoodDeedsAnonymous.png)

#Technologies used:
React
Redux
Sagas
Sharethis
SweetAlerts
Swiper
Axios
Passport
Session Cookies
Node
Express
PostgreSQL
US ZIP code API
Google Maps Javascipt API
Google Maps Static API
Heroku

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `good_deeds` and create:

```SQL
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
```
## Development Setup Instructions

* Run `npm install`
* Start postgres if not running already (`brew services start postgresql`)
* Run `npm run client`
* Run `npm run server`
* Navigate to `localhost:3000`

## Production Build

This is the build Heroku will run, but during development, you will likely not need to use it.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App
