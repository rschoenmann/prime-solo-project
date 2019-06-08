const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
	console.log('single day query params', req.params.id);
	let queryText = `SELECT "review"."id" as reviewId, "date", "user_id", "rating", "notes", json_agg(json_build_object('promptId', "prompt".id, 'promptText', "prompt".prompt, 'promptAnswer', "prompt_review".answer) ORDER BY "prompt".id) as answers FROM "review"
		JOIN "prompt_review" ON "prompt_review".review_id = "review".id
		JOIN "prompt" ON "prompt_review".prompt_id = "prompt".id
		WHERE "review".user_id = $1
		AND "review".id = $2
		GROUP BY "review".id ORDER BY "review".id ASC;`;
	let queryValue = [req.user.id, req.params.id]
	pool.query(queryText, queryValue)
		.then((result) => {
			console.log('single day get results:', result.rows);
			res.send(result.rows)
		}).catch((error) => {
			console.log('error in single day GET:', error)
		});
});//end single day GET

module.exports = router;