const { spawn } = require('child_process');
const fs = require('fs');

const predictionHandler = (req, res, next) => {
    
    let imageUri = req.body.imageData;
    let base64 = imageUri.split(',')[1];
    const buffer = Buffer.from(base64, "base64");
    fs.writeFile('./scripts/image.jpg', buffer, () => {
        // let dataToSend;
        // const python = spawn('python', ['./scripts/predict.py']);
        // python.stdout.on('data', (data) => {
        //     dataToSend = data.toString();
        // });
        // python.on('close', (code) => {
        // console.log(dataToSend);
        // console.log(`child process close all stdio with code ${code}`);
        res.status(200).json({message: "Saved Successfully!"});
        next();
        // fs.rm('./scripts/image.jpg', () => {
        //     next();
        // });
        // });
    });
}

module.exports = predictionHandler