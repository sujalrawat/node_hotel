import express from 'express';
import menu from './../models/menu.js'
//comment
const router=express.Router();

router.post('/', async (req,res) => {
    try{
        const data =req.body;
        const newMenu=new menu(data);
        const response=await newMenu.save();
        console.log("Data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get("/", async (req,res) => {
    try{
        const data=await menu.find();
        console.log("Data fetched");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get('/:taste',async (req,res) =>{
    try{
        const taste=req.params.taste;
        if(taste=='sweet'||taste=='spicy'||taste=='sour'){
            const data = await menu.find({taste:taste});
            console.log("Resposne fecthed");
            res.status(200).json(data);

        }else{
            res.status(404).json({error:"invalid taste"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.put('/:id', async(req,res) => {
    try{
        const menuItemId = req.params.id;
        const updatedMenuItemData = req.body;
        const updatedMenuItem = await menu.findByIdAndUpdate(menuItemId,updatedMenuItemData,{
            new:true,
            runValidators:true,
        });
        if(!updatedMenuItem){
            return res.status(404).json({error:"Menu item not found"});
        }
        console.log("Item udated");
        res.status(200).json(updatedMenuItemData);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const menuItemId = req.params.id;
        const deletedMenuItem = await menu.findByIdAndDelete(menuItemId);
        if(!deletedMenuItem){
            return res.status(404).json({error:"Menu item not found"});
        }
        console.log("Data deleted");
        res.status(200).json({message:"Menu item deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

export default router;