const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
	let queryText = `SELECT * FROM "review"
		WHERE "review"."user_id" = $1 ORDER BY "date";`;
	let queryValue = req.user.id
	pool.query(queryText, [queryValue]).then((result) => {
		console.log('day get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in day GET:', error)
	});
});//end GET

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