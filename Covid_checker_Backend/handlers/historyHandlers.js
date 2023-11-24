const User = require('../models/user');
const History = require('../models/history');

exports.getHistoryHandler = (req, res, next) => {
    patientId = req.body.patientId;
    
    History.findAll({where: {
        patientId: patientId
    }}).then(
        result => {
            console.log(result);
            res.status(200).json({message: "Successfully Retrieved!", history: result});
            next();
        }
    ) 
}

exports.recordHandler = (req, res, next) => {
    
    let diagnosis = req.body.diagnosis;
    let certainty = req.body.certainty;
    let patientId = req.body.patientId;
    let history = {
        diagnosis: diagnosis,
        patientId: patientId
    }
    
    if(certainty) {
        history.certainty = certainty;
    }
    
    History.create(history).then(
        response => {
            res.status(200).json({message: "Recorded Successfully!"});
            next();
        }
    ).catch( err => {
        res.status(500).json({message: "Error while recording!"});
        next();
    }
        
    ).catch(
        err => {
            res.status(500).json({message: "Error while Recording!"});
            next();
        }
    )
}
