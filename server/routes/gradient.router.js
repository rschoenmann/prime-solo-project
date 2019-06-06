const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();


//handles GET route for gradients if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
	console.log('is authenticated?', req.isAuthenticated);
	//used json_agg and json_build_object so each gradient row would have an array of 5 objects corresponding to the 5 color values
	let queryText = `SELECT "gradient"."id" as gradientId, "gradient"."name", json_agg(json_build_object('value', "gradient_color".rating, 'color', "gradient_color".color)) AS "colors" FROM "gradient"
		JOIN "gradient_color" ON "gradient_color".gradient_id = "gradient"."id"
		GROUP BY "gradient"."id" ORDER BY "gradient"."id";`
	pool.query(queryText)
	.then((result) =>{
		console.log('prompt get result.rows:', result.rows);
		res.send(result.rows)
	}).catch((error) => {
		console.log('error in prompt GET:', error);
	});
});//end GET

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;