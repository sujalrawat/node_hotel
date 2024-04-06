import mongoose from 'mongoose';

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    age:{
        type:Number
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    }
});

const person= mongoose.model('person',personSchema);
export default person;