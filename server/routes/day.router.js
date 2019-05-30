const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', rejectUnauthenticated, (req, res) => {
	console.log('Is authenticated?', req.isAuthenticated());
	console.log('req.body:', req.body);
	console.log('req.user:', req.user);
	const queryText = `INSERT INTO "review" ("user_id", "prompt1", "prompt2", "prompt3", "prompt4", "prompt5", "rating", "notes") 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
	const queryValues = [req.user.id, req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'], req.body.value, req.body.notes]
	pool.query(queryText, queryValues).then(() => res.sendStatus(201))
	.catch(() => res.sendStatus(500));
});

module.exports = router;