const { Sequelize } = require('sequelize');


const Patient = require('../models/patient');
const User = require('../models/user')

exports.savePatient = (req, res, next) => {
    
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let email = req.body.email;
    let address = req.body.address;

    let org_email = req.body.org_email;
    let userId;

    User.findOne({
        where: {
            email: org_email
        }
    }).then(
        result => {
            userId = result.id;
            Patient.create(
                {   
                    name:name,
                    age: age,
                    gender: gender,
                    email: email,
                    address: address,
                    userId: userId
                }
            ).then(
                _ =>{
                    res.status(200).json({message: "Success"});
                    next();
                }
            )
        }
    );
    
}

exports.getPatients = (req, res, next) => {
    let org_email = req.body.org_email;

    User.findOne({
        where: {
            email: org_email
        }
    }).then(
        result => {
            console.log(result);
            Patient.findAll({
                where:
                {
                    userId: result.id
                }
            }).then(
                results => {
                    res.status(200).json({message:"success", result: results});
                    next();
                }
            );
        }
    )
}


exports.searchPatient = (req, res, next) => {
    let searchName = req.body.name;

    Patient.findAll({where: {
        name: {
            [Sequelize.Op.like]: "%"+searchName+"%"
        }
    }}).then(
        result => {
            res.status(200).json({message: "Search Success!", result: result})
            next();
        }
    )
    
}

exports.getPatientById = (req, res, next) => {
    let id = Number(req.body.id);

    Patient.findByPk((id)).then(
        result => {
            res.status(200).json({message: "Success", result: result});
            next();
        }
    )
}

exports.updatePatientImage = (req, res, next) => {
    let imageUrl = req.body.image;
    let id = req.body.id;

    Patient.update({
        image: imageUrl
    },
    {
        where: {
            id: id 
        }
    }).then(
        result => {
            res.status(200);
            next();
        }
    )
}

exports.deletePatient = async (req, res, next) => {
    let id = req.body.id;
    const row = await Patient.findOne({
        where: {
            id: id
        }
    });

    if(row){
        await row.destroy();
    }
}

