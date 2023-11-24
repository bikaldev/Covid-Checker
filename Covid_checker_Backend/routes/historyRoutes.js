const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')();


historyHandler = require('../handlers/historyHandlers');

const router = express.Router()

router.post('/record', multer.none(),historyHandler.recordHandler);
router.post('/getHistory', bodyParser.json(),historyHandler.getHistoryHandler);


module.exports = router;