

const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log("toke")
    try{
        jwt.verify(token, 'movieByJahir', (err, decoded)=> {
            if(err){
                res.status(200).send({"msg":err})
            }else{
                // req.body.username=decoded.username;
                // req.body.userId = decoded.userId
                next();
            }
        });
    }catch(err){
        res.status(500).send({"msg":err})
    }
}

module.exports={auth}