const mongoose = require("mongoose");

const movieSchma = mongoose.Schema({
    username:String,
    userId:String,
    title:String,
    image:String,
    category:String,
    rating:String,
    runtime:String,
    language:String,
    releaseDate:String
    
},{versionKey:false});

const MovieModal = mongoose.model("movie",movieSchma);

module.exports={MovieModal}