const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
	console.log('day/dates req.query:', req.query);
	let startDate = moment(req.query.endDate).format('YYYY-MM-DD')
	let endDate = moment(req.query.startDate).format('YYYY-MM-DD')
	console.log('start end date', startDate, endDate)
	let queryText = `SELECT "review"."id" as reviewId, "review"."date", "review"."user_id", "review"."rating", "review"."notes", json_agg(json_build_object('promptText', "prompt".prompt, 'promptAnswer', "prompt_review".answer)) as answers FROM "review"
		JOIN "prompt_review" ON "prompt_review".review_id = "review".id
		JOIN "prompt" ON "prompt_review".prompt_id = "prompt".id
		WHERE "review".date BETWEEN $1 AND $2
		AND "review".user_id = $3
		GROUP BY "review".id ORDER BY "review".date ASC;`;
	pool.query(queryText, [startDate, endDate, req.user.id])
		.then((result) => {
			console.log('day/dates get results:', result.rows);
			console.log('start end date', startDate, endDate);
			res.send(result.rows)
		}).catch((error) => {
			console.log('error in day/dates GET:', error)
		});
});//end GET


module.exports = router;