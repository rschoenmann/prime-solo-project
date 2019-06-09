const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/rating', rejectUnauthenticated, (req, res) => {
	console.log('stats rating req.body', req.params.id);
	let queryText = `SELECT "rating", count(*) FROM "review"
		WHERE "date" BETWEEN '2019-04-01' AND '2019-05-30'
		AND "user_id" = 2
		GROUP BY "rating";`;
	let queryValue = []
	pool.query(queryText, queryValue)
		.then((result) => {
			console.log('single day get results:', result.rows);
			res.send(result.rows)
		}).catch((error) => {
			console.log('error in single day GET:', error)
		});
});//end single day GET

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;