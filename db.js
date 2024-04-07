import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Define the mongoose connection url
const mongoURL=process.env.MONGODB_URL_LOCAL
//const mongoURL=process.env.MONGODB_URL;

//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

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