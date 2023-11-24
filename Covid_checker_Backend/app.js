const { spawn } = require('child_process');

const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./utils/database');

const predictRoute = require('./routes/predictRoute');
const authRoute = require('./routes/authRoutes');
const historyRoute = require('./routes/historyRoutes');
const patientRoute = require('./routes/patientRoutes');

const User = require('./models/user');
const History = require('./models/history');
const Patient = require('./models/patient');

const app = express();
const port = 3000;

// const python = spawn('python', ['./scripts/predict.py']);


app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE,OPTION');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    next();
});

app.use(predictRoute);
app.use(authRoute);
app.use(historyRoute);
app.use(patientRoute);

History.belongsTo(Patient, {constraints: true, onDelete: 'CASCADE'});
Patient.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

sequelize.sync().then(
    result => {
        spawn('python', ['./scripts/predict.py']);
        app.listen(port);

    }
)
.catch(
    err => console.log(err)
)

