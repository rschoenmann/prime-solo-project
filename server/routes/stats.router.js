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
});//end single day GET



/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;