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

router.post('/', rejectUnauthenticated, async (req, res) => {
	console.log('Is authenticated?', req.isAuthenticated());
	console.log('req.body:', req.body);
	console.log('req.user:', req.user);
	//need to use the same connection for all queries
	const connection = await pool.connect()
	try{
		await connection.query('BEGIN');
		const addReview = `INSERT INTO "review" ("user_id", "rating", "notes") 
						VALUES ($1, $2, $3) RETURNING id;`; //save the result so we can get the returned value
		const addReviewValues = [req.user.id, req.body.value, req.body.notes]
		const result = await connection.query(addReview, addReviewValues)
		//save id of the current review we're inserting into to use in subsequent inserts
		const reviewId = result.rows[0].id;
		//each of the 5 prompts inserted into prompt_review separately
		const promptOne = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer") VALUES ($1, $2, $3);`;
		await connection.query(promptOne, [1, reviewId, req.body['1']]);
		const promptTwo = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer") VALUES ($1, $2, $3);`;
		await connection.query(promptTwo, [2, reviewId, req.body['2']]);
		const promptThree = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer") VALUES ($1, $2, $3);`;
		await connection.query(promptThree, [3, reviewId, req.body['3']]);
		const promptFour = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer") VALUES ($1, $2, $3);`;
		await connection.query(promptFour, [4, reviewId, req.body['4']]);
		const promptFive = `INSERT INTO "prompt_review" ("prompt_id", "review_id", "answer") VALUES ($1, $2, $3);`;
		await connection.query(promptFive, [5, reviewId, req.body['5']]);
		await connection.query('COMMIT');
		res.sendStatus(200);
	}catch(error){
		//if any of the above steps fail, abort the entire transaction so no bad info gets into database
		await connection.query('ROLLBACK');
		console.log('Transaction error - rolling back review entry:', error);
		res.sendStatus(500);
	}finally{
		connection.release()
	}
});

module.exports = router;
