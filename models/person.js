import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    }
});

personSchema.pre('save',async function(next) {

    const person = this;

    if(!person.isModified('password')) return next();
    try{
         //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(person.password, salt);

        person.password= hashPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Person= mongoose.model('Person',personSchema);
export default Person;