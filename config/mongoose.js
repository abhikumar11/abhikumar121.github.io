const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/placementcell');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting database'));
db.once("open",() => {console.log("Connected to database")});
module.exports = db;