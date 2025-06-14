const UserModel= require("../models/userModel");


const loginCheck=async(req, res)=>{
    const { email, password}=req.body;
    
    try {
          const User = await UserModel.findOne({email:email});
          if (!User)
          {
            res.status(400).send({msg:"Invalid Email Id!"})
          }
          if (User.password!=password)
          {
             res.status(400).send({msg:"Invalid Password!"})
          }
          res.status(200).send({msg:"Login Successfully!", User})
    } catch (error) {
         console.log(error);
    }
     
}


module.exports={
    loginCheck
}