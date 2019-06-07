
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const promptRouter = require('./routes/prompt.router');
const dayRouter = require('./routes/day.router');
const gradientRouter = require('./routes/gradient.router');
const singleDayRouter = require('./routes/singleDay.router');
const statsRouter = require('./routes/stats.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/prompt', promptRouter);
app.use('/api/day', dayRouter);
app.use('/api/gradient', gradientRouter);
app.use('/api/singleDay', singleDayRouter);
app.use('/api/stats', statsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
