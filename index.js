import express from 'express';
import db from './db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); //stores in req.body

app.get('/',(req,res) => {
    res.send("Welcom to nodejs server");
})

//importing person router
import personRoutes from './routes/personRoutes.js';
app.use('/person',personRoutes);

//importing menu router
import menuRoutes from './routes/menuRoutes.js';
app.use('/menu',menuRoutes);


app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
})

//hello github