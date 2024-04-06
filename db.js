import mongoose from 'mongoose';

//Define the mongoose connection url
const mongooseURL='mongodb://127.0.0.1:27017/hotels'

//Set up MongoDB connection
mongoose.connect(mongooseURL);

//Get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected',() => {
    console.log('Connected to MongoDB server');
})

db.on('error',(err) => {
    console.log('MongoDb connection error', err);
})

db.on('disconnected',() => {
    console.log('Disconnected from MongoDb server');
})

//Export the database connection
export default db;