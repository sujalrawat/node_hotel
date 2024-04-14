import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import Person from './models/person.js'

passport.use(new LocalStrategy(async (username,password,done) =>{
    try{
        const user =await Person.findOne({username:username});
        if(!user)
            return done(null,false,{message:"Incorrect username"});
    
        const isPasswordMatch =await user.comparePassword(password);
        if(isPasswordMatch) {
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect password"});
        }
    }catch(err){
        return done(err);
    }
}))

export default passport