const express = require("express");

const { MovieModal } = require("../Model/movie.modal");
const { auth } = require("../Middleware/auth.middleware");

const movieRoutes = express.Router();

movieRoutes.use(auth);

// Get all Movies

movieRoutes.get("/", async(req,res)=>{

})

// Add New Movie

movieRoutes.post("/add", async(req,res)=>{
    try{
        const newMovie = new MovieModal(req.body);
        await newMovie.save();
        res.status(200).json({"msg":"New Movie has Added","New Movie":req.body})
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

// Update Movie

movieRoutes.patch("/update/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const movie = await MovieModal.findOne({_id:id});
        if(req.body.userId == movie.userId)
        {
            await MovieModal.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({"msg":`This ${id} moive has been updated`,"updated movie":req.body})
        }else{
            res.status(200).json({"msg":"You Do not have Authority to update this movie"})
        }
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

// Delete Movie

movieRoutes.delete("/delete/:id", async(req,res)=>{
    const {id}= req.params
    try{
        const movie = await MovieModal.findOne({_id:id});
        if(req.body.userId == movie.userId)
        {
            await MovieModal.findByIdAndDelete({_id:id})
            res.status(200).json({"msg":`This ${id} movie has been Deleted uccessfully`})
        }else{
            res.status(200).json({"msg":"You Do not have Authority to update this movie"})
        }
        
    }catch(err){
        res.status(500).send({"msg":err})
    }
})



module.exports={movieRoutes}