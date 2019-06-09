const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();
const moment = require('moment');

router.get('/', rejectUnauthenticated, (req, res) => {
	//json_agg and json_build_object solved the problem of trying to combine the data from two array_agg
	//functions, and instead builds an array of objects with the data I need as key value pairs. Super cool.
	let queryText = `SELECT "review"."id" as reviewId, "date", "user_id", "rating", "notes", json_agg(json_build_object('promptId', "prompt".id, 'promptText', "prompt".prompt, 'promptAnswer', "prompt_review".answer)) as answers FROM "review"
		JOIN "prompt_review" ON "prompt_review".review_id = "review".id
		JOIN "prompt" ON "prompt_review".prompt_id = "prompt".id
		WHERE "review".user_id = $1
		GROUP BY "review".id ORDER BY "review".id ASC;`;
	let queryValue = req.user.id
	pool.query(queryText, [queryValue])
	.then((result) => {
		console.log('day get results:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in day GET:', error)
	});
});//end GET

router.get('/dates', rejectUnauthenticated, (req, res) => {
	console.log('day/dates req.query:', req.query);
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;
	let queryText = `SELECT "review"."id" as reviewId, "review"."date", "review"."user_id", "review"."rating", "review"."notes", json_agg(json_build_object('promptId', "prompt".id, 'promptText', "prompt".prompt, 'promptAnswer', "prompt_review".answer)) as answers FROM "review"
		JOIN "prompt_review" ON "prompt_review".review_id = "review".id
		JOIN "prompt" ON "prompt_review".prompt_id = "prompt".id
		WHERE "review".date BETWEEN $1 AND $2
		AND "review".user_id = $3
		GROUP BY "review".id ORDER BY "review".date ASC;`;
	pool.query(queryText, [startDate, endDate, req.user.id])
		.then((result) => {
			console.log('LOOK HERE day/dates get results:', result.rows);
			res.send(result.rows)
		}).catch((error) => {
			console.log('ERROR error in day/dates GET:', error)
		});
});//end /dates GET

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
});//end POST

router.put('/', rejectUnauthenticated, (req, res) => {
	console.log('req.body:', req.body)
	let queryText = `UPDATE "review"
		SET "notes" = $1
		WHERE "id" = $2 AND "user_id" = $3;`;
	let queryValues = [req.body.notes, req.body.id, req.user.id];
	pool.query(queryText, queryValues)
		.then(() => {
			res.sendStatus(200)
		}).catch((error) => {
			console.log('error in user put:', error);
			res.sendStatus(500);
		})
});//end PUT

router.delete('/:id', rejectUnauthenticated, (req, res) => {
	console.log('is authenticated?', req.isAuthenticated());
	console.log('req.params.id:', req.params.id);
	let queryText = `DELETE FROM "review"
		WHERE "review".id = $1 AND "review".user_id = $2;`;
	pool.query(queryText, [req.params.id, req.user.id])
	.then(() => {
		res.sendStatus(200);
	}).catch((error) => {
		console.log('error in day DELETE:', error)
	})
});//end DELETE

module.exports = router;
