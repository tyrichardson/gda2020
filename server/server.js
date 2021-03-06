
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const readerRouter = require('./routes/reader.router');
const writerRouter = require('./routes/writer.router');
const googleMapsRouter = require('./routes/googleMaps.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
//user is for login/reg; reader is for unauthenticated landing page; writer is for all logged-in user views
app.use('/api/user', userRouter);
app.use('/api/reader', readerRouter);
app.use('/api/writer', writerRouter);
app.use('/api/googleMaps', googleMapsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
