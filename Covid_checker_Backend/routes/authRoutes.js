const express = require('express');
const bodyParser = require('body-parser');

const authHandler = require('../handlers/authHandlers')

const router = express.Router()

router.use(bodyParser.json());
router.post('/signup/',authHandler.signupHandler);
router.post('/login/',authHandler.loginHandler);



module.exports = router;