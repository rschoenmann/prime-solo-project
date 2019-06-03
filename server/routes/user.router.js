const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log('req.user:', req.user)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const name = req.body.name;
  const gradient = req.body.gradient;

  const queryText = 'INSERT INTO "user" (username, password, name, gradient_id) VALUES ($1, $2, $3, $4) RETURNING id';
  pool.query(queryText, [username, password, name, gradient])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});//end login POST

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});//end logout POST

router.put('/', rejectUnauthenticated, (req, res) => {
	console.log('req.body:', req.body)
	let queryText = `UPDATE "user"
		SET "username" = $1,
		"name" = $2,
		"gradient_id" = $3
		WHERE id = $4;`;
	let queryValues = [req.body.username, req.body.name, req.body.gradient_id, req.user.id];
	pool.query(queryText, queryValues)
	.then(() => {
		res.sendStatus(200)
	}).catch((error) => {
		console.log('error in user put:', error);
		res.sendStatus(500);
	})
});//end PUT

module.exports = router;
