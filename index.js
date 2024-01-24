const express = require("express");
const { connection } = require("./db");
const cors = require("cors");

const { userRoutes } = require("./Routes/user.routes");
const { movieRoutes } = require("./Routes/movie.routes");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/user",userRoutes);
app.use("/movie",movieRoutes)


app.listen(process.env.PORT,async ()=>{
    try{
        connection
        console.log("Server is Running");
        console.log("MongoDB Atlas is Connected");

    }catch(err){
        console.log(err)
    }
})