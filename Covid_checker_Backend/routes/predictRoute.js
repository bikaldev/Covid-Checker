const express = require('express');
const multer = require('multer')();


const predictionHandler = require('../handlers/predictionHandler');

const router = express.Router()


router.post('/predict/',multer.none(),predictionHandler);


module.exports = router;