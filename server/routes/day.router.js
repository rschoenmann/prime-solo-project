const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', rejectUnauthenticated, (req, res) => {
	console.log('Is authenticated?', req.isAuthenticated());
	console.log('req.body:', req.body);
	console.log('req.user:', req.user)
});

module.exports = router;