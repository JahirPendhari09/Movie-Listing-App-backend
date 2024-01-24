const express = require("express");

const userRoutes = express.Router();
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");
const { UserModal } = require("../Model/User.model");


userRoutes.post("/register", async(req,res)=>{
    const {email, username,password}= req.body
    try{
        const isEmailExist = await UserModal.findOne({email});
        if(isEmailExist)
        {
            res.status(400).send({"msg":"this Email is already used"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
            
                if(err){
                    res.status(400).send({"msg":err}) 
                }else{
                    const newUser = new UserModal({
                        email,username,password:hash
                    })

                    await newUser.save()
                    res.status(200).send({"msg":"New User has been Registerd","user":req.body}) 
                }
            });
        }

    }catch(err){
        res.status(500).send({"msg":err})
    }
    
})

userRoutes.post("/login", async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await UserModal.findOne({email});
        // console.log(user)
        if(user)
        {
            const token = jwt.sign({userId:user._id,username :user.username}, 'movieByJahir');
            // console.log(token)
            bcrypt.compare(password,user.password, async(err, result)=> {
                if(result)
                {
                    res.status(200).send({"msg":"Login Successful","token":token,"user":user})
                }else{
                    res.status(400).send({"msg":" Wrong Password"})
                }
    
            });

        }else{
            res.status(400).send({"msg":"Email address is Wrong"})
        }

    }catch(err){
        res.status(500).send({"msg":err})
    }
})

module.exports ={userRoutes}