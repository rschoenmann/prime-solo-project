const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/rating', rejectUnauthenticated, (req, res) => {
	console.log('stats req.query:', req.query);
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;
	let queryText = `SELECT "rating", count(*) FROM "review"
		WHERE "date" BETWEEN $1 AND $2
		AND "user_id" = $3
		GROUP BY "rating" ORDER BY "rating";`;
	pool.query(queryText, [startDate, endDate, req.user.id])
		.then((result) => {
			console.log('stats rating GET:', result.rows);
			res.send(result.rows)
		}).catch((error) => {
			console.log('error in stats rating GET:', error)
		});
});//end stats rating GET

router.get('/prompts', rejectUnauthenticated, (req, res) => {
	console.log('stats prompt req.query:', req.query);
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;
	let queryText = `SELECT count(*) FILTER (WHERE "answer") as truecount,
		count(*) FILTER (WHERE NOT "answer") as falsecount, "prompt".prompt FROM "prompt_review"
		JOIN "review" ON "prompt_review".review_id = "review"."id"
		JOIN "prompt" ON "prompt_review".prompt_id = "prompt"."id"
		WHERE "review"."date" BETWEEN $1 AND $2
		AND "review".user_id = $3
		GROUP BY "prompt"."prompt";`;
	pool.query(queryText, [startDate, endDate, req.user.id])
		.then((result) => {
			console.log('stats rating GET:', result.rows);
			res.send(result.rows)
		}).catch((error) => {
			console.log('error in stats rating GET:', error)
		});
});//end stats rating GET



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;