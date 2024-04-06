import express from 'express';
import person from './../models/person.js'

const router=express.Router();

router.post("/",async (req,res) => {
    try{
    const data= req.body; //Assuring the request body contains the person data

    //create a new Person document using mongoose model
    const newPerson = new person(data);

    //save the new
    const response= await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response)
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get("/",async (req,res) => {
    try{
        const data=await person.find();
        console.log("Data fetched");
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get('/:workType',async(req,res) =>{ //parameterized api call
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const data=await person.find({work:workType});
            console.log("Response fetched");
            res.status(200).json(data);
        }else{
            res.status(404).json({error:"invalid work type"});
        }
        
    }catch(err){
        console.log(err);
        res.status(404).json({error:"internal server error"});
    }
})

router.put('/:id',async(req,res) =>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const updatedPerson = await person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!updatedPerson){
            return res.status(404).json({error:"Person not found"});
        }
        console.log("Data updated");
        res.status(200).json(updatedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const deletedPerson = await person.findByIdAndDelete(personId);
        if(!deletedPerson){
            return res.status(404).json({error:"Person not found"});
        }
        console.log("Data deleted");
        res.status(200).json({message:"Person deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

export default router;