const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();


//handles GET route for prompts if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
	console.log('is authenticated?', req.isAuthenticated);
	// select all columns from "prompt" table in database
	let queryText = `SELECT * FROM "prompt";`
	pool.query(queryText)
	.then((result) =>{
		console.log('prompt get result.rows:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in prompt GET:', error);
	});
});//end GET

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;