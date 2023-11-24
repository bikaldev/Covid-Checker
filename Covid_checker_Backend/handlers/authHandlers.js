const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

exports.loginHandler = (req, res, next) => {
    let email = req.body.email;
    let hashedPassword = req.body.password;

    console.log('receiving...')

    User.findAll({where: {
        email: email
    }}).
    then(
        result => {
            if(result.length !== 0) {
                if(hashedPassword === result[0].password) {
                    let token = jwt.sign({email: email}, process.env.SALT, {expiresIn:'2h'});
                    res.status(200).json({message: "Login Successful!", token: token, isAuth:true, name: result[0].name, email: email, id: result[0].id})
                    next();

                }
                else {
                    res.status(400).json({message: "Incorrect Password!", isAuth: false});
                    next();

                }
                
            } else {
                res.status(400).json({message: "Email hasn't been registered", isAuth: false});
                next();

            }
        }
    )
}


exports.signupHandler = (req,res,next) => {
    console.log("receiving......");
    let name = req.body.name;
    let email = req.body.email;
    let hashedPassword = req.body.password;
    let address = req.body.address;

    console.log(req.body);
     
    
    User.findAll({where: { email: email}}).
    then( result => {
        if(result.length !== 0) {
            res.status(400).json({message: "Email already registered!", isAuth: false})
            next();
        } else {
            User.create({
                name: name,
                email: email,
                password: hashedPassword,
                address: address
            }). then(result => {
                res.status(201).json({message: "Account Created Successfully!", isAuth: true});
                next();
            }).catch(err => console.log(err))
        }
    })
    .catch(
    (err) => {
        console.log(err);
        res.status(500).json({message: "Server Error! Try Again Later", isAuth: false});
        next();
    }
    );
    
}