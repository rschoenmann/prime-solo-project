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
	const queryText = `INSERT INTO "review" ("user_id", "rating", "notes") 
						VALUES ($1, $2, $3) RETURNING id;`;
	const queryValues = [req.user.id,  req.body.value, req.body.notes]
	pool.query(queryText, queryValues).then((result) => {
		console.log('result.rows:', result.rows)
		const queryText2 = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer")
							VALUES ($1, $2, $3);`
		const queryValues2 = [(1, result.rows[0].id, req.body['1']),
			(2, result.rows[0].id, req.body['2']),
			(3, result.rows[0].id, req.body['3']),
			(4, result.rows[0].id, req.body['4']),
			(5, result.rows[0].id, req.body['5'])]
		pool.query(queryText2, queryValues2).then((result) => {
			console.log('result.row2:', result.rows);
			res.sendStatus(201);
		})
	}).catch(() => res.sendStatus(500));
});

module.exports = router;

// req.body['1'], req.body['2'], req.body['3'], req.body['4'], req.body['5'],