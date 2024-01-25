const express = require("express");

const { MovieModal } = require("../Model/movie.modal");
const { auth } = require("../Middleware/auth.middleware");

const movieRoutes = express.Router();

// movieRoutes.use(auth);

// Get all Movies

movieRoutes.get("/", async(req,res)=>{
    try{
        const movies = await MovieModal.find();
        res.status(200).send(movies)
    }catch(err){
        res.status(500).send({"msg":err})
    }
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
        
        await MovieModal.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({"msg":`This ${id} moive has been updated`,"updated movie":req.body})
         
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

// Delete Movie

movieRoutes.delete("/delete/:id", async(req,res)=>{
    const {id}= req.params
    try{
        await MovieModal.findByIdAndDelete({_id:id})
        res.status(200).json({"msg":`This ${id} movie has been Deleted uccessfully`})
    }catch(err){
        res.status(500).send({"msg":err})
    }
})

module.exports={movieRoutes}