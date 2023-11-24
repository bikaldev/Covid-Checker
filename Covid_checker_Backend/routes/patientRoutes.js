const express = require('express');
const bodyParser = require('body-parser');

const patientHandler = require('../handlers/patientHandlers')

const router = express.Router()

router.use(bodyParser.json());
router.post('/savePatient/',patientHandler.savePatient);
router.post('/deletePatient/',patientHandler.deletePatient);
router.post('/getPatients',patientHandler.getPatients);
router.post('/searchPatient', patientHandler.searchPatient);



module.exports = router;